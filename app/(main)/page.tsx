export const revalidate = 60;

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Feranmi Ojediji | Web Designer & Creative",
  description:
    "Web designer crafting purposeful online presence. Specializing in website design, branding, UI/UX, AI automation, and digital strategy.",
  alternates: { canonical: "https://www.feranmiojediji.com" },
};
import {
  homePageQuery,
  featuredProjectsQuery,
  faqQuery,
} from "@/sanity/lib/queries";
import Hero, { type HeroData } from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import Services from "@/components/home/Services";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import FAQ from "@/components/home/FAQ";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home() {
  const [heroData, projectsData, faqData] =
    await Promise.all([
      sanityFetch<HeroData>(homePageQuery).catch(() => null),
      sanityFetch(featuredProjectsQuery).catch(() => []),
      sanityFetch(faqQuery).catch(() => []),
    ]);

  return (
    <>
      <Hero data={heroData ?? undefined} />
      <ScrollReveal>
        <VideoSection
          videoFile={heroData?.heroVideo}
          videoUrl={heroData?.videoUrl}
          videoThumbnail={heroData?.videoThumbnail}
          videoLabel={heroData?.videoLabel}
        />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <Services />
      </ScrollReveal>
      <PortfolioPreview data={(projectsData as never[]) ?? []} />
      <ScrollReveal delay={0.05}>
        <FAQ data={(faqData as never[]) ?? []} />
      </ScrollReveal>
    </>
  );
}
