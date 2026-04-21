# Platform Integration — Master Index
# The Global Project Template

> **This folder is the reusable template.**
> Start new projects from the repo root with `start.bat`, then continue inside the generated project with `init.ps1`.
>
> Stack: **Nexus UI → Google AI Studio (Gemini) → Jules → Firebase → Antigravity**

---

## Top-Level Structure

```text
platform-integration/
├── INDEX.md
├── start.bat                         # Windows bootstrapper from the template repo root
├── README.md                         # Full platform overview
├── PROMPT_TO_PORTAL.md               # Idea → live URL workflow
├── QUICK_START.md                    # Fastest setup path
├── NEW_PROJECT_GUIDE.md              # Detailed setup walkthrough
├── AUTH_FLOW.md                      # Credentials and auth model
├── JULES_INTEGRATION.md              # Async cloud agent guide
├── STITCH_DESIGN.md                  # Google Stitch integration
├── VERCEL_DEPLOYMENT.md              # Alternative deploy target
├── configs/                          # Reference configs only
├── scripts/                          # Utility scripts
├── workflows/                        # Reusable Antigravity workflows
└── starter-kit/                      # Project skeleton copied into each new app
```

---

## Start A New Project

### Path A — Template bootstrap

```powershell
cd C:\path\to\platform-integration
.\start.bat
```

What this does:

1. copies `starter-kit/` into a new project folder
2. copies reusable docs into `reference/`
3. prepares `.env.local` placeholders
4. personalizes project docs with the chosen name

### Path B — Inside the generated project

```powershell
cd C:\path\to\your-new-project
.\init.ps1
```

---

## Portable Framework Rules

A file is portable only if it follows these rules:

- no committed private keys or live tokens
- no real local usernames unless clearly marked as placeholders
- no instructions that depend on one machine-specific folder layout
- no bootstrap step should point to a file that is not actually created
- all MCP examples must use `YOUR_*` placeholders for local replacement

Use `configs/mcp_config.json.reference` as a local template, not as a committed live config.

---

## What To Read When

| Need | Document |
| ---- | -------- |
| Bootstrap a new project | `QUICK_START.md` |
| Full setup walkthrough | `NEW_PROJECT_GUIDE.md` |
| Full platform architecture | `README.md` |
| Auth and credentials | `AUTH_FLOW.md` |
| Jules setup and delegation | `JULES_INTEGRATION.md` |
| Stitch design workflow | `STITCH_DESIGN.md` |
| Alternative Vercel deploys | `VERCEL_DEPLOYMENT.md` |
| Generated project next steps | `starter-kit/README.md` |

---

## Per-Project Files To Edit First

| File | Change |
| ---- | ------ |
| `docs/PROJECT_SPEC.md` | purpose, identifiers, production URLs |
| `docs/DESIGN.md` | brand colors, typography, design rules |
| `.env.local` | local secrets and environment variables |
| `web/.env.local` | frontend public config |
| `reference/configs/mcp_config.json.reference` | copy locally and replace placeholders |

Everything else should stay framework-level unless the file explicitly exposes placeholders.

---

## Current Bootstrap Contract

The expected happy path is now:

1. run `start.bat` from this repository
2. open the generated project
3. read `README.md` in the generated project
4. run `init.ps1`
5. use `reference/INDEX.md` and `reference/configs/mcp_config.json.reference` for machine-local setup
