export const revalidate = 3600;

import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
import AboutTabs from "@/components/AboutTabs";
import AboutIntro from "@/components/AboutIntro";

export const metadata: Metadata = {
  title: "About | Feranmi Ojediji",
  description: "Learn more about Feranmi Ojediji, web designer and digital creative based in Akure, Nigeria.",
  alternates: { canonical: "https://feranmiojediji.com/about" },
  openGraph: {
    title: "About | Feranmi Ojediji",
    description: "Learn more about Feranmi Ojediji, web designer and digital creative based in Akure, Nigeria.",
    url: "https://feranmiojediji.com/about",
    images: [{ url: "/feranmi.jpg", width: 1200, height: 630, alt: "Feranmi Ojediji" }],
  },
  twitter: { card: "summary_large_image", title: "About | Feranmi Ojediji", images: ["/feranmi.jpg"] },
};

interface AboutData {
  introHeading?: string;
  headline?: string;
  headlineAccent?: string;
  headlineSuffix?: string;
  bio?: string[];
  photo?: string;
  gallery?: { url: string }[];
  timeline?: { year: string; event: string }[];
  aboutSectionHeading?: string;
  ventures?: { name: string; description?: string; url?: string }[];
  tools?: string[];
  stackHeading?: string;
  ctaText?: string;
  ctaSubtext?: string;
}

const DEFAULTS = {
  introHeading: "Who really is Feranmi?",
  headline: "Designer by craft,",
  headlineAccent: "builder",
  headlineSuffix: "by nature",
  bio: [
    "I'm Feranmi Ojediji, a designer and developer with about six years of experience working across branding, websites, and digital products.",
    "I started with design because I loved the idea of being able to take something that only existed in someone's head and give it a visual form. At first, that meant learning how to make things look better: logos, graphics, layouts, and brand identities. But as I worked on more projects, I started paying more attention to the thinking behind the work: why a brand should look a certain way, how people interact with a website, what makes a product easy to understand, and how good design can actually support a business.",
    "That curiosity eventually pushed me into development. I didn't want to stop at designing an interface and handing it off. I wanted to understand how the product worked behind the screen and be able to take an idea from the first sketch all the way to something people could actually use.",
    "Over the years, I've worked on brand identities, campaign websites, ecommerce stores, learning platforms, real estate products, invoicing software, and other digital experiences. Working across different types of projects and industries has taught me to think beyond just the visuals. I think about the business, the user, the message, and the system behind what I'm building.",
    "More recently, AI has become another big part of how I work. I use it to explore ideas, speed up development, research, test different directions, and improve my workflow, but I still believe the most important part is knowing what you're trying to create and why.",
    "Today, I sit somewhere between design, development, and strategy. I like taking rough ideas, asking the right questions, finding a clear direction, and turning them into brands and digital products that actually make sense.",
    "And I'm still learning, experimenting, and building as I go.",
  ],
  photo: "/feranmi.jpg",
  gallery: [{ url: "/feranmi.jpg" }, { url: "/feranmi.jpg" }, { url: "/feranmi.jpg" }],
  timeline: [
    { year: "2016", event: "Started freelancing with a first logo for a family business." },
    { year: "2018", event: "Landed first brand identity project for a tech startup." },
    { year: "2020", event: "Transitioned fully to web design and digital product work." },
    { year: "2022", event: "Expanded into AI automation and digital strategy consulting." },
    { year: "2025", event: "120+ projects delivered. Still going." },
  ],
  aboutSectionHeading: "A designer focused on useful work and lasting business value.",
  ventures: [],
  tools: ["Figma", "Webflow", "Framer", "Adobe Creative Suite", "ChatGPT / Claude", "Make.com", "Notion", "Lottie"],
  stackHeading: "The tools I use to move from idea to launch.",
  ctaText: "Ready to build something great?",
  ctaSubtext: "I'm selective about the projects I take on. If we're a good fit, let's talk.",
};

export default async function About() {
  const raw = await sanityFetch<AboutData>(aboutQuery).catch(() => null);
  const d = { ...DEFAULTS, ...raw };
  const bio = d.bio?.length ? d.bio : DEFAULTS.bio;
  const timeline = d.timeline?.length ? d.timeline : DEFAULTS.timeline;
  const gallery = d.gallery?.length ? d.gallery : DEFAULTS.gallery;
  const tools = d.tools?.length ? d.tools : DEFAULTS.tools;
  const ventures = d.ventures?.length ? d.ventures : DEFAULTS.ventures;

  return (
    <div className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Hero */}
        <div className="mb-16 grid grid-cols-1 items-start gap-10 sm:mb-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>About me</span>
              <div className="w-12 h-px" style={{ background: "var(--bdr)" }} />
            </div>
            <h1 className="mb-8 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--txt)" }}>{d.introHeading || DEFAULTS.introHeading}</h1>
            <AboutIntro paragraphs={bio} />
          </div>

          <div className="relative">
            <div
              className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl lg:ml-auto lg:mr-0 lg:max-w-[520px]"
              style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
            >
              <Image
                src={d.photo || "/feranmi.jpg"}
                alt="Feranmi Ojediji"
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover object-top"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "var(--acc)" }} />
            </div>
          </div>
        </div>

        <AboutTabs aboutHeading={d.aboutSectionHeading || DEFAULTS.aboutSectionHeading} timeline={timeline} ventures={ventures} gallery={gallery} stackHeading={d.stackHeading || DEFAULTS.stackHeading} tools={tools} />

        {/* CTA */}
        <div className="rounded-3xl p-6 sm:p-10 md:p-12 text-center" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--acc)" }}>Let&apos;s work together</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6" style={{ color: "var(--txt)" }}>{d.ctaText}</h2>
          <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: "var(--mut)" }}>{d.ctaSubtext}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            Start a project →
          </a>
        </div>
      </div>
    </div>
  );
}
