from __future__ import annotations

import re
import os
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


SOURCE = Path("/Users/gakujinyama/Downloads/通知設定遅れの英語報告練習.mp4")
AUTO_SRT = Path("/private/tmp/devenglishgym-transcript-auto/通知設定遅れの英語報告練習.srt")
OUT = Path("/Users/gakujinyama/workspace/dadbuildsapps-projects/video-exports/notification-delay-practice")

# The long version keeps the complete explanation but removes loading waits and failed takes.
YOUTUBE_CUTS = [
    (0.70, 77.40),
    (80.50, 121.00),
    (132.50, 209.30),
    (330.50, 361.80),
    (366.80, 374.20),
    (383.10, 438.00),
]

# The X version tells the same before/after story in about 90 seconds.
X_CUTS = [
    (1.10, 13.05),
    (58.55, 62.25),
    (80.50, 100.25),
    (134.30, 141.85),
    (153.60, 162.15),
    (330.50, 361.80),
    (383.10, 388.30),
    (399.25, 402.70),
]


def seconds(value: str) -> float:
    hours, minutes, rest = value.replace(",", ".").split(":")
    return int(hours) * 3600 + int(minutes) * 60 + float(rest)


def parse_srt(path: Path) -> list[tuple[float, float, str]]:
    blocks = re.split(r"\n\s*\n", path.read_text(encoding="utf-8").strip())
    parsed = []
    for block in blocks:
        lines = block.splitlines()
        if len(lines) < 3:
            continue
        start, end = lines[1].split(" --> ")
        parsed.append((seconds(start), seconds(end), " ".join(lines[2:])))
    return parsed


def source_captions() -> list[tuple[float, float, str]]:
    captions = []
    replacement_ranges = [(77.0, 102.0), (192.0, 210.0), (337.0, 362.0)]
    for start, end, text in parse_srt(AUTO_SRT):
        if any(start < right and end > left for left, right in replacement_ranges):
            continue
        text = text.replace("回線点", "改善点")
        text = text.replace("今日の午後3時までいかないため", "今日の午後3時までが入っていないため")
        captions.append((start, end, text))

    captions.extend(
        [
            (81.04, 84.90, "I was supposed to finish the notification settings yesterday."),
            (85.44, 89.50, "However, old-user migration took longer than expected."),
            (90.58, 96.22, "The implementation has been done, but there are two tests failing."),
            (96.94, 100.14, "I don't think it's going to affect the overall release."),
            (192.06, 197.54, "I'm slightly behind the original plan because the legacy-user migration took longer than expected."),
            (197.96, 201.92, "The implementation is complete, but two tests are still failing."),
            (202.12, 206.20, "I'm fixing them now and expect to finish by 3 p.m."),
            (206.66, 209.18, "This shouldn't affect the release date at the moment."),
            (337.08, 340.62, "I'm actually a little bit behind schedule."),
            (342.76, 347.36, "Legacy-user migration took longer than expected."),
            (347.76, 349.44, "The implementation is done."),
            (349.70, 352.74, "However, there are two tests failing at the moment."),
            (353.88, 357.58, "I expect to finish by 3 p.m. today."),
            (357.88, 361.70, "I don't think it's going to affect the release date."),
        ]
    )
    return sorted(captions)


def remap_captions(cuts: list[tuple[float, float]]) -> list[tuple[float, float, str]]:
    output = []
    elapsed = 0.0
    for cut_start, cut_end in cuts:
        for start, end, text in source_captions():
            overlap_start = max(start, cut_start)
            overlap_end = min(end, cut_end)
            if overlap_end - overlap_start < 0.12:
                continue
            mapped_start = elapsed + overlap_start - cut_start
            mapped_end = elapsed + overlap_end - cut_start
            output.extend(split_caption(mapped_start, mapped_end, text))
        elapsed += cut_end - cut_start
    return sorted(output)


def split_caption(start: float, end: float, text: str) -> list[tuple[float, float, str]]:
    max_chars = 52 if re.search(r"[A-Za-z]", text) and not re.search(r"[ぁ-んァ-ヶ一-龯]", text) else 30
    if len(text) <= max_chars:
        return [(start, end, text)]

    words = text.split(" ") if " " in text else list(text)
    separator = " " if " " in text else ""
    chunks: list[str] = []
    current = ""
    for word in words:
        proposed = word if not current else current + separator + word
        if current and len(proposed) > max_chars:
            chunks.append(current)
            current = word
        else:
            current = proposed
    if current:
        chunks.append(current)

    duration = max(end - start, 0.2)
    weights = [max(len(chunk), 1) for chunk in chunks]
    total = sum(weights)
    result = []
    cursor = start
    for index, (chunk, weight) in enumerate(zip(chunks, weights)):
        chunk_end = end if index == len(chunks) - 1 else cursor + duration * weight / total
        result.append((cursor, chunk_end, chunk))
        cursor = chunk_end
    return result


