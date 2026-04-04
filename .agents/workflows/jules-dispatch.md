---
description: Delegate tasks to Jules cloud agent. Use /jules-dispatch to send SEO, tests, security, or accessibility tasks to Jules and get back PRs.
---

# Jules Dispatch Workflow

> Call this workflow any time you want to send work to Jules.
> Jules runs async on Google Cloud VMs and creates GitHub PRs.
> You continue local work while Jules runs.

---

## Prerequisites (one-time setup)

1. **Install Jules GitHub App**: https://github.com/apps/jules-by-google
   - Grant Read & Write on: Contents, Pull Requests, Issues
   - Enable on your repository

2. **Get Jules API Key**: https://jules.google.com → Settings → API Keys

3. **Set in environment**:
   ```powershell
   $env:JULES_API_KEY = "your-key-here"
   # Add to .env.local too:
   # JULES_API_KEY=your-key-here
   ```

---

## Usage

When user says "send to Jules" or "delegate to Jules" or "Jules should handle this":

**Antigravity must:**
1. Identify which Jules task type applies (SEO / tests / security / accessibility / migration)
2. Expand into the full structured prompt below
3. Send via CLI: `/jules <prompt>`
4. Confirm: "Jules task sent. It will create a PR in ~15–60 minutes. Continue local work."
5. Remind user: "Run `/jules-handoff` when the PR is ready to merge."

---

## Task Templates (copy → expand → send)

### SEO & Schema

```
/jules SCOPE: All files in web/src/app/ and web/src/components/layout/
ACTION:
  1. Add JSON-LD LocalBusiness schema to web/src/app/layout.tsx
  2. Add og:image, twitter:card, and canonical meta tags to every page
  3. Create web/public/sitemap.xml listing all routes
  4. Create web/public/robots.txt (allow all, point to sitemap)
  5. Ensure each page has exactly one <h1> tag
CONSTRAINTS: Do NOT touch components/blocks/, components/ui/, or globals.css
VERIFICATION: npm run build must succeed with zero errors
OUTPUT: PR titled "seo: schema markup, sitemap, and meta tags"
```

### Test Coverage

```
/jules SCOPE: web/src/components/ — files without a .test.tsx counterpart
ACTION:
  1. Generate Jest + React Testing Library unit tests for every Nexus UI component missing tests
  2. Each test file: render test + prop test + one aria/role accessibility assertion
  3. Add jest.config.ts if not present
  4. Tests must not modify source component files
CONSTRAINTS: Do NOT modify ContentBlocks.tsx, blocks.css, or any cinematic/ files
VERIFICATION: npm test — all tests pass, zero failures
OUTPUT: PR titled "test: add component test coverage"
```

### Security Audit

```
/jules SCOPE: web/package.json, functions/*/package.json
ACTION:
  1. Run npm audit on each package.json
  2. Fix all Critical and High severity vulnerabilities with npm audit fix
  3. For vulnerabilities requiring manual update, bump to the patched semver version
  4. Run npm run build and npm test after all changes
  5. Document every patched vulnerability in a SECURITY_FIXES.md
CONSTRAINTS: Do NOT bump any major versions without verifying tests pass first
VERIFICATION: npm audit shows 0 Critical, 0 High. npm run build succeeds.
OUTPUT: PR titled "security: patch npm vulnerabilities [DATE]"
```

### Accessibility & Performance

```
/jules SCOPE: web/src/app/, web/src/components/layout/, web/public/
ACTION:
  1. Add loading="lazy" to all <img> tags not in the hero section
  2. Add aria-label to all <button> and <a> elements missing accessible text
  3. Add <link rel="preload"> for the hero image in layout.tsx
  4. Add <link rel="preconnect"> for all third-party domains (fonts.googleapis.com, etc.)
  5. Verify all form inputs have associated <label> elements
CONSTRAINTS: No visual/layout changes — accessibility and HTML attributes only
VERIFICATION: npm run build succeeds. No new TypeScript errors.
OUTPUT: PR titled "a11y: accessibility and performance improvements"
```

### Dependency Update

```
/jules SCOPE: web/package.json
ACTION:
  1. Update all minor and patch dependencies to latest versions
  2. Run npm run build and npm test after each batch update
  3. If tests fail after an update, pin to the last passing version
  4. Generate a CHANGELOG.md entry listing all version changes
CONSTRAINTS: Do NOT bump React, Next.js, or TypeScript major versions without explicit approval
VERIFICATION: npm run build and npm test both pass
OUTPUT: PR titled "chore: update dependencies [DATE]"
```

### Content Migration (custom)

```
/jules SCOPE: [specify exactly which directories]
ACTION:
  1. [specific action]
  2. [specific action]
CONSTRAINTS: [what not to change]
VERIFICATION: npm run build succeeds
OUTPUT: PR titled "[type]: [description]"
```

---

## After Jules Creates a PR: Handoff to Antigravity

Run `/jules-handoff` or do manually:

```powershell
# 1. Fetch the Jules branch
git fetch origin

# 2. Check out for local inspection
git checkout [jules-branch-name]
cd web && npm run build && npm test

# 3. If all good — merge on GitHub
# github.create_pull_request → review → merge

# 4. Pull master
git checkout master && git pull origin master --ff-only

# 5. Verify
# /verify-pyramid
```

---

## Status Check

```powershell
# Check Jules session status
/jules what is the status of my last task?

# Check all recent sessions
/jules list my recent sessions
```
