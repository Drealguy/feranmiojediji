import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "badgeText",
      title: "Badge text",
      type: "string",
      description: 'Small pill above the headline, e.g. "Available for work"',
      initialValue: "Available for work",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Main headline — the normal (non-italic) part",
      initialValue: "Web designer crafting",
    }),
    defineField({
      name: "headlineAccent",
      title: "Headline accent word",
      type: "string",
      description: "The italic word inside the headline",
      initialValue: "purposeful",
    }),
    defineField({
      name: "headlineSuffix",
      title: "Headline suffix",
      type: "string",
      description: "The text after the italic word",
      initialValue: "online presence",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / paragraph",
      type: "text",
      rows: 3,
      initialValue:
        "I help brands grow through strategic design — from websites to full brand identities. Clean, fast, and built to convert.",
    }),
    defineField({
      name: "primaryCtaText",
      title: "Primary button text",
      type: "string",
      initialValue: "See my work",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary button link",
      type: "string",
      initialValue: "/works",
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Secondary button text",
      type: "string",
      initialValue: "Book a call",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary button link",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image / photo",
      type: "image",
      options: { hotspot: true },
      description: "Your portrait or a hero visual",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      initialValue: [
        { value: "8+", label: "Years of experience" },
        { value: "120+", label: "Projects delivered" },
        { value: "35+", label: "Happy clients" },
        { value: "99%", label: "Client satisfaction" },
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube)",
      type: "url",
      description: "Paste your full YouTube URL, e.g. https://www.youtube.com/watch?v=XXXXXXX",
    }),
    defineField({
      name: "videoLabel",
      title: "Video section label",
      type: "string",
      initialValue: "Watch the process — 4 min",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
