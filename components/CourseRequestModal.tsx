"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Check, MessageCircle, Search, Send, X } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkjwqgop";
const WHATSAPP_URL = "https://wa.me/2349167802170?text=Hi%20Feranmi%2C%20I%20just%20submitted%20a%20course%20request%20and%20would%20like%20to%20connect%20personally.";

type Status = "idle" | "submitting" | "success" | "error";

export default function CourseRequestModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [phoneError, setPhoneError] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function closeModal() {
    setOpen(false);
    setStatus("idle");
    setPhoneError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const whatsapp = String(formData.get("whatsapp") || "").replace(/[\s()-]/g, "");

    if (!/^\+[1-9]\d{7,14}$/.test(whatsapp)) {
      setPhoneError("Enter your full number with country code, for example +234 800 000 0000.");
      return;
    }

    setPhoneError("");
    setStatus("submitting");
    formData.set("whatsapp", whatsapp);
    formData.set("_subject", "New course request");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-medium transition-opacity hover:opacity-80" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
        <Search size={16} /> Request a course
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
          <div role="dialog" aria-modal="true" aria-labelledby="course-request-title" className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-8" style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}>
            <button ref={closeButtonRef} type="button" onClick={closeModal} aria-label="Close course request" className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full" style={{ color: "var(--mut)", border: "1px solid var(--bdr)" }}>
              <X size={16} />
            </button>

            {status === "success" ? (
              <div className="py-5 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}><Check size={24} /></div>
                <h2 id="course-request-title" className="text-2xl font-semibold">Request received</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6" style={{ color: "var(--mut)" }}>Thank you. I’ll review your course idea and contact you using the WhatsApp number you provided.</p>
                <div className="mt-7 rounded-2xl p-5" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
                  <p className="text-sm font-medium">Would you like to connect with me personally now?</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold" style={{ background: "#25D366", color: "#071a0e" }}>
                    <MessageCircle size={17} /> Chat on WhatsApp
                  </a>
                  <button type="button" onClick={closeModal} className="mt-3 text-xs font-medium" style={{ color: "var(--mut)" }}>Not now</button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 pr-12">
                  <p className="mb-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--mut)" }}>Course request</p>
                  <h2 id="course-request-title" className="text-2xl font-semibold">What would you like to learn?</h2>
                  <p className="mt-3 text-sm leading-6" style={{ color: "var(--mut)" }}>Share your idea and I’ll use it to shape upcoming courses.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block text-sm font-medium">Name <span aria-hidden="true">*</span>
                    <input required name="name" autoComplete="name" placeholder="Your full name" className="mt-2 w-full rounded-xl px-4 py-3 text-sm" style={{ background: "var(--surf)", color: "var(--txt)", border: "1px solid var(--bdr)" }} />
                  </label>
                  <label className="block text-sm font-medium">WhatsApp number <span aria-hidden="true">*</span>
                    <input required name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+234 800 000 0000" aria-describedby="whatsapp-help" onChange={() => phoneError && setPhoneError("")} className="mt-2 w-full rounded-xl px-4 py-3 text-sm" style={{ background: "var(--surf)", color: "var(--txt)", border: `1px solid ${phoneError ? "#ef4444" : "var(--bdr)"}` }} />
                    <span id="whatsapp-help" className="mt-1.5 block text-xs" style={{ color: phoneError ? "#ef4444" : "var(--mut)" }}>{phoneError || "Country code is compulsory. Start the number with +."}</span>
                  </label>
                  <label className="block text-sm font-medium">What course would you like? <span aria-hidden="true">*</span>
                    <input required name="course" placeholder="e.g. Advanced Figma and design systems" className="mt-2 w-full rounded-xl px-4 py-3 text-sm" style={{ background: "var(--surf)", color: "var(--txt)", border: "1px solid var(--bdr)" }} />
                  </label>
                  <label className="block text-sm font-medium">Anything else you want me to know?
                    <textarea name="message" rows={4} placeholder="Tell me your experience level, goals, or topics you want covered." className="mt-2 w-full resize-none rounded-xl px-4 py-3 text-sm leading-6" style={{ background: "var(--surf)", color: "var(--txt)", border: "1px solid var(--bdr)" }} />
                  </label>

                  {status === "error" && <p role="alert" className="text-sm text-red-500">Something went wrong. Please try submitting again.</p>}
                  <button type="submit" disabled={status === "submitting"} className="flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold transition-opacity disabled:cursor-wait disabled:opacity-60" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
                    <Send size={16} /> {status === "submitting" ? "Sending request…" : "Submit request"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
