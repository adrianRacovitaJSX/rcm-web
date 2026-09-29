// Datos del negocio. Todo lo que aparece en la web (textos de contacto, precio,
// zonas, preguntas frecuentes, datos estructurados para Google) sale de aquí.
//
// Los valores marcados con PENDIENTE son provisionales: hay que confirmarlos o
// sustituirlos antes de publicar la web.

export const site = {
  name: "Revisión Coche Madrid",
  shortName: "RCM",
  url: "https://revisioncochemadrid.es",
  // App de informes: aloja la verificación pública de informes (/verificar)
  informesUrl: process.env.NEXT_PUBLIC_INFORMES_URL ?? "https://informes.revisioncochemadrid.es",
  description:
    "Revisión pre-compra de coches usados en toda la Comunidad de Madrid. Un mecánico revisa 51 puntos del coche y te entrega un informe en PDF con fotos y vídeo antes de que pagues.",

  phone: "+34 643 34 54 59",
  // Número de WhatsApp en formato internacional sin "+" ni espacios (el mismo que el teléfono)
  whatsapp: "34643345459",
  email: "contacto@revisioncochemadrid.es",

  // PENDIENTE: horario real (formato schema.org para Google y texto visible)
  hours: { text: "Lunes a sábado, de 9:00 a 20:00", schema: ["Mo-Sa 09:00-20:00"] },

  // Precio de la revisión. Se muestra en la sección de precio y en los datos para Google.
  price: { amount: 245, currency: "EUR", note: "IVA incluido" },
  // Precio para coches de alta gama
  premium: { amount: 350, label: "Coches de alta gama", examples: "Ferrari, Lamborghini y similares" },
  // PENDIENTE: confirmar condiciones de desplazamiento
  travelNote: "Desplazamiento incluido en Madrid capital. Fuera de la M-40, te decimos el suplemento antes de reservar.",

  // PENDIENTE: nota media y número de reseñas de Google. Con `null` no se muestra nada.
  rating: null as null | { value: number; count: number; url: string },

  // PENDIENTE: redes sociales (se enlazan en el pie y en los datos para Google)
  social: [] as { label: string; url: string }[],

  // PENDIENTE: datos del titular para el aviso legal (LSSI). Con `null` no se muestran.
  // Deben estar completos antes de publicar la web.
  legal: { owner: null as string | null, taxId: null as string | null, address: null as string | null },
} as const

/** Datos del titular que existen, listos para mostrar (los que están a `null` se omiten). */
export const legalDetails = () =>
  [
    site.legal.owner,
    site.legal.taxId ? `NIF ${site.legal.taxId}` : null,
    site.legal.address ? `Domicilio: ${site.legal.address}` : null,
  ].filter(Boolean) as string[]

export const whatsappUrl = (text = "Hola, quiero reservar una revisión de un coche usado.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const verifyUrl = `${site.informesUrl}/verificar`

export const phoneHref = `tel:${site.phone.replace(/\s+/g, "")}`

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)

// Zona de servicio. Sirve para la sección "Dónde trabajamos" y para `areaServed`.
export const areas = {
  capital: [
    "Centro", "Arganzuela", "Retiro", "Salamanca", "Chamartín", "Tetuán", "Chamberí",
    "Fuencarral-El Pardo", "Moncloa-Aravaca", "Latina", "Carabanchel", "Usera",
    "Puente de Vallecas", "Moratalaz", "Ciudad Lineal", "Hortaleza", "Villaverde",
    "Villa de Vallecas", "Vicálvaro", "San Blas-Canillejas", "Barajas",
  ],
  // Se trabaja en toda la Comunidad. Estos son los municipios que se nombran en la web
  // (y en los datos para Google), agrupados por zona: los más poblados y los que más se buscan.
  zonas: [
    { nombre: "Norte", municipios: ["Alcobendas", "San Sebastián de los Reyes", "Tres Cantos", "Colmenar Viejo", "Algete"] },
    { nombre: "Este y Corredor del Henares", municipios: ["Coslada", "San Fernando de Henares", "Torrejón de Ardoz", "Alcalá de Henares", "Rivas-Vaciamadrid", "Arganda del Rey"] },
    { nombre: "Sur", municipios: ["Getafe", "Leganés", "Fuenlabrada", "Parla", "Alcorcón", "Móstoles", "Pinto", "Valdemoro", "Aranjuez", "Navalcarnero"] },
    { nombre: "Oeste y sierra", municipios: ["Pozuelo de Alarcón", "Majadahonda", "Las Rozas", "Boadilla del Monte", "Villaviciosa de Odón", "Torrelodones", "Galapagar", "Collado Villalba", "San Lorenzo de El Escorial"] },
  ],
  get municipios() {
    return this.zonas.flatMap((z) => z.municipios)
  },
}

