import { cn } from "@/lib/cn";
import { Container } from "./Container";

/** Bloque de página con espaciado vertical consistente y línea superior opcional. */
export function Section({
  id,
  className,
  containerClassName,
  divider = true,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  divider?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28 lg:py-32", className)}>
      <Container className={cn(divider && "border-t border-line pt-10 sm:pt-12", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
