import {
  TrendingUp,
  Landmark,
  Users,
  Cpu,
  Workflow,
  ShieldCheck,
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
    slug: "business-strategy-consulting",
    name: "Business Strategy & Growth Advisory",
    shortDescription:
      "Clear, data-backed strategy to help you enter new markets, defend margins, and grow with confidence.",
    description:
      "We work alongside founders and leadership teams to turn ambiguous growth questions into a prioritized, executable plan. From market entry and competitive positioning to pricing and M&A readiness, our strategy consultants combine rigorous analysis with hands-on implementation support.",
    icon: TrendingUp,
    keywords: [
      "business strategy consulting",
      "growth advisory firm",
      "market entry strategy",
      "competitive positioning consultant",
    ],
    outcomes: [
      "A 12–18 month growth roadmap with clear owners and milestones",
      "Validated market entry or expansion plan",
      "Pricing and margin improvement recommendations",
      "Board-ready strategy documentation",
    ],
    process: [
      {
        title: "Diagnose",
        description:
          "We audit your market position, unit economics, and competitive landscape.",
      },
      {
        title: "Design",
        description:
          "We co-create a prioritized strategy with realistic timelines and resourcing.",
      },
      {
        title: "Deliver",
        description:
          "We support execution with milestone reviews so the plan doesn't sit in a slide deck.",
      },
    ],
  },
  {
    slug: "financial-advisory",
    name: "Financial Planning & Advisory",
    shortDescription:
      "FP&A, fundraising support, and CFO-level advisory to keep cash flow, forecasting, and reporting under control.",
    description:
      "Our financial advisory practice gives growing businesses the discipline of an enterprise finance function without the overhead. We build forecasting models, prepare fundraising and lender materials, and set up the reporting cadence your board and investors expect.",
    icon: Landmark,
    keywords: [
      "financial advisory services",
      "fractional CFO consulting",
      "fundraising advisory",
      "financial planning and analysis (FP&A)",
    ],
    outcomes: [
      "A rolling 13-week cash flow and annual budget model",
      "Investor- and lender-ready financial narrative",
      "Board reporting pack and KPI dashboard",
      "Cost structure and margin diagnostic",
    ],
    process: [
      {
        title: "Assess",
        description:
          "We review your financials, systems, and reporting gaps.",
      },
      {
        title: "Model",
        description:
          "We build forecasting and scenario models tailored to your business.",
      },
      {
        title: "Advise",
        description:
          "We support fundraising, budgeting cycles, and monthly close as an ongoing partner.",
      },
    ],
  },
  {
    slug: "hr-workforce-solutions",
    name: "HR & Workforce Solutions",
    shortDescription:
      "From org design to hiring and retention, build a workforce strategy that scales with the business.",
    description:
      "We help leadership teams get ahead of people problems before they become growth blockers — organizational design, compensation benchmarking, hiring pipelines, and performance management systems built for the stage you're actually at.",
    icon: Users,
    keywords: [
      "HR consulting firm",
      "workforce planning consultant",
      "organizational design services",
      "talent strategy advisory",
    ],
    outcomes: [
      "An org design aligned to your next growth stage",
      "Compensation and leveling framework benchmarked to market",
      "Structured hiring and onboarding playbooks",
      "Performance review and retention framework",
    ],
    process: [
      {
        title: "Map",
        description:
          "We map current org structure, roles, and workforce gaps.",
      },
      {
        title: "Redesign",
        description:
          "We design the org chart, leveling, and compensation bands you need next.",
      },
      {
        title: "Implement",
        description:
          "We roll out hiring, onboarding, and performance systems with your team.",
      },
    ],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation & Technology Consulting",
    shortDescription:
      "Modernize systems, automate manual work, and stand up the tech stack your operations actually need.",
    description:
      "We assess where manual processes and legacy systems are costing you time and money, then design and implement a pragmatic technology roadmap — from workflow automation and CRM/ERP selection to data and AI readiness.",
    icon: Cpu,
    keywords: [
      "digital transformation consulting",
      "technology consulting firm",
      "business process automation",
      "CRM and ERP implementation advisory",
    ],
    outcomes: [
      "A prioritized technology and automation roadmap",
      "Vendor-neutral CRM/ERP selection support",
      "Automated workflows replacing manual, error-prone processes",
      "Data infrastructure ready for reporting and AI use cases",
    ],
    process: [
      {
        title: "Audit",
        description:
          "We map your current systems, data flows, and manual bottlenecks.",
      },
      {
        title: "Roadmap",
        description:
          "We prioritize initiatives by effort and business impact.",
      },
      {
        title: "Implement",
        description:
          "We manage vendor selection and rollout alongside your team.",
      },
    ],
  },
  {
    slug: "operations-process-excellence",
    name: "Operations & Process Excellence",
    shortDescription:
      "Tighten up delivery, supply chain, and internal processes to protect margin as you scale.",
    description:
      "We help operationally intensive businesses remove waste, standardize processes, and build the operating rhythm needed to scale without scaling headcount at the same rate.",
    icon: Workflow,
    keywords: [
      "operations consulting firm",
      "process improvement consultant",
      "supply chain optimization advisory",
      "operational excellence consulting",
    ],
    outcomes: [
      "Documented, standardized SOPs for core processes",
      "Identified cost and cycle-time reduction opportunities",
      "Capacity planning model for peak demand",
      "Operating rhythm (weekly/monthly reviews) that sticks",
    ],
    process: [
      {
        title: "Observe",
        description:
          "We shadow operations to find bottlenecks and waste firsthand.",
      },
      {
        title: "Redesign",
        description:
          "We redesign workflows and set measurable targets.",
      },
      {
        title: "Embed",
        description:
          "We train teams and stand up the operating rhythm to sustain gains.",
      },
    ],
  },
  {
    slug: "risk-compliance-governance",
    name: "Risk, Compliance & Governance",
    shortDescription:
      "Build the governance, controls, and compliance foundation that lets you grow without surprises.",
    description:
      "As businesses scale, informal controls stop being enough. We help you stand up governance structures, compliance programs, and risk frameworks proportionate to your size — so growth doesn't outrun oversight.",
    icon: ShieldCheck,
    keywords: [
      "risk and compliance advisory",
      "corporate governance consulting",
      "internal controls consultant",
      "regulatory compliance advisory firm",
    ],
    outcomes: [
      "A risk register with prioritized mitigation plans",
      "Board and governance structure fit for your stage",
      "Documented internal controls and approval workflows",
      "Compliance calendar mapped to your regulatory obligations",
    ],
    process: [
      {
        title: "Identify",
        description:
          "We assess regulatory exposure and current control gaps.",
      },
      {
        title: "Structure",
        description:
          "We design governance and controls proportionate to your size.",
      },
      {
        title: "Monitor",
        description:
          "We help you maintain and evolve the program as you grow.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
