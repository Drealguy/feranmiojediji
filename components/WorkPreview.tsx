import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/lib/projects";

export default function WorkPreview() {
  return (
    <>
      {/* Principle */}
      <section aria-label="Principle" className="px-4 py-24 text-center sm:px-8 sm:py-32">
        <blockquote>
          <p data-scrub-words className="mx-auto max-w-[30ch] text-[1.625rem] font-medium leading-[1.2] tracking-[-0.035em] text-balance sm:text-[2rem]">
            The best technology does more than look impressive. It removes friction, creates leverage and helps a business move forward.
          </p>
          <footer data-reveal className="mt-8">
            <p className="text-[0.9375rem] font-medium">Feranmi Ojediji</p>
            <p className="mt-1 text-sm text-ink-soft">The thinking behind my work</p>
          </footer>
        </blockquote>
      </section>

      {/* Recent work */}
      <section aria-labelledby="work-heading">
        <div className="flex h-14 items-center justify-between border-y border-line px-4 sm:px-7">
          <h2 id="work-heading" className="text-sm text-ink-soft">
            Recent work
          </h2>
          <Link href="/projects" className="focus-ring group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
            View all projects
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>
        <ProjectGrid items={projects.slice(0, 4)} minCells={4} />
      </section>
    </>
  );
}
