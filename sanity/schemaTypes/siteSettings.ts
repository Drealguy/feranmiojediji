import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "siteName", title: "Site / Your Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "WhatsApp / Phone", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "available",
      title: "Currently available for work?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "availabilityText",
      title: "Availability note",
      type: "string",
      description: "e.g. Taking on new projects for Q2 2025",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "twitter", type: "url", title: "Twitter / X" }),
        defineField({ name: "linkedin", type: "url", title: "LinkedIn" }),
        defineField({ name: "dribbble", type: "url", title: "Dribbble" }),
        defineField({ name: "instagram", type: "url", title: "Instagram" }),
      ],
    }),
  ],
  preview: { select: { title: "siteName", subtitle: "email" } },
});