def timestamp(value: float) -> str:
    milliseconds = round(value * 1000)
    hours, remainder = divmod(milliseconds, 3_600_000)
    minutes, remainder = divmod(remainder, 60_000)
    secs, millis = divmod(remainder, 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"


def write_srt(path: Path, captions: list[tuple[float, float, str]]) -> None:
    content = []
    for index, (start, end, text) in enumerate(captions, 1):
        content.append(f"{index}\n{timestamp(start)} --> {timestamp(end)}\n{text}\n")
    path.write_text("\n".join(content), encoding="utf-8")


def make_caption_overlay(
    name: str,
    captions: list[tuple[float, float, str]],
    total_duration: float,
    width: int,
    font_size: int,
) -> Path:
    work = OUT / f".{name}-captions"
    work.mkdir(parents=True, exist_ok=True)
    overlay_width = width - 180
    overlay_height = 150
    font_path = next(Path("/System/Library/Fonts").glob("*W6.ttc"))
    font = ImageFont.truetype(str(font_path), font_size)

    transparent = work / "transparent.png"
    Image.new("RGBA", (overlay_width, overlay_height), (0, 0, 0, 0)).save(transparent)

    timeline: list[tuple[Path, float]] = []
    cursor = 0.0
    for index, (start, end, text) in enumerate(captions):
        start = max(start, cursor)
        if start > cursor + 0.01:
            timeline.append((transparent, start - cursor))

        canvas = Image.new("RGBA", (overlay_width, overlay_height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(canvas)
        box = draw.textbbox((0, 0), text, font=font)
        text_width = box[2] - box[0]
        text_height = box[3] - box[1]
        padding_x = 26
        padding_y = 15
        left = max((overlay_width - text_width) // 2 - padding_x, 0)
        top = max((overlay_height - text_height) // 2 - padding_y, 0)
        right = min((overlay_width + text_width) // 2 + padding_x, overlay_width)
        bottom = min((overlay_height + text_height) // 2 + padding_y, overlay_height)
        draw.rounded_rectangle((left, top, right, bottom), radius=12, fill=(0, 0, 0, 190))
        draw.text(
            ((overlay_width - text_width) / 2, (overlay_height - text_height) / 2 - box[1]),
            text,
            font=font,
            fill=(255, 255, 255, 255),
            stroke_width=1,
            stroke_fill=(0, 0, 0, 220),
        )
        image_path = work / f"caption-{index:04d}.png"
        canvas.save(image_path)
        timeline.append((image_path, max(end - start, 0.12)))
        cursor = end

    if total_duration > cursor:
        timeline.append((transparent, total_duration - cursor))

    concat_file = work / "captions.ffconcat"
    lines = ["ffconcat version 1.0"]
    for image_path, duration in timeline:
        lines.extend([f"file '{image_path}'", f"duration {duration:.6f}"])
    lines.append(f"file '{timeline[-1][0]}'")
    concat_file.write_text("\n".join(lines) + "\n", encoding="utf-8")

    overlay = work / "captions.mov"
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(concat_file),
            "-fps_mode",
            "vfr",
            "-vf",
            "format=argb",
            "-c:v",
            "qtrle",
            str(overlay),
        ],
        check=True,
    )
    return overlay


def render(name: str, cuts: list[tuple[float, float]], width: int, height: int, font_size: int) -> None:
    srt = OUT / f"{name}.srt"
    video = OUT / f"{name}.mp4"
    captions = remap_captions(cuts)
    write_srt(srt, captions)
    total_duration = sum(end - start for start, end in cuts)
    overlay = make_caption_overlay(name, captions, total_duration, width, font_size)

    video_filters = []
    audio_filters = []
    concat_inputs = []
    for index, (start, end) in enumerate(cuts):
        video_filters.append(
            f"[0:v]trim=start={start}:end={end},setpts=PTS-STARTPTS[v{index}]"
        )
        audio_filters.append(
            f"[0:a]atrim=start={start}:end={end},asetpts=PTS-STARTPTS[a{index}]"
        )
        concat_inputs.append(f"[v{index}][a{index}]")

    filter_complex = ";".join(
        video_filters
        + audio_filters
        + [
            "".join(concat_inputs)
            + f"concat=n={len(cuts)}:v=1:a=1[vc][ac]",
            f"[vc]scale={width}:{height}:force_original_aspect_ratio=decrease,"
            f"pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=0x111418,"
            "setsar=1[base]",
            "[base][1:v]overlay=(W-w)/2:H-h-24:eof_action=pass[vout]",
            "[ac]highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[aout]",
        ]
    )

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-i",
            str(SOURCE),
            "-i",
            str(overlay),
            "-filter_complex",
            filter_complex,
            "-map",
            "[vout]",
            "-map",
            "[aout]",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "20",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-movflags",
            "+faststart",
            str(video),
        ],
        check=True,
        env={**os.environ, "XDG_CACHE_HOME": "/private/tmp/font-cache"},
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    render("DevEnglishGym_YouTube", YOUTUBE_CUTS, 1920, 1080, 34)
    render("DevEnglishGym_X_short", X_CUTS, 1920, 1080, 36)


if __name__ == "__main__":
    main()
