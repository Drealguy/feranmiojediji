import { defineType, defineField } from "sanity";
import { BookIcon } from "@sanity/icons";

export const course = defineType({
  name: "course",
  title: "Courses",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Course title",
      type: "string",
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
          { title: "Strategy & Growth", value: "Strategy & Growth" },
        ],
      },
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "Beginner" },
          { title: "Intermediate", value: "Intermediate" },
          { title: "Beginner – Intermediate", value: "Beginner – Intermediate" },
          { title: "All levels", value: "All levels" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "6 hrs"',
    }),
    defineField({
      name: "lessons",
      title: "Number of lessons",
      type: "number",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: 'e.g. "$149"',
    }),
    defineField({
      name: "topics",
      title: "Topics covered",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "accentColor",
      title: "Accent colour",
      type: "string",
      initialValue: "#c8f53c",
    }),
    defineField({
      name: "purchaseUrl",
      title: "Purchase / enrol link",
      type: "url",
      description: "External link where students can buy this course (e.g. Selar, Gumroad, Udemy). Leave blank to use the contact page.",
    }),
    defineField({
      name: "available",
      title: "Live / available to enrol?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
