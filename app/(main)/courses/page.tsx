export const revalidate = 60;

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { coursesQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Courses — Feranmi Ojediji",
  description: "Learn web design, branding, and digital strategy directly from Feranmi Ojediji.",
};

interface Course {
  _id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  price: string;
  accentColor?: string;
  description: string;
  topics?: string[];
  purchaseUrl?: string;
  available: boolean;
}

const FALLBACK: Course[] = [
  { _id: "1", title: "Design Systems That Scale", category: "UI/UX Design", level: "Intermediate", duration: "6 hrs", lessons: 24, price: "$149", accentColor: "#c8f53c", description: "Build robust design systems in Figma from scratch. Covers tokens, components, auto-layout, documentation, and handoff to developers.", topics: ["Design tokens", "Component architecture", "Auto-layout mastery", "Dev handoff", "Documentation"], available: true },
  { _id: "2", title: "Web Design Fundamentals", category: "Website Design", level: "Beginner", duration: "4 hrs", lessons: 16, price: "$99", accentColor: "#60a5fa", description: "Everything you need to start designing websites that convert. Layout, typography, colour theory, and UX principles all in one place.", topics: ["Grid & layout", "Typography", "Colour theory", "UX principles", "Webflow basics"], available: true },
  { _id: "3", title: "Brand Identity from Zero", category: "Branding", level: "Beginner – Intermediate", duration: "5 hrs", lessons: 20, price: "$129", accentColor: "#f472b6", description: "A complete guide to building brand identities — from strategy and research through to logo design, colour systems, and final delivery.", topics: ["Brand strategy", "Logo design", "Colour & typography", "Brand guidelines", "Client delivery"], available: true },
  { _id: "4", title: "Social Media Design for Creatives", category: "Social Media Design", level: "All levels", duration: "3 hrs", lessons: 12, price: "$89", accentColor: "#34d399", description: "Use AI tools to automate your creative workflow. Content creation, lead generation, client onboarding — all on autopilot.", topics: ["Make.com workflows", "AI content pipelines", "Lead generation", "Client onboarding", "Prompt engineering"], available: false },
];

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "#34d399",
  Intermediate: "#c8f53c",
  "Beginner – Intermediate": "#60a5fa",
  "All levels": "#a78bfa",
};

export default async function Courses() {
  const raw = await sanityFetch<Course[]>(coursesQuery).catch(() => null);
  const courses: Course[] = raw?.length ? raw : FALLBACK;
  const totalLessons = courses.reduce((sum, c) => sum + (c.lessons ?? 0), 0);

  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Courses</span>
            <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] max-w-lg" style={{ color: "var(--txt)" }}>
              Learn design from{" "}
              <span className="italic font-light" style={{ color: "var(--mut)" }}>someone doing it</span>
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mut)" }}>
              Practical, no-fluff courses built from 8+ years of real client work.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: "var(--bdr)" }}>
            {[{ value: String(courses.length), label: "Courses" }, { value: String(totalLessons), label: "Lessons" }, { value: "18hrs", label: "Total content" }, { value: "Lifetime", label: "Access" }].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-6 px-4 text-center" style={{ background: "var(--surf2)" }}>
                <span className="text-2xl font-bold mb-1" style={{ color: "var(--acc)" }}>{s.value}</span>
                <span className="text-xs" style={{ color: "var(--mut)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 mb-20">
          {courses.map((course) => {
            const accent = course.accentColor ?? "#c8f53c";
            const levelColor = LEVEL_COLORS[course.level] ?? "var(--mut)";
            return (
              <div key={course._id} className="rounded-2xl overflow-hidden" style={{ background: "var(--surf)", border: "1px solid var(--bdr)", opacity: course.available ? 1 : 0.6 }}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
                  <div className="p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>{course.category}</span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ background: `${levelColor}15`, color: levelColor, border: `1px solid ${levelColor}25` }}>{course.level}</span>
                      {!course.available && <span className="px-3 py-1 rounded-full text-xs" style={{ background: "var(--surf2)", color: "var(--mut)", border: "1px solid var(--bdr)" }}>Coming soon</span>}
                    </div>
                    <h2 className="text-xl font-semibold mb-3 tracking-tight" style={{ color: "var(--txt)" }}>{course.title}</h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--mut)" }}>{course.description}</p>
                    {course.topics && course.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((t) => <span key={t} className="px-3 py-1 rounded-lg text-xs" style={{ color: "var(--dim)", border: "1px solid var(--bdr)" }}>{t}</span>)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between p-8 md:p-10 md:border-l" style={{ borderColor: "var(--bdr)" }}>
                    <div className="flex flex-col gap-3 mb-8">
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--mut)" }}><span>⏱</span><span>{course.duration} of content</span></div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--mut)" }}><span>📚</span><span>{course.lessons} lessons</span></div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--mut)" }}><span>♾️</span><span>Lifetime access</span></div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--mut)" }}><span>🎓</span><span>Certificate of completion</span></div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-bold" style={{ color: "var(--txt)" }}>{course.price}</span>
                        <span className="text-xs" style={{ color: "var(--dim)" }}>one-time</span>
                      </div>
                      {course.available ? (
                        <a
                          href={course.purchaseUrl ?? "/contact"}
                          {...(course.purchaseUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="block w-full text-center py-3.5 rounded-xl text-sm font-medium hover:opacity-90"
                          style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
                        >Enroll now →</a>
                      ) : (
                        <button disabled className="block w-full text-center py-3.5 rounded-xl text-sm font-medium cursor-not-allowed" style={{ background: "var(--surf2)", color: "var(--dim)", border: "1px solid var(--bdr)" }}>Notify me when live</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl p-12 text-center" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--acc)" }}>Custom learning</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4" style={{ color: "var(--txt)" }}>Want 1-on-1 mentorship?</h2>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--mut)" }}>I offer private coaching sessions for designers and founders who want direct feedback on their work and career.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium hover:opacity-90" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>Book a session →</a>
        </div>
      </div>
    </div>
  );
}
