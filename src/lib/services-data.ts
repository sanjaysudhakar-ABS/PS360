import {
  Compass,
  HeartHandshake,
  Headset,
  Rocket,
  RefreshCcw,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
  outcomes: string[];
  process: { title: string; description: string }[];
}

export const services: Service[] = [
  {
    slug: "customer-experience-strategy",
    name: "CX Strategy & Journey Mapping",
    shortDescription:
      "Map every touchpoint from first purchase to renewal, and build a CX strategy that turns experience into a competitive advantage.",
    description:
      "We audit your end-to-end customer journey — onboarding, adoption, support, renewal — to find the moments where customers get stuck, frustrated, or quietly disengage. Then we design a prioritized CX roadmap tied to the metrics that matter: retention, expansion, and lifetime value.",
    icon: Compass,
    keywords: [
      "customer experience strategy consulting",
      "customer journey mapping",
      "CX transformation consultant",
      "customer touchpoint analysis",
    ],
    outcomes: [
      "A complete customer journey map with friction points ranked by revenue impact",
      "A prioritized CX roadmap with owners, timelines, and success metrics",
      "Moments-that-matter playbooks for onboarding, escalation, and renewal",
      "Executive alignment on the CX metrics your teams will be measured on",
    ],
    process: [
      {
        title: "Discover",
        description:
          "We interview customers and frontline teams, and mine your support and product data for friction signals.",
      },
      {
        title: "Map",
        description:
          "We map the full post-sales journey and rank every friction point by effort and revenue impact.",
      },
      {
        title: "Roadmap",
        description:
          "We deliver a sequenced CX roadmap and stay engaged through the first improvement cycles.",
      },
    ],
  },
  {
    slug: "customer-success-management",
    name: "Customer Success Management",
    shortDescription:
      "Stand up or level up a customer success function that drives adoption, renewals, and expansion — not just check-in calls.",
    description:
      "Whether you're hiring your first CSM or restructuring an existing team, we design the customer success operating model that fits your product and price point: segmentation, health scoring, playbooks, QBR cadences, and the handoffs between sales, onboarding, and support.",
    icon: HeartHandshake,
    keywords: [
      "customer success consulting",
      "customer success operating model",
      "customer health score design",
      "CSM playbook development",
    ],
    outcomes: [
      "A customer segmentation model with the right touch level for each tier",
      "A health score built on real usage and engagement signals, not gut feel",
      "Lifecycle playbooks: onboarding, adoption, risk, renewal, and expansion",
      "Clear sales-to-CS handoff so customers never repeat themselves",
    ],
    process: [
      {
        title: "Assess",
        description:
          "We review your book of business, churn history, and current CS coverage model.",
      },
      {
        title: "Design",
        description:
          "We build segmentation, health scoring, and playbooks matched to your economics.",
      },
      {
        title: "Operationalize",
        description:
          "We train the team, wire up the tooling, and iterate through the first renewal cycles.",
      },
    ],
  },
  {
    slug: "support-desk-operations",
    name: "Support Desk Operations",
    shortDescription:
      "Faster resolutions, lower cost per ticket, and support quality your customers actually notice.",
    description:
      "We optimize the engine room of post-sales experience: ticket workflows, queue design, SLAs, knowledge bases, self-service deflection, and QA programs. The goal isn't just efficiency — it's a support experience consistent enough that customers stop dreading contact.",
    icon: Headset,
    keywords: [
      "support desk operations consulting",
      "help desk optimization",
      "customer support SLA design",
      "ticket deflection strategy",
    ],
    outcomes: [
      "Redesigned ticket workflows with clear priorities, SLAs, and escalation paths",
      "A knowledge base and self-service strategy that deflects repetitive tickets",
      "A support QA scorecard and coaching rhythm that lifts CSAT",
      "Capacity and staffing model matched to your actual ticket patterns",
    ],
    process: [
      {
        title: "Audit",
        description:
          "We analyze ticket data, handle times, contact drivers, and quality samples.",
      },
      {
        title: "Redesign",
        description:
          "We rebuild workflows, SLAs, and self-service around your top contact drivers.",
      },
      {
        title: "Coach",
        description:
          "We embed QA scorecards and coaching cadences so improvements stick.",
      },
    ],
  },
  {
    slug: "customer-onboarding",
    name: "Customer Onboarding Design",
    shortDescription:
      "Get new customers to first value fast — before doubt, distraction, or a competitor gets there first.",
    description:
      "The first 90 days decide most renewals. We design onboarding journeys that compress time-to-first-value: milestone plans, kickoff templates, in-product guidance, and the early-warning signals that tell you an account is drifting before it's too late.",
    icon: Rocket,
    keywords: [
      "customer onboarding consulting",
      "time to first value optimization",
      "SaaS onboarding journey design",
      "new customer activation strategy",
    ],
    outcomes: [
      "A milestone-based onboarding journey with clear definitions of 'activated'",
      "Kickoff, training, and check-in templates your team can run consistently",
      "Early-warning indicators that flag stalled accounts in the first 30 days",
      "Shorter time-to-first-value and measurably higher 90-day retention",
    ],
    process: [
      {
        title: "Define",
        description:
          "We define what first value means for each customer segment you serve.",
      },
      {
        title: "Design",
        description:
          "We build the milestone journey, templates, and stall-detection signals.",
      },
      {
        title: "Launch",
        description:
          "We pilot with live cohorts, measure activation, and tune the journey.",
      },
    ],
  },
  {
    slug: "retention-churn-reduction",
    name: "Retention & Churn Reduction",
    shortDescription:
      "Find out why customers really leave, then build the save motions and renewal engine to keep them.",
    description:
      "We go beyond exit surveys to diagnose the operational causes of churn — failed onboarding, unresolved support pain, missing champions, price-value mismatch — and build the risk playbooks, renewal processes, and win-back motions that move net revenue retention.",
    icon: RefreshCcw,
    keywords: [
      "churn reduction consulting",
      "customer retention strategy",
      "net revenue retention improvement",
      "renewal process design",
    ],
    outcomes: [
      "A churn diagnostic that separates preventable losses from structural ones",
      "At-risk playbooks with clear triggers, owners, and save offers",
      "A renewal process that starts 120 days out, not two weeks before the date",
      "A win-back program for the customers worth recovering",
    ],
    process: [
      {
        title: "Diagnose",
        description:
          "We analyze churned cohorts and interview lost customers to find root causes.",
      },
      {
        title: "Build",
        description:
          "We create risk triggers, save playbooks, and a structured renewal motion.",
      },
      {
        title: "Measure",
        description:
          "We track save rates and NRR through the next renewal cycles and refine.",
      },
    ],
  },
  {
    slug: "cx-analytics-reporting",
    name: "CX Analytics & Voice of Customer",
    shortDescription:
      "Turn CSAT, NPS, and support data into a voice-of-customer program that actually changes decisions.",
    description:
      "Most companies collect feedback; few act on it. We build the measurement layer for your post-sales operation — the right metrics per touchpoint, dashboards leadership actually reads, and a closed-loop process that turns customer feedback into fixes customers can feel.",
    icon: BarChart3,
    keywords: [
      "voice of customer program",
      "CX analytics consulting",
      "NPS CSAT measurement strategy",
      "customer feedback closed loop",
    ],
    outcomes: [
      "A metrics framework: which of CSAT, NPS, CES to use where — and why",
      "Executive CX dashboards connecting experience metrics to revenue",
      "A closed-loop process so every detractor gets a follow-up and a fix",
      "Quarterly voice-of-customer insights your product team will actually use",
    ],
    process: [
      {
        title: "Instrument",
        description:
          "We set up the right surveys and signals at each journey touchpoint.",
      },
      {
        title: "Connect",
        description:
          "We link experience data to revenue outcomes in dashboards leaders read.",
      },
      {
        title: "Close the loop",
        description:
          "We stand up the rhythm that turns feedback into visible fixes.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
