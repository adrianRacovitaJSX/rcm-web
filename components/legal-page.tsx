import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="relative block h-9 w-[92px]" aria-label="Ir a la página principal">
          <Image src="/logo-rcm-simbolo.png" alt="" fill sizes="92px" className="object-contain object-left" />
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-bone">
          <ArrowLeft weight="bold" className="size-4" aria-hidden />
          Volver a la web
        </Link>
      </div>
      <h1 className="display mt-12 text-4xl font-bold">{title}</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-mute [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-bone">
        {children}
      </div>
      <Link
        href="/"
        className="mt-14 inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 font-semibold text-bone transition-colors hover:border-brand hover:text-brand"
      >
        <ArrowLeft weight="bold" className="size-4" aria-hidden />
        Volver a la web
      </Link>
    </main>
  )
}
