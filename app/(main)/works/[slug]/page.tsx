export const revalidate = 3600;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/client";
import { projectQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import { fallbackProjects } from "@/lib/project-data";

interface ProjectCaseStudy {
  _id: string;
  title: string;
  slug: string;
  category: string;
  year?: string;
  description?: string;
  clientName?: string;
  overview?: string;
  challenge?: string;
  contributions?: string[];
  solution?: string;
  results?: string[];
  tags?: string[];
  coverImage?: string;
  gallery?: { url: string }[];
  testimonial?: { quote?: string; name?: string; role?: string };
  liveUrl?: string;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(projectSlugsQuery).catch(() => []);
  return [
    ...slugs.map(({ slug }) => ({ slug })),
    ...fallbackProjects.flatMap((project) => project.slug ? [{ slug: project.slug }] : []),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project =
    (await sanityFetch<ProjectCaseStudy>(projectQuery, { slug }).catch(() => null)) ??
    (fallbackProjects.find((item) => item.slug === slug) as ProjectCaseStudy | undefined);
  if (!project) return {};
  return {
    title: `${project.title} | Case Study`,
    description: project.overview || project.description,
    alternates: { canonical: `https://feranmiojediji.com/myworks/${slug}` },
    openGraph: {
      title: project.title,
      description: project.overview || project.description,
      url: `https://feranmiojediji.com/myworks/${slug}`,
      ...(project.coverImage ? { images: [{ url: project.coverImage }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project =
    (await sanityFetch<ProjectCaseStudy>(projectQuery, { slug }).catch(() => null)) ??
    (fallbackProjects.find((item) => item.slug === slug) as ProjectCaseStudy | undefined);
  if (!project) notFound();

  return (
    <div className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link href="/works" className="mb-10 inline-flex text-sm transition-opacity hover:opacity-60" style={{ color: "var(--mut)" }}>← Back to work</Link>

        <header className="mb-10 grid gap-8 md:grid-cols-[1fr_0.55fr] md:items-end sm:mb-14">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--mut)" }}>{project.category}{project.year ? ` · ${project.year}` : ""}</p>
            <h1 className="max-w-4xl text-4xl font-medium sm:text-5xl lg:text-6xl" style={{ color: "var(--txt)" }}>{project.title}</h1>
          </div>
          <div className="md:justify-self-end">
            {project.clientName && <p className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--dim)" }}>Client</p>}
            {project.clientName && <p className="text-base font-medium" style={{ color: "var(--txt)" }}>{project.clientName}</p>}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--txt)" }}>
                Visit live project <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </header>

        {project.coverImage && (
          <div className="relative mb-12 aspect-video overflow-hidden rounded-[24px] sm:mb-16 sm:rounded-[32px]" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
            <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, 1152px" className="object-cover" priority />
          </div>
        )}

        <div className="mx-auto max-w-5xl">
          <section className="grid gap-8 py-10 md:grid-cols-[0.55fr_1fr] sm:py-14" style={{ borderTop: "1px solid var(--bdr)" }}>
            <h2 className="text-2xl font-medium sm:text-3xl" style={{ color: "var(--txt)" }}>Project overview</h2>
            <p className="text-base leading-[1.8] sm:text-lg" style={{ color: "var(--mut)" }}>{project.overview || project.description}</p>
          </section>

          {project.challenge && (
            <section className="grid gap-8 py-10 md:grid-cols-[0.55fr_1fr] sm:py-14" style={{ borderTop: "1px solid var(--bdr)" }}>
              <h2 className="text-2xl font-medium sm:text-3xl" style={{ color: "var(--txt)" }}>The challenge</h2>
              <p className="text-base leading-[1.8] sm:text-lg" style={{ color: "var(--mut)" }}>{project.challenge}</p>
            </section>
          )}

          {(project.contributions?.length || project.tags?.length) && (
            <section className="grid gap-8 py-10 md:grid-cols-[0.55fr_1fr] sm:py-14" style={{ borderTop: "1px solid var(--bdr)" }}>
              <h2 className="text-2xl font-medium sm:text-3xl" style={{ color: "var(--txt)" }}>What I did</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {(project.contributions?.length ? project.contributions : project.tags)?.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl p-4 text-sm" style={{ color: "var(--mut)", background: "var(--surf)", border: "1px solid var(--bdr)" }}>
                    <Check size={15} className="mt-0.5 shrink-0" style={{ color: "var(--txt)" }} />{item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.solution && (
            <section className="grid gap-8 py-10 md:grid-cols-[0.55fr_1fr] sm:py-14" style={{ borderTop: "1px solid var(--bdr)" }}>
              <h2 className="text-2xl font-medium sm:text-3xl" style={{ color: "var(--txt)" }}>The solution</h2>
              <p className="text-base leading-[1.8] sm:text-lg" style={{ color: "var(--mut)" }}>{project.solution}</p>
            </section>
          )}
        </div>

        {project.gallery?.length ? (
          <section className="my-12 grid gap-4 sm:my-20 sm:grid-cols-2">
            {project.gallery.map((image, index) => (
              <div key={`${image.url}-${index}`} className={`relative overflow-hidden rounded-2xl ${index % 3 === 0 ? "sm:col-span-2 aspect-video" : "aspect-[4/3]"}`} style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
                <Image src={image.url} alt={`${project.title} project image ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            ))}
          </section>
        ) : null}

        <div className="mx-auto max-w-5xl">
          {project.results?.length ? (
            <section className="grid gap-8 py-10 md:grid-cols-[0.55fr_1fr] sm:py-14" style={{ borderTop: "1px solid var(--bdr)" }}>
              <h2 className="text-2xl font-medium sm:text-3xl" style={{ color: "var(--txt)" }}>The outcome</h2>
              <ul className="space-y-3">
                {project.results.map((result) => <li key={result} className="text-base leading-relaxed" style={{ color: "var(--mut)" }}>• {result}</li>)}
              </ul>
            </section>
          ) : null}

          {project.testimonial?.quote && (
            <section className="my-10 rounded-[24px] bg-black p-7 text-white sm:my-16 sm:p-12">
              <p className="mb-8 max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">“{project.testimonial.quote}”</p>
              <p className="text-sm font-semibold">{project.testimonial.name}</p>
              {project.testimonial.role && <p className="mt-1 text-sm text-white/55">{project.testimonial.role}</p>}
            </section>
          )}

          <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl p-7 sm:flex-row sm:items-center sm:p-10" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Have a similar project?</p>
              <h2 className="text-2xl font-medium" style={{ color: "var(--txt)" }}>Let’s build yours.</h2>
            </div>
            <Link href="/contact" className="rounded-xl px-6 py-3.5 text-sm font-semibold" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>Start a project</Link>
          </section>
        </div>
      </div>
    </div>
  );
}
