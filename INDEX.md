# Platform Integration — Master Index

# Lovable → GitHub → Firebase → Antigravity → Cloud Run → Stitch → Jules → Vercel

> **This is the single folder containing EVERYTHING about the full multi-platform
> development workflow.** Every document, script, config, workflow, and starter template
> lives here or is referenced from here.

---

## 📂 Folder Contents

```
platform-integration/
│
├── INDEX.md                        ← YOU ARE HERE
│
│── ──── DOCUMENTATION ──── ────
├── README.md                       Platform overview (35 KB)
├── NEW_PROJECT_GUIDE.md            Full A-to-Z project setup (40 KB, 10 phases)
├── AUTH_FLOW.md                    Every credential & token (28 KB, 11 sections)
├── UI_PROJECT_REFERENCE.md         Complete UI project ref (27 KB, 17 sections)
├── QUICK_START.md                  5-minute quick start (4 KB)
├── JULES_INTEGRATION.md            Async cloud agent guide (NEW — CLI + REST API)
├── VERCEL_DEPLOYMENT.md            Alternative edge deployment (NEW — staging, SPA routing)
├── STITCH_DESIGN.md                Google Stitch UI design platform (NEW — MCP + skills)
├── review.txt                      Architectural vision document (29 KB)
│
│── ──── SCRIPTS ──── ────
├── scripts/
│   ├── auto-sync.ps1               GitHub→Local auto-sync daemon (30s poll)
│   └── sync_lovable.ps1            Lovable→repo sync bridge (parameterized)
│
│── ──── WORKFLOWS ──── ────
├── workflows/
│   ├── lovable-sync.md             Antigravity workflow: Lovable→GitHub→deploy
│   └── github-sync.md              Antigravity workflow: pull + stash + restore
│
│── ──── CONFIGS ──── ────
├── configs/
│   ├── firebase.json.reference     Firebase Hosting reference config
│   ├── firebaserc.reference        Firebase project alias reference
│   └── mcp_config.json.reference   MCP servers reference config (10 servers)
│
│── ──── STARTER KIT ──── ────
└── starter-kit/                    Copy-and-go project template
    ├── README.md                   Starter kit usage guide
    ├── init.ps1                    One-click project initializer
    ├── firebase.json               Template Firebase config
    ├── .firebaserc                  Template project alias
    ├── .gitignore                   Git ignore template
    ├── .agents/workflows/           Template Antigravity workflows
    ├── .github/workflows/           Template CI/CD (auto_sync.yml)
    ├── docs/                        Template docs (CURRENT_STATUS, PROJECT_SPEC, DESIGN, deployments)
    ├── functions/api-gateway/       Template Cloud Run service (FastAPI + deploy.ps1)
    ├── scripts/auto-sync.ps1        Template auto-sync script
    ├── specs/TASK.md                Template task tracker
    ├── ui/validate-parallel.js      Template E2E validator
    └── web/                         Template Next.js app shell
```

---

## 📖 Document Guide — What to Read When

### Starting a Brand-New Project

| Step | Document                                         | What You'll Learn                                     |
| ---- | ------------------------------------------------ | ----------------------------------------------------- |
| 1    | [QUICK_START.md](./QUICK_START.md)               | 5-minute overview of the full stack                   |
| 2    | [NEW_PROJECT_GUIDE.md](./NEW_PROJECT_GUIDE.md)   | Phase-by-phase setup (10 phases, every command)       |
| 3    | [starter-kit/README.md](./starter-kit/README.md) | Copy the starter kit, run `init.ps1`, deploy in 5 min |

### Understanding Authentication

| Need                   | Document                       | Section         |
| ---------------------- | ------------------------------ | --------------- |
| Full auth overview     | [AUTH_FLOW.md](./AUTH_FLOW.md) | All 11 sections |
| GCP / Firebase auth    | [AUTH_FLOW.md](./AUTH_FLOW.md) | Sections 1 & 2  |
| GitHub PAT setup       | [AUTH_FLOW.md](./AUTH_FLOW.md) | Section 3.3     |
| Lovable OAuth          | [AUTH_FLOW.md](./AUTH_FLOW.md) | Section 4       |
| MCP server auth        | [AUTH_FLOW.md](./AUTH_FLOW.md) | Section 5       |
| Token renewal schedule | [AUTH_FLOW.md](./AUTH_FLOW.md) | Section 10      |
| Troubleshooting auth   | [AUTH_FLOW.md](./AUTH_FLOW.md) | Section 11      |

### Working on the UI

| Need              | Document                                             | Section        |
| ----------------- | ---------------------------------------------------- | -------------- |
| Code architecture | [UI_PROJECT_REFERENCE.md](./UI_PROJECT_REFERENCE.md) | Sections 5 & 6 |
| Styling / theme   | [UI_PROJECT_REFERENCE.md](./UI_PROJECT_REFERENCE.md) | Section 8      |
| Backend APIs      | [UI_PROJECT_REFERENCE.md](./UI_PROJECT_REFERENCE.md) | Section 9      |
| Build & deploy    | [UI_PROJECT_REFERENCE.md](./UI_PROJECT_REFERENCE.md) | Section 11     |
| E2E testing       | [UI_PROJECT_REFERENCE.md](./UI_PROJECT_REFERENCE.md) | Section 12     |
| Troubleshooting   | [UI_PROJECT_REFERENCE.md](./UI_PROJECT_REFERENCE.md) | Section 17     |

