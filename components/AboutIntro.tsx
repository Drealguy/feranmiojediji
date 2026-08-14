"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";

export default function AboutIntro({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const first = paragraphs[0];
  const rest = paragraphs.slice(1);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div>
      {first && <p className="text-base leading-relaxed" style={{ color: "var(--mut)" }}>{first}</p>}
      {rest.length > 0 && (
        <button type="button" onClick={() => setOpen(true)} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium" style={{ color: "var(--txt)", border: "1px solid var(--bdr)" }}>
          Read my story
          <ArrowRight size={15} />
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="about-story-title" className="relative flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:max-h-[88dvh] sm:rounded-3xl" style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}>
            <div className="flex shrink-0 items-start justify-between gap-6 border-b px-5 py-5 sm:px-8 sm:py-7" style={{ borderColor: "var(--bdr)" }}>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--dim)" }}>My story</p>
                <h2 id="about-story-title" className="text-2xl font-semibold leading-tight sm:text-3xl">How I got here</h2>
              </div>
              <button ref={closeButtonRef} type="button" aria-label="Close my story" onClick={() => setOpen(false)} className="flex h-10 w-10 shrink-0 items-center justify-center" style={{ color: "var(--txt)", border: "1px solid var(--bdr)" }}><X size={18} /></button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-8 sm:py-9">
              <div className="mx-auto max-w-2xl space-y-5">
                {paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`} className={`${index === 0 ? "text-lg font-medium sm:text-xl" : "text-base"} leading-relaxed`} style={{ color: index === 0 ? "var(--txt)" : "var(--mut)" }}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
