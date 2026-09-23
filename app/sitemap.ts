import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getProjects } from "@/lib/projects";

// Se genera en build (output: "export").
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/proyectos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/sobre-nosotros`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE.url}/cotizaciones`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projects: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${SITE.url}/proyectos/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...projects];
}
