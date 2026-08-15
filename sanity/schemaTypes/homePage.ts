import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "roleLabel",
      title: "Role label",
      type: "string",
      description: 'Short role shown beside your name, for example "Designer & Developer"',
      initialValue: "Designer & Developer",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      initialValue: "I design brands and websites that help businesses look better and sell better.",
    }),
    defineField({
      name: "introText",
      title: "Introduction paragraph",
      type: "text",
      rows: 3,
      initialValue:
        "I help businesses turn ideas into clear brands and high-performing digital experiences, from identity and websites to ecommerce and custom platforms.",
    }),
    defineField({ name: "availabilityText", title: "Availability text", type: "string", initialValue: "Available for branding, website & digital product projects." }),
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
      name: "heroVideo",
      title: "Hero video upload",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload the landscape video shown beneath the hero introduction.",
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
      name: "videoThumbnail",
      title: "Video thumbnail image",
      type: "image",
      options: { hotspot: true },
      description: "Preview image shown before the video plays. Upload a screenshot or custom thumbnail.",
    }),
    defineField({
      name: "videoLabel",
      title: "Video section label",
      type: "string",
      initialValue: "Watch the process, 4 min",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
