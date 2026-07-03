import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services-data";

export function ServicesGrid({ limit }: { limit?: number }) {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group flex flex-col rounded-xl border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-950/5 text-brand-950">
            <service.icon className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-brand-950">
            {service.name}
          </h3>
          <p className="mt-2 text-sm text-brand-800/70">
            {service.shortDescription}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-500">
            Learn more
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
