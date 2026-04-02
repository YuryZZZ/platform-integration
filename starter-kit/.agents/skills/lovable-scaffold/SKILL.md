---
name: lovable-scaffold
description: Generate React component scaffolding via Lovable AI. Produces a mega-prompt from project context, outputs it for user to paste into Lovable, then pulls the result via GitHub MCP.
---

# Lovable Scaffold Skill

## Purpose
Use Lovable to generate high-quality React components with full context from DESIGN.md and PROJECT_SPEC.md. Never write boilerplate React manually. Always use Lovable for UI scaffolding.

---

## When to Use

Use this skill when:
- Building a new page or complex component (> 50 lines)
- Rebuilding an existing page with new design
- User says "scaffold", "build page", "create component", "Lovable"

---

## Step 1 — Read Project Context

```
1. Read docs/PROJECT_SPEC.md → extract:
   - GitHub Repo: <org/repo>
   - Firebase Project ID
   - Product name and description
   - Key features list

2. Read docs/DESIGN.md → extract:
   - Color palette (all hex values)
   - Typography system
   - Component rules
   - Design north star / aesthetic

3. Read docs/COMPETITOR_RESEARCH.md (if exists) → extract:
   - UX patterns to adopt
   - Differentiation points
```

---

## Step 2 — Build the Lovable Mega-Prompt

Structure every Lovable prompt as follows (output in a code block for user to copy):

```
LOVABLE MEGA-PROMPT — [Page/Component Name] — [Date]

## Project Context
Product: [name from PROJECT_SPEC]
Stack: Next.js 15 App Router, TypeScript, Tailwind CSS
Firebase: [project ID] — use Firebase v9 modular SDK

## Design System
Background: [hex] | Primary: [hex] | Secondary: [hex]
Font: [headline font] headlines, [body font] body text
Roundness: [value] on all cards and inputs
Rule: NO 1px borders. Use tonal background shifts for separation.
Aesthetic: [north star from DESIGN.md]

## Component to Build
[Exact description of what to build]
Route: [Next.js route, e.g. /contact]
File: [target file path, e.g. src/app/contact/page.tsx]

## Sections (in order)
1. [Section name]: [exact layout + content]
2. [Section name]: [exact layout + content]
...

## Data & Firebase
- [What data to fetch, which Firestore collection]
- [Auth requirements: public / protected]
- Wire using: import { getFirestore, collection, onSnapshot } from 'firebase/firestore'
- Firebase config from: src/lib/firebase.ts

## Interaction
- [Hover effects required]
- [Form submission behavior]
- [Animation requirements]

## Accessibility
- All interactive elements must have aria-labels
- Keyboard navigable
- Color contrast ≥ 4.5:1

## Do NOT
- Do not use @radix-ui unless already in package.json
- Do not hardcode colors — use CSS custom properties from globals.css
- Do not use `any` TypeScript types
```

---

## Step 3 — Trigger GitHub Pull After Lovable Generates

After user confirms Lovable has generated the component:

```javascript
// Check for new commits from Lovable on the feature branch:
// Lovable typically pushes to: lovable/<feature-name> branch

// 1. Check what branches exist:
github.list_branches({ owner: "<org>", repo: "<repo>" })

// 2. Find the Lovable branch (starts with "lovable/")
// 3. Create a PR to review or merge directly if small:
github.merge_branch({
  owner: "<org>",
  repo: "<repo>",
  base: "master",
  head: "lovable/<branch>",
  commit_message: "feat: [component name] from Lovable"
})

// 4. Pull locally:
run_command: git pull origin master
```

---

## Step 4 — Wire to Firebase

After pulling the component, immediately apply the `firebase-wire` skill to replace any mock data.

---

## Quality Gate

Before marking the task done, verify:
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Component renders: check with `browser_subagent` on localhost:3000
- [ ] Mock data replaced with Firebase calls
- [ ] All images use `next/image`
- [ ] All links use `next/link`
