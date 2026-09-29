"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { DownloadSimple, X } from "@phosphor-icons/react"
import { EXAMPLE_PAGES as PAGES, EXAMPLE_PDF, examplePage } from "@/lib/example-report"

// Visor del informe de ejemplo dentro de la web: las páginas del PDF como imágenes
// (en iPhone un PDF incrustado solo enseña la primera página) y la descarga del PDF.

const ViewerContext = createContext<() => void>(() => {})

/** Envuelve la página: cualquier `ReportViewerTrigger` de dentro abre el mismo visor. */
export function ReportViewerProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [mounted, setMounted] = useState(false)

  const open = useCallback(() => {
    setMounted(true) // las páginas no se descargan hasta que alguien abre el visor
    dialog.current?.showModal()
    document.documentElement.style.overflow = "hidden"
  }, [])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    const onClose = () => { document.documentElement.style.overflow = "" }
    d.addEventListener("close", onClose)
    return () => d.removeEventListener("close", onClose)
  }, [])

  return (
    <ViewerContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="visor-titulo"
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close() }}
        className="m-0 h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 text-bone backdrop:bg-black/85 backdrop:backdrop-blur-sm sm:m-auto sm:h-[92dvh] sm:max-w-3xl"
      >
        <div className="flex h-full flex-col overflow-hidden bg-ink-2 sm:rounded-2xl sm:border sm:border-line">
          <div className="flex items-center gap-3 border-b border-line px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
            <h2 id="visor-titulo" className="min-w-0 flex-1 truncate font-semibold">Informe de ejemplo</h2>
            <a
              href={EXAMPLE_PDF}
              download="RCM-informe-ejemplo.pdf"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-sm font-semibold hover:border-brand hover:text-brand"
            >
              <DownloadSimple weight="bold" className="size-4" aria-hidden /> Descargar PDF
            </a>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Cerrar" className="-mr-1 rounded-full p-2 text-mute hover:bg-white/5 hover:text-bone">
              <X weight="bold" className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain bg-[#2a2727] px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-6">
            {mounted ? (
              <ol className="mx-auto grid max-w-2xl gap-4">
                {Array.from({ length: PAGES }, (_, i) => (
                  <li key={i}>
                    <Image
                      src={examplePage(i + 1)}
                      alt={`Página ${i + 1} de ${PAGES} del informe de ejemplo`}
                      width={1241}
                      height={1754}
                      sizes="(min-width: 640px) 672px, 100vw"
                      className="h-auto w-full rounded-md shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)]"
                    />
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </div>
      </dialog>
    </ViewerContext.Provider>
  )
}

/** Botón (o envoltorio clicable) que abre el visor del informe de ejemplo. */
export function ReportViewerTrigger({ children, className = "", label }: { children: React.ReactNode; className?: string; label?: string }) {
  const open = useContext(ViewerContext)
  return (
    <button type="button" onClick={open} className={className} aria-label={label} aria-haspopup="dialog">
      {children}
    </button>
  )
}
