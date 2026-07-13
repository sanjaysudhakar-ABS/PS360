import type { Metadata } from "next";
import { DiagnosticQuiz } from "@/components/diagnostic/DiagnosticQuiz";
import { BreadcrumbJsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Post-Sales Health Diagnostic — Free 3-Minute Assessment",
  description:
    "15 questions, 3 minutes: score your post-sales customer experience across onboarding, support, escalations, retention, and feedback — and see exactly where to start improving.",
  alternates: { canonical: "/diagnostic" },
};

export default function DiagnosticPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Diagnostic", url: `${siteConfig.url}/diagnostic` },
        ]}
      />

      {/*
        Netlify Forms detection: the interactive form only renders after the
        quiz completes, so it never appears in the deploy-time HTML Netlify
        scans. This hidden static twin (same name + fields) registers the
        form so client-side submissions are accepted.
      */}
      <form name="diagnostic" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="diagnostic" />
        <input name="bot-field" type="text" />
        <input name="name" type="text" />
        <input name="email" type="email" />
        <input name="company" type="text" />
        <input name="stage" type="text" />
        <input name="score" type="text" />
        <input name="band" type="text" />
        <input name="pillars" type="text" />
        <input name="pain_points" type="text" />
        <input name="pain_points_other" type="text" />
      </form>

      <section className="bg-brand-950/[0.02] py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
            How healthy is your post-sales experience?
          </h1>
          <p className="mt-4 text-lg text-brand-800/70">
            Score yourself across the five pillars that decide whether
            customers renew — and see exactly where to start improving.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <DiagnosticQuiz />
        </div>
      </section>
    </>
  );
}
