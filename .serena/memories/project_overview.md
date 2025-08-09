# Company Demo Site - Project Overview

## Project Purpose
This is a reusable corporate website template designed for the real estate and housing industry. Built with Next.js 14 (App Router) and TypeScript, it's designed to allow quick brand switching and customization.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm (preferred) or npm
- **Font**: Inter (Google Fonts), Noto Sans JP
- **Build Output**: Static Site Generation (SSG)

## Key Features
- Fast SSG support with Next.js 14
- Fully responsive mobile-first design
- Easy customization via design tokens
- Accessibility compliant (WCAG 2.1 AA)
- SEO optimized with structured data and OGP support
- High performance (Lighthouse Score 90+)

## Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components (ui/, sections/, layout/)
- `content/` - Markdown content (works, news, topics)
- `data/` - JSON data files
- `lib/` - Utility functions
- `public/` - Static assets (images, fonts)
- `styles/` - Style-related files and CSS tokens
- `tokens/` - Design tokens (brand.json)
- `config/` - Configuration files (site.ts, navigation.ts)
- `types/` - TypeScript type definitions

## Environment Variables
Key environment variables (set in `.env.local`):
- `NEXT_PUBLIC_SITE_URL` - Site URL
- `NEXT_PUBLIC_FORMSPREE_ID` - Form submission service
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API
- `NEXT_PUBLIC_GA_ID` - Google Analytics (optional)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile (optional)

## Platform
- OS: Darwin (macOS) 24.5.0
- Working directory: /Users/hikasaryusuke/Desktop/campany-demo-site