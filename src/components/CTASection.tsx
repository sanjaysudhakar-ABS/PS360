import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function CTASection() {
  return (
    <section className="bg-brand-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to transform your customer experience?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Book a free consultation with {siteConfig.name} — we&apos;ll give
          you an honest read on where your post-sales experience is losing
          customers, and where to focus first.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-400"
          >
            Book your consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
