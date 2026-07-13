import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PS360 Consulting collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-brand-800/60">
          Last updated: October 11, 2024
        </p>

        <div className="blog-prose mt-8">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when
            you fill out our contact form, subscribe to our newsletter, or
            communicate with us. This may include your name, email address,
            and any messages you send to us.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide customer service</li>
            <li>Send you information about our services</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except as
            described in this policy or as required by law.
          </p>

          <h2>Analytics</h2>
          <p>
            This site uses Google Analytics to understand how visitors use the
            site. This service may use cookies and similar technologies. You
            can learn more about how Google uses data at{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s privacy policy
            </a>
            .
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your
            personal information against unauthorized access, alteration,
            disclosure, or destruction.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please
            contact us at{" "}
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
