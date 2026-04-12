import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Feranmi Ojediji",
  description: "Get in touch to start a project. Web design, branding, UI/UX and AI automation.",
};

export default function Contact() {
  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>
              Contact
            </span>
            <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1
              className="text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] max-w-lg"
              style={{ color: "var(--txt)" }}
            >
              Let&apos;s build something{" "}
              <span className="italic font-light" style={{ color: "var(--mut)" }}>great</span>{" "}
              together
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mut)" }}>
              Tell me about your project and I&apos;ll get back to you within 24 hours with a plan.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
