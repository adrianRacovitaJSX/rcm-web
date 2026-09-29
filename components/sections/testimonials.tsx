import { Reveal } from "../reveal"
import { testimonials } from "@/lib/site"

// Una opinión destacada y el resto en columna. Sin la lista en lib/site.ts, la sección no aparece.
export function Testimonials() {
  if (!testimonials.length) return null
  const [first, ...rest] = testimonials

  return (
    <section id="opiniones" aria-labelledby="opiniones-titulo" className="border-y border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <h2 id="opiniones-titulo" className="display max-w-3xl text-4xl font-bold leading-[1.05] md:text-5xl">
          Revisaron antes de comprar.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal as="div">
            <figure>
              <blockquote className="display text-2xl font-medium leading-snug md:text-[2rem] md:leading-[1.25]">
                <span className="text-brand">“</span>{first.quote}<span className="text-brand">”</span>
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold">{first.name}</p>
                <p className="text-sm text-mute">{first.context}</p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid content-start gap-10 lg:border-l lg:border-line lg:pl-16">
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={0.08 * (i + 1)}>
                <figure>
                  <blockquote className="leading-relaxed text-bone/90">“{t.quote}”</blockquote>
                  <figcaption className="mt-4">
                    <p className="text-[15px] font-semibold">{t.name}</p>
                    <p className="text-sm text-mute">{t.context}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
