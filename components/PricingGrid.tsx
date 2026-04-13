"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

export interface PricingPlan {
  _id: string;
  name: string;
  tagline: string;
  price: string;
  priceNGN?: string;
  accentColor?: string;
  featured: boolean;
  features: string[];
  notIncluded?: string[];
}

export default function PricingGrid({ plans }: { plans: PricingPlan[] }) {
  const [currency, setCurrency] = useState<"USD" | "NGN">("NGN");

  return (
    <>
      {/* Currency toggle */}
      <div className="flex justify-center mb-14">
        <div
          className="inline-flex items-center rounded-full p-1"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          {(["NGN", "USD"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                currency === c
                  ? { background: "var(--acc)", color: "var(--acc-fg)" }
                  : { color: "var(--mut)" }
              }
            >
              {c === "NGN" ? "₦ Naira" : "$ USD"}
            </button>
          ))}
        </div>
      </div>

      {/* Plans grid — 3 + 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        {plans.map((plan) => {
          const accent = plan.accentColor ?? "#787878";
          const displayPrice =
            currency === "NGN"
              ? plan.priceNGN
                ? `₦${plan.priceNGN}`
                : "—"
              : `$${plan.price}`;

          return (
            <div
              key={plan._id}
              className="relative rounded-2xl p-8 flex flex-col"
              style={{
                background: plan.featured ? "var(--surf2)" : "var(--surf)",
                border: `1px solid ${plan.featured ? accent : "var(--bdr)"}`,
                boxShadow: plan.featured ? `0 0 40px -10px ${accent}25` : "none",
              }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
                  >
                    Most popular
                  </span>
                </div>
              )}

              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: accent }}>
                {plan.name}
              </p>
              <p className="text-sm mb-6 leading-relaxed flex-none" style={{ color: "var(--mut)" }}>
                {plan.tagline}
              </p>

              <div className="mb-8 pb-8" style={{ borderBottom: "1px solid var(--bdr)" }}>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold" style={{ color: "var(--txt)" }}>
                    {displayPrice}
                  </span>
                </div>
                <span className="text-xs mt-1 block" style={{ color: "var(--dim)" }}>
                  per project
                </span>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "var(--mut)" }}>
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: accent }} />
                    {f}
                  </li>
                ))}
                {plan.notIncluded?.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm line-through" style={{ color: "var(--dim)" }}>
                    <span
                      className="w-3.5 h-3.5 mt-0.5 shrink-0 rounded-full border flex items-center justify-center"
                      style={{ borderColor: "var(--bdr)" }}
                    >
                      <span className="w-1 h-px" style={{ background: "var(--dim)" }} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="block w-full text-center py-3.5 rounded-xl text-sm font-medium hover:opacity-90"
                style={
                  plan.featured
                    ? { background: "var(--acc)", color: "var(--acc-fg)" }
                    : { background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }
                }
              >
                Get started
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
