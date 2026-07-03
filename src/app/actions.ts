"use server";

import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services-data";

const serviceSlugs = services.map((service) => service.slug) as [
  string,
  ...string[],
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  service: z.union([z.enum(serviceSlugs), z.literal("")]).optional(),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)."),
  // Honeypot field: real users never fill this in.
  website: z.string().max(0).optional().or(z.literal("")),
});

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    service: formData.get("service")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // Honeypot tripped — silently report success without sending anything.
  if (parsed.data.website) {
    return { status: "success" };
  }

  const { name, email, phone, company, service, message } = parsed.data;
  const serviceName =
    services.find((s) => s.slug === service)?.name ?? "General inquiry";

  const resendApiKey = process.env.RESEND_API_KEY;
  const leadNotificationEmail =
    process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.contact.email;

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: `${siteConfig.name} Website <onboarding@resend.dev>`,
        to: leadNotificationEmail,
        replyTo: email,
        subject: `New lead: ${name} — ${serviceName}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Company: ${company || "—"}`,
          `Service: ${serviceName}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      });
    } catch (error) {
      console.error("Failed to send contact form email via Resend:", error);
      return {
        status: "error",
        message:
          "Something went wrong sending your message. Please email us directly or try again shortly.",
      };
    }
  } else {
    // No email provider configured — log the lead so it isn't silently lost during development.
    console.info("[contact form submission — RESEND_API_KEY not set]", {
      name,
      email,
      phone,
      company,
      serviceName,
      message,
    });
  }

  return {
    status: "success",
    message:
      "Thanks — your message has been sent. We'll get back to you within one business day.",
  };
}
