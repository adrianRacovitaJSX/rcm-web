import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { legalDetails, site } from "@/lib/site"

export const metadata: Metadata = { title: "Aviso legal", robots: { index: false } }

// PENDIENTE: revisar con asesoría. Texto base conforme a la LSSI (art. 10).
export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <p>
        En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico, te informamos de los datos del
        titular de {site.url.replace("https://", "")}.
      </p>
      <h2>Titular</h2>
      <p>
        {[site.name, ...legalDetails(), `Email: ${site.email}`, `Teléfono: ${site.phone}`].join(". ")}.
      </p>
      <h2>Uso de la web</h2>
      <p>
        Esta web informa sobre el servicio de revisión de vehículos usados antes de su compra y permite solicitar una cita. Los contenidos son
        propiedad del titular y no pueden reproducirse sin su permiso.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        El informe de revisión describe el estado del vehículo en el momento de la inspección, según lo que se puede comprobar sin desmontar
        piezas. No es una garantía sobre averías futuras.
      </p>
    </LegalPage>
  )
}
