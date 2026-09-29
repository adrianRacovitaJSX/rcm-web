import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileCtaBar } from "@/components/mobile-cta-bar"
import { JsonLd } from "@/components/json-ld"
import { Hero } from "@/components/sections/hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { Risks } from "@/components/sections/risks"
import { ChecklistTabs } from "@/components/sections/checklist-tabs"
import { Process } from "@/components/sections/process"
import { Report } from "@/components/sections/report"
import { Pricing } from "@/components/sections/pricing"
import { Testimonials } from "@/components/sections/testimonials"
import { Areas } from "@/components/sections/areas"
import { Faq } from "@/components/sections/faq"
import { Booking } from "@/components/sections/booking"
import { ReportViewerProvider } from "@/components/report-viewer"

// Orden pensado para la conversión: promesa y acción (hero), qué incluye, el miedo
// que resolvemos, la prueba (checklist e informe), cómo es el proceso, precio,
// prueba social, objeciones (zona y preguntas) y, al final, la reserva.
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <SiteHeader />
      <ReportViewerProvider>
        <main id="contenido">
          <Hero />
          <TrustBar />
          <Risks />
          <ChecklistTabs />
          <Process />
          <Report />
          <Pricing />
          <Testimonials />
          <Areas />
          <Faq />
          <Booking />
        </main>
      </ReportViewerProvider>
      <SiteFooter />
      <MobileCtaBar />
    </>
  )
}
