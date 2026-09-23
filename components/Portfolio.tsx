"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import type { ServiceId } from "@/lib/services";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = "todos" | ServiceId;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "desarrollo", label: "Desarrollo" },
  { id: "estrategia", label: "Estrategia" },
  { id: "sistemas", label: "Sistemas" },
];

/**
 * Grid de proyectos filtrable por servicio. Recibe la lista completa desde
 * un Server Component (ver lib/projects.ts) y filtra en el cliente.
 */
export function Portfolio({ projects, limit }: { projects: Project[]; limit?: number }) {
  const [filter, setFilter] = useState<Filter>("todos");

  const filtered = projects.filter((project) => filter === "todos" || project.services.includes(filter));
  const visible = limit ? filtered.slice(0, limit) : filtered;
  const count = (id: Filter) =>
    id === "todos" ? projects.length : projects.filter((project) => project.services.includes(id)).length;

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar proyectos por servicio"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {FILTERS.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300",
                active
                  ? "border-fg bg-fg text-bg"
                  : "border-line-strong text-fg-muted hover:border-fg hover:text-fg",
              )}
            >
              {item.label}
              <span className={cn("font-mono text-[11px]", active ? "opacity-60" : "text-fg-subtle")}>
                {count(item.id)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "proyecto" : "proyectos"}
      </p>

      {/* key={filter} re-monta el grid para reproducir la animación de entrada */}
      <ul key={filter} className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, position) => (
          <li key={project.slug} className="animate-fade-up" style={{ animationDelay: `${position * 70}ms` }}>
            <ProjectCard project={project} index={projects.indexOf(project)} />
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="mt-10 text-fg-muted">Pronto habrá proyectos en esta categoría.</p>
      )}
    </div>
  );
}
