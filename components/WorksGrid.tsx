"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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

const FALLBACK: WorkProject[] = [
  { _id: "1", title: "Lumina — Brand Identity", category: "Branding", year: "2025", description: "Full brand identity system for a Lagos-based design studio.", accentColor: "#c8f53c", tags: ["Logo", "Identity", "Guidelines"] },
  { _id: "2", title: "Revive — SaaS Dashboard", category: "UI/UX Design", year: "2024", description: "End-to-end product design for a health-tech startup.", accentColor: "#a78bfa", tags: ["Product Design", "Figma", "Prototyping"] },
  { _id: "3", title: "Forma — Agency Website", category: "Website Design", year: "2024", description: "Award-nominated website for a creative agency.", accentColor: "#60a5fa", tags: ["Webflow", "Animation", "CMS"] },
  { _id: "4", title: "Cleo — E-commerce Store", category: "Website Design", year: "2024", description: "Fashion e-commerce website focused on conversion.", accentColor: "#f472b6", tags: ["E-commerce", "Webflow", "Mobile"] },
  { _id: "5", title: "AutoFlow — AI Workflow", category: "Social Media Design", year: "2025", description: "AI-powered content and lead generation system.", accentColor: "#34d399", tags: ["Make.com", "AI", "Automation"] },
  { _id: "6", title: "Meridian — Brand & Web", category: "Branding", year: "2023", description: "Brand identity and marketing site for a fintech company.", accentColor: "#fb923c", tags: ["Branding", "Web", "Fintech"] },
];

const ALL_CATEGORIES = ["All", "Website Design", "Branding", "UI/UX Design", "Social Media Design"];

export default function WorksGrid({ data }: { data?: WorkProject[] }) {
  const projects = data?.length ? data : FALLBACK;
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const displayCategories = data?.length ? categories : ALL_CATEGORIES;

  const filtered =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  // Card scroll animations — each card triggers individually as it enters viewport
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

  // Filter change — animate out then back in
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
          const accent = project.accentColor ?? "#c8f53c";
          return (
            <div
              key={project._id}
              className="work-card group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
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
                      style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${accent}18 0%, transparent 70%)` }}
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
                  <span className="px-5 py-2.5 rounded-full text-xs font-medium shadow-lg" style={{ background: accent, color: "#111" }}>
                    {project.liveUrl ? "View live →" : "View project →"}
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
            </div>
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
