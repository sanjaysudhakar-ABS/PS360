"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

function validate(fields: {
  name: string;
  email: string;
  message: string;
}): Partial<Record<string, string>> {
  const errors: Partial<Record<string, string>> = {};
  if (fields.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (fields.message.trim().length < 10) {
    errors.message = "Please tell us a little more (10+ characters).";
  }
  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

export function ContactForm({
  defaultService,
}: {
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<string, string>>
  >({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const errors = validate({
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
    });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    try {
      // Netlify Forms: POST url-encoded to any path on the site; Netlify
      // intercepts submissions matching a form it detected at deploy time.
      const body = new URLSearchParams();
      formData.forEach((value, key) => {
        body.append(key, value.toString());
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with ${response.status}`);
      }
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <h3 className="text-lg font-semibold text-brand-950">Message sent</h3>
        <p className="text-sm text-brand-800">
          Thanks — we&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
    >
      {/* Required by Netlify Forms to route the submission. */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot field, hidden from real users. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="bot-field">Don&apos;t fill this out</label>
        <input
          id="bot-field"
          name="bot-field"
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
          <FieldError message={fieldErrors.name} />
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
          <FieldError message={fieldErrors.email} />
        </div>
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
          Tell us about your customer experience challenges
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        />
        <FieldError message={fieldErrors.message} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending your message. Please email us at{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="underline">
            {siteConfig.contact.email}
          </a>{" "}
          or try again shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs text-brand-800/60">
        {`We'll never share your email. By submitting this form, you agree to our `}
        <a href="/privacy/" className="underline hover:text-accent-500">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
