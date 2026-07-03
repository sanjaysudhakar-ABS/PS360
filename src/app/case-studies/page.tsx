import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore how PS360 Consulting has helped companies transform their customer experience and achieve measurable results in retention, CSAT, and revenue.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Case Studies", url: `${siteConfig.url}/case-studies` },
        ]}
      />

      <section className="bg-brand-950/[0.02] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight text-brand-950 sm:text-5xl">
            Case studies
          </h1>
          <p className="mt-5 text-lg text-brand-800/70">
            Representative engagements showing how we transform post-sales
            experience into measurable business results.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-8 px-6 lg:px-8">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group block rounded-xl border border-black/10 p-8 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-accent-500">
                {cs.industry}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-brand-950 sm:text-2xl">
                {cs.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-800/70">
                {cs.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                {cs.results.map((result) => (
                  <div key={result.metric}>
                    <p className="text-2xl font-semibold text-brand-950">
                      {result.metric}
                    </p>
                    <p className="mt-0.5 max-w-[16rem] text-xs text-brand-800/60">
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-500">
                Read the case study
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
