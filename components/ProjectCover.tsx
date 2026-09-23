import Image from "next/image";
import type { Project, ProjectAccent } from "@/lib/projects";
import { cn } from "@/lib/cn";
import { ServiceIcon } from "./icons/ServiceIcon";

const ACCENTS: Record<ProjectAccent, string> = {
  carbon: "bg-carbon text-linen dark:border dark:border-line",
  slate: "bg-slate text-linen",
  bronze: "bg-bronze text-carbon",
  cinnamon: "bg-cinnamon text-linen",
};

/**
 * Portada del proyecto. Usa la imagen si existe; si no, genera una portada
 * tipográfica con el color de acento para que el grid se vea intencional
 * mientras se preparan las imágenes reales.
 */
export function ProjectCover({
  project,
  index,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  project: Project;
  index: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden",
        !project.cover && ACCENTS[project.accent],
        className,
      )}
    >
      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        >
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <ServiceIcon
            id={project.services[0]}
            className="absolute top-1/2 right-[8%] size-[42%] -translate-y-1/2 [stroke-width:0.6] opacity-25"
          />
          <p className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.14em] uppercase opacity-70">
            {project.services.join(" · ")}
          </p>
          <p className="absolute bottom-3 left-5 text-[clamp(4rem,12vw,7.5rem)] leading-none font-semibold tracking-tighter">
            <span className={project.accent === "bronze" ? "opacity-40" : "text-bronze"}>/</span>
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
      )}
    </div>
  );
}
