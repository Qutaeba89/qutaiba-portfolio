<h1 align="center">qutaiba.dev</h1>

<p align="center">
Personal portfolio — bilingual (EN/SV), dark, built to prove the same production
standards it describes.<br/>
<a href="https://qutaiba-portfolio-wine.vercel.app">qutaiba-portfolio-wine.vercel.app</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/next--intl-000000?style=flat-square&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Motion-0055FF?style=flat-square&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
</p>

---

### What this is

A from-scratch Next.js App Router site, not a template. Every project featured on it is real —
four shipped applications with their actual screenshots, real test counts, and the actual
security decisions made in each one. Content lives in `messages/*.json` and `src/data/projects.ts`,
fully translated into Swedish, not machine-translated after the fact.

### Features

- **Bilingual routing** — `/en` and `/sv` via `next-intl`, with `hreflang` alternates and
  per-locale canonical URLs (not one blanket canonical for the whole site)
- **Four case studies** — problem → architecture → security → results, each with real
  screenshots and an honest code-access note (public repo, private repo, or NDA'd client work)
- **Generated OG image** — social previews render a real card instead of a blank link
- **Dark-only, one accent color** — locked theme, no light/dark inconsistency between sections
- **Full test coverage** — every component and route has a Vitest + Testing Library test;
  see [`vitest.config.ts`](./vitest.config.ts)
- **Static where it can be** — home, all four case studies, and both locales are prerendered at
  build time (`generateStaticParams`)

### Project structure

```
src/
├── app/[locale]/          # Routes: home, /work/[slug] case studies, layout, metadata
├── app/robots.ts          # robots.txt + sitemap.xml (MetadataRoute)
├── app/sitemap.ts
├── components/            # One component per section, each with a co-located test
├── components/ui/         # Shared primitives (Button, Badge) reused across sections
├── data/projects.ts       # Project facts (stack, links, images) — language-neutral
├── data/skills.ts         # Skill categories shown in the Stack section
├── i18n/                  # next-intl routing, request config, typed navigation
├── lib/site.ts            # Single source of truth for the canonical site URL
└── lib/format-display-name.ts  # Trims/title-cases user-facing display names
messages/
├── en.json                # All English copy, keyed by section/project
└── sv.json                # All Swedish copy — hand-translated, not auto-generated
```

### Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm test          # Vitest — component and route tests
npm run lint       # ESLint
npm run build      # Production build + static generation
```

### Deployment

Deploys to Vercel on every push to `main`. `NEXT_PUBLIC_SITE_URL` controls the canonical domain
used in metadata, `hreflang`, and the OG image — set it once the custom domain is live, or every
canonical/OG tag keeps pointing at the `.vercel.app` URL.

### Contact

[qutaebadandashi@gmail.com](mailto:qutaebadandashi@gmail.com) ·
[LinkedIn](https://linkedin.com/in/qutaiba-al-dandachi) ·
[GitHub](https://github.com/Qutaeba89)

<p align="center"><i>Open to fullstack developer roles — Sweden / remote.</i></p>