### Design Workflow (Lovable ↔ Antigravity ↔ Stitch)

| Need                                | Document / File                                          |
| ----------------------------------- | -------------------------------------------------------- |
| How the full flow works             | [README.md](./README.md)                                 |
| Google Stitch UI design + MCP       | [STITCH_DESIGN.md](./STITCH_DESIGN.md)                   |
| DESIGN.md template                  | [starter-kit/docs/DESIGN.md](./starter-kit/docs/DESIGN.md) |
| Lovable → repo sync script          | [scripts/sync_lovable.ps1](./scripts/sync_lovable.ps1)   |
| GitHub → local auto-sync            | [scripts/auto-sync.ps1](./scripts/auto-sync.ps1)         |
| Lovable sync workflow (Antigravity) | [workflows/lovable-sync.md](./workflows/lovable-sync.md) |
| GitHub sync workflow (Antigravity)  | [workflows/github-sync.md](./workflows/github-sync.md)   |

### Async Cloud Agent (Jules)

| Need                      | Document                                               |
| ------------------------- | ------------------------------------------------------ |
| What is Jules?            | [JULES_INTEGRATION.md](./JULES_INTEGRATION.md)         |
| CLI installation & usage  | [JULES_INTEGRATION.md](./JULES_INTEGRATION.md) §2-3    |
| REST API (v1alpha)        | [JULES_INTEGRATION.md](./JULES_INTEGRATION.md) §4      |
| Session state machine     | [JULES_INTEGRATION.md](./JULES_INTEGRATION.md) §5      |
| Advanced workflows        | [JULES_INTEGRATION.md](./JULES_INTEGRATION.md) §6      |

### Deployment (Firebase + Vercel)

| Need                      | Document                                               |
| ------------------------- | ------------------------------------------------------ |
| Firebase Hosting deploy   | [README.md](./README.md) §9                            |
| Vercel alternative        | [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)         |
| Staging branch strategy   | [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) §6      |
| SPA routing (vercel.json) | [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) §5      |
| OAuth redirect setup      | [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) §7      |

### Configuration Reference

| Config                 | File                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| Firebase Hosting       | [configs/firebase.json.reference](./configs/firebase.json.reference)     |
| Firebase project alias | [configs/firebaserc.reference](./configs/firebaserc.reference)           |
| MCP servers (all)      | [configs/mcp_config.json.reference](./configs/mcp_config.json.reference) |

---

## 🔗 Cross-References

These files live elsewhere in the repo but are documented here:

| File                         | Location                   | Purpose                       |
| ---------------------------- | -------------------------- | ----------------------------- |
| Admin Dashboard              | `web/app/page.tsx`         | Main UI (1164 lines, 8 tabs)  |
| Search Page                  | `web/app/search/page.tsx`  | Hybrid + GraphRAG search      |
| 404 Page                     | `web/app/not-found.tsx`    | Branded error page            |
| Global CSS                   | `web/app/globals.css`      | Animations, scrollbar, theme  |
| Layout                       | `web/app/layout.tsx`       | Root layout, fonts, SEO       |
| Playwright validator         | `ui/validate-parallel.js`  | 6-worker parallel E2E tests   |
| Auto-sync (live)             | `scripts/auto-sync.ps1`    | Background GitHub sync daemon |
| Lovable sync (live)          | `scripts/sync_lovable.ps1` | Lovable → repo bridge         |
| Firebase config (live)       | `firebase.json`            | Active hosting config         |
| MCP config (live)            | `mcp_config.json`          | Active MCP server config      |
| Antigravity workflows (live) | `.agents/workflows/`       | Active IDE workflows          |
| Task tracker                 | `docs/tasks/TASK-001.md`   | Active task list              |
| Deploy log                   | `docs/deployments.md`      | Deployment history            |
| Current status               | `docs/CURRENT_STATUS.md`   | Platform status               |

---

## 📊 Stats

| Metric                 | Value                                                                |
| ---------------------- | -------------------------------------------------------------------- |
| Total documentation    | ~200 KB across 8 docs                                                |
| Starter kit files      | 20 files, copy-and-go                                                |
| Scripts                | 2 PowerShell automation scripts                                      |
| Workflows              | 2 Antigravity workflows                                              |
| Config references      | 3 reference configs (10 MCP servers)                                 |
| Phases in setup guide  | 10 phases, 40+ steps                                                 |
| Auth platforms covered | 6 (GCP, Firebase, GitHub, Lovable, Antigravity, Cloud Run)           |
| Platforms documented   | 9 (+ Jules, Vercel, Google Stitch)                                   |
