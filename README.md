# Kawser Hamid — Minimal Executive Hero v3

A dark, minimal CEO hero for a one-page personal portfolio. Built with **React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lucide**. The supplied `MinimalistHero` component is adapted to a personal executive design with a cursor-following spotlight, restrained 3-image carousel and reduced-motion handling.

## Local setup

```bash
npm install
npm run dev
npm run build
```

Shadcn-compatible layout is **`src/components/ui/`**, aliased as `@/components/ui`. The `components.json` file points the shadcn CLI there, with styling in `src/index.css`. This is the Vite equivalent of `/components/ui`: putting UI components in a single shared folder makes imports, reuse and future `npx shadcn@latest add <component>` predictable.

## Content

- Primary CEO portrait: `/assets/photos/executive-portrait.webp`
- Secondary images: `keynote.webp` and `saudi-consultation.webp`
- Consult button opens an email inquiry. This is NOT a paid booking backend.
- Company link is secondary to the personal brand. No invented success metrics.

## Deployment

Vercel uses the Vite framework and `dist` output. On any future GitHub push it will rebuild automatically. Previous static HTML files have been retired from the Git tree, but all media assets remain available.
