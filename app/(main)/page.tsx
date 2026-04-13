export const revalidate = 60;

import { sanityFetch } from "@/sanity/lib/client";
import {
  homePageQuery,
  servicesQuery,
  featuredProjectsQuery,
  testimonialsQuery,
  faqQuery,
} from "@/sanity/lib/queries";
import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import Services from "@/components/home/Services";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default async function Home() {
  const [heroData, servicesData, projectsData, testimonialsData, faqData] =
    await Promise.all([
      sanityFetch(homePageQuery).catch(() => null),
      sanityFetch(servicesQuery).catch(() => []),
      sanityFetch(featuredProjectsQuery).catch(() => []),
      sanityFetch(testimonialsQuery).catch(() => []),
      sanityFetch(faqQuery).catch(() => []),
    ]);

  return (
    <>
      <Hero data={heroData ?? undefined} />
      <VideoSection videoUrl={(heroData as any)?.videoUrl} videoLabel={(heroData as any)?.videoLabel} />
      <Services data={(servicesData as never[]) ?? []} />
      <PortfolioPreview data={(projectsData as never[]) ?? []} />
      <Testimonials data={(testimonialsData as never[]) ?? []} />
      <FAQ data={(faqData as never[]) ?? []} />
    </>
  );
}
