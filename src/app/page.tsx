import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />

      <section className="bg-brand-950/[0.02] py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-brand-950 px-7 py-7 text-white sm:flex-row sm:items-center sm:px-9">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-400">
                Free 3-minute assessment
              </p>
              <p className="mt-1.5 text-xl font-semibold tracking-tight">
                How healthy is your post-sales experience?
              </p>
              <p className="mt-1 text-sm text-white/60">
                15 questions, instant score across the five pillars that
                decide whether customers renew.
              </p>
            </div>
            <Link
              href="/diagnostic"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-400"
            >
              Take the diagnostic
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-500">
                Our expertise
              </h2>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
                Consulting for every stage of the post-sales journey.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
