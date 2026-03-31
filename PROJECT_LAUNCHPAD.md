# Project Launchpad

A reusable, stack-agnostic checklist for bootstrapping a client-facing web application from scratch. Detailed enough that another developer can pick it up and know exactly what to do and why.

---

## Phase 0: Discovery & Constraints

**Goal:** Understand what you're building before touching code. Most wasted time in freelance work comes from building the wrong thing.

- [ ] Define the user: Who will use this? What are they trying to accomplish? What's their technical skill level?
- [ ] Define the content types: What kinds of content will exist? (images, text, video, forms, etc.)
- [ ] Define the editing model: How will content be managed? (CMS admin panel, inline editing, code-only, etc.)
- [ ] Set the budget constraint: hosting, services, domains — what's the ceiling?
- [ ] Set the timeline: MVP deadline vs polish deadline. Ship ugly but working before beautiful but incomplete.
- [ ] Identify reuse potential: Will this be a one-off, or a template for future clients?

**Pitfalls:**
- Skipping this phase leads to scope creep. You'll add features nobody asked for.
- Don't conflate "what the client says they want" with "what the client actually needs." An actor doesn't need a blog engine — they need a headshot gallery and a reel page.

---

## Phase 1: Tech Stack Selection

**Goal:** Choose tools that match the project constraints, not tools you want to learn.

- [ ] **Framework:** Pick based on rendering needs (SSR for SEO, SPA for dashboards, SSG for content sites). Consider ecosystem maturity and deployment story.
- [ ] **Content management:** If the client edits content, use a CMS. Don't build an admin panel from scratch unless the CMS *is* the product. Evaluate: hosted vs self-hosted, free tier limits, schema flexibility, image handling.
- [ ] **Styling:** Utility-first (Tailwind) for rapid prototyping with full control. Component libraries (shadcn, Radix) for interactive elements. CSS Modules for isolated styles without a framework.
- [ ] **Hosting:** Match to the framework. Vercel for Next.js, Netlify for Astro/Gatsby, Railway/Fly for custom backends.
- [ ] **Auth:** If needed, prefer a managed service (Clerk, Auth0, Supabase Auth) over rolling your own. Rolling auth is a security liability for beginners.
- [ ] **Database:** Only add one if the CMS doesn't cover your data needs. Supabase (Postgres), PlanetScale (MySQL), or Turso (SQLite) for free tiers.

**Pitfalls:**
- Don't pick a tool because it's popular on Twitter. Pick it because it solves your specific problem with acceptable tradeoffs.
- Bleeding-edge tools have fewer tutorials and more bugs. Budget extra time if you choose them.
- "Free tier" doesn't mean "free forever." Read the limits. Know what happens when you exceed them.

**Decision documentation:** Write down *why* you chose each tool. Future-you (or the next developer) will thank you.

---

## Phase 2: Project Scaffolding

**Goal:** Get a working skeleton that compiles, deploys, and renders something on screen.

- [ ] Initialize the project with the framework's CLI (`create-next-app`, `npm create astro`, etc.)
- [ ] Configure TypeScript with strict mode enabled. Loose types now means debugging types later.
- [ ] Configure linting and formatting (ESLint, Prettier or Biome). Set these up *before* writing code, not after.
- [ ] Set up version control (Git). Write a `.gitignore` before your first commit. Never commit `node_modules/`, `.env`, or build output.
- [ ] Create a `.env.local` (or equivalent) with placeholder values. Document every env var in a `.env.example` file.
- [ ] Verify the dev server runs and the deploy pipeline works (push to GitHub → auto-deploy). Don't write features until this loop is proven.

**Pitfalls:**
- Don't customize the framework config until you need to. Stock defaults are battle-tested.
- Don't install packages speculatively. Install when you need them, not when you think you might.

---

## Phase 3: Content Modeling

**Goal:** Define the shape of your data before building UI. This is database design, whether you're using a database or a CMS.

- [ ] List every content type (page, post, product, setting, etc.)
- [ ] For each content type, list its fields, types, and validation rules
- [ ] Identify relationships (a Page has many Blocks; a NavItem references a Page)
- [ ] Identify singletons vs collections (site settings = singleton; pages = collection)
- [ ] Define block/component types if using a modular content model
- [ ] Implement schemas in your CMS or database
- [ ] Seed test data — enough to exercise every content type and edge case (empty fields, long text, missing images)

**Pitfalls:**
- Over-modeling: Don't create 15 block types on day one. Start with 3-4, add more when the client asks.
- Under-validating: If a field is required, mark it required. If a URL must be valid, validate it. Don't rely on the client to "just know."
- Forgetting alt text: Every image field should have a required alt text field. Accessibility is not optional.

---

## Phase 4: Data Fetching Layer

**Goal:** Create a clean boundary between your CMS/database and your UI. Components should receive typed data, not raw API responses.

- [ ] Write query functions (GROQ, SQL, GraphQL, REST) in a dedicated file
- [ ] Define TypeScript types for every data shape your UI will consume
- [ ] Create helper utilities (image URL builders, date formatters, etc.)
- [ ] Handle the "no data" case in every query consumer — what renders when the CMS is empty?

**Pitfalls:**
- Don't fetch data in components that don't need it. Fetch at the page level, pass down as props.
- Don't trust API responses. Type them, but also handle `null` and `undefined` gracefully.
- Don't over-fetch. Only query the fields your UI actually uses.

---

## Phase 5: Layout & Navigation

**Goal:** Build the chrome — the parts that appear on every page. Header, footer, navigation, overall page structure.

