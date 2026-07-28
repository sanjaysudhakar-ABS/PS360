import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const proofPoints = [
  "Post-sales is all we do — onboarding through renewal",
  "Run by operators, hands-on through implementation",
  "Start with a free 3-minute diagnostic",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, rgba(200,150,62,0.35), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80 uppercase">
            Customer Experience &amp; Success Consulting
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Transform customer experience into competitive advantage.
          </h1>
          <p className="mt-6 text-lg text-white/70">
            {siteConfig.name} helps growing businesses build exceptional
            post-sales experiences that drive retention, growth, and
            profitability — across onboarding, customer success, support
            operations, and renewals.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-400"
            >
              Start your transformation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore services
            </Link>
          </div>

          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {proofPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-400" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
