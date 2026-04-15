import type { MetadataRoute } from "next";

const BASE = "https://feranmiojediji.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/works`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/pricing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE}/courses`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
  ];

  return staticPages.map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
