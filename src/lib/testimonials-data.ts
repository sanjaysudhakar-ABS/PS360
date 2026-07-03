export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// TODO: replace with real client testimonials (with permission) before
// featuring named quotes. These are illustrative placeholders.
export const testimonials: Testimonial[] = [
  {
    quote:
      "PS360 rebuilt our onboarding journey around time-to-first-value. Activation in the first 30 days jumped visibly within one quarter, and our renewal conversations got a lot easier.",
    name: "Head of Customer Success",
    role: "",
    company: "B2B SaaS scale-up",
  },
  {
    quote:
      "They didn't hand us a deck and leave. They sat with our support leads, redesigned the queues, and coached the team until the new SLAs held on their own.",
    name: "Support Operations Lead",
    role: "",
    company: "Fintech platform",
  },
  {
    quote:
      "The churn diagnostic was uncomfortable reading — in the best way. For the first time we knew which cancellations were preventable and exactly which plays to run.",
    name: "Chief Operating Officer",
    role: "",
    company: "E-commerce subscription brand",
  },
];
