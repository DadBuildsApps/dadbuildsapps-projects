import { useEffect, useMemo, useRef, useState } from "react"
import { getViewport, isEmailValid, normalizeSource, trackEvent } from "./waitlist.js"

const PAIN_POINTS = [
  ["", "選択してください（任意）"],
  ["standup", "Stand-up・進捗報告"],
  ["requirements", "仕様確認"],
  ["technical_explanation", "技術的な説明"],
  ["interview", "面接"],
  ["other", "その他"],
]

const LOCAL_TURNSTILE_TEST_KEY = "1x00000000000000000000AA"

function Logo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-bar brand-bar--short" />
      <span className="brand-bar" />
      <span className="brand-bar brand-bar--short" />
    </span>
  )
}

function Turnstile({ onToken }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? LOCAL_TURNSTILE_TEST_KEY : "")

  useEffect(() => {
    if (!siteKey || !containerRef.current) return undefined

    let cancelled = false
    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current !== null) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "waitlist_submit",
        theme: "dark",
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      })
    }

    if (window.turnstile) {
      render()
    } else {
      let script = document.querySelector('script[data-devenglishgym-turnstile="true"]')
      if (!script) {
        script = document.createElement("script")
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        script.async = true
        script.defer = true
        script.dataset.devenglishgymTurnstile = "true"
        document.head.appendChild(script)
      }
      script.addEventListener("load", render)
      return () => {
        cancelled = true
        script.removeEventListener("load", render)
      }
    }

    return () => {
      cancelled = true
    }
  }, [onToken, siteKey])

  if (!siteKey) {
    return <p className="form-config-note">TurnstileのSite Keyを設定すると登録できます。</p>
  }

  return <div className="turnstile-slot" ref={containerRef} aria-label="不正登録防止の確認" />
}

