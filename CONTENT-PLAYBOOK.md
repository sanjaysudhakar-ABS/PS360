# PS360 Content Playbook — Publishing a Post Every Week

The blog is file-based: every markdown file in `content/blog/` becomes a page
at `ps360.in/blog/<filename>/`. There is no CMS, no database, and no code
change needed to publish — adding a file and pushing to `main` triggers a
Netlify deploy, and the new post automatically appears on the blog index, in
`sitemap.xml`, and in the RSS feed (`/feed.xml`).

## Publishing workflow (10 minutes once the draft is written)

1. Create a new file: `content/blog/your-post-slug.md`.
   The filename becomes the URL, so make it a short, keyword-rich slug
   (e.g. `customer-health-score-guide.md` → `/blog/customer-health-score-guide/`).
2. Paste in the template below and fill in the frontmatter.
3. Write the body in plain markdown (`##` for section headings).
4. Commit and push to `main` (or open a PR if you want review first).
5. Netlify builds and deploys automatically. Done.

You can do all of this from the GitHub web UI (Add file → Create new file)
without touching a local checkout — which makes it easy to delegate.

## Post template

```markdown
---
title: "Your Post Title: Keep It Under ~60 Characters for Search"
description: "The meta description shown in Google and social shares. One or two sentences, ~150 characters, containing the primary keyword naturally."
category: "Customer Success"   # One of: Customer Success, Retention, Onboarding, Analytics, Support Operations, CX Strategy
publishedAt: "2026-07-06"      # YYYY-MM-DD — controls sort order
keywords:
  - primary keyword phrase
  - secondary keyword phrase
  - third variation
---

Open with the problem in the reader's words — no throat-clearing.

## First section heading (use sentence case)

Body text. Short paragraphs, concrete examples, no filler.

## Second section

- Bullets are fine
- Bold sparingly

## The bottom line

Close with a clear takeaway. The page template automatically appends a
consultation CTA, so don't hard-sell in the body.
```

`author`, `updatedAt`, and `readingTime` are optional — author defaults to
"PS360 Consulting" and reading time is calculated automatically. If you make
significant edits to an old post, add `updatedAt: "YYYY-MM-DD"` so search
engines see the freshness signal.

## Writing guidelines (what makes these posts rank and convert)

- **One search intent per post.** Each post targets one question a CX/CS
  leader actually types into Google. The title should closely match that
  query.
- **800–1,500 words.** Long enough to be substantive, short enough to write
  weekly.
- **Practical over conceptual.** Frameworks, checklists, and "here's the
  trigger, owner, and play" specificity outperform think-pieces.
- **Internal links.** Link naturally to the relevant service page
  (`/services/<slug>/`) and 1–2 older posts. This builds topical authority.
- **No invented client claims.** Anonymized patterns ("we see this across
  engagements") are fine; named results need client approval.

## 12-week topic calendar (ready to assign)

| Week | Working title | Category | Target query |
| ---- | ------------- | -------- | ------------ |
| 1 | How to Build a Customer Health Score That Predicts Churn | Analytics | customer health score model |
| 2 | The Sales-to-Customer-Success Handoff: A Checklist That Prevents Churn | Customer Success | sales to CS handoff |
| 3 | QBRs Customers Actually Want to Attend | Customer Success | quarterly business review template |
| 4 | Support Ticket Deflection Without Destroying CX | Support Operations | ticket deflection strategies |
| 5 | Net Revenue Retention: The Only Growth Metric Your Board Cares About | Retention | net revenue retention benchmark |
| 6 | Onboarding High-Touch vs Tech-Touch: Choosing the Right Model | Onboarding | tech touch onboarding |
| 7 | How to Run a Churn Post-Mortem (With Template) | Retention | churn analysis template |
| 8 | Knowledge Base Content That Actually Deflects Tickets | Support Operations | knowledge base best practices |
| 9 | Customer Journey Mapping: A Step-by-Step Guide for B2B | CX Strategy | customer journey mapping b2b |
| 10 | Renewal Playbooks: Starting the Conversation 120 Days Out | Retention | renewal process best practices |
| 11 | Voice of Customer Programs That Change the Roadmap | Analytics | voice of customer program |
| 12 | Scaling Customer Success Without Scaling Headcount | Customer Success | scale customer success team |

Repeat the cycle each quarter with fresh angles, seasonal hooks, and updates
to the best-performing posts (check GA4 → Engagement → Pages).

## Monthly maintenance (15 minutes)

- Check GA4 for the top 5 organic posts; refresh any that are 6+ months old
  (`updatedAt` + a new section or updated examples).
- Verify Google Search Console has no coverage errors for `/blog/*`.
- Promote each new post on the company LinkedIn page — it's the audience
  channel that matches this ICP.
