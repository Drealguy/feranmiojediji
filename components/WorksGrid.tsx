"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fallbackProjects } from "@/lib/project-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface WorkProject {
  _id: string;
  title: string;
  slug?: string;
  category: string;
  year: string;
  description?: string;
  tags?: string[];
  accentColor?: string;
  coverImage?: string;
  liveUrl?: string;
}

const WORK_FILTERS = ["All", "Logo & Brand Identity Design", "Business & Corporate Websites", "Ecommerce Websites & Digital Platforms", "Brand Strategy & Content"];

export default function WorksGrid({ data, initialFilter = "All" }: { data?: WorkProject[]; initialFilter?: string }) {
  const projects: WorkProject[] = data?.length ? data : fallbackProjects;
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const displayCategories = WORK_FILTERS;

  const filtered = projects.filter((project) => {
    if (activeFilter === "All") return true;
    const searchable = `${project.title} ${project.category} ${project.tags?.join(" ") ?? ""}`.toLowerCase();
    if (activeFilter === "Logo & Brand Identity Design") return ["Branding", "Logo & Brand Identity Design"].includes(project.category);
    if (activeFilter === "Business & Corporate Websites") return ["Website Design", "UI/UX Design"].includes(project.category);
    if (activeFilter === "Ecommerce Websites & Digital Platforms") return /e-?commerce|lms|online course|platform|portal/.test(searchable);
    if (activeFilter === "Brand Strategy & Content") return /social media|strategy|photography|video|content/.test(searchable);
    return false;
  });

  // Each card triggers its scroll animation when it enters the viewport
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
        gsap.from(card, {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: i % 2 === 0 ? 0 : 0.12,
          clearProps: "clipPath,opacity,y",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: gridRef }
  );

  // Animate out and back in when the filter changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const cards = gridRef.current?.querySelectorAll(".work-card");
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.96, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: { amount: 0.35, from: "start" },
        clearProps: "opacity,scale,y",
      }
    );
  }, [activeFilter]);

  return (
    <div ref={gridRef}>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {displayCategories.map((cat) => {
          const active = cat === activeFilter;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                active
                  ? { background: "var(--acc)", color: "var(--acc-fg)" }
                  : { color: "var(--txt)", border: "1px solid var(--bdr)", background: "var(--surf)" }
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
        {filtered.map((project) => {
          const accent = "var(--txt)";
          return (
            <Link
              key={project._id}
              href={project.slug ? `/myworks/${project.slug}` : "#"}
              aria-disabled={!project.slug}
              className="work-card group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              {/* Visual */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 p-10 flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, color-mix(in srgb, var(--txt) 10%, transparent) 0%, transparent 70%)" }}
                    />
                    <div className="w-full flex flex-col gap-3 relative">
                      <div className="h-1.5 rounded-full w-full opacity-20" style={{ background: accent }} />
                      <div className="h-1.5 rounded-full w-4/5 opacity-20" style={{ background: accent }} />
                      <div className="h-1.5 rounded-full w-3/5 opacity-20" style={{ background: accent }} />
                      <div className="mt-4 flex gap-2">
                        <div className="w-12 h-8 rounded-lg opacity-25" style={{ background: accent }} />
                        <div className="w-20 h-8 rounded-lg opacity-10" style={{ background: accent }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Accent line at bottom of image */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: accent }}
                />

                {/* Hover badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-5 py-2.5 rounded-full text-xs font-medium shadow-lg" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
                    View case study →
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-7 pb-7 pt-5" style={{ borderTop: "1px solid var(--bdr)" }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs mb-1.5" style={{ color: "var(--dim)" }}>{project.category} · {project.year}</p>
                    <h3 className="text-base font-medium mb-3" style={{ color: "var(--txt)" }}>{project.title}</h3>
                    {project.description && (
                      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--mut)" }}>{project.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg text-xs" style={{ color: "var(--dim)", border: "1px solid var(--bdr)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-lg"
                    style={{ color: accent }}
                  >→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sm" style={{ color: "var(--mut)" }}>No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}
