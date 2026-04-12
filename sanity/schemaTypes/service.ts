import { defineType, defineField } from "sanity";
import { StarIcon } from "@sanity/icons";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "number",
      title: "Number label",
      type: "string",
      description: 'e.g. "01"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      title: "Service title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
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
    select: { title: "title", subtitle: "number" },
  },
});
