"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Clock, EnvelopeSimple, WarningCircle } from "@phosphor-icons/react"
import { PhoneLink, WhatsappButton } from "../cta"
import { areas, site, whatsappUrl } from "@/lib/site"
import { track } from "@/lib/track"

type Fields = { nombre: string; telefono: string; coche: string; zona: string; fecha: string; privacidad: boolean }
type Errors = Partial<Record<keyof Fields, string>>

const empty: Fields = { nombre: "", telefono: "", coche: "", zona: "", fecha: "", privacidad: false }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.nombre.trim().length < 2) e.nombre = "Escribe tu nombre."
  if (!/^\+?[\d\s-]{9,15}$/.test(f.telefono.trim())) e.telefono = "Escribe un teléfono de 9 cifras."
  if (f.coche.trim().length < 3) e.coche = "Pega el enlace del anuncio o escribe marca y modelo."
  if (f.zona.trim().length < 2) e.zona = "Dinos dónde está el coche."
  if (!f.privacidad) e.privacidad = "Necesitamos tu permiso para contactarte."
  return e
}

function mensaje(f: Fields) {
  return [
    "Hola, quiero reservar una revisión pre-compra.",
    `Nombre: ${f.nombre.trim()}`,
    `Teléfono: ${f.telefono.trim()}`,
    `Coche: ${f.coche.trim()}`,
    `Dónde está: ${f.zona.trim()}`,
    f.fecha ? `Fecha preferida: ${new Date(`${f.fecha}T12:00`).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}` : null,
  ].filter(Boolean).join("\n")
}

const input =
  "h-12 w-full rounded-xl border bg-ink px-4 text-[16px] text-bone placeholder:text-mute-2 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"

export function Booking() {
  const [f, setF] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [sentUrl, setSentUrl] = useState<string | null>(null)

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((prev) => ({ ...prev, [k]: v }))
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(f)
    setErrors(found)
    const firstError = Object.keys(found)[0]
    if (firstError) {
      track("form_error", { campo: firstError })
      document.getElementById(`reserva-${firstError}`)?.focus()
      return
    }
    const url = whatsappUrl(mensaje(f))
    track("form_enviado", { zona: f.zona })
    window.open(url, "_blank", "noopener")
    setSentUrl(url)
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`reserva-${k}-error`} className="flex items-center gap-1.5 text-sm text-bad">
        <WarningCircle weight="fill" className="size-4 shrink-0" aria-hidden />
        {errors[k]}
      </p>
    ) : null

  const aria = (k: keyof Fields) => ({
    id: `reserva-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `reserva-${k}-error` : undefined,
  })

  return (
    <section id="reservar" aria-labelledby="reservar-titulo" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[560px] rounded-full bg-brand/[0.1] blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <h2 id="reservar-titulo" className="display text-4xl font-bold leading-[1.05] md:text-5xl">
            Reserva tu revisión.
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-mute">
            Déjanos el coche y la zona. Te confirmamos precio y hora por WhatsApp en el día.
          </p>

          <div className="mt-10 grid gap-5 border-t border-line pt-8">
            <WhatsappButton from="reservar" className="w-full sm:w-auto sm:justify-self-start" />
            <PhoneLink from="reservar" label={site.phone} />
            <p className="flex items-center gap-2 text-mute">
              <EnvelopeSimple weight="bold" className="size-4 text-brand" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-bone">{site.email}</a>
            </p>
            <p className="flex items-center gap-2 text-mute">
              <Clock weight="bold" className="size-4 text-brand" aria-hidden />
              {site.hours.text}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-9">
          {sentUrl ? (
            <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
              <CheckCircle weight="fill" className="size-12 text-ok" aria-hidden />
              <h3 className="display mt-6 text-3xl font-bold">Ya casi está.</h3>
              <p className="mt-3 max-w-[42ch] text-lg leading-relaxed text-mute">
                Hemos abierto WhatsApp con tu solicitud escrita. Solo falta pulsar enviar y te respondemos con la cita.
              </p>
              <a href={sentUrl} target="_blank" rel="noopener" className="mt-6 font-semibold text-brand underline underline-offset-4">
                Si no se ha abierto, pulsa aquí
              </a>
              <button type="button" onClick={() => { setF(empty); setSentUrl(null) }} className="mt-4 text-sm text-mute hover:text-bone">
                Reservar otro coche
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="reserva-nombre" className="text-sm font-semibold">Nombre</label>
                  <input {...aria("nombre")} autoComplete="given-name" value={f.nombre} onChange={(e) => set("nombre", e.target.value)} className={`${input} ${errors.nombre ? "border-bad" : "border-white/15"}`} />
                  {err("nombre")}
                </div>
                <div className="grid gap-2">
                  <label htmlFor="reserva-telefono" className="text-sm font-semibold">Teléfono</label>
                  <input {...aria("telefono")} type="tel" inputMode="tel" autoComplete="tel" value={f.telefono} onChange={(e) => set("telefono", e.target.value)} className={`${input} ${errors.telefono ? "border-bad" : "border-white/15"}`} />
                  {err("telefono")}
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="reserva-coche" className="text-sm font-semibold">Coche que quieres revisar</label>
                <input {...aria("coche")} placeholder="Enlace del anuncio o marca, modelo y año" value={f.coche} onChange={(e) => set("coche", e.target.value)} className={`${input} ${errors.coche ? "border-bad" : "border-white/15"}`} />
                {err("coche")}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="reserva-zona" className="text-sm font-semibold">Dónde está el coche</label>
                  <input {...aria("zona")} list="reserva-zonas" placeholder="Barrio o municipio" value={f.zona} onChange={(e) => set("zona", e.target.value)} className={`${input} ${errors.zona ? "border-bad" : "border-white/15"}`} />
                  <datalist id="reserva-zonas">
                    {[...areas.capital.map((a) => `Madrid, ${a}`), ...areas.municipios].map((a) => <option key={a} value={a} />)}
                  </datalist>
                  {err("zona")}
                </div>
                <div className="grid gap-2">
                  <label htmlFor="reserva-fecha" className="text-sm font-semibold">
                    Fecha preferida <span className="font-normal text-mute">(opcional)</span>
                  </label>
                  <input id="reserva-fecha" type="date" min={new Date().toISOString().slice(0, 10)} value={f.fecha} onChange={(e) => set("fecha", e.target.value)} className={`${input} border-white/15 [color-scheme:dark]`} />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="flex items-start gap-3 text-[15px] leading-relaxed text-mute">
                  <input
                    {...aria("privacidad")}
                    type="checkbox"
                    checked={f.privacidad}
                    onChange={(e) => set("privacidad", e.target.checked)}
                    className="mt-1 size-5 shrink-0 rounded accent-[#f17205]"
                  />
                  <span>
                    Acepto que me contactéis para esta reserva según la{" "}
                    <a href="/privacidad" className="text-bone underline underline-offset-2 hover:text-brand">política de privacidad</a>.
                  </span>
                </label>
                {err("privacidad")}
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 text-base font-semibold text-ink transition-[transform,background-color] hover:bg-brand-soft active:scale-[0.98]"
              >
                Reservar revisión
                <ArrowRight weight="bold" className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </button>
              <p className="text-sm text-mute-2">Se abrirá WhatsApp con tu solicitud ya escrita. No pagas nada hasta confirmar la cita.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
