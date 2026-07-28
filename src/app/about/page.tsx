import type { Metadata } from "next";
import { Target, Users, Zap, TrendingUp } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "PS360 Consulting is a team of experienced customer experience and success professionals helping businesses build exceptional customer relationships since 2020.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Target,
    title: "Results-oriented",
    description:
      "Every recommendation is tied to measurable business outcomes and ROI — retention, expansion, and lifetime value, not vanity metrics.",
  },
  {
    icon: Users,
    title: "Customer-centric",
    description:
      "We put customers at the center of everything we design and implement, because experience is what they remember after the invoice is paid.",
  },
  {
    icon: Zap,
    title: "Practical approach",
    description:
      "Our solutions are designed for real-world implementation and sustainable adoption — built to survive contact with your actual team and tooling.",
  },
  {
    icon: TrendingUp,
    title: "Continuous improvement",
    description:
      "Customer expectations don't stand still, and neither should your experience. We build measurement and iteration into everything we deliver.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` },
        ]}
      />

      <section className="bg-brand-950/[0.02] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight text-brand-950 sm:text-5xl">
            About {siteConfig.name}
          </h1>
          <p className="mt-5 text-lg text-brand-800/70">
            We&apos;re a team of experienced customer experience and success
            professionals dedicated to helping businesses build exceptional
            customer relationships.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-950">
            Our story
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-brand-900/90">
            <p>
              Founded in 2020, {siteConfig.name} emerged from a simple
              observation: while companies invest heavily in acquiring
              customers, most of the growth they lose leaks out{" "}
              <em>after</em> the sale — in stalled onboarding, overwhelmed
              support queues, and renewals nobody owned until it was too
              late.
            </p>
            <p>
              Our background is operational, not theoretical. Before
              consulting, we ran the functions we now advise on — customer
              experience, customer success, and support operations — inside
              tech and non-tech businesses, from early-stage teams to
              established companies. That&apos;s why every engagement pairs
              strategy with hands-on implementation: we&apos;ve lived the
              difference between a recommendation deck and a process that
              actually holds up on a bad week.
            </p>
            <p>
              We work with growing businesses in fintech, e-commerce, SaaS,
              and other service-led industries. We&apos;re based in India and
              serve clients globally, running engagements remotely across
              time zones.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-950/[0.02] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            Our values
          </h2>
          <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
            Principles that shape every engagement
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="flex gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-950 text-white">
                  <value.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-950">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-800/70">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
