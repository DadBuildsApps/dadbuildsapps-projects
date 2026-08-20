export const ALLOWED_SOURCES = new Set(["x", "youtube", "direct", "unknown"])

export function normalizeSource(value) {
  if (!value) return "direct"
  const normalized = value.trim().toLowerCase()
  return ALLOWED_SOURCES.has(normalized) ? normalized : "unknown"
}

export function getViewport(width = window.innerWidth) {
  if (width < 600) return "mobile"
  if (width < 1024) return "tablet"
  return "desktop"
}

export function isEmailValid(value) {
  const email = value.trim()
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function trackEvent(name, details = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", name, details)
}
