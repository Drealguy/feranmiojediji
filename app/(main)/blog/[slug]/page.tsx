export const revalidate = 3600;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/client";
import { postQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { FALLBACK_POSTS } from "../page";

/* ─── Types ─────────────────────────────────────────────────────────────── */
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

/* ─── Demo body content (Portable Text blocks) ───────────────────────────── */
function block(text: string, style = "normal"): object {
  return {
    _key: Math.random().toString(36).slice(2),
    _type: "block",
    style,
    children: [{ _key: "a", _type: "span", text, marks: [] }],
    markDefs: [],
  };
}
function bq(text: string): object {
  return {
    _key: Math.random().toString(36).slice(2),
    _type: "block",
    style: "blockquote",
    children: [{ _key: "a", _type: "span", text, marks: [] }],
    markDefs: [],
  };
}
function bullets(items: string[]): object {
  return {
    _key: Math.random().toString(36).slice(2),
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: items.map((t, i) => ({ _key: String(i), _type: "span", text: t, marks: [] })),
    markDefs: [],
  };
}
function img(url: string, alt: string, caption?: string): object {
  return { _key: Math.random().toString(36).slice(2), _type: "image", url, alt, caption };
}

const DEMO_BODY: Record<string, object[]> = {
  "why-your-website-is-losing-clients": [
    block(
      "Your website is either your best salesperson or your worst one. For most small businesses, it's the latter — quietly turning away potential clients every single day without anyone noticing."
    ),
    block(
      "After auditing dozens of websites for clients across Nigeria and beyond, I keep seeing the same five mistakes over and over. The good news: every single one is fixable."
    ),
    img(
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80",
      "Designer reviewing a website on a laptop",
      "A good website audit reveals the hidden leaks in your business."
    ),
    block("Mistake #1: No Clear Call to Action", "h2"),
    block(
      "Visitors shouldn't have to guess what to do next. If your homepage doesn't have a single, obvious CTA above the fold — 'Book a call', 'Get a quote', 'Start your project' — you're leaking money. Every. Single. Day."
    ),
    block(
      "The fix: pick one primary action you want visitors to take and make it impossible to miss. One CTA. One colour. Front and centre."
    ),
    block("Mistake #2: Slow Load Times", "h2"),
    block(
      "Google's data shows that 53% of mobile visitors abandon a page that takes more than 3 seconds to load. If your site loads in 7–10 seconds, you're not just losing clients — you're actively ranking lower on Google too."
    ),
    block(
      "The fix: compress your images (use WebP), remove unnecessary plugins, and use a fast host. Run your site through PageSpeed Insights and fix everything marked red."
    ),
    block("Mistake #3: No Social Proof", "h2"),
    block(
      "People buy from people they trust. If your website has no testimonials, no case studies, no client logos — you're asking strangers to take a leap of faith. Most won't."
    ),
    bq(
      '"The moment I added three client testimonials to my homepage, my inquiry rate doubled within two weeks." — A client I worked with last year.'
    ),
    block(
      "The fix: add real testimonials with real names and photos. Even two or three is enough to build credibility. If you don't have any yet, ask your last three clients today."
    ),
    block("Mistake #4: It Looks Amateur on Mobile", "h2"),
    block(
      "Over 70% of web traffic now comes from mobile devices. If your site looks broken, cramped, or hard to use on a phone, you're turning away the majority of your visitors before they even read your headline."
    ),
    block(
      "The fix: test your site on your own phone right now. Tap every button. Read every line of text. If anything feels off, it needs to be fixed."
    ),
    block("Mistake #5: No SEO Foundation", "h2"),
    block(
      "If your site isn't optimised for search, it's invisible to the clients actively searching for your services. No meta descriptions, no structured headings, no keyword strategy = no organic traffic."
    ),
    block(
      "The fix: every page needs a clear title tag, a meta description, and content that actually answers the questions your clients are typing into Google."
    ),
    block("What to Do Next", "h2"),
    block(
      "You don't need to fix everything at once. Start with the one mistake that resonates most — probably the CTA or the testimonials — and make that change this week. Then tackle the next one."
    ),
    block(
      "If you'd rather have a professional audit your site and give you a custom action plan, that's exactly what I do. Hit the button below and let's talk."
    ),
  ],

  "brand-identity-checklist-nigerian-business": [
    block(
      "Every week I see Nigerian businesses investing in logos and calling it branding. Then they wonder why their brand doesn't feel cohesive, why clients can't remember them, or why they attract the wrong customers."
    ),
    block(
      "A logo is one tiny piece of a brand. Here's the full checklist — the same one I walk every client through before we design a single thing."
    ),
    img(
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      "Brand identity design spread on a table",
      "Brand identity is a system, not just a logo."
    ),
    block("What Is Brand Identity (Really)?", "h2"),
    block(
      "Brand identity is the complete visual and verbal system that communicates who you are, what you stand for, and why clients should choose you. It includes your logo, yes — but also your colours, typography, tone of voice, photography style, and how every touchpoint feels to your audience."
    ),
    bq(
      '"A brand is what people say about you when you\'re not in the room." — Jeff Bezos. Your brand identity is what makes them say the right thing.'
    ),
    block("The Brand Identity Checklist", "h2"),
    block("1. Brand Strategy (The Foundation)", "h3"),
    block(
      "Before any design work begins, you need answers to these questions: Who is your ideal client? What problem do you solve for them? What makes you different from every other option? What words do you want people to use to describe you?"
    ),
    block("2. Logo System", "h3"),
    block(
      "A proper logo system isn't just one logo — it's a primary logo, a secondary logo (horizontal version), and an icon/mark for small applications. You need all three to show up consistently across every platform."
    ),
    block("3. Colour Palette", "h3"),
    block(
      "You need a primary colour, one or two secondary colours, and neutrals. Every colour must have a defined meaning and usage rule. Don't just pick colours you like — pick colours that speak to your audience and differentiate you from competitors."
    ),
    block("4. Typography System", "h3"),
    block(
      "Choose a heading font and a body font that work together. Define sizes and weights for headlines, subheadings, body copy, and captions. Typography is the silent communicator of your brand's personality."
    ),
    block("5. Brand Voice & Tone", "h3"),
    block(
      "How do you write captions? How do you respond to enquiries? Formal or conversational? Bold or gentle? Define this in writing so every piece of content — from your Instagram bio to your invoice — sounds like the same person."
    ),
    block("Nigeria-Specific Considerations", "h2"),
    block(
      "Nigerian audiences are sophisticated and increasingly brand-aware. A few things that matter more here than anywhere else:"
    ),
    block(
      "Colour carries cultural weight — red can signal danger, green signals freshness and growth. White is associated with purity in some contexts and mourning in others. Know your audience before you commit to a palette."
    ),
    block(
      "Trust signals are critical. Logos of associations, certifications, press mentions, and client names all carry weight in a market where scams are unfortunately common. Build trust into your visual identity from day one."
    ),
    block("Where to Start", "h2"),
    block(
      "If you're starting from scratch: do the brand strategy first. If you already have a brand: audit it against this checklist and identify the biggest gap. Fix that one thing first."
    ),
    block(
      "Need help building a brand identity system that actually converts? That's my specialty. Book a discovery call using the button below."
    ),
  ],

  "ai-tools-for-better-design": [
    block(
      "There's a lot of noise about AI replacing designers. Here's my honest take after 12+ months of integrating AI into my daily workflow: AI doesn't replace designers. But designers who use AI well are replacing designers who don't."
    ),
    block(
      "These are the exact tools and workflows I use — not a generic list, but the ones I actually open every day and the specific ways I use them."
    ),
    img(
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
      "AI interface glowing on a screen",
      "AI tools have changed how fast I can move from idea to execution."
    ),
    block("The Tools I Actually Use", "h2"),
    block("Claude & ChatGPT — For thinking, not just writing", "h3"),
    block(
      "I use Claude for strategy and long-form thinking — drafting proposals, structuring content strategy, writing website copy briefs. I use ChatGPT for quick generation tasks. The key insight: I never use AI to write final copy. I use it to think faster and structure better, then I write the final version myself."
    ),
    block("Midjourney — For moodboards and concept exploration", "h3"),
    block(
      "Before I open Figma, I spend 20 minutes in Midjourney generating visual directions. It's not about using the output directly — it's about exploring 40 directions in 20 minutes instead of 3 directions in 2 hours. The ideas are better and clients can react to visuals earlier."
    ),
    block("Make.com — For automating client workflows", "h3"),
    block(
      "This is the one most designers sleep on. I've automated: client onboarding emails, project update reminders, invoice follow-ups, and social media scheduling. That's roughly 5–6 hours of admin work per week, gone."
    ),
    img(
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
      "Workflow automation diagram on screen",
      "Automation handles the admin so I can focus on the work that matters."
    ),
    block("My AI Workflow: From Brief to Delivery", "h2"),
    block(
      "Here's how a typical project looks now compared to 18 months ago:"
    ),
    block("Old process: client brief → research (2 days) → moodboard (1 day) → concepts (3 days) → revisions (ongoing)", "h3"),
    block("New process: client brief → AI-assisted research + moodboard (3 hours) → concepts (1 day) → tighter revisions", "h3"),
    bq(
      '"The quality of the final work is higher. The timeline is shorter. The client gets more value. That\'s the only scorecard that matters."'
    ),
    block(
      "The time I save on research and exploration gets reinvested into craft — better typography choices, more refined layouts, stronger copy. The output is genuinely better."
    ),
    block("What AI Can't Do (Yet)", "h2"),
    block(
      "Understanding people. Every project I take on starts with a conversation about the client's customers, their fears, their aspirations, the specific cultural context they operate in. AI can assist, but it can't replace the human judgment that comes from listening carefully and asking the right questions."
    ),
    block(
      "Building relationships. The reason clients come back and refer others isn't the deliverables — it's the experience of working together. That's irreplaceable."
    ),
    block("The Bottom Line", "h2"),
    block(
      "Start with one tool. Pick the bottleneck in your current workflow — probably client emails or research — and find an AI tool that addresses exactly that. Use it for 30 days before adding anything else."
    ),
    block(
      "If you want help building AI-powered workflows specifically for your creative business, that's one of the services I offer. Let's talk about what we can automate for you."
    ),
  ],
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ─── Static params ──────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(postSlugsQuery).catch(() => []);
  const sanityParams = slugs.map((s) => ({ slug: s.slug }));
  const demoParams = FALLBACK_POSTS.map((p) => ({ slug: p.slug }));
  return [...sanityParams, ...demoParams];
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const post =
    (await sanityFetch<Post>(postQuery, { slug }).catch(() => null)) ??
    (FALLBACK_POSTS.find((p) => p.slug === slug) as Post | undefined) ??
    null;

  if (!post) return {};

  const title = ("seoTitle" in post ? post.seoTitle : undefined) ?? post.title;
  const description =
    ("seoDescription" in post ? post.seoDescription : undefined) ??
    post.excerpt ??
    "";

  return {
    title: `${title} — Feranmi Ojediji`,
    description,
    openGraph: {
      title,
      description,
      url: `https://feranmiojediji.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.coverImage
        ? { images: [{ url: post.coverImage, alt: post.coverImageAlt ?? title }] }
        : {}),
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

/* ─── Portable Text components ───────────────────────────────────────────── */
const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2
        className="text-2xl sm:text-3xl font-semibold mt-12 mb-5 leading-snug"
        style={{ color: "var(--txt)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-xl font-semibold mt-10 mb-4"
        style={{ color: "var(--txt)" }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className="text-base font-semibold mt-8 mb-3"
        style={{ color: "var(--txt)" }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p
        className="text-base leading-[1.85] mb-6"
        style={{ color: "var(--mut)" }}
      >
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
    strong: ({ children }) => (
      <strong style={{ color: "var(--txt)", fontWeight: 600 }}>{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code
        className="px-1.5 py-0.5 rounded text-sm font-mono"
        style={{
          background: "var(--surf2)",
          color: "var(--acc)",
          border: "1px solid var(--bdr)",
        }}
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
      <ul
        className="mb-6 ml-5 flex flex-col gap-2 list-disc"
        style={{ color: "var(--mut)" }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="mb-6 ml-5 flex flex-col gap-2 list-decimal"
        style={{ color: "var(--mut)" }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="my-10">
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={value.url}
              alt={value.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption
              className="mt-3 text-center text-xs"
              style={{ color: "var(--dim)" }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
};

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const sanityPost = await sanityFetch<Post>(postQuery, { slug }).catch(() => null);

  const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
  const post: Post | null = sanityPost ?? (fallback ? { ...fallback } : null);

  if (!post) notFound();

  // Attach demo body if post has none (fallback posts)
  const body =
    "body" in post && post.body
      ? post.body
      : (DEMO_BODY[slug] ?? null);

  return (
    <div className="pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-10 sm:mb-12 transition-colors duration-150 hover:text-[var(--txt)]"
          style={{ color: "var(--mut)" }}
        >
          ← Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {post.category && (
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(200,245,60,0.12)",
                color: "var(--acc)",
                border: "1px solid rgba(200,245,60,0.2)",
              }}
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
          className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] mb-5"
          style={{ color: "var(--txt)" }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
            style={{ color: "var(--mut)" }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Cover image */}
        {post.coverImage && (
          <div
            className="relative w-full rounded-2xl overflow-hidden mb-10 sm:mb-12"
            style={{ aspectRatio: "16/9" }}
          >
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
        <div className="mb-8 sm:mb-10 h-px w-full" style={{ background: "var(--bdr)" }} />

        {/* Body */}
        {body && (
          <article>
            <PortableText value={body} components={ptComponents} />
          </article>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div
            className="mt-10 sm:mt-12 pt-8 flex flex-wrap gap-2"
            style={{ borderTop: "1px solid var(--bdr)" }}
          >
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
          className="mt-12 sm:mt-16 rounded-3xl p-7 sm:p-10 text-center"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--acc)" }}
          >
            Work with me
          </p>
          <h2
            className="text-lg sm:text-xl font-semibold mb-2"
            style={{ color: "var(--txt)" }}
          >
            Ready to bring your vision to life?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--mut)" }}>
            Let&apos;s design something that actually moves the needle.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Start a project →
          </Link>
        </div>
      </div>
    </div>
  );
}
