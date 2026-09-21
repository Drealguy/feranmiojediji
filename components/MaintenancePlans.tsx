"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";

const WHATSAPP_NUMBER = "2349167802170";

interface BillingCycle {
  id: string;
  label: string;
  months: number;
}

const billingCycles: BillingCycle[] = [
  { id: "monthly", label: "Monthly (1 Month)", months: 1 },
  { id: "quarterly", label: "Quarterly (3 Months)", months: 3 },
  { id: "biannual", label: "Bi-Annually (6 Months)", months: 6 },
  { id: "annual", label: "Annually (12 Months)", months: 12 },
];

interface MaintenancePlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  responseTime: string;
  recommended?: boolean;
  included: string[];
}

const plans: MaintenancePlan[] = [
  {
    id: "standard",
    name: "Standard",
    tagline: "For sites that need reliable, ongoing upkeep.",
    monthlyPrice: 65000,
    responseTime: "Acknowledged within 1 business day",
    included: [
      "Bug investigation and fixes for existing functionality",
      "Infrastructure troubleshooting",
      "Server, hosting and third-party service checks (Railway, Vercel, Bunny.net, Resend, Stripe, etc.)",
      "Minor technical maintenance",
      "Deployment assistance",
      "Small configuration changes",
      "Basic database maintenance",
      "Technical support via the agreed communication channel",
    ],
  },
  {
    id: "priority",
    name: "Priority",
    tagline: "For businesses that want faster turnaround and a bit more room to grow.",
    monthlyPrice: 150000,
    responseTime: "Acknowledged same business day",
    recommended: true,
    included: [
      "Everything in Standard",
      "Small, scoped feature additions (agreed in advance)",
      "Minor new integrations (agreed in advance)",
      "Extended database maintenance and optimization",
      "Priority queueing for support requests",
    ],
  },
];

const notIncludedEither = [
  "Website redesigns",
  "Major database restructuring",
  "New AI functionality",
  "New payment functionality",
  "Large content uploads",
  "Major infrastructure migrations",
  "Rebuilding or redevelopment",
  "Third-party service fees",
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function BillingCycleSelect({ value, onChange }: { value: BillingCycle; onChange: (cycle: BillingCycle) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm"
        style={{ background: "var(--bg)", color: "var(--txt)", border: "1px solid var(--bdr)" }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{value.label}</span>
        <ChevronDown size={15} className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} style={{ color: "var(--mut)" }} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Billing cycle"
          className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-xl p-1.5 shadow-2xl"
          style={{ background: "var(--surf2)", border: "1px solid var(--bdr)" }}
        >
          {billingCycles.map((cycle) => {
            const isActive = cycle.id === value.id;
            return (
              <button
                key={cycle.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(cycle);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
                style={isActive ? { background: "var(--acc)", color: "var(--acc-fg)" } : { color: "var(--mut)" }}
              >
                <span>{cycle.label}</span>
                {isActive && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PlanCard({ plan }: { plan: MaintenancePlan }) {
  const [cycle, setCycle] = useState<BillingCycle>(billingCycles[0]);
  const [view, setView] = useState<"included" | "excluded">("included");
  const total = plan.monthlyPrice * cycle.months;

  const message = `Hi, I'd like to activate the ${plan.name} maintenance plan (${formatNaira(plan.monthlyPrice)}/month, billed ${cycle.label} — ${formatNaira(total)} total). Please help me get set up.`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <article
      className="relative flex h-full flex-col rounded-2xl p-5 sm:p-7"
      style={{
        background: plan.recommended ? "var(--surf2)" : "var(--surf)",
        border: `1px solid ${plan.recommended ? "var(--acc)" : "var(--bdr)"}`,
      }}
    >
      {plan.recommended && (
        <span
          className="absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-medium"
          style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
        >
          Recommended
        </span>
      )}

      <div className="mb-5 sm:mb-6">
        <p className="mb-1 text-sm font-medium" style={{ color: "var(--txt)" }}>{plan.name}</p>
        <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--mut)" }}>{plan.tagline}</p>
        <p className="text-3xl font-semibold sm:text-4xl" style={{ color: "var(--txt)" }}>
          {formatNaira(plan.monthlyPrice)}
          <span className="text-base font-medium" style={{ color: "var(--mut)" }}> /month</span>
        </p>
      </div>

      <label className="mb-5 block text-xs sm:mb-6">
        <span className="mb-2 block font-medium" style={{ color: "var(--mut)" }}>Billing cycle</span>
        <BillingCycleSelect value={cycle} onChange={setCycle} />
        {cycle.months > 1 && (
          <span className="mt-2 block" style={{ color: "var(--dim)" }}>
            {formatNaira(total)} billed upfront for {cycle.months} months
          </span>
        )}
      </label>

      <div className="mb-5 pb-5 sm:mb-6 sm:pb-6" style={{ borderBottom: "1px solid var(--bdr)" }}>
        <p className="text-xs uppercase tracking-widest" style={{ color: "var(--dim)" }}>{plan.responseTime}</p>
      </div>

      {/* Included / Not included switch */}
      <div
        role="tablist"
        aria-label={`${plan.name} plan scope`}
        className="mb-4 flex w-full gap-1 rounded-xl p-1"
        style={{ background: "var(--bg)", border: "1px solid var(--bdr)" }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={view === "included"}
          onClick={() => setView("included")}
          className="flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
          style={view === "included" ? { background: "var(--acc)", color: "var(--acc-fg)" } : { color: "var(--mut)" }}
        >
          Included
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "excluded"}
          onClick={() => setView("excluded")}
          className="flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
          style={view === "excluded" ? { background: "var(--acc)", color: "var(--acc-fg)" } : { color: "var(--mut)" }}
        >
          Not Included
        </button>
      </div>

      <ul role="tabpanel" className="mb-6 flex flex-1 flex-col gap-2.5 sm:mb-7 sm:gap-3">
        {(view === "included" ? plan.included : notIncludedEither).map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--mut)" }}>
            {view === "included" ? (
              <Check size={15} className="mt-1 shrink-0" style={{ color: "var(--acc)" }} aria-hidden="true" />
            ) : (
              <X size={15} className="mt-1 shrink-0" style={{ color: "var(--dim)" }} aria-hidden="true" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: "var(--acc)", color: "var(--acc-fg)" }}
      >
        Choose {plan.name}<ArrowRight size={15} />
      </a>
    </article>
  );
}

export default function MaintenancePlans() {
  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4 sm:gap-5 md:grid-cols-2">
      {plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
    </div>
  );
}
