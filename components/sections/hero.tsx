import Image from "next/image"
import { ReservarButton, WhatsappButton } from "../cta"
import { ReportViewerTrigger } from "../report-viewer"
import { examplePage } from "@/lib/example-report"

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Fondo por capas: fibra de carbono, luz de faro y fundido (ver .hero-bg en globals.css) */}
      <div aria-hidden className="hero-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 md:px-8 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        {/* El texto no se anima: es lo primero que debe pintarse (LCP) */}
        <div>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">Revisión pre-compra en Madrid</p>
          </div>
          <div>
            <h1 className="display mt-5 text-[2.6rem] font-bold leading-[1.02] sm:text-5xl lg:text-[4.1rem]">
              Revisa el coche usado <span className="text-brand">antes de pagarlo.</span>
            </h1>
          </div>
          <div>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-mute">
              Te explicamos el estado actual del coche con diagnosis, kilómetros certificados y fotos y vídeo de cada punto revisado.
            </p>
          </div>
          <div className="rise" style={{ "--rise-delay": "0.05s" } as React.CSSProperties}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ReservarButton from="hero" />
              <WhatsappButton from="hero" />
            </div>
          </div>
        </div>

        <div className="rise relative lg:pl-6" style={{ "--rise-delay": "0.1s" } as React.CSSProperties}>
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line bg-ink-3">
            <Image
              src="/images/mecanico-diagnosis.jpg"
              alt="Mecánico leyendo la centralita de un coche usado con el ordenador de diagnosis"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>
          {/* Página real del informe: muestra el producto que recibe el cliente y abre el visor */}
          <ReportViewerTrigger
            label="Ver un informe de ejemplo"
            className="absolute -bottom-8 -left-2 w-[34%] rotate-[-4deg] overflow-hidden rounded-lg border border-white/10 shadow-[0_24px_60px_-12px_rgb(0_0_0/0.7)] transition-transform duration-300 hover:rotate-[-2deg] hover:scale-[1.03] sm:-left-6 lg:-left-4"
          >
            <Image
              src={examplePage(1)}
              alt="Primera página de un informe de revisión de RCM"
              width={1241}
              height={1754}
              sizes="(min-width: 1024px) 16vw, 34vw"
              className="h-auto w-full"
            />
          </ReportViewerTrigger>
        </div>
      </div>
    </section>
  )
}
