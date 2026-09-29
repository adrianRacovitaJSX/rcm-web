import Image from "next/image"
import { Reveal } from "../reveal"
import { areas } from "@/lib/site"

// Zona de servicio. Nombrar distritos y municipios ayuda a aparecer en búsquedas locales
// ("revisión coche usado Getafe") y responde la primera duda: "¿venís hasta aquí?".
export function Areas() {
  return (
    <section id="zona" aria-labelledby="zona-titulo" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand">Zona de servicio</p>
            <h2 id="zona-titulo" className="display mt-4 text-4xl font-bold leading-[1.05] md:text-5xl">
              Vamos donde esté el coche.
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-mute">
              En toda la Comunidad de Madrid: la capital y el resto de municipios. Si tienes dudas con el tuyo, pregúntanos.
            </p>
          </Reveal>

          {/* Zonas en columnas de texto: se leen de un vistazo y los nombres siguen en el HTML para búsquedas locales */}
          <Reveal delay={0.06}>
            <dl className="mt-10 grid gap-x-10 gap-y-7 border-t border-line pt-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="font-semibold">Madrid capital</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-mute">
                  Los 21 distritos.{" "}
                  <details className="group inline">
                    <summary className="inline cursor-pointer list-none text-bone underline decoration-white/30 underline-offset-4 hover:decoration-brand [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">Ver distritos</span>
                      <span className="hidden group-open:inline">Ocultar</span>
                    </summary>
                    <span className="mt-2 block">{areas.capital.join(", ")}.</span>
                  </details>
                </dd>
              </div>
              {areas.zonas.map((z) => (
                <div key={z.nombre}>
                  <dt className="font-semibold">{z.nombre}</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-mute">{z.municipios.join(", ")}.</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 text-[15px] text-mute">Y el resto de municipios de la Comunidad.</p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink lg:sticky lg:top-24">
          <Image
            src="/images/mapa-comunidad-madrid.jpg"
            alt="Mapa de la Comunidad de Madrid, zona donde trabaja RCM"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  )
}
