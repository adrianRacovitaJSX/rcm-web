import { Camera, Cpu, FilePdf, ListChecks, Star } from "@phosphor-icons/react/dist/ssr"
import { site } from "@/lib/site"
import { TOTAL_ITEMS } from "@/lib/checklist"

// Lo que el cliente recibe, en una línea. Son hechos del servicio, no cifras de adorno.
const facts = [
  { icon: ListChecks, text: `${TOTAL_ITEMS} puntos revisados` },
  { icon: Cpu, text: "Diagnosis y km certificados" },
  { icon: Camera, text: "Fotos y vídeo de cada punto" },
  { icon: FilePdf, text: "Informe en PDF al terminar" },
]

export function TrustBar() {
  return (
    <section aria-label="Qué incluye la revisión" className="border-y border-line bg-ink-2">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:px-8 lg:grid-cols-4">
        {facts.map(({ icon: Icon, text }, i) => (
          <li
            key={text}
            className={`flex items-center gap-3 py-5 text-[15px] font-medium sm:py-6 ${i % 2 === 1 ? "pl-4 sm:pl-6" : ""} ${
              i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""
            } ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}
          >
            <Icon weight="duotone" className="size-6 shrink-0 text-brand" aria-hidden />
            {text}
          </li>
        ))}
      </ul>
      {site.rating ? (
        <a
          href={site.rating.url}
          target="_blank"
          rel="noopener"
          className="mx-auto flex max-w-7xl items-center gap-2 border-t border-line px-5 py-3 text-sm text-mute hover:text-bone md:px-8"
        >
          <Star weight="fill" className="size-4 text-brand" aria-hidden />
          <span>
            <b className="text-bone">{site.rating.value.toLocaleString("es-ES")}</b> de 5 en Google, {site.rating.count} reseñas
          </span>
        </a>
      ) : null}
    </section>
  )
}
