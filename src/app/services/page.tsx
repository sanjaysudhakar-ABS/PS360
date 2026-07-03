import type { Metadata } from "next";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Business Consulting Services",
  description:
    "Explore PS360's full range of business consulting services: strategy, financial advisory, HR, digital transformation, operations, and risk & compliance.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Services", url: `${siteConfig.url}/services` },
        ]}
      />
      <section className="bg-brand-950/[0.02] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight text-brand-950 sm:text-5xl">
            Our services
          </h1>
          <p className="mt-5 text-lg text-brand-800/70">
            Six practice areas, each led by senior consultants who stay
            involved from diagnostic through implementation.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ServicesGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
