import type { MetadataRoute } from "next"
import { isIndexable, site } from "@/lib/site"

// Estático: se genera al compilar. En el dominio definitivo deja rastrear todo y
// señala el sitemap; en .vercel.app o previews bloquea el rastreo.
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: [{ userAgent: "*", disallow: "/" }] }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  }
}
