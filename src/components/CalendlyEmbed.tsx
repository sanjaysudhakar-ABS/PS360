"use client";

import Script from "next/script";
import { CalendarClock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function CalendlyEmbed() {
  if (!siteConfig.calendlyUrl) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-black/15 bg-brand-950/[0.02] p-10 text-center">
        <CalendarClock className="h-9 w-9 text-accent-500" />
        <h3 className="text-lg font-semibold text-brand-950">
          Prefer to pick a time yourself?
        </h3>
        <p className="max-w-sm text-sm text-brand-800/70">
          Online scheduling isn&apos;t connected yet. Set{" "}
          <code className="rounded bg-black/5 px-1 py-0.5 text-xs">
            NEXT_PUBLIC_CALENDLY_URL
          </code>{" "}
          to your Calendly link to enable instant booking here — in the
          meantime, use the form or call us directly.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-black/10">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div
        className="calendly-inline-widget"
        data-url={siteConfig.calendlyUrl}
        style={{ minWidth: "280px", height: "700px" }}
      />
    </div>
  );
}
