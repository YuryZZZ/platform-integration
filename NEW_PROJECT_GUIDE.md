# New Project Setup Guide — Lovable + GitHub + Firebase + Antigravity + Stitch

> **Purpose**: A project-independent, step-by-step guide for any engineer or AI agent to create a new full-stack project from zero using the Lovable → GitHub → Firebase → Antigravity development workflow.
>
> **Time to complete**: ~30 minutes
> **Prerequisites**: A Google account, a GitHub account, and Antigravity IDE installed.
>
> **⚡ Fast Track**: Copy [`starter-kit/`](./starter-kit/) to a new folder, run `.\init.ps1`, and you're up in 5 minutes. See [starter-kit/README.md](./starter-kit/README.md).

---

## Table of Contents

- [Overview](#overview)
- [Phase 1 — Accounts & Authentication](#phase-1--accounts--authentication)
- [Phase 2 — Create the Project Shell](#phase-2--create-the-project-shell)
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

This guide connects five platforms into a single development workflow:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│   LOVABLE    │     │   GITHUB     │     │    FIREBASE      │
│  Visual UI   │────▶│  Source of   │────▶│   Hosting +      │
│  Designer    │ PR  │  Truth       │ CD  │   Auth + DB      │
└──────────────┘     └──────┬───────┘     └────────┬─────────┘
                            │                       │
                     ┌──────┴───────┐               │
                     │ ANTIGRAVITY  │               │
                     │  AI Coding   │───────────────┘
                     │  Agent       │         Deploy
                     └──────┬───────┘
                            │
                     ┌──────┴───────┐     ┌──────────────────┐
                     │  CLOUD RUN   │────▶│   BIGQUERY /     │
                     │  Backend API │     │   DATABASE       │
                     └──────────────┘     └──────────────────┘
                            │
                     ┌──────┴───────┐
                     │   STITCH     │
                     │  Data merge  │
                     │  pipeline    │
                     └──────────────┘
```

| Platform        | Role                                    | What You Need            |
| --------------- | --------------------------------------- | ------------------------ |
| **GitHub**      | Source code, version control, CI/CD     | Free account             |
| **Firebase**    | Web hosting, authentication, database   | Google account + billing |
| **Lovable**     | Visual UI design, generates React code  | Free tier or paid        |
| **Antigravity** | AI-powered IDE, coding agent, MCP tools | License                  |
| **Cloud Run**   | Backend API hosting (serverless)        | GCP billing              |
| **Stitch**      | Data ingestion + cross-platform merging | Custom pipeline code     |

---

## Phase 1 — Accounts & Authentication

### Step 1.1: Google Cloud

```powershell
# Install Google Cloud CLI (if not installed)
# Download from: https://cloud.google.com/sdk/docs/install

# Login with your Google account
gcloud auth login

# Set Application Default Credentials (required for MCP servers)
gcloud auth application-default login
```

**What this does**: Creates OAuth tokens stored in `~/.config/gcloud/`. All Google services (Cloud Run, BigQuery, Firebase) use these tokens.

### Step 1.2: Create a GCP Project

```powershell
# Replace YOUR_PROJECT_ID with a unique ID (lowercase, numbers, hyphens only)
gcloud projects create YOUR_PROJECT_ID --name="Your Project Name"

# Set it as default
gcloud config set project YOUR_PROJECT_ID

# Set default region
gcloud config set compute/region us-central1
```

### Step 1.3: Enable Billing

1. Go to https://console.cloud.google.com/billing
2. Create a billing account (or use an existing one)
3. Link your project:
   ```powershell
   gcloud billing projects link YOUR_PROJECT_ID --billing-account=YOUR_BILLING_ACCOUNT_ID
   ```

> **Find your billing account ID**: `gcloud billing accounts list`

### Step 1.4: Enable Required APIs

```powershell
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  firestore.googleapis.com \
  firebase.googleapis.com \
  --project=YOUR_PROJECT_ID
```

### Step 1.5: Firebase CLI

```powershell
# Install Firebase CLI globally
npm install -g firebase-tools

# Login (opens browser)
firebase login

# Verify
firebase projects:list
```

**What this does**: Stores a Firebase refresh token in `~/.config/firebase/`. Used for hosting deploys and the Firebase MCP server in Antigravity.

### Step 1.6: GitHub (Git + Personal Access Token)

```powershell
# Option A: HTTPS with credential manager (recommended on Windows)
git config --global credential.helper manager

# Option B: SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
# Then add the public key at: https://github.com/settings/keys

# Verify
ssh -T git@github.com   # SSH
# or
git ls-remote https://github.com/YOUR_USER/YOUR_REPO.git   # HTTPS

# Configure identity
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

**Create a GitHub Personal Access Token (PAT)** — needed for the GitHub MCP server:

1. Go to https://github.com/settings/personal-access-tokens/new
2. Name: `antigravity-mcp` (or any descriptive name)
3. Expiration: 90 days (or custom)
4. Repository access: **All repositories** (or select specific ones)
5. Permissions:
   - **Contents**: Read and write
   - **Issues**: Read and write
   - **Pull requests**: Read and write
   - **Actions**: Read and write (optional — for CI/CD control)
   - **Metadata**: Read (always required)
6. Click **Generate token**
7. **Copy immediately** — you won't see it again
8. Store it securely (password manager or environment variable)

> **Keep this PAT** — you'll use it in Phase 7 to configure the GitHub MCP server.

### Step 1.7: Lovable

1. Go to https://lovable.dev
2. Click **Sign in with GitHub**
3. Authorize the Lovable GitHub App
4. This grants Lovable read/write access to your repos

> **No manual tokens needed** — Lovable manages its GitHub integration via OAuth.

### Authentication Summary

After completing Phase 1, you should have:

| Platform     | Token Location                     | Verify Command            |
| ------------ | ---------------------------------- | ------------------------- |
| GCP          | `~/.config/gcloud/adc.json`        | `gcloud auth list`        |
| Firebase     | `~/.config/firebase/`              | `firebase projects:list`  |
| GitHub (git) | OS credential manager or `~/.ssh/` | `ssh -T git@github.com`   |
| GitHub (PAT) | Password manager / env var         | Used by GitHub MCP server |
| Lovable      | GitHub OAuth (managed)             | Login at lovable.dev      |

---

## Phase 2 — Create the Project Shell

### Step 2.1: Create GitHub Repository

```powershell
# Create the project directory
mkdir my-project
cd my-project
git init
git branch -M master
```

### Step 2.2: Create the Directory Structure

```powershell
# Frontend
mkdir -p web/app

# Backend services (each is an independent deploy unit)
mkdir -p functions/api-gateway
mkdir -p functions/my-service

# Data pipeline
mkdir -p scripts

# Documentation
mkdir -p docs/tasks
mkdir -p docs/platform-integration

# IDE workflows
mkdir -p .agents/workflows

# CI/CD
mkdir -p .github/workflows

# Specs
mkdir -p specs

# E2E testing
mkdir -p ui
```

### Step 2.3: Create Core Config Files

**`specs/TASK.md`** — Master task tracker:

```powershell
@"
# Project Tasks

## TASK-001: Initial Setup
**Status**: 🟡 IN PROGRESS
**Sprint**: $(Get-Date -Format 'yyyy-MM-dd')

### Plan
- [ ] Create project structure
- [ ] Set up Firebase Hosting
- [ ] Create frontend app
- [ ] First deploy
- [ ] Connect Lovable
"@ | Set-Content specs/TASK.md
```

**`docs/CURRENT_STATUS.md`** — Live status:

```powershell
@"
# Project Status

**Last Updated**: $(Get-Date -Format 'yyyy-MM-dd')
**State**: 🟡 SETUP IN PROGRESS

## Next Steps
1. Complete Firebase setup
2. Deploy first frontend
3. Connect Lovable for UI design
"@ | Set-Content docs/CURRENT_STATUS.md
```

**`docs/deployments.md`** — Deploy log:

```powershell
@"
# Deployment Log

## $(Get-Date -Format 'yyyy-MM-dd')
- Project created
"@ | Set-Content docs/deployments.md
```

### Step 2.4: Push to GitHub

```powershell
# Create repo on GitHub first (via browser or gh CLI)
# https://github.com/new

git add -A
git commit -m "feat: initial project structure"
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin master
```

---

## Phase 3 — Firebase Setup

### Step 3.1: Create Firebase Project

```powershell
# Add Firebase to your GCP project
firebase projects:addfirebase YOUR_PROJECT_ID

# Or create a brand new Firebase project
firebase projects:create YOUR_PROJECT_ID --display-name "My Project"
```

### Step 3.2: Register a Web App

```powershell
firebase apps:create WEB "my-dashboard" --project YOUR_PROJECT_ID
```

Save the App ID that's returned — you'll need it for the SDK config.

### Step 3.3: Get the SDK Config

```powershell
firebase apps:sdkconfig WEB YOUR_APP_ID --project YOUR_PROJECT_ID
```

This returns something like:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
};
```

> **The apiKey is PUBLIC** — it's restricted by domain, not a secret. Safe to commit.

### Step 3.4: Create Firebase Config Files

**`firebase.json`**:

```json
{
  "hosting": {
    "public": "web/out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

> **IMPORTANT**: `cleanUrls: true` enables multi-page routing. Do NOT add a catch-all
> rewrite like `"source": "**", "destination": "/index.html"` — that breaks multi-page apps.

**`.firebaserc`**:

```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

### Step 3.5: (Optional) Enable Firebase Auth

```powershell
# Via Firebase Console:
# https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication

# Or via Antigravity MCP:
# Use firebase_init tool with auth.providers
```

---

## Phase 4 — Frontend App (Next.js)

### Step 4.1: Initialize Next.js

```powershell
cd web

# Create Next.js app (non-interactive, TypeScript, App Router)
npx -y create-next-app@latest ./ --typescript --eslint --app --src-dir=false --import-alias="@/*" --use-npm --yes

# You may be prompted about Tailwind — choose based on preference
```

### Step 4.2: Configure for Static Export

Replace `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

> **Why static export?** Firebase Hosting serves static files. `output: "export"` generates
> HTML files for each route (e.g., `search.html` for `/search`). Firebase serves them with
> `cleanUrls: true` so `/search` maps to `search.html` automatically.

### Step 4.3: Build and Verify

```powershell
npm run build
# Output goes to web/out/
# Verify: ls out/  (should have index.html, etc.)
```

### Step 4.4: Create Additional Pages

For a multi-page app, create new routes:

```
web/app/
├── page.tsx              → /          (home/dashboard)
├── search/
│   └── page.tsx          → /search    (search page)
├── settings/
│   └── page.tsx          → /settings  (settings)
└── layout.tsx            → (shared layout)
```

Each `page.tsx` under a folder becomes a route. After build, Next.js generates:

- `out/index.html`
- `out/search.html`
- `out/settings.html`

Firebase `cleanUrls` serves them without the `.html` extension.

---

## Phase 5 — First Deploy

### Step 5.1: Build Frontend

```powershell
cd web
npm run build
cd ..
```

### Step 5.2: Deploy to Firebase Hosting

```powershell
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

### Step 5.3: Verify

Your site is now live at:

```
https://YOUR_PROJECT_ID.web.app
```

Open it in a browser. You should see your Next.js app.

### Step 5.4: Record the Deploy

Update `docs/deployments.md`:

```markdown
### Deploy #1 — Initial Frontend

- **Time**: YYYY-MM-DD HH:MM UTC
- **What**: First Next.js static deploy to Firebase Hosting
- **URL**: https://YOUR_PROJECT_ID.web.app
```

Commit and push:

```powershell
git add -A
git commit -m "feat: first deploy to Firebase Hosting"
git push origin master
```

---

## Phase 6 — Lovable Connection

### Step 6.1: Create a Lovable Project

1. Go to https://lovable.dev
2. Click **New Project**
3. Give it a descriptive name (e.g., "my-project-ui")
4. Use Lovable's visual designer to create your UI

### Step 6.2: Connect Lovable to GitHub

1. In your Lovable project → **Settings** → **Integrations**
2. Click **Connect to GitHub**
3. If prompted, authorize the Lovable GitHub App
4. Select your repository: `YOUR_USER/YOUR_REPO`
5. Lovable will now push UI changes as branches/PRs to your repo

### Step 6.3: Design Tokens

Create a consistent design system. Document these tokens in your project so Lovable-generated components match your app:

```
Background:     #0f172a      (dark mode base)
Card Surface:   rgba(255, 255, 255, 0.03)
Card Border:    rgba(255, 255, 255, 0.06)
Primary:        #6366f1      (indigo)
Accent:         #a855f7      (purple)
Success:        #34d399      (green)
Error:          #f87171      (red)
Text Primary:   #ffffff
Text Secondary: #94a3b8
Font:           Inter, system-ui
```

> **Tip**: Paste these tokens into Lovable's system prompt so it generates components that match your existing theme.

### Step 6.4: Create Sync Workflow

Create `.agents/workflows/lovable-sync.md`:

````markdown
---
description: Sync Lovable UI designs to the project repo
---

## Lovable → GitHub Sync Workflow

// turbo-all

### Steps

1. Open Lovable and make your UI changes

2. When ready, Lovable creates a PR. Pull from GitHub:
   ```powershell
   git pull origin master
   ```
````

3. Review Lovable-generated components:

   ```powershell
   ls web/src/components/
   ```

4. Build and verify:

   ```powershell
   cd web && npm run build
   ```

5. Deploy:

   ```powershell
   cd .. && npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
   ```

6. Push:
   ```powershell
   git add -A && git commit -m "feat: integrate Lovable UI updates" && git push origin master
   ```

````

---

## Phase 7 — Antigravity IDE Configuration

### Step 7.1: Open Workspace

Open your project folder in Antigravity IDE. It auto-detects:
- `firebase.json` → Firebase MCP server
- `.firebaserc` → Active project
- Git remote → GitHub integration

### Step 7.2: MCP Servers — The Full Picture

There are **two directions** of MCP connections in this stack:

1. **Antigravity ← MCP servers** — tools the AI coding agent can call
2. **Lovable ← MCP connectors** — context Lovable can read while designing

#### Antigravity MCP Servers (in `~/.gemini/antigravity/mcp_config.json`)

| MCP Server | What It Does | Auth Source | Setup |
|------------|-------------|-------------|-------|
| `firebase-mcp-server` | Firebase Hosting deploy, Firestore CRUD, Auth, Security Rules, Remote Config, Cloud Messaging | Firebase CLI token | Auto |
| `cloudrun` | Deploy Cloud Run services, view logs, manage services | GCP ADC | Auto |
| `sequential-thinking` | Break complex problems into step-by-step reasoning | None (local) | Auto |
| **`github`** | **Repos, PRs, issues, Actions, code search, branches, commits** | **GitHub PAT** | **Manual** |

> **If MCP tools fail**: Re-run `firebase login` and `gcloud auth application-default login`.

#### Firebase MCP — What's Already Available

The `firebase-mcp-server` is auto-configured and gives you access to:

| Tool Category | Capabilities |
|--------------|-------------|
| **Hosting** | Deploy, preview, check site status |
| **Firestore** | Create/read/update/delete documents, list collections, manage indexes, create databases |
| **Auth** | Get users, update users, set custom claims, configure SMS policies |
| **Security Rules** | Get rules, validate rules (Firestore, Storage, RTDB) |
| **Remote Config** | Get/update templates |
| **Cloud Messaging** | Send push notifications |
| **App Hosting** | List backends, fetch logs |
| **Cloud Functions** | List functions, get logs |
| **Storage** | Get download URLs |
| **Data Connect** | List services, build schemas, execute GraphQL |
| **Project Management** | List/create projects, list/create apps, get SDK config |
| **Developer Knowledge** | Search Google developer docs (Firebase, GCP, Android, etc.) |

Auth setup:
```powershell
firebase login                              # Required — creates the token
gcloud auth application-default login       # Required — for GCP-backed features
```

#### Lovable MCP Connectors (in Lovable's Settings)

Lovable supports **personal connectors** — MCP servers that give Lovable's AI builder context from your tools while it designs. This is configured *inside Lovable*, not in Antigravity.

**Setup**:
1. Go to https://lovable.dev → **Settings** → **Connectors** → **Personal connectors**
2. Click **New MCP server**
3. Provide:
   - **Server name**: e.g., "Firebase" or "Internal API"
   - **Server URL**: The URL where Lovable can reach the MCP server
4. Choose authentication: OAuth, Bearer token, API key, or None
5. Click **Add & authorize**
6. Allow the tools the connector exposes

**Prebuilt connectors** (available in Lovable):

| Connector | What It Does |
|-----------|-------------|
| **Notion** | Read project plans, specs, PRDs from Notion |
| **Linear** | Read issues, project status from Linear |
| **Jira** | Read tickets and sprint data from Jira |
| **Miro** | Read wireframes and diagrams from Miro |
| **n8n** | Trigger automation workflows |
| **Amplitude** | Read analytics data |
| **Granola** | Read meeting notes |

**Custom MCP for Lovable** — you can connect your own MCP server to feed Lovable context about your project (specs, data schemas, API contracts). This requires a publicly accessible MCP server URL.

> **Note**: Lovable connectors are user-specific (not shared with workspace members) and are not included in deployed apps. Available on paid plans.

### Step 7.3: GitHub MCP Server Setup (Recommended)

The **GitHub MCP server** gives Antigravity direct access to the GitHub API — creating PRs, managing issues, reading repo files, triggering Actions, and more. No Docker required.

#### Install the Native Binary

```powershell
# Download the latest release (Windows x64)
$version = "v0.31.0"  # Check https://github.com/github/github-mcp-server/releases for latest
$url = "https://github.com/github/github-mcp-server/releases/download/$version/github-mcp-server_Windows_x86_64.zip"
$installDir = "$env:USERPROFILE\.gemini\antigravity\mcp_servers\github-mcp-server"

New-Item -ItemType Directory -Path $installDir -Force | Out-Null
Invoke-WebRequest -Uri $url -OutFile "$env:TEMP\github-mcp.zip" -UseBasicParsing
Expand-Archive -Path "$env:TEMP\github-mcp.zip" -DestinationPath $installDir -Force
Remove-Item "$env:TEMP\github-mcp.zip"

# Verify
& "$installDir\github-mcp-server.exe" --help
```

#### Add to MCP Config

Open `~/.gemini/antigravity/mcp_config.json` and add to the `mcpServers` object:

```json
"github": {
  "command": "C:\\Users\\YOUR_USER\\.gemini\\antigravity\\mcp_servers\\github-mcp-server\\github-mcp-server.exe",
  "args": ["stdio"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_TOKEN_HERE"
  }
}
```

> Replace `YOUR_USER` with your Windows username and `ghp_YOUR_TOKEN_HERE` with the PAT from Step 1.6.

#### What It Enables

Once configured, Antigravity can:

| Capability | Example |
|------------|--------|
| Read files from repos | `get_file_contents(owner, repo, path)` |
| Create/edit files | `create_or_update_file(owner, repo, path, content)` |
| Create PRs | `create_pull_request(owner, repo, title, body, head, base)` |
| List/create issues | `create_issue(owner, repo, title, body)` |
| Search code | `search_code(query)` |
| Trigger Actions | `create_workflow_dispatch(owner, repo, workflow_id)` |
| List branches | `list_branches(owner, repo)` |
| Get commit history | `list_commits(owner, repo)` |

> **Security note**: The PAT is stored locally in `mcp_config.json`. Never commit this file to git. Add `mcp_config.json` to `.gitignore` if in doubt.

### Step 7.4: Create Reusable Workflows

Workflows are `.md` files in `.agents/workflows/` that Antigravity can follow:

**`.agents/workflows/deploy-changed.md`**:
```markdown
---
description: Deploy changed components to production
---
// turbo-all

1. Build frontend:
   ```powershell
   cd web && npm run build
````

2. Deploy to Firebase:
   ```powershell
   cd .. && npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
   ```
3. Verify the deployed site loads correctly.
4. Update docs/deployments.md with the deploy details.
5. Git commit and push.

````

### Step 7.5: Parallel E2E Testing Setup

```powershell
cd ui
npm init -y
npm install playwright
npx playwright install chromium
```

The starter kit includes `ui/validate-parallel.js` — a parallel browser validator that checks **ALL pages simultaneously** using 6 worker contexts:

```powershell
# Validate all pages in parallel (6 workers by default)
node validate-parallel.js --url https://YOUR_PROJECT_ID.web.app

# More workers for larger sites
node validate-parallel.js --url https://YOUR_PROJECT_ID.web.app --workers 10

# Debug mode (shows browsers)
node validate-parallel.js --url https://YOUR_PROJECT_ID.web.app --headed
```

Edit the `PAGES` array in `validate-parallel.js` to define your routes and checks:

```javascript
const PAGES = [
  {
    name: "Home",
    path: "/",
    checks: [
      { type: "title-contains", value: "My App" },
      { type: "no-error" },
      { type: "screenshot" },
    ],
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    checks: [
      { type: "selector-visible", value: "[data-testid='dashboard']" },
      { type: "no-error" },
      { type: "screenshot" },
    ],
  },
  // ... add all your pages
];
```

Available check types: `title-contains`, `selector-visible`, `selector-text`, `no-error`, `screenshot`, `api-health`.

Output: `ui/screenshots/*.png` + `ui/screenshots/validation_report.json`

> **Tip**: Always use `data-testid` attributes on interactive elements for reliable testing.

### Step 7.6: Auto-Sync (GitHub to Local)

Keep your local repo automatically synced with GitHub (picks up Lovable PRs, web edits, CI changes):

```powershell
# One-time check
powershell -File scripts/auto-sync.ps1 -Once

# Background daemon (checks every 30s)
Start-Process powershell -ArgumentList "-File scripts/auto-sync.ps1" -WindowStyle Hidden

# Custom interval
powershell -File scripts/auto-sync.ps1 -Interval 15
```

The auto-sync script:
- Fetches from origin every N seconds
- Stashes local changes if dirty
- Pulls with fast-forward (falls back to rebase)
- Restores stash after pull

Also available as `/github-sync` workflow in Antigravity.

---

## Phase 8 — Backend Services (Cloud Run)

### Step 8.1: Create a Service

Each backend service lives in `functions/<service-name>/`:

```
functions/
└── api-gateway/
    ├── main.py            # FastAPI app
    ├── requirements.txt   # Python deps
    ├── Dockerfile         # Container config
    └── deploy.ps1         # Deploy script
```

**`main.py`** (minimal FastAPI):

```python
from fastapi import FastAPI
app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"service": "api-gateway", "version": "1.0.0"}
```

**`Dockerfile`**:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

**`requirements.txt`**:

```
fastapi>=0.100.0
uvicorn>=0.23.0
```

### Step 8.2: Create Deploy Script

**`deploy.ps1`** (MUST be inside the service folder):

```powershell
# deploy.ps1 — Deploy this service to Cloud Run
$ErrorActionPreference = "Stop"
$PROJECT_ID = "YOUR_PROJECT_ID"
$REGION = "us-central1"
$SERVICE = Split-Path -Leaf (Get-Location)

Write-Host "Deploying $SERVICE..."

# Preflight
if (-not (Test-Path "Dockerfile")) { throw "No Dockerfile found" }

# Deploy
gcloud run deploy $SERVICE `
  --source . `
  --project $PROJECT_ID `
  --region $REGION `
  --allow-unauthenticated `
  --port 8080 `
  --memory 512Mi `
  --cpu 1 `
  --min-instances 0 `
  --max-instances 3

# Get URL
$DEPLOYED_URL = gcloud run services describe $SERVICE --project $PROJECT_ID --region $REGION --format="value(status.url)"
Write-Host "Deployed to: $DEPLOYED_URL"

# Verify health
$response = Invoke-WebRequest -Uri "$DEPLOYED_URL/health" -UseBasicParsing -TimeoutSec 30
if ($response.StatusCode -eq 200) {
    Write-Host "Health check passed"
    exit 0
} else {
    Write-Host "Health check FAILED"
    exit 1
}
```

> **RULE**: NEVER deploy from the repo root. Always deploy from inside `functions/<name>/`.

### Step 8.3: Deploy

```powershell
cd functions/api-gateway
./deploy.ps1
```

---

## Phase 9 — Data Pipeline (Stitch)

### Step 9.1: What is Stitch?

"Stitch" is a pattern for merging data from multiple sources into a unified graph or data model. The concept:

```
Source A (e.g., emails) ──┐
Source B (e.g., chat) ────┤     ┌─────────────┐     ┌───────────┐
Source C (e.g., files) ───┼────▶│  Stitcher   │────▶│ Database  │
Source D (e.g., calls) ───┘     │  Pipeline   │     │ (unified) │
                                └─────────────┘     └───────────┘
```

### Step 9.2: Create a Stitcher

Create `scripts/stitcher.py`:

```python
"""
Cross-source data stitcher.
Merges data from multiple input sources into a unified model.
"""
import hashlib
from datetime import datetime

class DataStitcher:
    def __init__(self, project_id: str, dataset: str):
        self.project_id = project_id
        self.dataset = dataset

    def stitch_by_participants(self, records: list) -> list:
        """Link records with the same participants across sources."""
        # Group by participant
        by_participant = {}
        for record in records:
            key = frozenset([record["from"], record["to"]])
            by_participant.setdefault(key, []).append(record)

        # Create links for cross-source matches
        links = []
        for key, group in by_participant.items():
            sources = set(r["source"] for r in group)
            if len(sources) > 1:
                for i, a in enumerate(group):
                    for b in group[i+1:]:
                        if a["source"] != b["source"]:
                            links.append({
                                "link_id": hashlib.md5(
                                    f"{a['id']}_{b['id']}".encode()
                                ).hexdigest()[:16],
                                "source_a": a["id"],
                                "source_b": b["id"],
                                "method": "SAME_PARTICIPANTS",
                                "strength": 0.9,
                                "created_at": datetime.utcnow().isoformat()
                            })
        return links

    def stitch_by_time(self, records: list, window_minutes: int = 60) -> list:
        """Link records within a time window across sources."""
        # Sort by timestamp
        sorted_records = sorted(records, key=lambda r: r["timestamp"])

        links = []
        for i, a in enumerate(sorted_records):
            for b in sorted_records[i+1:]:
                if a["source"] == b["source"]:
                    continue
                diff = (b["timestamp"] - a["timestamp"]).total_seconds() / 60
                if diff > window_minutes:
                    break
                links.append({
                    "link_id": hashlib.md5(
                        f"{a['id']}_{b['id']}_time".encode()
                    ).hexdigest()[:16],
                    "source_a": a["id"],
                    "source_b": b["id"],
                    "method": "TEMPORAL_PROXIMITY",
                    "strength": 1.0 - (diff / window_minutes),
                    "created_at": datetime.utcnow().isoformat()
                })
        return links

if __name__ == "__main__":
    stitcher = DataStitcher("YOUR_PROJECT_ID", "YOUR_DATASET")
    print("Stitcher ready. Provide records to process.")
```

### Step 9.3: Integrate with BigQuery (Optional)

```python
from google.cloud import bigquery

client = bigquery.Client(project="YOUR_PROJECT_ID")

# Write stitch links
table_ref = f"YOUR_PROJECT_ID.YOUR_DATASET.links"
errors = client.insert_rows_json(table_ref, links)
```

---

## Phase 10 — CI/CD & Documentation

### Step 10.1: GitHub Actions

**`.github/workflows/auto_sync.yml`**:

```yaml
name: Auto Sync & Record Changes
on:
  push:
    branches: [master]
  workflow_dispatch:
jobs:
  record-changes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Record timestamp
        run: |
          echo "$(date -u) - Push by ${{ github.actor }}" >> docs/deployments.md
      - name: Commit
        run: |
          git config user.name "Auto-Sync"
          git config user.email "auto@project.dev"
          git add -A
          git diff --cached --quiet || git commit -m "auto: record changes"
          git push
```

### Step 10.2: Documentation Structure

```
docs/
├── CURRENT_STATUS.md        # Live system state (update after every deploy)
├── deployments.md           # Chronological deploy log
├── tasks/
│   └── TASK-001.md          # Task tracker (plan → implement → verify → deploy → done)
└── platform-integration/
    └── NEW_PROJECT_GUIDE.md  # This file
```

### Step 10.3: Task Tracking Format

Each task follows this pattern:

```markdown
## TASK-NNN: Title

**Status**: ✅ DONE | 🟡 IN PROGRESS | 🔵 PLANNED
**Sprint**: YYYY-MM-DD

### Plan

- [ ] Step 1
- [ ] Step 2

### Verify

- Test results
- Screenshots

### Deploy

- Commit hash
- URL
- Verification evidence
```

---

## The Development Loop

Once everything is set up, the daily development loop is:

```
 ┌─────────────────────────────────────────────────────────────┐
 │  0. SYNC   → auto-sync.ps1 runs in background (30s poll)   │
 │              Lovable PRs auto-pulled to local               │
 │                                                             │
 │  1. DESIGN → Open Lovable, create/iterate UI visually      │
 │              Lovable pushes a PR to GitHub                  │
 │              Auto-sync pulls changes locally                │
 │                                                             │
 │  2. CODE   → Antigravity reviews PR, merges or adapts      │
 │              Uses GitHub MCP for PRs/issues/code search     │
 │              Uses Firebase MCP for deploy/config/rules      │
 │              Writes backend + frontend + tests              │
 │                                                             │
 │  3. BUILD  → npm run build (frontend)                      │
 │              node ui/validate-parallel.js (6 workers)       │
 │                                                             │
 │  4. DEPLOY → firebase deploy --only hosting (frontend)     │
 │              functions/<name>/deploy.ps1 (backend)          │
 │                                                             │
 │  5. VERIFY → Parallel Playwright screenshots (all pages)   │
 │              Health check endpoints                        │
 │              validation_report.json generated               │
 │                                                             │
 │  6. DOCUMENT → Update CURRENT_STATUS.md                    │
 │                Update TASK-NNN.md                           │
 │                Log in deployments.md                        │
 │                Git commit + push (auto-synced to remote)    │
 │                                                             │
 │  7. STITCH → (if data pipeline) Ingest new data            │
 │              Run stitcher across sources                    │
 │              Verify unified data in database                │
 │                                                             │
 │  ↻ Repeat                                                  │
 └─────────────────────────────────────────────────────────────┘
```

---

## Configuration Reference

### Files to Create for Any New Project

| File                           | Purpose                     | Template                             |
| ------------------------------ | --------------------------- | ------------------------------------ |
| `firebase.json`                | Firebase Hosting config     | See Phase 3.4                        |
| `.firebaserc`                  | Firebase project alias      | `{"projects":{"default":"YOUR_ID"}}` |
| `web/next.config.ts`           | Next.js static export       | `output: "export"`                   |
| `specs/TASK.md`                | Master task tracker         | See Phase 2.3                        |
| `docs/CURRENT_STATUS.md`       | Live status                 | See Phase 2.3                        |
| `docs/deployments.md`          | Deploy log                  | See Phase 2.3                        |
| `.agents/workflows/*.md`       | IDE workflows               | See Phase 6.4                        |
| `.github/workflows/*.yml`      | CI/CD pipelines             | See Phase 10.1                       |
| `ui/validate-parallel.js`     | Parallel E2E tests (6 workers) | See Phase 7.5                     |
| `scripts/auto-sync.ps1`       | GitHub-to-local auto-sync   | See Phase 7.6                        |
| `functions/*/deploy.ps1`      | Service deploy scripts      | See Phase 8.2                        |

### Key Commands Cheat Sheet

```powershell
# ─── Authentication ───
gcloud auth login                           # GCP login
gcloud auth application-default login       # ADC for MCP servers
firebase login                              # Firebase CLI login

# ─── Build ───
cd web && npm run build                     # Build frontend

# ─── Deploy ───
npx firebase-tools deploy --only hosting    # Deploy frontend
cd functions/NAME && ./deploy.ps1           # Deploy backend service

# ─── Test ───
cd ui && node validate.js                   # Run E2E tests

# ─── Git ───
git add -A && git commit -m "msg" && git push origin master

# ─── Status ───
gcloud run services list --project=ID       # List Cloud Run services
firebase projects:list                      # List Firebase projects
gcloud config list                          # Show active config
```

### MCP Server Auth Requirements

| MCP Server            | Required Auth                   | Command to Set Up                                        |
| --------------------- | ------------------------------- | -------------------------------------------------------- |
| `firebase-mcp-server` | Firebase CLI token              | `firebase login`                                         |
| `cloudrun`            | Application Default Credentials | `gcloud auth application-default login`                  |
| `github`              | GitHub Personal Access Token    | Create at github.com/settings/personal-access-tokens/new |
| `sequential-thinking` | None                            | (auto)                                                   |

---

## Troubleshooting

### "No authorized accounts" from Firebase

```powershell
firebase login    # Re-authenticate
```

### "Could not load the default credentials" from GCP

```powershell
gcloud auth application-default login    # Recreate ADC
```

### Firebase Hosting shows wrong page / all routes go to index

- Remove any `"rewrites": [{"source": "**", "destination": "/index.html"}]` from `firebase.json`
- Ensure `"cleanUrls": true` is set
- Re-deploy: `npx firebase-tools deploy --only hosting`

### Cloud Run cold starts (5-10s delay)

- Set `--min-instances=1` in deploy script for always-warm
- Or implement mock/fallback data in the UI while API warms up

### Lovable PR won't build in Next.js

- Lovable generates its own component structure (may use Vite or different deps)
- Adapt: copy the components you want into your `web/app/` structure
- Don't merge Lovable PRs blindly — cherry-pick what you need

### Playwright clicks wrong element

- Add `data-testid="unique-name"` to interactive elements
- Use `page.locator('[data-testid="unique-name"]')` instead of text-based selectors

### Git add fails on Windows (NUL device)

- Don't use `git add -A` if you have path issues
- Use: `git add docs/ web/ functions/ specs/` (selective add)

---

> **You're done!** Follow [The Development Loop](#the-development-loop) for day-to-day work.
````
