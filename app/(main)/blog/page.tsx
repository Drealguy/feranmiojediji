export const revalidate = 3600;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog — Feranmi Ojediji",
  description:
    "Design insights, business strategy, and creative tips from Feranmi Ojediji — web designer and creative director based in Akure, Nigeria.",
  openGraph: {
    title: "Blog — Feranmi Ojediji",
    description: "Design insights, business strategy, and creative tips.",
    url: "https://feranmiojediji.com/blog",
    type: "website",
  },
};

export interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  tags?: string[];
}

export const FALLBACK_POSTS: Post[] = [
  {
    _id: "1",
    title: "Why Your Website Is Losing You Clients (And How to Fix It)",
    slug: "why-your-website-is-losing-clients",
    publishedAt: "2025-03-10T00:00:00Z",
    excerpt:
      "Most small business websites make the same 5 mistakes. Here's what they are, why they kill conversions, and the exact fixes that turn visitors into paying clients.",
    coverImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    coverImageAlt: "Web design on a laptop screen",
    category: "Design",
    tags: ["Web Design", "Conversion", "Business"],
  },
  {
    _id: "2",
    title: "The Brand Identity Checklist Every Nigerian Business Needs",
    slug: "brand-identity-checklist-nigerian-business",
    publishedAt: "2025-02-20T00:00:00Z",
    excerpt:
      "Logos alone don't make a brand. This checklist covers everything — from colour psychology to typography — that makes your brand instantly recognisable and trustworthy.",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    coverImageAlt: "Brand identity design materials",
    category: "Branding",
    tags: ["Branding", "Identity", "Nigeria"],
  },
  {
    _id: "3",
    title: "How I Use AI Tools to Deliver Better Design Work, Faster",
    slug: "ai-tools-for-better-design",
    publishedAt: "2025-01-15T00:00:00Z",
    excerpt:
      "AI isn't replacing designers — it's separating the good ones from the great ones. Here are the exact tools and workflows I use to save hours every week without sacrificing quality.",
    coverImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    coverImageAlt: "AI interface on a screen",
    category: "AI & Automation",
    tags: ["AI", "Workflow", "Tools"],
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Blog() {
  const fetched = await sanityFetch<Post[]>(postsQuery).catch(() => [] as Post[]);
  const posts = fetched.length ? fetched : FALLBACK_POSTS;

  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <ScrollReveal className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>
              Blog
            </span>
            <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] max-w-lg"
              style={{ color: "var(--txt)" }}
            >
              Thoughts on design<br />
              <span style={{ color: "var(--acc)" }}>&amp; business</span>
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mut)" }}>
              Real insights on web design, branding, AI tools, and building a creative business.
            </p>
          </div>
        </ScrollReveal>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              {/* Cover image */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt ?? post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "var(--surf2)" }}
                  >
                    <span className="text-3xl" style={{ color: "var(--acc)", opacity: 0.3 }}>✦</span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                {/* Category + date row */}
                <div className="flex items-center gap-2 flex-wrap">
                  {post.category && (
                    <span
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium"
                      style={{ background: "rgba(200,245,60,0.12)", color: "var(--acc)" }}
                    >
                      {post.category}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="text-xs" style={{ color: "var(--dim)" }}>
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2
                  className="text-sm font-semibold leading-snug transition-colors duration-200 group-hover:text-[var(--acc)]"
                  style={{ color: "var(--txt)" }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                  <p
                    className="text-xs leading-relaxed line-clamp-3 flex-1"
                    style={{ color: "var(--mut)" }}
                  >
                    {post.excerpt}
                  </p>
                )}

                {/* Read more */}
                <div className="pt-2 mt-auto">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 group-hover:gap-2.5"
                    style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }}
                  >
                    Read more
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
