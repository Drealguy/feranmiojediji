import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "feranmi-portfolio",
  title: "Feranmi Portfolio — CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // ── Singletons ──────────────────────────────
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),

            S.listItem()
              .title("About Page")
              .id("about")
              .child(S.document().schemaType("about").documentId("about")),

            S.divider(),

            // ── Collections ──────────────────────────────
            S.documentTypeListItem("post").title("Blog Posts"),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("course").title("Courses"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("faqItem").title("FAQ"),
            S.documentTypeListItem("pricingPlan").title("Pricing Plans"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
