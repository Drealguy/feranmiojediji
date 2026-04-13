"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

const FALLBACK: FaqItem[] = [
  { _id: "1", question: "What does your design process look like?", answer: "I start with a discovery call to understand your goals, audience, and vision. From there I move through research, moodboards, wireframes, high-fidelity design, and handoff — keeping you in the loop at every stage." },
  { _id: "2", question: "How long does a typical project take?", answer: "It depends on scope. A landing page takes 1–2 weeks. A full website or brand identity is usually 3–6 weeks. Larger projects are planned in sprints and scoped before we start." },
  { _id: "3", question: "Do you work with startups or only established businesses?", answer: "Both. I've worked with early-stage founders building their first brand and scaling companies refreshing an existing one. If you have a clear vision (or need help finding one), we can work together." },
  { _id: "4", question: "What do I need to prepare before we start working?", answer: "Ideally: a clear brief, examples of styles you like, your brand assets (if any), and access to any existing accounts. We'll walk through everything in the kickoff call." },
  { _id: "5", question: "Do you offer revisions?", answer: "Yes — all packages include revision rounds. I work iteratively so by the time we reach the final delivery, the design is already close to what you envisioned." },
  { _id: "6", question: "Can you build the website as well, or just design it?", answer: "I do both. I design and build in Webflow for most client sites. For custom dev needs, I collaborate with trusted development partners." },
];

function FAQItem({ item, isOpen, toggle }: { item: FaqItem; isOpen: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid var(--bdr)" }}>
      <button onClick={toggle} className="w-full flex items-start justify-between gap-4 py-6 text-left">
        <span className="text-sm font-medium transition-colors duration-200" style={{ color: isOpen ? "var(--txt)" : "var(--mut)" }}>
          {item.question}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
          style={isOpen ? { background: "var(--acc)", color: "var(--acc-fg)" } : { background: "var(--surf)", color: "var(--mut)", border: "1px solid var(--bdr)" }}
        >
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "600px" : "0", paddingBottom: isOpen ? "24px" : "0" }}
      >
        <p className="text-sm leading-relaxed pr-10" style={{ color: "var(--mut)" }}>{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ({ data }: { data?: FaqItem[] }) {
  const faqs = data?.length ? data : FALLBACK;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>FAQ</span>
              <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ color: "var(--txt)" }}>
              Questions you might have
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--mut)" }}>
              Can&apos;t find what you&apos;re looking for? Send me a message and I&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm px-5 py-3 rounded-xl transition-colors duration-200"
              style={{ color: "var(--txt)", border: "1px solid var(--bdr)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--mut)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--bdr)")}
            >
              Ask a question →
            </a>
          </div>

          <div style={{ borderTop: "1px solid var(--bdr)" }}>
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq._id}
                item={faq}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
