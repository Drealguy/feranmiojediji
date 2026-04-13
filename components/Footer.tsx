"use client";

import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Courses", href: "/courses" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/feranmi.ojediji/" },
  { label: "Twitter / X", href: "https://x.com/feranmiojediji" },
  { label: "Facebook", href: "https://www.facebook.com/feranmi.ojediji.3/" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--bdr)" }} className="mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/feranmilogo.png"
                alt="Feranmi Ojediji"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-[240px]" style={{ color: "var(--mut)" }}>
              Web designer crafting purposeful online presence for brands that want to stand out.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--dim)" }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--mut)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--txt)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--mut)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5" style={{ color: "var(--dim)" }}>
              Connect
            </p>
            <ul className="flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200 group flex items-center gap-2"
                    style={{ color: "var(--mut)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--txt)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--mut)")}
                  >
                    {s.label}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--acc)" }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--bdr)" }}>
          <p className="text-xs" style={{ color: "var(--dim)" }}>
            © {new Date().getFullYear()} Feranmi Ojediji. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--dim)" }}>
            Built with intent. Designed with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
