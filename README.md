# PS360 Consulting — ps360.in

Marketing site for PS360 Consulting, a customer experience & customer success
consulting firm. Built with Next.js (App Router, static export), TypeScript,
and Tailwind CSS; deployed on Netlify; optimized for SEO and lead generation.

## Stack

- **Next.js 16** (App Router, `output: "export"` static export)
- **TypeScript** + **Tailwind CSS v4**
- **Netlify** hosting + **Netlify Forms** for lead capture
- **gray-matter + marked** for the file-based markdown blog
- **lucide-react** for icons
- **GA4** analytics + **AdSense** (IDs configured in `src/lib/site-config.ts`)

## Weekly content publishing

The blog is file-based: drop a markdown file into `content/blog/`, push, and
Netlify deploys it — the post automatically appears on `/blog`, in
`sitemap.xml`, and in the RSS feed at `/feed.xml`. **See
[CONTENT-PLAYBOOK.md](./CONTENT-PLAYBOOK.md)** for the post template, writing
guidelines, and a ready-to-assign 12-week topic calendar.

## SEO features

- Per-page metadata (titles, descriptions, canonicals, Open Graph/Twitter)
- Generated `sitemap.xml`, `robots.txt`, and RSS feed covering every page
- JSON-LD structured data: `ProfessionalService`, `Service`, `BlogPosting`,
  `FAQPage`, `BreadcrumbList`
- Generated Open Graph image and favicons
- Every route statically prerendered

## Lead-generation features

- **Post-Sales Health Diagnostic** (`/diagnostic`) — an interactive 15-question
  assessment that scores five post-sales pillars, captures the prospect's top
  2–3 pain points, and submits everything (score, band, pillar breakdown,
  pain points, contact details) via Netlify Forms (form `diagnostic`)
- **Contact form** (on `/contact` and every service page) via Netlify Forms,
  with client-side validation and a honeypot field — submissions appear in
  the Netlify dashboard (Forms → `contact`); enable email notifications
  there
- **Newsletter signup** in the footer (Netlify form `newsletter`)
- **Calendly booking** on `/contact` and in the diagnostic
  (`src/lib/site-config.ts`, overridable via `NEXT_PUBLIC_CALENDLY_URL`)
- **Click-to-call / WhatsApp** floating buttons — hidden until real numbers
  are added in `src/lib/site-config.ts`
- Case studies and consultation CTAs throughout

## Diagnostic email flow

`netlify/functions/submission-created.mjs` runs on every verified form
submission. For the `diagnostic` form it sends two emails through Resend:

1. **To the prospect** — their full results: score, band summary, pillar
   breakdown, the pain points they flagged, and the Calendly booking link
2. **To PS360** — a lead alert with all of the above plus company/stage,
   with reply-to set to the lead's address

Setup (Netlify → Site configuration → Environment variables):

- `RESEND_API_KEY` — required. Also verify the `ps360.in` domain in Resend
  (Domains → Add domain), otherwise Resend refuses to send to arbitrary
  recipients
- `RESEND_FROM` — optional, defaults to `PS360 Consulting <hello@ps360.in>`
- `LEAD_NOTIFICATION_EMAIL` — optional, defaults to `hello@ps360.in`

If `RESEND_API_KEY` is unset the function no-ops safely — submissions are
always stored in the Netlify Forms dashboard regardless. The `contact` and
`newsletter` forms are not handled by the function; enable Netlify's
built-in form notifications for those.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run lint
```

Note: form submissions only work on Netlify (the dev server has no Forms
backend, so local submissions will show the error state).

## Deployment (Netlify)

`netlify.toml` is already configured (`npm run build`, publish `out/`).
Connect the repo in Netlify and set environment variables:

- `NEXT_PUBLIC_SITE_URL` — `https://ps360.in`
- `NEXT_PUBLIC_CALENDLY_URL` — optional, enables the booking widget

After the first deploy, check **Netlify → Forms** and confirm the `contact`
and `newsletter` forms were detected, then add email notifications to
`hello@ps360.in`.

## Configuration

Business details (name, email, LinkedIn, GA4/AdSense IDs, nav, headline
stats) live in `src/lib/site-config.ts`. Services, case studies, FAQs, and
testimonials live in `src/lib/*-data.ts`. Testimonials and case studies are
anonymized placeholders — swap in named quotes/results once client approval
to publish is in place (marked with `TODO`).
