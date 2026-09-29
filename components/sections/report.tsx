import Image from "next/image"
import { Eye, Fingerprint, ListMagnifyingGlass, SealCheck, ShieldCheck, VideoCamera } from "@phosphor-icons/react/dist/ssr"
import { Reveal } from "../reveal"
import { verifyUrl } from "@/lib/site"
import { ReportViewerTrigger } from "../report-viewer"
import { examplePage } from "@/lib/example-report"

// Lo que hace el informe de la app de verdad (ver informes-rcm/lib/pdf).
const features = [
  { icon: ListMagnifyingGlass, title: "Lo grave, primero", body: "La primera página resume qué está mal y qué hay que vigilar, con la nota del mecánico." },
  { icon: VideoCamera, title: "Fotos y vídeo en cada fallo", body: "Los vídeos van con un código QR: los abres desde el móvil y ves el ruido o la avería." },
  { icon: SealCheck, title: "Código verificable", body: "Cada informe lleva un código único. Cualquiera puede comprobar en nuestra web que es auténtico." },
  { icon: Fingerprint, title: "Fotos que no se pueden cambiar", body: "Guardamos la huella digital de cada archivo. Si alguien cambiara una foto, se notaría." },
]

export function Report() {
  return (
    <section id="informe" aria-labelledby="informe-titulo" className="relative overflow-hidden border-y border-line bg-ink-2">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.1fr]">
        {/* Páginas reales de un informe. PENDIENTE: sustituir por un informe real con los datos anonimizados */}
        <Reveal className="relative mx-auto w-full max-w-[520px]">
          <ReportViewerTrigger label="Ver un informe de ejemplo" className="group relative block aspect-[4/5] w-full">
            <div className="absolute right-0 top-0 w-[72%] rotate-[5deg] overflow-hidden rounded-lg border border-white/10 opacity-80 shadow-[0_30px_70px_-20px_rgb(0_0_0/0.8)]">
              <Image src={examplePage(3)} alt="Página de puntos revisados de un informe de RCM" width={1241} height={1754} sizes="(min-width: 1024px) 26vw, 70vw" className="h-auto w-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-[72%] -rotate-[3deg] overflow-hidden rounded-lg border border-white/10 shadow-[0_30px_70px_-20px_rgb(0_0_0/0.9)] transition-transform duration-300 group-hover:-rotate-[1deg] group-hover:scale-[1.02]">
              <Image src={examplePage(1)} alt="Portada de un informe de RCM con las incidencias destacadas" width={1241} height={1754} sizes="(min-width: 1024px) 26vw, 70vw" className="h-auto w-full" />
            </div>
          </ReportViewerTrigger>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">El informe</p>
            <h2 id="informe-titulo" className="display mt-4 text-4xl font-bold leading-[1.05] md:text-5xl">
              Un informe que puedes enseñar al vendedor.
            </h2>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-mute">
              No es una opinión de palabra. Es un PDF con lo que vimos, para decidir o negociar con datos.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={0.05 * i}>
                <Icon weight="duotone" className="size-7 text-brand" aria-hidden />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-mute">{body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              {/* Para quien ya tiene un informe (comprador, vendedor, financiera): comprobar que es auténtico */}
              <a
                href={verifyUrl}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-6 font-semibold text-bone transition-[transform,background-color] hover:bg-brand/20 active:scale-[0.98]"
              >
                <ShieldCheck weight="duotone" className="size-5 text-brand" aria-hidden />
                Verifica tu informe
              </a>
              <ReportViewerTrigger className="inline-flex items-center gap-1.5 font-semibold text-bone underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand">
                <Eye weight="bold" className="size-4" aria-hidden />
                Ver un informe de ejemplo
              </ReportViewerTrigger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
