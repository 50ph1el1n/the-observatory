# The Observatory

> A quiet place to keep what I'm learning — eight districts under one violet sky.

A personal knowledge city, built as a portfolio + writing space. Eight thematic districts (AI, Library, Reflection Park, Spaceport, etc.) each hold a category of essays.

🌐 **Live**: https://sophie-city-next.vercel.app

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | React 19 + Tailwind CSS 4 |
| Content | MDX (via `next-mdx-remote` + `gray-matter`) |
| Typography | Source Serif 4 (display) · Inter Tight (sans) · JetBrains Mono (mono) |
| Hosting | [Vercel](https://vercel.com) |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + fonts + metadata
│   ├── page.tsx                # Homepage (composes 5 sections)
│   ├── globals.css             # Tailwind theme + design tokens
│   └── articles/[slug]/page.tsx # Dynamic article reader (3-column PostHog-style)
├── components/
│   ├── Hero.tsx                # Full-bleed illustration + nav
│   ├── Intro.tsx               # Italic editorial intro
│   ├── Articles.tsx            # Article cards grid
│   ├── CityMap.tsx             # 8-district navigation grid
│   ├── SiteHeader.tsx          # Sticky header for non-home pages
│   └── Footer.tsx
├── content/articles/           # ★ Write articles here as .mdx files
└── lib/articles.ts             # File-based content loader
```

## Writing a New Article

1. Create `src/content/articles/<slug>.mdx`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your article title"
   district: ai    # ai | pod | hall | lib | cine | fin | space | garden
   cat: AI Factory
   read: 10 min read
   date: 2026-06-28
   excerpt: "One-sentence summary."
   tags: [tag1, tag2]
   cover: cover-1  # cover-1 to cover-4
   ---
   ```
3. Write the body in Markdown. `## Headings` auto-populate the right-side TOC.
4. Commit and push — Vercel auto-deploys.

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Design

Inspired by:
- **Typography**: The Atlantic
- **Color palette**: Maggie Appleton's *Tools for Thought* (deep violet + warm gold)
- **Article layout**: PostHog blog
- **Hero illustration**: AI-generated, in the style of editorial story-books

---

Built with care in Taipei.
