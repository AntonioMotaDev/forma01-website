import Link from "next/link";
import { CONTACT, NAV_LINKS, SITE, SOCIAL, whatsappUrl } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { ArrowIcon } from "./icons/ArrowIcon";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";

export function Footer() {
  const whatsapp = whatsappUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-carbon text-linen">
      <Container className="pt-20 pb-10 sm:pt-28">
        <Link href="/contacto" className="group block">
          <p className="font-mono text-xs tracking-[0.14em] text-linen/50 uppercase">¿Listo para empezar?</p>
          <p className="mt-4 flex items-end justify-between gap-6 text-headline font-semibold">
            <span className="max-w-3xl text-balance">
              Hagamos algo que <span className="text-bronze">funcione</span>.
            </span>
            <ArrowIcon className="mb-2 size-8 shrink-0 text-bronze transition-transform duration-500 ease-out-soft group-hover:translate-x-2 sm:size-12" />
          </p>
        </Link>

        <div className="mt-20 grid gap-10 border-t border-linen/10 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo href={null} className="text-2xl" />
            <p className="mt-4 max-w-xs leading-relaxed text-linen/60">{SITE.description}</p>
          </div>

          <FooterColumn title="Sitio" className="lg:col-span-2">
            {[{ href: "/", label: "Inicio" }, ...NAV_LINKS, { href: "/contacto", label: "Contacto" }].map(
              (link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-bronze">
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </FooterColumn>

          <FooterColumn title="Servicios" className="lg:col-span-2">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link href={`/#servicios`} className="hover:text-bronze">
                  {service.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contacto" className="lg:col-span-4">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-bronze">
                {CONTACT.email}
              </a>
            </li>
            {whatsapp && (
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-bronze">
                  WhatsApp
                </a>
              </li>
            )}
            {SOCIAL.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-bronze">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="text-linen/50">
              {SITE.location.city}, {SITE.location.country}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-linen/10 pt-6 font-mono text-xs text-linen/40 sm:flex-row sm:justify-between">
          <p>
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <p>Hecho en {SITE.location.city}.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-xs tracking-[0.14em] text-linen/40 uppercase">{title}</p>
      <ul className="mt-4 space-y-2.5 text-linen/80">{children}</ul>
    </div>
  );
}
