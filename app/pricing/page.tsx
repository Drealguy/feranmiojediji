import type { Metadata } from "next";
import { Check } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/client";
import { pricingQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Pricing — Feranmi Ojediji",
  description: "Transparent pricing for web design, branding, and digital strategy.",
};

interface PricingPlan {
  _id: string;
  name: string;
  price: string;
  currency: string;
  tagline: string;
  accentColor?: string;
  featured: boolean;
  features: string[];
  notIncluded: string[];
}

const FALLBACK: PricingPlan[] = [
  {
    _id: "1",
    name: "Starter",
    price: "1,500",
    currency: "USD",
    tagline: "For individuals and early-stage brands.",
    accentColor: "#787878",
    featured: false,
    features: [
      "Single-page website or landing page",
      "Mobile-responsive design",
      "Webflow development",
      "2 revision rounds",
      "7-day delivery",
      "Basic SEO setup",
    ],
    notIncluded: ["Brand identity", "AI automation", "Strategy session"],
  },
  {
    _id: "2",
    name: "Growth",
    price: "4,500",
    currency: "USD",
    tagline: "For brands ready to grow with intent.",
    accentColor: "#c8f53c",
    featured: true,
    features: [
      "Up to 8-page website",
      "Custom UI/UX design in Figma",
      "Webflow development with animations",
      "Brand identity (logo + colour + type)",
      "4 revision rounds",
      "3-week delivery",
      "Full SEO optimisation",
      "30-day post-launch support",
    ],
    notIncluded: ["AI automation workflows"],
  },
  {
    _id: "3",
    name: "Elite",
    price: "9,000",
    currency: "USD",
    tagline: "For ambitious brands that want everything.",
    accentColor: "#a78bfa",
    featured: false,
    features: [
      "Everything in Growth",
      "Full brand identity system",
      "AI automation setup",
      "Digital strategy session",
      "Content planning framework",
      "Unlimited revisions",
      "6-week delivery",
      "60-day post-launch support",
      "Priority communication",
    ],
    notIncluded: [],
  },
];

const addons = [
  { name: "Logo design only", price: "$500" },
  { name: "Extra revision round", price: "$200" },
  { name: "Webflow CMS setup", price: "$400" },
  { name: "AI workflow (per flow)", price: "$800" },
  { name: "Brand guidelines doc", price: "$350" },
  { name: "Monthly retainer", price: "From $1,200/mo" },
];

export default async function Pricing() {
  const raw = await sanityFetch<PricingPlan[]>(pricingQuery).catch(() => null);
  const plans: PricingPlan[] = raw?.length ? raw : FALLBACK;

  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Pricing</span>
          </div>
          <h1 className="text-5xl font-semibold tracking-tight leading-[1.1] mb-5" style={{ color: "var(--txt)" }}>
            Simple, transparent pricing
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--mut)" }}>
            No hidden fees. No surprises. Every project scoped before we start so you always know exactly what you&apos;re getting.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {plans.map((plan) => {
            const accent = plan.accentColor ?? "#787878";
            return (
              <div
                key={plan._id}
                className="relative rounded-2xl p-8 flex flex-col transition-all duration-300"
                style={{
                  background: plan.featured ? "var(--surf2)" : "var(--surf)",
                  border: `1px solid ${plan.featured ? accent : "var(--bdr)"}`,
                  boxShadow: plan.featured ? `0 0 40px -10px ${accent}25` : "none",
                }}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="px-4 py-1 rounded-full text-xs font-medium"
                      style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
                    >
                      Most popular
                    </span>
                  </div>
                )}

                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: accent }}>
                  {plan.name}
                </p>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--mut)" }}>
                  {plan.tagline}
                </p>

                <div className="mb-8 pb-8" style={{ borderBottom: "1px solid var(--bdr)" }}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm mr-0.5" style={{ color: "var(--dim)" }}>{plan.currency}</span>
                    <span className="text-4xl font-bold" style={{ color: "var(--txt)" }}>{plan.price}</span>
                  </div>
                  <span className="text-xs mt-1 block" style={{ color: "var(--dim)" }}>per project</span>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "var(--mut)" }}>
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent }} />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded?.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm line-through" style={{ color: "var(--dim)" }}>
                      <span className="w-3.5 h-3.5 mt-0.5 shrink-0 rounded-full border flex items-center justify-center" style={{ borderColor: "var(--bdr)" }}>
                        <span className="w-1 h-px" style={{ background: "var(--dim)" }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className="block w-full text-center py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={
                    plan.featured
                      ? { background: "var(--acc)", color: "var(--acc-fg)" }
                      : { background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }
                  }
                >
                  Get started
                </a>
              </div>
            );
          })}
        </div>

        {/* Add-ons */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Add-ons</span>
            <div className="flex-1 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between rounded-xl px-5 py-4"
                style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
              >
                <span className="text-sm" style={{ color: "var(--mut)" }}>{addon.name}</span>
                <span className="text-sm font-medium" style={{ color: "var(--txt)" }}>{addon.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA bar */}
        <div
          className="rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <div>
            <h3 className="text-base font-medium mb-1" style={{ color: "var(--txt)" }}>
              Not sure which plan fits?
            </h3>
            <p className="text-sm" style={{ color: "var(--mut)" }}>
              Book a free 20-minute discovery call and I&apos;ll help you figure out what you need.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Book a call →
          </a>
        </div>
      </div>
    </div>
  );
}
