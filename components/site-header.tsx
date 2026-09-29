"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { List, X } from "@phosphor-icons/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ReservarButton, WhatsappButton } from "./cta"
import { testimonials, verifyUrl } from "@/lib/site"

const links = [
  { href: "#revision", label: "Qué revisamos" },
  { href: "#informe", label: "El informe" },
  { href: "#precio", label: "Precio" },
  ...(testimonials.length ? [{ href: "#opiniones", label: "Opiniones" }] : []),
  { href: "#preguntas", label: "Preguntas" },
  { href: verifyUrl, label: "Verificar informe" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 md:px-8">
          <a href="#" className="relative h-9 w-[92px] shrink-0" aria-label="Revisión Coche Madrid, inicio">
            <Image src="/logo-rcm-simbolo.png" alt="" fill priority sizes="92px" className="object-contain object-left" />
          </a>

          <nav aria-label="Principal" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-7 text-[14px] font-medium text-mute">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-bone">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto hidden sm:block lg:ml-0">
            <ReservarButton from="cabecera" size="sm" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="-mr-2 ml-auto rounded-full p-2 text-bone sm:ml-0 lg:hidden"
          >
            {open ? <X className="size-6" /> : <List className="size-6" />}
          </button>
        </div>
      </header>

      {/* Fuera del <header>: su backdrop-filter haría que "fixed" se posicionara respecto a la cabecera */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-50 overflow-y-auto border-t border-line bg-ink px-5 pb-10 pt-6 lg:hidden"
          >
            <nav aria-label="Menú móvil">
              <ul className="divide-y divide-line">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={() => setOpen(false)} className="display block py-4 text-2xl font-semibold">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 grid gap-3" onClick={() => setOpen(false)}>
              <ReservarButton from="menu-movil" className="w-full" />
              <WhatsappButton from="menu-movil" className="w-full" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
