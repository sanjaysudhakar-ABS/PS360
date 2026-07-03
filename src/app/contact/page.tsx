import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with PS360 for a free 30-minute business consulting consult. Call, WhatsApp, book online, or send us a message.",
  alternates: { canonical: "/contact" },
};

const contactMethods = [
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.contact.phoneDisplay,
    href: `tel:${siteConfig.contact.phoneE164}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us instantly",
    href: `https://wa.me/${siteConfig.contact.whatsapp}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    label: "Office",
    value: `${siteConfig.contact.addressLine1}, ${siteConfig.contact.addressLocality}, ${siteConfig.contact.addressRegion}`,
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
            Let&apos;s talk about your business
          </h1>
          <p className="mt-5 text-lg text-brand-800/70">
            Book a free 30-minute consult, or reach us directly by phone,
            WhatsApp, or email — whichever is fastest for you.
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
                Send us a message
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
            Pick a 30-minute slot that works for you — no back-and-forth
            emails required.
          </p>
          <div className="mt-6">
            <CalendlyEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
