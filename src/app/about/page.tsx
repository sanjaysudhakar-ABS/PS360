import type { Metadata } from "next";
import { Users2, Target, ShieldCheck, Handshake } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "PS360 is a 360-degree business advisory firm helping SMEs and growing enterprises across strategy, finance, HR, operations, and technology.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Target,
    title: "Outcomes over hours",
    description:
      "We measure success by the results our clients see, not the hours we bill. Every engagement starts with a clear definition of what 'done' looks like.",
  },
  {
    icon: Handshake,
    title: "Transparent, fixed-scope pricing",
    description:
      "No open-ended retainers you can't evaluate. Every engagement starts with a scoped diagnostic and clear pricing before you commit further.",
  },
  {
    icon: Users2,
    title: "Senior talent, every engagement",
    description:
      "The consultants who scope your engagement are the ones doing the work — not a hand-off to a junior team after the contract is signed.",
  },
  {
    icon: ShieldCheck,
    title: "Practical, not theoretical",
    description:
      "We've run operations, not just advised on them. Recommendations are built to survive contact with your actual team and constraints.",
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
            A single advisory partner for the whole business
          </h1>
          <p className="mt-5 text-lg text-brand-800/70">
            {siteConfig.name} was founded on a simple observation: growing
            businesses don&apos;t have a strategy problem, a finance problem,
            or an HR problem in isolation — they have a business problem
            that touches all of them at once. We built a firm that advises
            across the full 360-degree view instead of forcing clients to
            stitch together five specialist vendors.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            How we operate
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
