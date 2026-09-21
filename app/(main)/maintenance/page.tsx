import type { Metadata } from "next";
import MaintenancePlans from "@/components/MaintenancePlans";

export const metadata: Metadata = {
  title: "Maintenance & Support | Feranmi Ojediji",
  description: "Ongoing website maintenance and technical support plans — bug fixes, infrastructure troubleshooting, and small technical changes to keep your platform running smoothly.",
  alternates: { canonical: "https://www.feranmiojediji.com/maintenance" },
  openGraph: {
    title: "Maintenance & Support | Feranmi Ojediji",
    description: "Ongoing website maintenance and technical support plans to keep your platform running smoothly.",
    url: "https://www.feranmiojediji.com/maintenance",
    images: [{ url: "/feranmi.jpg", width: 1200, height: 630, alt: "Feranmi Ojediji" }],
  },
  twitter: { card: "summary_large_image", title: "Maintenance & Support | Feranmi Ojediji", images: ["/feranmi.jpg"] },
};

const supportTerms = [
  "Support requests are acknowledged per the response time listed on your plan.",
  "Resolution time depends on the complexity of the issue and any third-party service involved.",
  "Critical production issues will be prioritized where reasonably possible.",
  "This is not a 24/7 emergency support service.",
];

export default function Maintenance() {
  return (
    <div className="pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
          >
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--mut)" }}>
              Maintenance Plans
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-5" style={{ color: "var(--txt)" }}>
            Keep your platform running smoothly
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--mut)" }}>
            Ongoing technical support, troubleshooting and maintenance after handover — pick a plan and pay on the billing cycle that works for you.
          </p>
        </div>

        <MaintenancePlans />

        {/* Third-party services */}
        <section
          className="mx-auto mb-10 mt-10 max-w-4xl rounded-2xl p-6 sm:mb-14 sm:mt-14 sm:p-7"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <h2 className="mb-2 text-base font-semibold" style={{ color: "var(--txt)" }}>Third-Party Services</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--mut)" }}>
            You remain responsible for the cost and management of third-party services including hosting, database,
            video storage, email services, payment processing, domains, DNS, Cloudflare and other subscriptions.
          </p>
        </section>

        {/* Support terms */}
        <section className="mx-auto mb-10 max-w-4xl sm:mb-14">
          <h2 className="mb-5 text-base font-semibold" style={{ color: "var(--txt)" }}>Support</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {supportTerms.map((term) => (
              <li
                key={term}
                className="rounded-2xl p-4 text-sm leading-relaxed"
                style={{ background: "var(--surf)", border: "1px solid var(--bdr)", color: "var(--mut)" }}
              >
                {term}
              </li>
            ))}
          </ul>
        </section>

        {/* Payment terms */}
        <section
          className="mx-auto max-w-4xl rounded-2xl p-6 sm:p-7"
          style={{ background: "var(--surf)", border: "1px solid var(--bdr)" }}
        >
          <h2 className="mb-2 text-base font-semibold" style={{ color: "var(--txt)" }}>Payment</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--mut)" }}>
            Maintenance begins after your chosen plan has been paid for. New development or work outside the scope of
            your plan will be separately quoted.
          </p>
        </section>
      </div>
    </div>
  );
}
