"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface Props {
  courseTitle: string;
}

function Modal({ courseTitle, onClose }: { courseTitle: string; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi Feranmi! I'd like to be notified when "${courseTitle}" goes live.\n\nEmail: ${email}\nWhatsApp: ${whatsapp}`
    );
    // Replace the number below with your real WhatsApp number (digits only, with country code)
    window.open(`https://wa.me/2348000000000?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", zIndex: 9999 }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-8"
        style={{ background: "var(--surf)", border: "1px solid var(--bdr)", zIndex: 10000 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[rgba(128,128,128,0.1)]"
          style={{ color: "var(--mut)" }}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "rgba(200,245,60,0.12)", color: "var(--acc)" }}
            >
              ✓
            </div>
            <h3 className="text-lg font-semibold" style={{ color: "var(--txt)" }}>You&apos;re on the list!</h3>
            <p className="text-sm" style={{ color: "var(--mut)" }}>
              We&apos;ll reach out as soon as{" "}
              <strong style={{ color: "var(--txt)" }}>{courseTitle}</strong> is live.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 px-6 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--acc)" }}>Coming soon</p>
              <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--txt)" }}>Get notified first</h3>
              <p className="text-sm" style={{ color: "var(--mut)" }}>
                Be the first to know when{" "}
                <strong style={{ color: "var(--txt)" }}>{courseTitle}</strong> launches — and get early-bird pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest" style={{ color: "var(--dim)" }}>
                  Email address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                  style={{ background: "var(--bg)", border: "1px solid var(--bdr)", color: "var(--txt)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--mut)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--bdr)")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest" style={{ color: "var(--dim)" }}>
                  WhatsApp number
                </label>
                <input
                  required
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                  style={{ background: "var(--bg)", border: "1px solid var(--bdr)", color: "var(--txt)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--mut)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--bdr)")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity mt-2"
                style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
              >
                Notify me →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function NotifyModal({ courseTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block w-full text-center py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:border-[var(--mut)]"
        style={{ background: "var(--surf2)", color: "var(--txt)", border: "1px solid var(--bdr)" }}
      >
        Notify me when live
      </button>

      {mounted && open &&
        createPortal(
          <Modal courseTitle={courseTitle} onClose={() => setOpen(false)} />,
          document.body
        )
      }
    </>
  );
}
