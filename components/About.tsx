import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";
import { tools, type Tool } from "@/lib/tools";

/** First few tools, shown as an overlapping cluster inside the headline (echoes the photo in the hero). */
const CLUSTER = tools.slice(0, 3);

/** Tools split across two marquee rows that scroll in opposite directions. */
const ROWS = [tools.slice(0, Math.ceil(tools.length / 2)), tools.slice(Math.ceil(tools.length / 2))];

function Chip({ t, repeat }: { t: Tool; repeat?: boolean }) {
  return (
    <li className={`${repeat ? "motion-reduce:hidden " : ""}inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full border border-line px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-cream motion-reduce:transition-none`}>
      <svg
        viewBox={t.viewBox ?? "0 0 24 24"}
        aria-hidden={!t.wordmark}
        role={t.wordmark ? "img" : undefined}
        aria-label={t.wordmark ? t.name : undefined}
        className={`fill-current ${t.wordmark ? "h-[0.8rem] w-auto" : "size-[1.1rem]"}`}
      >
        <path d={t.path} />
      </svg>
      {!t.wordmark && t.name}
    </li>
  );
}

/** One endless row. The list repeats so each half of the track is wider than large screens,
 *  which keeps the -50% loop seamless. Pauses on hover; with reduced motion it becomes a wrapped row. */
function MarqueeRow({ items, reverse, label }: { items: Tool[]; reverse?: boolean; label: string }) {
  const track = [...items, ...items, ...items];
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] motion-reduce:[mask-image:none]">
      <div
        className={`flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        <ul aria-label={label} className="flex gap-2.5 pr-2.5 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
          {track.map((t, i) => (
            // Repeats only fill the moving track; with reduced motion each tool shows once.
            <Chip key={`${t.name}-${i}`} t={t} repeat={i >= items.length} />
          ))}
        </ul>
        <ul aria-hidden className="flex gap-2.5 pr-2.5 motion-reduce:hidden">
          {track.map((t, i) => (
            <Chip key={`${t.name}-dup-${i}`} t={t} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="p-2 sm:p-3">
      <section
        aria-labelledby="about-heading"
        className="rounded-2xl border border-line bg-canvas px-5 py-20 text-center sm:px-10 sm:py-28"
      >
        <p
          data-reveal
          className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium"
        >
          <span aria-hidden className="size-2 rounded-full bg-brand" />
          About me
        </p>

        <h2
          id="about-heading"
          data-reveal
          className="mx-auto mt-8 max-w-[16ch] text-[2.25rem] font-medium leading-[1.04] tracking-[-0.045em] text-balance sm:mt-10 sm:text-[3.5rem] lg:text-[4.5rem]"
        >
          Strategy, design{" "}
          <span className="whitespace-nowrap">
            and code
            {/* Overlapping tool logos set inside the sentence. */}
            <span
              aria-hidden
              className="mx-[0.18em] inline-flex h-[0.86em] -translate-y-[0.06em] items-center rounded-full bg-cream px-[0.12em] align-middle"
            >
              {CLUSTER.map((t, i) => (
                <span
                  key={t.name}
                  style={{ animationDelay: `${i * 0.18}s` }}
                  className={`grid size-[0.68em] animate-[inline-bounce_2.6s_ease-in-out_infinite] place-items-center rounded-full bg-brand text-cream ring-2 ring-cream motion-reduce:animate-none ${
                    i > 0 ? "-ml-[0.16em]" : ""
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="size-[0.36em] fill-current">
                    <path d={t.path} />
                  </svg>
                </span>
              ))}
            </span>
          </span>
          <span className="block text-ink-soft">working together.</span>
        </h2>

        <div
          data-reveal
          className="mx-auto mt-6 max-w-[68ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft text-pretty sm:mt-8 sm:text-lg"
        >
          <p>
            I&apos;m Feranmi Ojediji, a Nigerian designer, developer and product builder with roughly six years of
            experience across brands, websites, SaaS and digital products.
          </p>
          <p>
            I help brands and businesses move from an unclear idea or inefficient process to a product, website or
            automation that is useful, credible and ready to grow.
          </p>
        </div>

        <Link
          data-reveal
          href="/about"
          className="focus-ring group mt-8 inline-flex h-12 items-center gap-2 rounded-lg border border-line px-5 text-[0.96875rem] font-medium transition-colors hover:border-ink/40"
        >
          Read more about me
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            →
          </span>
        </Link>

        {/* Tools */}
        <div className="mt-12 sm:mt-14">
          <h3 className="text-sm text-ink-soft">Tools I use</h3>
          <div data-reveal className="-mx-5 mt-5 space-y-2.5 sm:-mx-10">
            <MarqueeRow items={ROWS[0]} label="Tools I use" />
            <MarqueeRow items={ROWS[1]} reverse label="More tools I use" />
          </div>
        </div>

        <a
          data-reveal
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="focus-ring group mt-12 inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-5 text-[0.96875rem] font-medium text-cream transition-colors hover:bg-brand/90 sm:mt-14"
        >
          Work with me
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            →
          </span>
        </a>
      </section>
    </div>
  );
}
