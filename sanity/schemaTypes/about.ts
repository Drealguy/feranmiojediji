import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

export const about = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Designer by craft,",
    }),
    defineField({
      name: "headlineAccent",
      title: "Headline accent word (italic)",
      type: "string",
      initialValue: "builder",
    }),
    defineField({
      name: "headlineSuffix",
      title: "Headline suffix",
      type: "string",
      initialValue: "by nature",
    }),
    defineField({
      name: "bio",
      title: "Bio paragraphs",
      type: "array",
      of: [{ type: "text" }],
      description: "Each item becomes a paragraph",
    }),
    defineField({
      name: "photo",
      title: "Your photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "timeline",
      title: "Timeline / Journey",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Year", type: "string" }),
            defineField({ name: "event", title: "What happened", type: "string" }),
          ],
          preview: { select: { title: "year", subtitle: "event" } },
        },
      ],
    }),
    defineField({
      name: "tools",
      title: "Toolkit",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Tools and software you use",
    }),
    defineField({
      name: "ctaText",
      title: "CTA headline",
      type: "string",
      initialValue: "Ready to build something great?",
    }),
    defineField({
      name: "ctaSubtext",
      title: "CTA subtext",
      type: "string",
      initialValue: "I'm selective about the projects I take on — so if we're a good fit, let's talk.",
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
