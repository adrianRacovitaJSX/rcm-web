import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { legalDetails, site } from "@/lib/site"

export const metadata: Metadata = { title: "Política de privacidad", robots: { index: false } }

// PENDIENTE: revisar con asesoría. Texto base conforme al RGPD y la LOPDGDD.
export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <h2>Responsable</h2>
      <p>{[site.name, ...legalDetails()].join(". ")}. Contacto: {site.email}.</p>
      <h2>Qué datos tratamos y para qué</h2>
      <p>
        Los que nos das en el formulario de reserva o por WhatsApp (nombre, teléfono, email si lo indicas, datos del coche y zona) para gestionar tu cita, hacer la
        revisión y enviarte el informe.
      </p>
      <h2>Base legal</h2>
      <p>Tu consentimiento al enviar la solicitud y, una vez contratada la revisión, la ejecución del servicio.</p>
      <h2>Cuánto tiempo los guardamos</h2>
      <p>Mientras dure la relación y, después, el tiempo que exijan las obligaciones fiscales y contables.</p>
      <h2>Con quién los compartimos</h2>
      <p>
        Con nadie para fines comerciales. Para gestionar las reservas usamos proveedores que tratan los datos por encargo nuestro: Resend
        (envío de los emails del formulario y de los informes) y Vercel (alojamiento de la web). Los mensajes por WhatsApp los gestiona
        WhatsApp Ireland Limited según sus propias condiciones.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {site.email}. Si no quedas conforme,
        puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
      </p>
      <h2>Cookies</h2>
      <p>
        Solo usamos cookies de análisis (Google Analytics) si las aceptas. Tienes el detalle y la forma de cambiar tu elección en la{" "}
        <a href="/cookies" className="text-bone underline underline-offset-2">política de cookies</a>.
      </p>
    </LegalPage>
  )
}
