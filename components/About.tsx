import { WHATSAPP_URL } from "@/lib/site";
import { tools } from "@/lib/tools";

export default function About() {
  return (
    <div className="p-2 sm:p-3">
      <section
        aria-labelledby="about-heading"
        className="relative overflow-hidden rounded-2xl bg-brand text-cream"
      >
        <div aria-hidden className="bg-stage-grid absolute inset-0 opacity-70" />

        <div className="relative grid gap-12 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:p-12">
          {/* Left: intro */}
          <div>
            <p className="text-sm font-medium text-cream/60">About</p>
            <h2
              id="about-heading"
              data-split-lines
              className="mt-5 max-w-[12ch] text-[2.5rem] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[4rem]"
            >
              Strategy, design and code working together.
            </h2>
            <div data-reveal className="mt-6 max-w-[42ch] space-y-4 text-[1.0625rem] leading-relaxed text-cream/70">
              <p>
                I&apos;m Feranmi Ojediji, a Nigerian designer, developer and product builder with roughly six
                years of experience across brands, websites, SaaS and digital products.
              </p>
              <p>
                I help brands and businesses move from an unclear idea or inefficient process to a product,
                website or automation that is useful, credible and ready to grow.
              </p>
            </div>
            <a
              data-reveal
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-[0.9375rem] font-medium text-brand transition-colors duration-300 hover:bg-white"
            >
              Work with me
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </div>

          {/* Right: tools. Each tile lights up white on hover. */}
          <div>
            <h3 className="text-sm font-medium text-cream/60">Tools I use</h3>
            <ul
              data-reveal-stagger
              className="mt-5 grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10"
            >
              {tools.map((t) => (
                <li
                  key={t.name}
                  className="group/tile relative flex aspect-square flex-col items-center justify-center gap-2 bg-brand text-cream/45 transition-colors duration-300 hover:text-white motion-reduce:transition-none sm:gap-3"
                >
                  {/* Soft white glow behind the logo. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#fff,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover/tile:opacity-10 motion-reduce:transition-none"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="relative fill-current transition-transform duration-500 group-hover/tile:-translate-y-0.5 group-hover/tile:scale-110 motion-reduce:transition-none size-6 sm:size-9"
                  >
                    <path d={t.path} />
                  </svg>
                  <span className="relative px-1 text-center text-[0.625rem] leading-tight font-medium text-cream/60 sm:text-sm transition-colors duration-300 group-hover/tile:text-white">
                    {t.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
