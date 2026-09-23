/**
 * EQUIPO
 * ------------------------------------------------------------------
 * Hoy FORMA/01 es Antonio. Cuando se sumen colaboradores, agrégalos aquí
 * y la página /sobre-nosotros los muestra automáticamente.
 *
 * Foto: /public/equipo/<id>.jpg (1200×1500, 4:5). Sin foto se muestran
 * las iniciales.
 */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  links?: { label: string; href: string }[];
};

export const TEAM: TeamMember[] = [
  {
    id: "antonio-mota",
    name: "Antonio Mota",
    role: "Fundador · Estrategia y desarrollo",
    bio: "Desarrollador y estratega digital en San Luis Potosí. Trabaja directamente con cada cliente, desde la primera llamada hasta la entrega.",
    // photo: "/equipo/antonio-mota.jpg",
  },
];

/** Tecnologías y herramientas que usamos con frecuencia. */
export const STACK = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "PostgreSQL", "Prisma", "APIs REST"] },
  { group: "Infraestructura", items: ["Vercel", "GitHub", "Cloudflare"] },
  { group: "Diseño y gestión", items: ["Figma", "Notion", "Google Workspace"] },
];
