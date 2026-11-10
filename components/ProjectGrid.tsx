import Link from "next/link";
import Image from "next/image";
import ProjectCoverFallback from "@/components/ProjectCoverFallback";
import type { Project } from "@/lib/projects";

interface Props {
  items: Project[];
  /** Pads the grid with "coming soon" slots up to this many cells. */
  minCells?: number;
}

export default function ProjectGrid({ items, minCells = 0 }: Props) {
  const emptySlots = Math.max(0, minCells - items.length);

  return (
    <ul data-reveal-stagger className="grid sm:grid-cols-2">
      {items.map((p) => (
        <li key={p.slug} className="border-b border-line sm:odd:border-r">
          <Link href={`/projects/${p.slug}`} className="focus-ring group block p-4 sm:p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink/5">
              {p.image ? (
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 45vw, 100vw"
                  style={{ objectPosition: p.imagePosition }}
                  className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              ) : (
                <ProjectCoverFallback title={p.title} category={p.category} />
              )}
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg font-medium tracking-[-0.02em]">{p.title}</h3>
                  <span className="rounded-md bg-brand px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-cream">
                    {p.category}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="text-sm text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none"
                >
                  ↗
                </span>
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
                <span
                  aria-hidden
                  className={`size-2 rounded-full ${p.status === "Live" ? "bg-live" : "bg-ink-soft/40"}`}
                />
                {p.status}
              </p>
              <p className="mt-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                {p.description}
              </p>
            </div>
          </Link>
        </li>
      ))}
      {Array.from({ length: emptySlots }, (_, i) => (
        // Empty slots only fill out the 2-column grid; on phones they'd just be a long empty scroll.
        <li key={`slot-${i}`} aria-hidden className="hidden border-b border-line p-4 sm:block sm:p-5 sm:odd:border-r">
          <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-ink/[0.03] text-sm text-ink-soft">
            Project coming soon
          </div>
          {/* Matches the height of a real card's info block so rows line up. */}
          <div className="mt-5 h-28" />
        </li>
      ))}
    </ul>
  );
}
