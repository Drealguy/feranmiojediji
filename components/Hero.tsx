"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/experience";

/* Short, stable "commit hash" from a string. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

const EASE = "ease-[cubic-bezier(0.65,0,0.35,1)]";

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
        className="relative overflow-hidden rounded-2xl border border-line bg-canvas"
      >
        {/* Intro: a simple, centred statement. Shrinks to the left half when the experience panel opens. */}
        <div
          className={`relative flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center px-5 py-20 text-center transition-[width] duration-700 sm:min-h-[calc(100svh-6.5rem)] sm:px-10 ${EASE} motion-reduce:transition-none lg:max-h-[56rem] lg:min-h-[40rem] ${
            open ? "w-full lg:w-1/2" : "w-full"
          }`}
        >
          <p
            data-hero-fade
            className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium"
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-live/70 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-live" />
            </span>
            Available for select projects
          </p>

          <h1
            data-hero-fade
            className={`mt-8 max-w-[17ch] font-medium leading-[1.04] tracking-[-0.045em] text-balance sm:mt-10 ${
              open ? "text-[2.25rem] sm:text-[3.5rem]" : "text-[2.25rem] sm:text-[4rem] lg:text-[5.25rem]"
            }`}
          >
            Hi, I&apos;m{" "}
            {/* Name and portrait stay together on the first line. */}
            <span className="whitespace-nowrap">
            Feranmi
            <span
              aria-hidden
              className="relative mx-[0.18em] inline-block h-[0.86em] w-[1.5em] -translate-y-[0.06em] overflow-hidden rounded-full bg-cream align-middle"
            >
              <Image
                src="/feranmi-cutout.png"
                alt=""
                fill
                preload
                sizes="10rem"
                className="object-cover object-[50%_18%] origin-bottom animate-[inline-peek_4.5s_ease-in-out_infinite] motion-reduce:animate-none"
              />
            </span>
            </span>
            <span className="block text-ink-soft">I turn business problems into useful software.</span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-soft text-balance sm:mt-8 sm:text-lg"
          >
            Product and software builder designing thoughtful products, business websites and AI-powered systems
            for ambitious businesses.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap justify-center gap-3 sm:mt-10">
            <a
              href="#contact"
              className="focus-ring inline-flex h-12 items-center justify-center rounded-lg bg-brand px-5 text-[0.96875rem] font-medium text-cream transition-colors hover:bg-brand/90"
            >
              Start a project
            </a>
            <button
              ref={trigger}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="experience-panel"
              className="focus-ring group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line px-5 text-[0.96875rem] font-medium transition-colors hover:border-ink/40"
            >
              Professional experience
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                →
              </span>
            </button>
          </div>
        </div>

        {/* Experience panel: slides in from the right as a commit history. */}
        <aside
          id="experience-panel"
          aria-labelledby="experience-heading"
          inert={!open}
          className={`absolute inset-y-0 right-0 z-30 flex w-full flex-col overflow-y-auto bg-canvas text-ink transition-transform duration-700 ${EASE} motion-reduce:transition-none lg:w-1/2 lg:border-l lg:border-line ${
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
