# Google Stitch Integration Guide

> **Google Stitch** is Google's AI-powered UI design platform.
> Use it to generate, iterate, and apply design systems across screens — all from Antigravity.

---

## Access

- **URL**: https://stitch.google.ai  
- **MCP Tool**: already configured in Antigravity — use `mcp_StitchMCP_*` tools directly  
- **No separate login needed** — uses your Google account ADC

---

## What Stitch Does

| Capability | Description |
|-----------|-------------|
| Generate screens | Create full UI screens from a text prompt |
| Apply design system | Apply brand colors, fonts, shapes to all screens at once |
| Create variants | Generate 2–4 design alternatives for any screen |
| Edit screens | Modify a specific screen with a prompt |
| Export code | Get React/Next.js code from designed screens |

---

## When to Use Stitch

- **New page designs**: "Design a services pricing page for a construction company"
- **Design system application**: Apply brand color across all screens in one call
- **Variant exploration**: Generate 3 alternatives for the hero section
- **Visual mockups for Jules prompts**: Design first, then send to Jules to build

---

## Typical Antigravity Commands

### Create a new screen
```
Use Stitch to design a Contact Us page for this project.
Brand: [PRIMARY_COLOR] on dark background.
Include: headline, subtext, enquiry form (name, phone, email, message), submit button.
Style: premium, trustworthy, consistent with docs/DESIGN.md.
```

### Apply the design system to all screens
```
Use Stitch to apply our design system to all project screens.
Primary color: [PRIMARY_COLOR]
Font: Inter
Corner radius: 8px (buttons), 12px (cards)
Dark mode background: #0f172a
```

### Generate variants
```
Use Stitch to generate 3 hero section variants for this project.
Keep: headline and CTA structure.
Vary: layout, gradient direction, image placement.
```

---

## Stitch → Jules → Live Flow

```
1. Stitch designs the screen (visual)
         ↓
2. Export / describe the design in a Jules prompt
         ↓
3. Jules builds the component (code)
         ↓
4. Antigravity reviews PR + deploys
```

---

## Key Rules for Stitch Prompts

1. Always include brand color from `DESIGN.md`
2. Always specify dark mode as default
3. Say "Nexus block system" if generating for this template (PageRenderer + Contentblock)
4. Do NOT generate Supabase or Prisma — "Firebase Firestore only"

---

## Reference
- Stitch platform: https://stitch.google.ai
- Stitch MCP tools: search `StitchMCP` in Antigravity tool list
