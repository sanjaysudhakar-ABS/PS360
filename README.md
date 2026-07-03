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

- **Contact form** (on `/contact` and every service page) via Netlify Forms,
  with client-side validation and a honeypot field — submissions appear in
  the Netlify dashboard (Forms → `contact`); enable email notifications
  there
- **Newsletter signup** in the footer (Netlify form `newsletter`)
- **Calendly embed** on `/contact` (set `NEXT_PUBLIC_CALENDLY_URL`)
- **Click-to-call / WhatsApp** floating buttons — hidden until real numbers
  are added in `src/lib/site-config.ts`
- Case studies and consultation CTAs throughout

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
