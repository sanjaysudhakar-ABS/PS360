export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What size of business does PS360 typically work with?",
    answer:
      "We primarily work with businesses ranging from early-growth startups to mid-market companies with up to roughly 500 employees — organizations that have outgrown ad-hoc processes but don't yet have a full in-house strategy, finance, or ops function.",
  },
  {
    question: "How long does a typical engagement last?",
    answer:
      "Most engagements start with a 2–4 week scoped diagnostic, followed by a 3–6 month implementation phase. Many clients extend into an ongoing advisory retainer once the initial roadmap is in motion, but there's never an obligation to continue past the diagnostic.",
  },
  {
    question: "Do you work with a specific industry?",
    answer:
      "We work across industries, with the deepest experience in retail, logistics, manufacturing, and B2B services. Our approach is built around company stage and operating model rather than industry vertical alone.",
  },
  {
    question: "What does the first step of working together look like?",
    answer:
      "It starts with a free 30-minute discovery call to understand your priorities and confirm fit. If it makes sense to proceed, we scope a fixed-fee diagnostic so you can evaluate the engagement with minimal risk before any longer-term commitment.",
  },
  {
    question: "Can you support us with a single project instead of a full retainer?",
    answer:
      "Yes. Many clients start with a single, well-defined project — a financial model, an org redesign, a systems audit — before deciding whether an ongoing retainer makes sense.",
  },
];
