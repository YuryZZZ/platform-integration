# Lovable Design System Configuration
# This file is auto-read by Lovable on every generation.
# It enforces the design tokens defined in docs/DESIGN.md.
# See: docs/LOVABLE_PROMPT_GUIDE.md for usage rules.

## Core Design Tokens

### Color Palette
- **Background (Dark):** #0f172a
- **Surface / Cards:** rgba(255, 255, 255, 0.03) with border rgba(255, 255, 255, 0.06)
- **Primary:** #6366f1 (indigo-500)
- **Accent:** #a855f7 (purple-500)
- **Success:** #34d399 (emerald-400)
- **Warning:** #f59e0b (amber-500)
- **Error:** #f87171 (red-400)

### Typography
- **Font Family:** Inter, system-ui, -apple-system, sans-serif
- **Heading Scale:** 2.5rem / 2rem / 1.5rem / 1.25rem / 1rem / 0.875rem
- **Body:** 1rem (16px) base

### Shape & Spacing
- **Corner Radius:** 8px (buttons), 12px (cards), 16px (modals)
- **Spacing Grid:** 8px base (4, 8, 12, 16, 24, 32, 48, 64)

### Appearance
- **Default Mode:** Dark
- **Light Mode Background:** #f8fafc

## Architectural Constraints
- Use **Tailwind CSS** for all styling
- Use **TypeScript** for all components
- Do **NOT** add Supabase database queries or authentication
- Build UI statelessly with **mock data** using typed interfaces
- Export all components as named exports from their own files
- Follow the 8px grid system exclusively
