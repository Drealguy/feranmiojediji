import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar image",
      type: "image",
      options: { hotspot: true },
      description: "Optional. Initials will be used as fallback",
    }),
    defineField({
      name: "initials",
      title: "Initials (fallback)",
      type: "string",
      description: "Used when no avatar image is set, e.g. AO",
    }),
    defineField({
      name: "accentColor",
      title: "Accent colour",
      type: "string",
      description: "Hex code for the avatar background e.g. #f5f5f5",
      initialValue: "#f5f5f5",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "company" },
  },
});
