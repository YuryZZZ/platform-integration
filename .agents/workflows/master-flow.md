---
description: The complete master workflow — Lovable → GitHub → Antigravity → Jules → Firebase. Includes every step with exact commands and Jules prompts.
---

# Master Flow: Lovable → GitHub → Jules → Firebase

> Run this entire flow from the Antigravity chat window.
> Jules handles all async heavy lifting. Antigravity handles interactive work and deployment.

---

## Step 0 — Initialise the Project

```powershell
# Copy the starter-kit to your new project folder
xcopy /E /I starter-kit\ C:\Projects\my-project\
cd C:\Projects\my-project
.\init.ps1

# Start the dev server
cd web && npm run dev
```

Antigravity: open the project folder and read `docs/PROJECT_SPEC.md` first.

---

## Step 0.5 — Research Phase (Antigravity)

> Antigravity does this — Jules is NOT involved here.

```
Read the PROJECT_SPEC.md and DESIGN.md.
Research the competitor site at [URL] using perplexity_ask.
Extract: services offered, pricing signals, trust elements, tone of voice.
Summarise findings in docs/COMPETITOR_RESEARCH.md.
```

---

## Step 0.7 — Asset Generation (Antigravity)

> Generate brand images using generate_image tool — NOT Jules.

```
Generate the following images for the project:
- hero.png: [describe the hero image]
- team.png: [describe the team/about image]
- service-1.png: [describe service image]
Save generated images to web/public/
```

---

## Step 1 — Pull Design from Lovable/GitHub

```powershell
git fetch origin
git pull origin master --ff-only
```

If Lovable PR is pending:
```powershell
# Review and merge in GitHub, then:
git pull origin master
cd web && npm run build
```

---

## Step 2 — Wire Real Data (Antigravity)

> Replace mock/placeholder data with Firebase calls. Antigravity does this interactively.

```
Read src/app/(marketing)/page.tsx.
Replace all <<PLACEHOLDER>> values with real content from docs/PROJECT_SPEC.md and docs/COMPETITOR_RESEARCH.md.
Wire the contact form to Firebase Firestore collection 'leads'.
Verify the site compiles: npm run build.
```

---

## Step 3 — Heavy Lift: Delegate to Jules (ASYNC)

> This is where Jules becomes active. Send these tasks and continue local work.
> Jules will create PRs. You review + merge them later.

### 3a. SEO Audit & Schema Markup (send immediately after Step 2)

```
/jules SCOPE: All files in web/src/app/ and web/src/components/.
ACTION: 
  1. Add JSON-LD schema markup (LocalBusiness, Service, Review) to the homepage layout.tsx
  2. Add proper meta tags (og:image, twitter:card, canonical) to all pages
  3. Create a web/public/sitemap.xml with all routes
  4. Create web/public/robots.txt
  5. Verify all <h1> tags are unique per page (only one per page)
CONSTRAINTS: Do NOT modify blocks.css, ContentBlocks.tsx, or any files in components/ui/ or components/cinematic/
VERIFICATION: Run `npm run build` — zero errors required.
OUTPUT: Submit PR titled "seo: add schema markup, sitemap, and meta tags"
```

### 3b. Test Generation (send in parallel with 3a)

```
/jules SCOPE: All component files in web/src/components/ui/ and web/src/components/blocks/
ACTION:
  1. Generate Jest + React Testing Library tests for every component that doesn't already have a .test.tsx file
  2. Each test must include: render test, prop variation test, and one accessibility check (role/label)
  3. Update web/jest.config.ts if missing
  4. Ensure `npm test` passes with zero failures
CONSTRAINTS: Do NOT modify the component source files themselves — tests only.
VERIFICATION: Run `npm test` — all tests must pass.
OUTPUT: Submit PR titled "test: add component test coverage"
```

### 3c. Performance & Accessibility Audit (send after 3a is merged)

```
/jules SCOPE: web/src/app/ (all pages) and web/src/components/layout/
ACTION:
  1. Add loading="lazy" to all <img> tags that are below the fold
  2. Add aria-label to all interactive elements missing it (buttons, links, inputs)
  3. Add preload hint for the hero image in layout.tsx <head>
  4. Convert any synchronous Google Font imports to async (display=swap already set — verify)
  5. Add <link rel="preconnect"> for all third-party domains
CONSTRAINTS: Do NOT change any visual styling or layout.
VERIFICATION: Run `npm run build` — zero errors.
OUTPUT: Submit PR titled "perf: image lazy loading, aria labels, preconnect hints"
```

### 3d. Dependency Audit (send independently, any time)

```
/jules SCOPE: web/package.json and web/package-lock.json
ACTION:
  1. Run `npm audit` and fix all Critical and High severity vulnerabilities
  2. Update any packages with known CVEs to their patched versions
  3. Do NOT bump any major versions without confirming tests still pass
  4. Run `npm run build` and `npm test` after all updates
CONSTRAINTS: Do NOT change next.config.ts or tailwind.config.ts.
VERIFICATION: `npm audit` shows 0 Critical, 0 High. `npm run build` succeeds.
OUTPUT: Submit PR titled "security: patch npm vulnerabilities"
```

---

## Step 4 — Review Jules PRs (Antigravity + GitHub)

For each PR Jules creates:

```powershell
# Pull the branch locally to verify
git fetch origin
git checkout jules/seo-schema-markup   # or whatever branch Jules used
cd web && npm run build && npm test

# If all good — merge via GitHub MCP
# Then pull master
git checkout master && git pull origin master
```

In Antigravity: `/verify-pyramid` after each merge.

---

## Step 5 — Final QA (Antigravity)

```
Navigate to http://localhost:4000 and take screenshots of:
1. Hero section — verify brand color, correct content, no placeholders
2. Services section — all 6 services populated
3. Contact form — submit test lead, verify it appears in Firestore
4. Mobile view (375px width) — verify responsive layout
Run /verify-pyramid and confirm all checks pass.
```

---

## Step 6 — Deploy (Antigravity)

```powershell
# Firebase App Hosting (auto on git push to master)
git add -A && git commit -m "feat: complete initial build" && git push origin master

# OR manual deploy:
cd web && npm run build
firebase deploy --only hosting
```

Post-deploy in Antigravity:
```
Navigate to the production URL.
Take screenshots and verify the live site matches localhost.
Update docs/deployments.md with this deployment.
Update docs/CURRENT_STATUS.md.
```

---

## Summary: Who Does What

| Step | Tool | Sync/Async |
|------|------|-----------|
| Research | Antigravity + Perplexity | Sync |
| Image generation | Antigravity | Sync |
| Content wiring | Antigravity | Sync |
| SEO markup | **Jules** | **Async** |
| Test generation | **Jules** | **Async** |
| Accessibility/perf | **Jules** | **Async** |
| Security patches | **Jules** | **Async** |
| PR review | Antigravity + GitHub | Sync |
| Verification | Antigravity + Browser | Sync |
| Deployment | Antigravity | Sync |
