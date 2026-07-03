# PS360 — 360-Degree Business Advisory

Marketing site for PS360, a business consulting firm covering strategy,
financial advisory, HR, digital transformation, operations, and risk &
compliance. Built with Next.js (App Router), TypeScript, and Tailwind CSS,
optimized for SEO and lead generation.

## Stack

- **Next.js 16** (App Router, Turbopack, Server Actions)
- **TypeScript**
- **Tailwind CSS v4**
- **Zod** for contact-form validation
- **Resend** (optional) for emailing contact-form leads
- **lucide-react** for icons

## SEO features

- Per-page metadata (title templates, descriptions, canonical URLs, Open Graph
  and Twitter cards) via the Next.js Metadata API
- Dynamically generated `sitemap.xml` and `robots.txt` (`src/app/sitemap.ts`,
  `src/app/robots.ts`) covering every service and blog page
- JSON-LD structured data: `ProfessionalService`, `Service`, `BlogPosting`,
  `FAQPage`, and `BreadcrumbList` (`src/components/StructuredData.tsx`)
- Generated Open Graph image and favicons (`src/app/opengraph-image.tsx`,
  `src/app/icon.tsx`, `src/app/apple-icon.tsx`)
- Static generation for every route (`generateStaticParams`) for fast,
  crawlable pages
- A content section (`/blog`) with keyword-targeted long-form articles for
  organic search

## Lead-generation features

- Contact form (`/contact` and every service page) backed by a Server Action
  with server-side validation and a honeypot field for spam
- Optional email delivery of leads via [Resend](https://resend.com) — falls
  back to logging submissions to the server console when unconfigured
- Optional [Calendly](https://calendly.com) inline booking widget — shows a
  graceful fallback CTA when no Calendly link is configured
- Floating click-to-call and WhatsApp buttons on every page
- Clear calls to action throughout (hero, service pages, blog posts, footer)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Before launching, update:

1. **`src/lib/site-config.ts`** — business name, contact details (phone,
   email, address), and social links. These feed the header, footer, and
   `ProfessionalService` structured data.
2. **`.env.local`** (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — your production domain (used for canonical URLs,
     sitemap, and structured data)
   - `NEXT_PUBLIC_CALENDLY_URL` — your Calendly scheduling link, to enable the
     booking widget on `/contact`
   - `RESEND_API_KEY` — enables emailing contact-form leads
   - `LEAD_NOTIFICATION_EMAIL` — inbox that receives lead notifications
3. **`src/lib/testimonials-data.ts`** — replace placeholder testimonials with
   real client quotes.
4. **`src/lib/services-data.ts`** and **`src/lib/blog-data.ts`** — adjust or
   extend service offerings and articles as needed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build (also runs type-checking)
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Deployment

This is a standard Next.js app and deploys cleanly to
[Vercel](https://vercel.com/new) or any Node.js host that supports Next.js.
Set the environment variables above in your hosting provider before going
live.
