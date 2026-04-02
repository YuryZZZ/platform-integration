# Jules Integration Guide

> **Jules** is Google's async cloud agent. It runs tasks on cloud VMs, reads your repo,
> writes code, and opens GitHub PRs — without blocking your local session.
>
> **Rule**: Jules handles large-scale async work. Antigravity handles interactive work.

---

## Setup (One-Time)

1. **Install Jules GitHub App** → https://github.com/apps/jules-by-google
   - Grant: Read & Write on Contents, Pull Requests, Issues
   - Enable on your repository

2. **Get API key** → https://jules.google.com → Settings → API Keys

3. **Add to `.env.local`**:
   ```env
   JULES_API_KEY=your-key-here
   ```

---

## Workflow

```
You (Antigravity) → /jules-dispatch → Jules runs on cloud VM
                                           ↓
                                    Creates GitHub PR
                                           ↓
You → /jules-handoff → review PR → merge → /verify-pyramid → /deploy-changed
```

---

## What Jules Does (vs Antigravity)

| Task Type | Who Does It | Why |
|-----------|-------------|-----|
| Research, content | Antigravity | Interactive, needs context |
| Image generation | Antigravity | Uses generate_image tool |
| Quick fixes | Antigravity | Faster locally |
| SEO markup (all pages) | **Jules** | Repo-wide, async |
| Test generation | **Jules** | Repo-wide, async |
| Security/dependency audit | **Jules** | Multi-file, async |
| Accessibility sweep | **Jules** | Repo-wide, async |
| Large refactors | **Jules** | Async, no dev time cost |

---

## Ready-to-Use Task Prompts

### SEO + Schema Markup
```
/jules SCOPE: web/src/app/ and web/src/components/layout/
ACTION:
  1. Add JSON-LD LocalBusiness schema to layout.tsx
  2. Add og:image, twitter:card, canonical meta to every page
  3. Create web/public/sitemap.xml with all routes
  4. Create web/public/robots.txt (allow all, link sitemap)
  5. Ensure one <h1> per page only
CONSTRAINTS: Do NOT touch components/blocks/, components/ui/, globals.css
VERIFICATION: npm run build — zero errors
OUTPUT: PR "seo: schema markup, sitemap, meta tags"
```

### Test Coverage
```
/jules SCOPE: web/src/components/ (files without .test.tsx)
ACTION:
  1. Generate Jest + RTL unit tests for all components missing tests
  2. Each test: render + props + aria/role accessibility assertion
  3. Add jest.config.ts if missing
CONSTRAINTS: Do NOT modify source component files
VERIFICATION: npm test — all pass
OUTPUT: PR "test: add component test coverage"
```

### Security Audit
```
/jules SCOPE: web/package.json, functions/*/package.json
ACTION:
  1. Run npm audit, fix all Critical/High CVEs
  2. Document all patches in SECURITY_FIXES.md
CONSTRAINTS: No major version bumps without test verification
VERIFICATION: npm audit 0 Critical/High, npm run build passes
OUTPUT: PR "security: patch npm vulnerabilities [DATE]"
```

### Accessibility + Performance
```
/jules SCOPE: web/src/app/, web/src/components/layout/
ACTION:
  1. Add loading="lazy" to all below-fold images
  2. Add aria-label to all buttons/links missing accessible text
  3. Add <link rel="preload"> for hero image in layout.tsx
  4. Add <link rel="preconnect"> for all third-party domains
CONSTRAINTS: No visual/layout changes — attributes only
VERIFICATION: npm run build — zero errors
OUTPUT: PR "a11y: accessibility and performance improvements"
```

### Dependency Update
```
/jules SCOPE: web/package.json
ACTION:
  1. Update all minor/patch deps to latest
  2. Run npm run build + npm test after each batch
  3. Pin failing updates to last passing version
CONSTRAINTS: No React/Next.js/TypeScript major version bumps
VERIFICATION: npm run build + npm test pass
OUTPUT: PR "chore: update dependencies [DATE]"
```

---

## After Jules Creates a PR → use `/jules-handoff` workflow

---

## Status Check
```
/jules what is the status of my last task?
/jules list my recent sessions
```

## Reference
- Jules docs: https://jules.google.com
- GitHub App: https://github.com/apps/jules-by-google
