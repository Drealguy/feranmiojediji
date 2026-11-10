import type { MetadataRoute } from "next";
import { books } from "@/lib/books";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

/** Served at /sitemap.xml. New projects and books are picked up automatically from lib/. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ): MetadataRoute.Sitemap[number] => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });

  return [
    page("", 1, "weekly"),
    page("/projects", 0.9, "weekly"),
    page("/about", 0.8, "monthly"),
    page("/contact", 0.8, "yearly"),
    page("/maintenance", 0.7, "monthly"),
    page("/books", 0.6, "monthly"),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.7, "monthly")),
    // Placeholder books ("Book title") stay out of the sitemap until they're real.
    ...books.filter((b) => b.title !== "Book title").map((b) => page(`/books/${b.slug}`, 0.5, "monthly")),
  ];
}
