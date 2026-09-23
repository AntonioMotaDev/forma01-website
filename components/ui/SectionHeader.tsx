import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * Encabezado de sección en dos columnas: etiqueta técnica a la izquierda,
 * titular y descripción a la derecha (se apilan en móvil).
 */
export function SectionHeader({
  index,
  label,
  title,
  description,
  className,
  children,
}: {
  index?: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-12", className)}>
      <Reveal className="lg:col-span-4">
        <p className="eyebrow">
          {index && <span className="text-accent-ink">{index}</span>}
          {index && <span aria-hidden> — </span>}
          {label}
        </p>
      </Reveal>
      <div className="lg:col-span-8">
        <Reveal as="h2" className="text-headline font-semibold text-balance">
          {title}
        </Reveal>
        {description && (
          <Reveal delay={80} className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {description}
          </Reveal>
        )}
        {children}
      </div>
    </div>
  );
}
