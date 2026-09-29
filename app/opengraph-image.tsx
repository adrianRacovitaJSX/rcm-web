import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { formatPrice, site } from "@/lib/site"

// Imagen que aparece al compartir la web en WhatsApp, redes o Google Discover.
export const alt = "Revisión Coche Madrid: revisa el coche usado antes de pagarlo"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const logo = await readFile(join(process.cwd(), "public", "logo-rcm.png"))
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 0% 0%, rgba(241,114,5,0.28), transparent 55%), #0b0a0a",
          color: "#f3f1ee",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoSrc} alt="" width={330} height={151} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Revisa el coche usado</div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#f17205" }}>antes de pagarlo.</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#a8a29e" }}>
            {`51 puntos, diagnosis e informe con fotos y vídeo. En toda la Comunidad de Madrid, por ${formatPrice(site.price.amount)}.`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
