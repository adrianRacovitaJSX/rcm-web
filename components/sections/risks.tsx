import Image from "next/image"
import { CarProfile, Gauge, Plugs, Wrench } from "@phosphor-icons/react/dist/ssr"
import { Reveal } from "../reveal"

const risks = [
  {
    icon: Gauge,
    title: "Kilómetros que no cuadran",
    body: "Cruzamos el cuadro con las horas de motor, los litros de combustible consumidos y los registros de las centralitas.",
    tone: "bg-brand/[0.08] border-brand/25",
  },
  {
    icon: CarProfile,
    title: "Golpes y repintados",
    body: "Medimos la pintura con espesímetro y comprobamos las fechas de fabricación de piezas y cristales para detectar las cambiadas.",
    tone: "bg-ink-2 border-line",
  },
  {
    icon: Plugs,
    title: "Errores guardados en la centralita",
    body: "Conectamos la máquina de diagnosis y leemos los códigos de error, también los que ya no encienden testigos.",
    tone: "bg-ink-2 border-line",
  },
  {
    icon: Wrench,
    title: "Mantenimientos que no se hicieron",
    body: "Revisamos aceite, líquidos y correas, y pedimos las facturas de la distribución.",
    tone: "bg-[linear-gradient(160deg,#1d1a19_0%,#121111_70%)] border-line",
  },
]

export function Risks() {
  return (
    <section aria-labelledby="riesgos-titulo" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal className="max-w-3xl">
        <h2 id="riesgos-titulo" className="display text-4xl font-bold leading-[1.05] md:text-5xl">
          Lo que no se ve en las fotos del anuncio.
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-mute">
          Un coche puede estar reluciente y esconder una avería de miles de euros. Esto es lo que buscamos antes de que firmes.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr] lg:grid-rows-2">
        <Reveal className="relative min-h-[320px] overflow-hidden rounded-2xl border border-line md:col-span-2 lg:col-span-1 lg:row-span-2">
          <Image
            src="/images/bajos-coche.jpg"
            alt="Bajos de un coche vistos desde el foso: subchasis, cárter, escape y suspensión"
            fill
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        {risks.map(({ icon: Icon, title, body, tone }, i) => (
          <Reveal key={title} delay={0.05 * (i + 1)} className={`flex flex-col rounded-2xl border p-7 ${tone}`}>
            <Icon weight="duotone" className="size-8 text-brand" aria-hidden />
            <h3 className="mt-6 text-xl font-semibold leading-snug">{title}</h3>
            <p className="mt-2 leading-relaxed text-mute">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
