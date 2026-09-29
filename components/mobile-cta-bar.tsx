"use client"

import { useEffect, useState } from "react"
import { WhatsappLogo } from "@phosphor-icons/react"
import { ReservarButton } from "./cta"
import { whatsappUrl } from "@/lib/site"
import { track } from "@/lib/track"

/** Barra fija inferior en móvil: la reserva y el WhatsApp siempre a un toque.
 *  Aparece al dejar atrás el hero y se oculta cuando el formulario está en pantalla. */
export function MobileCtaBar() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("inicio")
    const form = document.getElementById("reservar")
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) setHeroVisible(e.isIntersecting)
          if (e.target === form) setFormVisible(e.isIntersecting)
        }
      },
      { threshold: 0.15 }
    )
    if (hero) obs.observe(hero)
    if (form) obs.observe(form)
    return () => obs.disconnect()
  }, [])

  const visible = !heroVisible && !formVisible

  return (
    <div
      inert={!visible}
      className={`safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/90 px-4 pt-3 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="flex gap-2">
        <ReservarButton from="barra-movil" className="flex-1" />
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener"
          onClick={() => track("cta_whatsapp", { from: "barra-movil" })}
          aria-label="Hablar por WhatsApp"
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] active:scale-[0.98]"
        >
          <WhatsappLogo weight="fill" className="size-6 text-[#25d366]" />
        </a>
      </div>
    </div>
  )
}
