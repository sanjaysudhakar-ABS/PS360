import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for the PS360 Consulting website and consulting services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-brand-800/60">
          Last updated: October 11, 2024
        </p>

        <div className="blog-prose mt-8">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>

          <h2>Services</h2>
          <p>
            {siteConfig.legalName} provides customer experience and success
            consulting services. The specific terms of each engagement will be
            outlined in a separate service agreement.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The content, organization, graphics, design, compilation, magnetic
            translation, digital conversion and other matters related to the
            site are protected under applicable copyrights, trademarks and
            other proprietary rights.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            {siteConfig.legalName} shall not be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses.
          </p>

          <h2>Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
