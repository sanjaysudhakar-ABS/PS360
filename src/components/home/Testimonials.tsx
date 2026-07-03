import { Quote } from "lucide-react";
import { testimonials } from "@/lib/testimonials-data";

export function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-500">
          Client results
        </h2>
        <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
          What it&apos;s like to work with us
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-xl border border-black/10 bg-brand-950/[0.02] p-7"
            >
              <Quote className="h-6 w-6 text-accent-500" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-900">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold text-brand-950">
                  {testimonial.name}
                </span>
                <span className="text-brand-800/60">
                  {" "}
                  — {testimonial.role}, {testimonial.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
