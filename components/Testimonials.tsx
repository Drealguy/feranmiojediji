import Image from "next/image";
import { testimonials, type Testimonial } from "@/lib/testimonials";

/** Cells per row on large screens. The grid is padded to full rows with open slots, so there's room for more. */
const COLUMNS = 3;

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-10 p-6 sm:p-8">
      <div>
        <svg viewBox="0 0 48 36" aria-hidden className="h-6 w-auto fill-brand">
          <path d="M0 36V22C0 9.6 6.4 2.3 19.2 0l2 5.2C14.6 7 11.2 11 10.8 17H20v19H0Zm28 0V22C28 9.6 34.4 2.3 47.2 0l2 5.2C42.6 7 39.2 11 38.8 17H48v19H28Z" />
        </svg>
        <blockquote className="mt-6 text-[1rem] leading-relaxed text-ink/85 sm:text-[1.0625rem]">{t.quote}</blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        {t.avatar ? (
          <Image src={t.avatar} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full bg-ink object-cover" />
        ) : (
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-xs font-semibold text-ink-soft"
          >
            {initials(t.name)}
          </span>
        )}
        <span>
          <span className="block text-[0.9375rem] font-medium">{t.name}</span>
          <span className="block text-sm text-ink-soft">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  // Always at least one full row; empty cells are open slots for future testimonials.
  // Tablet rows hold 2 and desktop rows 3, so slots beyond the tablet's full rows only show on desktop.
  const n = testimonials.length;
  const open = Math.max(COLUMNS, Math.ceil(n / COLUMNS) * COLUMNS) - n;
  const openOnTablet = Math.max(2, Math.ceil(n / 2) * 2) - n;

  return (
    <section aria-labelledby="testimonials-heading">
      <div className="flex h-14 items-center justify-between gap-4 border-b border-line px-4 sm:px-7">
        <h2 id="testimonials-heading" className="text-sm text-ink-soft">
          Kind words from clients
        </h2>
        <p className="text-sm text-ink-soft">
          {testimonials.length} {testimonials.length === 1 ? "review" : "reviews"}
        </p>
      </div>

      <ul data-reveal-stagger className="grid md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <li key={i} className="border-b border-line md:border-r lg:[&:nth-child(3n)]:border-r-0">
            <Card t={t} />
          </li>
        ))}
        {Array.from({ length: open }, (_, i) => (
          // Open slots: on phones they'd only add empty scrolling, so they show from tablet up.
          <li
            key={`open-${i}`}
            aria-hidden
            className={`hidden border-b border-line p-6 sm:p-8 md:border-r lg:block lg:[&:nth-child(3n)]:border-r-0 ${
              i < openOnTablet ? "md:block" : ""
            }`}
          >
            <div className="flex h-full min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-line text-center">
              <svg viewBox="0 0 48 36" aria-hidden className="h-5 w-auto fill-ink/15">
                <path d="M0 36V22C0 9.6 6.4 2.3 19.2 0l2 5.2C14.6 7 11.2 11 10.8 17H20v19H0Zm28 0V22C28 9.6 34.4 2.3 47.2 0l2 5.2C42.6 7 39.2 11 38.8 17H48v19H28Z" />
              </svg>
              <p className="mt-4 text-sm text-ink-soft">More kind words coming soon</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
