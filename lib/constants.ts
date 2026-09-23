/**
 * Configuración central del sitio: identidad, contacto, navegación y copy
 * compartido. Si algo del negocio cambia (correo, WhatsApp, condiciones),
 * se cambia aquí y se refleja en todo el sitio.
 */

export const SITE = {
  name: "FORMA/01",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma01.net",
  description: "Un estudio independiente que desarrolla soluciones digitales, creativas y funcionales.",
  tagline: "Soluciones digitales para proyectos reales.",
  services: ["Estrategia", "Desarrollo", "Sistemas"] as const,
  locale: "es_MX",
  location: {
    city: "San Luis Potosí",
    region: "SLP",
    country: "México",
    countryCode: "MX",
  },
  founder: "Antonio Mota",
} as const;

export const CONTACT = {
  email: "dev.antoniomota@gmail.com",
  /**
   * Número en formato internacional sin "+" ni espacios (ej. 5214441234567).
   * Si la variable no existe, el botón de WhatsApp no se muestra.
   */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  whatsappMessage: "Hola, vi el sitio de FORMA/01 y me gustaría platicar sobre un proyecto.",
  responseTime: "Respondemos en 24–48 horas hábiles.",
} as const;

export function whatsappUrl(message: string = CONTACT.whatsappMessage) {
  if (!CONTACT.whatsapp) return null;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const SOCIAL: { label: string; href: string }[] = [
  // Agrega redes cuando existan; el footer las muestra automáticamente.
  // { label: "LinkedIn", href: "https://www.linkedin.com/in/..." },
  // { label: "GitHub", href: "https://github.com/AntonioMotaDev" },
];

export const NAV_LINKS = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Estudio" },
  { href: "/cotizaciones", label: "Cotizaciones" },
] as const;

/**
 * Condiciones comerciales. Se usan en /cotizaciones y pueden reutilizarse
 * en otros lugares (FAQ, pie de propuestas, etc.).
 */
export const QUOTE_TERMS = {
  depositPercent: 40,
  validityDays: 15,
  paymentMethods: ["Transferencia bancaria", "Efectivo"],
  currency: "MXN",
  taxNote: "Los precios no incluyen IVA. Si requieres factura, se agrega el 16%.",
} as const;

/**
 * Colores de marca para usos fuera de CSS (OG images, manifest, emails).
 * Deben coincidir con los tokens en app/globals.css.
 */
export const COLORS = {
  carbon: "#15191C",
  linen: "#F2EFE7",
  slate: "#315A70",
  bronze: "#D5A83A",
  cinnamon: "#B85C3A",
} as const;

/**
 * Datos del estudio que se pueden prometer con honestidad. Cuando tengas
 * métricas reales (proyectos entregados, años, clientes), agrégalas aquí.
 */
export const STUDIO_FACTS = [
  { value: "1:1", label: "Un responsable directo de principio a fin" },
  { value: "24–48h", label: "Tiempo de respuesta a mensajes" },
  { value: "100%", label: "Código, dominios y accesos a tu nombre" },
  { value: "MX", label: "Proyectos remotos en todo el país" },
] as const;
