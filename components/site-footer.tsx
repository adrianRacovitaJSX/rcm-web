import Image from "next/image"
import Link from "next/link"
import { phoneHref, site, verifyUrl, whatsappUrl } from "@/lib/site"
import { CookieSettingsButton } from "./cookie-consent"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-ink-2 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <Image src="/logo-rcm.png" alt={site.name} width={912} height={417} sizes="176px" className="h-auto w-44" />
          <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-mute">
            Revisión de coches usados antes de comprarlos, en toda la Comunidad de Madrid.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-sm font-semibold text-bone">La revisión</h2>
          <ul className="mt-4 grid gap-2.5 text-[15px] text-mute">
            <li><a href="#revision" className="hover:text-bone">Qué revisamos</a></li>
            <li><a href="#informe" className="hover:text-bone">El informe</a></li>
            <li><a href="#precio" className="hover:text-bone">Precio</a></li>
            <li><a href="#zona" className="hover:text-bone">Zona de servicio</a></li>
            <li><a href="#preguntas" className="hover:text-bone">Preguntas frecuentes</a></li>
            <li><a href={verifyUrl} className="hover:text-bone">Verificar un informe</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-bone">Contacto</h2>
          <ul className="mt-4 grid gap-2.5 text-[15px] text-mute">
            <li><a href={phoneHref} className="hover:text-bone">{site.phone}</a></li>
            <li><a href={whatsappUrl()} target="_blank" rel="noopener" className="hover:text-bone">WhatsApp</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-bone">{site.email}</a></li>
            <li>{site.hours.text}</li>
            {site.social.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noopener" className="hover:text-bone">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-mute-2 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {year} {site.name}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/aviso-legal" className="hover:text-bone">Aviso legal</Link></li>
            <li><Link href="/privacidad" className="hover:text-bone">Privacidad</Link></li>
            <li><Link href="/cookies" className="hover:text-bone">Cookies</Link></li>
            <li><CookieSettingsButton className="hover:text-bone" /></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
