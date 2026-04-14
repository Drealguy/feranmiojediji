import Image from "next/image";

export interface TestimonialItem {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  initials?: string;
  accentColor?: string;
  avatar?: string;
}

const FALLBACK: TestimonialItem[] = [
  { _id: "1", quote: "Feranmi completely transformed how our brand looks and feels online. We saw a 40% increase in leads within the first month after the redesign.", name: "Adaeze Okonkwo", role: "CEO", company: "Zenta Digital", initials: "AO", accentColor: "#c8f53c" },
  { _id: "2", quote: "The attention to detail is unmatched. Every screen felt purposeful. Our users couldn't believe the app was the same product — in the best way.", name: "Marcus Reid", role: "Product Lead", company: "Stackly", initials: "MR", accentColor: "#a78bfa" },
  { _id: "3", quote: "Working with Feranmi felt like having an in-house designer who understood our business from day one. Fast, communicative, and brilliant.", name: "Sade Williams", role: "Founder", company: "Lumen Studio", initials: "SW", accentColor: "#60a5fa" },
];

export default function Testimonials({ data }: { data?: TestimonialItem[] }) {
  const testimonials = data?.length ? data : FALLBACK;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Testimonials</span>
          <div className="flex-1 h-px" style={{ background: "var(--bdr)" }} />
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-16 max-w-xl" style={{ color: "var(--txt)" }}>
          What clients say about working together
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => {
            const accent = t.accentColor ?? "#c8f53c";
            return (
              <div
                key={t._id}
                className="group relative rounded-2xl p-7 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--dim)]"
                style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
              >
                <span className="text-4xl font-serif leading-none opacity-40" style={{ color: accent }}>
                  &ldquo;
                </span>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--mut)" }}>{t.quote}</p>
                <div className="h-px" style={{ background: "var(--bdr)" }} />
                <div className="flex items-center gap-3">
                  {t.avatar ? (
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                      <Image src={t.avatar} alt={t.name} width={36} height={36} className="object-cover" loading="lazy" />
                    </div>
                  ) : (
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{ background: accent, color: "#0a0a0a" }}
                    >
                      {t.initials}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--txt)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--dim)" }}>
                      {t.role}{t.company ? `, ${t.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
