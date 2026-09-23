import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <Container className="flex min-h-[70dvh] flex-col justify-center py-24">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 text-display font-semibold">
          <span className="text-bronze">/</span>404
        </h1>
        <p className="mt-6 max-w-md text-lg text-fg-muted">
          Esta página no existe o cambió de lugar. Puede que lo que buscas esté en proyectos o en inicio.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Ir al inicio
          </ButtonLink>
          <ButtonLink href="/proyectos" variant="secondary">
            Ver proyectos
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
