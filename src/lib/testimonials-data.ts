export interface ProspectVoice {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// Anonymized paraphrases of the problems leaders describe in first
// conversations with us — presented on the site as such, not as client
// endorsements. Swap in real, approved testimonials when available.
export const prospectVoices: ProspectVoice[] = [
  {
    quote:
      "Our CSMs are busy all day — kickoffs, check-ins, QBRs — and accounts still churn without warning. We only find out an account was in trouble when the cancellation email arrives.",
    name: "Head of Customer Success",
    role: "",
    company: "B2B SaaS scale-up",
  },
  {
    quote:
      "Every quarter we add support headcount, and every quarter response times get worse. Everything critical lives in two people's heads, and one of them just resigned.",
    name: "Support Operations Lead",
    role: "",
    company: "Fintech platform",
  },
  {
    quote:
      "Customers love us at the demo and go quiet after the first delivery. We spend a fortune acquiring them and have no idea why the second order never comes.",
    name: "Chief Operating Officer",
    role: "",
    company: "E-commerce subscription brand",
  },
];
