export const pillars = [
  "Onboarding & First 90 Days",
  "Support Operations",
  "Escalation Management",
  "Retention Signals",
  "Feedback & Improvement",
] as const;

export interface DiagnosticOption {
  text: string;
  score: number;
}

export interface DiagnosticQuestion {
  pillar: number;
  question: string;
  options: DiagnosticOption[];
}

export const questions: DiagnosticQuestion[] = [
  // Pillar 0: Onboarding & First 90 Days
  {
    pillar: 0,
    question: "When a new customer signs, what happens next?",
    options: [
      { text: "Nothing formal — they wait for something to break", score: 1 },
      { text: "We send a welcome email and maybe a call", score: 2 },
      { text: "A structured onboarding sequence with milestones", score: 3 },
      { text: "A defined journey with success criteria, checkpoints, and a named owner", score: 4 },
    ],
  },
  {
    pillar: 0,
    question: "How do you know if a customer actually got value in the first few weeks?",
    options: [
      { text: "We don't track this", score: 1 },
      { text: "We guess, based on usage or gut feel", score: 2 },
      { text: "We monitor defined activation metrics", score: 3 },
      { text: "Activation metrics are tied directly to renewal/expansion triggers", score: 4 },
    ],
  },
  {
    pillar: 0,
    question: "Who owns the relationship once the deal closes?",
    options: [
      { text: "No one — sales moves on, support only reacts to tickets", score: 1 },
      { text: "Support, but only once something goes wrong", score: 2 },
      { text: "A dedicated CS/account function with a clear handoff from sales", score: 3 },
      { text: "A named owner accountable for the full journey, tracked in a system", score: 4 },
    ],
  },

  // Pillar 1: Support Operations
  {
    pillar: 1,
    question: "How do customers reach you when they hit an issue?",
    options: [
      { text: "Whatever channel they can find — email, phone, WhatsApp, DMs", score: 1 },
      { text: "One main channel, used inconsistently", score: 2 },
      { text: "A defined support channel with SLAs", score: 3 },
      { text: "Multi-channel support unified in one system with tracked SLAs", score: 4 },
    ],
  },
  {
    pillar: 1,
    question: "How consistent is your response time?",
    options: [
      { text: "No idea — it varies wildly", score: 1 },
      { text: "We aim for “as soon as possible”", score: 2 },
      { text: "We have target response times and mostly hit them", score: 3 },
      { text: "We track and report SLA compliance every month", score: 4 },
    ],
  },
  {
    pillar: 1,
    question: "If your key support person went on leave tomorrow, what happens?",
    options: [
      { text: "Everything stalls — nothing is documented", score: 1 },
      { text: "Others can cover the basics, not the hard stuff", score: 2 },
      { text: "Documented processes exist that others can follow", score: 3 },
      { text: "Full continuity — playbooks and backup owners, no drop in service", score: 4 },
    ],
  },

  // Pillar 2: Escalation Management
  {
    pillar: 2,
    question: "When a customer is angry or a deal is at risk, what's the process?",
    options: [
      { text: "Whoever picks up the phone handles it however they see fit", score: 1 },
      { text: "It gets forwarded up the chain informally", score: 2 },
      { text: "A defined escalation path with clear ownership", score: 3 },
      { text: "A documented escalation framework with SLAs and leadership visibility", score: 4 },
    ],
  },
  {
    pillar: 2,
    question: "How often do escalations catch leadership by surprise?",
    options: [
      { text: "Constantly — we hear about it when the customer threatens to leave", score: 1 },
      { text: "Sometimes, depending who's paying attention", score: 2 },
      { text: "Rarely — we have early warning signals", score: 3 },
      { text: "Almost never — proactive risk flags surface before it escalates", score: 4 },
    ],
  },
  {
    pillar: 2,
    question: "After an escalation is resolved, what happens?",
    options: [
      { text: "Nothing — we move on", score: 1 },
      { text: "It might come up in a team meeting", score: 2 },
      { text: "We document root cause and lessons learned", score: 3 },
      { text: "We run a formal post-mortem and feed fixes back into process", score: 4 },
    ],
  },

  // Pillar 3: Retention Signals
  {
    pillar: 3,
    question: "How do you know a customer is at risk of churning before they tell you?",
    options: [
      { text: "We don't — they just leave", score: 1 },
      { text: "Sometimes we notice a drop-off", score: 2 },
      { text: "We track basic health signals — usage, tickets, sentiment", score: 3 },
      { text: "We have a scored health model that flags risk early", score: 4 },
    ],
  },
  {
    pillar: 3,
    question: "What does your renewal process look like?",
    options: [
      { text: "We wait and see if they pay again", score: 1 },
      { text: "Someone reaches out close to the renewal date", score: 2 },
      { text: "A defined renewal playbook starting 60–90 days out", score: 3 },
      { text: "Renewal is a tracked, proactive process tied to demonstrated value", score: 4 },
    ],
  },
  {
    pillar: 3,
    question: "Do you measure customer satisfaction or loyalty in a structured way?",
    options: [
      { text: "No", score: 1 },
      { text: "Occasionally, informally", score: 2 },
      { text: "Yes — periodic CSAT/NPS surveys", score: 3 },
      { text: "Yes — continuously tracked and tied to action plans", score: 4 },
    ],
  },

  // Pillar 4: Feedback & Improvement
  {
    pillar: 4,
    question: "When customers give feedback, where does it go?",
    options: [
      { text: "Nowhere in particular", score: 1 },
      { text: "Into someone's inbox or notes", score: 2 },
      { text: "Into a shared log reviewed periodically", score: 3 },
      { text: "Into a structured system that feeds product/process decisions", score: 4 },
    ],
  },
  {
    pillar: 4,
    question: "How often does your team review what's working in the customer journey?",
    options: [
      { text: "Never", score: 1 },
      { text: "Occasionally, when something breaks", score: 2 },
      { text: "Quarterly reviews", score: 3 },
      { text: "Ongoing, with clear metrics and named owners", score: 4 },
    ],
  },
  {
    pillar: 4,
    question: "If you had to describe your post-sales experience in one word, it's closer to:",
    options: [
      { text: "Chaotic", score: 1 },
      { text: "Reactive", score: 2 },
      { text: "Consistent", score: 3 },
      { text: "Proactive", score: 4 },
    ],
  },
];

