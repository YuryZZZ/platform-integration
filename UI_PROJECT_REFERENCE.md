# LAKF Admin UI — Complete Project Reference

# Lovable → GitHub → Firebase → Antigravity → Cloud Run

> **Purpose**: Single-source documentation for every aspect of the LAKF web UI —
> design workflow, code architecture, authentication, tasks, deployments, and testing.
>
> **Version**: 5.4.0 | **Last Updated**: 2026-02-28
> **Live URL**: https://studio-790024798-53451.web.app
> **Repo**: https://github.com/YuryZZZ/email_to_cloud (branch: `master`)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Design Workflow (Lovable → Antigravity)](#3-design-workflow)
4. [File Structure](#4-file-structure)
5. [Code Architecture (page.tsx)](#5-code-architecture)
6. [Search Page Architecture](#6-search-page-architecture)
7. [404 Page](#7-404-page)
8. [Styling System](#8-styling-system)
9. [Backend API Integration](#9-backend-api-integration)
10. [Authentication Flow](#10-authentication-flow)
11. [Build & Deploy Pipeline](#11-build--deploy-pipeline)
12. [E2E Testing (Parallel Playwright)](#12-e2e-testing)
13. [Auto-Sync (GitHub → Local)](#13-auto-sync)
14. [Task Tracking](#14-task-tracking)
15. [Deployment History](#15-deployment-history)
16. [Configuration Reference](#16-configuration-reference)
17. [Troubleshooting](#17-troubleshooting)

---

## 1. Project Overview

**LAKF** (Legal AI Knowledge Framework) is a multi-agent, BigQuery-backed intelligence platform for legal and construction forensics. The web UI provides:

- **Admin Dashboard** (`/`) — 8-tab control panel for platform operations
- **User Search** (`/search`) — Hybrid RRF + GraphRAG search interface
- **404 Page** — Branded error page with navigation

### What It Does

| Feature              | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| **Data Ingestion**   | Upload and ingest emails, documents, call records into BigQuery                      |
| **AI Pipeline**      | 7-stage processing pipeline (parse → embed → tag → stitch → relate → index → verify) |
| **Hybrid Search**    | RRF(d) = Σ(1/(60+rank_i)) combining keyword + semantic vectors                       |
| **GraphRAG**         | 2-hop knowledge graph traversal across entities, people, obligations                 |
| **Evidence Builder** | Assemble court-ready evidence bundles from search results                            |
| **Task Tracking**    | AI-extracted obligations and deadlines with status tracking                          |
| **Activity Monitor** | Real-time monitoring of all platform events                                          |
| **Settings**         | Platform configuration, Cloud Run service health checks                              |

### Key Numbers

| Metric            | Value                                               |
| ----------------- | --------------------------------------------------- |
| GCP Project       | `legalai-480809`                                    |
| Firebase Project  | `studio-790024798-53451`                            |
| BigQuery Dataset  | `construction_ai`                                   |
| Region            | `us-central1`                                       |
| Total BQ rows     | ~332,000+                                           |
| Supported formats | Email (.eml/.msg), WhatsApp, Call records, PDF, CAD |

---

## 2. Tech Stack

| Layer         | Technology                             | Version  |
| ------------- | -------------------------------------- | -------- |
| **Framework** | Next.js (App Router, static export)    | 16.1.6   |
| **React**     | React                                  | 19.2.3   |
| **Styling**   | Tailwind CSS                           | 4.x      |
| **Language**  | TypeScript                             | 5.x      |
| **Fonts**     | Geist Sans + Geist Mono (Google Fonts) | Latest   |
| **Hosting**   | Firebase Hosting                       | N/A      |
| **Build**     | Turbopack (via Next.js)                | Built-in |
| **Testing**   | Playwright (parallel, 6 workers)       | Latest   |
| **Backend**   | Cloud Run (Python/FastAPI)             | N/A      |
| **Database**  | BigQuery                               | N/A      |
| **AI**        | Gemini 3.1 Pro via AI Platform         | N/A      |

### Why Static Export?

```typescript
// web/next.config.ts
const nextConfig: NextConfig = {
  output: "export", // Generates static HTML/CSS/JS in web/out/
};
```

Firebase Hosting serves static files only — no SSR. All API calls happen client-side to Cloud Run.

---

## 3. Design Workflow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   LOVABLE    │     │   GITHUB     │     │ ANTIGRAVITY  │     │  FIREBASE    │
│  Visual UI   │────▶│  Repository  │────▶│  AI Coding   │────▶│  Hosting     │
│  Designer    │ PR  │  (master)    │ dev │  Agent       │ CD  │  (live)      │
└──────────────┘     └──────┬───────┘     └──────────────┘     └──────────────┘
                            │
                     ┌──────┴───────┐
                     │  auto-sync   │
                     │  (30s poll)  │
                     └──────────────┘
```

### Step-by-Step Flow

1. **Lovable** — Design UI visually at lovable.dev
   - Lovable generates React/TypeScript code
   - Pushes changes to GitHub as a PR (via GitHub App OAuth)
   - No manual tokens needed — managed by Lovable

2. **GitHub** — Source of truth
   - PR arrives from Lovable (or direct push)
   - Auto-sync script (`scripts/auto-sync.ps1`) pulls changes every 30s
   - Code reviewed by Antigravity or developer

3. **Antigravity** — AI coding agent
   - Reads code via MCP servers (GitHub, Firebase, Cloud Run)
   - Implements features, fixes bugs, adds tests
   - Builds: `cd web && npm run build`
   - Deploys: `npx firebase-tools deploy --only hosting`

4. **Firebase Hosting** — Serves static site
   - Reads `web/out/` directory
   - Global CDN, HTTPS, custom domain support
   - Deployed via `firebase deploy --only hosting`

### Auth Required at Each Step

| Step                   | Auth                            | How                                                        |
| ---------------------- | ------------------------------- | ---------------------------------------------------------- |
| Lovable → GitHub       | GitHub OAuth App                | Managed by Lovable                                         |
| GitHub → Local         | HTTPS credential manager or SSH | `git config --global credential.helper manager`            |
| Antigravity → GitHub   | Fine-grained PAT                | In MCP config env var                                      |
| Antigravity → Firebase | ADC + Firebase CLI              | `gcloud auth application-default login` + `firebase login` |
| Firebase deploy        | Firebase CLI token              | `firebase login` (browser OAuth)                           |
| Auto-sync              | Git credential helper           | Same as GitHub → Local                                     |

---

## 4. File Structure

```
web/
├── app/
│   ├── globals.css              # Tailwind imports, animations, scrollbar
│   ├── layout.tsx               # Root layout (fonts, SEO metadata)
│   ├── page.tsx                 # Admin dashboard (1164 lines, 8 tabs)
│   ├── not-found.tsx            # 404 page (animated gradient)
│   ├── favicon.ico              # Site icon
│   └── search/
│       ├── layout.tsx           # Search page SEO metadata
│       └── page.tsx             # User search (Hybrid + GraphRAG, 420 lines)
├── next.config.ts               # Static export config
├── package.json                 # Dependencies (Next.js 16, React 19, Tailwind 4)
├── tsconfig.json                # TypeScript config
└── out/                         # Build output (deployed to Firebase)

ui/
├── validate-parallel.js         # Parallel Playwright validator (6 workers)
├── validate.js                  # Legacy sequential validator
├── screenshots/                 # Playwright screenshots
│   ├── home.png                 # Admin dashboard screenshot
│   ├── search.png               # Search page screenshot
│   ├── settings.png             # Settings tab screenshot
│   └── validation_report.json   # Test results
└── package.json                 # Playwright dependency

firebase.json                    # Hosting config → serves web/out/
.firebaserc                      # Project alias: studio-790024798-53451
```

---

## 5. Code Architecture (page.tsx — Admin Dashboard)

### Component Map

| Component            | Lines     | Description                                          |
| -------------------- | --------- | ---------------------------------------------------- |
| **Config/Constants** | 1–16      | VERSION, API URL, GCP project, service URLs          |
| **Tab type**         | 17–25     | Union type for 8 tabs                                |
| **TABS array**       | 26–35     | Tab definitions with emoji labels                    |
| **Source types**     | 36–59     | Email, WhatsApp, Call, SMS, Physical Mail, CAD       |
| **BQ tables**        | 60–114    | BigQuery table metadata for overview                 |
| **Stage type**       | 115–122   | Pipeline stage interface                             |
| **Badge()**          | 124–142   | Status badge component (Active/Ready/Planned/etc.)   |
| **Overview()**       | 144–244   | Mode A/B cards, Knowledge Graph layers, BQ table     |
| **Ingestion()**      | 246–374   | File upload form, source type list, ingest log       |
| **Pipeline()**       | 376–494   | 7-stage pipeline with run/status controls            |
| **Search()**         | 496–623   | Inline hybrid/graph search with mock fallback        |
| **Evidence()**       | 625–679   | Evidence spine viewer, court-bundle builder          |
| **Tasks()**          | 681–733   | AI-extracted obligations with status badges          |
| **Activity()**       | 735–873   | Real-time event monitor with polling                 |
| **Settings()**       | 875–1051  | Cloud Run health checks, config viewer               |
| **Home()**           | 1053–1164 | Root component: header, nav bar, tab content, footer |

### Data Flow

```
User clicks tab
  → switchTab(newTab)
  → setTransitioning(true)     // fade-out (150ms)
  → setTimeout → setTab(newTab) + setTransitioning(false)  // fade-in
  → content[tab] renders       // React component for that tab

User searches (Search tab)
  → go() → fetch(API + endpoint)
  → On success: setR(JSON)
  → On failure: setR(mock data)     // Graceful fallback
```

### API Endpoints Called

| Tab       | Endpoint                      | Method                   |
| --------- | ----------------------------- | ------------------------ |
| Ingestion | `POST /api/v1/ingest`         | Upload files to pipeline |
| Pipeline  | `POST /api/v1/pipeline/run`   | Trigger pipeline stage   |
| Pipeline  | `GET /api/v1/pipeline/status` | Poll stage status        |
| Search    | `POST /api/v1/search/hybrid`  | Hybrid RRF search        |
| Search    | `POST /api/v1/graph/query`    | GraphRAG 2-hop           |
| Activity  | `GET /api/v1/events`          | Poll recent events       |
| Settings  | `GET /health` (each service)  | Health check             |

### Mock Data Strategy

Every API call wraps in try/catch. On failure, it renders **mock data** so the UI is always functional even when backends are cold:

```typescript
try {
  const res = await fetch(`${API}/api/v1/search/hybrid`, { ... });
  setResults(await res.json());
} catch {
  // Graceful fallback to mock data
  setResults(MOCK_HYBRID.results);
}
```

---

## 6. Search Page Architecture

**File**: `web/app/search/page.tsx` (420 lines)

### Features

| Feature                    | How                                                                |
| -------------------------- | ------------------------------------------------------------------ |
| **Mode toggle**            | Hybrid Search (RRF) / GraphRAG (2-Hop) buttons                     |
| **Score visualization**    | Color-coded score bars (green ≥90, blue ≥80, amber ≥70)            |
| **Expandable results**     | Click card → detail panel (search type, relevance, tenant, matter) |
| **Loading skeleton**       | Pulsing placeholder cards while searching                          |
| **Stagger animation**      | Results fade-slide-up with 80ms delay between cards                |
| **Keyboard shortcut**      | `⌘K` / `Ctrl+K` focuses search input                               |
| **Suggestion chips**       | Clickable queries in empty state                                   |
| **Sticky header**          | Header stays visible while scrolling results                       |
| **Latency display**        | Shows API response time in ms                                      |
| **GraphRAG visualization** | Entity cards + relationship path cards                             |
| **Admin nav**              | Link back to admin dashboard in header + footer                    |
| **Tenant/Matter**          | Editable tenant and matter ID fields                               |
| **API status**             | "● API Live" or "● Mock Data" indicator                            |

### Entity Color Mapping (GraphRAG)

| Entity Type | Color           | Icon |
| ----------- | --------------- | ---- |
| email       | Blue gradient   | 📧   |
| person      | Purple gradient | 👤   |
| obligation  | Amber gradient  | ⚖️   |
| document    | Default (slate) | 📄   |

---

## 7. 404 Page

**File**: `web/app/not-found.tsx`

- Animated gradient "404" text with blur glow
- "Page Not Found" message
- Two navigation cards: Admin Dashboard + Search & Analysis
- Consistent dark slate/indigo theme

---

## 8. Styling System

### Theme

| Property       | Value                                                        |
| -------------- | ------------------------------------------------------------ |
| Background     | `from-slate-950 via-slate-900 to-indigo-950` (gradient)      |
| Accent         | Indigo-500 / Purple-600 (gradient)                           |
| Success        | Emerald-400                                                  |
| Warning        | Amber-400                                                    |
| Error          | Red-400                                                      |
| Text primary   | White                                                        |
| Text secondary | Slate-400                                                    |
| Text muted     | Slate-500/600                                                |
| Cards          | `bg-white/[0.03] border border-white/[0.06]` (glassmorphism) |
| Hover          | `hover:bg-white/[0.05] hover:border-indigo-500/20`           |

### Animations (globals.css)

```css
/* Tab indicator slide-in */
@keyframes slideIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

/* Result card stagger */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Fonts

- **Geist Sans** — UI text (via `next/font/google`)
- **Geist Mono** — Code, IDs, timestamps

---

## 9. Backend API Integration

### Service URLs

| Service     | URL                                                  | Purpose                   |
| ----------- | ---------------------------------------------------- | ------------------------- |
| API Gateway | `https://api-gateway-nrlzg5ezsa-uc.a.run.app`        | Unified entry point       |
| LAKF API    | `https://lakf-api-nrlzg5ezsa-uc.a.run.app`           | Core platform API         |
| Ingestion   | `https://ingestion-service-nrlzg5ezsa-uc.a.run.app`  | File upload + parsing     |
| Email API   | `https://email-to-cloud-api-nrlzg5ezsa-uc.a.run.app` | Email-specific operations |

### CORS

All Cloud Run services set:

```python
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
```

### Cold Start Handling

Cloud Run instances scale to zero. First request may take 5-10s. The UI handles this by:

1. Showing a loading spinner
2. Using `AbortSignal.timeout(8000)` — 8 second timeout
3. Falling back to mock data on timeout

---

## 10. Authentication Flow

### Full Token Chain

```
Google Account
  ├── gcloud auth login → GCP ADC
  │     └── Cloud Run deploy, BigQuery, Storage
  │     └── cloudrun MCP server
  │     └── firebase MCP server
  │
  ├── firebase login → Firebase CLI token
  │     └── firebase deploy --only hosting
  │     └── firebase MCP server
  │
  ├── GitHub credential manager → git push/pull
  │
  └── GitHub PAT (fine-grained) → github MCP server
        └── Contents: R/W
        └── Issues: R/W
        └── Pull Requests: R/W
        └── Actions: R/W
```

### MCP Config (Antigravity)

```json
{
  "github": {
    "command": "C:\\Users\\yuryz\\.gemini\\antigravity\\mcp_servers\\github-mcp-server\\github-mcp-server.exe",
    "args": ["stdio"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "github_pat_..."
    }
  }
}
```

### Firebase Hosting Config

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

> Full auth details: See [AUTH_FLOW.md](./AUTH_FLOW.md)

---

## 11. Build & Deploy Pipeline

### Build

```powershell
cd web && npm run build
# Generates web/out/ (static HTML/CSS/JS)
# Uses Turbopack, ~5 seconds
# Routes: /, /search, /_not-found
```

### Deploy

```powershell
cd .. && npx firebase-tools deploy --only hosting --project studio-790024798-53451
# Uploads web/out/ contents to Firebase CDN
# Takes ~10-15 seconds
```

### Workflow Shortcut

```
/deploy-changed
```

Antigravity workflow: build → deploy → verify → log → commit → push.

---

## 12. E2E Testing

### Parallel Playwright Validator

```powershell
cd ui && node validate-parallel.js --url https://studio-790024798-53451.web.app --workers 6
```

**Output**: `ui/screenshots/*.png` + `ui/screenshots/validation_report.json`

### Test Pages Defined

| Page     | Path        | Checks                                                                                     |
| -------- | ----------- | ------------------------------------------------------------------------------------------ |
| Home     | `/`         | Title contains "LAKF", `data-testid="tab-overview"` visible, no errors, screenshot         |
| Search   | `/search`   | Title contains "Search", `data-testid="user-search-submit"` visible, no errors, screenshot |
| Settings | `/settings` | HTTP 404 check (expected — settings is a tab, not a route)                                 |

### Available Checks

| Check Type         | What It Does                       |
| ------------------ | ---------------------------------- |
| `title-contains`   | Page title includes specified text |
| `selector-visible` | CSS selector is visible on page    |
| `selector-text`    | Element contains specified text    |
| `no-error`         | No console errors                  |
| `screenshot`       | Captures full-page screenshot      |
| `api-health`       | Checks API health endpoint         |

---

## 13. Auto-Sync

**Script**: `scripts/auto-sync.ps1`

```powershell
# One-time sync
powershell -File scripts/auto-sync.ps1 -Once

# Background daemon (30s poll)
Start-Process powershell -ArgumentList "-File scripts/auto-sync.ps1" -WindowStyle Hidden

# Custom interval
powershell -File scripts/auto-sync.ps1 -Interval 15
```

### What It Does

1. `git fetch origin` every N seconds
2. Stashes local changes if dirty
3. `git pull --ff-only` (fast-forward)
4. Falls back to `git pull --rebase` if non-FF
5. Restores stash after pull

Also available as `/github-sync` workflow in Antigravity.

---

## 14. Task Tracking

### Active UI Tasks

| Task     | Status         | Description                                               |
| -------- | -------------- | --------------------------------------------------------- |
| TASK-002 | 🟡 IN PROGRESS | Lovable UI Design Iteration — ongoing visual polish       |
| TASK-006 | 🟡 IN PROGRESS | GraphRAG Visualization — interactive graph viewer         |
| TASK-007 | 🔴 NOT STARTED | Court Bundle PDF Generation — export evidence to PDF      |
| TASK-008 | ✅ DONE        | MCP Integration + Tooling (auto-sync, parallel validator) |

### UI Improvement History

| Date       | Change                                                  |
| ---------- | ------------------------------------------------------- |
| 2026-02-27 | Initial admin dashboard (8 tabs, 1125 lines)            |
| 2026-02-27 | User search page (/search) with Hybrid + GraphRAG       |
| 2026-02-28 | Version fix (v5.0 → v5.4), cross-navigation links       |
| 2026-02-28 | Tab transition animations (150ms fade+slide)            |
| 2026-02-28 | Search: score bars, loading skeletons, ⌘K shortcut      |
| 2026-02-28 | Search: expandable results, suggestion chips            |
| 2026-02-28 | Search: staggered animations, latency display           |
| 2026-02-28 | GraphRAG: relationship paths, 6 entities, status colors |
| 2026-02-28 | 404 page with animated gradient                         |
| 2026-02-28 | Custom dark scrollbar, global animations CSS            |

---

## 15. Deployment History

| Deploy  | Date           | Commit     | What                                                    |
| ------- | -------------- | ---------- | ------------------------------------------------------- |
| #1      | 2026-02-26     | `8ee4e037` | Initial Next.js dashboard for App Hosting               |
| #2      | 2026-02-27     | `various`  | 8-tab admin UI, BigQuery tables, Pipeline               |
| #3      | 2026-02-27     | `various`  | User search page, mock fallback                         |
| #4      | 2026-02-28     | `various`  | Search page routing fix                                 |
| **#5**  | **2026-02-28** | `c4266bf2` | **UI v5.4: animations, score bars, 404, cross-nav, ⌘K** |
| Push #5 | 2026-02-28     | `ea9fa0e5` | AUTH_FLOW complete documentation                        |

---

## 16. Configuration Reference

### Environment Variables

| Variable                         | Where                   | Purpose                  |
| -------------------------------- | ----------------------- | ------------------------ |
| `NEXT_PUBLIC_API_URL`            | `web/.env.local`        | Override API gateway URL |
| `GOOGLE_APPLICATION_CREDENTIALS` | System env / MCP config | Path to ADC JSON         |
| `GITHUB_PERSONAL_ACCESS_TOKEN`   | MCP config env          | GitHub API auth          |

### Firebase Config

| File            | Purpose                                 |
| --------------- | --------------------------------------- |
| `firebase.json` | Hosting config — serves `web/out/`      |
| `.firebaserc`   | Project alias: `studio-790024798-53451` |

### Next.js Config

| File                 | Key Setting                 |
| -------------------- | --------------------------- |
| `web/next.config.ts` | `output: "export"` (static) |
| `web/tsconfig.json`  | TypeScript strict mode      |

### Key Commands

```powershell
# Dev server (local)
cd web && npm run dev

# Production build
cd web && npm run build

# Deploy
npx firebase-tools deploy --only hosting --project studio-790024798-53451

# Validate (parallel)
cd ui && node validate-parallel.js --url https://studio-790024798-53451.web.app

# Auto-sync
powershell -File scripts/auto-sync.ps1 -Once
```

---

## 17. Troubleshooting

| Problem                           | Cause                           | Fix                                              |
| --------------------------------- | ------------------------------- | ------------------------------------------------ |
| Build fails: "Module not found"   | Missing dependency              | `cd web && npm install`                          |
| Deploy fails: "Not authenticated" | Firebase token expired          | `firebase login`                                 |
| API returns mock data             | Cloud Run cold start / API down | Wait 10s or check Cloud Run logs                 |
| Search results are stale          | BigQuery cache                  | Clear cache or wait 5 min                        |
| CSS changes don't appear          | Tailwind purge or build cache   | Delete `web/.next/` → rebuild                    |
| 404 on `/search`                  | Missing `search/page.tsx`       | Verify file exists in `web/app/search/`          |
| Fonts not loading                 | Geist not imported in layout    | Check `layout.tsx` imports                       |
| Tab animations choppy             | Too many re-renders             | Transition uses 150ms with requestAnimationFrame |
| `globals.css` reverted            | Auto-sync or conflicting push   | Re-apply animations, commit+push                 |
| Tests fail on `/settings`         | Settings is a tab, not a route  | Expected — validator shows "HTTP 404" warning    |
