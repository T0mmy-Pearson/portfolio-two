# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server (default http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — `next lint` (ESLint via `eslint-config-next`)

There is no test runner configured.

## Stack

Next.js 14 App Router, React 18, TypeScript (with `strict: false`), Tailwind CSS. Deployed on Vercel; `@vercel/analytics` and `@vercel/speed-insights` are wired into [app/layout.tsx](app/layout.tsx). Contact form uses `@emailjs/browser` (no backend).

## Architecture

This is a single-page portfolio. The whole app is essentially one route ([app/page.tsx](app/page.tsx)) that renders [components/Hero.tsx](components/Hero.tsx) plus three modal components (`About`, `Contact`, `TechStack`) gated by boolean state in `Home`.

Note that [app/layout.tsx](app/layout.tsx) is marked `'use client'`, so the entire tree is client-rendered — there are no server components or data fetching, and `Home` itself is also `'use client'`.

### Hero is the orchestrator

[components/Hero.tsx](components/Hero.tsx) owns the interactive state for the three "role" links (Full-Stack Developer, Artist, Writer) shown in the headline. Each one triggers a different UI mode:

- **Full-Stack Developer** → opens [components/ProjectCarousel.tsx](components/ProjectCarousel.tsx). On desktop it appears as a modal overlay; on mobile (`window.innerWidth < 1024`) Hero switches to a sliding two-panel layout where the hero translates left and the carousel slides in from the right. Mobile vs desktop branching is in Hero's JSX — both renderings of `ProjectCarousel` exist in the tree, gated by `isMobile`.
- **Artist** → activates [components/PaintTrailEffect.tsx](components/PaintTrailEffect.tsx), a full-screen mouse-trail paint mode (ESC to exit). See [PAINT_TRAIL_README.md](PAINT_TRAIL_README.md) for details.
- **Writer** → opens [components/WriterPortfolio.tsx](components/WriterPortfolio.tsx). On mobile it's rendered above the hero; on desktop it's an overlay.

The mobile breakpoint (1024px) is detected via a resize listener in Hero's `useEffect`; keep that in sync if you add another responsive branch.

### Project data

The list of portfolio projects is hardcoded as the `projects` array at the top of [components/ProjectCarousel.tsx](components/ProjectCarousel.tsx). Image URLs reference `raw.githubusercontent.com/T0mmy-Pearson/portfolio-two/main/Public/...` rather than the local `/public` folder — when adding a project, push the image to the `main` branch first or it will 404 in the carousel. The CapCheck entry uses `isModal: true` and a `videoUrl` (Vercel Blob storage) instead of a `url` link; that branch is handled specially in the carousel.

### Modals

`About`, `Contact`, `TechStack`, `WriterPortfolio` each accept an `onClose` prop and handle their own ESC-key listener. They render as fixed-position overlays with high z-index (e.g. `z-[9999]`).

## Conventions

- Tailwind classes only; no CSS modules. Custom keyframes/animations live in [app/globals.css](app/globals.css) (e.g. `animate-fade-in-up`, `animate-pulse-shadow`, `libertinus-mono-regular` font class).
- Brand palette: background `#f0edcf` (cream), accent `#cb4242` (red), modal backdrop `bg-black/50`.
- Components are colocated in [components/](components/) — flat, no subfolders.
- TypeScript is non-strict; props use inline `interface` declarations next to the component.
