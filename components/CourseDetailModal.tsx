"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, BookOpen, Check, Clock3, Send, Star, X } from "lucide-react";
import type { Course } from "@/components/CourseCatalog";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkjwqgop";

export default function CourseDetailModal({ course, onClose }: { course: Course; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  async function submitTestimonial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("course", course.title);
    data.set("_subject", `New testimonial for ${course.title}`);
    setStatus("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="course-detail-title" className="relative flex h-[100dvh] w-full max-w-3xl flex-col overflow-hidden sm:h-auto sm:max-h-[92dvh] sm:rounded-3xl" style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close course details" className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md sm:right-5 sm:top-5"><X size={18} /></button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">

        <div className="px-5 pb-6 pt-20 sm:p-8">
          <div className="mb-3 flex max-w-[calc(100%-3rem)] flex-wrap items-center gap-2 text-xs sm:max-w-none" style={{ color: "var(--mut)" }}>
            <span className="rounded-full px-3 py-1" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>{course.category}</span>
            <span>{course.level}</span>
          </div>
          <h2 id="course-detail-title" className="max-w-2xl text-2xl font-semibold sm:text-3xl">{course.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7" style={{ color: "var(--mut)" }}>{course.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl p-4" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}><BookOpen size={16} className="mb-3" /><p className="text-sm font-semibold">{course.lessons}</p><p className="text-xs" style={{ color: "var(--mut)" }}>Lessons</p></div>
            <div className="rounded-2xl p-4" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}><Clock3 size={16} className="mb-3" /><p className="text-sm font-semibold">{course.duration}</p><p className="text-xs" style={{ color: "var(--mut)" }}>Duration</p></div>
            <div className="rounded-2xl p-4" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}><Star size={16} className="mb-3" /><p className="text-sm font-semibold">{course.price}</p><p className="text-xs" style={{ color: "var(--mut)" }}>One-time</p></div>
          </div>

          {course.available && <a href={course.purchaseUrl ?? "/contact"} {...(course.purchaseUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-6 flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>Enrol in this course <ArrowUpRight size={16} /></a>}
        </div>

        <section className="border-t px-5 py-6 sm:p-8" style={{ borderColor: "var(--bdr)" }}>
          <div className="mb-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-xs uppercase tracking-[0.15em]" style={{ color: "var(--mut)" }}>Student stories</p><h3 className="mt-1 text-xl font-semibold">Testimonials</h3></div>
            <button type="button" onClick={() => { setShowTestimonialForm((shown) => !shown); setStatus("idle"); }} className="w-full px-4 py-2.5 text-xs font-semibold sm:w-auto" style={{ border: "1px solid var(--bdr)", color: "var(--txt)" }}>Share yours</button>
          </div>

          {course.testimonials?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {course.testimonials.map((testimonial, index) => (
                <blockquote key={`${testimonial.name}-${index}`} className="rounded-2xl p-5" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
                  <div className="mb-3 flex gap-0.5" aria-label={`${testimonial.rating || 5} out of 5 stars`}>{Array.from({ length: testimonial.rating || 5 }, (_, star) => <Star key={star} size={13} fill="currentColor" />)}</div>
                  <p className="text-sm leading-6">“{testimonial.quote}”</p>
                  <footer className="mt-4 text-xs" style={{ color: "var(--mut)" }}><strong style={{ color: "var(--txt)" }}>{testimonial.name}</strong>{testimonial.role ? ` · ${testimonial.role}` : ""}</footer>
                </blockquote>
              ))}
            </div>
          ) : <p className="rounded-2xl p-5 text-sm" style={{ background: "var(--surf)", color: "var(--mut)", border: "1px solid var(--bdr)" }}>No published testimonials yet. Be the first to share your experience.</p>}

          {showTestimonialForm && (
            <div className="mt-5 rounded-2xl p-5 sm:p-6" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
              {status === "success" ? (
                <div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}><Check size={15} /></span><div><h4 className="text-sm font-semibold">Thank you for sharing</h4><p className="mt-1 text-xs leading-5" style={{ color: "var(--mut)" }}>Your testimonial was submitted for review. It can be published here after approval.</p></div></div>
              ) : (
                <form onSubmit={submitTestimonial} className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium">Name *<input required name="name" autoComplete="name" className="mt-2 w-full rounded-xl px-4 py-3 text-sm" style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }} /></label>
                  <label className="text-sm font-medium">Role or company<input name="role" className="mt-2 w-full rounded-xl px-4 py-3 text-sm" style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }} /></label>
                  <label className="text-sm font-medium">Rating *<select required name="rating" defaultValue="5" className="mt-2 w-full rounded-xl px-4 py-3 text-sm" style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }}><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Poor</option></select></label>
                  <label className="text-sm font-medium">Email *<input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl px-4 py-3 text-sm" style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }} /></label>
                  <label className="text-sm font-medium sm:col-span-2">Your testimonial *<textarea required name="testimonial" rows={4} className="mt-2 w-full resize-none rounded-xl px-4 py-3 text-sm leading-6" style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }} /></label>
                  {status === "error" && <p role="alert" className="text-sm text-red-500 sm:col-span-2">Couldn’t submit your testimonial. Please try again.</p>}
                  <button type="submit" disabled={status === "submitting"} className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold disabled:opacity-60 sm:col-span-2" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}><Send size={15} />{status === "submitting" ? "Submitting…" : "Submit testimonial"}</button>
                </form>
              )}
            </div>
          )}
        </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
