"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/app/actions";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

const initialState: ContactFormState = { status: "idle" };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

export function ContactForm({
  defaultService,
}: {
  defaultService?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <h3 className="text-lg font-semibold text-brand-950">
          Message sent
        </h3>
        <p className="text-sm text-brand-800">
          {state.message ??
            "Thanks — we'll get back to you within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot field, hidden from real users via CSS */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-900">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
          />
          <FieldError message={state.fieldErrors?.name} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-900">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
          />
          <FieldError message={state.fieldErrors?.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-900">
            Phone <span className="text-brand-800/50">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-brand-900">
            Company <span className="text-brand-800/50">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className="mt-1.5 w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-brand-900">
          What do you need help with?
        </label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService ?? ""}
          className="mt-1.5 w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        >
          <option value="">General inquiry</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-900">
          Tell us about your business
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        />
        <FieldError message={state.fieldErrors?.message} />
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs text-brand-800/60">
        {`By submitting, you agree to be contacted by ${siteConfig.name} about your inquiry. We don't share your information with third parties.`}
      </p>
    </form>
  );
}
