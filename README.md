# Portfolio Builder

A Squarespace-style portfolio site built with Next.js 16, Sanity CMS, and Tailwind CSS v4.

Content is managed through Sanity Studio (available at `/studio`) — add, edit, and reorder blocks without touching code.

## Stack

- **Next.js 16** — App Router, React 19, TypeScript
- **Sanity v3** — Headless CMS with embedded Studio
- **Tailwind CSS v4** — Utility-first styling with CSS variable theming
- **Vercel** — Deployment

## Getting Started

### 1. Create a Sanity project

Go to [sanity.io/manage](https://www.sanity.io/manage), create a new project, and note the **Project ID**.

### 2. Configure environment variables

Copy the placeholder env file and fill in your Sanity project ID:

```bash
cp .env.example .env.local
```

Or edit `.env.local` directly:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```

### 3. Install dependencies and run

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### 4. Add content

1. Open `/studio` and log in with your Sanity account
2. Create a **Site Settings** document (site title, navigation, social links, theme)
3. Create a **Page** document, mark it as the homepage, and add content blocks

## Content Blocks

| Block | Description |
|-------|-------------|
| **Hero** | Full-width heading with optional background image and CTA |
| **Image Gallery** | Responsive grid with lightbox, configurable columns |
| **Video Embed** | YouTube/Vimeo URL auto-converted to embed |
| **Rich Text** | Portable Text with headings, links, inline images |

## Project Structure

```
app/
├── (site)/          # Public portfolio routes
│   ├── layout.tsx   # Header + Footer wrapper
│   ├── page.tsx     # Homepage
│   └── [slug]/      # Dynamic pages
├── studio/          # Sanity Studio (admin panel)
└── layout.tsx       # Root layout (fonts, globals)

sanity/
├── schemas/         # Content type definitions
│   ├── blocks/      # Block schemas (hero, gallery, video, rich text)
│   └── documents/   # Document schemas (page, siteSettings)
└── lib/             # Client, queries, image helpers

components/
├── blocks/          # Block renderer + individual block components
└── layout/          # Header, Footer, Navigation, ThemeProvider
```

## Theming

Colors and fonts are managed via CSS custom properties. Edit them in:

1. **Sanity Studio** — Site Settings → Theme (primary color, accent color, font family)
2. **`app/globals.css`** — default values and Tailwind `@theme` integration

## Deployment

Push to GitHub and connect to [Vercel](https://vercel.com). Add the environment variables in the Vercel dashboard.
