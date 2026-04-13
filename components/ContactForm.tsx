"use client";

import { useState } from "react";
import { Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "theojediji@gmail.com",
    link: "mailto:theojediji@gmail.com",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Lagos, Nigeria",
    link: null,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    link: null,
  },
];

const services = [
  "Website Design",
  "Branding",
  "UI/UX Design",
  "Social Media Design",
  "Strategy & Growth",
  "Other",
];

export default function ContactForm() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
      {/* Form card */}
      <div
        className="rounded-3xl p-8 md:p-10"
        style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
      >
        {submitted ? (
          <div className="flex flex-col items-center justify-center h-full py-20 text-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{ background: "rgba(200,245,60,0.12)", color: "var(--acc)" }}
            >
              ✓
            </div>
            <h3 className="text-xl font-medium" style={{ color: "var(--txt)" }}>
              Message received!
            </h3>
            <p className="text-sm max-w-xs" style={{ color: "var(--mut)" }}>
              Thanks for reaching out. I&apos;ll review your project details and get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your full name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label
                    htmlFor={field.id}
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "var(--dim)" }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    required
                    type={field.type}
                    placeholder={field.placeholder}
                    className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors duration-200"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--bdr)",
                      color: "var(--txt)",
                    }}
                    onFocus={(e) => ((e.currentTarget).style.borderColor = "var(--mut)")}
                    onBlur={(e) => ((e.currentTarget).style.borderColor = "var(--bdr)")}
                  />
                </div>
              ))}
            </div>

            {/* Service selector */}
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--dim)" }}>
                What do you need?
              </span>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSelected(selected === s ? null : s)}
                    className="px-4 py-2 rounded-xl text-sm transition-all duration-200"
                    style={
                      selected === s
                        ? { background: "var(--acc)", color: "var(--acc-fg)" }
                        : { background: "var(--bg)", color: "var(--mut)", border: "1px solid var(--bdr)" }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="budget"
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--dim)" }}
              >
                Budget range
              </label>
              <select
                id="budget"
                className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--bdr)",
                  color: "var(--mut)",
                }}
                onFocus={(e) => ((e.currentTarget).style.borderColor = "var(--mut)")}
                onBlur={(e) => ((e.currentTarget).style.borderColor = "var(--bdr)")}
                onChange={(e) => {
                  if (e.currentTarget.value) {
                    (e.currentTarget as HTMLSelectElement).style.color = "var(--txt)";
                  }
                }}
              >
                <option value="">Select a budget range</option>
                <option>Under $1,500</option>
                <option>$1,500 – $4,500</option>
                <option>$4,500 – $9,000</option>
                <option>$9,000+</option>
                <option>Not sure yet</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--dim)" }}
              >
                Tell me about your project
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Describe your project, goals, and timeline..."
                className="rounded-xl px-4 py-3.5 text-sm outline-none transition-colors duration-200 resize-none"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--bdr)",
                  color: "var(--txt)",
                }}
                onFocus={(e) => ((e.currentTarget).style.borderColor = "var(--mut)")}
                onBlur={(e) => ((e.currentTarget).style.borderColor = "var(--bdr)")}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
            >
              Send message →
            </button>
          </form>
        )}
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-5">
        {/* Contact info cards */}
        {contactInfo.map(({ icon: Icon, label, value, link }) => (
          <div
            key={label}
            className="rounded-2xl px-6 py-5 flex items-center gap-4"
            style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(200,245,60,0.10)" }}
            >
              <Icon size={16} style={{ color: "var(--acc)" }} />
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "var(--dim)" }}>{label}</p>
              {link ? (
                <a
                  href={link}
                  className="text-sm transition-colors"
                  style={{ color: "var(--txt)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--acc)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--txt)")}
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm" style={{ color: "var(--txt)" }}>{value}</p>
              )}
            </div>
          </div>
        ))}

        {/* Availability */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--acc)" }} />
            <span className="text-sm font-medium" style={{ color: "var(--txt)" }}>
              Currently available
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--mut)" }}>
            Taking on new projects for Q2 2025. Limited spots — reach out early to secure your slot.
          </p>
        </div>

        {/* Socials */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--dim)" }}>
            Socials
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Instagram", href: "https://www.instagram.com/feranmi.ojediji/" },
              { label: "Twitter / X", href: "https://x.com/feranmiojediji" },
              { label: "Facebook", href: "https://www.facebook.com/feranmi.ojediji.3/" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors flex items-center justify-between group"
                style={{ color: "var(--mut)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--txt)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--mut)")}
              >
                {s.label}
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  style={{ color: "var(--acc)" }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
