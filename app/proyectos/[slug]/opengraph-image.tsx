import { renderOgImage, OG_SIZE } from "@/lib/og";
import { getProject, getProjects } from "@/lib/projects";

// Se genera en build (output: "export").
export const dynamic = "force-static";

export const alt = "Caso de estudio — FORMA/01";
export const size = OG_SIZE;
export const contentType = "image/png";

// Pre-genera una imagen por proyecto en build (sin costo en runtime).
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project?.kind === "cliente" ? "Caso de cliente" : "Proyecto",
    title: project?.title ?? "Proyecto",
  });
}
