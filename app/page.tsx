import Expertise from "@/components/Expertise";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import WorkPreview from "@/components/WorkPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkPreview />
      <About />
      <Expertise />
      <Testimonials />
    </>
  );
}
