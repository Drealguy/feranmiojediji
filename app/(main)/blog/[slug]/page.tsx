export const revalidate = 3600;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/client";
import { postQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { FALLBACK_POSTS } from "../page";

/* ─── Types ──────────────────────────────────────────────────────────────── */
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

/* ─── Demo body builders ─────────────────────────────────────────────────── */
function b(text: string, style = "normal") {
  return { _key: uid(), _type: "block", style, markDefs: [], children: [{ _key: "s", _type: "span", text, marks: [] }] };
}
function bq(text: string) {
  return { _key: uid(), _type: "block", style: "blockquote", markDefs: [], children: [{ _key: "s", _type: "span", text, marks: [] }] };
}
function li(text: string) {
  return { _key: uid(), _type: "block", style: "normal", listItem: "bullet", level: 1, markDefs: [], children: [{ _key: "s", _type: "span", text, marks: [] }] };
}
function img(url: string, alt: string, caption?: string) {
  return { _key: uid(), _type: "image", url, alt, caption };
}
let _n = 0;
function uid() { return `k${++_n}`; }

const DEMO_BODY: Record<string, object[]> = {
  "why-your-website-is-losing-clients": [
    b("Your website is either your best salesperson or your worst one. For most small businesses, it's the latter — quietly turning away potential clients every single day without anyone noticing."),
    b("After auditing dozens of websites for clients across Nigeria and beyond, I keep seeing the same five mistakes. The good news: every single one is fixable."),
    img("https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80", "Designer reviewing a website on a laptop", "A good website audit reveals the hidden leaks in your business."),
    b("Mistake #1: No Clear Call to Action", "h2"),
    b("Visitors shouldn't have to guess what to do next. If your homepage doesn't have a single, obvious CTA above the fold — 'Book a call', 'Get a quote', 'Start your project' — you're leaking money every single day."),
    b("The fix: pick one primary action you want visitors to take and make it impossible to miss. One CTA. One colour. Front and centre."),
    b("Mistake #2: Slow Load Times", "h2"),
    b("Google's data shows that 53% of mobile visitors abandon a page that takes more than 3 seconds to load. If your site loads in 7–10 seconds, you're not just losing clients — you're actively ranking lower on Google too."),
    b("The fix: compress your images (use WebP), remove unnecessary plugins, and use a fast host. Run your site through PageSpeed Insights and fix everything marked red."),
    b("Mistake #3: No Social Proof", "h2"),
    b("People buy from people they trust. If your website has no testimonials, no case studies, no client logos — you're asking strangers to take a leap of faith. Most won't."),
    bq("The moment I added three client testimonials to my homepage, my inquiry rate doubled within two weeks."),
    b("The fix: add real testimonials with real names and photos. Even two or three is enough to build credibility. If you don't have any yet, ask your last three clients today."),
    b("Mistake #4: Broken on Mobile", "h2"),
    b("Over 70% of web traffic now comes from mobile devices. If your site looks broken, cramped, or hard to tap on a phone, you're turning away the majority of your visitors before they even read your headline."),
    b("The fix: test your site on your own phone right now. Tap every button. Read every line. If anything feels off, it needs to be fixed."),
    b("Mistake #5: No SEO Foundation", "h2"),
    b("If your site isn't optimised for search, it's invisible to the clients actively searching for your services. No meta descriptions, no structured headings, no keyword strategy = no organic traffic."),
    b("The fix: every page needs a clear title tag, a meta description, and content that actually answers the questions your clients type into Google."),
    b("What to Do Next", "h2"),
    b("Start with the one mistake that resonates most — probably the CTA or the testimonials — and make that change this week. Then tackle the next one. You don't need to fix everything at once; you need to fix the biggest leak first."),
  ],

  "brand-identity-checklist-nigerian-business": [
    b("Every week I see Nigerian businesses investing in logos and calling it branding. Then they wonder why their brand doesn't feel cohesive, why clients can't remember them, or why they attract the wrong customers."),
    b("A logo is one tiny piece of a brand. Here's the full checklist — the same one I walk every client through before we design a single thing."),
    img("https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80", "Brand identity design spread on a table", "Brand identity is a system, not just a logo."),
    b("What Is Brand Identity (Really)?", "h2"),
    b("Brand identity is the complete visual and verbal system that communicates who you are, what you stand for, and why clients should choose you. It includes your logo — but also your colours, typography, tone of voice, photography style, and how every touchpoint feels."),
    bq("A brand is what people say about you when you're not in the room. Your brand identity is what makes them say the right thing."),
    b("The Checklist", "h2"),
    b("1. Brand Strategy — The Foundation", "h3"),
    b("Before any design work begins, you need answers to: Who is your ideal client? What problem do you solve for them? What makes you different from every other option? What words do you want people to use to describe you?"),
    b("2. Logo System", "h3"),
    b("A proper logo system includes a primary logo, a secondary (horizontal) version, and an icon/mark for small applications like favicons and profile pictures. You need all three to show up consistently everywhere."),
    b("3. Colour Palette", "h3"),
    b("You need a primary colour, one or two secondary colours, and neutrals. Every colour must have a defined meaning and usage rule. Don't just pick colours you like — pick colours that speak to your audience and differentiate you from competitors."),
    b("4. Typography System", "h3"),
    b("Choose a heading font and a body font that work together. Define sizes and weights for headlines, subheadings, body copy, and captions. Typography is the silent communicator of your brand's personality."),
    b("5. Brand Voice & Tone", "h3"),
    b("How do you write captions? How do you respond to enquiries? Formal or conversational? Bold or gentle? Define this so every piece of content — from your Instagram bio to your invoice — sounds like the same person."),
    b("Nigeria-Specific Considerations", "h2"),
    b("Colour carries cultural weight here. Red can signal danger, green signals growth, white is associated with purity in some contexts and mourning in others. Know your audience before you commit to a palette."),
    b("Trust signals are critical in a market where scams are unfortunately common. Logos of associations, certifications, press mentions, and client names all carry weight. Build trust into your visual identity from day one."),
    b("Where to Start", "h2"),
    b("If you're starting from scratch: do the brand strategy first. If you already have a brand: audit it against this checklist and identify the biggest gap. Fix that one thing first."),
  ],

  "ai-tools-for-better-design": [
    b("There's a lot of noise about AI replacing designers. Here's my honest take after 12+ months of integrating AI into my daily workflow: AI doesn't replace designers. But designers who use AI well are replacing designers who don't."),
    b("These are the exact tools and workflows I use — not a generic list, but the ones I actually open every day and the specific ways I use them."),
    img("https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80", "AI interface glowing on a screen", "AI tools have changed how fast I can move from idea to execution."),
    b("The Tools I Actually Use", "h2"),
    b("Claude & ChatGPT — For thinking, not just writing", "h3"),
    b("I use Claude for strategy and long-form thinking — drafting proposals, structuring content strategy, writing website copy briefs. The key insight: I never use AI to write final copy. I use it to think faster and structure better, then I write the final version myself."),
    b("Midjourney — For moodboards and concept exploration", "h3"),
    b("Before I open Figma, I spend 20 minutes in Midjourney generating visual directions. It's not about using the output directly — it's about exploring 40 directions in 20 minutes instead of 3 directions in 2 hours. The ideas are better and clients can react to visuals earlier."),
    b("Make.com — For automating client workflows", "h3"),
    b("This is the one most designers sleep on. I've automated client onboarding emails, project update reminders, invoice follow-ups, and social media scheduling. That's roughly 5–6 hours of admin work per week, gone."),
    img("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80", "Workflow automation diagram on screen", "Automation handles the admin so I can focus on the work that matters."),
    b("My AI Workflow: From Brief to Delivery", "h2"),
    b("Here's how a typical project timeline has changed:"),
    li("Old: client brief → research (2 days) → moodboard (1 day) → concepts (3 days) → revisions"),
    li("New: client brief → AI-assisted research + moodboard (3 hours) → concepts (1 day) → tighter revisions"),
    bq("The quality of the final work is higher. The timeline is shorter. The client gets more value. That's the only scorecard that matters."),
    b("The time I save on research and exploration gets reinvested into craft — better typography choices, more refined layouts, stronger copy. The output is genuinely better."),
    b("What AI Can't Do (Yet)", "h2"),
    b("Understanding people. Every project starts with a conversation about the client's customers, their fears, their aspirations, the specific cultural context they operate in. AI can assist, but it can't replace the human judgment that comes from listening carefully and asking the right questions."),
    b("Building relationships. The reason clients come back and refer others isn't the deliverables — it's the experience of working together. That's irreplaceable."),
    b("The Bottom Line", "h2"),
    b("Start with one tool. Pick the bottleneck in your current workflow — probably client emails or research — and find an AI tool that addresses exactly that. Use it for 30 days before adding anything else."),
  ],
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/* ─── Static params ──────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(postSlugsQuery).catch(() => []);
  return [
    ...slugs.map((s) => ({ slug: s.slug })),
    ...FALLBACK_POSTS.map((p) => ({ slug: p.slug })),
  ];
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post =
    (await sanityFetch<Post>(postQuery, { slug }).catch(() => null)) ??
    (FALLBACK_POSTS.find((p) => p.slug === slug) as Post | undefined) ??
    null;
  if (!post) return {};
  const title = ("seoTitle" in post ? post.seoTitle : undefined) ?? post.title;
  const description = ("seoDescription" in post ? post.seoDescription : undefined) ?? post.excerpt ?? "";
  return {
    title: `${title} — Feranmi Ojediji`,
    description,
    openGraph: {
      title, description,
      url: `https://feranmiojediji.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.coverImage ? { images: [{ url: post.coverImage, alt: post.coverImageAlt ?? title }] } : {}),
    },
    twitter: {
      card: "summary_large_image", title, description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
    alternates: { canonical: `https://feranmiojediji.com/blog/${slug}` },
  };
}

/* ─── Portable Text renderer ─────────────────────────────────────────────── */
const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-semibold mt-10 mb-4 leading-snug" style={{ color: "var(--txt)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base sm:text-lg font-semibold mt-8 mb-3" style={{ color: "var(--txt)" }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold mt-6 mb-2" style={{ color: "var(--txt)" }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-sm sm:text-base leading-[1.9] mb-5" style={{ color: "var(--mut)" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-8 pl-5 py-1 text-sm sm:text-base italic leading-relaxed rounded-r-xl"
        style={{ borderLeft: "3px solid var(--acc)", color: "var(--mut)", background: "rgba(200,245,60,0.04)" }}
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
        className="px-1.5 py-0.5 rounded text-xs font-mono"
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
        className="underline underline-offset-2 hover:opacity-80 transition-opacity"
        style={{ color: "var(--acc)" }}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-4 space-y-2" style={{ color: "var(--mut)" }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-4 space-y-2 list-decimal" style={{ color: "var(--mut)" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-sm sm:text-base leading-relaxed flex gap-2">
        <span style={{ color: "var(--acc)", flexShrink: 0, marginTop: "2px" }}>—</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-sm sm:text-base leading-relaxed">{children}</li>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="my-8 sm:my-10">
          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Image
              src={value.url}
              alt={value.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2.5 text-center text-xs" style={{ color: "var(--dim)" }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
};

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sanityPost = await sanityFetch<Post>(postQuery, { slug }).catch(() => null);
  const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
  const post: Post | null = sanityPost ?? (fallback ? { ...fallback } : null);
  if (!post) notFound();

  const body = ("body" in post && post.body) ? post.body : (DEMO_BODY[slug] ?? null);

  return (
    <div className="pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-medium mb-10 transition-colors duration-150 hover:text-[var(--txt)]"
          style={{ color: "var(--mut)" }}
        >
          ← Back to Blog
        </Link>

        {/* Category + date */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
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
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.2] mb-4"
          style={{ color: "var(--txt)" }}
        >
          {post.title}
        </h1>

        {/* Excerpt / lead */}
        {post.excerpt && (
          <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: "var(--mut)" }}>
            {post.excerpt}
          </p>
        )}

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full rounded-xl overflow-hidden mb-8" style={{ aspectRatio: "16/9" }}>
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
        <div className="h-px w-full mb-8" style={{ background: "var(--bdr)" }} />

        {/* Body */}
        {body && (
          <article className="mb-10">
            <PortableText value={body} components={ptComponents} />
          </article>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-10 mb-10" style={{ borderBottom: "1px solid var(--bdr)" }}>
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
          className="rounded-2xl p-7 sm:p-8 text-center"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--acc)" }}>
            Work with me
          </p>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--txt)" }}>
            Ready to bring your vision to life?
          </h2>
          <p className="text-xs sm:text-sm mb-5" style={{ color: "var(--mut)" }}>
            Let&apos;s design something that actually moves the needle.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Start a project →
          </Link>
        </div>

      </div>
    </div>
  );
}
