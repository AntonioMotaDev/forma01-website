# FORMA/01 — Sitio web

Sitio de **FORMA/01**, un estudio independiente de estrategia, desarrollo y sistemas en San Luis Potosí, México.
Dominio: [forma01.net](https://forma01.net). Hosting: Vercel.

> Un estudio independiente que desarrolla soluciones digitales, creativas y funcionales.

## Stack

| Área        | Herramienta                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript                      |
| Estilos     | Tailwind CSS v4 (tokens en `app/globals.css`)                                   |
| Formularios | React Hook Form + Zod (mismo esquema en cliente y servidor)                     |
| Email       | Nodemailer vía SMTP (Gmail, Zoho, cualquier proveedor)                          |
| Tipografía  | IBM Plex Sans + IBM Plex Mono (`next/font`, sin peticiones a Google en runtime) |
| SEO         | Metadata API, Open Graph dinámico, `sitemap.xml`, `robots.txt`, JSON-LD         |

## Desarrollo local

Requiere Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local   # llena SMTP_PASS para probar el formulario
npm run dev                  # http://localhost:3000
```

| Script              | Qué hace                                      |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo                        |
| `npm run build`     | Build de producción (igual que en Vercel)     |
| `npm run start`     | Sirve el build localmente                     |
| `npm run lint`      | ESLint                                        |
| `npm run typecheck` | Genera tipos de rutas y corre `tsc`           |
| `npm run format`    | Prettier (ordena también las clases Tailwind) |

## Estructura

```
app/
├── layout.tsx                 Layout raíz: fuentes, metadata, tema, JSON-LD
├── page.tsx                   Inicio (hero, servicios, proyectos, proceso, estudio, contacto)
├── globals.css                Design tokens (paleta, tipografía, dark mode)
├── proyectos/
│   ├── page.tsx               Portafolio completo con filtros
│   └── [slug]/                Caso de estudio + imagen OG por proyecto
├── sobre-nosotros/page.tsx    Historia, filosofía, cliente ideal, equipo, stack
├── contacto/page.tsx          Formulario + preguntas frecuentes
├── cotizaciones/page.tsx      Condiciones y ejemplo de cotización
├── api/contact/route.ts       Recibe el formulario y envía el correo
├── opengraph-image.tsx        Imagen para compartir en redes
├── sitemap.ts · robots.ts · manifest.ts · icon.svg · not-found.tsx
components/
├── Navbar · Footer · Hero · Services · Portfolio · ProjectCard · ProjectCover
├── Process · AboutTeaser · Contact · ContactForm · PageHeader · Logo · ThemeToggle
├── icons/                     Flechas e iconos de servicio (SVG inline)
└── ui/                        Button, Container, Section, SectionHeader, Tag, Reveal
lib/
├── constants.ts               Datos del sitio, contacto, navegación, condiciones, colores
├── services.ts                Los tres pilares y sus casos de uso
├── projects.ts                ← Portafolio (aquí se agregan proyectos)
├── team.ts                    ← Equipo y stack (aquí se suman colaboradores)
├── email.ts                   Configuración de Nodemailer
├── og.tsx                     Plantilla de imágenes Open Graph
└── validations/contact.ts     Esquema Zod del formulario y reglas de adjuntos
```

## Editar contenido

Casi todo el copy y los datos viven en `lib/`, separados de los componentes:

- **Agregar un proyecto:** copia un objeto en `lib/projects.ts`. Aparece en el portafolio, en los filtros,
  en el sitemap y obtiene su propia página e imagen OG. `published: false` lo oculta sin borrarlo.
- **Sumar a alguien al equipo:** agrégalo a `TEAM` en `lib/team.ts`. Con más de una persona, `/sobre-nosotros`
  muestra la sección de equipo automáticamente.
- **Cambiar correo, WhatsApp, condiciones de pago o vigencia:** `lib/constants.ts`.
- **Servicios:** `lib/services.ts`.

### Design system

Los colores se definen una sola vez en `app/globals.css`:

| Token de marca | Hex       | Clase Tailwind |
| -------------- | --------- | -------------- |
| Carbon Black   | `#15191C` | `bg-carbon`    |
| Soft Linen     | `#F2EFE7` | `bg-linen`     |
| Blue Slate     | `#315A70` | `bg-slate`     |
| Golden Bronze  | `#D5A83A` | `bg-bronze`    |
| Cinnamon Wood  | `#B85C3A` | `bg-cinnamon`  |

Los componentes usan **tokens semánticos** que cambian solos entre modo claro y oscuro: `bg-bg`, `bg-surface`,
`text-fg`, `text-fg-muted`, `border-line`, `text-accent-ink`, etc. El dorado sobre fondo claro no tiene
contraste suficiente para texto, así que `accent-ink` es Blue Slate en claro y Golden Bronze en oscuro.

> Tailwind v4 se configura desde CSS (`@theme`), por eso no hay `tailwind.config.ts`.

## Deploy en Vercel

1. **Sube el repositorio a GitHub** (ya está en `antoniomotadev/forma01-website`).
2. En [vercel.com/new](https://vercel.com/new), **importa el repositorio**. Vercel detecta Next.js; no hay que
   cambiar el comando de build ni la carpeta de salida.
3. En **Settings → Environment Variables**, agrega las variables de `.env.example`:

   | Variable                      | Ejemplo                     | Nota                                               |
   | ----------------------------- | --------------------------- | -------------------------------------------------- |
   | `NEXT_PUBLIC_SITE_URL`        | `https://forma01.net`       | URL canónica                                       |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5214441234567`             | Opcional. Vacío = sin botón de WhatsApp            |
   | `SMTP_HOST`                   | `smtp.gmail.com`            |                                                    |
   | `SMTP_PORT`                   | `465`                       | 465 = SSL, 587 = STARTTLS                          |
   | `SMTP_USER`                   | `dev.antoniomota@gmail.com` |                                                    |
   | `SMTP_PASS`                   | `abcd efgh ijkl mnop`       | **Contraseña de aplicación**, no la de tu cuenta   |
   | `CONTACT_TO_EMAIL`            | `dev.antoniomota@gmail.com` | Dónde llegan los mensajes                          |
   | `CONTACT_FROM_EMAIL`          | `dev.antoniomota@gmail.com` | Con Gmail debe ser la misma cuenta que `SMTP_USER` |

   Las variables `NEXT_PUBLIC_*` se leen en el build: si las cambias, vuelve a desplegar.

4. **Deploy.** Cada push a `main` publica a producción; cada Pull Request obtiene su URL de vista previa.
5. **Dominio:** en **Settings → Domains** agrega `forma01.net` y `www.forma01.net`. Vercel te indica los
   registros DNS (un registro `A` a `76.76.21.21` para el dominio raíz y un `CNAME` a `cname.vercel-dns.com`
   para `www`, o delega los nameservers a Vercel). Marca `forma01.net` como principal y redirige `www`.
6. Después del primer deploy, envía el sitemap en [Google Search Console](https://search.google.com/search-console):
   `https://forma01.net/sitemap.xml`.

### Contraseña de aplicación de Gmail

1. Activa la verificación en dos pasos en tu cuenta de Google.
2. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), crea una llamada
   "forma01.net" y copia los 16 caracteres en `SMTP_PASS`.

Si en el futuro usas un correo con el dominio (`hola@forma01.net`, con Google Workspace o Zoho), solo cambia
las variables `SMTP_*` y `CONTACT_*`; el código no cambia.

### Notas del formulario

- Validación en cliente y servidor con el mismo esquema (`lib/validations/contact.ts`).
- Adjunto opcional de hasta **4 MB** (Vercel limita el cuerpo de la petición a 4.5 MB). Formatos: PDF, Word,
  PowerPoint, Excel, TXT, PNG, JPG y ZIP. Para archivos más grandes, el cliente puede pegar un link.
- Anti-spam: campo trampa (honeypot) y límite de 5 envíos por IP cada 10 minutos. El límite vive en memoria
  de cada instancia; si llega spam en volumen, cámbialo por Upstash/Vercel KV o agrega Cloudflare Turnstile.
- El correo llega con `Reply-To` del cliente: responder desde Gmail le contesta directamente.

## Antes de lanzar: checklist de contenido

El sitio funciona completo, pero algunas partes son **borrador o ejemplo** y hay que revisarlas:

- [ ] **Proyectos** (`lib/projects.ts`): todos los marcados como `EJEMPLO` tienen contenido ilustrativo y
      anonimizado. Sustitúyelos por casos reales o ponlos en `published: false`. Solo “FORMA/01 — sitio del
      estudio” es real.
- [ ] **Historia** (`app/sobre-nosotros/page.tsx`, constante `STORY`): reescríbela con tu propia voz.
- [ ] **Promesas de servicio:** revisa que estés de acuerdo con “llamada inicial sin costo” (`components/Process.tsx`),
      “sitio sencillo en 3 a 6 semanas” (FAQ en `app/contacto/page.tsx`) y los datos de `STUDIO_FACTS`.
- [ ] **Cotización de ejemplo** (`app/cotizaciones/page.tsx`): ajusta conceptos y montos o elimínalos.
- [ ] **IVA:** `QUOTE_TERMS.taxNote` en `lib/constants.ts` según tu régimen fiscal.
- [ ] **WhatsApp:** define `NEXT_PUBLIC_WHATSAPP_NUMBER` si quieres mostrarlo.
- [ ] **Redes sociales:** descomenta/agrega en `SOCIAL` (`lib/constants.ts`).

## Imágenes y assets a preparar

Mientras no haya imágenes, el sitio genera portadas tipográficas con los colores de marca, así que nada se ve
roto. Cuando las tengas:

| Asset                  | Dónde                               | Tamaño / formato                    | Notas                                                                                                                                                                |
| ---------------------- | ----------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portada de proyecto    | `public/proyectos/<slug>/cover.jpg` | 1600×1200 (4:3), JPG/WebP, < 400 KB | Luego en `lib/projects.ts`: `cover: { src: "/proyectos/<slug>/cover.jpg", alt: "…" }`. Mockups de pantallas sobre fondo liso (linen o carbon) mantienen la estética. |
| Imágenes del caso      | `public/proyectos/<slug>/`          | 2400 px de ancho máx.               | Capturas de pantalla reales, antes/después, diagramas.                                                                                                               |
| Retrato de Antonio     | `public/equipo/antonio-mota.jpg`    | 1200×1500 (4:5)                     | Luz natural, fondo neutro; funciona bien en blanco y negro o desaturado. Activa `photo` en `lib/team.ts`.                                                            |
| Logo en SVG            | `public/logo.svg`                   | Vectorial                           | Hoy el logo es tipográfico (componente `Logo`). Si tienes un SVG oficial, úsalo ahí.                                                                                 |
| Favicon                | `app/icon.svg` (ya existe)          | SVG                                 | Reemplázalo si tienes un isotipo. Opcional: `app/apple-icon.png` 180×180.                                                                                            |
| Imagen para redes (OG) | Se genera sola                      | 1200×630                            | `app/opengraph-image.tsx`. Para una imagen fija, reemplázalo por `app/opengraph-image.png`.                                                                          |

Recomendaciones generales:

- Exporta en JPG o WebP de calidad 80; `next/image` convierte a AVIF/WebP y ajusta tamaños automáticamente.
- Mantén una dirección visual: mismos fondos, mismo tratamiento de sombras y mockups.
- Escribe `alt` descriptivos (“Panel de inventario mostrando existencias por almacén”), no “imagen 1”.
- Si usas fotos de clientes o de sus productos, pide permiso por escrito.
