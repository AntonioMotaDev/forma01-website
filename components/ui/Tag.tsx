import { cn } from "@/lib/cn";

export function Tag({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-fg-muted uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
