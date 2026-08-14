"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog", description: "Ideas on design and business" },
  { label: "Courses", href: "/courses", description: "Practical creative learning" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeResources = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) setResourcesOpen(false);
    };
    document.addEventListener("mousedown", closeResources);
    return () => document.removeEventListener("mousedown", closeResources);
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setResourcesOpen(false);
  };

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ background: "var(--nav-bg)", backdropFilter: "blur(18px)", borderBottom: "1px solid var(--bdr)" }}>
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main navigation">
        <Link href="/" onClick={closeMenus} className="flex min-w-0 items-center gap-3">
          <Image src="/feranmilogo.png" alt="" width={34} height={34} sizes="34px" className="shrink-0 object-contain" priority />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold leading-none" style={{ color: "var(--txt)" }}>Feranmi Ojediji</p>
            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--dim)" }}>Designer & developer</p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-lg px-4 py-2 text-sm transition-colors"
                style={{ color: active ? "var(--txt)" : "var(--mut)", background: active ? "color-mix(in srgb, var(--txt) 7%, transparent)" : "transparent" }}
              >
                {link.label}
              </Link>
            );
          })}

          <div ref={resourcesRef} className="relative">
            <button
              type="button"
              onClick={() => setResourcesOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm transition-colors"
              style={{ color: resourceLinks.some((link) => isActive(link.href)) || resourcesOpen ? "var(--txt)" : "var(--mut)" }}
              aria-expanded={resourcesOpen}
            >
              Resources
              <ChevronDown size={13} className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
            </button>

            {resourcesOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-2xl p-1.5" style={{ background: "var(--surf2)", border: "1px solid var(--bdr)", boxShadow: "0 20px 55px rgba(0,0,0,.22)" }}>
                {resourceLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMenus} className="block rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.04]">
                    <p className="text-sm font-medium" style={{ color: "var(--txt)" }}>{link.label}</p>
                    <p className="mt-1 text-xs" style={{ color: "var(--mut)" }}>{link.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-75 sm:inline-flex" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
            Start a project
          </Link>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-xl lg:hidden" style={{ color: "var(--txt)", border: "1px solid var(--bdr)" }} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t px-4 py-4 lg:hidden sm:px-6" style={{ background: "var(--surf2)", borderColor: "var(--bdr)" }}>
          <div className="mx-auto grid max-w-7xl gap-1">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenus} className="rounded-xl px-4 py-3 text-sm" style={{ color: isActive(link.href) ? "var(--txt)" : "var(--mut)", background: isActive(link.href) ? "color-mix(in srgb, var(--txt) 7%, transparent)" : "transparent" }}>
                {link.label}
              </Link>
            ))}
            <p className="px-4 pb-1 pt-4 text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--dim)" }}>Resources</p>
            {resourceLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenus} className="rounded-xl px-4 py-3 text-sm" style={{ color: isActive(link.href) ? "var(--txt)" : "var(--mut)" }}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={closeMenus} className="mt-3 rounded-xl px-4 py-3 text-center text-sm font-semibold sm:hidden" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
