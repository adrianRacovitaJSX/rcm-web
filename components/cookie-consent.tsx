"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Script from "next/script"
import { GA_ID, OPEN_SETTINGS_EVENT, deleteAnalyticsCookies, readConsent, saveConsent } from "@/lib/consent"

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void }

/**
 * Banner de cookies y carga de Google Analytics.
 * - GA solo se carga si el usuario acepta la analítica (antes no hay ni cookies ni peticiones a Google).
 * - "Rechazar" y "Aceptar" tienen el mismo diseño y están en la primera capa, como pide la AEPD.
 * - Sin NEXT_PUBLIC_GA_ID no hay cookies que pedir, así que no se muestra nada.
 */
export function CookieConsent() {
  const [ready, setReady] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState(false)
  const [draft, setDraft] = useState(false)

  useEffect(() => {
    if (!GA_ID) return
    // Se difiere un tick: la elección vive en localStorage y solo se puede leer en el navegador
    const t = setTimeout(() => {
      const c = readConsent()
      setAnalytics(!!c?.analytics)
      setOpen(!c)
      setReady(true)
    }, 0)
    const reopen = () => {
      setDraft(!!readConsent()?.analytics)
      setSettings(true)
      setOpen(true)
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen)
    return () => {
      clearTimeout(t)
      window.removeEventListener(OPEN_SETTINGS_EVENT, reopen)
    }
  }, [])

  function decide(value: boolean) {
    saveConsent(value)
    if (!value && analytics) {
      ;(window as GtagWindow).gtag?.("consent", "update", { analytics_storage: "denied" })
      deleteAnalyticsCookies()
    }
    setAnalytics(value)
    setOpen(false)
    setSettings(false)
  }

  if (!GA_ID) return null

  const btn =
    "inline-flex h-11 flex-1 items-center justify-center rounded-full bg-bone px-5 text-[15px] font-semibold text-ink transition-[transform,background-color] hover:bg-white active:scale-[0.98] sm:flex-none"

  return (
    <>
      {ready && analytics ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookies-titulo"
          className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink-2/95 px-5 pt-5 shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md sm:rounded-2xl sm:border sm:pb-5"
        >
          <h2 id="cookies-titulo" className="font-semibold">Cookies</h2>

          {settings ? (
            <div className="mt-3 grid gap-4">
              <label className="flex items-start justify-between gap-4 text-sm">
                <span>
                  <b className="block font-semibold text-bone">Técnicas</b>
                  <span className="text-mute">Necesarias para que la web funcione y recuerde esta elección.</span>
                </span>
                <input type="checkbox" checked disabled className="mt-1 size-5 shrink-0 accent-[#f17205]" aria-label="Cookies técnicas, siempre activas" />
              </label>
              <label className="flex items-start justify-between gap-4 text-sm">
                <span>
                  <b className="block font-semibold text-bone">Análisis</b>
                  <span className="text-mute">Google Analytics: cuántas personas visitan la web y qué secciones usan.</span>
                </span>
                <input type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)} className="mt-1 size-5 shrink-0 accent-[#f17205]" aria-label="Cookies de análisis" />
              </label>
              <div className="flex gap-2">
                <button type="button" onClick={() => decide(draft)} className={btn}>Guardar selección</button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm leading-relaxed text-mute">
                Usamos cookies de análisis (Google Analytics) para saber cómo se usa la web y mejorarla. Solo se activan si las aceptas.{" "}
                <Link href="/cookies" className="text-bone underline underline-offset-2 hover:text-brand">Más información</Link>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => decide(false)} className={btn}>Rechazar</button>
                <button type="button" onClick={() => decide(true)} className={btn}>Aceptar</button>
              </div>
              <button
                type="button"
                onClick={() => { setDraft(analytics); setSettings(true) }}
                className="mt-3 text-sm font-medium text-mute underline underline-offset-2 hover:text-bone"
              >
                Configurar
              </button>
            </>
          )}
        </div>
      ) : null}
    </>
  )
}

/** Botón para reabrir la configuración de cookies (pie de página, página de cookies). */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  if (!GA_ID) return null
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className={className}>
      Configurar cookies
    </button>
  )
}
