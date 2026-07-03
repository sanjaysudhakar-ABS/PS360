export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string[];
  results: { metric: string; description: string }[];
  services: string[];
}

// Anonymized, representative engagements. TODO: replace with named case
// studies once client approval to publish is in place.
export const caseStudies: CaseStudy[] = [
  {
    slug: "fintech-support-turnaround",
    client: "Fintech platform",
    industry: "Fintech",
    title: "Cutting first-response time by two-thirds at a scaling fintech",
    summary:
      "A fast-growing payments platform was drowning in support tickets as transaction volume tripled. We rebuilt their support operation around contact-driver analysis and self-service deflection.",
    challenge:
      "Ticket volume had tripled in a year while the support team only grew 40%. First-response times had stretched past 24 hours, CSAT was sliding, and agents were burning out on repetitive password-reset and KYC-status queries that never should have reached a human.",
    approach: [
      "Analyzed six months of ticket data to identify the top 15 contact drivers, which accounted for over 70% of volume",
      "Built a self-service knowledge base and in-product status indicators targeting the top repetitive drivers",
      "Redesigned queues and SLAs around urgency and customer tier instead of first-in-first-out",
      "Introduced a weekly QA scorecard and coaching cadence for the support team",
    ],
    results: [
      {
        metric: "-67%",
        description: "reduction in first-response time within one quarter",
      },
      {
        metric: "35%",
        description: "of repetitive ticket volume deflected to self-service",
      },
      {
        metric: "+18 pts",
        description: "CSAT improvement over two quarters",
      },
    ],
    services: ["support-desk-operations", "cx-analytics-reporting"],
  },
  {
    slug: "saas-churn-reduction",
    client: "B2B SaaS scale-up",
    industry: "SaaS",
    title: "Rebuilding customer success to lift net revenue retention",
    summary:
      "A B2B SaaS company was losing customers it should have kept — churn was concentrated in accounts that had never fully onboarded. We rebuilt their success function around segmentation, health scoring, and risk playbooks.",
    challenge:
      "Logo churn was running well above benchmark, but the CS team couldn't see it coming: every CSM managed accounts the same way regardless of size or health, and 'success' meant quarterly check-in calls. Post-mortems showed most churned accounts had stalled in their first 90 days and never recovered.",
    approach: [
      "Segmented the book of business into high-touch, mid-touch, and tech-touch tiers with defined coverage models",
      "Built a health score from product usage, support history, and engagement signals",
      "Created lifecycle playbooks — onboarding, adoption, at-risk, renewal — with clear triggers and owners",
      "Redesigned the sales-to-CS handoff so goals captured during the sale carried into onboarding",
    ],
    results: [
      {
        metric: "+12 pts",
        description: "net revenue retention improvement year over year",
      },
      {
        metric: "2×",
        description: "increase in at-risk accounts saved after playbook rollout",
      },
      {
        metric: "-30%",
        description: "reduction in time-to-first-value for new customers",
      },
    ],
    services: ["customer-success-management", "customer-onboarding", "retention-churn-reduction"],
  },
  {
    slug: "ecommerce-journey-redesign",
    client: "E-commerce subscription brand",
    industry: "E-commerce",
    title: "Turning one-time buyers into repeat subscribers with journey redesign",
    summary:
      "A subscription e-commerce brand had strong acquisition but weak repeat rates. We mapped the post-purchase journey, found the friction, and redesigned the first-60-day experience.",
    challenge:
      "Marketing was filling the funnel, but second-order and subscription-continuation rates lagged the category. Post-purchase communication was a generic email drip, delivery issues took days to resolve, and cancellation was easier than getting help.",
    approach: [
      "Mapped the complete post-purchase journey from order confirmation through second delivery",
      "Interviewed lapsed customers to understand the real drivers behind failed conversions to subscription",
      "Redesigned the first-60-day communication journey around product education and proactive delivery updates",
      "Built a save flow that surfaced pause, swap, and support options before cancellation",
    ],
    results: [
      {
        metric: "+22%",
        description: "improvement in first-to-second purchase conversion",
      },
      {
        metric: "-15%",
        description: "reduction in early subscription cancellations",
      },
      {
        metric: "+9 pts",
        description: "NPS improvement among first-90-day customers",
      },
    ],
    services: ["customer-experience-strategy", "retention-churn-reduction"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
