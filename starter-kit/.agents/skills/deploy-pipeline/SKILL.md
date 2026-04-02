---
name: deploy-pipeline
description: Deploy to Firebase App Hosting via git push. Covers the full release flow — pre-flight, git push, live URL verification, rollback protocol, and deployment ledger update.
---

# Deploy Pipeline Skill

## Purpose
Ship changes to production safely. Firebase App Hosting auto-deploys on push to `master`. This skill defines the exact process — never deviate from it.

---

## HARD RULES

```
❌ NEVER run: firebase deploy (from root)
❌ NEVER deploy from repo root
❌ NEVER push to master without QA passing
❌ NEVER hardcode secrets in any committed file
✅ ALWAYS deploy via: git push origin master → App Hosting auto-deploys
✅ ALWAYS verify the live URL after deploy
✅ ALWAYS update docs/deployments.md
```

---

## Step 1 — Pre-Flight Checks

Before pushing, confirm all qa-audit checks passed:

```powershell
# Quick pre-flight:
npx tsc --noEmit           # Must exit 0
npm run build              # Must exit 0
```

If either fails: STOP. Fix. Run qa-audit skill fully. Then return here.

---

## Step 2 — Stage and Commit

```powershell
# Review what's changing:
git status
git diff --stat

# Stage all changes:
git add -A

# Commit with conventional commit format:
git commit -m "[type]([scope]): [description]

- [bullet: what changed]
- [bullet: why]

Closes TASK-NNN"

# Types: feat | fix | refactor | docs | chore | perf | test
# Scope: ui | api | auth | db | config | deploy
```

---

## Step 3 — Push to Master

```powershell
git push origin master
```

Firebase App Hosting webhook fires automatically on push.
Expected deploy time: **3-8 minutes** for a full build.

---

## Step 4 — Monitor Deploy

```javascript
// Check Cloud Run deployment status:
cloudrun.list_services({
  project: "<firebase_project_id from PROJECT_SPEC>",
  region: "europe-west1"  // or as configured in apphosting.yaml
})

// OR: check Firebase App Hosting via MCP:
// Watch for: service state = ACTIVE, latest revision = serving 100%
```

---

## Step 5 — Live Verification (MANDATORY)

```javascript
browser_subagent({
  task: `
    Navigate to [production URL from PROJECT_SPEC].
    Perform smoke test:
    1. Homepage loads (no 500 error, no blank page)
    2. Navigation works (click 2 nav links, confirm pages load)
    3. Console shows 0 errors
    4. [Any page that was changed in this deploy] renders correctly
    5. Check: /health if it exists
    Take a full-page screenshot of the homepage.
    Report: pass/fail for each item.
  `
})
```

---

## Step 6 — Update Deployment Ledger

Add entry to `docs/deployments.md`:

```markdown
## Deploy #[N] — [ISO timestamp]

| Field | Value |
|-------|-------|
| **Commit** | `git log --oneline -1` output |
| **Task** | TASK-NNN |
| **URL** | [production URL] |
| **Status** | ✅ LIVE |
| **Verified** | browser_subagent screenshot passed |
| **Build time** | ~Xs |
```

---

## Rollback Protocol

If Step 5 fails (live site broken):

```powershell
# 1. Find last good commit:
git log --oneline -5

# 2. Revert to it:
git revert HEAD --no-edit

# 3. Push revert:
git push origin master

# 4. Verify rollback:
# → re-run browser_subagent smoke test

# 5. Create bug task:
# TASK-NNN-hotfix-YYYY-MM-DD.md with root cause analysis
```

---

## Emergency Rollover (Cloud Run)

If git revert is too slow:

```javascript
// Shift 100% traffic to previous Cloud Run revision:
cloudrun.update_traffic({
  service: "<service-name>",
  project: "<project-id>",
  traffic: [{ revision: "<previous-revision-name>", percent: 100 }]
})
```

---

## Environment Management

| Environment | Branch | Deploy method | URL |
|-------------|--------|---------------|-----|
| Production | `master` | Auto on push | production URL in PROJECT_SPEC |
| Preview | `preview/*` | Manual or PR | Auto-preview URL from App Hosting |
| Local | N/A | `npm run dev` | localhost:3000 |

---

## apphosting.yaml Reference

```yaml
runConfig:
  minInstances: 0          # scale to zero when idle
  maxInstances: 5          # cap for cost control
  concurrency: 80

env:
  - variable: NEXT_PUBLIC_FIREBASE_PROJECT_ID
    secret: FIREBASE_PROJECT_ID    # from Cloud Secret Manager
  - variable: DATABASE_URL
    secret: DATABASE_URL
```

Secrets are stored in Cloud Secret Manager — never in code.
To add a new secret:
```javascript
// Use firebase MCP or gcloud. Never commit secrets to git.
firebase.functions_set_config({ key: "SECRET_NAME", value: "..." })
```