export default function DevEnglishGymLanding() {
  const [email, setEmail] = useState("")
  const [painPoint, setPainPoint] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [status, setStatus] = useState({ type: "idle", message: "" })
  const demoTracked = useRef(false)
  const source = useMemo(() => normalizeSource(new URLSearchParams(window.location.search).get("source")), [])
  const functionUrl = import.meta.env.VITE_WAITLIST_FUNCTION_URL || ""

  useEffect(() => {
    trackEvent("devenglishgym_landing_viewed", { source, viewport: getViewport() })
  }, [source])

  const scrollToWaitlist = () => {
    trackEvent("devenglishgym_waitlist_cta_clicked", { source, viewport: getViewport() })
    document.getElementById("waitlist-email")?.focus({ preventScroll: true })
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const submit = async (event) => {
    event.preventDefault()
    const analytics = { source, viewport: getViewport(), pain_point: painPoint || "not_selected" }

    if (!isEmailValid(email)) {
      setStatus({ type: "error", message: "メールアドレスを確認してください。" })
      document.getElementById("waitlist-email")?.focus()
      trackEvent("devenglishgym_waitlist_failed", { ...analytics, reason: "validation" })
      return
    }
    if (!turnstileToken) {
      setStatus({ type: "error", message: "不正登録防止の確認が完了するまでお待ちください。" })
      trackEvent("devenglishgym_waitlist_failed", { ...analytics, reason: "turnstile_missing" })
      return
    }
    if (!functionUrl) {
      setStatus({ type: "error", message: "登録先の準備中です。少し時間をおいてもう一度お試しください。" })
      trackEvent("devenglishgym_waitlist_failed", { ...analytics, reason: "configuration" })
      return
    }

    setStatus({ type: "loading", message: "登録しています…" })
    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          painPoint: painPoint || null,
          source,
          locale: "ja",
          turnstileToken,
          company: honeypot,
        }),
      })

      if (!response.ok) throw new Error(`waitlist_${response.status}`)
      setStatus({
        type: "success",
        message: "登録ありがとうございます。ベータ版の準備ができ次第、ご案内します。",
      })
      setEmail("")
      setPainPoint("")
      trackEvent("devenglishgym_waitlist_submitted", analytics)
    } catch {
      setStatus({ type: "error", message: "登録できませんでした。時間をおいてもう一度お試しください。" })
      trackEvent("devenglishgym_waitlist_failed", { ...analytics, reason: "request_failed" })
    } finally {
      if (window.turnstile) window.turnstile.reset()
      setTurnstileToken("")
    }
  }

  return (
    <div className="landing-shell">
      <header className="site-header">
        <a className="product-brand" href="/devenglishgym/" aria-label="DevEnglishGym トップ">
          <Logo />
          <span>DevEnglishGym</span>
        </a>
        <a className="dadbuilds-link" href="/">by DadBuildsApps</a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span>PRIVATE BETA</span> / WAITLIST受付中</p>
            <h1 id="hero-title">
              <span>英語会議で、</span>
              <span>言いたいことを</span>
              <span>その場で</span>
              <span>伝えられるように。</span>
            </h1>
            <p className="hero-lead">DevEnglishGymは、外資・海外チームで働くエンジニアのための実務英語スピーキング練習サービスです。</p>
            <button className="primary-action" type="button" onClick={scrollToWaitlist}>ベータ版の案内を受け取る <span aria-hidden="true">↓</span></button>
            <p className="small-note">開発中のMVPです。準備ができ次第、登録者へご案内します。</p>
          </div>

          <figure className="hero-product">
            <img src="/devenglishgym/demo-poster.jpg" alt="DevEnglishGymで、通知設定の遅れについて質問された実際の練習画面" width="1658" height="968" />
            <figcaption><span>SCENARIO_02</span> 遅れと修正した予定を伝える</figcaption>
          </figure>
        </section>

        <section className="problem" aria-labelledby="problem-title">
          <p className="section-index">00 / THE PROBLEM</p>
          <div>
            <h2 id="problem-title">英語は読める。<br />言いたいこともある。</h2>
            <p>でも会議では、英語を組み立てている間に話題が変わってしまう。練習したいのは旅行英会話ではなく、<strong>仕事の判断をその場で伝える力</strong>です。</p>
          </div>
        </section>

        <section className="learning-flow" aria-labelledby="flow-title">
          <header className="section-heading">
            <p className="section-index">01—03 / ONE PRACTICE</p>
            <h2 id="flow-title">答える。直す。もう一度伝える。</h2>
          </header>

          <ol className="flow-line">
            <li className="flow-step flow-step--wide">
              <div className="flow-copy"><span>01</span><h3>実務シナリオを確認</h3><p>状況と相手からの質問を読み、回答に含めることを整理します。</p></div>
              <blockquote lang="en">“Are you still on track to finish the notification settings today?”</blockquote>
            </li>
            <li className="flow-step">
              <div className="flow-copy"><span>02</span><h3>自分の言葉で回答</h3><p>完璧でなくて大丈夫。状況と質問を見たまま、自分のタイミングで話し始めます。</p></div>
              <img src="/devenglishgym/recording.jpg" alt="質問と自分の状況を見ながら英語を録音している実際のDevEnglishGym画面" width="1658" height="968" loading="lazy" />
            </li>
            <li className="flow-step flow-step--reverse">
              <div className="flow-copy"><span>03</span><h3>改善点を使って再回答</h3><p>直すポイントは重要な3つだけ。自分が使った英語を残した修正版から、次の発話へつなげます。</p></div>
              <img src="/devenglishgym/feedback.jpg" alt="再回答で3つの達成項目をすべて伝えられた実際のDevEnglishGym画面" width="1658" height="968" loading="lazy" />
            </li>
          </ol>
        </section>

        <section className="practice-log" aria-labelledby="practice-log-title">
          <div className="practice-log-heading">
            <p className="section-index">PRACTICE_LOG</p>
            <h2 id="practice-log-title">同じ内容でも、<br />伝わり方は変えられる。</h2>
          </div>
          <div className="attempts" aria-label="初回回答から再回答までの変化">
            <article className="attempt">
              <header><code>attempt_01</code><strong>2/3</strong></header>
              <p lang="en">“I’m a little behind schedule. Two tests are failing, and I’m fixing them now.”</p>
            </article>
            <div className="priority-fix">
              <span>最重要の改善点</span>
              <p>リリース全体への影響を伝える</p>
            </div>
            <article className="attempt attempt--improved">
              <header><code>retry_02</code><strong>3/3</strong></header>
              <p lang="en">“I expect to finish by 3 p.m. today, and this won’t affect the overall release.”</p>
            </article>
          </div>
        </section>

        <section className="demo-section" aria-labelledby="demo-title">
          <div className="demo-copy">
            <p className="section-index">BUILD IN PUBLIC / 01:31</p>
            <h2 id="demo-title">作っている本人が、実際に練習しました。</h2>
            <p>遅れを報告するシナリオで、最初の回答から改善後の再回答までを約90秒で紹介します。</p>
          </div>
          <video
            controls
            preload="none"
            poster="/devenglishgym/demo-poster.jpg"
            playsInline
            onPlay={() => {
              if (demoTracked.current) return
              demoTracked.current = true
              trackEvent("devenglishgym_demo_played", { source, viewport: getViewport() })
            }}
          >
            <source src="/devenglishgym/demo.mp4" type="video/mp4" />
            お使いのブラウザは動画再生に対応していません。
          </video>
        </section>

        <section className="target-and-founder" aria-labelledby="target-title">
          <div className="target-copy">
            <p className="section-index">WHO IT IS FOR</p>
            <h2 id="target-title">こんなエンジニアのために作っています。</h2>
            <ul>
              <li>外資系企業やグローバルチームで英語を使っている</li>
              <li>海外就職を目指している</li>
              <li>技術的な内容を英語で説明したい</li>
              <li>会議で言いたいことがあるのに、発言を逃した経験がある</li>
            </ul>
          </div>
          <aside className="founder-note">
            <p className="section-index">FOUNDER_NOTE</p>
            <p>カナダの英語環境で働くソフトウェアエンジニアが、実際に仕事で困った経験をもとに開発しています。</p>
            <small>がっくん / 日本の外資系企業を経てカナダへ移住。英語環境で約5年勤務。</small>
          </aside>
        </section>

        <section className="waitlist-section" id="waitlist" aria-labelledby="waitlist-title">
          <div className="waitlist-copy">
            <p className="section-index">PRIVATE BETA</p>
            <h2 id="waitlist-title">ベータ版の<br />案内を受け取る</h2>
            <p>実際に使っていただける段階になったら、登録したメールアドレスへご案内します。</p>
          </div>

          <form className="waitlist-form" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="waitlist-email">メールアドレス <span>必須</span></label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="pain-point">英語で一番困る場面はどれですか？ <span>任意</span></label>
              <select id="pain-point" name="painPoint" value={painPoint} onChange={(event) => setPainPoint(event.target.value)}>
                {PAIN_POINTS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="company">会社名</label>
              <input id="company" name="company" tabIndex="-1" autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
            </div>
            <Turnstile onToken={setTurnstileToken} />
            <button className="submit-action" type="submit" disabled={status.type === "loading"}>
              {status.type === "loading" ? "登録しています…" : "ベータ版の案内を受け取る"}
            </button>
            <p className={`form-status form-status--${status.type}`} aria-live="polite" role="status">{status.message}</p>
            <p className="consent-note">登録により、ベータ版の案内メールを受け取ることに同意したものとします。個人情報の取り扱いは<a href="/devenglishgym/privacy-policy/">プライバシーポリシー</a>をご確認ください。</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} DadBuildsApps</span>
        <a href="/">DadBuildsAppsへ戻る</a>
      </footer>
    </div>
  )
}
