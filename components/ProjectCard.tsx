import Link from "next/link";
import type { Project } from "@/lib/projects";
import { getService } from "@/lib/services";
import { ArrowIcon } from "./icons/ArrowIcon";
import { ProjectCover } from "./ProjectCover";
import { Tag } from "./ui/Tag";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/proyectos/${project.slug}`} className="group block">
      <article>
        <ProjectCover project={project} index={index} />

        <div className="mt-5 flex items-center justify-between gap-4 font-mono text-xs text-fg-subtle">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>

        <h3 className="mt-2 flex items-start justify-between gap-4 text-xl font-semibold tracking-tight">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-soft group-hover:bg-[length:100%_1px]">
            {project.title}
          </span>
          <ArrowIcon
            direction="up-right"
            className="mt-1.5 size-4 shrink-0 text-fg-subtle transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink"
          />
        </h3>

        <p className="mt-2 leading-relaxed text-fg-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Servicios aplicados">
          {project.services.map((id) => (
            <li key={id}>
              <Tag>{getService(id).name}</Tag>
            </li>
          ))}
        </ul>
      </article>
    </Link>
  );
}
