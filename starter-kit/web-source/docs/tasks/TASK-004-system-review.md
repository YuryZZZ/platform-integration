# TASK-004: Deep System Specification Review

**Status**: IN_PROGRESS
**Type**: Audit & Alignment

## 1. Goal
Conduct a deep system review of all tools, code, files, and settings to ensure strict compliance with the project specifications outline in Markdown files (`PROJECT_SPEC.md`). 

## 2. Review Plan (Decomposed)
- **Phase A: Architecture & Core Packages** (Next.js 15, React 19, TS, Tailwind CSS 4, pgvector) - *Verified package.json*
- **Phase B: CMS & Data Schema** (Payload CMS v3 + 8 required collections: Users, Pages, Media, Portals, Websites, Components, Navigation, DesignTokens)
- **Phase C: Security Boundaries** (CSP, HSTS, RLS, parameterization, Zod auth boundaries)
- **Phase D: Integrations & Surface Model** (GitHub, Google Stitch, Firebase Studio, Lovable adapters handling; Smartphone, Tablet, Desktop, Smart TV UI breakpoints and hooks)
- **Phase E: Branding Cleanup** (Scrubbing remaining references to the old 'Nexus AI' domain name replacing with neutral configurations aligned to standard conventions)

## 3. Verify & Deploy
Execute `/verify-pyramid` iteratively upon corrections, logging findings in this sheet.
