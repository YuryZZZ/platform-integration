# Lovable System Configuration
# ─────────────────────────────────────────────────────────────
# This file is auto-read by Lovable on every generation.
# It sets project-specific brand + architecture constraints.
# UPDATE the <<PLACEHOLDER>> values after running init.ps1
# ─────────────────────────────────────────────────────────────

## Project
- **Project Name**: <<YOUR_PROJECT_NAME>>
- **Industry / Context**: <<e.g. London construction company, Est. 2001>>

## Core Design Tokens

### Color Palette
- **Background (Dark):** #0f172a
- **Surface / Cards:** rgba(255, 255, 255, 0.03) with border rgba(255, 255, 255, 0.06)
- **Primary Brand Color:** <<YOUR_PRIMARY_HEX e.g. #E8A020>> ← UPDATE THIS
- **Primary Dark (hover):** <<YOUR_PRIMARY_DARK_HEX e.g. #C8841A>>
- **Success:** #34d399
- **Warning:** #fbbf24
- **Error:** #f87171

### Typography
- **Font Family:** Inter, system-ui, -apple-system, sans-serif
- **Heading Scale:** 2.5rem / 2rem / 1.5rem / 1.25rem / 1rem / 0.875rem
- **Body:** 1rem (16px) base

### Shape & Spacing
- **Corner Radius:** 8px (buttons), 12px (cards), 16px (modals)
- **Spacing Grid:** 8px base (4, 8, 12, 16, 24, 32, 48, 64)

### Appearance
- **Default Mode:** Dark (design dark-first, light mode is secondary)
- **Light Mode Background:** #f8fafc

## Architectural Constraints (MUST FOLLOW)
- Use **Tailwind CSS** for all styling — no inline styles, no CSS modules
- Use **TypeScript** for all components — no .jsx files
- Do **NOT** add Supabase — use Firebase Firestore only
- Do **NOT** add authentication logic — leave as placeholder, Antigravity will wire it
- Build UI statelessly with **mock/typed data** — no live API calls in components
- Export all components as **named exports** from their own files
- Follow the 8px grid system exclusively
- Push to branch: **lovable/[feature-name]** — NEVER to master directly
- Do **NOT** create new backend routes or API endpoints

## Content Voice
- **Tone**: <<e.g. professional, trustworthy, premium — not salesy>>
- **Location**: <<e.g. London, UK>>
- **Phone**: <<YOUR_PHONE>>
- **Email**: <<YOUR_EMAIL>>
