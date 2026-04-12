import type { Metadata } from "next";
import ToolChips from "@/components/ToolChips";

export const metadata: Metadata = {
  title: "About — Feranmi Ojediji",
  description: "Learn more about Feranmi Ojediji, web designer and digital creative.",
};

const bio = [
  "I'm Feranmi Ojediji — a web designer and digital creative helping brands show up powerfully online. I've spent the past 8+ years working at the intersection of design, technology, and strategy.",
  "My work isn't just about making things look good — it's about making things work. Every project is rooted in purpose, built to convert, and designed to last.",
];

const timeline = [
  { year: "2016", event: "Started freelancing — first logo for a family business." },
  { year: "2018", event: "Landed first brand identity project for a tech startup." },
  { year: "2020", event: "Transitioned fully to web design and digital product work." },
  { year: "2022", event: "Expanded into AI automation and digital strategy consulting." },
  { year: "2025", event: "120+ projects delivered. Still going." },
];

const tools = ["Figma", "Webflow", "Framer", "Adobe Creative Suite", "ChatGPT / Claude", "Make.com", "Notion", "Lottie"];

export default function About() {
  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-6">

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-28 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>About me</span>
              <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
            </div>
            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-8" style={{ color: "var(--txt)" }}>
              Designer by craft,{" "}
              <span className="italic font-light" style={{ color: "var(--mut)" }}>builder</span>{" "}
              by nature
            </h1>
            {bio.map((para, i) => (
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
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 70% 70% at 50% 30%, rgba(200,245,60,0.07) 0%, transparent 70%)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-semibold" style={{ color: "var(--bdr)" }}>FO</span>
              </div>
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
        <div className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Journey</span>
            <div className="flex-1 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div style={{ borderTop: "1px solid var(--bdr)" }}>
            {timeline.map((item) => (
              <div key={item.year} className="grid grid-cols-[80px_1fr] gap-6 py-6" style={{ borderBottom: "1px solid var(--bdr)" }}>
                <span className="text-xs font-mono pt-0.5" style={{ color: "var(--acc)" }}>{item.year}</span>
                <span className="text-sm" style={{ color: "var(--mut)" }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-28">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Toolkit</span>
            <div className="flex-1 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <ToolChips tools={tools} />
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-12 text-center" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--acc)" }}>Let&apos;s work together</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6" style={{ color: "var(--txt)" }}>
            Ready to build something great?
          </h2>
          <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: "var(--mut)" }}>
            I&apos;m selective about the projects I take on — so if we&apos;re a good fit, let&apos;s talk.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Start a project →
          </a>
        </div>
      </div>
    </div>
  );
}
