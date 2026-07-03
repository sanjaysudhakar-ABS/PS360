"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-brand-950"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-black/5 bg-white px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-brand-900"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-base font-medium text-brand-900"
            >
              {siteConfig.contact.email}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-md bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Book a Consult
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
