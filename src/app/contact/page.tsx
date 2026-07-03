import type { Metadata } from "next";
import type { SVGProps } from "react";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Ready to transform your customer experience? Contact PS360 Consulting to book a consultation — we respond within 24 hours.",
  alternates: { canonical: "/contact" },
};

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "PS360 Consulting",
    href: siteConfig.social.linkedin,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.contact.location,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Contact", url: `${siteConfig.url}/contact` },
        ]}
      />

      <section className="bg-brand-950/[0.02] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight text-brand-950 sm:text-5xl">
            Let&apos;s talk about your customers
          </h1>
          <p className="mt-5 text-lg text-brand-800/70">
            Ready to transform your customer experience? Fill out the form and
            we&apos;ll get back to you within 24 hours to schedule your
            consultation.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {contactMethods.map((method) => {
                const content = (
                  <div className="flex items-start gap-4 rounded-xl border border-black/10 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-950 text-white">
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-800/60">
                        {method.label}
                      </p>
                      <p className="mt-0.5 font-semibold text-brand-950">
                        {method.value}
                      </p>
                    </div>
                  </div>
                );

                return method.href ? (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block transition hover:-translate-y-0.5"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={method.label}>{content}</div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-xl border border-black/10 p-7">
              <h2 className="text-lg font-semibold text-brand-950">
                Book a consultation
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-950">
            Or book a time directly
          </h2>
          <p className="mt-2 text-sm text-brand-800/70">
            Pick a slot that works for you — no back-and-forth emails
            required.
          </p>
          <div className="mt-6">
            <CalendlyEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
