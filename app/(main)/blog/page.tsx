export const revalidate = 3600;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog — Feranmi Ojediji",
  description: "Design insights, business strategy, and creative tips from Feranmi Ojediji — web designer and creative director based in Akure, Nigeria.",
  openGraph: {
    title: "Blog — Feranmi Ojediji",
    description: "Design insights, business strategy, and creative tips.",
    url: "https://feranmiojediji.com/blog",
    type: "website",
  },
};

interface Post {
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Blog() {
  const posts = await sanityFetch<Post[]>(postsQuery).catch(() => [] as Post[]);

  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>Blog</span>
            <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] max-w-lg" style={{ color: "var(--txt)" }}>
              Thoughts on design<br />
              <span style={{ color: "var(--acc)" }}>&amp; business</span>
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mut)" }}>
              Real insights on web design, branding, AI tools, and building a creative business.
            </p>
          </div>
        </ScrollReveal>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <ScrollReveal>
            <div
              className="rounded-3xl p-16 text-center"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
                style={{ background: "rgba(200,245,60,0.10)", color: "var(--acc)" }}
              >
                ✦
              </div>
              <h2 className="text-xl font-medium mb-3" style={{ color: "var(--txt)" }}>
                Posts coming soon
              </h2>
              <p className="text-sm max-w-xs mx-auto" style={{ color: "var(--mut)" }}>
                I&apos;m writing up insights on design, business, and AI tools. Check back soon.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 block"
                style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
              >
                {/* Cover */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt ?? post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-3xl"
                      style={{ background: "var(--surf2)" }}
                    >
                      <span style={{ color: "var(--acc)", opacity: 0.4 }}>✦</span>
                    </div>
                  )}
                  {post.category && (
                    <span
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }}
                    >
                      {post.category}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-6" style={{ borderTop: "1px solid var(--bdr)" }}>
                  <p className="text-xs mb-2" style={{ color: "var(--dim)" }}>
                    {post.publishedAt ? formatDate(post.publishedAt) : ""}
                  </p>
                  <h2
                    className="text-base font-medium mb-2 leading-snug group-hover:text-[var(--acc)] transition-colors duration-200"
                    style={{ color: "var(--txt)" }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--mut)" }}>
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: "var(--acc)" }}>
                    Read more <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
