"use client";

import { useRef, useState } from "react";
import { billingCycles, formatNaira, MIN_MONTHS, plans, type MaintenancePlan } from "@/lib/maintenance";

const WHATSAPP_NUMBER = "2349167802170";

function whatsappLink(plan: MaintenancePlan, months: number) {
  const cycle = billingCycles.find((c) => c.months === months)!;
  const total = plan.monthlyPrice * months;
  const message = `Hi Feranmi, I'd like to start the ${plan.name} maintenance plan (${formatNaira(
    plan.monthlyPrice,
  )}/month, billed ${cycle.label.toLowerCase()}: ${formatNaira(total)} total).`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ChooseButton({ plan, months, dark }: { plan: MaintenancePlan; months: number; dark?: boolean }) {
  return (
    <a
      href={whatsappLink(plan, months)}
      target="_blank"
      rel="noreferrer"
      className={`focus-ring group inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-[0.9375rem] font-medium transition-colors ${
        dark ? "bg-cream text-brand hover:bg-white" : "bg-brand text-cream hover:bg-brand/90"
      }`}
    >
      Choose {plan.name}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
        →
      </span>
    </a>
  );
}

/** "See full details": the plan's complete feature list, grouped by category, in a native modal dialog. */
function DetailsDialog({ plan, months, dialogRef }: { plan: MaintenancePlan; months: number; dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${plan.id}-details-title`}
      // Clicking the backdrop (the dialog element itself, outside the panel) closes it.
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      className="m-auto max-h-[min(90svh,48rem)] w-[min(100%-2rem,40rem)] overflow-hidden rounded-2xl bg-canvas p-0 text-ink backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[min(90svh,48rem)] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
          <div>
            <h3 id={`${plan.id}-details-title`} className="text-xl font-medium tracking-[-0.02em]">
              {plan.name} plan
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              {formatNaira(plan.monthlyPrice)}/month · {plan.responseTime.toLowerCase()}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="focus-ring -mr-2 grid size-10 shrink-0 place-items-center rounded-full text-xl text-ink-soft hover:text-ink"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <dl className="space-y-6">
            {plan.details.map((g) => (
              <div key={g.category}>
                <dt className="text-xs uppercase tracking-[0.06em] text-ink-soft">{g.category}</dt>
                <dd>
                  <ul className="mt-3 space-y-2.5">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed">
                        <span aria-hidden className="mt-[0.55rem] h-px w-3 shrink-0 bg-ink/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-line px-6 py-5 sm:px-8">
          <div className="grid">
            <ChooseButton plan={plan} months={months} />
          </div>
        </div>
      </div>
    </dialog>
  );
}

function PlanCard({ plan, months }: { plan: MaintenancePlan; months: number }) {
  const dark = plan.recommended;
  const total = plan.monthlyPrice * months;
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <article
      className={`relative flex flex-col rounded-2xl p-6 sm:p-8 ${
        dark ? "bg-brand text-cream" : "border border-line bg-canvas"
      }`}
    >
      {dark && <div aria-hidden className="bg-stage-grid absolute inset-0 rounded-2xl opacity-70" />}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-medium tracking-[-0.02em]">{plan.name}</h3>
          {dark && (
            <span className="rounded-md bg-cream px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-brand">
              Most popular
            </span>
          )}
        </div>
        <p className={`mt-2 min-h-[3em] max-w-[36ch] text-[0.9375rem] leading-relaxed ${dark ? "text-cream/70" : "text-ink-soft"}`}>
          {plan.tagline}
        </p>

        <p className="mt-6 text-[2.5rem] font-medium leading-none tracking-[-0.045em] sm:text-[3rem]">
          {formatNaira(plan.monthlyPrice)}
          <span className={`text-base font-medium tracking-normal ${dark ? "text-cream/60" : "text-ink-soft"}`}>
            {" "}
            /month
          </span>
        </p>
        <p className={`mt-3 h-5 text-sm ${dark ? "text-cream/60" : "text-ink-soft"}`}>
          {months > 1 ? `${formatNaira(total)} billed upfront for ${months} months` : "Billed monthly"}
        </p>

        <p className={`mt-6 flex items-center gap-2 border-y py-4 text-sm ${dark ? "border-cream/15" : "border-line"}`}>
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-live" />
          {plan.responseTime}
        </p>

        <ul className="mt-6 flex flex-1 flex-col gap-3">
          {plan.highlights.map((item) => (
            <li
              key={item}
              className={`flex items-start gap-3 text-[0.9375rem] leading-relaxed ${dark ? "text-cream/80" : "text-ink-soft"}`}
            >
              <span aria-hidden className={`mt-[0.55rem] h-px w-3 shrink-0 ${dark ? "bg-cream/50" : "bg-ink/40"}`} />
              {item}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className={`focus-ring mt-6 self-start text-sm font-medium underline underline-offset-4 ${
            dark ? "decoration-cream/40 hover:decoration-cream" : "decoration-ink/30 hover:decoration-ink"
          }`}
        >
          See full details
        </button>

        <div className="mt-6 grid">
          <ChooseButton plan={plan} months={months} dark={dark} />
        </div>
      </div>

      <DetailsDialog plan={plan} months={months} dialogRef={dialogRef} />
    </article>
  );
}

export default function MaintenancePlans() {
  const [months, setMonths] = useState(MIN_MONTHS);
  const from = Math.min(...plans.map((p) => p.monthlyPrice));

  return (
    <div>
      {/* Billing cycle: one switch for all plans. */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-7">
        <div>
          <p id="billing-label" className="text-sm font-medium">
            Billing cycle
          </p>
          <p className="mt-0.5 text-sm text-ink-soft">
            From {formatNaira(from)}/month · {MIN_MONTHS} month minimum
          </p>
        </div>
        <div
          role="radiogroup"
          aria-labelledby="billing-label"
          className="grid w-full grid-cols-4 rounded-lg border border-line p-1 sm:inline-flex sm:w-auto"
        >
          {billingCycles.map((c) => {
            const active = c.months === months;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setMonths(c.months)}
                className={`focus-ring h-9 rounded-md px-1 text-[0.8125rem] font-medium whitespace-nowrap transition-colors sm:px-4 sm:text-sm ${
                  active ? "bg-brand text-cream" : "text-ink-soft hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div data-reveal-stagger className="grid gap-3 px-2 pb-2 sm:px-3 sm:pb-3 lg:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} months={months} />
        ))}
      </div>
    </div>
  );
}
