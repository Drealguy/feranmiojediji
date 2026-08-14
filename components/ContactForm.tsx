"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock, Mail, MapPin } from "lucide-react";

export interface ContactPageContent {
  eyebrow: string;
  headline: string;
  intro: string;
  formLabel: string;
  services: string[];
  budgets: string[];
  timelines: string[];
  whatsappNumber: string;
  email: string;
  location: string;
  responseTime: string;
  helpTitle: string;
  helpText: string;
}

export const defaultContactContent: ContactPageContent = {
  eyebrow: "Contact",
  headline: "Bring the idea. I'll handle the rest.",
  intro: "From strategy and design to development and launch, your project is handled from start to finish.",
  formLabel: "Project enquiry",
  services: ["Logo & Brand Identity Design", "Business & Corporate Website", "Ecommerce Website", "Online Course Platform", "Brand Strategy & Content", "Not sure yet"],
  budgets: ["Under ₦250,000", "₦250,000 to ₦500,000", "₦500,000 to ₦1,000,000", "₦1,000,000+", "Not sure yet"],
  timelines: ["As soon as possible", "Within 2 to 4 weeks", "Within 1 to 2 months", "In 3 months or later", "Flexible"],
  whatsappNumber: "2349167802170",
  email: "theojediji@gmail.com",
  location: "Akure, Nigeria",
  responseTime: "Within 24 hours",
  helpTitle: "Not sure what you need?",
  helpText: "Select Not sure yet and describe the business problem. I'll help you choose the right direction.",
};
const steps = ["About you", "Your project", "Budget & timing", "Project brief"];

