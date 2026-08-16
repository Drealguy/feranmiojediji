import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Pricing from "../page";
import { pricingCategories, pricingCategoryBySlug } from "@/lib/pricing-data";

interface PricingCategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(pricingCategoryBySlug).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PricingCategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const categoryId = pricingCategoryBySlug[slug];
  const category = pricingCategories.find((item) => item.id === categoryId);

  if (!category) return {};

  const title = `${category.label} Pricing | Feranmi Ojediji`;
  const url = `https://www.feranmiojediji.com/pricing/${slug}`;
  return {
    title,
    description: `View transparent pricing and packages for ${category.label.toLowerCase()}.`,
    alternates: { canonical: url },
    openGraph: { title, url },
  };
}

export default async function PricingCategoryPage({ params }: PricingCategoryPageProps) {
  const { category: slug } = await params;
  const activeCategory = pricingCategoryBySlug[slug];

  if (!activeCategory) notFound();

  return <Pricing activeCategory={activeCategory} />;
}
