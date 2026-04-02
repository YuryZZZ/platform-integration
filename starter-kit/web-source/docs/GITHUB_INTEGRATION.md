# GitHub Integration Guide

> GitHub is the **central source of truth** for all code.
> Every agent (Jules, Lovable, Antigravity) reads from and writes to GitHub.
>
> **Rule**: All code changes go through GitHub. No direct file edits bypassing git.

---

## Repository Setup (One-Time)

1. **Create the repo**: https://github.com/new
   - Name: your project name (lowercase, hyphens)
   - Visibility: Private
   - Do NOT initialize with README (init.ps1 handles this)

2. **Connect local project**:
   ```powershell
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git branch -M master
   git push -u origin master
   ```

3. **Add GitHub PAT to `.env.local`**:
   - Go to: https://github.com/settings/tokens → Generate new token (classic)
   - Scopes: `repo`, `workflow`, `read:org`
   ```env
   GITHUB_TOKEN=ghp_your-token-here
   ```

4. **Install Jules GitHub App**: https://github.com/apps/jules-by-google

---

## Branch Strategy

```
master          ← production (auto-deploys via Firebase App Hosting)
    ↑
lovable/[name]  ← Lovable-generated UI branches (merge after review)
jules/[name]    ← Jules-generated fix branches (merge after verify)
feat/[name]     ← Manual feature branches (Antigravity local work)
```

**Rule**: Never commit directly to master without verifying first.

---

## Git Workflow (Daily)

```powershell
# Start of session — always pull first
git pull origin master --ff-only

# Work...

# Before committing — verify
# /verify-pyramid

# Commit
git add -A
git commit -m "feat: [what changed]"
git push origin master
```

---

## GitHub Actions CI/CD

The `.github/workflows/auto_sync.yml` provides:
- **Auto-sync** on every push to master
- **Build check** — runs `npm run build` on PR
- **Test check** — runs `npm test` on PR

These trigger automatically. No manual setup needed after the repo is connected.

---

## Reviewing PRs from Jules/Lovable

```powershell
# Fetch all remote branches
git fetch origin

# Checkout the PR branch
git checkout jules/seo-schema-markup   # or lovable/services-section

# Verify locally
cd web && npm run build && npm test && cd ..

# If good — merge on GitHub (via Antigravity or browser)
# Then pull master
git checkout master && git pull origin master --ff-only
```

In Antigravity — use the GitHub MCP tool:
```
Use github MCP to review PR #[number] and merge if build passes.
```

---

## Useful GitHub MCP Commands (in Antigravity)

| Action | Command |
|--------|---------|
| List open PRs | `List all open PRs on this repo` |
| Create PR | `Create a PR from feat/my-feature to master` |
| Merge PR | `Merge PR #12 using squash merge` |
| Get file from GitHub | `Get the contents of src/app/page.tsx from master` |
| Search code | `Search for all uses of 'firebase' in this repo` |
| Create issue | `Create a GitHub issue: [title] with body [description]` |

---

## Auto-Sync Daemon

Background script that polls GitHub every 30 seconds and pulls new commits:

```powershell
# Start in background (keep running while you work)
Start-Process powershell -ArgumentList "-File scripts/auto-sync.ps1" -WindowStyle Hidden
```

Useful when Lovable or Jules is actively pushing to the repo.

---

## `.gitignore` Checklist

These should NEVER be committed:
```gitignore
.env.local
node_modules/
.next/
dist/
*.log
.ai/
.sessions/
```

The starter-kit `.gitignore` already covers all of these.

---

## Reference
- GitHub: https://github.com/YOUR_USER/YOUR_REPO
- GitHub MCP tools: used via Antigravity (`github.*` tool prefix)
- Jules GitHub App: https://github.com/apps/jules-by-google
- PAT settings: https://github.com/settings/tokens
