import { defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export const pricingPage = defineType({
  name: "pricingPage",
  title: "Pricing Page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Pricing" }),
    defineField({ name: "headline", title: "Headline", type: "string", initialValue: "Simple, transparent pricing" }),
    defineField({ name: "intro", title: "Intro text", type: "text", rows: 3 }),
    defineField({ name: "brandingLabel", title: "Logo and brand identity category label", type: "string", initialValue: "Logo & Brand Identity Design" }),
    defineField({ name: "websiteLabel", title: "Business website category label", type: "string", initialValue: "Business & Corporate Websites" }),
    defineField({ name: "ecommerceLabel", title: "Ecommerce category label", type: "string", initialValue: "Ecommerce Websites" }),
    defineField({ name: "coursePlatformLabel", title: "Course platform category label", type: "string", initialValue: "Online Course Platforms" }),
    defineField({ name: "bundleLabel", title: "Bundle category label", type: "string", initialValue: "Brand + Website Bundles" }),
    defineField({ name: "brandingAddons", title: "Branding add-ons", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "ctaTitle", title: "Bottom CTA title", type: "string", initialValue: "Not sure which plan fits?" }),
    defineField({ name: "ctaText", title: "Bottom CTA text", type: "text", rows: 2 }),
    defineField({ name: "ctaButton", title: "Bottom CTA button", type: "string", initialValue: "Book a call" }),
  ],
  preview: { prepare: () => ({ title: "Pricing Page" }) },
});
