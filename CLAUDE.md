# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based AI agency website with TypeScript, Tailwind CSS, and content collections for blogging. The site is designed for an AI/web development consultancy based in St. Louis, Missouri, with Google Analytics integration and Netlify deployment.

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
- **Tailwind CSS**: Custom theme extends with "montserrat" font family and "themeBrown" color (#af824c)
- **Typography Plugin**: @tailwindcss/typography for rich text content
- **Astro Icon**: Icon system integration
- **Assets**: Located in `src/assets/` and `src/icons/` directories

### Key Integrations
- **Partytown**: Third-party script optimization
- **Google Analytics**: Component-based integration (GA4: G-DQ04W7HCE8)
- **View Transitions**: Astro's built-in page transitions
- **Netlify**: Configured for deployment with build command and dist publish directory

### Content Management
- Blog posts use Astro's content collections with TypeScript validation
- Dynamic routing for blog posts via `[slug].astro`
- Structured data schema for local business SEO

### SEO & Meta
- Comprehensive meta tag setup in Layout.astro including Open Graph, Twitter Cards, and local business structured data
- Canonical URLs with fallback to gatewaydigitalstudio.com
- St. Louis geo-targeting with coordinates and service area radius