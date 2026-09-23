"use client";

import { cn } from "@/lib/cn";

/**
 * Alterna modo claro/oscuro. El tema inicial lo aplica un script en
 * app/layout.tsx antes de pintar (sin parpadeo). Los iconos se muestran
 * con CSS según la clase .dark, así no hay desajustes de hidratación.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar entre modo claro y oscuro"
      title="Cambiar tema"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg",
        className,
      )}
    >
      {/* Luna (modo claro activo) */}
      <svg
        viewBox="0 0 20 20"
        className="size-[18px] dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" />
      </svg>
      {/* Sol (modo oscuro activo) */}
      <svg
        viewBox="0 0 20 20"
        className="hidden size-[18px] dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <circle cx="10" cy="10" r="3.5" />
        <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" />
      </svg>
    </button>
  );
}
