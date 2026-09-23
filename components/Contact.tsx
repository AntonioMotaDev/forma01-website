import { CONTACT, SITE, whatsappUrl } from "@/lib/constants";
import { ArrowIcon } from "./icons/ArrowIcon";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

/**
 * Bloque de contacto: datos directos + formulario. Se usa en el home y en
 * /contacto. `heading` permite cambiar el titular según la página.
 */
export function Contact({
  index = "05",
  heading = "¿Tienes un proyecto en mente?",
  as: HeadingTag = "h2",
  divider = true,
  className,
}: {
  /** Numeración de sección en el home; `null` la oculta. */
  index?: string | null;
  heading?: string;
  as?: "h1" | "h2";
  divider?: boolean;
  className?: string;
}) {
  const whatsapp = whatsappUrl();

  return (
    <Section id="contacto" divider={divider} className={className}>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">
              {index && (
                <>
                  <span className="text-accent-ink">{index}</span> —{" "}
                </>
              )}
              Contacto
            </p>
          </Reveal>
          <Reveal as="div" delay={60}>
            <HeadingTag className="mt-6 text-headline font-semibold text-balance">{heading}</HeadingTag>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-fg-muted">
              Cuéntanos qué necesitas. No hace falta tenerlo todo claro: para eso es la primera conversación.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              <ContactRow label="Correo">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group inline-flex items-center gap-2 break-all hover:text-accent-ink"
                >
                  {CONTACT.email}
                  <ArrowIcon
                    direction="up-right"
                    className="size-3.5 shrink-0 opacity-50 transition group-hover:opacity-100"
                  />
                </a>
              </ContactRow>
              {whatsapp && (
                <ContactRow label="WhatsApp">
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 hover:text-accent-ink"
                  >
                    Enviar mensaje
                    <ArrowIcon
                      direction="up-right"
                      className="size-3.5 opacity-50 transition group-hover:opacity-100"
                    />
                  </a>
                </ContactRow>
              )}
              <ContactRow label="Ubicación">
                {SITE.location.city}, {SITE.location.country}
                <span className="block text-sm text-fg-subtle">Trabajamos en remoto con todo el país.</span>
              </ContactRow>
              <ContactRow label="Respuesta">{CONTACT.responseTime}</ContactRow>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
      <dt className="font-mono text-xs leading-6 tracking-wider text-fg-subtle uppercase">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
