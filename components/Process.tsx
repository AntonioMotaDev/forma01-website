import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";

const STEPS = [
  {
    title: "Conversación",
    text: "Una llamada de 30 minutos para entender tu negocio, el problema y lo que ya intentaste. Sin costo.",
    time: "Día 1",
  },
  {
    title: "Propuesta",
    text: "Recibes una cotización con alcance, entregables, tiempos y costo. Si algo no está claro, lo ajustamos antes de firmar.",
    time: "2–4 días",
  },
  {
    title: "Construcción",
    text: "Trabajamos por etapas con avances que puedes ver y comentar. Nada de desaparecer semanas.",
    time: "Según alcance",
  },
  {
    title: "Entrega y soporte",
    text: "Te entregamos todo a tu nombre, con una guía de uso y un periodo de ajustes definido desde la cotización.",
    time: "Post-entrega",
  },
];

export function Process() {
  return (
    <Section id="proceso">
      <SectionHeader
        index="03"
        label="Proceso"
        title="Cómo trabajamos."
        description="Un proceso simple y transparente. Siempre sabes en qué etapa va tu proyecto y qué sigue."
      />
      <ol className="mt-14 grid gap-px border border-line bg-line sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 90} className="flex flex-col bg-bg p-7 sm:p-8">
            <span className="text-5xl font-semibold tracking-tighter text-fg-subtle/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-8 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-fg-muted">{step.text}</p>
            <p className="mt-6 font-mono text-xs tracking-wider text-accent-ink uppercase">{step.time}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
