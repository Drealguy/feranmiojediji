import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Pricing Packages",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "name", title: "Package name", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "category",
      title: "Service category",
      type: "string",
      validation: (R) => R.required(),
      options: { list: [
        { title: "Logo & Brand Identity Design", value: "branding" },
        { title: "Business & Corporate Websites", value: "website-design" },
        { title: "Ecommerce Websites", value: "ecommerce" },
        { title: "Online Course Platforms", value: "lms-platforms" },
        { title: "Brand + Website Bundles", value: "brand-website-bundles" },
      ] },
    }),
    defineField({ name: "price", title: "Displayed price", type: "string", description: "Enter the complete text, for example ₦250,000 or Custom pricing", validation: (R) => R.required() }),
    defineField({ name: "bestFor", title: "Best for", type: "text", rows: 3, validation: (R) => R.required() }),
    defineField({ name: "deliverables", title: "Complete deliverables", type: "array", of: [{ type: "string" }], validation: (R) => R.required().min(1) }),
    defineField({ name: "revisions", title: "Revisions", type: "string" }),
    defineField({ name: "support", title: "Post-launch support", type: "string" }),
    defineField({ name: "thirdPartyCosts", title: "Third-party costs", type: "text", rows: 3 }),
    defineField({ name: "notes", title: "Important notes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cta", title: "Primary button text", type: "string", validation: (R) => R.required(), initialValue: "Start Your Project" }),
    defineField({ name: "recommended", title: "Recommended package", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "category" } },
});
