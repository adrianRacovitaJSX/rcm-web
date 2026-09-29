// Eventos de conversión. Si el usuario aceptó la analítica, van a Google Analytics 4
// (gtag). Si no, se quedan en `window.dataLayer`, que no sale del navegador mientras no
// haya ningún script de Google cargado (lo usaría Google Tag Manager si algún día se añade).

export type ConversionEvent =
  | "cta_reservar"
  | "cta_whatsapp"
  | "cta_llamar"
  | "form_enviado"
  | "form_error"

import { sendGAEvent } from "@next/third-parties/google"

type DataLayerWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }

export function track(event: ConversionEvent, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  const w = window as DataLayerWindow
  // gtag solo existe si GA está cargado, es decir, si el usuario aceptó la analítica
  if (w.gtag) {
    sendGAEvent("event", event, data)
    return
  }
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({ event, ...data })
}
