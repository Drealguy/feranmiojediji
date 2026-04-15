"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "My Works", href: "/works" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    dropdown: [
      {
        label: "Blog",
        href: "/blog",
        description: "Design & business insights",
      },
      {
        label: "Courses",
        href: "/courses",
        description: "Learn design & strategy",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

function DropdownMenu({
  items,
  onClose,
}: {
  items: { label: string; href: string; description: string }[];
  onClose: () => void;
}) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl overflow-hidden z-[60]"
      style={{
        background: "var(--surf)",
        border: "1px solid var(--bdr)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
      }}
    >
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="nav-link flex flex-col gap-0.5 px-4 py-3.5 group"
          style={{
            borderBottom: i < items.length - 1 ? "1px solid var(--bdr)" : "none",
          }}
        >
          <span className="text-sm font-medium transition-colors duration-150" style={{ color: "var(--txt)" }}>
            {item.label}
          </span>
          <span className="text-xs" style={{ color: "var(--mut)" }}>
            {item.description}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
        <nav
          className="flex items-center justify-between rounded-2xl px-6 py-3"
          style={{
            background: "var(--nav-bg)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--bdr)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/feranmilogo.png"
              alt="Feranmi Ojediji"
              width={36}
              height={36}
              sizes="36px"
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              // Dropdown item
              if ("dropdown" in link && link.dropdown) {
                const dropdownActive = link.dropdown.some((d) => pathname === d.href);
                return (
                  <li key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                      style={{
                        color: dropdownActive || dropdownOpen ? "var(--txt)" : "var(--mut)",
                        background:
                          dropdownActive || dropdownOpen
                            ? "rgba(128,128,128,0.08)"
                            : "transparent",
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className="transition-transform duration-200"
                        style={{
                          transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="dropdown-enter">
                        <DropdownMenu
                          items={link.dropdown}
                          onClose={() => setDropdownOpen(false)}
                        />
                      </div>
                    )}
                  </li>
                );
              }

              // Regular link
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link px-4 py-2 rounded-lg text-sm${active ? " active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://wa.me/2349167802170"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg"
              style={{ color: "var(--mut)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="mt-2 rounded-2xl p-3 md:hidden"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--bdr)",
            }}
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                if ("dropdown" in link && link.dropdown) {
                  return (
                    <li key={link.label}>
                      <p
                        className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest font-medium"
                        style={{ color: "var(--dim)" }}
                      >
                        {link.label}
                      </p>
                      {link.dropdown.map((sub) => {
                        const active = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 pl-5 py-2 rounded-xl text-sm transition-all"
                            style={{
                              color: active ? "var(--txt)" : "var(--mut)",
                              background: active ? "rgba(128,128,128,0.07)" : "transparent",
                            }}
                          >
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--bdr)" }} />
                            {sub.label}
                          </Link>
                        );
                      })}
                    </li>
                  );
                }

                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 rounded-xl text-sm transition-all"
                      style={{
                        color: active ? "var(--txt)" : "var(--mut)",
                        background: active ? "rgba(128,128,128,0.07)" : "transparent",
                        fontWeight: active ? 500 : 400,
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--bdr)" }}>
              <a
                href="https://wa.me/2349167802170"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
