import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

// Solo páginas indexables: las legales (aviso legal, privacidad, cookies) llevan noindex
// y no deben estar aquí. Se incluyen las imágenes principales para Google Imágenes.
// lastModified es la fecha de compilación: cambia en cada despliegue.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${site.url}/images/mecanico-diagnosis.jpg`,
        `${site.url}/images/bajos-coche.jpg`,
        `${site.url}/images/mapa-comunidad-madrid.jpg`,
        `${site.url}/images/informe-ejemplo-1.jpg`,
      ],
    },
  ]
}
