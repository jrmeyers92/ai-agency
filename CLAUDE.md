# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based personal website with TypeScript, Tailwind CSS, and content collections for blogging. The site showcases AI and web development services with modern animations, custom design system, Google Analytics integration, and Netlify deployment.

## Commands

### Development
- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview build locally
- `npm run astro check` - Run Astro's TypeScript checker
- `npm run astro ...` - Run Astro CLI commands

### Linting & Formatting  
- Prettier is configured with astro plugin for code formatting
- No explicit lint command - relies on Astro's built-in checks

## Architecture

### Core Structure
- **Astro Framework**: Static site generator with islands architecture
- **Layout System**: Single main layout (`Layout.astro`) with comprehensive SEO meta tags, structured data for local business, and Google Analytics
- **Component-Based**: Reusable Astro components for Hero, About, Services, Contact, Nav, etc.
- **Content Collections**: Zod-validated blog posts in `src/content/blog/` with frontmatter schema (title, description, pubDate, optional image)

### Styling & Assets
- **Tailwind CSS**: Custom design system with extended theme configuration
  - **Fonts**: "Inter" (sans) and "Bricolage Grotesque" (display) font families
  - **Color Palette**: Three-tier system with primary (blue), accent (cyan), and neutral (slate) scales (50-950)
  - **Custom Animations**: fade-in, fade-in-up, scale-in, float, glow with corresponding keyframes
  - **Custom Shadows**: soft, medium, hard, glow-primary, glow-accent utilities
  - **Gradient Utilities**: gradient-radial, gradient-conic, mesh-gradient backgrounds
- **Typography Plugin**: @tailwindcss/typography for rich text content
- **Astro Icon**: Icon system integration
- **Assets**: Located in `src/assets/` and `src/icons/` directories

### Key Integrations
- **Partytown**: Third-party script optimization for analytics
- **Sitemap**: @astrojs/sitemap for automatic XML sitemap generation (site: jake-meyers.com)
- **Google Analytics**: Component-based integration (GA4: G-DQ04W7HCE8)
- **View Transitions**: Astro's built-in page transitions for smooth navigation
- **Netlify**: Configured for deployment with build command and dist publish directory

### Content Management
- Blog posts use Astro's content collections with TypeScript/Zod validation in `src/content/config.ts`
- Schema: `{ title: string, description: string, pubDate: date, image?: string }`
- Dynamic routing for blog posts via `src/pages/blog/[slug].astro`
- Blog index page at `src/pages/blog/index.astro`

### SEO & Meta
- Comprehensive meta tag setup in `src/layouts/Layout.astro` including Open Graph and Twitter Cards
- Canonical URLs pointing to jake-meyers.com
- Sitemap automatically generated for all pages