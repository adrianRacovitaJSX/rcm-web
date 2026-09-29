import { areas, faqs, site } from "@/lib/site"
import { CHECKLIST, TOTAL_ITEMS } from "@/lib/checklist"

// Datos estructurados para Google: negocio local (taller móvil), el servicio con
// su precio y las preguntas frecuentes. Todo sale de lib/site.ts.
export function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}/#negocio`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/logo-rcm.png`,
    image: `${site.url}/images/mecanico-diagnosis.jpg`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    priceRange: `${site.price.amount}-${site.premium.amount} €`,
    openingHours: site.hours.schema,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Comunidad de Madrid" },
      { "@type": "City", name: "Madrid" },
      ...areas.municipios.map((name) => ({ "@type": "City", name })),
    ],
    sameAs: site.social.map((s) => s.url),
    ...(site.rating
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.value, reviewCount: site.rating.count } }
      : {}),
  }

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/#servicio`,
    name: "Revisión pre-compra de coches usados",
    serviceType: "Inspección de vehículo usado antes de la compra",
    provider: { "@id": `${site.url}/#negocio` },
    areaServed: { "@type": "AdministrativeArea", name: "Comunidad de Madrid" },
    description: `Revisión de ${TOTAL_ITEMS} puntos (${CHECKLIST.map((s) => s.title.toLowerCase()).join(", ")}), diagnosis electrónica e informe en PDF con fotos y vídeo.`,
    offers: [
      {
        "@type": "Offer",
        name: "Revisión pre-compra",
        price: site.price.amount,
        priceCurrency: site.price.currency,
        availability: "https://schema.org/InStock",
        url: `${site.url}/#precio`,
      },
      {
        "@type": "Offer",
        name: `Revisión pre-compra de ${site.premium.label.toLowerCase()}`,
        price: site.premium.amount,
        priceCurrency: site.price.currency,
        availability: "https://schema.org/InStock",
        url: `${site.url}/#precio`,
      },
    ],
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([business, service, faq]).replace(/</g, "\\u003c") }}
    />
  )
}
