import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos sobre tu proyecto. Respondemos en 24–48 horas hábiles. Estrategia, desarrollo web y sistemas desde San Luis Potosí.",
  alternates: { canonical: "/contacto" },
};

const FAQ = [
  {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Depende del alcance. Después de la primera conversación te enviamos una cotización con entregables, tiempos y costo cerrado. Puedes ver el formato en la página de cotizaciones.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Un sitio web sencillo suele tomar de 3 a 6 semanas. Sistemas y proyectos a la medida se planean por etapas para que veas avances desde el inicio.",
  },
  {
    q: "¿Trabajan con negocios fuera de San Luis Potosí?",
    a: "Sí. Trabajamos en remoto con clientes de todo México con llamadas, documentos compartidos y avances en línea.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Solo una idea clara del problema que quieres resolver. Si tienes un brief, referencias o documentos, adjúntalos en el formulario; si no, lo armamos juntos.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Contact
        index={null}
        heading="Hablemos de tu proyecto."
        as="h1"
        divider={false}
        className="pt-12 sm:pt-20 lg:pt-24"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Preguntas frecuentes</p>
          </Reveal>
          <dl className="divide-y divide-line border-y border-line lg:col-span-8">
            {FAQ.map((item, index) => (
              <Reveal key={item.q} delay={index * 60} className="py-6">
                <dt className="text-lg font-semibold">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-fg-muted">{item.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
