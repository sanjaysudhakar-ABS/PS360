import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getServiceBySlug, services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/ContactForm";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
} from "@/components/StructuredData";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.shortDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.shortDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceJsonLd
        name={service.name}
        description={service.description}
        slug={service.slug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
          {
            name: service.name,
            url: `${siteConfig.url}/services/${service.slug}`,
          },
        ]}
      />

      <section className="bg-brand-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <nav className="text-sm text-white/50">
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{service.name}</span>
          </nav>
          <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-lg bg-accent-500">
            <service.icon className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">
            {service.description}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-400"
          >
            Talk to an advisor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-950">
              What you can expect
            </h2>
            <ul className="mt-6 space-y-4">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-brand-800/80">{outcome}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-950">
              How we work
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {service.process.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-black/10 p-6"
                >
                  <span className="text-sm font-semibold text-accent-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-semibold text-brand-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-800/70">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-950">
              Other services
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {services
                .filter((s) => s.slug !== service.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-brand-900 transition hover:border-accent-500 hover:text-accent-500"
                  >
                    {s.name}
                  </Link>
                ))}
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-xl border border-black/10 bg-brand-950/[0.02] p-7">
              <h3 className="text-lg font-semibold text-brand-950">
                Get a free consult
              </h3>
              <p className="mt-2 text-sm text-brand-800/70">
                Tell us about your business and we&apos;ll follow up within
                one business day.
              </p>
              <div className="mt-6">
                <ContactForm defaultService={service.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
