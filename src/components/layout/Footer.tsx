import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services-data";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-brand-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-500 text-sm font-bold tracking-tight text-white">
                360
              </span>
              <span className="text-lg font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-6 space-y-1 text-sm text-white/70">
              <p>
                <a
                  href={`tel:${siteConfig.contact.phoneE164}`}
                  className="hover:text-accent-400"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-accent-400"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                {siteConfig.contact.addressLine1}, {siteConfig.contact.addressLocality},{" "}
                {siteConfig.contact.addressRegion} {siteConfig.contact.postalCode}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/70 hover:text-accent-400"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/70 hover:text-accent-400">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-white/70 hover:text-accent-400">
                  All services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/70 hover:text-accent-400">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/70 hover:text-accent-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href={siteConfig.social.linkedin} className="hover:text-accent-400">
              LinkedIn
            </a>
            <a href={siteConfig.social.twitter} className="hover:text-accent-400">
              Twitter
            </a>
            <a href={siteConfig.social.facebook} className="hover:text-accent-400">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
