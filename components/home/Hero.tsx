import Image from "next/image";
import Link from "next/link";

export interface HeroData {
  badgeText?: string;
  headline?: string;
  headlineAccent?: string;
  headlineSuffix?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  heroImage?: string;
  heroVideo?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoLabel?: string;
  stats?: { value: string; label: string }[];
}

const DEFAULTS = {
  badgeText: "Designer & Developer",
  headline: "I design digital experiences",
  headlineAccent: "built for",
  headlineSuffix: "clarity and growth.",
  subtitle: "I help businesses turn ideas into clear brands and high-performing digital experiences, from identity and websites to ecommerce and custom platforms.",
  primaryCtaText: "See my work",
  primaryCtaHref: "/works",
  secondaryCtaText: "Book a call",
  secondaryCtaHref: "/contact",
  heroImage: "/feranmi.jpg",
};

export default function Hero({ data }: { data?: HeroData }) {
  const d = { ...DEFAULTS, ...data };

  return (
    <section className="pb-14 pt-28 sm:pb-18 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--txt)" }}>Feranmi Ojediji</span>
              <span className="hidden h-px w-14 sm:block" style={{ background: "var(--bdr)" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--mut)" }}>{d.badgeText}</span>
            </div>

            <h1 className="max-w-3xl text-4xl font-medium leading-[0.98] sm:text-5xl lg:text-[56px]" style={{ color: "var(--txt)" }}>
              I design brands and websites that help businesses look better and sell better.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--mut)" }}>{d.subtitle}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={d.primaryCtaHref || "/works"} className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-opacity hover:opacity-75" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
                {d.primaryCtaText}
              </Link>
              <Link href={d.secondaryCtaHref || "/contact"} className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white/[0.04]" style={{ color: "var(--txt)", border: "1px solid var(--bdr)" }}>
                {d.secondaryCtaText}
              </Link>
            </div>

            <p className="mt-8 text-sm" style={{ color: "var(--dim)" }}>Available for branding, website &amp; digital product projects.</p>
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] p-2" style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}>
              <div className="relative h-full w-full overflow-hidden rounded-[21px]" style={{ background: "var(--surf)" }}>
                <Image src={d.heroImage || "/feranmi.jpg"} alt="Feranmi Ojediji" fill sizes="(max-width: 1024px) 90vw, 430px" className="object-cover object-top grayscale" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
