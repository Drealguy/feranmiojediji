import type { Metadata } from "next";
import MaintenancePlans from "@/components/MaintenancePlans";
import { notIncluded, paymentNote, supportTerms, thirdPartyNote } from "@/lib/maintenance";

export const metadata: Metadata = {
  title: "Maintenance & Support | Feranmi Ojediji",
  description:
    "Ongoing website maintenance and technical support plans: bug fixes, infrastructure troubleshooting and small technical changes to keep your platform running smoothly.",
};

function Bar({ id, title, note }: { id?: string; title: string; note?: string }) {
  return (
    <div className="flex h-14 items-center justify-between gap-4 border-y border-line px-4 sm:px-7">
      <h2 id={id} className="text-sm text-ink-soft">
        {title}
      </h2>
      {note && <p className="text-sm text-ink-soft">{note}</p>}
    </div>
  );
}

export default function MaintenancePage() {
  return (
    <>
      <section aria-labelledby="maintenance-heading" className="text-center px-4 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20 lg:px-12">
        <p className="text-sm text-ink-soft">Maintenance &amp; support</p>
        <h1
          id="maintenance-heading"
          data-split-lines
          className="mx-auto mt-5 max-w-[16ch] text-[2.75rem] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[4.5rem]"
        >
          Keep your platform running smoothly.
        </h1>
        <p data-reveal className="mx-auto mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
          Ongoing technical support, troubleshooting and maintenance after handover. Pick a plan and pay on the
          billing cycle that works for you.
        </p>
      </section>

      <section aria-labelledby="plans-heading">
        <Bar id="plans-heading" title="Plans" note="Prices in naira" />
        <MaintenancePlans />
      </section>

      <section aria-labelledby="excluded-heading" className="mt-16 sm:mt-24">
        <Bar id="excluded-heading" title="Not included in either plan" note="Quoted separately" />
        <ul data-reveal-stagger className="grid sm:grid-cols-2 lg:grid-cols-4">
          {notIncluded.map((item) => (
            <li
              key={item}
              className="border-b border-line px-4 py-5 text-[0.9375rem] sm:px-7 sm:odd:border-r lg:border-r lg:[&:nth-child(4n)]:border-r-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="terms-heading" className="mt-16 sm:mt-24">
        <Bar id="terms-heading" title="Terms" />
        <dl className="divide-y divide-line border-b border-line">
          <div className="grid gap-3 px-4 py-8 sm:px-7 md:grid-cols-[16rem_1fr]">
            <dt className="text-[0.9375rem] font-medium">Support</dt>
            <dd>
              <ul className="space-y-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                {supportTerms.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="grid gap-3 px-4 py-8 sm:px-7 md:grid-cols-[16rem_1fr]">
            <dt className="text-[0.9375rem] font-medium">Third party services</dt>
            <dd className="max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-soft">{thirdPartyNote}</dd>
          </div>
          <div className="grid gap-3 px-4 py-8 sm:px-7 md:grid-cols-[16rem_1fr]">
            <dt className="text-[0.9375rem] font-medium">Payment</dt>
            <dd className="max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-soft">{paymentNote}</dd>
          </div>
        </dl>
      </section>

      <div className="h-16 sm:h-24" />
    </>
  );
}
