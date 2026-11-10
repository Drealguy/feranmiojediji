import type { Metadata } from "next";
import ContactFlow from "@/components/ContactFlow";

export const metadata: Metadata = {
  title: "Start a project | Feranmi Ojediji",
  description: "Tell me about your project in a few quick steps, by typing or recording a voice note.",
};

export default function ContactPage() {
  return (
    <div className="p-2 sm:p-3">
      <section
        aria-label="Start a project"
        className="flex min-h-[calc(100svh-6rem)] flex-col justify-center rounded-2xl border border-line bg-canvas px-5 py-16 text-center sm:min-h-[calc(100svh-6.5rem)] sm:px-10 sm:py-20"
      >
        <ContactFlow />
      </section>
    </div>
  );
}
