import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { CookieSettingsButton } from "@/components/cookie-consent"
import { site } from "@/lib/site"

export const metadata: Metadata = { title: "Política de cookies", robots: { index: false } }

// Si se añade otra herramienta que use cookies (Meta Pixel, Hotjar...), hay que
// añadirla a esta tabla y al banner (components/cookie-consent.tsx) antes de activarla.
const cookies = [
  { name: "rcm-consent", type: "Almacenamiento local", owner: "Propia", purpose: "Recordar si aceptas o rechazas las cookies de análisis.", duration: "12 meses" },
  { name: "_ga", type: "Cookie de análisis", owner: "Google Ireland Ltd.", purpose: "Distinguir visitantes de forma anónima para contar las visitas.", duration: "2 años" },
  { name: "_ga_<ID>", type: "Cookie de análisis", owner: "Google Ireland Ltd.", purpose: "Mantener el estado de la visita (páginas vistas, duración).", duration: "2 años" },
]

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        Esta política explica qué cookies usa {site.url.replace("https://", "")} y cómo puedes aceptarlas, rechazarlas o cambiar tu
        elección en cualquier momento.
      </p>

      <h2>Qué son las cookies</h2>
      <p>
        Son pequeños archivos que una web guarda en tu navegador para recordar información sobre tu visita. Algunas son necesarias para que la
        web funcione; otras sirven para medir cómo se usa.
      </p>

      <h2>Qué cookies usamos</h2>
      <p>
        Solo usamos cookies de análisis de Google Analytics, y únicamente si las aceptas. Mientras no decidas, o si las rechazas, Google
        Analytics no se carga. No usamos cookies de publicidad ni compartimos datos con fines publicitarios.
      </p>
      <div className="-mx-5 overflow-x-auto px-5">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="text-bone">
            <tr className="border-b border-line">
              <th className="py-3 pr-4 font-semibold">Nombre</th>
              <th className="py-3 pr-4 font-semibold">Tipo</th>
              <th className="py-3 pr-4 font-semibold">Titular</th>
              <th className="py-3 pr-4 font-semibold">Finalidad</th>
              <th className="py-3 font-semibold">Duración</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((c) => (
              <tr key={c.name} className="border-b border-line align-top">
                <td className="py-3 pr-4 font-mono text-bone">{c.name}</td>
                <td className="py-3 pr-4">{c.type}</td>
                <td className="py-3 pr-4">{c.owner}</td>
                <td className="py-3 pr-4">{c.purpose}</td>
                <td className="py-3">{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Google Analytics</h2>
      <p>
        Lo presta Google Ireland Limited. Los datos pueden transferirse a Google LLC en Estados Unidos, que está adherida al Marco de
        Privacidad de Datos UE-EE. UU. Más información en{" "}
        <a href="https://policies.google.com/technologies/cookies?hl=es" target="_blank" rel="noopener" className="text-bone underline underline-offset-2">
          la política de cookies de Google
        </a>
        .
      </p>

      <h2>Cómo cambiar tu elección</h2>
      <p>
        Puedes cambiarla en cualquier momento desde el enlace «Configurar cookies» del pie de página o con este botón. Si retiras el
        consentimiento, borramos las cookies de Google Analytics de tu navegador.
      </p>
      <p>
        <CookieSettingsButton className="inline-flex h-11 items-center rounded-full border border-white/20 px-5 font-semibold text-bone hover:border-brand hover:text-brand" />
      </p>
      <p>
        También puedes bloquear o borrar las cookies desde tu navegador:{" "}
        <a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener" className="text-bone underline underline-offset-2">Chrome</a>,{" "}
        <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener" className="text-bone underline underline-offset-2">Safari</a>,{" "}
        <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener" className="text-bone underline underline-offset-2">Firefox</a> y{" "}
        <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener" className="text-bone underline underline-offset-2">Edge</a>.
      </p>

      <h2>Contacto</h2>
      <p>Para cualquier duda sobre esta política, escríbenos a {site.email}.</p>

      <p className="text-sm text-mute-2">Última actualización: 29 de septiembre de 2026.</p>
    </LegalPage>
  )
}
