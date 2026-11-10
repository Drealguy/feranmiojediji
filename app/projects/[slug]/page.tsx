import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCoverFallback from "@/components/ProjectCoverFallback";
import Slideshow from "@/components/Slideshow";
import { projects } from "@/lib/projects";

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Case study | Feranmi Ojediji`,
    description: project.summary ?? project.description,
    openGraph: project.image ? { images: [{ url: project.image }] } : undefined,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const images = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const meta = [
    { label: "Year", value: project.year },
    { label: "Type", value: project.category },
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));
  const hasStory = Boolean(project.sections?.length || project.features?.length);

  return (
    <article>
      {/* Title */}
      <header className="px-4 pt-10 pb-12 sm:px-8 sm:pt-14 sm:pb-16 lg:px-12">
        <Link
          href="/projects"
          className="focus-ring group inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transition-none">
            ←
          </span>
          All projects
        </Link>
        <h1
          data-split-lines
          className="mx-auto mt-10 max-w-[28ch] text-center text-[2rem] font-medium leading-[1.08] tracking-[-0.04em] text-balance sm:mt-14 sm:text-[3.25rem]"
        >
          {project.title}
          {project.summary && <span className="text-ink-soft">: {project.summary}</span>}
        </h1>
      </header>

      {/* Meta row */}
      {/* Two columns on phones; from tablet up, one column per detail plus status, so no detail sits alone on a row. */}
      <dl
        style={{ "--cols": meta.length + 1 } as CSSProperties}
        className="grid grid-cols-2 border-y border-line md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
      >
        {meta.map((m) => (
          <div key={m.label} className="border-b border-line px-4 py-5 text-center md:border-r md:border-b-0 md:px-5 lg:px-7">
            <dt className="text-xs uppercase tracking-[0.06em] text-ink-soft">{m.label}</dt>
            <dd className="mt-2 text-[0.9375rem] font-medium">{m.value}</dd>
          </div>
        ))}
        <div className="border-b border-line px-4 py-5 text-center md:border-b-0 md:px-5 lg:px-7">
          <dt className="text-xs uppercase tracking-[0.06em] text-ink-soft">Status</dt>
          <dd className="mt-2 flex items-center justify-center gap-2 text-[0.9375rem] font-medium">
            <span
              aria-hidden
              className={`size-2 rounded-full ${project.status === "Live" ? "bg-live" : "bg-ink-soft/40"}`}
            />
            {project.status}
          </dd>
        </div>
      </dl>

      {/* Slideshow */}
      <div data-reveal className="p-2 sm:p-3">
        {images.length > 0 ? (
          <Slideshow images={images} title={project.title} />
        ) : (
          // No screenshots yet: a branded banner keeps the page from jumping straight to text.
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[16/7]">
            <ProjectCoverFallback title={project.title} category={project.category} />
          </div>
        )}
      </div>

      {/* Intro */}
      {(project.intro || project.href) && (
        <section aria-label="Overview" className="px-4 py-16 text-center sm:px-8 sm:py-24 lg:px-12">
          {project.intro && (
            <p data-reveal className="mx-auto max-w-[52ch] text-[1.1875rem] leading-relaxed text-ink-soft sm:text-[1.375rem]">
              {project.intro}
            </p>
          )}
          <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {hasStory && (
              <a
                href="#story"
                className="focus-ring group inline-flex h-12 items-center gap-2 rounded-lg border border-line px-5 text-[0.9375rem] font-medium transition-colors hover:border-ink/40"
              >
                Continue reading
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none">
                  ↓
                </span>
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring group inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-5 text-[0.9375rem] font-medium text-cream transition-colors hover:bg-brand/90"
              >
                Visit website
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                >
                  ↗
                </span>
              </a>
            )}
          </div>
        </section>
      )}

      {/* Story: problem, solution, role, features. Heading left, text right. */}
      {hasStory && (
        <div id="story" className="scroll-mt-20 border-t border-line">
          {project.sections?.map((s) => (
            <section
              key={s.title}
              className="grid gap-4 border-b border-line px-4 py-12 sm:px-7 sm:py-16 md:grid-cols-[1fr_1.4fr] md:gap-12"
            >
              <h2 data-split-lines className="text-[1.75rem] font-medium leading-tight tracking-[-0.035em] sm:text-[2.25rem]">
                {s.title}
              </h2>
              <div data-reveal className="max-w-[60ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {project.features?.length ? (
            <section className="grid gap-6 border-b border-line px-4 py-12 sm:px-7 sm:py-16 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <h2 data-split-lines className="text-[1.75rem] font-medium leading-tight tracking-[-0.035em] sm:text-[2.25rem]">
                Features
              </h2>
              <div data-reveal className="divide-y divide-line border-y border-line">
                {project.features.map((f, i) => (
                  <details key={f.title} open={i === 0} className="group/feature">
                    <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.0625rem] font-medium [&::-webkit-details-marker]:hidden">
                      {f.title}
                      <span
                        aria-hidden
                        className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-transform duration-300 group-open/feature:rotate-45 motion-reduce:transition-none"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-[56ch] pb-6 text-[0.9375rem] leading-relaxed text-ink-soft">{f.body}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}

      {/* Next step */}
      <div className="flex h-14 items-center justify-between gap-4 border-b border-line px-4 sm:px-7">
        <Link href="/projects" className="focus-ring text-[0.9375rem] font-medium">
          ← All projects
        </Link>
        {project.href && (
          <a href={project.href} target="_blank" rel="noreferrer" className="focus-ring text-sm text-ink-soft hover:text-ink">
            {project.href.replace(/^https?:\/\//, "")} ↗
          </a>
        )}
      </div>
      <div className="h-16 sm:h-24" />
    </article>
  );
}
