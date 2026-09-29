// Consentimiento de cookies. La elección se guarda en el navegador (localStorage),
// caduca a los 12 meses y entonces se vuelve a preguntar (guía de cookies de la AEPD).

// ID de medición de GA4. Solo en compilaciones de producción, para que el tráfico de
// desarrollo no ensucie las estadísticas. NEXT_PUBLIC_GA_ID lo sustituye si hace falta.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? (process.env.NODE_ENV === "production" ? "G-Z25703QYCP" : "")

const KEY = "rcm-consent"
const VERSION = 1
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

/** Evento para reabrir el panel desde cualquier parte (pie de página, página de cookies). */
export const OPEN_SETTINGS_EVENT = "rcm:abrir-cookies"

export type Consent = { v: number; analytics: boolean; date: string }

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as Consent
    if (c.v !== VERSION || Date.now() - new Date(c.date).getTime() > MAX_AGE_MS) return null
    return c
  } catch {
    return null
  }
}

export function saveConsent(analytics: boolean): Consent {
  const c: Consent = { v: VERSION, analytics, date: new Date().toISOString() }
  try {
    localStorage.setItem(KEY, JSON.stringify(c))
  } catch {
    /* modo privado: la elección dura solo esta visita */
  }
  return c
}

/** Modo de consentimiento de Google antes de cargar GA: solo analítica; publicidad denegada.
 *  Se encola en dataLayer, así gtag.js lo aplica antes del 'config'. */
export function pushConsentDefaults() {
  const w = window as Window & { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer ?? []
  // gtag.js solo procesa objetos `arguments`, no arrays: por eso la función clásica
  // eslint-disable-next-line prefer-rest-params
  const gtag: (...args: unknown[]) => void = function () { w.dataLayer!.push(arguments) }
  gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" })
}

/** Borra las cookies de Google Analytics (_ga, _ga_XXXX) al retirar el consentimiento. */
export function deleteAnalyticsCookies() {
  const host = location.hostname
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`]
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!name.startsWith("_ga")) continue
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`
    }
  }
}
