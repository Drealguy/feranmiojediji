import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import Services from "@/components/home/Services";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <Services />
      <PortfolioPreview />
      <Testimonials />
      <FAQ />
    </>
  );
}
