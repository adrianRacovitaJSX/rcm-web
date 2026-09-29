import { ChatCircleText, FileText, MapPinArea } from "@phosphor-icons/react/dist/ssr"
import { Reveal } from "../reveal"

const steps = [
  {
    icon: ChatCircleText,
    title: "Nos pasas el anuncio",
    body: "Por WhatsApp o con el formulario. Te confirmamos precio y hora, y hablamos nosotros con el vendedor si lo prefieres.",
  },
  {
    icon: MapPinArea,
    title: "Vamos a ver el coche",
    body: "Donde esté: casa del vendedor, concesionario o compraventa. Revisamos en parado, con la máquina y en marcha.",
  },
  {
    icon: FileText,
    title: "Recibes el informe",
    body: "Al terminar, en PDF por WhatsApp y email. Con cada fallo explicado, fotografiado y ordenado por gravedad.",
  },
]

export function Process() {
  return (
    <section aria-labelledby="proceso-titulo" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 id="proceso-titulo" className="display text-4xl font-bold leading-[1.05] md:text-5xl">
          Así funciona.
        </h2>
      </Reveal>

      <div className="relative mt-14">
        {/* Línea que une los pasos en escritorio */}
        <div aria-hidden className="absolute left-7 right-7 top-7 hidden h-px bg-gradient-to-r from-brand/60 via-white/15 to-white/5 md:block" />
        <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
        {steps.map(({ icon: Icon, title, body }, i) => (
          <Reveal as="li" key={title} delay={0.08 * i} className="relative">
            <span className="relative flex size-14 items-center justify-center rounded-full border border-brand/40 bg-ink">
              <Icon weight="duotone" className="size-7 text-brand" aria-hidden />
            </span>
            <h3 className="mt-6 text-xl font-semibold">{title}</h3>
            <p className="mt-2 max-w-[38ch] leading-relaxed text-mute">{body}</p>
          </Reveal>
        ))}
        </ol>
      </div>
    </section>
  )
}
