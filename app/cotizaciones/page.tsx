import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONTACT, QUOTE_TERMS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cotizaciones",
  description:
    "Cómo cotizamos en FORMA/01: formato de cotización, condiciones de pago (40% de anticipo), vigencia de 15 días y métodos de pago.",
  alternates: { canonical: "/cotizaciones" },
};

/**
 * EJEMPLO ANONIMIZADO — conceptos y montos ilustrativos. Ajusta a tus
 * precios reales o elimina los montos si prefieres no mostrarlos.
 */
const SAMPLE_QUOTE = {
  folio: "COT-0000",
  client: "Cliente de ejemplo S.A. de C.V.",
  project: "Sitio web corporativo",
  items: [
    {
      concept: "Estrategia",
      detail: "Sesión de descubrimiento, arquitectura de contenido y mapa del sitio",
      amount: 6000,
    },
    {
      concept: "Diseño",
      detail: "Diseño de 5 páginas en versión escritorio y móvil, 2 rondas de ajustes",
      amount: 12000,
    },
    {
      concept: "Desarrollo",
      detail: "Implementación, formulario de contacto, SEO básico y analítica",
      amount: 16000,
    },
    {
      concept: "Lanzamiento",
      detail: "Configuración de dominio, hosting, correo y capacitación de 1 hora",
      amount: 3000,
    },
  ],
};

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: QUOTE_TERMS.currency,
  maximumFractionDigits: 0,
});

const INCLUDES = [
  "Alcance y entregables por etapa",
  "Tiempo estimado de cada etapa",
  "Número de rondas de ajustes incluidas",
  "Qué no incluye (para evitar sorpresas)",
  "Condiciones de pago y vigencia",
];

