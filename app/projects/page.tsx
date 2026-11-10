import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work | Feranmi Ojediji",
  description: "Selected software, product design, websites and digital platforms by Feranmi Ojediji.",
};

export default function WorkPage() {
  return (
    <>
      <section aria-labelledby="work-heading" className="text-center px-4 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20 lg:px-12">
        <p className="text-sm text-ink-soft">Selected work</p>
        <h1
          id="work-heading"
          data-split-lines
          className="mx-auto mt-5 max-w-[18ch] text-[2.75rem] font-medium leading-[1.02] tracking-[-0.045em] text-balance sm:text-[4.5rem]"
        >
          Products built around real business problems.
        </h1>
        <p data-reveal className="mx-auto mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
          Selected work across software, digital products and business websites, combining strategy,
          design and development from idea to execution.
        </p>
      </section>

      <section aria-label="All projects">
        <div className="flex h-14 items-center justify-between gap-4 border-y border-line px-4 sm:px-7">
          <h2 className="text-sm text-ink-soft">All projects</h2>
          <p className="text-sm text-ink-soft">Strategy · Design · Development</p>
        </div>
        {/* Fixed 2 × 6 grid: 12 cells, padded with "coming soon" slots. Grows by full rows past 12. */}
        <ProjectGrid items={projects} minCells={Math.max(12, projects.length + (projects.length % 2))} />
      </section>
    </>
  );
}
