import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

export const about = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "introHeading", title: "Personal introduction heading", type: "string", initialValue: "Who really is Feranmi?" }),
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
      initialValue: [
        "I'm Feranmi Ojediji, a designer and developer with about six years of experience working across branding, websites, and digital products.",
        "I started with design because I loved the idea of being able to take something that only existed in someone's head and give it a visual form. At first, that meant learning how to make things look better: logos, graphics, layouts, and brand identities. But as I worked on more projects, I started paying more attention to the thinking behind the work: why a brand should look a certain way, how people interact with a website, what makes a product easy to understand, and how good design can actually support a business.",
        "That curiosity eventually pushed me into development. I didn't want to stop at designing an interface and handing it off. I wanted to understand how the product worked behind the screen and be able to take an idea from the first sketch all the way to something people could actually use.",
        "Over the years, I've worked on brand identities, campaign websites, ecommerce stores, learning platforms, real estate products, invoicing software, and other digital experiences. Working across different types of projects and industries has taught me to think beyond just the visuals. I think about the business, the user, the message, and the system behind what I'm building.",
        "More recently, AI has become another big part of how I work. I use it to explore ideas, speed up development, research, test different directions, and improve my workflow, but I still believe the most important part is knowing what you're trying to create and why.",
        "Today, I sit somewhere between design, development, and strategy. I like taking rough ideas, asking the right questions, finding a clear direction, and turning them into brands and digital products that actually make sense.",
        "And I'm still learning, experimenting, and building as I go.",
      ],
    }),
    defineField({
      name: "photo",
      title: "Your photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "timeline",
      title: "About details / Journey",
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
    defineField({ name: "aboutSectionHeading", title: "About section heading", type: "string", initialValue: "A designer focused on useful work and lasting business value." }),
    defineField({
      name: "ventures",
      title: "Projects and brands I own",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
          defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          defineField({ name: "url", title: "Website or project link", type: "url" }),
        ],
        preview: { select: { title: "name", subtitle: "description" } },
      }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload three or more personal and behind-the-scenes photos",
    }),
    defineField({
      name: "tools",
      title: "Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Tools and software you use",
    }),
    defineField({ name: "stackHeading", title: "Stack section heading", type: "string", initialValue: "The tools I use to move from idea to launch." }),
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
      initialValue: "I'm selective about the projects I take on, so if we're a good fit, let's talk.",
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
