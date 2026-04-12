"use client";

import Link from "next/link";
import Image from "next/image";

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
  stats?: { value: string; label: string }[];
}

const DEFAULTS: Required<HeroData> = {
  badgeText: "Available for work",
  headline: "Web designer crafting",
  headlineAccent: "purposeful",
  headlineSuffix: "online presence",
  subtitle:
    "I help brands grow through strategic design — from websites to full brand identities. Clean, fast, and built to convert.",
  primaryCtaText: "See my work",
  primaryCtaHref: "/works",
  secondaryCtaText: "Book a call",
  secondaryCtaHref: "/contact",
  heroImage: "/feranmi.jpg",
  stats: [
    { value: "8+", label: "Years of experience" },
    { value: "120+", label: "Projects delivered" },
    { value: "35+", label: "Happy clients" },
    { value: "99%", label: "Client satisfaction" },
  ],
};

export default function Hero({ data }: { data?: HeroData }) {
  const d = { ...DEFAULTS, ...data };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,245,60,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--acc)" }} />
              <span className="text-xs tracking-wider uppercase" style={{ color: "var(--mut)" }}>
                {d.badgeText}
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6" style={{ color: "var(--txt)" }}>
              {d.headline}{" "}
              <span className="italic font-light" style={{ color: "var(--mut)" }}>{d.headlineAccent}</span>{" "}
              {d.headlineSuffix}
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-[440px]" style={{ color: "var(--mut)" }}>
              {d.subtitle}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href={d.primaryCtaHref}
                className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
              >
                {d.primaryCtaText}
              </Link>
              <Link
                href={d.secondaryCtaHref}
                className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{ color: "var(--txt)", border: "1px solid var(--bdr)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--mut)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bdr)")}
              >
                {d.secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Right: image or placeholder card */}
          <div className="relative">
            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/5]"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              {d.heroImage ? (
                <Image
                  src={d.heroImage}
                  alt="Feranmi Ojediji"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                  <div className="w-full h-2 rounded-full" style={{ background: "var(--bdr)" }} />
                  <div className="w-4/5 h-2 rounded-full" style={{ background: "var(--bdr)" }} />
                  <div className="w-3/5 h-2 rounded-full" style={{ background: "var(--bdr)" }} />
                  <div className="mt-4 w-24 h-8 rounded-lg" style={{ background: "var(--acc)" }} />
                </div>
              )}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 rounded-bl-full"
                style={{ background: "var(--acc)" }}
              />
            </div>

            <div
              className="absolute -top-4 -left-8 rounded-2xl px-4 py-3"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              <p className="text-xs mb-1" style={{ color: "var(--mut)" }}>Latest project</p>
              <p className="text-sm font-medium" style={{ color: "var(--txt)" }}>Brand Identity ↗</p>
            </div>

            <div
              className="absolute -bottom-4 -right-6 rounded-2xl px-5 py-4"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              <p className="text-3xl font-bold" style={{ color: "var(--acc)" }}>99%</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--mut)" }}>Client satisfaction</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--bdr)" }}
        >
          {d.stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ background: "var(--surf2)" }}
            >
              <span className="text-3xl font-bold mb-1" style={{ color: "var(--acc)" }}>
                {stat.value}
              </span>
              <span className="text-xs" style={{ color: "var(--mut)" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
