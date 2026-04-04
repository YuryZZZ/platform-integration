---
name: lovable-scaffold
description: Generate React components directly using write_to_file, OR trigger Lovable via GitHub branch push. Antigravity generates ALL code — the user never pastes anything.
---

# Lovable Scaffold Skill

## Purpose
Generate React components autonomously. Antigravity writes the code directly or pushes a branch that triggers Lovable's GitHub sync. The user does nothing.

---

## Decision: Direct Generation vs Lovable Trigger

```
IF component is < 200 lines:
  → Generate directly with write_to_file (faster, no sync needed)

IF component is a full page with complex interactions:
  → Push a feature branch to GitHub with a Lovable-compatible file structure
  → Lovable auto-syncs from GitHub — no user action needed

NEVER:
  → Ask user to paste a prompt into Lovable
  → Ask user to copy anything
  → Wait for user to do any manual step
```

---

## Path A — Direct Generation (most common)

### Step 1 — Read Context
```
1. Read docs/PROJECT_SPEC.md → product name, GitHub repo, Firebase project ID
2. Read docs/DESIGN.md → ALL design tokens: colors, fonts, roundness, component rules
3. Read docs/COMPETITOR_RESEARCH.md → UX patterns to adopt (if populated)
```

### Step 2 — Generate Component Directly

Use `write_to_file` to create the component at the correct path:

```typescript
// Target: starter-kit/src/app/(marketing)/[route]/page.tsx
//      OR starter-kit/src/components/[Name]/[Name].tsx

'use client'; // only if needs state/effects

import { Metadata } from 'next';
// Import from existing layout components — check what exists first:
// src/components/layout/ — Section, HeroSection, FeatureGrid, CtaBand, etc.

export const metadata: Metadata = {
  title: '[Page Title] | [Product Name from PROJECT_SPEC]',
  description: '[150 char description]',
  openGraph: { title: '...', description: '...', images: ['/og-image.png'] }
};

export default function [PageName]() {
  return (
    // Use tokens from DESIGN.md — never hardcode colors
    // Use existing layout components — never reinvent HeroSection etc.
    // Wire data via firebase-wire skill if real data needed
  );
}
```

### Step 3 — Wire Firebase (if needed)
After generating static structure, apply `firebase-wire` skill immediately to replace any hardcoded data with live Firestore calls.

---

## Path B — GitHub Branch Push (complex pages)

When the page requires Lovable's full visual generation capability:

### Step 1 — Create Feature Branch via GitHub MCP

```javascript
// 1. Get current master SHA:
github.get_branch({
  owner: "<org from PROJECT_SPEC>",
  repo: "<repo from PROJECT_SPEC>",
  branch: "master"
})

// 2. Create feature branch:
github.create_branch({
  owner: "<org>",
  repo: "<repo>",
  branch: "lovable/[feature-name]",
  sha: "<master SHA>"
})
```

### Step 2 — Push Component Spec to Branch

Create a spec file on the branch that Lovable reads:

```javascript
github.create_or_update_file({
  owner: "<org>",
  repo: "<repo>",
  path: "lovable-specs/[feature-name].md",
  message: "feat: add Lovable spec for [feature name]",
  content: btoa(`
# Lovable Spec: [Feature Name]

## Component
File: src/app/(marketing)/[route]/page.tsx

## Design System
Background: [from DESIGN.md]
Primary: [from DESIGN.md]
Font: [from DESIGN.md]
Rule: No 1px borders — tonal background shifts only

## Layout
[Full detailed description of each section]

## Data
[Firebase collection + fields needed]
  `),
  branch: "lovable/[feature-name]"
})
```

### Step 3 — Create PR (Lovable syncs automatically)

```javascript
github.create_pull_request({
  owner: "<org>",
  repo: "<repo>",
  title: "feat: [feature name] — Lovable generation",
  body: "Lovable will generate this component from the spec in lovable-specs/.",
  head: "lovable/[feature-name]",
  base: "master"
})
```

### Step 4 — Monitor and Merge

```javascript
// Poll every 5 minutes for Lovable's generated commit:
github.list_commits({
  owner: "<org>",
  repo: "<repo>",
  sha: "lovable/[feature-name]"
})

// When Lovable has committed the component, merge:
github.merge_pull_request({
  owner: "<org>",
  repo: "<repo>",
  pull_number: <pr_number>,
  merge_method: "squash"
})

// Pull locally to get the generated files:
run_command: git pull origin master
```

---

## Quality Gate (applies to both paths)

After any component is generated:

```
1. Check for TypeScript errors in the new file: npx tsc --noEmit --files [file]
2. Verify imports resolve (no missing modules)
3. Run browser_subagent on localhost:3000/[route] to confirm it renders
4. Check no hardcoded colors (all colors must come from CSS custom props or DESIGN.md tokens)
5. Confirm metadata export exists with title + description
```

---

## Common Components Already Available

Before generating anything new, check if it already exists:

```
src/components/layout/
  HeroSection.tsx      ← hero with headline + CTA + image
  Section.tsx          ← page section wrapper
  ContentGrid.tsx      ← responsive grid
  FeatureGrid.tsx      ← icon cards
  CtaBand.tsx          ← full-width CTA
  FaqSection.tsx       ← accordion FAQ
  PricingCard.tsx      ← pricing plan card
  CustomerWinCard.tsx  ← testimonial
  TrustStrip.tsx       ← logo ticker

src/components/navigation/
  MarketingHeader.tsx  ← nav header
  AppSidebar.tsx       ← app nav

src/components/ui/
  Button, Input, Card, Modal, Toast, Badge, etc.
```

If the component exists — USE IT. Do not recreate it.
