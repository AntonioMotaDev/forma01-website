import type { ServiceId } from "@/lib/services";

/**
 * Iconos geométricos de línea para cada pilar. Construidos sobre una
 * retícula de 48×48 para mantener el tono industrial/minimalista.
 */
export function ServiceIcon({ id, className }: { id: ServiceId; className?: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    className,
    "aria-hidden": true,
  } as const;

  switch (id) {
    // Estrategia: mira / punto de enfoque sobre retícula
    case "estrategia":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="15" />
          <circle cx="24" cy="24" r="6" />
          <path d="M24 3v10M24 35v10M3 24h10M35 24h10" />
          <circle cx="24" cy="24" r="1.5" className="fill-bronze stroke-bronze" />
        </svg>
      );
    // Desarrollo: ventana/código con barra
    case "desarrollo":
      return (
        <svg {...common}>
          <rect x="5" y="9" width="38" height="30" />
          <path d="M5 16h38" />
          <path d="M18 23l-5 5 5 5M30 23l5 5-5 5" />
          <path d="M26 21l-4 14" className="stroke-bronze" />
        </svg>
      );
    // Sistemas: nodos conectados
    case "sistemas":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="12" height="12" />
          <rect x="31" y="5" width="12" height="12" />
          <rect x="18" y="31" width="12" height="12" />
          <path d="M17 11h14M11 17v8h13v6M37 17v8H24" />
          <rect x="21.5" y="34.5" width="5" height="5" className="fill-bronze stroke-none" />
        </svg>
      );
  }
}
