"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/experience";
import { portraitOutline as OUTLINE } from "@/lib/portrait-outline";

/* Short, stable "commit hash" from a string. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

const EASE = "ease-[cubic-bezier(0.65,0,0.35,1)]";
const NAME_CLASS =
  "text-[33cqw] font-semibold lowercase leading-[0.82] tracking-[-0.065em] whitespace-nowrap sm:text-[18.4cqw]";

function Name() {
  return (
    <>
      <span className="block sm:inline">Feranmi</span> <span className="block sm:inline">Ojediji</span>
    </>
  );
}

export default function Hero() {
  const [open, setOpen] = useState(false);
  const panelHeading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!open) return;
    panelHeading.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="p-2 sm:p-3">
      <section
        aria-label="Introduction"
        className="relative min-h-[calc(100svh-5.25rem)] overflow-hidden rounded-2xl bg-brand text-cream sm:min-h-[calc(100svh-5.75rem)] lg:h-[calc(100svh-5.75rem)] lg:min-h-[36rem] lg:max-h-[56rem]"
      >
        <div aria-hidden className="bg-stage-grid absolute inset-0 opacity-70" />

        {/* Intro: shrinks to the left half when the experience panel opens. */}
        <div
          className={`@container relative isolate flex min-h-[calc(100svh-5.25rem)] flex-col justify-between p-5 sm:min-h-[calc(100svh-5.75rem)] lg:h-full lg:min-h-0 transition-[width] duration-700 sm:p-8 ${EASE} motion-reduce:transition-none ${
            open ? "w-full lg:w-1/2" : "w-full"
          }`}
        >
          {/* Top labels with the name right under them; the portrait fills the space below. */}
          <div>
          <div data-hero-fade className="flex items-start justify-between gap-4 text-sm font-medium">
            <p className="leading-snug">
              Product &amp; software builder
              <br />
              <span className="text-cream/60">for ambitious businesses</span>
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-live/70 motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-live" />
              </span>
              <span className="sm:hidden">Available</span>
              <span className={`hidden sm:inline ${open ? "lg:hidden" : ""}`}>Available for select projects</span>
            </p>
          </div>

          <h1 data-split-load className={`mt-8 select-none text-center sm:mt-6 ${NAME_CLASS}`}>
            <Name />
          </h1>
          </div>

          {/* Portrait with a sticker outline that draws itself around it on load.
              Narrow: sits in the flow between the name and the bottom row, standing on the divider.
              Wide: stands on the hero's bottom edge, sized by the smaller of height and width so it
              never crowds the bottom row. */}
          <div className="relative -mt-4 min-h-[24rem] flex-1 sm:min-h-[30rem] @[56rem]:pointer-events-none @[56rem]:absolute @[56rem]:inset-0 @[56rem]:m-0 @[56rem]:min-h-0">
          <div
            aria-hidden
            data-hero-fade
            className="absolute bottom-0 left-1/2 aspect-[853/950] h-[min(100%,105cqw)] -translate-x-1/2 @[56rem]:h-[min(82%,52cqw)]"
          >
            <Image
              src="/feranmi-cutout.png"
              alt=""
              fill
              preload
              sizes="(min-width: 896px) 40vw, 90vw"
              className="object-contain object-bottom"
            />
            {/* Faint scanlines, clipped to the cutout's shape. */}
            <div
              className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgb(0_0_0/0.16)_0_1px,transparent_1px_3px)]"
              style={{
                maskImage: "url(/feranmi-cutout.png)",
                WebkitMaskImage: "url(/feranmi-cutout.png)",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
            />
            <svg
              viewBox={`0 0 ${OUTLINE.imageWidth + OUTLINE.pad * 2} ${OUTLINE.imageHeight + OUTLINE.pad}`}
              className="absolute overflow-visible"
              style={{
                left: `${(-OUTLINE.pad / OUTLINE.imageWidth) * 100}%`,
                top: `${(-OUTLINE.pad / OUTLINE.imageHeight) * 100}%`,
                width: `${((OUTLINE.imageWidth + OUTLINE.pad * 2) / OUTLINE.imageWidth) * 100}%`,
                height: `${((OUTLINE.imageHeight + OUTLINE.pad) / OUTLINE.imageHeight) * 100}%`,
              }}
            >
              <path
                d={OUTLINE.path}
                pathLength={1}
                fill="none"
                stroke="currentColor"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="animate-[outline-draw_1.8s_cubic-bezier(0.65,0,0.35,1)_0.9s_both] text-cream [stroke-dasharray:1] motion-reduce:animate-none"
              />
            </svg>
          </div>
          </div>

          {/* Bottom row */}
          <div data-hero-fade className="relative z-10 grid items-end gap-6 border-t border-cream/20 pt-5 sm:pt-6 @[46rem]:grid-cols-[1fr_auto] @[56rem]:grid-cols-[1fr_auto_1fr]">
            <p className="max-w-[26ch] text-lg font-medium leading-snug tracking-[-0.02em] text-balance sm:text-xl">
              I turn business problems into useful software, thoughtful products and AI-powered systems.
            </p>

            {/* Keeps the middle column free for the portrait. */}
            <div aria-hidden className="hidden w-[46cqw] @[56rem]:block" />

            <div className="relative z-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap @[46rem]:justify-end">
              <a
                href="#contact"
                className="focus-ring inline-flex h-12 items-center justify-center rounded-lg bg-cream px-4 text-[0.96875rem] font-medium text-brand transition-colors hover:bg-cream/85 sm:px-5"
              >
                Start a project
              </a>
              <button
                ref={trigger}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="experience-panel"
                className="focus-ring group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-cream/30 px-4 text-[0.96875rem] font-medium transition-colors hover:border-cream/70 sm:px-5"
              >
                <span className="sm:hidden">Experience</span>
                <span className="hidden sm:inline">Professional experience</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Experience panel: slides in from the right as a commit history. */}
        <aside
          id="experience-panel"
          aria-labelledby="experience-heading"
          inert={!open}
          className={`absolute inset-y-0 right-0 z-30 flex w-full flex-col overflow-y-auto bg-canvas text-ink transition-transform duration-700 ${EASE} motion-reduce:transition-none lg:w-1/2 lg:rounded-l-2xl ${
            open ? "translate-x-0" : "translate-x-[101%]"
          }`}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
            <p className="font-mono text-xs text-ink-soft">
              <span aria-hidden>$ </span>git log --author=feranmi
            </p>
            <button
              type="button"
              onClick={close}
              className="focus-ring -mr-2 inline-flex h-11 items-center gap-1.5 px-2 text-sm font-medium"
            >
              <span aria-hidden>←</span> Back
            </button>
          </div>

          <div className="px-5 py-10 sm:px-8 sm:py-12">
            <h2
              id="experience-heading"
              ref={panelHeading}
              tabIndex={-1}
              className="text-[2rem] font-medium leading-none tracking-[-0.045em] outline-none sm:text-[2.5rem]"
            >
              Professional experience
            </h2>
            <p className="mt-3 text-[0.9375rem] text-ink-soft">Every role, committed to history.</p>

            <ol className="mt-10">
              {experience.map((e, i) => {
                const head = i === 0;
                const last = i === experience.length - 1;
                return (
                  <li
                    key={e.title}
                    style={{ transitionDelay: open ? `${300 + i * 90}ms` : "0ms" }}
                    className={`grid grid-cols-[1.5rem_1fr] gap-x-4 transition duration-500 motion-reduce:transition-none ${
                      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    {/* Graph rail */}
                    <div aria-hidden className="relative flex justify-center">
                      {!last && <span className="absolute top-3 bottom-0 w-px bg-line" />}
                      {i > 0 && <span className="absolute top-0 h-3 w-px bg-line" />}
                      <span
                        className={`relative mt-1.5 size-3 rounded-full border-2 ${
                          head ? "border-brand bg-brand" : "border-brand/40 bg-canvas"
                        }`}
                      />
                    </div>

                    <div className={last ? "pb-2" : "pb-9"}>
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-soft">
                        <span>{hash(e.title)}</span>
                        <span>{e.period}</span>
                        {e.tag && (
                          <span className="rounded border border-brand/25 bg-brand/[0.06] px-1.5 py-0.5 text-[0.6875rem] text-brand">
                            {e.tag}
                          </span>
                        )}
                      </p>
                      <h3 className="mt-2 text-lg font-medium leading-snug tracking-[-0.02em]">{e.title}</h3>
                      {e.detail && (
                        <p className="mt-1.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">{e.detail}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>
      </section>
    </div>
  );
}
