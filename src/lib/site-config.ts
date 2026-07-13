export const siteConfig = {
  name: "PS360 Consulting",
  legalName: "PS360 Consulting",
  tagline: "Customer Experience & Success Consulting",
  description:
    "Transform your customer experience with PS360 Consulting. Expert CX strategy, customer success management, and support operations consulting services.",
  shortDescription:
    "Customer experience and customer success consulting — CX strategy, customer success management, and support operations.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ps360.in",
  foundingYear: "2020",
  locale: "en-IN",

  contact: {
    email: "hello@ps360.in",
    location: "Based in India, serving clients globally",
    addressCountry: "IN",
    // Optional direct-contact channels. Leave empty to hide the
    // click-to-call / WhatsApp buttons; fill in to enable them.
    phoneDisplay: "",
    phoneE164: "",
    whatsapp: "",
  },

  // Calendly scheduling link (env var overrides for other environments).
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/sanjay-sudhakar/new-meeting",

  analytics: {
    ga4Id: "G-NQ7NRH7XNY",
    adsenseClient: "ca-pub-5101218278922497",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/ps360-consulting",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Diagnostic", href: "/diagnostic" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  // Headline numbers published on the current ps360.in site.
  stats: [
    { value: "50+", label: "Companies transformed" },
    { value: "40%", label: "Average CSAT improvement" },
    { value: "$10M+", label: "Client revenue impact" },
    { value: "2020", label: "Founded" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
