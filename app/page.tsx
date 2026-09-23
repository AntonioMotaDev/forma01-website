import { AboutTeaser } from "@/components/AboutTeaser";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProjects } from "@/lib/projects";

const HOME_PROJECT_LIMIT = 6;

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      <Hero />
      <Services />

      <Section id="proyectos">
        <SectionHeader
          index="02"
          label="Proyectos"
          title="Trabajo reciente."
          description="Una selección de proyectos para clientes y proyectos propios. Cada uno empezó con una pregunta concreta."
        />
        <div className="mt-14 sm:mt-20">
          <Portfolio projects={projects} limit={HOME_PROJECT_LIMIT} />
        </div>
        <div className="mt-16 flex justify-center">
          <ButtonLink href="/proyectos" variant="secondary" arrow>
            Ver todos los proyectos
          </ButtonLink>
        </div>
      </Section>

      <Process />
      <AboutTeaser />
      <Contact />
    </>
  );
}
