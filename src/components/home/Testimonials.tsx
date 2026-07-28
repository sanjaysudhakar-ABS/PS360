import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { prospectVoices } from "@/lib/testimonials-data";

export function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-500">
          Sound familiar?
        </h2>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
          The problems leaders bring to us
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {prospectVoices.map((voice) => (
            <figure
              key={voice.company}
              className="flex flex-col rounded-xl border border-black/10 bg-brand-950/[0.02] p-7"
            >
              <Quote className="h-6 w-6 text-accent-500" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-900">
                &ldquo;{voice.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold text-brand-950">
                  {voice.name}
                </span>
                <span className="text-brand-800/60">
                  {" "}
                  — {[voice.role, voice.company].filter(Boolean).join(", ")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-brand-800/50">
            Paraphrased and anonymized from first conversations with
            prospective clients.
          </p>
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-500"
          >
            Recognize your team? Take the 3-minute diagnostic
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
