import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { caseStudies, getCaseStudyBySlug } from "@/lib/case-studies-data";
import { getServiceBySlug } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/StructuredData";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      title: cs.title,
      description: cs.summary,
      url: `${siteConfig.url}/case-studies/${cs.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    notFound();
  }

  const relatedServices = cs.services
    .map(getServiceBySlug)
    .filter((s) => s !== undefined);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
          { name: cs.title, url: `${siteConfig.url}/case-studies/${cs.slug}` },
        ]}
      />

      <section className="bg-brand-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <nav className="text-sm text-white/50">
            <Link href="/case-studies" className="hover:text-white">
              Case Studies
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{cs.industry}</span>
          </nav>
          <p className="mt-6 text-xs font-medium uppercase tracking-wide text-accent-400">
            {cs.client}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {cs.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">{cs.summary}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {cs.results.map((result) => (
              <div
                key={result.metric}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-3xl font-semibold text-accent-400">
                  {result.metric}
                </p>
                <p className="mt-1 text-sm text-white/70">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/40">
            Illustrative scenario drawn from our team&apos;s operating
            experience — details are representative, not a named client
            account.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-950">
            The challenge
          </h2>
          <p className="mt-4 leading-relaxed text-brand-900/90">
            {cs.challenge}
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-950">
            What we did
          </h2>
          <ul className="mt-5 space-y-4">
            {cs.approach.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                <span className="text-brand-800/80">{item}</span>
              </li>
            ))}
          </ul>

          {relatedServices.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-950">
                Services used
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-brand-900 transition hover:border-accent-500 hover:text-accent-500"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="mt-14 rounded-xl border border-black/10 bg-brand-950/[0.02] p-7">
            <p className="font-semibold text-brand-950">
              Facing a similar challenge?
            </p>
            <p className="mt-2 text-sm text-brand-800/70">
              Book a free consultation and we&apos;ll share how we&apos;d
              approach it in your context.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-500"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
