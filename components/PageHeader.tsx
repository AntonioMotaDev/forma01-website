import { Container } from "./ui/Container";

/** Encabezado para páginas interiores (Proyectos, Estudio, Contacto…). */
export function PageHeader({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />
      <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-28">
        <p className="eyebrow animate-fade-up">{label}</p>
        <h1
          className="mt-6 max-w-4xl animate-fade-up text-headline font-semibold text-balance sm:text-[clamp(2.5rem,1.5rem+3.5vw,4.75rem)]"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-muted sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
