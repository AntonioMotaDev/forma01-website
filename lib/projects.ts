import type { ServiceId } from "./services";

/**
 * PORTAFOLIO
 * ------------------------------------------------------------------
 * Para agregar un proyecto, copia uno de los objetos de abajo y edítalo.
 * El orden del arreglo es el orden en el sitio (el primero sale primero).
 *
 * - `cover` es opcional. Sin imagen se genera una portada tipográfica
 *   con el color de `accent`. Para usar imagen, colócala en
 *   /public/proyectos/<slug>/cover.jpg (1600×1200, 4:3) y descomenta `cover`.
 * - `published: false` oculta el proyecto sin borrarlo.
 *
 * ⚠️  Los proyectos marcados como EJEMPLO tienen contenido ilustrativo
 *     (anonimizado y genérico). Sustitúyelos por casos reales antes de
 *     lanzar o cámbialos a `published: false`.
 */

export type ProjectKind = "cliente" | "propio";
export type ProjectAccent = "slate" | "bronze" | "cinnamon" | "carbon";

export type Project = {
  slug: string;
  title: string;
  /** Nombre del cliente o descripción anonimizada ("Distribuidora industrial, SLP"). */
  client: string;
  kind: ProjectKind;
  year: number;
  /** Una o dos líneas para la tarjeta del portafolio. */
  summary: string;
  services: ServiceId[];
  stack: string[];
  accent: ProjectAccent;
  cover?: { src: string; alt: string };
  /** Link al proyecto en vivo, si es público. */
  url?: string;
  featured?: boolean;
  published: boolean;
  caseStudy: {
    challenge: string;
    approach: string;
    outcome: string[];
  };
};

