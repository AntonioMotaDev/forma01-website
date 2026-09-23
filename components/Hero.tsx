import { SITE } from "@/lib/constants";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Container";

const VALUE_PROPS = [
  {
    title: "Trato directo",
    text: "Hablas con quien diseña y construye tu proyecto. Sin intermediarios ni mensajes que se pierden.",
  },
  {
    title: "Alcance claro",
    text: "Antes de empezar sabes qué se entrega, cuándo y cuánto cuesta. Por escrito.",
  },
  {
    title: "Hecho para durar",
    text: "Código, dominios y accesos a tu nombre. Herramientas que tu equipo puede usar sin depender de nosotros.",
  },
];

/** Retraso escalonado para la animación de entrada. */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Retícula industrial que se desvanece hacia abajo */}
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32">
        <p className="eyebrow animate-fade-up">
          Estudio independiente · {SITE.location.city}, {SITE.location.countryCode}
        </p>

        <h1
          className="mt-6 max-w-5xl animate-fade-up text-display font-semibold text-balance"
          style={delay(80)}
        >
          Soluciones digitales <span className="text-bronze">/</span> para proyectos reales.
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              className="max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-muted sm:text-xl"
              style={delay(160)}
            >
              {SITE.description} Te ayudamos a planear, construir y ordenar lo digital de tu negocio: desde un
              sitio web que sí genera contactos hasta el sistema que reemplaza tus hojas de cálculo.
            </p>
            <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row" style={delay(240)}>
              <ButtonLink href="/contacto" size="lg" arrow>
                Empecemos
              </ButtonLink>
              <ButtonLink href="/proyectos" size="lg" variant="secondary">
                Ver proyectos
              </ButtonLink>
            </div>
          </div>

          <p
            className="animate-fade-up font-mono text-xs leading-relaxed tracking-wider text-fg-subtle uppercase lg:col-span-5 lg:text-right"
            style={delay(320)}
          >
            {SITE.services.join(" · ")}
          </p>
        </div>

        {/* Propuesta de valor */}
        <ul className="mt-20 grid border-t border-line sm:mt-28 md:grid-cols-3">
          {VALUE_PROPS.map((item, index) => (
            <li
              key={item.title}
              className="animate-fade-up border-b border-line py-7 md:border-b-0 md:py-8 md:pr-8 md:not-first:border-l md:not-first:pl-8"
              style={delay(400 + index * 80)}
            >
              <p className="font-mono text-xs text-accent-ink">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-fg-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
