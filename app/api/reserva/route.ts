import { NextResponse, type NextRequest } from "next/server"
import { sendBookingEmails, type Booking } from "@/lib/booking-email"

// Solicitudes de reserva del formulario de la web. Envía el aviso a contacto@ y,
// si el cliente dejó email, su confirmación.

const WINDOW_MS = 10 * 60_000
const MAX_PER_WINDOW = 5
const hits = new Map<string, { count: number; reset: number }>()

function limited(ip: string) {
  const now = Date.now()
  const h = hits.get(ip)
  if (!h || h.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS })
    return false
  }
  return ++h.count > MAX_PER_WINDOW
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: "Datos no válidos" }, { status: 400 })

  // Campo trampa invisible: si viene relleno es un bot. Se responde "ok" para no darle pistas.
  if (str(body.web, 200)) return NextResponse.json({ ok: true })

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida"
  if (limited(ip)) return NextResponse.json({ error: "Has enviado varias solicitudes seguidas. Escríbenos por WhatsApp." }, { status: 429 })

  const b: Booking = {
    nombre: str(body.nombre, 80),
    telefono: str(body.telefono, 20),
    coche: str(body.coche, 400),
    zona: str(body.zona, 80),
    fecha: /^\d{4}-\d{2}-\d{2}$/.test(str(body.fecha, 10)) ? str(body.fecha, 10) : "",
    email: str(body.email, 120).toLowerCase(),
  }
  if (
    b.nombre.length < 2 ||
    !/^\+?[\d\s-]{9,15}$/.test(b.telefono) ||
    b.coche.length < 3 ||
    b.zona.length < 2 ||
    (b.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) ||
    body.privacidad !== true
  ) {
    return NextResponse.json({ error: "Revisa los datos del formulario" }, { status: 400 })
  }

  try {
    await sendBookingEmails(b)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("Error enviando la reserva:", e)
    return NextResponse.json({ error: "No hemos podido enviar la solicitud" }, { status: 502 })
  }
}
