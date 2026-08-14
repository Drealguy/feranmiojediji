export const revalidate = 60;

import type { Metadata } from "next";
import ContactForm, { defaultContactContent, type ContactPageContent } from "@/components/ContactForm";
import { sanityFetch } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact | Feranmi Ojediji",
  description: "Start a logo, brand identity, website, ecommerce, or digital platform project with Feranmi Ojediji.",
  alternates: { canonical: "https://feranmiojediji.com/contact" },
  openGraph: {
    title: "Contact | Feranmi Ojediji",
    description: "Start a logo, brand identity, website, ecommerce, or digital platform project with Feranmi Ojediji.",
    url: "https://feranmiojediji.com/contact",
    images: [{ url: "/feranmi.jpg", width: 1200, height: 630, alt: "Feranmi Ojediji" }],
  },
  twitter: { card: "summary_large_image", title: "Contact | Feranmi Ojediji", images: ["/feranmi.jpg"] },
};

export default async function Contact() {
  let content = defaultContactContent;
  try {
    const cmsContent = await sanityFetch<Partial<ContactPageContent> | null>(contactPageQuery);
    if (cmsContent) {
      content = Object.fromEntries(
        Object.entries(defaultContactContent).map(([key, fallback]) => {
          const value = cmsContent[key as keyof ContactPageContent];
          return [key, Array.isArray(value) ? (value.length ? value : fallback) : value || fallback];
        })
      ) as unknown as ContactPageContent;
    }
  } catch {}

  return (
    <div className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>
              {content.eyebrow}
            </span>
            <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] max-w-lg"
              style={{ color: "var(--txt)" }}
            >
              {content.headline}
            </h1>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--mut)" }}>
              {content.intro}
            </p>
          </div>
        </div>

        <ContactForm content={content} />
      </div>
    </div>
  );
}
