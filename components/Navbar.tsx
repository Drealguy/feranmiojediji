"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WHATSAPP_URL } from "@/lib/site";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

/** Items under "Learn". External links open in a new tab and show ↗. */
const learnLinks = [
  { label: "Vibecoding Mastery", href: "https://courses.feranmiojediji.com", external: true },
  { label: "My Books", href: "/books", external: false },
];

function LearnMenu({ current }: { current: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  // Close on outside click and Escape. Menu links close it themselves when clicked.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="learn-menu"
        className={`${ITEM} inline-flex items-center gap-1.5 underline-offset-[6px] ${current ? "underline" : ""}`}
      >
        Learn
        <svg
          viewBox="0 0 10 6"
          aria-hidden
          className={`size-2.5 fill-current transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>

      {/* pt-3 bridges the gap so the menu doesn't close while the pointer moves down to it. */}
      <div
        id="learn-menu"
        className={`absolute top-full left-1/2 w-64 -translate-x-1/2 pt-3 transition duration-200 motion-reduce:transition-none ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="rounded-xl border border-line bg-canvas p-1.5 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.18)]">
          {learnLinks.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className={`focus-ring group flex h-12 items-center justify-between gap-3 rounded-lg px-4 text-[0.875rem] font-medium uppercase tracking-[0.01em] transition-colors ${
                  i === 0 ? "bg-brand text-cream hover:bg-brand/90" : "hover:bg-ink/[0.04]"
                }`}
              >
                {l.label}
                {l.external && (
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none">
                    ↗
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

const ITEM =
  "focus-ring uppercase text-[0.875rem] tracking-[0.01em] transition-colors hover:text-ink-soft";

function StartButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={`focus-ring group inline-flex h-10 items-center gap-1.5 rounded-lg bg-brand px-4 text-[0.875rem] font-medium text-cream transition-colors hover:bg-brand/90 ${className}`}
    >
      Start a project
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
        →
      </span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto grid h-17 max-w-[calc(76rem+5rem)] grid-cols-[1fr_auto] items-center px-7 sm:px-12 md:grid-cols-[1fr_auto_1fr] lg:px-16">
        <Link href="/" className={`${ITEM} justify-self-start font-medium`}>
          Feranmi Ojediji
        </Link>

        {/* Desktop: links in the middle, call to action on the right. */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-12">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className={`${ITEM} underline-offset-[6px] aria-[current=page]:underline`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <LearnMenu current={isCurrent("/books")} />
          </ul>
        </nav>
        <div className="hidden justify-self-end md:block">
          <StartButton />
        </div>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`${ITEM} -mr-2 inline-flex h-11 items-center justify-self-end px-2 md:hidden`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line md:hidden">
          <ul className="px-7 py-2 sm:px-12">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className="focus-ring flex h-14 items-center text-2xl font-medium uppercase tracking-[-0.02em]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <p className="text-xs uppercase tracking-[0.06em] text-ink-soft">Learn</p>
              <ul className="mt-2">
                {learnLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="focus-ring flex h-12 items-center justify-between text-xl font-medium uppercase tracking-[-0.02em]"
                    >
                      {l.label}
                      {l.external && <span aria-hidden className="text-base">↗</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="px-7 pt-2 pb-6 sm:px-12">
            <StartButton onClick={() => setOpen(false)} className="h-12 w-full justify-center text-[0.9375rem]" />
          </div>
        </nav>
      )}
    </header>
  );
}
