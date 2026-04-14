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

const CARD_HEIGHT = 200; // approximate card height px
const STACK_OFFSET = 10; // px each buried card peeks out below
const SCROLL_PER_CARD = 320; // scroll distance to reveal each card

export default function Services({ data }: { data?: ServiceItem[] }) {
  const services = data?.length ? data : FALLBACK;
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      if (!cards.length || !stackRef.current) return;

      const totalScroll = (cards.length - 1) * SCROLL_PER_CARD;

      // Pin the whole stack while we reveal cards
      ScrollTrigger.create({
        trigger: stackRef.current,
        start: "top 15%",
        end: `+=${totalScroll}`,
        pin: true,
        pinSpacing: true,
      });

      // Reveal each card sliding up from below — NO opacity change on buried cards
      cards.forEach((card, i) => {
        if (i === 0) return;

        gsap.fromTo(
          card,
          { yPercent: 105 },
          {
            yPercent: 0,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: stackRef.current,
              start: `top+=${(i - 1) * SCROLL_PER_CARD} 15%`,
              end: `top+=${i * SCROLL_PER_CARD - 80} 15%`,
              scrub: 0.8,
            },
          }
        );
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

        {/*
          Stack container — tall enough for the card + peek offsets.
          Cards are all absolute on top of each other.
          Cards 2-5 start below (yPercent: 105) and slide up via GSAP.
        */}
        <div
          ref={stackRef}
          className="relative overflow-hidden"
          style={{
            height: `${CARD_HEIGHT + (services.length - 1) * STACK_OFFSET}px`,
          }}
        >
          {services.map((service, i) => {
            // Each card in its final resting position is offset slightly upward
            // so buried cards peek out below the top card
            const finalBottom = (services.length - 1 - i) * STACK_OFFSET;

            return (
              <div
                key={service._id}
                className="service-card absolute left-0 right-0 group"
                style={{
                  bottom: finalBottom,
                  top: 0,
                  zIndex: i + 1,
                }}
              >
                <div
                  className="h-full rounded-2xl px-6 sm:px-10 py-8"
                  style={{
                    background: "var(--surf)",
                    border: "1px solid var(--bdr)",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.1)",
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
                        className="text-lg opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                        style={{ color: "var(--acc)" }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
