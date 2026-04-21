# Platform Integration Flow

> Reusable framework for bootstrapping an Antigravity project on any Windows PC.
> The supported path is: `start.bat` from this repo, then `init.ps1` inside the generated project.

---

## Purpose

This repository is the control-plane template for projects that combine:

- Antigravity for implementation and orchestration
- GitHub for source control and PR workflows
- Firebase for hosting, auth, and app data
- Cloud Run for backend services
- Stitch and Lovable for UI generation paths
- Playwright for verification

It is a framework repo, not a live-project credential dump.

---

## Start Here

1. Read `INDEX.md` for the current repo contract.
2. Run `start.bat` from the repository root.
3. Open the generated project folder.
4. Run `init.ps1`.
5. Fill local config only: `.env.local`, `web/.env.local`, and local MCP settings.

See also:

- `PROMPT_TO_PORTAL.md`
- `QUICK_START.md`
- `NEW_PROJECT_GUIDE.md`
- `AUTH_FLOW.md`
- `PORTABLE_FRAMEWORK_TEMPLATE.md`

---

## Architecture Overview

```text
Lovable or Stitch
        -> GitHub
        -> Antigravity
        -> Firebase Hosting / Auth / Firestore
        -> Cloud Run services
        -> Playwright verification
```

### Core rule

Committed framework files must stay portable:

- no live PATs
- no service account keys
- no one-user Windows paths unless marked as placeholders
- no bootstrap steps that point to files that are not created
- no committed docs that assume one personal project id or account

---

## Repository Roles

| Path | Role |
| --- | --- |
| `start.bat` | root Windows bootstrap entry point |
| `starter-kit/` | project skeleton copied into new apps |
| `configs/` | reference config templates with placeholders |
| `scripts/` | utility scripts |
| `workflows/` | reusable Antigravity workflows |
| `INDEX.md` | repo contract and navigation |
| `AUTH_FLOW.md` | portable auth model |
| `NEW_PROJECT_GUIDE.md` | detailed walkthrough |
| `PROMPT_TO_PORTAL.md` | idea-to-live flow |

---

## Bootstrap Contract

`start.bat` is expected to:

1. copy `starter-kit/` into a target project folder
2. copy reusable docs into `reference/`
3. create local env placeholders
4. personalize starter docs with the selected project name

The generated project is expected to contain:

- `init.ps1`
- `README.md`
- `docs/`
- `functions/`
- `web/`
- `ui/`
- `reference/`

---

## Local-Only Values

These belong in local configuration, not the repository:

- `YOUR_USER`
- `YOUR_PROJECT_ID`
- `YOUR_REGION`
- `YOUR_GITHUB_PAT`
- `YOUR_STITCH_API_KEY`
- `YOUR_PERPLEXITY_API_KEY`
- ADC and Firebase login state created on the machine

Use `configs/mcp_config.json.reference` as a placeholder template and copy it into your local MCP environment.

---

## Verification Checklist

The framework is healthy when all of these are true:

- `start.bat` can run from any folder where this repo is cloned
- generated projects include `init.ps1`
- generated projects include `reference/PORTABLE_FRAMEWORK_TEMPLATE.md`
- committed docs no longer depend on one live project or one machine path
- MCP reference files use placeholders only
- a second PC can bootstrap without editing committed framework files first

---

## Related Docs

- `INDEX.md` for the current contract
- `QUICK_START.md` for the shortest path
- `NEW_PROJECT_GUIDE.md` for the longer walkthrough
- `AUTH_FLOW.md` for credentials and token handling
- `JULES_INTEGRATION.md` for async delegation
- `STITCH_DESIGN.md` for Stitch-driven UI work
- `VERCEL_DEPLOYMENT.md` for the alternative deploy target