export default function ContactForm({ content = defaultContactContent }: { content?: ContactPageContent }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState({ name: "", email: "", budget: "", timeline: "", message: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const canContinue = step === 0 ? details.name.trim().length > 1 && /\S+@\S+\.\S+/.test(details.email) : step === 1 ? selected.length > 0 : step === 2 ? Boolean(details.budget && details.timeline) : details.message.trim().length > 9;

  function update(field: keyof typeof details, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) {
      if (canContinue) setStep((current) => current + 1);
      return;
    }
    if (!canContinue) return;
    const text = ["Hi Feranmi! I'd like to discuss a project with you.", "", `Name: ${details.name}`, `Email: ${details.email}`, `Service needed: ${selected.join(", ")}`, `Budget range: ${details.budget}`, `Preferred timeline: ${details.timeline}`, "", "Project details:", details.message].join("\n");
    window.open(`https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
      <div className="overflow-hidden rounded-3xl" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
        <div className="border-b px-5 py-5 sm:px-8" style={{ borderColor: "var(--bdr)" }}>
          <div className="mb-3 flex items-center justify-between gap-4 text-xs" style={{ color: "var(--mut)" }}><span>{content.formLabel}</span><span>{submitted ? "Complete" : `${step + 1} of ${steps.length}`}</span></div>
          <div className="h-1 overflow-hidden rounded-full" style={{ background: "var(--bg)" }}><div className="h-full rounded-full transition-[width] duration-300" style={{ background: "var(--txt)", width: submitted ? "100%" : `${((step + 1) / steps.length) * 100}%` }} /></div>
        </div>

        {submitted ? (
          <div className="flex min-h-[430px] flex-col items-center justify-center px-6 py-16 text-center">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--txt)", color: "var(--bg)" }}><Check size={20} /></span>
            <h2 className="text-2xl font-semibold" style={{ color: "var(--txt)" }}>Your enquiry is ready</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: "var(--mut)" }}>WhatsApp has opened with your project details. Send the prepared message and I&apos;ll reply within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex min-h-[430px] flex-col p-5 sm:p-8">
            <div className="flex-1">
              <p className="mb-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--dim)" }}>{steps[step]}</p>
              {step === 0 && <div><h2 className="mb-8 max-w-xl text-2xl font-semibold leading-tight sm:text-3xl" style={{ color: "var(--txt)" }}>First, what should I call you?</h2><div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" value={details.name} type="text" placeholder="Enter your name" onChange={(value) => update("name", value)} /><Field label="Email address" value={details.email} type="email" placeholder="you@company.com" onChange={(value) => update("email", value)} /></div></div>}
              {step === 1 && <div><h2 className="mb-3 max-w-xl text-2xl font-semibold leading-tight sm:text-3xl">What would you like us to work on?</h2><p className="mb-7 text-sm" style={{ color: "var(--mut)" }}>Choose one or more. It&apos;s fine if you&apos;re not certain yet.</p><div className="grid gap-2.5 sm:grid-cols-2">{content.services.map((service) => { const active = selected.includes(service); return <button key={service} type="button" onClick={() => setSelected((current) => active ? current.filter((item) => item !== service) : [...current, service])} className="flex min-h-14 items-center justify-between gap-4 px-5 py-3 text-left text-sm transition-colors" style={active ? { background: "var(--txt)", color: "var(--bg)", border: "1px solid var(--txt)" } : { color: "var(--txt)", border: "1px solid var(--bdr)" }}><span>{service}</span>{active && <Check size={16} className="shrink-0" />}</button>; })}</div></div>}
              {step === 2 && <div><h2 className="mb-8 max-w-xl text-2xl font-semibold leading-tight sm:text-3xl">What budget and timing are you working with?</h2><div className="grid min-w-0 gap-5 xl:grid-cols-2"><SelectField label="Estimated budget" value={details.budget} onChange={(value) => update("budget", value)} options={content.budgets} /><SelectField label="Preferred start" value={details.timeline} onChange={(value) => update("timeline", value)} options={content.timelines} /></div></div>}
              {step === 3 && <div><h2 className="mb-3 max-w-xl text-2xl font-semibold leading-tight sm:text-3xl">Tell me what you want this project to achieve.</h2><p className="mb-6 text-sm" style={{ color: "var(--mut)" }}>A short description of your business, the problem, and the result you want is enough.</p><textarea value={details.message} onChange={(event) => update("message", event.target.value)} rows={7} autoFocus placeholder="For example: We run a growing logistics company and need a stronger brand and website that helps corporate clients trust us..." className="w-full resize-none px-5 py-4 text-sm leading-relaxed outline-none" style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }} /></div>}
            </div>
            <div className="mt-8 flex items-center justify-between gap-3 border-t pt-5" style={{ borderColor: "var(--bdr)" }}>
              {step > 0 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="flex items-center gap-2 px-4 py-3 text-sm" style={{ color: "var(--mut)" }}><ArrowLeft size={15} />Back</button> : <span />}
              <button type="submit" disabled={!canContinue} className="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-35" style={{ background: "var(--txt)", color: "var(--bg)" }}>{step === steps.length - 1 ? "Send on WhatsApp" : "Continue"}<ArrowRight size={15} /></button>
            </div>
          </form>
        )}
      </div>

      <aside className="grid content-start gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {[
          { icon: Mail, label: "Email", value: content.email, link: `mailto:${content.email}` },
          { icon: MapPin, label: "Based in", value: content.location, link: null },
          { icon: Clock, label: "Response time", value: content.responseTime, link: null },
        ].map(({ icon: Icon, label, value, link }) => <div key={label} className="flex items-center gap-4 rounded-2xl px-5 py-4" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--bg)" }}><Icon size={15} style={{ color: "var(--txt)" }} /></span><div className="min-w-0"><p className="text-xs" style={{ color: "var(--dim)" }}>{label}</p>{link ? <a href={link} className="block truncate text-sm" style={{ color: "var(--txt)" }}>{value}</a> : <p className="text-sm" style={{ color: "var(--txt)" }}>{value}</p>}</div></div>)}
        <div className="rounded-2xl p-5 sm:col-span-3 lg:col-span-1" style={{ background: "var(--txt)", color: "var(--bg)" }}><p className="mb-2 text-sm font-semibold">{content.helpTitle}</p><p className="text-xs leading-relaxed opacity-70">{content.helpText}</p></div>
      </aside>
    </div>
  );
}

function Field({ label, value, type, placeholder, onChange }: { label: string; value: string; type: string; placeholder: string; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-xs" style={{ color: "var(--dim)" }}><span>{label}</span><input required value={value} type={type} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="px-5 py-4 text-sm outline-none" style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }} /></label>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative grid min-w-0 gap-2 text-xs">
      <span style={{ color: "var(--dim)" }}>{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm outline-none transition-colors"
        style={{ background: "var(--bg)", color: value ? "var(--txt)" : "var(--mut)", border: `1px solid ${open ? "var(--txt)" : "var(--bdr)"}` }}
      >
        <span className="min-w-0 truncate">{value || "Choose an option"}</span>
        <ChevronDown size={16} className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div role="listbox" aria-label={label} className="relative z-30 mt-1 grid max-h-64 min-w-0 gap-1 overflow-y-auto rounded-2xl p-1.5 shadow-2xl" style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}>
          {options.map((option) => {
            const active = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => { onChange(option); setOpen(false); }}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors"
                style={active ? { background: "var(--txt)", color: "var(--bg)" } : { color: "var(--txt)" }}
              >
                <span className="min-w-0 break-words">{option}</span>
                {active && <Check size={15} className="shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
