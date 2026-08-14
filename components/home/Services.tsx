import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services-data";

export default function Services() {
  return (
    <section className="py-16 sm:py-20" style={{ background: "#050505", color: "#ffffff" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 grid gap-5 sm:mb-14 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest" style={{ color: "#8f8f8f" }}>Services</p>
            <h2 className="max-w-xl text-3xl font-medium leading-tight sm:text-5xl" style={{ color: "#ffffff" }}>
              Focused creative services for brands ready to move forward.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed md:justify-self-end" style={{ color: "#9a9a9a" }}>
            Strategy, identity, and digital execution brought together in one clear process.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.workHref}
              className="group flex min-h-[245px] flex-col justify-between rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#3a3a3a] sm:p-8"
              style={{ background: "#0d0d0d", border: "1px solid #262626" }}
            >
              <div>
                <div className="mb-12 flex items-start justify-between gap-5">
                  <span className="text-xs" style={{ color: "#686868" }}>{service.number}</span>
                  <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: "#8f8f8f" }} />
                </div>
                <h3 className="mb-3 text-2xl font-medium sm:text-3xl" style={{ color: "#ffffff" }}>{service.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed" style={{ color: "#9a9a9a" }}>{service.description}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags?.map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1.5 text-xs" style={{ color: "#a8a8a8", border: "1px solid #2a2a2a" }}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80" style={{ background: "#ffffff", color: "#050505" }}>
            Explore pricing <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
