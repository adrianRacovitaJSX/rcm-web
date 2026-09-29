# Revisión Coche Madrid · Web

Landing de **revisioncochemadrid.es**: revisión pre-compra de coches usados en Madrid. Su objetivo es que el visitante reserve la revisión (formulario que abre WhatsApp), escriba por WhatsApp o llame.

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:3002
npm run build    # compila la web estática
```

Next.js 16 (App Router, todo estático) + Tailwind v4 + Motion + Phosphor Icons. La fuente es Archivo, con los titulares en su versión ancha.

## Antes de publicar

Todo lo marcado con `PENDIENTE` en el código. Lo principal está en **`lib/site.ts`**:

- [x] Teléfono, WhatsApp y email reales (+34 643 34 54 59, contacto@revisioncochemadrid.es).
- [ ] Horario.
- [x] Precio: 245 € IVA incluido; alta gama (Ferrari, Lamborghini y similares) 350 €.
- [ ] Condiciones de desplazamiento (`travelNote`): ahora dice que Madrid capital está incluido y fuera de la M-40 hay suplemento.
- [x] Zona: toda la Comunidad de Madrid.
- [ ] **Opiniones**: las actuales son ejemplos inventados para ver el diseño. Sustituir por reseñas reales con permiso, o dejar la lista vacía para ocultar la sección.
- [x] Preguntas frecuentes revisadas.
- [ ] Nota de Google (`rating`) cuando haya reseñas. Con `null` no se muestra.
- [ ] Redes sociales.
- [ ] Datos del titular (`legal`: razón social, NIF, domicilio). Mientras estén a `null` no se muestran; son obligatorios (LSSI) al publicar. Revisar los textos legales con asesoría.
- [x] Nombre de la marca: "Revisión Coche Madrid", igual que el logo.

### Imágenes

Sustituir cada archivo manteniendo el mismo nombre (o cambiar la ruta en el componente):

| Archivo | Tamaño | Dónde sale | Qué foto |
| --- | --- | --- | --- |
| `public/images/mecanico-diagnosis.jpg` | 1600 x 1066 (3:2) | Hero | Hecho: mecánico con el ordenador de diagnosis |
| `public/images/bajos-coche.jpg` | 1600 x 1066 | "Lo que no se ve en las fotos" | Hecho: bajos del coche desde el foso |
| `public/images/mapa-comunidad-madrid.jpg` | 880 x 880 (cuadrado) | Zona de servicio | Hecho: mapa recortado de `assets/originales/madrid.png` |
| `public/images/informe-ejemplo-1.jpg`, `-3.jpg` | 1241 x 1754 | Hero e informe | Páginas de un informe real con datos anonimizados |
| `public/informe-ejemplo.pdf` | | "Ver un informe de ejemplo" | El mismo informe completo |

Las imágenes actuales del informe salen de un informe de prueba de la app con fotos dibujadas. `diagnosis.jpg` y `entrega-informe.jpg` sobran por si se quieren usar en otra sección. Los originales de las fotos están en `assets/originales/` (fuera de `public`, no se publican).

## Analítica, Search Console y cookies

Variables de entorno (en Vercel: Settings, Environment Variables; en local: `.env.local`, ver `.env.example`):

| Variable | Qué es |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | Opcional. El ID de GA4 (`G-Z25703QYCP`) ya va en `lib/consent.ts` y solo se activa en compilaciones de producción; esta variable lo sustituye. |
| `NEXT_PUBLIC_SITE_URL` | Opcional. Dirección de la web. Si no se define, en Vercel se usa la de producción del proyecto (la `.vercel.app` y, al conectar el dominio, `revisioncochemadrid.es`). |
| `NEXT_PUBLIC_GSC_VERIFICATION` | En Search Console, verificar con el método "Etiqueta HTML" y copiar solo el valor de `content`. También vale verificar por DNS en Dinahosting y dejarla vacía. |
| `NEXT_PUBLIC_INFORMES_URL` | App de informes, donde está la verificación. Por defecto `https://informes.revisioncochemadrid.es`. Los botones "Verifica tu informe" llevan a `/verificar` de esa app. |

