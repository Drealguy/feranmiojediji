"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import ToolChips from "./ToolChips";

type TabId = "experience" | "ventures" | "gallery" | "stack";

interface AboutTabsProps {
  aboutHeading: string;
  timeline: { year: string; event: string }[];
  ventures: { name: string; description?: string; url?: string }[];
  gallery: { url: string }[];
  stackHeading: string;
  tools: string[];
}

const tabs: { id: TabId; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "ventures", label: "Projects & Brands" },
  { id: "gallery", label: "Gallery" },
  { id: "stack", label: "Stack" },
];

export default function AboutTabs({ aboutHeading, timeline, ventures, gallery, stackHeading, tools }: AboutTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("experience");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label;

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <section className="mb-16 border-y py-10 sm:mb-20 sm:py-14" style={{ borderColor: "var(--bdr)" }}>
      <div className="grid gap-8 md:grid-cols-[170px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
        <div ref={mobileMenuRef} className="relative md:hidden">
          <button type="button" onClick={() => setMobileMenuOpen((current) => !current)} aria-haspopup="listbox" aria-expanded={mobileMenuOpen} className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-3 text-left text-sm font-medium" style={{ background: "var(--surf)", color: "var(--txt)", border: "1px solid var(--bdr)" }}>
            <span>{activeLabel}</span>
            <ChevronDown size={16} className={`shrink-0 transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileMenuOpen && (
            <div role="listbox" aria-label="About page section" className="absolute left-0 right-0 top-full z-30 mt-2 grid gap-1 rounded-2xl p-1.5 shadow-2xl" style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}>
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return <button key={tab.id} type="button" role="option" aria-selected={active} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm" style={active ? { background: "var(--txt)", color: "var(--bg)" } : { color: "var(--txt)" }}><span>{tab.label}</span>{active && <Check size={15} />}</button>;
              })}
            </div>
          )}
        </div>

        <div role="tablist" aria-label="About page sections" className="hidden gap-2 md:flex md:flex-col">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`about-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className="flex shrink-0 items-center justify-between gap-4 px-5 py-3 text-left text-xs uppercase tracking-[0.14em] transition-colors md:w-full"
                style={active ? { background: "var(--txt)", color: "var(--bg)", border: "1px solid var(--txt)" } : { color: "var(--mut)", border: "1px solid var(--bdr)" }}
              >
                {tab.label}
                <span aria-hidden="true" className="text-sm">{active ? "●" : "○"}</span>
              </button>
            );
          })}
        </div>

        <div className="min-w-0">
          {activeTab === "experience" && (
            <div id="about-panel-experience" role="tabpanel">
              <h2 className="mb-8 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{aboutHeading}</h2>
              <div style={{ borderTop: "1px solid var(--bdr)" }}>
                {timeline.map((item) => (
                  <div key={`${item.year}-${item.event}`} className="grid grid-cols-[64px_1fr] gap-4 py-5 sm:grid-cols-[90px_1fr] sm:gap-6" style={{ borderBottom: "1px solid var(--bdr)" }}>
                    <span className="pt-0.5 text-xs" style={{ color: "var(--dim)" }}>{item.year}</span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--mut)" }}>{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ventures" && (
            <div id="about-panel-ventures" role="tabpanel">
              <h2 className="mb-8 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">Projects and brands I&apos;m building beyond client work.</h2>
              {ventures.length > 0 ? (
                <div style={{ borderTop: "1px solid var(--bdr)" }}>
                  {ventures.map((venture, index) => {
                    const content = <><span className="text-xs" style={{ color: "var(--dim)" }}>{String(index + 1).padStart(2, "0")}</span><span><strong className="block text-base font-medium" style={{ color: "var(--txt)" }}>{venture.name}</strong>{venture.description && <span className="mt-2 block text-sm leading-relaxed" style={{ color: "var(--mut)" }}>{venture.description}</span>}</span><span className="text-sm" aria-hidden="true">{venture.url ? "↗" : ""}</span></>;
                    return venture.url ? <a key={venture.name} href={venture.url} target="_blank" rel="noreferrer" className="grid grid-cols-[32px_1fr_20px] gap-4 py-5 transition-opacity hover:opacity-65" style={{ borderBottom: "1px solid var(--bdr)" }}>{content}</a> : <div key={venture.name} className="grid grid-cols-[32px_1fr_20px] gap-4 py-5" style={{ borderBottom: "1px solid var(--bdr)" }}>{content}</div>;
                  })}
                </div>
              ) : (
                <div className="rounded-3xl p-6 sm:p-8" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}><p className="text-sm leading-relaxed" style={{ color: "var(--mut)" }}>This section is ready for the projects and brands you own. Add them from the About Page document in Sanity.</p></div>
              )}
            </div>
          )}

          {activeTab === "gallery" && (
            <div id="about-panel-gallery" role="tabpanel" className="grid auto-rows-[220px] gap-3 sm:grid-cols-2 sm:auto-rows-[280px] lg:grid-cols-12">
              {gallery.slice(0, 5).map((image, index) => (
                <div key={`${image.url}-${index}`} className={`relative overflow-hidden rounded-3xl ${index === 0 ? "sm:col-span-2 lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}`} style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
                  <Image src={image.url} alt={`Feranmi Ojediji gallery photo ${index + 1}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 650px" className={`object-cover ${index === 1 ? "object-top" : index === 2 ? "object-center" : "object-[center_25%]"}`} />
                </div>
              ))}
            </div>
          )}

          {activeTab === "stack" && (
            <div id="about-panel-stack" role="tabpanel">
              <h2 className="mb-8 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{stackHeading}</h2>
              <ToolChips tools={tools} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