- [ ] Build the root layout (fonts, global styles, metadata defaults)
- [ ] Build the site layout (header, main content area, footer)
- [ ] Build navigation driven by CMS data (so the client can reorder pages without code changes)
- [ ] Handle mobile navigation (hamburger menu or similar)
- [ ] Set up route structure (homepage, dynamic pages, any special routes like /studio or /admin)

**Pitfalls:**
- Hard-coding navigation links. If the client can't add a page without a code change, the CMS isn't doing its job.
- Forgetting the empty state. What does the site look like before any content exists? This is the first thing the client sees.
- Ignoring mobile from the start. Retrofit is harder than building responsive from day one.

---

## Phase 6: Component Development

**Goal:** Build the UI components that render content. Work from the inside out — smallest components first, then compose them.

- [ ] Build a Block Renderer — the dispatch layer that maps content types to React components. This is the plugin system that makes adding new blocks trivial.
- [ ] Build each content block component, one at a time:
  - [ ] Start with the simplest (rich text)
  - [ ] Move to media (images, galleries, video embeds)
  - [ ] End with complex interactive pieces (lightbox, carousels, forms)
- [ ] Use the CMS's built-in image pipeline if available. Don't self-host images or write your own resizer.
- [ ] Handle video embeds by URL parsing (extract YouTube/Vimeo IDs, generate embed URLs). Don't ask the client to paste iframe code.

**Pitfalls:**
- Building components without data. Always develop against real (or realistic seed) data from the CMS.
- Skipping error states. What happens when an image fails to load? When a video URL is invalid? When the rich text is empty?
- Premature abstraction. Don't make a component "generic" until you have 2+ places that need the same thing.

---

## Phase 7: Theming

**Goal:** Make visual customization a first-class feature, not a hack. The client should be able to change colors and fonts without a developer.

- [ ] Define CSS custom properties for all design tokens (colors, fonts, spacing, border radius)
- [ ] Store theme values in the CMS (as part of site settings)
- [ ] Inject theme values as CSS variables at the layout level
- [ ] Ensure all components use the variables, not hard-coded values
- [ ] Test with at least 2 different color schemes to verify the system works

**Pitfalls:**
- Hard-coding colors in components. Every `bg-blue-500` should be `bg-primary` or `bg-accent` using CSS variables.
- Not testing dark-on-light AND light-on-dark. If the client picks a dark primary color, does the text become unreadable?
- Over-engineering the theme system. Color + font + accent is usually enough. Don't build a full design system for a portfolio site.

---

## Phase 8: SEO & Metadata

**Goal:** Make the site discoverable. A portfolio that doesn't show up in Google is just a localhost.

- [ ] Set dynamic page titles from CMS data (`Page Title | Site Name`)
- [ ] Set meta descriptions from CMS data (fall back to site-wide default)
- [ ] Add Open Graph tags (title, description, image) for social media sharing
- [ ] Generate a sitemap (or use the framework's built-in sitemap generation)
- [ ] Ensure all images have alt text
- [ ] Ensure all pages have a single `<h1>`
- [ ] Test with browser dev tools → Lighthouse → SEO audit

**Pitfalls:**
- Using the same title/description on every page. Each page needs unique metadata.
- Forgetting Open Graph images. When someone shares the site on Instagram/Twitter, what image shows?
- Over-optimizing. For a portfolio site, good titles + descriptions + fast load times cover 90% of SEO.

---

## Phase 9: Testing & QA

**Goal:** Catch bugs before the client does.

- [ ] Test every content block with real data from the CMS
- [ ] Test the empty state (no content, no settings)
- [ ] Test on mobile (real device, not just browser dev tools)
- [ ] Test on slow connections (Chrome DevTools → Network → Slow 3G)
- [ ] Verify all links work (internal and external)
- [ ] Run Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
- [ ] Test the admin panel: can the client add, edit, reorder, and delete content?

**Pitfalls:**
- Only testing the happy path. The most common real-world scenario is "partially filled out content."
- Not testing on the client's actual device. Ask them what browser/phone they use.

---

## Phase 10: Deployment & Handoff

**Goal:** Ship it. Then make sure the client can use it.

- [ ] Deploy to production hosting
- [ ] Connect the custom domain
- [ ] Set up DNS (usually CNAME to the hosting provider)
- [ ] Enable HTTPS (usually automatic with Vercel/Netlify)
- [ ] Set environment variables in the hosting provider's dashboard
- [ ] Write a brief "How to update your site" guide for the client (screenshots help)
- [ ] Walk the client through the admin panel in a screen-share
- [ ] Set up monitoring/alerts if applicable (Vercel Analytics, Sentry)

**Pitfalls:**
- Deploying on a Friday. Always deploy early in the week so you have time to fix issues.
- Not documenting the env vars. If you get hit by a bus, can someone else redeploy this?
- Assuming the client will "figure it out." Do the handoff call. Record it.

---

## Post-Launch

- [ ] Monitor for errors in the first week
- [ ] Collect client feedback after 2 weeks of real use
- [ ] Address any content modeling gaps (blocks they need that don't exist yet)
- [ ] Set up a maintenance cadence (dependency updates, framework upgrades)
- [ ] Archive the project knowledge: what worked, what you'd do differently, what you'd reuse

---

## Template Reuse Checklist

When spinning this up for a new client:

- [ ] Fork/copy the repo
- [ ] Create a new CMS project (new project ID, new dataset)
- [ ] Update `.env.local` with new credentials
- [ ] Update site metadata (title, description)
- [ ] Update theme values in CMS (colors, fonts)
- [ ] Add/remove block types as needed for the client's content
- [ ] Deploy to a new Vercel project
- [ ] Connect the client's domain