Indexación: la web solo se deja indexar en `https://revisioncochemadrid.es`. En `.vercel.app` y en las previews, `robots.txt` bloquea el rastreo y las páginas llevan `noindex`, así que se puede enseñar al cliente sin que Google indexe la versión provisional. Al conectar el dominio no hay que tocar nada: basta con volver a desplegar. En Vercel, redirigir `www.revisioncochemadrid.es` al dominio sin `www`.

`sitemap.xml` incluye solo la página principal (las legales llevan `noindex`) con sus imágenes principales. En Search Console: enviar `https://revisioncochemadrid.es/sitemap.xml`.

GA se integra con `@next/third-parties` (`GoogleAnalytics`), pero solo se monta tras aceptar las cookies.

Cómo funciona el consentimiento (`components/cookie-consent.tsx`), según la guía de cookies de la AEPD:

- GA no se carga hasta que el usuario acepta: antes no hay cookies ni peticiones a Google.
- "Rechazar" y "Aceptar" están en la primera capa y con el mismo diseño; "Configurar" permite elegir por categoría.
- La elección se guarda 12 meses y se puede cambiar desde "Configurar cookies" (pie de página y página `/cookies`). Al retirarla se borran las cookies `_ga`.
- Si se añade otra herramienta con cookies (Meta Pixel, Hotjar...), hay que añadirla al banner y a la tabla de `/cookies` antes de activarla.

En GA4, marcar como eventos clave `form_enviado`, `cta_whatsapp` y `cta_llamar` para medir conversiones.

## Emails (Resend)

El formulario de reserva (`app/api/reserva/route.ts`) envía, desde `no-reply@revisioncochemadrid.es`:

- **Aviso de nueva reserva** a `contacto@revisioncochemadrid.es` (o `BOOKING_NOTIFY_TO`), con los datos y botones para responder por WhatsApp o llamar. Si el cliente dejó email, al responder al correo le contestas a él.
- **Confirmación al cliente**, solo si dejó su email (campo opcional).

Si el envío falla, el formulario ofrece mandar la solicitud por WhatsApp ya escrita: no se pierde ninguna. Antispam: campo trampa invisible y máximo 5 envíos cada 10 minutos por IP.

Variables: `RESEND_API_KEY`, `EMAIL_FROM` y, opcional, `BOOKING_NOTIFY_TO`. El diseño de los emails está en `lib/email-layout.ts` (la app de informes tiene una copia).

## Conversión (CRO)

- Una etiqueta por intención en toda la página: **Reservar revisión** (formulario), **Hablar por WhatsApp** y el teléfono.
- El formulario no necesita servidor: valida los campos y abre WhatsApp con la solicitud ya escrita. Tiene errores en línea y un estado de éxito.
- En móvil hay una barra fija con Reservar y WhatsApp. Aparece al pasar el hero y se oculta al llegar al formulario.
- El orden de las secciones responde a las dudas del comprador por este orden: qué gano, qué miráis, cómo es el informe, cuánto cuesta, quién lo ha usado, si venís a mi zona y el resto de preguntas.
- Eventos de conversión (`cta_reservar`, `cta_whatsapp`, `cta_llamar`, `form_enviado`, `form_error`): van a GA4 si el usuario acepta la analítica.

## SEO

- Metadatos, canonical, Open Graph e imagen para redes generada (`app/opengraph-image.tsx`).
- Datos estructurados (`components/json-ld.tsx`): `AutoRepair` con zona de servicio, `Service` con precio y `FAQPage`.
- `sitemap.xml`, `robots.txt` y `llms.txt` (para buscadores con IA).
- Un solo H1, un H2 por sección, los 51 puntos reales del checklist en el HTML y los distritos y municipios escritos para búsquedas locales.
- Lighthouse en móvil: SEO, accesibilidad y buenas prácticas 100, rendimiento 95.

Siguiente paso recomendado: ficha de **Google Business Profile** como negocio de servicio a domicilio, con el mismo nombre, teléfono y web que aquí.

## Mantenimiento

- `lib/checklist.ts` es una copia del checklist de la app de informes (`informes-rcm`). Si cambian los puntos en la app, copiar aquí el archivo.
- Colores, radios y capas están documentados al principio de `app/globals.css`.
