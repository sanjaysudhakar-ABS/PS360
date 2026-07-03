export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// TODO: replace with real client testimonials before launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      "PS360 turned an overwhelming list of priorities into a plan we could actually execute. Revenue is up 34% since we implemented their growth roadmap.",
    name: "Alexandra Reyes",
    role: "CEO",
    company: "Northfield Retail Group",
  },
  {
    quote:
      "Their fractional CFO support gave our board the reporting discipline we needed to close our Series A three months ahead of schedule.",
    name: "Marcus Chen",
    role: "Founder",
    company: "Loopwave Logistics",
  },
  {
    quote:
      "We went from reactive hiring to a real org design in under two quarters. The HR playbooks alone paid for the engagement.",
    name: "Priya Nathan",
    role: "COO",
    company: "Bridgeline Manufacturing",
  },
];
