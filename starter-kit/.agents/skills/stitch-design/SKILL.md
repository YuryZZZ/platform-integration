---
name: stitch-design
description: Use Google Stitch MCP to generate UI screens for this project. Always reads PROJECT_SPEC.md for project ID and DESIGN.md for tokens. Never hardcodes project IDs.
---

# Stitch Design Skill

## Purpose
Generate production-quality UI screens using the Google Stitch MCP, using this project's exact design tokens. Never invent styles. Never use another project's tokens.

---

## Step 1 — Discover Project Context

```
1. Read docs/PROJECT_SPEC.md → find "Stitch Project ID" in Project Identifiers table
   If value is a placeholder comment:
     → Call mcp_StitchMCP_list_projects
     → Match by: project title closest to this repo name
     → Write the discovered ID back into PROJECT_SPEC.md
     → Stage and commit: "chore: register Stitch project ID in PROJECT_SPEC"

2. Read docs/DESIGN.md → extract:
   - background color
   - primary color
   - secondary color
   - font family (headline + body)
   - roundness level
   - spacing scale
   - key component rules (no-line rule, glass rule, etc.)
```

---

## Step 2 — Build the Stitch Prompt

Compose a prompt that includes ALL of the following:

```
REQUIRED PROMPT STRUCTURE:
1. Page type: "Generate a [page type] for [product description]"
2. Color tokens: "Background [hex], primary [hex], secondary [hex]"
3. Font: "Headlines in [font], body in [font]"
4. Key layout: describe the section structure explicitly
5. Component details: hero, cards, forms, CTAs with specific content
6. No-line rule: "No 1px borders — use background tonal shifts only"
7. Roundness: "Corner radius [value]rem on all cards"
8. Tone: "Aesthetic: [design system north star from DESIGN.md]"
```

---

## Step 3 — Generate the Screen

```javascript
// Call:
mcp_StitchMCP_generate_screen_from_text({
  projectId: "<discovered from PROJECT_SPEC.md>",
  deviceType: "DESKTOP", // or MOBILE based on task
  modelId: "GEMINI_3_1_PRO", // use Pro for complex screens
  prompt: "<full structured prompt from Step 2>"
})

// Wait for completion (up to 3 minutes — do NOT retry)
// Output contains: screenId, thumbnailUrl, htmlContent
```

---

## Step 4 — Retrieve & Save

```javascript
// Get the generated screen:
mcp_StitchMCP_get_screen({
  projectId: "<project ID>",
  screenId: "<returned screenId>",
  name: "projects/<id>/screens/<screenId>"
})

// Save the HTML/CSS output to:
// web/src/components/[PageName]/[PageName].tsx (convert to React)
// OR web/src/app/[route]/page.tsx if it's a full page
```

---

## Step 5 — Convert to React Component

When converting Stitch HTML to React:
- Replace `class=` with `className=`
- Extract inline styles to CSS modules or Tailwind classes
- Replace hardcoded text with props + content from `docs/DESIGN.md` sample content
- Add `'use client'` directive if the component uses state or effects
- Wire any forms to Firebase via the `firebase-wire` skill

---

## Variant Generation

For A/B testing or design exploration:
```javascript
mcp_StitchMCP_generate_variants({
  projectId: "<project ID>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Generate 2 variants: [describe what to vary]",
  variantOptions: {
    count: 2,
    creativeRange: "MODERATE",
    focusAspects: ["layout", "color"]
  }
})
```

---

## Design System Updates

If the user changes branding (colors, fonts, roundness):
```javascript
// Update the design system first:
mcp_StitchMCP_update_design_system({
  name: "assets/<asset_id>",
  projectId: "<project ID>",
  designSystem: {
    colorMode: "DARK",
    customColor: "<new primary hex>",
    font: "<INTER|PLUS_JAKARTA_SANS|MANROPE|etc>",
    roundness: "<ROUND_FOUR|ROUND_EIGHT|ROUND_FULL>",
    designMd: "<contents of docs/DESIGN.md>"
  }
})
// Then re-apply to all screens:
mcp_StitchMCP_apply_design_system({...})
```

---

## Error Handling

| Error | Action |
|-------|--------|
| Screen generation timeout | Wait 5 minutes total — Stitch can be slow. Do NOT retry. |
| Project ID not found | Re-run list_projects, update PROJECT_SPEC.md |
| HTML too complex to convert | Delegate conversion to jules-dispatch skill |
| Design token mismatch | Re-read DESIGN.md, regenerate with corrected prompt |
