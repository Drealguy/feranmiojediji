import { Bot, Code2, Globe, PenTool, type LucideIcon } from "lucide-react";

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Product design",
    description:
      "Product strategy, user flows and interfaces for web apps and SaaS, shaped around real users and business goals.",
    icon: PenTool,
  },
  {
    title: "Software development",
    description:
      "Custom web apps and internal tools built from product idea to reliable, launch ready software.",
    icon: Code2,
  },
  {
    title: "Business websites",
    description:
      "Strategic websites that clarify your offer, strengthen trust and turn the right visitors into enquiries.",
    icon: Globe,
  },
  {
    title: "AI & automation",
    description:
      "Practical AI features and automated workflows that reduce repetitive work and help your team operate better.",
    icon: Bot,
  },
];

/** Three stacked layers, set inside the headline (echoes the photo in the hero and the logos in About). */
function InlineStack() {
  return (
    <span
      aria-hidden
      className="mx-[0.18em] inline-flex h-[0.86em] w-[1.3em] -translate-y-[0.06em] items-center justify-center rounded-full bg-cream align-middle"
    >
      <svg viewBox="0 0 32 24" className="h-[0.56em] w-auto" fill="none">
        <path d="M16 16.5 3 10.5l13-6 13 6-13 6Z" className="fill-brand/25 stroke-brand" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m3 14.5 13 6 13-6" className="stroke-brand" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 12.5 3 6.5l13-6 13 6-13 6Z" className="animate-[inline-lift_2.8s_ease-in-out_infinite] fill-brand stroke-brand [transform-box:fill-box] motion-reduce:animate-none" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Expertise() {
  return (
    <div className="p-2 sm:p-3">
      <section
        id="expertise"
        aria-labelledby="expertise-heading"
        className="scroll-mt-20 rounded-2xl border border-line bg-canvas px-5 py-20 text-center sm:px-10 sm:py-28"
      >
        <p
          data-reveal
          className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium"
        >
          <span aria-hidden className="size-2 rounded-full bg-brand" />
          What I do
        </p>

        <h2
          id="expertise-heading"
          data-reveal
          className="mx-auto mt-8 max-w-[16ch] text-[2.25rem] font-medium leading-[1.04] tracking-[-0.045em] text-balance sm:mt-10 sm:text-[3.5rem] lg:text-[4.5rem]"
        >
          Every product is a{" "}
          <span className="whitespace-nowrap">
            stack
            <InlineStack />
          </span>
          <span className="block text-ink-soft">of decisions.</span>
        </h2>

        <p
          data-reveal
          className="mx-auto mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-soft text-balance sm:mt-8 sm:text-lg"
        >
          Take a product apart and you find its layers: the problem, the flow, the interface and the code underneath.
          I design and build each one on purpose, so the product holds up when real people use it every day.
        </p>

        {/* Services */}
        <ol data-reveal-stagger className="mx-auto mt-14 grid max-w-6xl gap-3 text-left sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                className="group flex flex-col rounded-xl border border-line p-6 transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-cream motion-reduce:transition-none"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-cream text-brand transition-colors duration-300 group-hover:bg-cream/15 group-hover:text-cream">
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm tabular-nums text-ink-soft transition-colors duration-300 group-hover:text-cream/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft transition-colors duration-300 group-hover:text-cream/75">
                  {s.description}
                </p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
