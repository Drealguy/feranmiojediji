export const revalidate = 60;

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { pricingQuery } from "@/sanity/lib/queries";
import PricingGrid, { type PricingPlan } from "@/components/PricingGrid";

export const metadata: Metadata = {
  title: "Pricing — Feranmi Ojediji",
  description: "Transparent pricing for web design, branding, and digital strategy.",
};

const FALLBACK: PricingPlan[] = [
  {
    _id: "1",
    name: "Starter",
    tagline: "Perfect for personal brands and simple landing pages.",
    price: "500",
    priceNGN: "800,000",
    accentColor: "#787878",
    featured: false,
    features: ["Single-page website / landing page", "Mobile-responsive design", "Webflow development", "2 revision rounds", "7-day delivery", "Basic SEO setup"],
    notIncluded: ["Brand identity", "AI automation", "Strategy session"],
  },
  {
    _id: "2",
    name: "Business",
    tagline: "For growing brands that need a full web presence.",
    price: "1,500",
    priceNGN: "2,400,000",
    accentColor: "#60a5fa",
    featured: false,
    features: ["Up to 5-page website", "Custom UI design in Figma", "Webflow development", "Basic brand refresh", "3 revision rounds", "14-day delivery", "SEO optimisation"],
    notIncluded: ["Full brand identity", "AI automation"],
  },
  {
    _id: "3",
    name: "Growth",
    tagline: "Our most popular — website, brand, and strategy in one.",
    price: "3,500",
    priceNGN: "5,600,000",
    accentColor: "#c8f53c",
    featured: true,
    features: ["Up to 8-page website", "Full UI/UX design in Figma", "Webflow + animations", "Brand identity (logo, colour, type)", "4 revision rounds", "3-week delivery", "Full SEO", "30-day post-launch support"],
    notIncluded: ["AI automation workflows"],
  },
  {
    _id: "4",
    name: "Brand Lite",
    tagline: "For businesses that need a solid brand identity fast.",
    price: "600",
    priceNGN: "960,000",
    accentColor: "#f472b6",
    featured: false,
    features: ["Logo design (3 concepts)", "Primary colour palette", "Font pairing", "2 revision rounds", "Brand style tile", "7-day delivery"],
    notIncluded: ["Full guidelines doc", "Brand stationery", "Website design"],
  },
  {
    _id: "5",
    name: "Full Brand",
    tagline: "A complete brand identity system delivered end-to-end.",
    price: "2,000",
    priceNGN: "3,200,000",
    accentColor: "#34d399",
    featured: false,
    features: ["Logo suite (primary + variations)", "Colour system", "Typography system", "Brand guidelines PDF", "Social media kit", "Business card design", "3 revision rounds", "14-day delivery"],
    notIncluded: ["Website design", "AI automation"],
  },
  {
    _id: "6",
    name: "Elite",
    tagline: "For ambitious brands that want everything, done properly.",
    price: "8,000",
    priceNGN: "12,800,000",
    accentColor: "#a78bfa",
    featured: false,
    features: ["Everything in Growth", "Full brand identity system", "AI automation setup", "Digital strategy session", "Content planning framework", "Unlimited revisions", "6-week delivery", "60-day post-launch support", "Priority communication"],
    notIncluded: [],
  },
];

const addons = [
  { name: "Logo design only", usd: "$500", ngn: "₦800,000" },
  { name: "Extra revision round", usd: "$200", ngn: "₦320,000" },
  { name: "Webflow CMS setup", usd: "$400", ngn: "₦640,000" },
  { name: "AI workflow (per flow)", usd: "$800", ngn: "₦1,280,000" },
  { name: "Brand guidelines doc", usd: "$350", ngn: "₦560,000" },
  { name: "Monthly retainer", usd: "From $1,200/mo", ngn: "From ₦1,920,000/mo" },
];

export default async function Pricing() {
  const raw = await sanityFetch<PricingPlan[]>(pricingQuery).catch(() => null);
  const plans: PricingPlan[] = raw?.length ? raw : FALLBACK;

  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Pricing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-5" style={{ color: "var(--txt)" }}>
            Simple, transparent pricing
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--mut)" }}>
            No hidden fees. No surprises. Every project scoped before we start so you always know exactly what you&apos;re getting.
          </p>
        </div>

        {/* Grid with toggle — client component */}
        <PricingGrid plans={plans} />

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
                className="flex flex-col gap-1 rounded-xl px-5 py-4"
                style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
              >
                <span className="text-sm" style={{ color: "var(--mut)" }}>{addon.name}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium" style={{ color: "var(--txt)" }}>{addon.ngn}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--surf2)", color: "var(--dim)", border: "1px solid var(--bdr)" }}>{addon.usd}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <div>
            <h3 className="text-base font-medium mb-1" style={{ color: "var(--txt)" }}>Not sure which plan fits?</h3>
            <p className="text-sm" style={{ color: "var(--mut)" }}>Book a free 20-minute discovery call and I&apos;ll help you figure out what you need.</p>
          </div>
          <a
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap hover:opacity-90"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Book a call →
          </a>
        </div>
      </div>
    </div>
  );
}
