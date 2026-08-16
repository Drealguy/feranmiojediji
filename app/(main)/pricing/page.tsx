import type { Metadata } from "next";
import PricingGrid from "@/components/PricingGrid";
import { brandingAddons, pricingCategories, pricingPackages, type PricingCategory, type PricingCategoryId, type PricingPackage } from "@/lib/pricing-data";
import { sanityFetch } from "@/sanity/lib/client";
import { pricingPageQuery, pricingQuery } from "@/sanity/lib/queries";

interface PricingPageContent {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  brandingLabel?: string;
  websiteLabel?: string;
  ecommerceLabel?: string;
  coursePlatformLabel?: string;
  bundleLabel?: string;
  brandingAddons?: string[];
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
}

const categoryFields: Record<PricingCategoryId, keyof PricingPageContent> = {
  branding: "brandingLabel",
  "website-design": "websiteLabel",
  ecommerce: "ecommerceLabel",
  "lms-platforms": "coursePlatformLabel",
  "brand-website-bundles": "bundleLabel",
};

export const metadata: Metadata = {
  title: "Pricing | Feranmi Ojediji",
  description: "Transparent pricing for web design, branding, and digital strategy. Find the right plan for your project.",
  alternates: { canonical: "https://feranmiojediji.com/pricing" },
  openGraph: {
    title: "Pricing | Feranmi Ojediji",
    description: "Transparent pricing for web design, branding, and digital strategy.",
    url: "https://feranmiojediji.com/pricing",
    images: [{ url: "/feranmi.jpg", width: 1200, height: 630, alt: "Feranmi Ojediji" }],
  },
  twitter: { card: "summary_large_image", title: "Pricing | Feranmi Ojediji", images: ["/feranmi.jpg"] },
};

export default async function Pricing({ activeCategory = "branding" }: { activeCategory?: PricingCategoryId }) {
  let pageContent: PricingPageContent = {};
  let plans = pricingPackages;
  try {
    const [cmsPage, cmsPlans] = await Promise.all([
      sanityFetch<PricingPageContent | null>(pricingPageQuery),
      sanityFetch<(PricingPackage & { _id: string })[]>(pricingQuery),
    ]);
    if (cmsPage) pageContent = cmsPage;
    const validPlans = cmsPlans.filter((plan) => plan.category && plan.name && plan.price && plan.bestFor && plan.deliverables?.length && plan.cta);
    if (validPlans.length) plans = validPlans.map(({ _id, ...plan }) => ({ ...plan, id: _id }));
  } catch {}

  const categories: PricingCategory[] = pricingCategories.map((category) => ({
    ...category,
    label: (pageContent[categoryFields[category.id]] as string | undefined) || category.label,
  }));
  const addons = pageContent.brandingAddons?.length ? pageContent.brandingAddons : brandingAddons;

  return (
    <div className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>{pageContent.eyebrow || "Pricing"}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-5" style={{ color: "var(--txt)" }}>
            {pageContent.headline || "Simple, transparent pricing"}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--mut)" }}>
            {pageContent.intro || "No hidden fees. No surprises. Every project scoped before we start so you always know exactly what you're getting."}
          </p>
        </div>

        {/* Grid with toggle client component */}
        <PricingGrid categories={categories} packages={plans} addons={addons} activeCategory={activeCategory} />

        {/* CTA */}
        <div
          className="mx-auto mt-14 flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:mt-20 sm:p-8 md:flex-row md:items-center"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <div>
            <h3 className="text-base font-medium mb-1" style={{ color: "var(--txt)" }}>{pageContent.ctaTitle || "Not sure which plan fits?"}</h3>
            <p className="text-sm" style={{ color: "var(--mut)" }}>{pageContent.ctaText || "Book a free 20-minute discovery call and I'll help you figure out what you need."}</p>
          </div>
          <a
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap hover:opacity-90"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            {pageContent.ctaButton || "Book a call"} →
          </a>
        </div>
      </div>
    </div>
  );
}
