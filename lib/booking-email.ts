import { Resend } from "resend"
import { C, button, dataTable, esc, layout, paragraph } from "./email-layout"
import { FINAL_URL, site, whatsappUrl } from "./site"

// Emails del formulario de reserva: aviso interno a contacto@ y confirmación al cliente.

export type Booking = { nombre: string; telefono: string; coche: string; zona: string; fecha: string; email: string }

const FROM = process.env.EMAIL_FROM ?? `${site.name} <no-reply@revisioncochemadrid.es>`
/** Adónde llegan las reservas. */
const NOTIFY_TO = process.env.BOOKING_NOTIFY_TO ?? site.email
/** Copia oculta de cada reserva. BOOKING_NOTIFY_BCC (separadas por comas) sustituye la lista. */
const NOTIFY_BCC = (process.env.BOOKING_NOTIFY_BCC ?? "epicarscoches@gmail.com,marteloemerson@gmail.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean)
// Los emails se leen fuera de la web: logo y enlaces siempre con el dominio definitivo
const LOGO = `${FINAL_URL}/logo-rcm.png`
const footer = { name: site.name, phone: site.phone, email: site.email, web: FINAL_URL }

const fechaTexto = (f: string) =>
  f ? new Date(`${f}T12:00`).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }) : "Sin preferencia"

const esUrl = (s: string) => /^https?:\/\//i.test(s.trim())
const cocheHtml = (c: string) =>
  esUrl(c) ? `<a href="${esc(c.trim())}" style="color:${C.brandDark};">${esc(c.trim().replace(/^https?:\/\/(www\.)?/, "").slice(0, 60))}</a>` : esc(c)

/** Aviso interno: nueva solicitud, con acceso directo a WhatsApp y llamada del cliente. */
export function buildBookingNotification(b: Booking) {
  const tel = b.telefono.replace(/[^\d+]/g, "")
  const waNumber = tel.startsWith("+") ? tel.slice(1) : tel.length === 9 ? `34${tel}` : tel
  const wa = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hola ${b.nombre.split(" ")[0]}, te escribimos de ${site.name} por la revisión que has solicitado.`)}`
  const subject = `Nueva reserva: ${b.nombre} · ${b.zona}`
  const html = layout({
    preheader: `${b.nombre} quiere revisar un coche en ${b.zona}. Fecha: ${fechaTexto(b.fecha)}.`,
    eyebrow: "Nueva solicitud desde la web",
    title: `${b.nombre} quiere reservar una revisión`,
    logoUrl: LOGO,
    footer,
    content: [
      dataTable([
        ["Nombre", esc(b.nombre)],
        ["Teléfono", `<a href="tel:${tel}" style="color:${C.text};text-decoration:none;">${esc(b.telefono)}</a>`],
        ...(b.email ? ([["Email", `<a href="mailto:${esc(b.email)}" style="color:${C.text};text-decoration:none;">${esc(b.email)}</a>`]] as [string, string][]) : []),
        ["Coche", cocheHtml(b.coche)],
        ["Dónde está", esc(b.zona)],
        ["Fecha preferida", esc(fechaTexto(b.fecha))],
      ]),
      `<div style="height:22px;line-height:22px;">&nbsp;</div>`,
      button(wa, "Responder por WhatsApp"),
      button(`tel:${tel}`, "Llamar", true),
      `<div style="height:8px;line-height:8px;">&nbsp;</div>`,
      paragraph(`<span style="font-size:13px;color:${C.mute};">Recibida el ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}.${b.email ? " Si respondes a este correo, le contestas directamente al cliente." : ""}</span>`),
    ].join(""),
  })
  const text = [
    `Nueva solicitud de revisión`,
    ``,
    `Nombre: ${b.nombre}`,
    `Teléfono: ${b.telefono}`,
    b.email ? `Email: ${b.email}` : null,
    `Coche: ${b.coche}`,
    `Dónde está: ${b.zona}`,
    `Fecha preferida: ${fechaTexto(b.fecha)}`,
    ``,
    `WhatsApp: ${wa}`,
  ].filter((l) => l !== null).join("\n")
  return { subject, html, text }
}

