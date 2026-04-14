"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ServiceItem {
  _id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const FALLBACK: ServiceItem[] = [
  { _id: "1", number: "01", title: "Website Design", description: "Clean, fast, and conversion-focused websites built to make an impression and grow your business. Every pixel intentional.", tags: ["Landing pages", "Web apps", "E-commerce"] },
  { _id: "2", number: "02", title: "Branding", description: "Visual identity systems that tell your story — logos, colour palettes, typography, and brand guidelines that last.", tags: ["Logo design", "Brand identity", "Style guides"] },
  { _id: "3", number: "03", title: "UI/UX Design", description: "User-centred interfaces that balance beauty with usability. From wireframes to pixel-perfect Figma files ready for dev.", tags: ["Product design", "Prototyping", "Research"] },
  { _id: "4", number: "04", title: "AI Automation", description: "Intelligent workflows that save you time. I integrate AI tools into your business processes so you can focus on what matters.", tags: ["Workflow automation", "AI integration", "Prompt design"] },
  { _id: "5", number: "05", title: "Strategy & Growth", description: "Digital strategy that aligns design with business goals. Audits, roadmaps, and growth frameworks tailored to your brand.", tags: ["Brand strategy", "Audit & consulting", "Growth plans"] },
];


export default function Services({ data }: { data?: ServiceItem[] }) {
  const services = data?.length ? data : FALLBACK;
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card-inner");

      cards.forEach((card, i) => {
        // Slide each card up from below as it enters viewport
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        // Scale + dim cards below as the next one slides over
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.97,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>What I do</span>
              <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-sm" style={{ color: "var(--txt)" }}>
              Services built around your goals
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mut)" }}>
            A focused set of disciplines that work together to grow your digital presence.
          </p>
        </div>

        {/* Stacking cards — negative margin creates visual overlap, z-index controls layering */}
        <div>
          {services.map((service, i) => (
            <div
              key={service._id}
              className="service-card-inner group"
              style={{
                position: "relative",
                zIndex: i + 1,
                marginTop: i === 0 ? 0 : "-16px",
                transformOrigin: "top center",
              }}
            >
              <div
                className="rounded-2xl px-6 sm:px-10 py-8 transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  background: "var(--surf)",
                  border: "1px solid var(--bdr)",
                  boxShadow: "0 -2px 0 0 var(--bdr), 0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 items-start">
                  <span className="text-xs font-mono pt-1" style={{ color: "var(--acc)" }}>
                    {service.number}
                  </span>

                  <div>
                    <h3 className="text-lg font-medium mb-2" style={{ color: "var(--txt)" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--mut)" }}>
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs"
                          style={{ color: "var(--dim)", border: "1px solid var(--bdr)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden md:flex items-center pt-1">
                    <span
                      className="text-lg transition-all duration-200 group-hover:translate-x-1"
                      style={{ color: "var(--dim)" }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
