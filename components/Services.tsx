import { SERVICES } from "@/lib/services";
import { ServiceIcon } from "./icons/ServiceIcon";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";

export function Services() {
  return (
    <Section id="servicios">
      <SectionHeader
        index="01"
        label="Servicios"
        title="Tres formas de ayudarte, una misma manera de trabajar."
        description="Puedes contratar un servicio o combinarlos. Muchos proyectos empiezan con estrategia y terminan con un sistema funcionando."
      />

      <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:mt-20 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <Reveal
            as="article"
            key={service.id}
            delay={index * 100}
            className="group flex flex-col bg-bg p-7 transition-colors duration-500 hover:bg-bg-elevated sm:p-10"
          >
            <div className="flex items-start justify-between">
              <ServiceIcon
                id={service.id}
                className="size-12 text-fg-muted transition-colors duration-500 group-hover:text-fg"
              />
              <span className="font-mono text-xs text-fg-subtle">{service.index}</span>
            </div>

            <h3 className="mt-10 text-2xl font-semibold tracking-tight">{service.name}</h3>
            <p className="mt-1 font-medium text-accent-ink">{service.summary}</p>
            <p className="mt-4 leading-relaxed text-fg-muted">{service.description}</p>

            <ul className="mt-8 space-y-2.5 border-t border-line pt-6 text-sm">
              {service.useCases.map((useCase) => (
                <li key={useCase} className="flex gap-3">
                  <span aria-hidden className="mt-[7px] size-1.5 shrink-0 bg-bronze" />
                  <span className="text-fg-muted">{useCase}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
