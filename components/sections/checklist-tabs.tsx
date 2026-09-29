"use client"

import { useId, useRef, useState } from "react"
import { Check } from "@phosphor-icons/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CHECKLIST, TOTAL_ITEMS } from "@/lib/checklist"

/** Los 51 puntos reales de la app de informes, por bloques. Todos los paneles están
 *  en el HTML (los inactivos con `hidden`), así Google también lee la lista entera. */
export function ChecklistTabs() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const baseId = useId()
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + CHECKLIST.length) % CHECKLIST.length
    setActive(next)
    tabsRef.current[next]?.focus()
  }

  return (
    <section id="revision" aria-labelledby="revision-titulo" className="border-y border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <h2 id="revision-titulo" className="display max-w-3xl text-4xl font-bold leading-[1.05] md:text-5xl">
          Qué revisamos, punto por punto.
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-mute">
          La misma lista de {TOTAL_ITEMS} puntos en cada coche, en el mismo orden. Así ningún coche se revisa a medias.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-14">
          <div
            role="tablist"
            aria-label="Bloques de la revisión"
            aria-orientation="vertical"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {CHECKLIST.map((s, i) => {
              const selected = i === active
              return (
                <button
                  key={s.id}
                  ref={(el) => { tabsRef.current[i] = el }}
                  role="tab"
                  id={`${baseId}-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`flex shrink-0 items-center justify-between gap-6 rounded-full border px-5 py-3 text-left text-[15px] font-semibold transition-colors lg:rounded-2xl lg:py-4 ${
                    selected ? "border-brand/50 bg-brand/10 text-bone" : "border-line text-mute hover:border-white/20 hover:text-bone"
                  }`}
                >
                  {s.title}
                  <span className={`tabular-nums text-sm ${selected ? "text-brand" : "text-mute-2"}`}>{s.items.length}</span>
                </button>
              )
            })}
          </div>

          <div>
            {CHECKLIST.map((s, i) => (
              <div
                key={s.id}
                role="tabpanel"
                id={`${baseId}-panel-${s.id}`}
                aria-labelledby={`${baseId}-tab-${s.id}`}
                hidden={i !== active}
                tabIndex={0}
              >
                <AnimatePresence mode="wait">
                  {i === active ? (
                    <motion.ul
                      key={s.id}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="grid gap-x-10 sm:grid-cols-2"
                    >
                      {s.items.map((it) => (
                        <li key={it.id} className="flex gap-3 border-b border-line py-4">
                          <Check weight="bold" className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                          <div>
                            <p className="font-medium leading-snug">{it.label}</p>
                            {it.hint ? <p className="mt-1 text-sm leading-relaxed text-mute-2">{it.hint}</p> : null}
                          </div>
                        </li>
                      ))}
                    </motion.ul>
                  ) : (
                    // Panel inactivo: la lista sigue en el HTML para buscadores y lectores de pantalla
                    <ul>
                      {s.items.map((it) => <li key={it.id}>{it.label}</li>)}
                    </ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
