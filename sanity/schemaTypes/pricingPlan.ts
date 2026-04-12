import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Pricing Plans",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Plan name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: 'Numeric part only, e.g. "1,500"',
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "USD",
    }),
    defineField({
      name: "featured",
      title: "Most popular / featured?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "accentColor",
      title: "Accent colour",
      type: "string",
      initialValue: "#c8f53c",
    }),
    defineField({
      name: "features",
      title: "Included features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "notIncluded",
      title: "Not included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});
