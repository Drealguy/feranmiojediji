import Link from "next/link";
import Image from "next/image";
import ProjectCoverFallback from "@/components/ProjectCoverFallback";
import type { Project } from "@/lib/projects";

interface Props {
  items: Project[];
  /** Pads the grid with "coming soon" cards up to this many cells. */
  minCells?: number;
}

export default function ProjectGrid({ items, minCells = 0 }: Props) {
  const emptySlots = Math.max(0, minCells - items.length);

  return (
    <ul data-reveal-stagger className="grid gap-3 p-2 sm:grid-cols-2 sm:p-3">
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/projects/${p.slug}`}
            className="focus-ring group flex h-full flex-col rounded-2xl border border-line bg-canvas p-2.5 transition duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-3"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink/5">
              {p.image ? (
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 48vw, 100vw"
                  style={{ objectPosition: p.imagePosition }}
                  className="object-cover transition duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              ) : (
                <ProjectCoverFallback title={p.title} category={p.category} />
              )}
            </div>

            <div className="flex flex-1 flex-col px-2 pt-5 pb-2 sm:px-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-xl font-medium tracking-[-0.025em]">{p.title}</h3>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                  {p.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                  <span aria-hidden className={`size-1.5 rounded-full ${p.status === "Live" ? "bg-live" : "bg-ink-soft/50"}`} />
                  {p.status}
                </span>
              </div>
              <p className="mt-2 max-w-[52ch] flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{p.description}</p>
              <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
                View case study
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </p>
            </div>
          </Link>
        </li>
      ))}
      {Array.from({ length: emptySlots }, (_, i) => (
        // Empty cards only fill out the 2-column grid; on phones they'd just be a long empty scroll.
        <li
          key={`slot-${i}`}
          aria-hidden
          className="hidden min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-line text-sm text-ink-soft sm:flex"
        >
          Project coming soon
        </li>
      ))}
    </ul>
  );
}