// PENDIENTE: sustituir por reseñas reales (con permiso del cliente). Son ejemplos
// para ver el diseño; no publicar la web con estos textos. Con la lista vacía, la
// sección no aparece.
export const testimonials: { quote: string; name: string; context: string }[] = [
  {
    quote: "Iba a pagar la señal esa misma tarde. El informe sacó los discos y las pastillas al límite y un error de la EGR guardado. Me rebajaron 700 euros.",
    name: "Álvaro Muñiz",
    context: "Golf TDI de 2021, particular en Leganés",
  },
  {
    quote: "Vivo en Valencia y el coche estaba en Madrid. Me mandaron el PDF con vídeos del arranque y pude decidir sin moverme.",
    name: "Nerea Solís",
    context: "Mazda CX-5 de 2022, concesionario en Alcobendas",
  },
  {
    quote: "Me dijeron que no lo comprara. Tenía la aleta repintada y la distribución sin facturas. Mejor pagar la revisión que el disgusto.",
    name: "Íñigo Carrasco",
    context: "Audi A3 de 2020, particular en Chamartín",
  },
]

// PENDIENTE: revisar que cada respuesta describe cómo trabajáis de verdad.
export const faqs: { q: string; a: string }[] = [
  {
    q: "¿Cuánto dura la revisión?",
    a: "Alrededor de una hora y media, según el coche. Incluye la revisión en parado, la diagnosis electrónica y una prueba en marcha si el vendedor la permite.",
  },
  {
    q: "¿Tengo que estar presente?",
    a: "No hace falta. Quedamos directamente con el vendedor y tú recibes el informe completo con fotos y vídeo. Si quieres venir, mejor: te explicamos cada punto allí mismo.",
  },
  {
    q: "¿Cuándo recibo el informe?",
    a: "Al terminar la revisión te lo enviamos en PDF por WhatsApp y por email. Lleva un código único para que cualquiera pueda comprobar que es el original.",
  },
  {
    q: "¿Revisáis coches de particular y de concesionario?",
    a: "Sí, de los dos. Solo necesitamos que el vendedor nos deje ver el coche con el motor en frío y hacer la prueba en marcha.",
  },
  {
    q: "¿Revisáis coches híbridos y eléctricos?",
    a: "Sí. En los eléctricos no aplican los puntos del motor térmico y lo indicamos en el informe como no aplicable, sin cobrarte más.",
  },
  {
    q: "¿Me sirve el informe para negociar el precio?",
    a: "Sí. Cada incidencia lleva su foto o vídeo y una nota del mecánico, así que puedes enseñárselo al vendedor y pedir que la arregle o que rebaje el precio.",
  },
  {
    q: "¿Qué pasa si el vendedor cancela o no deja revisar el coche?",
    a: "Si nos avisas antes de salir, cambiamos la cita sin coste. Si el vendedor no aparece o no deja hacer la revisión cuando ya estamos allí, solo se cobra el desplazamiento.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Por Bizum o transferencia al confirmar la cita. Recibes la factura con el informe.",
  },
]
