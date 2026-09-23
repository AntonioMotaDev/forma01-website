import { ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { STUDIO_FACTS } from "@/lib/constants";

export function AboutTeaser() {
  return (
    <Section id="estudio">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">
              <span className="text-accent-ink">04</span> — Estudio
            </p>
          </Reveal>
          <Reveal as="h2" delay={60} className="mt-6 text-headline font-semibold text-balance">
            Pequeño a propósito.
          </Reveal>
          <Reveal delay={120} className="prose-forma mt-6">
            <p>
              FORMA/01 es un estudio independiente dirigido por <strong>Antonio Mota</strong> desde San Luis
              Potosí. No somos una agencia de cincuenta personas y no pretendemos serlo.
            </p>
            <p>
              Eso significa algo muy concreto para ti: hablas con quien hace el trabajo, las decisiones se
              toman rápido y cada proyecto recibe atención real. Cuando un proyecto lo necesita, sumamos
              colaboradores de confianza.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-8">
            <ButtonLink href="/sobre-nosotros" variant="secondary" arrow>
              Conoce el estudio
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-5">
          <dl className="grid grid-cols-2 gap-px border border-line bg-line">
            {STUDIO_FACTS.map((fact) => (
              <div key={fact.label} className="bg-bg p-6">
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block text-4xl font-semibold tracking-tighter">{fact.value}</span>
                  <span className="mt-2 block text-sm leading-snug text-fg-muted">{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