export interface DiagnosticBand {
  max: number;
  name: string;
  /** Tailwind-safe hex used for score, band label, bars, and pulse. */
  color: string;
  text: string;
}

export const bands: DiagnosticBand[] = [
  {
    max: 26,
    name: "Reactive",
    color: "#f87171",
    text: "You're in firefighting mode. Most of what happens after the sale is improvised, and it's likely costing you renewals you don't even see coming. The good news: this is the fastest stage to show visible improvement from.",
  },
  {
    max: 38,
    name: "Foundational",
    color: "#fbbf24",
    text: "The basics exist, but they depend on individual heroics rather than repeatable process. You're one key person's vacation away from a bad quarter. The next step is turning tribal knowledge into a system.",
  },
  {
    max: 50,
    name: "Structured",
    color: "#34d399",
    text: "You've built real infrastructure — process, ownership, and visibility exist. The next unlock is turning your reactive signals into a genuinely proactive retention engine.",
  },
  {
    max: 60,
    name: "Proactive",
    color: "#34d399",
    text: "You're operating with real maturity. At this stage the opportunity is fine-tuning: sharper expansion signals, deeper segmentation, and scaling what already works without losing the personal touch.",
  },
];

/** One-line "where we'd start" recommendation per pillar, shown for the weakest pillar. */
export const pillarRecommendations = [
  "Tighten the first 90 days: define what “first value” means for your customers and instrument the milestones to reach it.",
  "Stabilize the support engine: one system of record, clear SLAs, and documentation that survives someone going on leave.",
  "Build the escalation path: defined triggers, named owners, and leadership visibility before the customer threatens to walk.",
  "Stand up early-warning retention signals and a renewal motion that starts 90+ days out — not the week the invoice is due.",
  "Close the feedback loop: customer input should visibly change process and product, not accumulate in someone's inbox.",
];

export interface PainPoint {
  id: string;
  label: string;
  /** Pillars this pain point most relates to (for suggesting based on weak scores). */
  pillars: number[];
}

export const painPoints: PainPoint[] = [
  { id: "churn-surprise", label: "Customers churn without warning", pillars: [3] },
  { id: "onboarding-stalls", label: "New customers stall before seeing value", pillars: [0] },
  { id: "support-slow", label: "Support is overwhelmed or too slow", pillars: [1] },
  { id: "no-visibility", label: "No visibility into account health", pillars: [3, 4] },
  { id: "renewal-scramble", label: "Renewals are last-minute scrambles", pillars: [3] },
  { id: "escalation-late", label: "Escalations reach leadership too late", pillars: [2] },
  { id: "feedback-lost", label: "Customer feedback never turns into fixes", pillars: [4] },
  { id: "key-person", label: "Everything depends on one or two people", pillars: [1, 2] },
];
