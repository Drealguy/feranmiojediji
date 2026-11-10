"use client";

import { useState } from "react";
import ProjectGrid from "@/components/ProjectGrid";
import type { Project } from "@/lib/projects";

/** Project types are mostly one-offs ("Travel website", "E learning platform"…), so filters group them. */
const FILTERS = [
  { id: "all", label: "All", test: () => true },
  { id: "websites", label: "Websites", test: (p: Project) => /website/i.test(p.category) },
  { id: "software", label: "Software & platforms", test: (p: Project) => !/website/i.test(p.category) },
] as const;

export default function ProjectsBrowser({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const active = FILTERS.find((f) => f.id === filter)!;
  const items = projects.filter(active.test);
  // "All" keeps the fixed 2 × 6 grid, padded with "coming soon" cards; filtered views show just the matches.
  const minCells = filter === "all" ? Math.max(12, items.length + (items.length % 2)) : 0;

  return (
    <section aria-label="Projects">
      <div className="flex flex-wrap items-center justify-center gap-2 px-4 pt-2 pb-1 sm:px-7">
        <div role="radiogroup" aria-label="Filter projects" className="flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const count = projects.filter(f.test).length;
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setFilter(f.id)}
                className={`focus-ring inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                  on ? "border-brand bg-brand text-cream" : "border-line hover:border-ink/40"
                }`}
              >
                {f.label}
                <span className={`tabular-nums ${on ? "text-cream/70" : "text-ink-soft"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      <ProjectGrid items={items} minCells={minCells} priorityCount={2} />
    </section>
  );
}
