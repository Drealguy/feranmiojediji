export const revalidate = 3600;

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import WorksGrid from "@/components/WorksGrid";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Works | Feranmi Ojediji",
  description: "Selected projects by Feranmi Ojediji across web design, branding, UI/UX, and digital strategy.",
  alternates: { canonical: "https://www.feranmiojediji.com/works" },
  openGraph: {
    title: "Works | Feranmi Ojediji",
    description: "Selected projects by Feranmi Ojediji across web design, branding, UI/UX, and digital strategy.",
    url: "https://www.feranmiojediji.com/works",
    images: [{ url: "/feranmi.jpg", width: 1200, height: 630, alt: "Feranmi Ojediji" }],
  },
  twitter: { card: "summary_large_image", title: "Works | Feranmi Ojediji", images: ["/feranmi.jpg"] },
};

const serviceFilters: Record<string, string> = {
  branding: "Logo & Brand Identity Design",
  "website-design": "Business & Corporate Websites",
  ecommerce: "Ecommerce Websites & Digital Platforms",
  "brand-strategy-content": "Brand Strategy & Content",
};

export default async function Works({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const initialFilter = service ? serviceFilters[service] ?? "All" : "All";
  const projects = await sanityFetch(projectsQuery).catch(() => []);

  return (
    <div className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Portfolio</span>
            <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] max-w-lg" style={{ color: "var(--txt)" }}>
              Work that speaks for itself
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mut)" }}>
              A curated selection of projects across web design, branding, UI/UX and digital strategy.
            </p>
          </div>
        </ScrollReveal>

        <WorksGrid data={projects as never[]} initialFilter={initialFilter} />

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
