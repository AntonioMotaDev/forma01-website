import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHeader } from "@/components/PageHeader";
import { Portfolio } from "@/components/Portfolio";
import { Container } from "@/components/ui/Container";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de estrategia, desarrollo web y sistemas a la medida para pymes y proyectos propios de FORMA/01.",
  alternates: { canonical: "/proyectos" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Portafolio"
        title="Proyectos"
        description="Sitios, sistemas y estrategias para negocios reales. Filtra por tipo de servicio para ver lo que más se parece a lo que necesitas."
      />
      <Container className="pb-24 sm:pb-32">
        <Portfolio projects={getProjects()} />
      </Container>
      <Contact heading="¿Tu proyecto podría estar aquí?" index={null} />
    </>
  );
}
