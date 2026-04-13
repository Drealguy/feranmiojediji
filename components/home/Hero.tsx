"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ value }: { value: string }) {
  // Split e.g. "120+" into numeric "120" and suffix "+"
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const steps = 50;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

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
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,245,60,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            {/* Available badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--acc)" }} />
              <span className="text-xs tracking-wider uppercase" style={{ color: "var(--mut)" }}>{d.badgeText}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6" style={{ color: "var(--txt)" }}>
              {d.headline}{" "}
              <span className="italic font-light" style={{ color: "var(--mut)" }}>{d.headlineAccent}</span>{" "}
              {d.headlineSuffix}
            </h1>

            <p className="text-base leading-relaxed mb-10 max-w-[420px]" style={{ color: "var(--mut)" }}>
              {d.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href={d.primaryCtaHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
              >
                {d.primaryCtaText}
              </Link>
              <Link
                href={d.secondaryCtaHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-80"
                style={{ color: "var(--txt)", border: "1.5px solid var(--bdr)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--mut)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bdr)")}
              >
                {d.secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Right: photo */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px]">
              <div
                className="relative rounded-3xl overflow-hidden w-full"
                style={{
                  aspectRatio: "380/460",
                  background: "var(--surf)",
                  border: "1px solid var(--bdr)",
                }}
              >
                <Image
                  src={d.heroImage || "/feranmi.jpg"}
                  alt="Feranmi Ojediji"
                  fill
                  sizes="(max-width: 768px) 90vw, 380px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating card — top left */}
              <div
                className="absolute -top-4 left-3 sm:-left-6 rounded-2xl px-4 py-3 shadow-lg"
                style={{
                  background: "var(--surf)",
                  border: "1px solid var(--bdr)",
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--acc)", animation: "ping-slow 1.5s ease-in-out infinite" }}
                  />
                  <p className="text-xs" style={{ color: "var(--mut)" }}>Latest project</p>
                </div>
                <p className="text-sm font-medium" style={{ color: "var(--txt)" }}>Brand Identity ↗</p>
              </div>

              {/* Floating card — bottom right */}
              <div
                className="absolute -bottom-4 right-3 sm:-right-6 rounded-2xl px-5 py-4 shadow-lg"
                style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
              >
                <p className="text-3xl font-bold" style={{ color: "var(--acc)" }}>99%</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--mut)" }}>Client satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--bdr)" }}
        >
          {d.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ background: "var(--surf2)" }}
            >
              <span className="text-3xl font-bold mb-1" style={{ color: "var(--acc)" }}>
                <AnimatedCounter value={stat.value} />
              </span>
              <span className="text-xs" style={{ color: "var(--mut)" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
