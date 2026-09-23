import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONTACT, STUDIO_FACTS } from "@/lib/constants";
import { STACK, TEAM, type TeamMember } from "@/lib/team";

export const metadata: Metadata = {
  title: "Estudio",
  description:
    "FORMA/01 es un estudio independiente en San Luis Potosí dirigido por Antonio Mota. Estrategia, desarrollo y sistemas con trato directo.",
  alternates: { canonical: "/sobre-nosotros" },
};

/**
 * BORRADOR — Ajusta esta historia con tus propias palabras y experiencia.
 * Mantén la primera persona: es lo que diferencia a un estudio de una agencia.
 */
const STORY = [
  "Soy Antonio Mota, desarrollador y estratega digital en San Luis Potosí. Creé FORMA/01 porque vi a muchos negocios pagar por sitios que nadie actualiza, sistemas que nadie usa y proyectos que se alargan sin explicación.",
  "Quería trabajar de otra forma: entender primero el negocio, proponer solo lo que hace falta y construirlo bien. Sin letra chiquita y sin depender de mí para siempre.",
  "FORMA/01 es ese compromiso con nombre propio. ¿Y el /01? Lo dejamos abierto: una primera versión, un punto de partida, la forma de empezar. Cada quien lo lee a su manera.",
];

const PRINCIPLES = [
  {
    title: "Claridad antes que código",
    text: "Entender el problema cuesta menos que construir la solución equivocada. Por eso empezamos preguntando.",
  },
  {
    title: "Lo simple, bien hecho",
    text: "Preferimos una herramienta sencilla que tu equipo use todos los días a una plataforma compleja que nadie abre.",
  },
  {
    title: "Honestidad sobre el alcance",
    text: "Si algo no nos toca o no vale la pena, te lo decimos. Aunque eso signifique un proyecto más pequeño.",
  },
  {
    title: "Tus activos son tuyos",
    text: "Código, dominio, cuentas y contenidos quedan a tu nombre. Siempre puedes seguir con quien tú quieras.",
  },
];

const GOOD_FIT = [
  "Tienes un negocio en marcha y quieres ordenar o crecer su parte digital.",
  "Valoras hablar directo con quien hace el trabajo.",
  "Puedes dedicar tiempo a revisar avances y dar retroalimentación.",
  "Buscas una relación de largo plazo, no solo una entrega.",
];

const NOT_A_FIT = [
  "Necesitas un equipo de 20 personas disponible 24/7.",
  "Buscas el precio más bajo por encima de todo.",
  "El proyecto no tiene a nadie de tu lado para tomar decisiones.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="Estudio"
        title="Un estudio pequeño, con estándares grandes."
        description="FORMA/01 es un estudio independiente que desarrolla soluciones digitales, creativas y funcionales para negocios que quieren hacer las cosas bien."
      />

      {/* Historia */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <PersonCard member={TEAM[0]} />
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="eyebrow mb-6">La historia</p>
            </Reveal>
            <Reveal delay={80} className="prose-forma text-xl! text-fg">
              {STORY.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Filosofía */}
      <Section>
        <SectionHeader index="01" label="Filosofía" title="Cómo pensamos el trabajo." />
        <ol className="mt-14 grid gap-px border border-line bg-line sm:mt-20 sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <Reveal as="li" key={principle.title} delay={index * 80} className="bg-bg p-7 sm:p-10">
              <span className="font-mono text-xs text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{principle.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{principle.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Cliente ideal */}
      <Section>
        <SectionHeader
          index="02"
          label="Con quién trabajamos"
          title="Funcionamos mejor cuando hay afinidad."
          description="Preferimos decírtelo desde el principio. Así ninguno de los dos pierde tiempo."
        />
        <div className="mt-14 grid gap-10 sm:mt-20 md:grid-cols-2">
          <Reveal>
            <h3 className="eyebrow mb-5">Somos buena opción si…</h3>
            <ul className="divide-y divide-line border-y border-line">
              {GOOD_FIT.map((item) => (
                <li key={item} className="flex gap-4 py-4">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-bronze" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="eyebrow mb-5">Quizá no somos la mejor opción si…</h3>
            <ul className="divide-y divide-line border-y border-line text-fg-muted">
              {NOT_A_FIT.map((item) => (
                <li key={item} className="flex gap-4 py-4">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 border border-fg-subtle" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Datos */}
      <Section>
        <dl className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {STUDIO_FACTS.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 70} className="bg-bg p-6 sm:p-8">
              <dt className="sr-only">{fact.label}</dt>
              <dd>
                <span className="block text-4xl font-semibold tracking-tighter sm:text-5xl">
                  {fact.value}
                </span>
                <span className="mt-3 block text-sm leading-snug text-fg-muted">{fact.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Equipo — se muestra cuando haya más de una persona */}
      {TEAM.length > 1 && (
        <Section>
          <SectionHeader index="03" label="Equipo" title="Quiénes hacemos FORMA/01." />
          <ul className="mt-14 grid gap-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, index) => (
              <Reveal as="li" key={member.id} delay={index * 80}>
                <PersonCard member={member} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* Stack */}
      <Section>
        <SectionHeader
          index={TEAM.length > 1 ? "04" : "03"}
          label="Herramientas"
          title="Tecnología probada, elegida por proyecto."
          description="No casamos cada proyecto con la misma herramienta. Estas son las que usamos con más frecuencia porque son estables, rápidas y fáciles de mantener."
        />
        <div className="mt-14 grid gap-px border border-line bg-line sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((group, index) => (
            <Reveal key={group.group} delay={index * 70} className="bg-bg p-6 sm:p-8">
              <h3 className="eyebrow">{group.group}</h3>
              <ul className="mt-5 space-y-2">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-headline font-semibold text-balance">¿Hacemos equipo?</p>
            <p className="mt-4 max-w-xl text-lg text-fg-muted">
              Cuéntanos sobre tu proyecto. {CONTACT.responseTime}
            </p>
          </div>
          <ButtonLink href="/contacto" size="lg" arrow>
            Empecemos
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

function PersonCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden bg-carbon text-linen">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Retrato de ${member.name}`}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover grayscale-[20%]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <span className="absolute bottom-4 left-5 text-8xl font-semibold tracking-tighter">
              {initials}
              <span className="text-bronze">/</span>
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="font-semibold">{member.name}</p>
        <p className="text-sm text-fg-muted">{member.role}</p>
      </figcaption>
    </figure>
  );
}
