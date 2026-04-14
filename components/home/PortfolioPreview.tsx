"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ProjectItem {
  _id: string;
  title: string;
  slug?: string;
  category: string;
  year: string;
  accentColor?: string;
  coverImage?: string;
}

const FALLBACK: ProjectItem[] = [
  { _id: "1", title: "Lumina — Brand Identity", category: "Branding", year: "2025", accentColor: "#c8f53c" },
  { _id: "2", title: "Revive — SaaS Dashboard", category: "UI/UX Design", year: "2024", accentColor: "#a78bfa" },
  { _id: "3", title: "Forma — Agency Website", category: "Website Design", year: "2024", accentColor: "#60a5fa" },
];

function ProjectCard({ project }: { project: ProjectItem }) {
  const accent = project.accentColor ?? "#c8f53c";
  return (
    <div
      className="portfolio-card group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.coverImage ? (
          <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        ) : (
          <div className="absolute inset-0 p-8 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${accent}12 0%, transparent 70%)` }}
            />
            <div className="w-full flex flex-col gap-3 relative">
              <div className="h-1.5 rounded-full w-full opacity-25" style={{ background: accent }} />
              <div className="h-1.5 rounded-full w-4/5 opacity-25" style={{ background: accent }} />
              <div className="h-1.5 rounded-full w-3/5 opacity-25" style={{ background: accent }} />
              <div className="mt-4 flex gap-2">
                <div className="w-10 h-8 rounded-lg opacity-30" style={{ background: accent }} />
                <div className="w-16 h-8 rounded-lg opacity-10" style={{ background: accent }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-6 pt-4" style={{ borderTop: "1px solid var(--bdr)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--dim)" }}>
              {project.category} · {project.year}
            </p>
            <h3 className="text-sm font-medium" style={{ color: "var(--txt)" }}>{project.title}</h3>
          </div>
          <span
            className="text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
            style={{ color: accent }}
          >→</span>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPreview({ data }: { data?: ProjectItem[] }) {
  const projects = data?.length ? data : FALLBACK;
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section heading reveal
      gsap.from(".portfolio-heading", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "opacity,y",
        scrollTrigger: {
          trigger: ".portfolio-heading",
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger in
      gsap.from(".portfolio-card", {
        opacity: 0,
        y: 50,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.12,
        clearProps: "opacity,y",
        scrollTrigger: {
          trigger: ".portfolio-card",
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="portfolio-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Selected work</span>
              <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: "var(--txt)" }}>
              Projects I&apos;m building at the moment
            </h2>
          </div>
          <Link
            href="/works"
            className="footer-link text-sm flex items-center gap-2 group shrink-0 transition-colors duration-200"
          >
            View all work
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
