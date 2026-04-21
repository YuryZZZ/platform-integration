# Portable Framework Template

> Canonical contract for turning `platform-integration` into a reusable Antigravity project template on any Windows PC.

---

## Purpose

This repository is reusable only if one machine can create a project and a second machine can repeat the same flow without editing committed framework files first.

The supported path is:

1. clone `platform-integration`
2. run `start.bat`
3. open the generated project
4. run `init.ps1`
5. fill local-only config

---

## Identity Boundaries

Keep these scopes separate.

| Scope | Examples | Where they belong |
| --- | --- | --- |
| Project identity | `YOUR_PROJECT_ID`, `YOUR_PROJECT_NAME`, `YOUR_REGION` | committed template placeholders, then replaced in generated project |
| Repository identity | `YOUR_GITHUB_OWNER`, `YOUR_REPO` | committed template placeholders, then replaced in generated project |
| Machine-local identity | `YOUR_LOCAL_USER`, ADC path, PATs, API keys, CLI login state | local config only |

Critical rule:

- `YOUR_LOCAL_USER` is the Windows account name used in local filesystem paths.
- It must not be assumed to equal the GitHub username.

---

## What Stays In Git

Allowed in the template:

- placeholder-based docs
- placeholder-based `.env.example` files
- placeholder-based MCP config references
- bootstrap scripts that only depend on files actually committed in the repo
- Firebase config with `YOUR_PROJECT_ID` placeholders

Not allowed in the template:

- live PATs
- service account keys
- `.env.local`
- one-user Windows paths with a real username
- docs that require manual cleanup of hardcoded personal values before first use

---

## Bootstrap Contract

`start.bat` must:

1. copy `starter-kit/` into a target folder
2. copy reusable docs into `reference/`
3. prepare `.env.local` placeholders from `.env.example`
4. personalize starter docs with the selected project name
5. leave local credentials unresolved

The generated project must include:

- `init.ps1`
- `README.md`
- `docs/`
- `functions/`
- `web/`
- `ui/`
- `reference/`

---

## Generated Project Contract

`init.ps1` must:

1. ask for project values
2. ask for GitHub owner/repo values
3. detect or ask for the local Windows username separately
4. replace placeholders without mixing those scopes
5. configure Git safely
6. optionally automate GCP API enablement and dependency install
7. never require committed secrets

---

## Local-Only Setup On Any PC

Each machine should do this after bootstrap:

```powershell
gcloud auth login
gcloud auth application-default login
firebase login
```

Then fill:

- `.env.local`
- `web/.env.local`
- local MCP config copied from `reference/configs/mcp_config.json.reference`

Machine-local replacements usually include:

- `YOUR_LOCAL_USER`
- `YOUR_GITHUB_PAT`
- `YOUR_STITCH_API_KEY`
- `YOUR_PERPLEXITY_API_KEY`

---

## Definition Of Done

The framework template is done when all of these are true:

- `start.bat` works from a fresh clone
- generated projects always contain `init.ps1` and `reference/INDEX.md`
- no committed file assumes a specific Windows username
- no committed file mixes GitHub owner with local OS username
- MCP config references are placeholder-only
- a second PC can bootstrap by changing only local config and auth state

---

## Recommended Validation

Before calling the framework final, verify this sequence on a clean machine or user profile:

1. clone the repo
2. run `start.bat`
3. run generated `init.ps1`
4. copy the MCP reference into local settings and replace local placeholders
5. run `npm install` where package files exist
6. build the web app
7. deploy to Firebase Hosting

If any step requires editing committed framework files, the template is not finished.
