---
description: Run the full verification pyramid — TypeScript, build, lint, tests, visual. Run after every code change or Jules PR merge before deploying.
---

# Verify Pyramid Workflow

> Run from inside the `web/` directory.
> All steps must pass before any deploy.

---

## Steps

### 1. TypeScript check
```powershell
cd web
npx tsc --noEmit
```
Expected: **0 errors**. Fix any type errors before continuing.

---

### 2. Lint
```powershell
npx next lint
```
Expected: **No errors** (warnings acceptable).

---

### 3. Build
```powershell
npm run build
```
Expected: **Exit code 0**, no build errors.
If this fails — stop. Fix before continuing.

---

### 4. Tests (if test suite exists)
```powershell
npm test -- --passWithNoTests
```
Expected: **All tests pass**.

---

### 5. Visual check
```
Navigate to http://localhost:4000
Screenshot the homepage.
Confirm:
  - Brand color on buttons and headline (not indigo/purple)
  - No <<PLACEHOLDER>> text visible anywhere
  - No console errors in browser DevTools
  - Contact phone/email correct in navbar
  - All nav links work (no 404s)
```

---

### 6. Lighthouse (optional, pre-deploy)
```powershell
npx lighthouse http://localhost:4000 --only-categories=performance,accessibility,seo --output=json --output-path=./lighthouse-report.json
```
Targets: Performance > 80, Accessibility > 90, SEO > 90.

---

## Summary: All Clear

| Check | Command | Pass condition |
|-------|---------|---------------|
| TypeScript | `tsc --noEmit` | 0 errors |
| Lint | `next lint` | 0 errors |
| Build | `npm run build` | Exit 0 |
| Tests | `npm test` | All pass |
| Visual | Browser screenshot | No placeholders, correct brand |

All 5 must pass → safe to deploy.
