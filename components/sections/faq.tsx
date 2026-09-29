import { Plus } from "@phosphor-icons/react/dist/ssr"
import { faqs, site } from "@/lib/site"
import { PhoneLink } from "../cta"

// Acordeón nativo (<details>): funciona sin JavaScript y Google lee las respuestas.
export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="preguntas-titulo" className="border-y border-line bg-ink-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="preguntas-titulo" className="display text-4xl font-bold leading-[1.05] md:text-5xl">
            Preguntas frecuentes.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mute">¿No está tu duda? Llámanos:</p>
          <PhoneLink from="faq" label={site.phone} className="mt-2 text-lg" />
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus weight="bold" className="size-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="-mt-1 max-w-[62ch] pb-6 leading-relaxed text-mute">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
