/** Branded stand-in cover for projects that don't have an image yet, so they don't
 *  read as empty "coming soon" slots. Fills its (relative, sized) parent. */
export default function ProjectCoverFallback({ title, category }: { title: string; category: string }) {
  return (
    <div
      aria-hidden
      className="@container absolute inset-0 flex flex-col justify-between bg-brand p-5 text-cream transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none sm:p-6"
    >
      <div className="bg-stage-grid absolute inset-0 opacity-70" />
      <p className="relative text-xs uppercase tracking-[0.06em] text-cream/60">{category}</p>
      {/* Scales with the card so long names still fit on one or two lines. */}
      <p className="relative max-w-[14ch] text-[clamp(1.5rem,9cqw,3.25rem)] font-medium leading-[1.02] tracking-[-0.045em] text-balance">
        {title}
      </p>
    </div>
  );
}
