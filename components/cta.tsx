"use client"

import { ArrowRight, Phone, WhatsappLogo } from "@phosphor-icons/react"
import { phoneHref, whatsappUrl } from "@/lib/site"
import { track } from "@/lib/track"

// Una etiqueta por intención en toda la página:
//   reservar  -> "Reservar revisión" (lleva al formulario)
//   whatsapp  -> "Hablar por WhatsApp"
//   llamar    -> el número de teléfono
const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,border-color] duration-200 ease-out active:scale-[0.98]"
const sizes = { md: "h-12 px-6 text-[15px]", sm: "h-9 px-4 text-[13px]" }

export function ReservarButton({ from, className = "", size = "md" }: { from: string; className?: string; size?: keyof typeof sizes }) {
  return (
    <a
      href="#reservar"
      onClick={() => track("cta_reservar", { from })}
      className={`${base} ${sizes[size]} group bg-brand text-ink hover:bg-brand-soft ${className}`}
    >
      Reservar revisión
      <ArrowRight weight="bold" className={`${size === "sm" ? "size-3.5" : "size-4"} transition-transform duration-200 group-hover:translate-x-0.5`} aria-hidden />
    </a>
  )
}

export function WhatsappButton({ from, className = "", text }: { from: string; className?: string; text?: string }) {
  return (
    <a
      href={whatsappUrl(text)}
      target="_blank"
      rel="noopener"
      onClick={() => track("cta_whatsapp", { from })}
      className={`${base} ${sizes.md} border border-white/15 bg-white/[0.03] text-bone hover:border-white/30 hover:bg-white/[0.06] ${className}`}
    >
      <WhatsappLogo weight="fill" className="size-5 text-[#25d366]" aria-hidden />
      Hablar por WhatsApp
    </a>
  )
}

export function PhoneLink({ from, label, className = "" }: { from: string; label: string; className?: string }) {
  return (
    <a
      href={phoneHref}
      onClick={() => track("cta_llamar", { from })}
      className={`inline-flex items-center gap-2 font-semibold text-bone underline-offset-4 hover:text-brand hover:underline ${className}`}
    >
      <Phone weight="bold" className="size-4 text-brand" aria-hidden />
      {label}
    </a>
  )
}
