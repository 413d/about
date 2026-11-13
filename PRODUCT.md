# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is split equally between two groups: recruiters and hiring managers evaluating Alex for senior fullstack or technical leadership roles, and potential clients evaluating him for project or contract work. Visitors typically arrive from a profile link, direct outreach, or a referral, and decide quickly whether the engineering claims are credible.

## Product Purpose

A bilingual personal portfolio for Alex, a senior fullstack developer. It presents his engineering approach, frontend and backend depth, problem-solving range, and leadership experience. Success is credibility first: the site is the strong reference someone checks after meeting Alex, ahead of or alongside a hiring or client conversation. It supports both employment and client paths without optimizing for one over the other.

## Positioning

A narrative portfolio that delivers the same career story twice: as an auto-advancing, sequence-controlled story experience, and as a skimmable text summary, in English and Russian with equal standing. A neighboring CV site could copy the claims, but not the paired modes or the language parity.

## Operating Context

- Visitors arrive from GitHub, X, direct outreach, or a shared link; the site is static and self-contained.
- The default experience is a nine-part story sequence with pause, previous, and next controls. Text mode is the fast path for people who prefer scanning.
- Contact happens through email, X, or GitHub links configured per deployment. There are no forms and no backend.
- Content is authored as paired English and Russian collections and deployed to GitHub Pages from the `main` branch.
- Production contact values, analytics, and profile URLs come from `PUBLIC_*` environment variables in the deploy workflow.

## Capabilities and Constraints

- Astro 7 with Tailwind CSS 4, static output, no server runtime.
- English and Russian are separate content collections that must stay in sync. Both are first-class; neither is a fallback.
- Two modes: story deck and text summary, both covering the same professional story.
- Story content supports eight visual variants: hero, text emphasis, stack grid, systems diagram, problem cards, leadership signals, growth path, and CTA.
- SEO baseline: canonical URLs, hreflang alternates, sitemap, robots, and Person structured data.
- Contact email, X and GitHub URLs, Cloudflare analytics token, site name, and profile URLs are deployment configuration, not hard-coded truth.
- The name "Alex" and the "LX" monogram are intentional and stay. Placeholder values such as `hello@example.com` must be replaced at deployment.

## Brand Commitments

- Name: Alex. Monogram: LX.
- Voice: concrete, confident, engineering-focused. Claims are specific about systems, trade-offs, and delivery rather than promotional.
- Bilingual parity: English and Russian receive equal content quality and completeness.
- The dual-mode presentation, story experience plus text summary, is the signature interaction and should be preserved.

## Evidence on Hand

- Real proof exists and the user will provide it; it is not yet in the repository.
- Currently present: self-description, technology lists, role claims, and story copy in `src/content/stories/{en,ru}` and `src/content/text/{en,ru}`.
- Currently absent: named employers, dates, measurable outcomes, case studies, testimonials, client names, publications, and awards. Future work must not fabricate these; add them only from material the user supplies.
- Public GitHub and X profiles are referenced through deployment environment variables rather than stored content.

## Product Principles

1. Credibility before persuasion: make engineering judgment easy to verify, not just pleasant to read.
2. Never invent proof: every specific claim, metric, employer, or testimonial must come from the user.
3. Two modes, one truth: the story and text versions must always describe the same person and the same claims.
4. Bilingual parity: English and Russian receive equal content quality and completeness.
5. Show mechanism, not vocabulary: explain how Alex works through architecture, testing, delivery, and leadership in concrete terms.

## Accessibility & Inclusion

No formal standard or product-specific requirement has been confirmed. Preserve the existing keyboard, screen-reader, and reduced-motion behavior unless the user decides otherwise.

## Open Decisions

- Real evidence assets and how to present them are pending from the user.
- Final contact details and profile URLs are supplied at deployment through environment variables.
- No decision yet on additional locales, case-study pages, or a downloadable CV.