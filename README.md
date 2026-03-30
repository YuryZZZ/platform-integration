# Platform Integration Flow — Complete Replication Guide

> **Version**: 1.0.0
> **Last Updated**: 2026-02-28
> **Author**: Antigravity + Agent
> **Purpose**: Enable any engineer or AI agent to replicate the full Lovable → GitHub → Firebase → Antigravity → Google Stitch development flow on any new project.

---

## Table of Contents

1. [**Prompt to Portal** (Start Here)](./PROMPT_TO_PORTAL.md) — From idea to live URL in 7 steps
2. [Architecture Overview](#1-architecture-overview)
2. [Platform Accounts & Authentication](#2-platform-accounts--authentication)
3. [GitHub Setup](#3-github-setup)
4. [Firebase Setup](#4-firebase-setup)
5. [Lovable Setup](#5-lovable-setup)
6. [Antigravity (IDE) Setup](#6-antigravity-ide-setup)
7. [Thread Stitcher (Cross-Platform Data Pipeline)](#7-thread-stitcher)
7b. [Google Stitch (UI Design Platform)](#7b-google-stitch) → See [STITCH_DESIGN.md](./STITCH_DESIGN.md)
7c. [Agent-to-Agent Protocol (A2A) — Production Ready](#7b-agent-to-agent-protocol-a2a--production-ready)
8. [The Full Development Loop](#8-the-full-development-loop)
9. [Deployment Pipeline](#9-deployment-pipeline)
10. [Troubleshooting](#10-troubleshooting)
11. [Reference: Current LAKF Config](#11-reference-current-lakf-config)

**See also:** [JULES_INTEGRATION.md](./JULES_INTEGRATION.md) · [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) · [STITCH_DESIGN.md](./STITCH_DESIGN.md)

### Design Template Prompt Guides (in `Portals/Design/docs/`)

The Design template contains 5 prompt guides consumed by Antigravity's IDE Expansion Engine:

| Guide | Purpose |
|-------|---------|
| `STITCH_PROMPT_GUIDE.md` | UI generation modes, voice design, precision limitations |
| `LOVABLE_PROMPT_GUIDE.md` | `.lovable/` folder, Plan Mode, Agent Mode safety |
| `FIREBASE_PROMPT_GUIDE.md` | v9 SDK rules, App Hosting (GA), health checks |
| `JULES_PROMPT_GUIDE.md` | Async delegation, Critic Agent, 60-task parallelism |
| `PAYLOAD_PROMPT_GUIDE.md` | Payload CMS 3 (control plane), Local API safety, RLS boundary |

Additional Design template docs: `RISK_REGISTER.md` (13 tracked risks), `TESTING.md` (7-surface Playwright matrix), `COMPETITOR_RESEARCH.md` (market intelligence template).

---
---

## 1. Architecture Overview

```
                             ┌──────────────┐     ┌──────────────────┐
┌──────────────┐     │   GitHub     │     │    Firebase      │
│   Lovable    │────▶│  (Source of  │────▶│   (Hosting +     │
│  (UI Design) │ PR  │   Truth)     │ CD  │    Auth + DB)    │
└──────────────┘     └──────┴───────┘     └────────┴─────────┘
                            │                       │
┌──────────────┐     ┌──────┴───────┐               │
│  Google      │ MCP │  Antigravity │               │
│  Stitch      │────▶│  (IDE Agent) │───────────────┘
│  (UI Design) │     │  Playwright  │          Deploy
└──────────────┘     └──────┴───────┘
                            │
                     ┌──────┴───────┐     ┌──────────────────┐
                     │  Cloud Run   │────▶│   BigQuery       │
                     │  (API + ML)  │     │ (Data Warehouse) │
                     └──────────────┘     └──────────────────┘
```

### Data Flow

1. **Lovable** → Creates/iterates UI designs visually → Pushes to GitHub branch
2. **GitHub** → Central repository → Triggers CI/CD → Auto-deploys
3. **Antigravity** → AI coding agent → Builds code, runs tests, deploys
4. **Firebase** → Hosting (static UI), Auth (users), Firestore (state)
5. **Cloud Run** → API backend, ML inference, ingestion pipelines
6. **Thread Stitcher** → Cross-platform data pipeline (email + WhatsApp + calls → unified graph)
6b. **Google Stitch** → AI-powered UI design platform (see [STITCH_DESIGN.md](./STITCH_DESIGN.md))
7. **BigQuery** → Immutable data warehouse with vector search

---

## 2. Platform Accounts & Authentication

### Required Accounts

| Platform         | Account Type     | URL                                 | Purpose                  |
| ---------------- | ---------------- | ----------------------------------- | ------------------------ |
| **Google Cloud** | GCP Project      | https://console.cloud.google.com    | Cloud Run, BigQuery, IAM |
| **Firebase**     | Firebase Project | https://console.firebase.google.com | Hosting, Auth, Firestore |
| **GitHub**       | Repository       | https://github.com                  | Source control, CI/CD    |
| **Lovable**      | Workspace        | https://lovable.dev                 | Visual UI design         |
| **Antigravity**  | IDE License      | Antigravity IDE                     | AI coding agent          |

### Authentication Chain

```
Google Account (user@gmail.com)
  ├── GCP Project (legalai-480809) ────── Service Account Key
  │     ├── Cloud Run ──── IAM Invoker
  │     ├── BigQuery ──── Dataset Viewer/Editor
  │     └── Cloud Storage ── Object Admin
  │
  ├── Firebase Project (studio-790024798-53451) ────── Firebase CLI Token
  │     ├── Hosting ──── Deploy Token
  │     ├── Auth ──── Admin SDK
  │     └── Firestore ──── Security Rules
  │
  ├── GitHub (YuryZZZ) ────── SSH Key or HTTPS Token
  │     ├── Push/Pull ──── Git credentials
  │     └── Actions ──── GITHUB_TOKEN (auto)
  │
  └── Lovable (golden-precision) ────── GitHub OAuth
        └── Push to Repo ──── GitHub App
```

---

## 3. GitHub Setup

### 3.1 Create Repository

```bash
# Create and clone
git init email_to_cloud
cd email_to_cloud
git remote add origin https://github.com/<USER>/email_to_cloud.git
git branch -M master
git push -u origin master
```

### 3.2 Repository Structure

```
email_to_cloud/
├── web/                    # Next.js frontend (admin + user UI)
│   ├── app/
│   │   ├── page.tsx        # Admin dashboard
│   │   ├── search/
│   │   │   └── page.tsx    # User search page
│   │   └── layout.tsx      # Root layout
│   ├── next.config.ts      # Static export config
│   └── package.json
├── functions/              # Cloud Run microservices (each has deploy.ps1)
│   ├── api-gateway/
│   ├── lakf-api/
│   └── ingestion-service/
├── src/                    # Python backend (FastAPI)
│   ├── api/
│   └── common/
├── ui/                     # E2E testing
│   └── validate.js         # Playwright test suite
├── docs/                   # Documentation
│   ├── CURRENT_STATUS.md
│   ├── tasks/TASK-001.md
│   └── deployments.md
├── .agents/workflows/      # IDE workflow commands
├── .github/workflows/      # CI/CD pipelines
├── firebase.json           # Firebase Hosting config
├── .firebaserc             # Firebase project alias
└── specs/TASK.md           # Master task spec
```

### 3.3 SSH Key Authentication

```powershell
# Generate SSH key (if not exists)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub → Settings → SSH Keys
cat ~/.ssh/id_ed25519.pub

# Test connection
ssh -T git@github.com

# Configure git
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

### 3.4 GitHub Actions (CI/CD)

Create `.github/workflows/auto_sync.yml`:

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
      - name: Record deployment timestamp
        run: |
          echo "$(date -u '+%Y-%m-%dT%H:%M:%SZ') - Push to master" >> docs/deployments.md
      - name: Commit changelog
        run: |
          git config user.name "Auto-Sync"
          git config user.email "auto-sync@project.dev"
          git add -A
          git diff --cached --quiet || git commit -m "auto: record changes"
          git push
```

---

## 4. Firebase Setup

### 4.1 Create Firebase Project

```powershell
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Create project (or use existing GCP project)
firebase projects:create <PROJECT_ID> --display-name "My Project"

# Initialize in repo
cd email_to_cloud
firebase init hosting
```

### 4.2 Firebase Configuration Files

**`firebase.json`** — Hosting config for multi-page static sites:

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

> **CRITICAL**: Do NOT add SPA rewrites (`"source": "**", "destination": "/index.html"`) if you have multiple pages. Use `cleanUrls: true` instead — Firebase will auto-serve `search.html` for `/search`.

**`.firebaserc`** — Project alias:

```json
{
  "projects": {
    "default": "<FIREBASE_PROJECT_ID>"
  }
}
```

### 4.3 Firebase Web App Registration

```powershell
# Register a web app
firebase apps:create WEB "my-dashboard" --project <PROJECT_ID>

# Get SDK config for the app
firebase apps:sdkconfig WEB <APP_ID> --project <PROJECT_ID>
```

The SDK config (for use in frontend code):

```typescript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<PROJECT_ID>.firebasestorage.app",
  messagingSenderId: "...",
  appId: "...",
};
```

### 4.4 Firebase Hosting Deploy

```powershell
# Build Next.js static export
cd web && npx next build

# Deploy to Firebase Hosting
cd .. && npx firebase-tools deploy --only hosting --project <PROJECT_ID>

# Verify
# Visit: https://<PROJECT_ID>.web.app
```

### 4.5 Firebase Auth (Optional — for protected pages)

```powershell
# Enable Auth providers via CLI or console
# Email/Password:
firebase auth:import users.json --project <PROJECT_ID>

# Or enable via MCP:
# Use firebase_init with auth.providers
```

---

## 5. Lovable Setup

### 5.1 Create Lovable Project

1. Go to https://lovable.dev
2. Create a new project (or use existing workspace `golden-precision`)
3. Design the UI visually using Lovable's drag-and-drop components

### 5.2 Connect Lovable to GitHub

1. In Lovable → Project Settings → Integrations → **Connect to GitHub**
2. Authorize the Lovable GitHub App
3. Select repo: `<USER>/email_to_cloud`
4. Lovable will push UI changes to a branch and create a PR

### 5.3 Design Tokens (keep consistent with existing UI)

When designing in Lovable, use these tokens to match the admin UI theme:

| Token          | Value                       | Usage                  |
| -------------- | --------------------------- | ---------------------- |
| Background     | `#0f172a` (slate-900)       | Page background        |
| Card BG        | `rgba(255, 255, 255, 0.03)` | Card surfaces          |
| Card Border    | `rgba(255, 255, 255, 0.06)` | Subtle borders         |
| Primary        | `#6366f1` (indigo-500)      | Buttons, active states |
| Accent         | `#a855f7` (purple-500)      | Highlights, gradients  |
| Success        | `#34d399` (emerald-400)     | Status badges          |
| Error          | `#f87171` (red-400)         | Error states           |
| Text Primary   | `#ffffff`                   | Main text              |
| Text Secondary | `#94a3b8` (slate-400)       | Sub-text               |
| Font Family    | `Inter, system-ui`          | Typography             |

### 5.4 Lovable → Code Sync Workflow

```
Lovable (design) → GitHub PR → Review → Merge to master → Firebase auto-deploy
```

After Lovable creates a PR:

```powershell
# Pull the Lovable branch
git pull origin master

# Review Lovable-generated components
ls web/src/components/

# Build and verify
cd web && npx next build

# Deploy
cd .. && npx firebase-tools deploy --only hosting --project <PROJECT_ID>

# Push
git add -A && git commit -m "feat: integrate Lovable UI updates" && git push origin master
```

---

## 6. Antigravity (IDE) Setup

### 6.1 Workspace Configuration

Antigravity operates as the AI coding agent within the IDE. It:

- Edits code directly in the repository
- Runs terminal commands (build, deploy, test)
- Uses the browser for visual validation (Playwright + Antigravity Browser)
- Connects to MCP servers for Firebase, Cloud Run, etc.

### 6.2 MCP Server Connections

Antigravity connects to these MCP servers:

| MCP Server            | Purpose                                           | Authentication           |
| --------------------- | ------------------------------------------------- | ------------------------ |
| `firebase-mcp-server` | Firebase CLI operations, Firestore, Auth, Hosting | Firebase CLI login (ADC) |
| `cloudrun`            | Cloud Run deployment, service management          | GCP ADC                  |
| `sequential-thinking` | Complex problem decomposition                     | None (local)             |

Authentication flow:

```
User → `firebase login` → Creates refresh token
     → `gcloud auth application-default login` → Creates ADC credentials
     → Antigravity MCP servers use these tokens automatically
```

### 6.3 Workflows (Slash Commands)

Create `.agents/workflows/` with reusable workflows:

| File                | Command           | Purpose                      |
| ------------------- | ----------------- | ---------------------------- |
| `lovable-sync.md`   | `/lovable-sync`   | Sync Lovable designs to repo |
| `deploy-changed.md` | `/deploy-changed` | Deploy changed components    |
| `verify-pyramid.md` | `/verify-pyramid` | Run verification tests       |

### 6.4 E2E Testing with Playwright

```javascript
// ui/validate.js — Playwright validation suite
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to deployed site
  await page.goto("https://<PROJECT_ID>.web.app");

  // Validate each tab/page
  // Take screenshots
  // Assert elements

  await browser.close();
})();
```

Run validation:

```powershell
cd ui && node validate.js
```

### 6.5 Antigravity Browser Validation

Antigravity can also use its built-in browser subagent to:

1. Navigate to the live deployed site
2. Click through all pages/tabs
3. Take screenshots
4. Verify content and interactions
5. Record a video walkthrough (saved as `.webp`)

---

## 7. Thread Stitcher

> **Not to be confused with Google Stitch** (the AI UI design platform).
> For Google Stitch integration, see [STITCH_DESIGN.md](./STITCH_DESIGN.md).

### 7.1 What is the Thread Stitcher?

The **Thread Stitcher** is a data pipeline that merges communications across different platforms (email, WhatsApp, calls, SMS) into unified conversation threads in the knowledge graph.

### 7.2 Thread Stitcher Architecture

```
Email (PST/EML)──┐
WhatsApp Export──┤
Call Records────┤     ┌─────────────┐     ┌───────────┐
SMS Exports─────┼────▶│  Stitcher   │────▶│  BigQuery  │
PDF Documents───┤     │  Pipeline   │     │  (Graph)   │
CAD Drawings────┘     └─────────────┘     └───────────┘
```

### 7.3 Stitching Methods

The stitcher uses 3 methods to link cross-platform communications:

1. **Participant Overlap**: Same sender/receiver across platforms (strength: 0.9)
2. **Temporal Proximity**: Messages within 60-minute windows (strength: 1.0 - minutes/60)
3. **Content Similarity**: Subject/content keyword matching (strength: 0.7)

### 7.4 Running the Stitcher

```powershell
# Local execution
python scripts/cross_platform_stitcher.py

# Cloud execution (via Dataflow)
python scripts/deploy_pipeline_cloud.py
```

### 7.5 Stitcher Output

The stitcher creates `knowledge_links` rows in BigQuery:

```sql
SELECT link_id, source_entity_id, target_entity_id,
       link_type, link_strength, extraction_method
FROM `project.dataset.knowledge_links`
WHERE extraction_method = 'thread_stitcher'
```

---

## 7b. Agent-to-Agent Protocol (A2A) — Production Ready

> **Status**: Production-ready. Donated to Linux Foundation (June 2025). Supported by 150+ organizations including Google, Salesforce, SAP, ServiceNow, and Atlassian.

The [A2A protocol](https://github.com/google/A2A) enables horizontal agent collaboration —
agents discovering and delegating tasks to each other without human routing.

### How It Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Antigravity │     │    Jules     │     │  Stitch      │
│  (Local IDE) │◄───►│  (Cloud VM)  │◄───►│  (UI Design) │
│              │ A2A │              │ A2A │              │
└──────────────┘     └──────────────┘     └──────────────┘
        │                    │                    │
        └────────────────────┴────────────────────┘
                     Agent Cards
              /.well-known/agent-card.json
```

### MCP vs A2A

| Protocol | Direction | Purpose | Status |
|----------|-----------|---------|--------|
| **MCP** | Vertical (agent → tool) | Agent accesses databases, APIs, services | ✅ Active |
| **A2A** | Horizontal (agent → agent) | Agents delegate tasks to each other | ✅ Production |

### Key Concepts

- **Agent Cards**: JSON manifests at `/.well-known/agent-card.json` that advertise capabilities
- **Self-Discovery**: Agents find each other by reading Agent Cards
- **Task Delegation**: Antigravity can delegate "refactor all tests" to Jules automatically
- **Multi-Modal**: Agents can exchange text, code, images, and structured data
- **MCP Gateways**: Production systems use centralized gateways for auth, observability, and security policy enforcement across both protocol layers

### Integration Status

- MCP: **Use now** for all tool access (databases, APIs, services)
- A2A: **Available** for agent-to-agent delegation. Currently, CLI commands (`/jules`) remain the simplest path. Full A2A routing is supported but optional.

---

## 8. The Full Development Loop

This is the complete end-to-end flow that connects all platforms:

```
┌─────────────────────────────────────────────────────────────┐
│                    THE DEVELOPMENT LOOP                      │
│                                                              │
│  0. DESIGN SYSTEM (Google Stitch)                           │
│     └── Generate UI screens from prompts                    │
│     └── Extract design tokens → DESIGN.md                   │
│                                                              │
│  1. DESIGN (Lovable — optional alternative)                  │
│     └── Create/iterate UI visually                          │
│     └── Lovable pushes PR to GitHub                         │
│                                                              │
│  2. CODE (Antigravity)                                      │
│     └── Review Lovable PR, merge or adapt                   │
│     └── Write backend logic (Python/FastAPI)                │
│     └── Write frontend (Next.js/React)                      │
│     └── Write tests (Playwright)                            │
│                                                              │
│  3. BUILD & TEST                                            │
│     └── `npx next build` (frontend)                         │
│     └── `node ui/validate.js` (Playwright E2E)              │
│     └── Antigravity Browser visual validation               │
│                                                              │
│  4. DEPLOY                                                  │
│     └── `firebase deploy --only hosting` (frontend)         │
│     └── `functions/<name>/deploy.ps1` (Cloud Run)           │
│     └── `python scripts/deploy_pipeline_cloud.py` (Dataflow)│
│                                                              │
│  5. VERIFY                                                  │
│     └── Health check endpoints                              │
│     └── Playwright screenshotting                           │
│     └── Browser walkthrough recording                       │
│                                                              │
│  6. DOCUMENT                                                │
│     └── Update docs/CURRENT_STATUS.md                       │
│     └── Update docs/tasks/TASK-001.md                       │
│     └── Update docs/deployments.md                          │
│     └── Git commit + push                                   │
│                                                              │
│  7. THREAD STITCHER (Data Pipeline)                         │
│     └── Ingest new documents                                │
│     └── Run cross-platform thread stitcher                  │
│     └── Verify knowledge graph in BigQuery                  │
│                                                              │
│  ↻ Repeat from step 1                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Deployment Pipeline

### 9.1 Frontend (Firebase Hosting)

```powershell
# 1. Build
cd web && npx next build

# 2. Deploy
cd .. && npx firebase-tools deploy --only hosting --project <PROJECT_ID>

# 3. Verify
# Browser: https://<PROJECT_ID>.web.app
# Playwright: cd ui && node validate.js
```

### 9.2 Backend (Cloud Run)

```powershell
# Deploy from INSIDE the function directory (NEVER deploy repo root)
cd functions/<service-name>
./deploy.ps1
# deploy.ps1 must: preflight → deploy → set DEPLOYED_URL → verify /health → exit 0/1
```

### 9.3 Data Pipeline (Dataflow)

```powershell
# Deploy ingestion pipeline
python scripts/deploy_pipeline_cloud.py

# Deploy embedding pipeline
python scripts/deploy_embedding_cloud.py

# Run stitcher
python scripts/cross_platform_stitcher.py
```

### 9.4 Full Deployment Checklist

```
□ Code changes committed and pushed to master
□ Next.js build succeeds (`npx next build` → exit 0)
□ Firebase Hosting deployed and verified
□ Cloud Run services healthy (`/health` returns 200)
□ Playwright tests pass (7+/8 tabs)
□ docs/CURRENT_STATUS.md updated
□ docs/tasks/TASK-001.md updated
□ docs/deployments.md entry added
□ Git pushed to master
```

---

## 10. Troubleshooting

### Firebase Routing (Multi-Page)

**Problem**: All routes serve `index.html` instead of page-specific files.
**Cause**: SPA catch-all rewrite (`"source": "**", "destination": "/index.html"`).
**Fix**: Remove the rewrite, add `"cleanUrls": true` to firebase.json.

### Cloud Run Cold Starts

**Problem**: API calls timeout on first request (~5-10 seconds).
**Cause**: Cloud Run scales to 0 instances by default.
**Fix**: Set `min-instances=1` or implement mock data fallback in UI.

### Lovable → GitHub Sync Issues

**Problem**: Lovable-generated code doesn't build with Next.js.
**Cause**: Lovable generates its own component structure, may use different deps.
**Fix**: Adapt Lovable components to your Next.js app structure. Don't blindly merge.

### Playwright Locator Conflicts

**Problem**: Button click hits the wrong element.
**Cause**: Multiple elements with same text (e.g., "Search" nav tab vs "Search" button).
**Fix**: Add `data-testid` attributes to interactive elements.

### Git Add Failures (NUL file)

**Problem**: `git add -A` fails with "unable to index file 'nul'".
**Cause**: Windows NUL device name conflict in repo.
**Fix**: Use selective `git add <file1> <file2>` instead of `git add -A`.

---

## 11. Reference: Current LAKF Authentication & Config (LIVE)

> ⚠️ This section contains real project details. Use as reference for replication.

---

### 11.1 Google Cloud Account

```
Active Account:    yury.zohan@gmail.com
Default Project:   legalai-480809
Default Region:    us-central1
Auth Method:       gcloud auth login (OAuth browser flow)
ADC Location:      ~/.config/gcloud/application_default_credentials.json
```

Commands to verify:

```powershell
gcloud auth list                          # Shows active account
gcloud config get-value project           # Shows default project
gcloud config get-value compute/region    # Shows default region
```

---

### 11.2 GCP Projects

| Project ID               | Name                      | Number         | Purpose                 |
| ------------------------ | ------------------------- | -------------- | ----------------------- |
| `legalai-480809`         | LAKF Main                 | `699552818896` | Cloud Run, BigQuery, ML |
| `studio-790024798-53451` | Firebase app              | `180289271561` | Firebase Hosting, Auth  |
| `legalai-480809-eb863`   | legalai-480809 (Firebase) | `610907052196` | Legacy Firebase         |
| `fine-tuned-agents-hub`  | Fine-Tuned Agents Hub     | `126416872318` | ML experiments          |
| `zoho-crm-updater`       | Zoho CRM Updater          | `336956615836` | CRM integration         |
| `chatgpt-409111`         | Chatgpt                   | `774994151311` | Chat experiments        |

---

### 11.3 Service Accounts (legalai-480809)

| Email                                                           | Purpose                      |
| --------------------------------------------------------------- | ---------------------------- |
| `legalai@legalai-480809.iam.gserviceaccount.com`                | Primary LAKF service account |
| `legalai-480809@appspot.gserviceaccount.com`                    | App Engine default           |
| `openproject-sa@legalai-480809.iam.gserviceaccount.com`         | OpenProject monitoring       |
| `legal-agent-sa@legalai-480809.iam.gserviceaccount.com`         | Legal Agent service          |
| `langchain-agent@legalai-480809.iam.gserviceaccount.com`        | LangChain agent              |
| `lakf-email-platform-sa@legalai-480809.iam.gserviceaccount.com` | Email platform               |

Key file location (local dev only — NEVER commit):

```
GOOGLE_APPLICATION_CREDENTIALS=legalai-key.json
```

---

### 11.4 Billing Account

```
Account ID:     015303-BF50FD-286ED4
Display Name:   currentbillingaccount
Status:         Active (linked to legalai-480809)
```

> **Note**: There is a 3-project billing link quota. Manual console action needed to link more projects.

---

### 11.5 Firebase Project (Active)

```
Project ID:       studio-790024798-53451
Project Number:   180289271561
Display Name:     Firebase app
Created:          2026-02-25T12:55:07Z
Lifecycle State:  ACTIVE
Hosting Site:     studio-790024798-53451
```

### Firebase Web Apps

| App ID                                      | Display Name           | Status |
| ------------------------------------------- | ---------------------- | ------ |
| `1:180289271561:web:05e35f863d3c82f72145d8` | Firebase app (default) | ACTIVE |
| `1:180289271561:web:c0daaa33c1ea53c22145d8` | lakf-dashboard         | ACTIVE |

### Firebase SDK Config (safe to use in frontend)

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyB9QNbRCw9vMQ95e6MVFWvU-G3OXMRonMQ",
  authDomain: "studio-790024798-53451.firebaseapp.com",
  projectId: "studio-790024798-53451",
  storageBucket: "studio-790024798-53451.firebasestorage.app",
  messagingSenderId: "180289271561",
  appId: "1:180289271561:web:05e35f863d3c82f72145d8",
};
```

> **Note**: The `apiKey` is PUBLIC by design — it's restricted by HTTP referrer rules, not a secret.

### Firebase CLI Auth

```powershell
firebase login                              # Browser OAuth flow
firebase projects:list                      # Verify projects accessible
firebase use studio-790024798-53451         # Set active project
```

Current `.firebaserc`:

```json
{
  "projects": {
    "default": "studio-790024798-53451"
  }
}
```

Current `firebase.json`:

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

---

### 11.6 Cloud Run Services (ALL — legalai-480809)

#### us-central1 (Primary Region)

| Service                      | URL                                                        | Category     |
| ---------------------------- | ---------------------------------------------------------- | ------------ |
| **api-gateway**              | `https://api-gateway-nrlzg5ezsa-uc.a.run.app`              | LAKF Core    |
| **lakf-api**                 | `https://lakf-api-nrlzg5ezsa-uc.a.run.app`                 | LAKF Core    |
| **ingestion-service**        | `https://ingestion-service-nrlzg5ezsa-uc.a.run.app`        | LAKF Core    |
| **email-to-cloud-api**       | `https://email-to-cloud-api-nrlzg5ezsa-uc.a.run.app`       | LAKF Core    |
| **email-to-cloud-staging**   | `https://email-to-cloud-staging-nrlzg5ezsa-uc.a.run.app`   | Staging      |
| **lakf-v4-4**                | `https://lakf-v4-4-nrlzg5ezsa-uc.a.run.app`                | Legacy       |
| **legalai-api**              | `https://legalai-api-nrlzg5ezsa-uc.a.run.app`              | Legacy       |
| **adjudication-api**         | `https://adjudication-api-nrlzg5ezsa-uc.a.run.app`         | Legal Agent  |
| **ocr-service**              | `https://ocr-service-nrlzg5ezsa-uc.a.run.app`              | ML Service   |
| **forensic-agent-service**   | `https://forensic-agent-service-nrlzg5ezsa-uc.a.run.app`   | ML Service   |
| **scott-schedule-service**   | `https://scott-schedule-service-nrlzg5ezsa-uc.a.run.app`   | Legal Tool   |
| **pdf-bundle-service**       | `https://pdf-bundle-service-nrlzg5ezsa-uc.a.run.app`       | Document Gen |
| **evidence-lineage-service** | `https://evidence-lineage-service-nrlzg5ezsa-uc.a.run.app` | Legal Tool   |
| **uk-adjudication-agent**    | `https://uk-adjudication-agent-nrlzg5ezsa-uc.a.run.app`    | Legal Agent  |
| **langchain-tools**          | `https://langchain-tools-nrlzg5ezsa-uc.a.run.app`          | ML Service   |
| **langgraph-service**        | `https://langgraph-service-nrlzg5ezsa-uc.a.run.app`        | ML Service   |
| **deep-agents-service**      | `https://deep-agents-service-nrlzg5ezsa-uc.a.run.app`      | ML Service   |
| **provider-hub**             | `https://provider-hub-nrlzg5ezsa-uc.a.run.app`             | Integration  |
| **simple-agent**             | `https://simple-agent-nrlzg5ezsa-uc.a.run.app`             | ML Service   |
| **forensics-service**        | `https://forensics-service-nrlzg5ezsa-uc.a.run.app`        | ML Service   |
| **intelligence-service**     | `https://intelligence-service-nrlzg5ezsa-uc.a.run.app`     | ML Service   |
| **integration-bridge**       | `https://integration-bridge-nrlzg5ezsa-uc.a.run.app`       | Integration  |
| **forensic-service-v4**      | `https://forensic-service-v4-nrlzg5ezsa-uc.a.run.app`      | ML Service   |
| **live-coach**               | `https://live-coach-nrlzg5ezsa-uc.a.run.app`               | Frontend     |
| **legal-agent**              | `https://legal-agent-nrlzg5ezsa-uc.a.run.app`              | Legal Agent  |
| **legal-agent-v1**           | `https://legal-agent-v1-nrlzg5ezsa-uc.a.run.app`           | Legal Agent  |
| **uk-adjudication-ui**       | `https://uk-adjudication-ui-nrlzg5ezsa-uc.a.run.app`       | Frontend     |

#### europe-west1

| Service                         | URL                                                           |
| ------------------------------- | ------------------------------------------------------------- |
| **zoho-crm-dashboard**          | `https://zoho-crm-dashboard-nrlzg5ezsa-ew.a.run.app`          |
| **zoho-crm-web-dashboard**      | `https://zoho-crm-web-dashboard-nrlzg5ezsa-ew.a.run.app`      |
| **zoho-crm-platform-enhanced**  | `https://zoho-crm-platform-enhanced-nrlzg5ezsa-ew.a.run.app`  |
| **zoho-mail-archiver**          | `https://zoho-mail-archiver-nrlzg5ezsa-ew.a.run.app`          |
| **zoho-mail-archiver-enhanced** | `https://zoho-mail-archiver-enhanced-nrlzg5ezsa-ew.a.run.app` |

#### europe-west2

| Service                            | URL                                                              |
| ---------------------------------- | ---------------------------------------------------------------- |
| **uk-adjudication-agent-enhanced** | `https://uk-adjudication-agent-enhanced-nrlzg5ezsa-nw.a.run.app` |

#### us-east1

| Service               | URL                                                 |
| --------------------- | --------------------------------------------------- |
| **email-platform-v4** | `https://email-platform-v4-nrlzg5ezsa-ue.a.run.app` |

---

### 11.7 GitHub Authentication

```
Remote URL:     https://github.com/YuryZZZ/email_to_cloud.git
Protocol:       HTTPS (credential manager)
Default Branch: master
Auth Method:    Windows Credential Manager (stores GitHub PAT)
```

Verify:

```powershell
git remote -v                               # Shows remote URL
git config credential.helper                # Shows credential store
```

GitHub Actions workflows:

```
.github/workflows/auto_sync.yml            # Auto-sync on push to master
.github/workflows/ci_cd_frontend.yml        # Frontend deploy (Cloud Run)
.github/workflows/data_validation.yml       # Data pipeline checks
.github/workflows/dr_backup.yml             # Disaster recovery
.github/workflows/security_scan.yml         # Security scanning
```

---

### 11.8 Lovable Authentication

```
Workspace:      golden-precision
Auth Method:    GitHub OAuth (via Lovable GitHub App)
Connected Repo: YuryZZZ/email_to_cloud
URL:            https://lovable.dev
```

Lovable authenticates via GitHub OAuth:

1. User signs into Lovable with GitHub account
2. Lovable installs its GitHub App on selected repos
3. The App has read/write access to code and PRs
4. No manual tokens needed — managed by Lovable

---

### 11.9 Antigravity MCP Auth Config

These MCP servers are auto-configured in Antigravity IDE:

| MCP Server            | Auth Source                     | How It's Set Up                                                       |
| --------------------- | ------------------------------- | --------------------------------------------------------------------- |
| `firebase-mcp-server` | Firebase CLI token + ADC        | `firebase login` stores token in `~/.config/firebase/`                |
| `cloudrun`            | Application Default Credentials | `gcloud auth application-default login` → `~/.config/gcloud/adc.json` |
| `sequential-thinking` | None                            | Local process, no network access                                      |

All MCP servers inherit authentication from the CLI tools. No additional configuration files are needed.

---

### 11.10 Live URLs Summary

| What                  | URL                                                                    |
| --------------------- | ---------------------------------------------------------------------- |
| **Admin Dashboard**   | https://studio-790024798-53451.web.app                                 |
| **User Search**       | https://studio-790024798-53451.web.app/search                          |
| **API Gateway**       | https://api-gateway-nrlzg5ezsa-uc.a.run.app                            |
| **LAKF API**          | https://lakf-api-nrlzg5ezsa-uc.a.run.app                               |
| **Ingestion Service** | https://ingestion-service-nrlzg5ezsa-uc.a.run.app                      |
| **Email API**         | https://email-to-cloud-api-nrlzg5ezsa-uc.a.run.app                     |
| **GitHub Repo**       | https://github.com/YuryZZZ/email_to_cloud                              |
| **Firebase Console**  | https://console.firebase.google.com/project/studio-790024798-53451     |
| **GCP Console**       | https://console.cloud.google.com/home/dashboard?project=legalai-480809 |
| **Lovable**           | https://lovable.dev                                                    |

---

### 11.11 Design System

```
Background:     #0f172a (slate-900)
Card BG:        rgba(255, 255, 255, 0.03)
Card Border:    rgba(255, 255, 255, 0.06)
Primary:        #6366f1 (indigo-500)
Accent:         #a855f7 (purple-500)
Success:        #34d399 (emerald-400)
Error:          #f87171 (red-400)
Warning:        #fbbf24 (amber-400)
Text Primary:   #ffffff
Text Secondary: #94a3b8 (slate-400)
Font:           Inter, system-ui
```