const PROJECTS: Project[] = [
  {
    slug: "sitio-forma01",
    title: "FORMA/01 — sitio del estudio",
    client: "Proyecto propio",
    kind: "propio",
    year: 2026,
    summary:
      "La casa digital del estudio: un sitio rápido, claro y fácil de mantener, construido con el mismo proceso que usamos con clientes.",
    services: ["estrategia", "desarrollo"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    accent: "bronze",
    url: "https://forma01.net",
    featured: true,
    published: true,
    caseStudy: {
      challenge:
        "Presentar un estudio independiente sin aparentar ser una agencia grande, con un sitio que sirva como carta de presentación y como herramienta de contacto.",
      approach:
        "Definimos primero los mensajes clave y la estructura, después un sistema de diseño mínimo basado en la paleta de marca. El portafolio se alimenta de un solo archivo de datos para que agregar proyectos tome minutos.",
      outcome: [
        "Sitio estático con puntajes altos de rendimiento y SEO",
        "Formulario de contacto con envío de archivos",
        "Estructura lista para sumar colaboradores y nuevos servicios",
      ],
    },
  },
  {
    // EJEMPLO — reemplazar por un caso real
    slug: "inventario-distribuidora",
    title: "Control de inventario y pedidos",
    client: "Distribuidora industrial, SLP",
    kind: "cliente",
    year: 2025,
    summary:
      "Un panel web que sustituyó tres hojas de cálculo y un grupo de WhatsApp para registrar entradas, salidas y pedidos.",
    services: ["sistemas", "desarrollo"],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Vercel"],
    accent: "slate",
    featured: true,
    published: true,
    caseStudy: {
      challenge:
        "El inventario se llevaba en archivos separados por almacén. Nadie tenía el dato actualizado y los pedidos se perdían entre mensajes.",
      approach:
        "Mapeamos el flujo real del equipo antes de diseñar pantallas. Construimos un panel con roles, captura rápida desde el celular y alertas de stock mínimo.",
      outcome: [
        "Un solo lugar para consultar existencias en tiempo real",
        "Pedidos con seguimiento y responsable asignado",
        "Reporte semanal generado automáticamente",
      ],
    },
  },
  {
    // EJEMPLO — reemplazar por un caso real
    slug: "sitio-despacho-contable",
    title: "Sitio web para despacho contable",
    client: "Despacho contable, Bajío",
    kind: "cliente",
    year: 2025,
    summary:
      "Rediseño de sitio con mensajes claros por tipo de cliente y un formulario que filtra solicitudes antes de la primera llamada.",
    services: ["estrategia", "desarrollo"],
    stack: ["Next.js", "Tailwind CSS", "Nodemailer"],
    accent: "carbon",
    featured: true,
    published: true,
    caseStudy: {
      challenge:
        "El sitio anterior era lento, difícil de actualizar y no explicaba qué servicios ofrecía el despacho ni a quién.",
      approach:
        "Reorganizamos el contenido por perfil de cliente (personas físicas, pymes, empresas) y diseñamos un formulario con preguntas clave para preparar cada cita.",
      outcome: [
        "Contenido organizado por tipo de cliente",
        "Solicitudes de contacto con la información necesaria desde el inicio",
        "El equipo actualiza textos sin depender de un programador",
      ],
    },
  },
  {
    // EJEMPLO — reemplazar por un caso real
    slug: "estrategia-restaurante",
    title: "Estrategia digital para restaurante",
    client: "Restaurante local, SLP",
    kind: "cliente",
    year: 2024,
    summary:
      "Diagnóstico y plan de acción para ordenar menú digital, reservaciones y presencia en mapas antes de invertir en publicidad.",
    services: ["estrategia"],
    stack: ["Google Business Profile", "Notion", "Figma"],
    accent: "cinnamon",
    published: true,
    caseStudy: {
      challenge:
        "El restaurante quería invertir en anuncios, pero la información en internet estaba desactualizada y las reservaciones llegaban por cinco canales distintos.",
      approach:
        "Hicimos un diagnóstico de todos los puntos de contacto digitales y entregamos un plan priorizado en tres fases, empezando por lo que no cuesta dinero.",
      outcome: [
        "Información consistente en mapas, redes y menú digital",
        "Un canal único para reservaciones",
        "Plan de trabajo trimestral con responsables",
      ],
    },
  },
  {
    // EJEMPLO — reemplazar por un caso real
    slug: "cotizador-manufactura",
    title: "Cotizador en línea para taller",
    client: "Taller de manufactura, SLP",
    kind: "cliente",
    year: 2024,
    summary:
      "Herramienta interna que calcula cotizaciones con base en materiales y tiempos, y genera el PDF listo para enviar.",
    services: ["sistemas", "desarrollo"],
    stack: ["React", "Node.js", "SQLite"],
    accent: "slate",
    published: true,
    caseStudy: {
      challenge:
        "Cada cotización tomaba cerca de una hora y dependía de que una sola persona conociera los precios vigentes.",
      approach:
        "Documentamos las reglas de cálculo con el equipo y las convertimos en un formulario guiado con catálogo de materiales editable.",
      outcome: [
        "Cotizaciones consistentes en minutos",
        "Catálogo de precios actualizable por el propio taller",
        "Historial de cotizaciones por cliente",
      ],
    },
  },
  {
    // EJEMPLO — reemplazar por un proyecto propio real
    slug: "kit-arranque-pymes",
    title: "Kit de arranque digital",
    client: "Proyecto propio",
    kind: "propio",
    year: 2025,
    summary:
      "Plantilla de sitio y guía de contenido para negocios que necesitan estar en línea en pocos días, sin sacrificar calidad.",
    services: ["estrategia", "desarrollo"],
    stack: ["Next.js", "MDX", "Tailwind CSS"],
    accent: "bronze",
    published: true,
    caseStudy: {
      challenge:
        "Muchos negocios pequeños necesitan un sitio profesional pero no el presupuesto ni el tiempo de un proyecto completamente a la medida.",
      approach:
        "Diseñamos una base reutilizable con secciones probadas y una guía de preguntas para que el cliente prepare su contenido antes de empezar.",
      outcome: [
        "Tiempo de lanzamiento reducido a días",
        "Base técnica sólida que puede crecer después",
        "Guía de contenido reutilizable en cada proyecto",
      ],
    },
  },
];

export function getProjects() {
  return PROJECTS.filter((project) => project.published);
}

export function getFeaturedProjects(limit = 3) {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
