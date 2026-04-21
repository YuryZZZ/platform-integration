# New Project Setup Guide — Lovable + GitHub + Firebase + Antigravity + Stitch

> **Purpose**: A project-independent, step-by-step guide for any engineer or AI agent to create a new full-stack project from zero using the Lovable -> GitHub -> Firebase -> Antigravity development workflow.
>
> **Time to complete**: ~30 minutes
> **Prerequisites**: A Google account, a GitHub account, and Antigravity installed.
>
> **Fast Track**: Run `start.bat` from the `platform-integration` repo root, open the generated project, then run `./init.ps1`.

---

## Table of Contents

- [Overview](#overview)
- [Phase 1 — Accounts & Authentication](#phase-1--accounts--authentication)
- [Phase 2 — Bootstrap the Project](#phase-2--bootstrap-the-project)
- [Phase 3 — Firebase Setup](#phase-3--firebase-setup)
- [Phase 4 — Frontend App (Next.js)](#phase-4--frontend-app-nextjs)
- [Phase 5 — First Deploy](#phase-5--first-deploy)
- [Phase 6 — Lovable Connection](#phase-6--lovable-connection)
- [Phase 7 — Antigravity IDE Configuration](#phase-7--antigravity-ide-configuration)
- [Phase 8 — Backend Services (Cloud Run)](#phase-8--backend-services-cloud-run)
- [Phase 9 — Data Pipeline (Stitch)](#phase-9--data-pipeline-stitch)
- [Phase 10 — CI/CD & Documentation](#phase-10--cicd--documentation)
- [The Development Loop](#the-development-loop)
- [Configuration Reference](#configuration-reference)
- [Troubleshooting](#troubleshooting)

---

## Overview

This guide connects the framework components into a single development workflow:

```text
Lovable or Stitch
-> GitHub
-> Antigravity
-> Firebase
-> Cloud Run
-> validation and deploy
```

---

## Phase 1 — Accounts & Authentication

```powershell
gcloud auth login
gcloud auth application-default login
firebase login
```

Optional GitHub setup:

```powershell
git config --global credential.helper manager
# or use SSH:
ssh-keygen -t ed25519 -C "your_email@example.com"
ssh -T git@github.com
```

Create a fine-grained GitHub PAT for local MCP use only if you need the GitHub MCP server.

---

## Phase 2 — Bootstrap the Project

From the framework repository:

```powershell
cd C:\path\to\platform-integration
.\start.bat
```

Then inside the generated project:

```powershell
cd C:\path\to\your-new-project
.\init.ps1
```

This creates the project shell, copies reference docs, prepares env placeholders, and configures project-specific values.

---

## Phase 3 — Firebase Setup

The generated project should already contain template `firebase.json` and `.firebaserc` files. Replace placeholders and register the web app:

```powershell
firebase apps:create WEB "my-dashboard" --project YOUR_PROJECT_ID
firebase apps:sdkconfig WEB YOUR_APP_ID --project YOUR_PROJECT_ID
```

Use `cleanUrls: true` for multi-page static hosting.

---

## Phase 4 — Frontend App (Next.js)

If your generated `web/` app still needs dependencies installed:

```powershell
cd web
npm install
npm run build
```

If your project requires a fresh Next app materialization, use `create-next-app` inside `web/` and keep `next.config.ts` on `output: "export"` for static hosting.

---

## Phase 5 — First Deploy

```powershell
cd ..
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

Verify at:

```text
https://YOUR_PROJECT_ID.web.app
```

---

## Phase 6 — Lovable Connection

1. Sign in at [lovable.dev](https://lovable.dev).
2. Connect the GitHub repository.
3. Let Lovable open branches or PRs.
4. Pull, review, build, and redeploy.

---

## Phase 7 — Antigravity IDE Configuration

Antigravity should use local MCP configuration only. Use placeholder-based committed templates and copy them into local settings.

Relevant local auth:

- Firebase CLI login
- GCP ADC
- optional GitHub PAT for MCP

Use `reference/configs/mcp_config.json.reference` as the portable template.

---

## Phase 8 — Backend Services (Cloud Run)

Each service should deploy from its own folder:

```powershell
cd functions\api-gateway
.\deploy.ps1
```

Never deploy backend services from repo root.

---

## Phase 9 — Data Pipeline (Stitch)

Use Stitch or your own data merge scripts with project-local ids only. Example placeholder pattern:

```python
stitcher = DataStitcher("YOUR_PROJECT_ID", "YOUR_DATASET")
```

---

## Phase 10 — CI/CD & Documentation

Keep these updated in each generated project:

- `docs/CURRENT_STATUS.md`
- `docs/deployments.md`
- `docs/tasks/`
- `.github/workflows/`

---

## The Development Loop

```text
Design -> Build -> Validate -> Deploy -> Verify -> Document -> Repeat
```

Typical commands:

```powershell
cd web
npm run build
cd ..\ui
node validate-parallel.js --url https://YOUR_PROJECT_ID.web.app
cd ..
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

---

## Configuration Reference

Common files:

- `firebase.json`
- `.firebaserc`
- `docs/PROJECT_SPEC.md`
- `docs/DESIGN.md`
- `.env.local`
- `web/.env.local`
- local MCP config derived from `reference/configs/mcp_config.json.reference`

---

## Troubleshooting

- If Firebase tools fail, rerun `firebase login`.
- If GCP-backed tools fail, rerun `gcloud auth application-default login`.
- If GitHub MCP fails, refresh the local PAT.
- If a committed file still references a real user or machine path, replace it with placeholders and recommit.

---

Use `INDEX.md` and `PORTABLE_FRAMEWORK_TEMPLATE.md` as the source of truth for the current framework contract.
