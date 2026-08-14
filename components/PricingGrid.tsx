"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import {
  brandingAddons,
  pricingCategories,
  pricingPackages,
  type PricingCategory,
  type PricingCategoryId,
  type PricingPackage,
} from "@/lib/pricing-data";

function PackageModal({ plan, onClose }: { plan: PricingPackage; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="package-modal-title"
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:max-h-[88vh] sm:rounded-3xl"
        style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}
      >
        <div className="flex shrink-0 items-start justify-between gap-6 px-5 py-5 sm:px-8 sm:py-7" style={{ borderBottom: "1px solid var(--bdr)" }}>
          <div className="min-w-0">
            <p className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--acc)" }}>Full package</p>
            <h2 id="package-modal-title" className="text-2xl font-semibold sm:text-3xl" style={{ color: "var(--txt)" }}>{plan.name}</h2>
            <p className="mt-2 text-xl font-semibold" style={{ color: "var(--txt)" }}>{plan.price}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close package details"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/5"
            style={{ border: "1px solid var(--bdr)", color: "var(--mut)" }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
          <section className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--dim)" }}>Best for</p>
            <p className="max-w-2xl text-base leading-relaxed" style={{ color: "var(--mut)" }}>{plan.bestFor}</p>
          </section>

          <section className="mb-8">
            <h3 className="mb-4 text-base font-semibold" style={{ color: "var(--txt)" }}>Everything included</h3>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {plan.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--mut)" }}>
                  <Check size={15} className="mt-1 shrink-0" style={{ color: "var(--acc)" }} />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </section>

          {(plan.revisions || plan.support) && (
            <section className="mb-8 grid gap-3 sm:grid-cols-2">
              {plan.revisions && (
                <div className="rounded-2xl p-4" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
                  <p className="mb-1 text-xs uppercase tracking-widest" style={{ color: "var(--dim)" }}>Revisions</p>
                  <p className="text-sm font-medium" style={{ color: "var(--txt)" }}>{plan.revisions}</p>
                </div>
              )}
              {plan.support && (
                <div className="rounded-2xl p-4" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
                  <p className="mb-1 text-xs uppercase tracking-widest" style={{ color: "var(--dim)" }}>Support</p>
                  <p className="text-sm font-medium" style={{ color: "var(--txt)" }}>{plan.support}</p>
                </div>
              )}
            </section>
          )}

          {plan.thirdPartyCosts && (
            <section className="mb-8 rounded-2xl p-5" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
              <h3 className="mb-2 text-sm font-semibold" style={{ color: "var(--txt)" }}>Third-party costs</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--mut)" }}>{plan.thirdPartyCosts}</p>
            </section>
          )}

          {plan.notes?.length ? (
            <section className="mb-2">
              <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--txt)" }}>Package notes</h3>
              <ul className="space-y-2">
                {plan.notes.map((note) => <li key={note} className="text-sm" style={{ color: "var(--mut)" }}>• {note}</li>)}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="shrink-0 p-4 sm:px-8 sm:py-5" style={{ borderTop: "1px solid var(--bdr)", background: "var(--surf2)" }}>
          <Link
            href={`/contact?package=${encodeURIComponent(plan.name)}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
          >
            {plan.cta}<ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingGrid({ categories = pricingCategories, packages = pricingPackages, addons = brandingAddons }: { categories?: PricingCategory[]; packages?: PricingPackage[]; addons?: string[] }) {
  const [activeCategory, setActiveCategory] = useState<PricingCategoryId>("branding");
  const [selectedPlan, setSelectedPlan] = useState<PricingPackage | null>(null);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const visiblePlans = packages.filter((plan) => plan.category === activeCategory);
  const activeCategoryLabel = categories.find((category) => category.id === activeCategory)?.label;

  useEffect(() => {
    const syncCategoryFromHash = () => {
      const category = window.location.hash.slice(1) as PricingCategoryId;
      if (categories.some((item) => item.id === category)) setActiveCategory(category);
    };
    syncCategoryFromHash();
    window.addEventListener("hashchange", syncCategoryFromHash);
    return () => window.removeEventListener("hashchange", syncCategoryFromHash);
  }, [categories]);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) setCategoryMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCategoryMenuOpen(false);
    };
    document.addEventListener("mousedown", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
      <div className="mb-8 sm:hidden">
        <p className="mb-2 block text-xs font-medium" style={{ color: "var(--mut)" }}>
          Choose a service
        </p>
        <div ref={categoryMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setCategoryMenuOpen((open) => !open)}
            className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-sm font-medium"
            style={{ background: "var(--surf)", color: "var(--txt)", border: "1px solid var(--bdr)" }}
            aria-haspopup="listbox"
            aria-expanded={categoryMenuOpen}
          >
            <span>{activeCategoryLabel}</span>
            <ChevronDown size={16} className={`shrink-0 transition-transform duration-200 ${categoryMenuOpen ? "rotate-180" : ""}`} style={{ color: "var(--mut)" }} />
          </button>

          {categoryMenuOpen && (
            <div
              role="listbox"
              aria-label="Pricing service category"
              className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl p-1.5 shadow-2xl"
              style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}
            >
              {categories.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setCategoryMenuOpen(false);
                      window.history.replaceState(null, "", `#${category.id}`);
                    }}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors"
                    style={isActive ? { background: "var(--acc)", color: "var(--acc-fg)" } : { color: "var(--mut)" }}
                  >
                    <span>{category.label}</span>
                    {isActive && <Check size={15} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="mb-12 hidden sm:block">
        <div role="tablist" aria-label="Pricing service categories" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-2xl p-1.5" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveCategory(category.id);
                  window.history.replaceState(null, "", `#${category.id}`);
                }}
                className="shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-medium transition-colors duration-200 sm:px-5 sm:text-sm"
                style={isActive ? { background: "var(--acc)", color: "var(--acc-fg)" } : { color: "var(--mut)" }}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {visiblePlans.length ? (
        <div role="tabpanel" className={`mx-auto grid w-full gap-4 sm:gap-5 ${visiblePlans.length === 2 ? "max-w-4xl lg:grid-cols-2" : "max-w-6xl md:grid-cols-2 xl:grid-cols-3"}`}>
          {visiblePlans.map((plan) => (
            <article key={plan.id} className="relative flex h-full flex-col rounded-2xl p-5 sm:p-7" style={{ background: plan.recommended ? "var(--surf2)" : "var(--surf)", border: `1px solid ${plan.recommended ? "var(--acc)" : "var(--bdr)"}` }}>
              {plan.recommended && <span className="absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>Recommended</span>}
              <div className="mb-5 sm:mb-6">
                <p className="mb-3 text-sm font-medium" style={{ color: "var(--mut)" }}>{plan.name}</p>
                <p className="text-3xl font-semibold sm:text-4xl" style={{ color: "var(--txt)" }}>{plan.price}</p>
              </div>
              <div className="mb-5 pb-5 sm:mb-6 sm:pb-6" style={{ borderBottom: "1px solid var(--bdr)" }}>
                <p className="text-sm leading-relaxed" style={{ color: "var(--mut)" }}>{plan.bestFor}</p>
              </div>
              <ul className="mb-6 flex flex-1 flex-col gap-2.5 sm:mb-7 sm:gap-3">
                {plan.deliverables.slice(0, 6).map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--mut)" }}>
                    <Check size={15} className="mt-1 shrink-0" style={{ color: "var(--acc)" }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="grid gap-2.5">
                <button type="button" onClick={() => setSelectedPlan(plan)} className="rounded-xl px-5 py-3 text-sm font-medium transition-colors hover:bg-white/[0.03]" style={{ color: "var(--txt)", border: "1px solid var(--bdr)" }}>
                  View Full Package
                </button>
                <Link href={`/contact?package=${encodeURIComponent(plan.name)}`} className="flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90" style={{ background: "var(--acc)", color: "var(--acc-fg)" }}>
                  {plan.cta}<ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div role="tabpanel" className="flex min-h-72 flex-col items-center justify-center rounded-2xl px-6 py-16 text-center" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
          <p className="mb-2 text-lg font-semibold" style={{ color: "var(--txt)" }}>Pricing is currently unavailable.</p>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--mut)" }}>Please choose another service or contact me to discuss your project.</p>
        </div>
      )}

      {activeCategory === "branding" && (
        <section className="mx-auto mt-10 max-w-4xl rounded-2xl p-5 sm:mt-12 sm:p-8" style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}>
          <div className="mb-6 max-w-2xl">
            <p className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--acc)" }}>Optional add-ons</p>
            <h2 className="mb-2 text-xl font-semibold" style={{ color: "var(--txt)" }}>Need more?</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--mut)" }}>Add social media design, packaging, photography or brand strategy to your project.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {addons.map((addon) => <span key={addon} className="rounded-full px-4 py-2 text-sm" style={{ background: "var(--surf2)", color: "var(--mut)", border: "1px solid var(--bdr)" }}>{addon}</span>)}
          </div>
        </section>
      )}

      {selectedPlan && <PackageModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </>
  );
}
