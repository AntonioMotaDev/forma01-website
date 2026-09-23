import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Logotipo tipográfico: "FORMA" en el color de texto y "/01" en dorado.
 * Si más adelante hay un SVG oficial, reemplaza el contenido del <span>.
 */
export function Logo({ className, href = "/" }: { className?: string; href?: string | null }) {
  const mark = (
    <span className={cn("font-sans text-lg font-semibold tracking-tight", className)}>
      FORMA<span className="text-bronze">/01</span>
    </span>
  );
  if (!href) return mark;
  return (
    <Link href={href} aria-label="FORMA/01 — Inicio" className="inline-flex items-center">
      {mark}
    </Link>
  );
}
