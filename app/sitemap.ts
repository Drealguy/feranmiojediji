import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { postSitemapQuery } from "@/sanity/lib/queries";

const BASE = "https://www.feranmiojediji.com";
interface SitemapPost {
  slug: string;
  publishedAt?: string;
  _updatedAt?: string;
}

const FALLBACK_POSTS: SitemapPost[] = [
  { slug: "why-your-website-is-losing-clients", publishedAt: "2025-03-10T00:00:00Z" },
  { slug: "brand-identity-checklist-nigerian-business", publishedAt: "2025-02-20T00:00:00Z" },
  { slug: "ai-tools-for-better-design", publishedAt: "2025-01-15T00:00:00Z" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/works`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/pricing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE}/courses`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
  ];

  const sanityPosts = await sanityFetch<SitemapPost[]>(postSitemapQuery).catch(() => []);
  const posts = new Map<string, SitemapPost>(FALLBACK_POSTS.map((post) => [post.slug, post]));
  sanityPosts.forEach((post) => posts.set(post.slug, post));

  const pages: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: page.url,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const articles: MetadataRoute.Sitemap = Array.from(posts.values()).map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post._updatedAt || post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...articles];
}
