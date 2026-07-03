import { faqs } from "@/lib/faq-data";
import { FaqJsonLd } from "@/components/StructuredData";

export function FAQSection() {
  return (
    <section className="bg-brand-950/[0.02] py-20 sm:py-24">
      <FaqJsonLd faqs={faqs} />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-500">
          FAQ
        </h2>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
          Common questions
        </p>

        <dl className="mt-10 divide-y divide-black/10 border-t border-black/10">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <dt className="text-base font-semibold text-brand-950">
                {faq.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-brand-800/70">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
