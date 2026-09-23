import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { ProjectCover } from "@/components/ProjectCover";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { getAdjacentProjects, getProject, getProjects } from "@/lib/projects";
import { getService } from "@/lib/services";

// Solo existen las rutas generadas en build; cualquier otro slug → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      ...(project.cover && { images: [{ url: project.cover.src, alt: project.cover.alt }] }),
    },
  };
}

export default async function ProjectPage(props: PageProps<"/proyectos/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = getProjects().indexOf(project);
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <Link
          href="/proyectos"
          className="group inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg"
        >
          <ArrowIcon direction="left" className="size-3.5 transition-transform group-hover:-translate-x-1" />
          Proyectos
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="eyebrow animate-fade-up">
              {project.kind === "cliente" ? "Caso de cliente" : "Proyecto propio"} · {project.year}
            </p>
            <h1
              className="mt-5 animate-fade-up text-[clamp(2.25rem,1.4rem+3.4vw,4.5rem)] leading-[1.02] font-semibold tracking-tight text-balance"
              style={{ animationDelay: "80ms" }}
            >
              {project.title}
            </h1>
            <p
              className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-muted sm:text-xl"
              style={{ animationDelay: "160ms" }}
            >
              {project.summary}
            </p>
          </div>

          <dl
            className="grid animate-fade-up grid-cols-2 gap-x-6 gap-y-6 self-end border-t border-line pt-6 text-sm lg:col-span-4 lg:grid-cols-1"
            style={{ animationDelay: "240ms" }}
          >
            <Meta label="Cliente">{project.client}</Meta>
            <Meta label="Servicios">
              <ul className="flex flex-wrap gap-2">
                {project.services.map((id) => (
                  <li key={id}>
                    <Tag>{getService(id).name}</Tag>
                  </li>
                ))}
              </ul>
            </Meta>
            <Meta label="Stack">{project.stack.join(", ")}</Meta>
            {project.url && (
              <Meta label="En línea">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-accent-ink"
                >
                  {project.url.replace(/^https?:\/\//, "")}
                  <ArrowIcon direction="up-right" className="size-3" />
                </a>
              </Meta>
            )}
          </dl>
        </header>

        <div className="mt-14 animate-fade-up sm:mt-20" style={{ animationDelay: "300ms" }}>
          <ProjectCover project={project} index={index} priority sizes="(min-width: 1280px) 1216px, 100vw" />
        </div>

        <div className="grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
          <CaseBlock label="01 — El reto" className="lg:col-span-6">
            <p>{project.caseStudy.challenge}</p>
          </CaseBlock>
          <CaseBlock label="02 — El enfoque" className="lg:col-span-6">
            <p>{project.caseStudy.approach}</p>
          </CaseBlock>
          <CaseBlock label="03 — El resultado" className="lg:col-span-12" prose={false}>
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {project.caseStudy.outcome.map((item) => (
                <li key={item} className="bg-bg p-6 text-base text-fg">
                  <span aria-hidden className="mb-4 block size-1.5 bg-bronze" />
                  {item}
                </li>
              ))}
            </ul>
          </CaseBlock>
        </div>
      </Container>

      <nav aria-label="Más proyectos" className="border-t border-line">
        <Container className="grid sm:grid-cols-2">
          <AdjacentLink project={previous} direction="previous" />
          <AdjacentLink project={next} direction="next" />
        </Container>
      </nav>

      <Container className="py-20 text-center sm:py-28">
        <p className="text-headline font-semibold text-balance">¿Tienes un reto parecido?</p>
        <ButtonLink href="/contacto" size="lg" arrow className="mt-8">
          Platiquemos
        </ButtonLink>
      </Container>
    </article>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow mb-2">{label}</dt>
      <dd className="text-fg">{children}</dd>
    </div>
  );
}

function CaseBlock({
  label,
  className,
  prose = true,
  children,
}: {
  label: string;
  className?: string;
  prose?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className={className}>
      <h2 className="eyebrow mb-5">{label}</h2>
      <div className={prose ? "prose-forma" : undefined}>{children}</div>
    </Reveal>
  );
}

function AdjacentLink({
  project,
  direction,
}: {
  project?: { slug: string; title: string };
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";
  if (!project) return <div aria-hidden className="hidden sm:block" />;
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className={`group flex flex-col gap-2 py-8 sm:py-10 ${isNext ? "border-t border-line sm:border-t-0 sm:border-l sm:pl-10 sm:text-right" : "sm:pr-10"}`}
    >
      <span className="eyebrow">{isNext ? "Siguiente" : "Anterior"}</span>
      <span
        className={`flex items-center gap-3 text-xl font-semibold tracking-tight ${isNext ? "sm:justify-end" : ""}`}
      >
        {!isNext && (
          <ArrowIcon direction="left" className="size-4 transition-transform group-hover:-translate-x-1" />
        )}
        {project.title}
        {isNext && <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </Link>
  );
}