export default function QuotesPage() {
  const subtotal = SAMPLE_QUOTE.items.reduce((sum, item) => sum + item.amount, 0);
  const deposit = Math.round((subtotal * QUOTE_TERMS.depositPercent) / 100);

  const terms = [
    {
      value: `${QUOTE_TERMS.depositPercent}%`,
      label: "Anticipo",
      text: `Para agendar el proyecto se cubre el ${QUOTE_TERMS.depositPercent}% del total. El resto se liquida contra entrega, o por etapas en proyectos largos.`,
    },
    {
      value: `${QUOTE_TERMS.validityDays} días`,
      label: "Vigencia",
      text: `Cada cotización es válida por ${QUOTE_TERMS.validityDays} días naturales a partir de su fecha de emisión.`,
    },
    {
      value: "MXN",
      label: "Forma de pago",
      text: `${QUOTE_TERMS.paymentMethods.join(" o ")}. ${QUOTE_TERMS.taxNote}`,
    },
  ];

  return (
    <>
      <PageHeader
        label="Cotizaciones"
        title="Sabes cuánto cuesta antes de empezar."
        description="Cada proyecto recibe una cotización por escrito con alcance, tiempos y costo cerrado. Así se ve una."
      />

      {/* Condiciones */}
      <Container className="pb-8">
        <dl className="grid gap-px border border-line bg-line md:grid-cols-3">
          {terms.map((term, index) => (
            <Reveal key={term.label} delay={index * 80} className="bg-bg p-7 sm:p-8">
              <dt className="eyebrow">{term.label}</dt>
              <dd>
                <span className="mt-4 block text-4xl font-semibold tracking-tighter">{term.value}</span>
                <span className="mt-3 block leading-relaxed text-fg-muted">{term.text}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>

      {/* Ejemplo de cotización */}
      <Section>
        <SectionHeader
          index="01"
          label="Formato"
          title="Ejemplo de cotización."
          description="Datos anonimizados y montos ilustrativos. Cada proyecto se cotiza según su alcance real."
        />

        <Reveal className="mt-14 sm:mt-20">
          <div className="relative border border-line-strong bg-bg-elevated shadow-[0_1px_0_var(--line),0_30px_60px_-30px_rgb(21_25_28/0.25)]">
            <span className="absolute -top-3 left-6 -rotate-2 border border-cinnamon bg-bg-elevated px-2 py-1 font-mono text-[10px] tracking-widest text-cinnamon uppercase sm:left-10">
              Ejemplo
            </span>

            <div className="flex flex-col gap-6 border-b border-line p-6 sm:flex-row sm:items-start sm:justify-between sm:p-10">
              <div>
                <Logo href={null} className="text-2xl" />
                <p className="mt-2 text-sm text-fg-muted">
                  {SITE.location.city}, {SITE.location.country} · {CONTACT.email}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-xs sm:text-right">
                <dt className="text-fg-subtle uppercase">Folio</dt>
                <dd>{SAMPLE_QUOTE.folio}</dd>
                <dt className="text-fg-subtle uppercase">Vigencia</dt>
                <dd>{QUOTE_TERMS.validityDays} días</dd>
              </dl>
            </div>

            <div className="grid gap-6 border-b border-line p-6 sm:grid-cols-2 sm:p-10">
              <div>
                <p className="eyebrow">Para</p>
                <p className="mt-2 font-medium">{SAMPLE_QUOTE.client}</p>
              </div>
              <div>
                <p className="eyebrow">Proyecto</p>
                <p className="mt-2 font-medium">{SAMPLE_QUOTE.project}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <caption className="sr-only">Conceptos de la cotización de ejemplo</caption>
                <thead>
                  <tr className="border-b border-line font-mono text-xs text-fg-subtle uppercase">
                    <th scope="col" className="w-12 px-6 py-4 font-normal sm:pl-10">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4 font-normal">
                      Concepto
                    </th>
                    <th scope="col" className="px-6 py-4 text-right font-normal sm:pr-10">
                      Importe
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {SAMPLE_QUOTE.items.map((item, index) => (
                    <tr key={item.concept}>
                      <td className="px-6 py-5 align-top font-mono text-xs text-fg-subtle sm:pl-10">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-medium">{item.concept}</p>
                        <p className="mt-1 text-fg-muted">{item.detail}</p>
                      </td>
                      <td className="px-6 py-5 text-right align-top font-mono tabular-nums sm:pr-10">
                        {currency.format(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t border-line-strong">
                  <tr>
                    <td />
                    <th scope="row" className="px-6 pt-5 pb-2 text-left font-normal text-fg-muted">
                      Total (antes de IVA)
                    </th>
                    <td className="px-6 pt-5 pb-2 text-right font-mono text-base font-semibold tabular-nums sm:pr-10">
                      {currency.format(subtotal)}
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <th scope="row" className="px-6 pt-2 pb-6 text-left font-normal text-fg-muted">
                      Anticipo {QUOTE_TERMS.depositPercent}%
                    </th>
                    <td className="px-6 pt-2 pb-6 text-right font-mono text-accent-ink tabular-nums sm:pr-10">
                      {currency.format(deposit)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="grid gap-4 border-t border-line p-6 text-sm text-fg-muted sm:grid-cols-3 sm:p-10">
              <p>
                <span className="block font-medium text-fg">Pago</span>
                {QUOTE_TERMS.paymentMethods.join(" o ")}.
              </p>
              <p>
                <span className="block font-medium text-fg">Anticipo</span>
                {QUOTE_TERMS.depositPercent}% para iniciar; saldo contra entrega.
              </p>
              <p>
                <span className="block font-medium text-fg">Impuestos</span>
                {QUOTE_TERMS.taxNote}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Qué incluye */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">
              <span className="text-accent-ink">02</span> — Qué incluye
            </p>
            <h2 className="mt-6 text-headline font-semibold text-balance">Toda cotización incluye:</h2>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {INCLUDES.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={index * 60}
                className="flex items-baseline gap-5 py-5 text-lg"
              >
                <span className="font-mono text-xs text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/contacto" size="lg" arrow>
            Solicitar cotización
          </ButtonLink>
          <p className="text-sm text-fg-subtle">{CONTACT.responseTime}</p>
        </div>
      </Section>
    </>
  );
}
