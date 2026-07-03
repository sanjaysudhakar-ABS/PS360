export const siteConfig = {
  name: "PS360",
  legalName: "PS360 Consulting LLP",
  tagline: "360-Degree Business Advisory",
  description:
    "PS360 is a full-service business consulting firm helping ambitious SMEs and growing enterprises plan smarter, operate leaner, and scale faster with strategy, financial advisory, HR, operations, and digital transformation expertise under one roof.",
  shortDescription:
    "Full-service business consulting for strategy, finance, HR, operations, and digital transformation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ps360.com",
  ogImageAlt: "PS360 — 360-Degree Business Advisory",

  // TODO: replace with real contact details before launch.
  contact: {
    phoneDisplay: "+1 (555) 360-0360",
    phoneE164: "+15553600360",
    whatsapp: "15553600360",
    email: "hello@ps360.com",
    addressLine1: "100 Advisory Way, Suite 360",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78701",
    addressCountry: "US",
  },

  // Set NEXT_PUBLIC_CALENDLY_URL to your real Calendly scheduling link to enable the embed.
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",

  social: {
    linkedin: "https://www.linkedin.com/company/ps360",
    twitter: "https://twitter.com/ps360",
    facebook: "https://www.facebook.com/ps360",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  stats: [
    { value: "180+", label: "Clients advised" },
    { value: "12", label: "Years in business" },
    { value: "$420M+", label: "Client value unlocked" },
    { value: "94%", label: "Client retention rate" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
