// Netlify event function: fires on every verified form submission.
// For the "diagnostic" form it sends two emails via the Resend API:
//   1. Full results to the prospect (score, band, pillars, pain points, booking link)
//   2. A lead alert to PS360
//
// Required Netlify environment variables:
//   RESEND_API_KEY          - Resend API key (ps360.in must be a verified domain
//                             in Resend to email arbitrary recipients)
// Optional:
//   RESEND_FROM             - sender, default "PS360 Consulting <hello@ps360.in>"
//   LEAD_NOTIFICATION_EMAIL - lead-alert inbox, default hello@ps360.in
//   NEXT_PUBLIC_CALENDLY_URL - booking link used in the results email
//
// Without RESEND_API_KEY the function logs and exits; submissions are still
// stored in the Netlify Forms dashboard either way.

const BAND_SUMMARIES = {
  Reactive:
    "You're in firefighting mode. Most of what happens after the sale is improvised, and it's likely costing you renewals you don't even see coming. The good news: this is the fastest stage to show visible improvement from.",
  Foundational:
    "The basics exist, but they depend on individual heroics rather than repeatable process. You're one key person's vacation away from a bad quarter. The next step is turning tribal knowledge into a system.",
  Structured:
    "You've built real infrastructure — process, ownership, and visibility exist. The next unlock is turning your reactive signals into a genuinely proactive retention engine.",
  Proactive:
    "You're operating with real maturity. At this stage the opportunity is fine-tuning: sharper expansion signals, deeper segmentation, and scaling what already works without losing the personal touch.",
};

async function sendEmail(apiKey, payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Resend ${response.status}: ${JSON.stringify(result).slice(0, 300)}`,
    );
  }
  return result;
}

export async function handler(event) {
  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch {
    return { statusCode: 400, body: "Bad payload" };
  }

  const formName = payload?.form_name;
  if (formName !== "diagnostic") {
    // contact + newsletter are handled by Netlify's built-in notifications.
    return { statusCode: 200, body: "Ignored form" };
  }

  const data = payload.data ?? {};
  const {
    name = "",
    email = "",
    company = "",
    stage = "",
    score = "",
    band = "",
    pillars = "",
    pain_points: painPoints = "",
    pain_points_other: painPointsOther = "",
  } = data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY not set - diagnostic emails skipped. Submission is still in the Netlify Forms dashboard.",
    );
    return { statusCode: 200, body: "Email not configured" };
  }

  const from = process.env.RESEND_FROM ?? "PS360 Consulting <hello@ps360.in>";
  const leadInbox = process.env.LEAD_NOTIFICATION_EMAIL ?? "hello@ps360.in";
  const calendly =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/sanjay-sudhakar/new-meeting";

  const firstName = name.trim().split(/\s+/)[0] || "there";
  const pillarLines = pillars
    .split("|")
    .map((p) => `  • ${p.trim()}`)
    .join("\n");
  const painLines = [
    ...painPoints.split(";").map((p) => p.trim()).filter(Boolean),
    painPointsOther.trim(),
  ]
    .filter(Boolean)
    .map((p) => `  • ${p}`)
    .join("\n");

  const resultsEmail = {
    from,
    to: email,
    subject: `Your Post-Sales Health Diagnostic results — ${band} (${score})`,
    text: `Hi ${firstName},

Thanks for taking the PS360 Post-Sales Health Diagnostic. Here's your full breakdown.

YOUR SCORE: ${score} — ${band}

${BAND_SUMMARIES[band] ?? ""}

PILLAR BREAKDOWN
${pillarLines}

THE PAIN POINTS YOU FLAGGED
${painLines || "  • (none selected)"}

WHAT'S NEXT
We'll review your results and follow up personally. If you'd rather skip ahead, book your free 20-minute diagnostic call now - we'll walk through your weakest pillar and one concrete fix you can put in place this month. No pitch, just the diagnosis.

Book here: ${calendly}

— The PS360 Consulting team
Customer Experience & Success Consulting
hello@ps360.in | https://ps360.in
`,
  };

  const leadAlert = {
    from,
    to: leadInbox,
    replyTo: email,
    subject: `New diagnostic lead: ${name} (${company}) — ${band} ${score}`,
    text: `New Post-Sales Health Diagnostic submission.

Name:    ${name}
Email:   ${email}
Company: ${company}
Stage:   ${stage}

Score:   ${score} — ${band}

Pillars:
${pillarLines}

Pain points to solve:
${painLines || "  (none selected)"}

Reply directly to this email to reach the lead.
`,
  };

  const results = await Promise.allSettled([
    sendEmail(apiKey, resultsEmail),
    sendEmail(apiKey, leadAlert),
  ]);
  results.forEach((r, i) => {
    const label = i === 0 ? "prospect results email" : "lead alert email";
    if (r.status === "rejected") {
      console.error(`Failed to send ${label}:`, r.reason);
    } else {
      console.log(`Sent ${label}`, r.value?.id ?? "");
    }
  });

  // Always 200: the submission itself succeeded and is stored by Netlify.
  return { statusCode: 200, body: "Processed" };
}
