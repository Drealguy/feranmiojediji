import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import WorksGrid from "@/components/WorksGrid";

export const metadata: Metadata = {
  title: "Works — Feranmi Ojediji",
  description: "Selected projects by Feranmi Ojediji — web design, branding, UI/UX, and more.",
};

export default async function Works() {
  const projects = await sanityFetch(projectsQuery).catch(() => []);

  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Portfolio</span>
            <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] max-w-lg" style={{ color: "var(--txt)" }}>
              Work that speaks for itself
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mut)" }}>
              A curated selection of projects across web design, branding, UI/UX and digital strategy.
            </p>
          </div>
        </div>

        <WorksGrid data={projects as never[]} />

        <div className="text-center">
          <p className="text-sm mb-6" style={{ color: "var(--dim)" }}>Have a project in mind?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Start a project →
          </a>
        </div>
      </div>
    </div>
  );
}
