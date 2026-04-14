export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
import ToolChips from "@/components/ToolChips";

export const metadata: Metadata = {
  title: "About — Feranmi Ojediji",
  description: "Learn more about Feranmi Ojediji, web designer and digital creative.",
};

interface AboutData {
  headline?: string;
  headlineAccent?: string;
  headlineSuffix?: string;
  bio?: string[];
  photo?: string;
  timeline?: { year: string; event: string }[];
  tools?: string[];
  ctaText?: string;
  ctaSubtext?: string;
}

const DEFAULTS = {
  headline: "Designer by craft,",
  headlineAccent: "builder",
  headlineSuffix: "by nature",
  bio: [
    "I'm Feranmi Ojediji — a web designer and digital creative helping brands show up powerfully online. I've spent the past 8+ years working at the intersection of design, technology, and strategy.",
    "My work isn't just about making things look good — it's about making things work. Every project is rooted in purpose, built to convert, and designed to last.",
  ],
  photo: "/feranmi.jpg",
  timeline: [
    { year: "2016", event: "Started freelancing — first logo for a family business." },
    { year: "2018", event: "Landed first brand identity project for a tech startup." },
    { year: "2020", event: "Transitioned fully to web design and digital product work." },
    { year: "2022", event: "Expanded into AI automation and digital strategy consulting." },
    { year: "2025", event: "120+ projects delivered. Still going." },
  ],
  tools: ["Figma", "Webflow", "Framer", "Adobe Creative Suite", "ChatGPT / Claude", "Make.com", "Notion", "Lottie"],
  ctaText: "Ready to build something great?",
  ctaSubtext: "I'm selective about the projects I take on — so if we're a good fit, let's talk.",
};

export default async function About() {
  const raw = await sanityFetch<AboutData>(aboutQuery).catch(() => null);
  const d = { ...DEFAULTS, ...raw };

  return (
    <div className="pt-36 pb-0">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-28 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>About me</span>
              <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-8" style={{ color: "var(--txt)" }}>
              {d.headline}{" "}
              <span className="italic font-light" style={{ color: "var(--mut)" }}>{d.headlineAccent}</span>{" "}
              {d.headlineSuffix}
            </h1>
            {d.bio.map((para, i) => (
              <p key={i} className="text-base leading-relaxed mb-4 last:mb-0" style={{ color: "var(--mut)" }}>
                {para}
              </p>
            ))}
          </div>

          <div className="relative">
            <div
              className="relative rounded-3xl overflow-hidden aspect-square max-w-sm mx-auto lg:mx-0 lg:ml-auto"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              <Image
                src={d.photo || "/feranmi.jpg"}
                alt="Feranmi Ojediji"
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover object-top"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "var(--acc)" }} />
            </div>
            <div
              className="absolute -bottom-5 left-4 lg:left-auto lg:-right-5 rounded-2xl px-4 py-3"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--acc)" }} />
                <span className="text-sm" style={{ color: "var(--txt)" }}>Open to projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {d.timeline.length > 0 && (
          <div className="mb-28">
            <div className="flex items-center gap-3 mb-10">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Journey</span>
              <div className="flex-1 h-px" style={{ background: "var(--bdr)" }} />
            </div>
            <div style={{ borderTop: "1px solid var(--bdr)" }}>
              {d.timeline.map((item) => (
                <div key={item.year} className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] gap-4 sm:gap-6 py-6" style={{ borderBottom: "1px solid var(--bdr)" }}>
                  <span className="text-xs font-mono pt-0.5" style={{ color: "var(--acc)" }}>{item.year}</span>
                  <span className="text-sm" style={{ color: "var(--mut)" }}>{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        {d.tools.length > 0 && (
          <div className="mb-28">
            <div className="flex items-center gap-3 mb-10">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Toolkit</span>
              <div className="flex-1 h-px" style={{ background: "var(--bdr)" }} />
            </div>
            <ToolChips tools={d.tools} />
          </div>
        )}

      </div>

      {/* CTA — full-bleed arc section */}
      <div className="relative overflow-hidden py-28 sm:py-36 mt-24" style={{ background: "var(--surf2)" }}>
        {/* Left arc */}
        <div
          className="pointer-events-none absolute -left-48 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
          style={{
            border: "56px solid rgba(200,245,60,0.12)",
            boxShadow: "0 0 80px 20px rgba(200,245,60,0.07)",
          }}
        />
        {/* Right arc */}
        <div
          className="pointer-events-none absolute -right-48 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
          style={{
            border: "56px solid rgba(200,245,60,0.12)",
            boxShadow: "0 0 80px 20px rgba(200,245,60,0.07)",
          }}
        />
        {/* Subtle centre glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,245,60,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase mb-8"
            style={{
              border: "1px solid rgba(200,245,60,0.3)",
              color: "var(--acc)",
              background: "rgba(200,245,60,0.08)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--acc)" }} />
            Let&apos;s work together
          </span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 max-w-2xl"
            style={{ color: "var(--txt)" }}
          >
            {d.ctaText}
          </h2>

          <p className="text-base mb-10 max-w-md" style={{ color: "var(--mut)" }}>
            {d.ctaSubtext}
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Start a project
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
