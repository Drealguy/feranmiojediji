import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Website Design", value: "Website Design" },
          { title: "Branding", value: "Branding" },
          { title: "UI/UX Design", value: "UI/UX Design" },
          { title: "AI Automation", value: "AI Automation" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      initialValue: new Date().getFullYear().toString(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Main project thumbnail",
    }),
    defineField({
      name: "accentColor",
      title: "Accent colour",
      type: "string",
      description: "Hex code for the card colour e.g. #c8f53c",
      initialValue: "#c8f53c",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Show on home page?",
      type: "boolean",
      description: "Toggle to feature this project in the home page preview",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower number = appears first",
      initialValue: 99,
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Newest", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
