"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Container";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        // Sin backdrop-filter con el menú abierto: crearía un containing block
        // y el panel `fixed` quedaría recortado al alto del header.
        open
          ? "border-b border-line bg-bg"
          : scrolled
            ? "border-b border-line bg-bg/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
      )}
    >
      <Container as="nav" className="flex h-16 items-center justify-between gap-6 sm:h-18">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative text-sm transition-colors hover:text-fg",
                  "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bronze after:transition-transform after:duration-300 hover:after:scale-x-100",
                  isActive(link.href) ? "text-fg after:scale-x-100" : "text-fg-muted",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <ButtonLink href="/contacto" size="md">
              Empecemos
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-fg transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-fg transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg sm:top-18 md:hidden"
      >
        <Container className="flex h-full flex-col pt-8 pb-10">
          <ul className="flex flex-col">
            {[{ href: "/", label: "Inicio" }, ...NAV_LINKS, { href: "/contacto", label: "Contacto" }].map(
              (link, index) => (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 text-3xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs font-normal text-fg-subtle">
                      {String(index).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <ButtonLink
            href="/contacto"
            size="lg"
            arrow
            className="mt-auto w-full"
            onClick={() => setOpen(false)}
          >
            Empecemos un proyecto
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
