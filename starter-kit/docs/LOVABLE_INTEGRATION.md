# Lovable Integration Guide

> **Lovable** (lovable.dev) is the AI-powered React app builder.
> It generates full UI components and pages from prompts, pushing to your GitHub repo.
>
> **Rule**: Lovable builds the visual UI. Antigravity wires the backend + deploys.

---

## Setup (One-Time)

1. **Account**: https://lovable.dev — sign in with GitHub
2. **Connect repo**: Settings → GitHub → Authorize → select your repository
3. **System prompt**: Copy content from `.lovable/system.md` into Lovable project settings

---

## The `.lovable/system.md` File

This file lives in **every project** and tells Lovable exactly how to behave:
- Brand colors from `docs/DESIGN.md`
- Do NOT generate Supabase — use Firebase
- Follow Nexus block structure
- Push to `lovable/feature-name` branch, not master

---

## Workflow

```
You write a Lovable prompt (or Antigravity generates one)
         ↓
Lovable builds the UI, pushes branch to GitHub
         ↓
GitHub PR created: lovable/[feature-name] → master
         ↓
git pull in Antigravity → review → merge
         ↓
/verify-pyramid → /deploy-changed
```

---

## Prompting Lovable Correctly

### ✅ Good Lovable prompt

```
Build a Services section for a premium London construction company.

CONSTRAINTS:
- Dark background: #0f172a
- Brand color: [YOUR_PRIMARY_COLOR]
- Font: Inter (Google Fonts)
- Layout: 3-column grid on desktop, 1-column on mobile
- Each service card: icon (Lucide React), title, 2-line description, CTA link
- Services: Extensions, Bathrooms, Kitchens, Flooring, Electrical, CCTV
- No Supabase, no Prisma, no Express — Firebase Firestore only
- Do NOT create a backend — leave data wiring as a placeholder
- Push to branch: lovable/services-section

OUTPUT: A standalone ServicesSection.tsx component + its CSS module.
```

### ❌ What to avoid in Lovable prompts
- "Add authentication" → do in Antigravity (Firebase Auth)
- "Connect to database" → do in Antigravity (Firestore)
- "Deploy the app" → do in Antigravity (/deploy-changed)
- Anything involving secrets or API keys → never in Lovable

---

## Syncing Lovable → Local

```powershell
# After Lovable pushes to GitHub:
git fetch origin
git checkout lovable/[branch-name]
cd web && npm run build    # verify it compiles
git checkout master
git merge lovable/[branch-name]
git push origin master
```

Or use the sync script:
```powershell
.\scripts\sync_lovable.ps1 -Branch "lovable/services-section"
```

---

## Antigravity Generates Lovable Prompts

When you say "Generate a Lovable prompt for [X]", Antigravity will:
1. Read `docs/DESIGN.md` for brand tokens
2. Read `docs/PROJECT_SPEC.md` for architecture constraints
3. Read `.lovable/system.md` for Lovable-specific rules
4. Output a 500–1000 word engineering-grade prompt to paste into Lovable

---

## Reference
- Lovable: https://lovable.dev
- Lovable docs: https://docs.lovable.dev
- GitHub sync script: `scripts/sync_lovable.ps1`
- Lovable workflow: `.agents/workflows/lovable-sync.md` (coming from platform-integration)
