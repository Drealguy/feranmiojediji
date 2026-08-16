"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, BookOpen, Clock3, Layers3, Search, Sparkles } from "lucide-react";
import NotifyModal from "@/components/NotifyModal";

export interface Course {
  _id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  price: string;
  accentColor?: string;
  coverImage?: string;
  description: string;
  purchaseUrl?: string;
  available: boolean;
}

type CourseTab = "available" | "coming-soon";

function CourseCover({ course, index }: { course: Course; index: number }) {
  if (course.coverImage) {
    return <Image src={course.coverImage} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />;
  }

  const accent = course.accentColor || ["#7c3aed", "#2563eb", "#db2777", "#059669"][index % 4];
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: `linear-gradient(145deg, ${accent}, color-mix(in srgb, ${accent} 45%, #0b0b0b))` }}>
      <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border-[24px] border-white/15" />
      <div className="absolute -bottom-16 -left-8 h-44 w-44 rotate-12 rounded-[3rem] bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[72px] font-semibold tracking-[-0.12em] text-white/90">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <Sparkles className="absolute bottom-4 right-4 text-white/70" size={22} />
    </div>
  );
}

export default function CourseCatalog({ courses }: { courses: Course[] }) {
  const [activeTab, setActiveTab] = useState<CourseTab>("available");
  const availableCount = courses.filter((course) => course.available).length;
  const comingSoonCount = courses.length - availableCount;
  const visibleCourses = courses.filter((course) => activeTab === "available" ? course.available : !course.available);

  return (
    <div className="min-h-[calc(100vh-72px)] pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-9 flex flex-col gap-7 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em]" style={{ color: "var(--mut)" }}>
              <Layers3 size={14} /> Learning library
            </div>
            <h1 className="text-4xl font-semibold sm:text-5xl">Courses</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 sm:text-base" style={{ color: "var(--mut)" }}>
              Practical, self-paced lessons built from real design and development work.
            </p>
          </div>
          <Link href="/contact?subject=Course%20request" className="inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-medium transition-opacity hover:opacity-80" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
            <Search size={16} /> Request a course
          </Link>
        </div>

        <div className="mb-7 flex gap-7 border-b" style={{ borderColor: "var(--bdr)" }} role="tablist" aria-label="Course availability">
          {([
            { id: "available", label: "Available", count: availableCount },
            { id: "coming-soon", label: "Coming soon", count: comingSoonCount },
          ] as const).map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button key={tab.id} type="button" role="tab" aria-selected={selected} onClick={() => setActiveTab(tab.id)} className="relative pb-3 text-sm font-medium" style={{ color: selected ? "var(--txt)" : "var(--mut)" }}>
                {tab.label} <span style={{ color: "var(--dim)" }}>({tab.count})</span>
                {selected && <span className="absolute inset-x-0 bottom-[-1px] h-0.5 rounded-full" style={{ background: "var(--txt)" }} />}
              </button>
            );
          })}
        </div>

        {visibleCourses.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="tabpanel">
            {visibleCourses.map((course, index) => (
              <article key={course._id} className="group flex min-h-[430px] flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1" style={{ background: "var(--surf2)", border: "1px solid var(--bdr)", boxShadow: "var(--shadow)" }}>
                <div className="relative m-3 mb-0 aspect-[16/9] overflow-hidden rounded-xl">
                  <CourseCover course={course} index={index} />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">{course.category}</span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: "var(--mut)" }}>{course.level}</p>
                  <h2 className="text-lg font-semibold leading-snug" style={{ color: "var(--txt)" }}>{course.title}</h2>
                  <p className="mt-3 line-clamp-2 text-xs leading-5" style={{ color: "var(--mut)" }}>{course.description}</p>

                  <div className="mt-5 flex items-center gap-5 text-xs" style={{ color: "var(--mut)" }}>
                    <span className="flex items-center gap-1.5"><BookOpen size={14} /> {course.lessons} lessons</span>
                    <span className="flex items-center gap-1.5"><Clock3 size={14} /> {course.duration}</span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-[11px]" style={{ color: "var(--dim)" }}>
                      <span>Course content</span><span>{course.lessons} lessons</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surf)" }}>
                      <div className="h-full rounded-full" style={{ width: course.available ? "100%" : "35%", background: course.accentColor || "var(--txt)" }} />
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <p className="text-lg font-semibold" style={{ color: "var(--txt)" }}>{course.price}</p>
                    {course.available ? (
                      <a href={course.purchaseUrl ?? "/contact"} {...(course.purchaseUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
                        Enrol <ArrowUpRight size={14} />
                      </a>
                    ) : <NotifyModal courseTitle={course.title} />}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border px-6 text-center" style={{ borderColor: "var(--bdr)", background: "var(--surf2)" }} role="tabpanel">
            <Sparkles size={24} className="mb-4" style={{ color: "var(--mut)" }} />
            <h2 className="text-lg font-semibold">Nothing here yet</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--mut)" }}>New courses will appear here as soon as they are announced.</p>
          </div>
        )}
      </div>
    </div>
  );
}
