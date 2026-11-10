import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";
import ProjectsBrowser from "@/components/ProjectsBrowser";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Feranmi Ojediji",
  description: "Selected software, product design, websites and digital platforms by Feranmi Ojediji.",
};

export default function ProjectsPage() {
  return (
    <>
      <div className="p-2 sm:p-3">
        <section
          aria-labelledby="projects-heading"
          className="rounded-2xl border border-line bg-canvas px-5 py-20 text-center sm:px-10 sm:py-28"
        >
          <p
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium"
          >
            <span aria-hidden className="size-2 rounded-full bg-brand" />
            Selected work · {projects.length} projects
          </p>
          <h1
            id="projects-heading"
            data-reveal
            className="mx-auto mt-8 max-w-[20ch] text-[2.25rem] font-medium leading-[1.04] tracking-[-0.045em] text-balance sm:mt-10 sm:text-[3.5rem] lg:text-[4.5rem]"
          >
            Products built{" "}
            <span className="whitespace-nowrap">
              around
              <span
                aria-hidden
                className="mx-[0.18em] inline-grid h-[0.86em] w-[1.3em] -translate-y-[0.06em] place-items-center rounded-full bg-cream align-middle text-brand"
              >
                <LayoutGrid className="size-[0.5em] animate-[inline-turn_5s_cubic-bezier(0.65,0,0.35,1)_infinite] motion-reduce:animate-none" strokeWidth={2} />
              </span>
            </span>
            <span className="block text-ink-soft">real business problems.</span>
          </h1>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-soft text-pretty sm:mt-8 sm:text-lg"
          >
            Selected work across software, digital products and business websites, combining strategy, design and
            development from idea to execution.
          </p>
        </section>
      </div>

      <ProjectsBrowser projects={projects} />
      <div className="h-10 sm:h-16" />
    </>
  );
}
