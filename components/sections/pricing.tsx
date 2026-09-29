import { CheckCircle } from "@phosphor-icons/react/dist/ssr"
import { Reveal } from "../reveal"
import { ReservarButton } from "../cta"
import { formatPrice, site } from "@/lib/site"
import { TOTAL_ITEMS } from "@/lib/checklist"

const included = [
  `Revisión de ${TOTAL_ITEMS} puntos`,
  "Diagnosis electrónica con máquina",
  "Prueba en marcha",
  "Fotos y vídeo de cada incidencia",
  "Informe en PDF con código único",
  "Explicación del informe por teléfono",
]

export function Pricing() {
  return (
    <section id="precio" aria-labelledby="precio-titulo" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal className="relative overflow-hidden rounded-2xl border border-brand/30 bg-[radial-gradient(120%_120%_at_0%_0%,rgb(241_114_5/0.16),transparent_55%),#121111]">
        <div className="grid gap-12 p-8 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:p-16">
          <div className="flex flex-col">
            <h2 id="precio-titulo" className="display text-4xl font-bold leading-[1.05] md:text-5xl">
              Un precio cerrado.
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-mute">
              Sin sorpresas al terminar: pagas lo mismo aunque el coche tenga veinte fallos.
            </p>
            <p className="mt-10 flex items-baseline gap-3">
              <span className="display text-6xl font-bold tabular-nums md:text-7xl">{formatPrice(site.price.amount)}</span>
              <span className="text-mute">{site.price.note}</span>
            </p>
            <p className="mt-3 text-[15px] text-mute">
              {site.premium.label} ({site.premium.examples}):{" "}
              <b className="font-semibold text-bone">{formatPrice(site.premium.amount)}</b>
            </p>
            <div className="mt-8">
              <ReservarButton from="precio" />
            </div>
          </div>

          <div className="lg:border-l lg:border-line lg:pl-16">
            <h3 className="font-semibold text-mute">Incluye</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px]">
                  <CheckCircle weight="fill" className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-line pt-6 text-[15px] leading-relaxed text-mute">{site.travelNote}</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
