# FORMA/01 — Sitio web

Sitio de **FORMA/01**, un estudio independiente de estrategia, desarrollo y sistemas en San Luis Potosí, México.
Dominio: [forma01.net](https://forma01.net). Hosting: Cloudflare Workers (plan gratis, uso comercial permitido).

> Un estudio independiente que desarrolla soluciones digitales, creativas y funcionales.

## Stack

| Área        | Herramienta                                                                                |
| ----------- | ------------------------------------------------------------------------------------------ |
| Framework   | Next.js 16 (App Router) · React 19 · TypeScript — exportado como sitio estático            |
| Estilos     | Tailwind CSS v4 (tokens en `app/globals.css`)                                              |
| Formularios | React Hook Form + Zod (mismo esquema en el navegador y en el Worker)                       |
| Hosting     | Cloudflare Workers: archivos estáticos + un Worker para `/api/contact`                     |
| Email       | [Resend](https://resend.com) (API HTTP, 3,000 correos/mes gratis)                          |
| Tipografía  | IBM Plex Sans + IBM Plex Mono (`next/font`, se empaquetan en el build)                     |
| SEO         | Metadata API, imágenes Open Graph generadas en build, `sitemap.xml`, `robots.txt`, JSON-LD |

### Cómo funciona

```
Navegador ──► Cloudflare
               ├─ /api/contact  → Worker (worker/index.ts) → valida → Resend → tu correo
               └─ todo lo demás → archivos estáticos de out/ (generados por `next build`)
```

Las páginas no ejecutan código en el servidor: se generan una vez en el build y Cloudflare las sirve desde
su red. Solo el formulario usa el Worker, así que el plan gratis sobra (las peticiones a archivos estáticos
son ilimitadas y no cuentan contra las 100,000 diarias del Worker).

## Desarrollo local

Requiere Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local        # opcional: WhatsApp, URL del sitio
cp .dev.vars.example .dev.vars    # tu API key de Resend, para probar el formulario

npm run dev       # http://localhost:3000 — diseño y contenido (el formulario no envía aquí)
npm run preview   # http://localhost:8787 — build + Worker: el sitio completo, formulario incluido
```

| Script              | Qué hace                                                       |
| ------------------- | -------------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo de Next.js                              |
| `npm run build`     | Genera el sitio estático en `out/`                             |
| `npm run preview`   | Build + `wrangler dev`: sitio y Worker como en producción      |
| `npm run deploy`    | Build + `wrangler deploy` (deploy manual desde tu computadora) |
| `npm run lint`      | ESLint                                                         |
| `npm run typecheck` | Tipos del sitio y del Worker                                   |
| `npm run format`    | Prettier (ordena también las clases Tailwind)                  |

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
├── og.tsx                     Plantilla de imágenes Open Graph
└── validations/contact.ts     Esquema Zod del formulario y reglas de adjuntos
worker/
├── index.ts                   Worker: /api/contact o archivos estáticos
├── contact.ts                 Límite por IP, honeypot, validación
├── email.ts                   Envío con la API de Resend
└── env.ts                     Tipos de variables y bindings
public/_headers                Headers de seguridad y caché para Cloudflare
wrangler.jsonc                 Configuración del Worker
```

## Editar contenido

Casi todo el copy y los datos viven en `lib/`, separados de los componentes:

- **Agregar un proyecto:** copia un objeto en `lib/projects.ts`. Aparece en el portafolio, en los filtros,
  en el sitemap y obtiene su propia página e imagen OG. `published: false` lo oculta sin borrarlo.
- **Sumar a alguien al equipo:** agrégalo a `TEAM` en `lib/team.ts`. Con más de una persona, `/sobre-nosotros`
  muestra la sección de equipo automáticamente.
- **Cambiar correo, WhatsApp, condiciones de pago o vigencia:** `lib/constants.ts`.
- **Servicios:** `lib/services.ts`.

Cada cambio que subas a `main` vuelve a generar y publicar el sitio automáticamente (ver Deploy).

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

## Deploy en Cloudflare

Todo lo siguiente cabe en los planes gratis de Cloudflare y Resend.

### 1. Resend (correo del formulario)

1. Crea una cuenta en [resend.com](https://resend.com). **Regístrate con `dev.antoniomota@gmail.com`**: así el
   remitente de prueba `onboarding@resend.dev` puede enviarte correos desde el primer día.
2. En **API Keys → Create API key**, con permiso _Sending access_. Guárdala: se usa en el paso 3.
3. Cuando `forma01.net` esté en Cloudflare (paso 4): **Domains → Add domain → forma01.net**. Resend te da
   registros DNS (SPF y DKIM); con la integración de Cloudflare se agregan con un clic. Cuando diga
   _Verified_, cambia `CONTACT_FROM_EMAIL` en `wrangler.jsonc` a `FORMA/01 <contacto@forma01.net>` y sube el
   cambio.

   > Por defecto el remitente es `onboarding@resend.dev`, el de prueba de Resend. Funciona de inmediato, pero
   > solo entrega al correo con el que creaste la cuenta de Resend y puede caer en spam. Verifica el dominio
   > antes de lanzar.

### 2. Conectar el repositorio

1. En el [dashboard de Cloudflare](https://dash.cloudflare.com): **Workers & Pages → Create → Import a
   repository**, conecta GitHub y elige `antoniomotadev/forma01-website`.
2. Configuración del build (Cloudflare la detecta, pero verifica):

   | Campo             | Valor                 |
   | ----------------- | --------------------- |
   | Build command     | `npm run build`       |
   | Deploy command    | `npx wrangler deploy` |
   | Production branch | `main`                |

3. En **Settings → Build → Variables and secrets** (variables de _build_):

   | Variable                      | Valor                 | Nota                                    |
   | ----------------------------- | --------------------- | --------------------------------------- |
   | `NEXT_PUBLIC_SITE_URL`        | `https://forma01.net` | URL canónica                            |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5214441234567`       | Opcional. Vacío = sin botón de WhatsApp |

Cada push a `main` publica a producción; las otras ramas generan una URL de vista previa.

### 3. Secreto del Worker

En el Worker: **Settings → Variables and secrets → Add → Secret**, nombre `RESEND_API_KEY`, valor la API key
del paso 1. O desde tu terminal:

```bash
npx wrangler login
npx wrangler secret put RESEND_API_KEY
```

`CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` están en `wrangler.jsonc` (sección `vars`) y se aplican en cada
deploy; cámbialos ahí, no en el dashboard.

### 4. Dominio

1. Agrega `forma01.net` a Cloudflare (**Add a domain**, plan Free) y cambia los nameservers en tu
   registrador por los que te indique Cloudflare. Si compras o transfieres el dominio en Cloudflare
   Registrar, este paso ya está hecho.
2. En el Worker: **Settings → Domains & Routes → Add → Custom domain**: `forma01.net` y `www.forma01.net`.
3. Redirige `www` al dominio principal: **Rules → Redirect Rules → Create from template → Redirect from WWW
   to root**.
4. Después del primer deploy, envía el sitemap en [Google Search Console](https://search.google.com/search-console):
   `https://forma01.net/sitemap.xml`.

### Límites del plan gratis (de sobra para este sitio)

| Servicio           | Límite                                              |
| ------------------ | --------------------------------------------------- |
| Archivos estáticos | Ilimitados                                          |
| Worker             | 100,000 peticiones/día (solo cuenta `/api/contact`) |
| Resend             | 3,000 correos/mes, 100/día                          |

### Notas del formulario

- Validación en el navegador y en el Worker con el mismo esquema (`lib/validations/contact.ts`).
- Adjunto opcional de hasta **4 MB**. Formatos: PDF, Word, PowerPoint, Excel, TXT, PNG, JPG y ZIP. Para
  archivos más grandes, el cliente puede pegar un link en el mensaje.
- Anti-spam: campo trampa (honeypot) y límite de **3 envíos por minuto por IP** con el binding de rate
  limiting de Cloudflare (`wrangler.jsonc`). Si algún día llega spam en volumen, el siguiente paso es
  agregar [Turnstile](https://www.cloudflare.com/products/turnstile/) (gratis).
- El correo llega con `Reply-To` del cliente: responder desde Gmail le contesta directamente.
- Los errores de envío quedan en **Workers → forma01-website → Logs**.

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

- Como el sitio es estático, `next/image` no optimiza en tiempo real: exporta ya en **WebP calidad 80** y al
  tamaño indicado (herramientas: [Squoosh](https://squoosh.app) o `cwebp`).
- Mantén una dirección visual: mismos fondos, mismo tratamiento de sombras y mockups.
- Escribe `alt` descriptivos (“Panel de inventario mostrando existencias por almacén”), no “imagen 1”.
- Si usas fotos de clientes o de sus productos, pide permiso por escrito.
