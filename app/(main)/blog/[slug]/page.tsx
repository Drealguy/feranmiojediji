export const revalidate = 3600;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/client";
import { postQuery, postSlugsQuery } from "@/sanity/lib/queries";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  seoTitle?: string;
  seoDescription?: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(postSlugsQuery).catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post>(postQuery, { slug }).catch(() => null);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? "";

  return {
    title: `${title} — Feranmi Ojediji`,
    description,
    openGraph: {
      title,
      description,
      url: `https://feranmiojediji.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.coverImage ? { images: [{ url: post.coverImage, alt: post.coverImageAlt ?? title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
    alternates: { canonical: `https://feranmiojediji.com/blog/${slug}` },
  };
}

/* ─── Portable Text component overrides ─────────────────────────────────── */
const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-semibold mt-12 mb-5 leading-snug" style={{ color: "var(--txt)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-10 mb-4" style={{ color: "var(--txt)" }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold mt-8 mb-3" style={{ color: "var(--txt)" }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-[1.85] mb-6" style={{ color: "var(--mut)" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-8 pl-5 text-base italic leading-relaxed"
        style={{ borderLeft: "3px solid var(--acc)", color: "var(--mut)" }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: "var(--txt)", fontWeight: 600 }}>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code
        className="px-1.5 py-0.5 rounded text-sm font-mono"
        style={{ background: "var(--surf2)", color: "var(--acc)", border: "1px solid var(--bdr)" }}
      >
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="underline underline-offset-2 transition-colors duration-150 hover:opacity-80"
        style={{ color: "var(--acc)" }}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-5 flex flex-col gap-2 list-disc" style={{ color: "var(--mut)" }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-5 flex flex-col gap-2 list-decimal" style={{ color: "var(--mut)" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="my-10">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Image
              src={value.url}
              alt={value.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-xs" style={{ color: "var(--dim)" }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
};

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await sanityFetch<Post>(postQuery, { slug }).catch(() => null);
  if (!post) notFound();

  return (
    <div className="pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-150 hover:text-[var(--txt)]"
          style={{ color: "var(--mut)" }}
        >
          ← Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {post.category && (
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(200,245,60,0.12)", color: "var(--acc)", border: "1px solid rgba(200,245,60,0.2)" }}
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
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mb-6"
          style={{ color: "var(--txt)" }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--mut)" }}>
            {post.excerpt}
          </p>
        )}

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full rounded-2xl overflow-hidden mb-12" style={{ aspectRatio: "16/9" }}>
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Divider */}
        <div className="mb-10 h-px w-full" style={{ background: "var(--bdr)" }} />

        {/* Body */}
        {post.body && (
          <article>
            <PortableText value={post.body} components={ptComponents} />
          </article>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 flex flex-wrap gap-2" style={{ borderTop: "1px solid var(--bdr)" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs"
                style={{ color: "var(--dim)", border: "1px solid var(--bdr)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-16 rounded-3xl p-8 text-center"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--acc)" }}>
            Work with me
          </p>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--txt)" }}>
            Ready to bring your vision to life?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--mut)" }}>
            Let&apos;s design something that actually moves the needle.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Start a project →
          </Link>
        </div>

      </div>
    </div>
  );
}
