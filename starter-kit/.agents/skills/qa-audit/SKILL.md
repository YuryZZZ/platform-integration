---
name: qa-audit
description: Automated QA audit covering TypeScript, build, accessibility, SEO, performance, and visual verification. Runs after every DEVELOP phase before DEPLOY.
---

# QA Audit Skill

## Purpose
Validate every change before deployment. This is the gate between DEVELOP and DEPLOY phases. Nothing ships without passing all checks.

---

## The Verification Pyramid

Run checks in this order — stop on first failure and fix before continuing:

```
Level 1: TypeScript        (fastest — catches syntax + type errors)
Level 2: Build             (catches module resolution + SSR errors)
Level 3: Lint              (catches code quality issues)
Level 4: Unit Tests        (catches logic regressions)
Level 5: Visual Check      (catches UI regressions)
Level 6: Accessibility     (catches a11y violations)
Level 7: SEO               (catches meta, OG, sitemap issues)
Level 8: Performance       (catches Core Web Vitals regressions)
```

---

## Level 1 — TypeScript

```powershell
npx tsc --noEmit
```
- Target: **0 errors** (not counting excluded CMS dirs)
- If errors exist: fix ALL before proceeding
- If >20 errors: delegate TypeScript cleanup to `jules-dispatch` skill

---

## Level 2 — Build

```powershell
npm run build
```
- Target: build completes with **exit code 0**
- Check for: missing env vars, dynamic import issues, SSR failures
- Bundle size: warn if any page exceeds 250KB gzipped

---

## Level 3 — Lint

```powershell
npm run lint
```
- Target: **0 errors, 0 warnings**
- Auto-fix safe issues: `npm run lint -- --fix`
- If >5 unfixable warnings: delegate to jules-dispatch

---

## Level 4 — Unit Tests

```powershell
npm run test
```
- Target: all tests pass
- Coverage: any changed file must have >60% line coverage
- If tests missing: create at minimum 1 happy-path + 1 error-path test

---

## Level 5 — Visual Check

```javascript
// Use browser_subagent for every UI change:
browser_subagent({
  task: `
    Navigate to http://localhost:3000[/changed-route].
    Take a full-page screenshot.
    Check: 
    - No broken layouts (overlapping text, invisible buttons)
    - Colors match design system (no default blue links, no plain grey)  
    - All images load (no broken img tags)
    - No console errors in the browser
    - Mobile responsive (resize to 375px width and screenshot again)
    Report: any visual defects found.
  `
})
```

---

## Level 6 — Accessibility

Check for a11y violations on every page:

```javascript
browser_subagent({
  task: `
    Navigate to http://localhost:3000[/changed-route].
    Run accessibility audit. Check:
    - All images have alt text
    - All interactive elements (buttons, links, inputs) are keyboard reachable
    - Color contrast ratio ≥ 4.5:1 for all text
    - Form inputs have associated labels
    - Page has a single <h1> element
    - Skip-to-content link exists
    Report all violations found.
  `
})
```

Auto-fix common issues:
- Missing `alt=""` → add descriptive alt or empty alt for decorative images
- Missing form labels → add `<label htmlFor="...">` or `aria-label`
- Poor contrast → adjust color to meet 4.5:1 ratio

---

## Level 7 — SEO

Check every page:

```typescript
// Required for each page/route:
export const metadata = {
  title: '[Page Title] | [Product Name]',        // 50-60 chars
  description: '[Compelling description]',        // 150-160 chars
  openGraph: {
    title: '[Page Title]',
    description: '[Description]',
    url: '[canonical URL]',
    siteName: '[Product Name]',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Page Title]',
    description: '[Description]',
    images: ['/og-image.png'],
  },
};
```

Check:
- [ ] Every page has `<title>` (not "Next.js" default)
- [ ] Every page has `<meta name="description">`
- [ ] Homepage has OG image
- [ ] `sitemap.ts` includes all public routes
- [ ] `robots.ts` is configured

---

## Level 8 — Performance

```javascript
browser_subagent({
  task: `
    Navigate to http://localhost:3000.
    Run Lighthouse performance audit.
    Report: LCP, FID/INP, CLS, TTFB, overall score.
    Target scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 90.
  `
})
```

Auto-fix common issues:
- Large images → add `width`, `height`, and `loading="lazy"` to next/image
- Render-blocking scripts → add `defer` or move to dynamic import
- Missing `preconnect` → add to `<head>` for external fonts/APIs

---

## Audit Report Format

After running all checks, update the task file:

```markdown
## QA Audit Results — [ISO timestamp]

| Check | Result | Notes |
|-------|--------|-------|
| TypeScript | ✅ 0 errors | — |
| Build | ✅ Exit 0 | 3.2s |
| Lint | ✅ 0 warnings | — |
| Tests | ✅ 24/24 pass | 68% coverage |
| Visual | ✅ No defects | Screenshot: [path] |
| A11y | ⚠️ 1 issue | Fixed: missing alt on hero img |
| SEO | ✅ All pages | — |
| Performance | ✅ 94/100 | LCP 1.2s, CLS 0.01 |

**Verdict: PASS → Proceed to deploy-pipeline**
```

---

## Failure Protocol

If any level fails:
1. Fix the issue immediately (L1-L3)
2. Or delegate to jules-dispatch (L4 — complex test additions)
3. Re-run the failed level
4. Do NOT proceed to DEPLOY until all 8 levels pass
