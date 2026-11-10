import Link from "next/link";
import { footerColumns, socials, WHATSAPP_URL, type FooterLink, type SocialName } from "@/lib/site";

function SocialIcon({ name }: { name: SocialName }) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, className: "size-[1.125rem]" } as const;
  switch (name) {
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.5V21h3z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.9 2h3.4l-7.4 8.5L23.6 22h-6.8l-5.3-7-6.1 7H2l7.9-9L1.5 2h7l4.8 6.4L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 8.5h3V21H3V8.5zm5.5 0h2.9v1.7h.1c.4-.8 1.4-1.9 3.1-1.9 3.2 0 3.9 2.1 3.9 4.9V21h-3v-6.8c0-1.6 0-3.1-2-3.1s-2.2 1.5-2.2 3V21h-2.8V8.5z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
        </svg>
      );
  }
}

function FooterItem({ link }: { link: FooterLink }) {
  if (!link.href) return <span className="text-cream/40">{link.label}</span>;
  const external = link.href.startsWith("http");
  const cls = "focus-ring text-cream/65 transition-colors hover:text-cream";
  return external ? (
    <a href={link.href} target="_blank" rel="noreferrer" className={cls}>
      {link.label}
      <span aria-hidden className="ml-1 text-xs">↗</span>
    </a>
  ) : (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <div className="p-2 sm:p-3">
      <footer id="contact" className="relative scroll-mt-20 overflow-hidden rounded-2xl bg-brand text-cream">
        <div aria-hidden className="bg-stage-grid absolute inset-0 opacity-70" />

        <div className="relative px-5 sm:px-8">
          {/* Call to action */}
          <div className="flex flex-col items-center py-24 text-center sm:py-32">
            <h2 data-split-lines className="text-[2.25rem] font-medium leading-[1.05] tracking-[-0.045em] text-balance sm:text-[3.25rem]">
              <span className="sm:block">Have a product to build?</span>{" "}
              <span className="sm:block">Let&rsquo;s make it real.</span>
            </h2>
            <div data-reveal className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex h-12 items-center rounded-lg bg-cream px-5 text-[0.96875rem] font-medium text-brand transition-colors hover:bg-cream/85"
              >
                Start a project
              </a>
              <Link
                href="/projects"
                className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg border border-cream/30 px-5 text-[0.96875rem] font-medium transition-colors hover:border-cream/70"
              >
                See my work <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-cream/15 py-10 text-[0.9375rem] md:grid-cols-5">
            <div className="col-span-2 md:col-span-2">
              <p className="font-medium">Feranmi Ojediji</p>
              <p className="mt-3 max-w-[28ch] text-cream/65">
                Product and software builder helping brands and businesses solve problems through
                design, technology and AI automation.
              </p>
            </div>
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="font-medium">{col.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterItem link={l} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col-reverse items-start justify-between gap-5 border-t border-cream/15 py-6 text-sm text-cream/65 sm:flex-row sm:items-center">
            <p>&copy; {new Date().getFullYear()} Feranmi Ojediji</p>
            <ul className="-ml-2.5 flex items-center gap-1 sm:-mr-2.5 sm:ml-0">
              {socials.map((s) =>
                s.href ? (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="focus-ring flex size-11 items-center justify-center text-cream/70 transition-colors hover:text-cream"
                    >
                      <SocialIcon name={s.name} />
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