/** Confirmación al cliente: qué ha pedido y qué pasa ahora. */
export function buildBookingConfirmation(b: Booking) {
  const nombre = b.nombre.split(" ")[0]
  const subject = "Hemos recibido tu solicitud de revisión"
  const html = layout({
    preheader: "Te escribimos en unas horas para confirmar el precio y la cita.",
    eyebrow: "Solicitud recibida",
    title: `Gracias, ${nombre}. Ya tenemos tu solicitud.`,
    logoUrl: LOGO,
    footer,
    content: [
      paragraph("Te escribiremos por WhatsApp en unas horas (dentro de nuestro horario) para confirmar el precio, el día y la hora, y hablar con el vendedor si lo necesitas."),
      dataTable([
        ["Coche", cocheHtml(b.coche)],
        ["Dónde está", esc(b.zona)],
        ["Fecha preferida", esc(fechaTexto(b.fecha))],
      ]),
      `<div style="height:22px;line-height:22px;">&nbsp;</div>`,
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.brandSoft};border:1px solid #fed7aa;border-radius:14px;"><tr><td style="padding:18px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <div style="font-size:15px;font-weight:700;color:${C.text};">Mientras tanto, no pagues ninguna señal</div>
        <div style="font-size:14px;line-height:1.55;color:${C.body};margin-top:4px;">Si el vendedor te mete prisa, dile que el coche se revisa antes. Un vendedor que no tiene nada que esconder no pone pegas.</div>
      </td></tr></table>`,
      `<div style="height:24px;line-height:24px;">&nbsp;</div>`,
      button(whatsappUrl(`Hola, soy ${b.nombre}. Acabo de pedir una revisión en la web.`), "Escribirnos por WhatsApp"),
      button(`tel:${site.phone.replace(/\s+/g, "")}`, site.phone, true),
      `<div style="height:8px;line-height:8px;">&nbsp;</div>`,
      paragraph(`<span style="font-size:13px;color:${C.mute};">Precio: ${site.price.amount} € IVA incluido (${site.premium.label.toLowerCase()}: ${site.premium.amount} €). No pagas nada hasta confirmar la cita.</span>`),
    ].join(""),
  })
  const text = [
    `Gracias, ${nombre}. Ya tenemos tu solicitud.`,
    ``,
    `Te escribiremos por WhatsApp en unas horas para confirmar el precio, el día y la hora.`,
    ``,
    `Coche: ${b.coche}`,
    `Dónde está: ${b.zona}`,
    `Fecha preferida: ${fechaTexto(b.fecha)}`,
    ``,
    `Mientras tanto, no pagues ninguna señal.`,
    ``,
    `${site.name} · ${site.phone} · ${site.email}`,
  ].join("\n")
  return { subject, html, text }
}

/** Envía el aviso interno y, si el cliente dejó email, su confirmación. `testTo` redirige ambos (pruebas). */
export async function sendBookingEmails(b: Booking, testTo?: string) {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("Falta RESEND_API_KEY")
  const resend = new Resend(key)
  const aviso = buildBookingNotification(b)
  const { error } = await resend.emails.send({
    from: FROM,
    to: [testTo ?? NOTIFY_TO],
    // En las pruebas (testTo) no se copia a nadie
    bcc: testTo ? undefined : NOTIFY_BCC,
    replyTo: b.email || undefined,
    subject: aviso.subject,
    html: aviso.html,
    text: aviso.text,
  })
  if (error) throw new Error(error.message)

  // La confirmación no debe tumbar la reserva: si falla, el aviso interno ya ha llegado
  if (b.email) {
    const conf = buildBookingConfirmation(b)
    const r = await resend.emails.send({ from: FROM, to: [testTo ?? b.email], replyTo: site.email, subject: conf.subject, html: conf.html, text: conf.text })
    if (r.error) console.warn("No se pudo enviar la confirmación al cliente:", r.error.message)
  }
}
