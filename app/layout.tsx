import type { Metadata, Viewport } from "next"
import { Archivo } from "next/font/google"
import { site } from "@/lib/site"
import { CookieConsent } from "@/components/cookie-consent"
import "./globals.css"

// Archivo variable con eje de anchura: los titulares van extendidos (clase .display)
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" })

const title = "Revisión de coches usados en Madrid antes de comprar | RCM"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "revisión coche usado Madrid",
    "revisión pre-compra coche",
    "inspección coche segunda mano Madrid",
    "peritaje coche usado",
    "revisar coche antes de comprar",
    "mecánico a domicilio Madrid",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false },
  // Verificación de Google Search Console (etiqueta meta; no usa cookies)
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } } : {}),
}

export const viewport: Viewport = {
  themeColor: "#0b0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-ES" className={archivo.variable} data-scroll-behavior="smooth">
      <body className="min-h-[100dvh] font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Saltar al contenido
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
