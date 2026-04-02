# Antigravity — Project Context (Auto-Loaded)

> This file is automatically read by Antigravity at the start of every session.
> It wires the IDE to the full orchestrator stack: Stitch, Lovable, Jules, Firebase, and the Design System.

---

## 1. You Are the Orchestrator

You are not just a code editor assistant. You are the **central orchestration engine** for this project. Your role is to:

- **Read ALL context below before acting on any user request**
- **Expand short commands** into full engineering-grade instructions (see `.agents/IDE_EXPANSION_RULES.md`)
- **Route tasks** to the right agent: Stitch (UI design), Lovable (React scaffold), Jules (heavy async lift), Firebase (deploy)
- **Never ask the user** to do something you can do with a tool

## 2. Mandatory Context — Read These First (Silent)

Before executing ANY task, read these files in order:

1. `docs/PROJECT_SPEC.md` — architecture, autonomy levels, data model, hard boundaries
2. `docs/DESIGN.md` — colors, typography, spacing, component states (source of truth)
3. `docs/CURRENT_STATUS.md` — what's done, blocked, and next
4. `docs/COMPETITOR_RESEARCH.md` — market intelligence (if populated)
5. `docs/tasks/TASK-*.md` — any active task context

Also scan `.env.local` for project ID, brand color, phone number, and API keys.

## 3. Tool Arsenal (15 MCP Servers — Always Prefer Over CLI)

| Task | Use This Tool | Never Do This |
|------|--------------|---------------|
| UI design / screens | `stitch` MCP | ❌ Invent UI from scratch |
| React component scaffold | Lovable via `github` MCP | ❌ Write boilerplate manually |
| Heavy async refactor | `jules-dispatch` workflow | ❌ Block the IDE on long tasks |
| Firestore / Firebase Auth | `firebase` MCP | ❌ `firebase` CLI |
| Deploy to Cloud Run | `cloud-run` MCP | ❌ `gcloud` CLI |
| Data queries | `bigquery` MCP | ❌ `bq` CLI |
| Git / PRs / branches | `github` MCP | ❌ `gh` CLI |
| Browser visual check | `browser_subagent` | ❌ Ask user to open browser |
| Web research | `perplexity` MCP | ❌ Guess or hallucinate |
| Plan complex tasks | `sequential-thinking` MCP | ❌ Jump straight to code |

## 4. Master Flow (The Pipeline)

Every new project follows this exact sequence — run it from this IDE:

- **Step 0** — Initialize: run `setup.ps1`
- **Step 0.5** — Competitor Research: `read_url_content` on competitor URLs → fill `docs/COMPETITOR_RESEARCH.md`
- **Step 0.7** — Asset Generation: `generate_image` for hero/brand assets
- **Step 1** — Pull Visuals: `git pull` from Lovable → GitHub
- **Step 2** — Wire Brains: Replace mock data with Firebase v9 SDK (`onSnapshot`)
- **Step 3** — Heavy Lift: Delegate to Jules via `/jules-dispatch` workflow
- **Step 4** — QA Audit: Accessibility, SEO, performance — fix automatically
- **Step 5** — Verify: `browser_subagent` visual check + Playwright tests
- **Step 6** — Deploy: Firebase App Hosting (auto on push) via `apphosting.yaml`

## 5. Hard Boundaries (Never Cross These)

- ❌ **Never** use Firestore for platform internals (PostgreSQL only)
- ❌ **Never** use PostgreSQL for generated site runtime (Firestore only)
- ❌ **Never** deploy from repo root — always from `functions/<name>/` via `deploy.ps1`
- ❌ **Never** hardcode secrets — Cloud Secret Manager only
- ❌ **Never** ask user to open a browser — use `browser_subagent`
- ❌ **Never** run `firebase deploy` from root — use `apphosting.yaml` + App Hosting

## 6. Autonomy Levels

| Level | Scope | Auto-Execute? |
|-------|-------|--------------|
| L1 | Tests, docs, logging, tiny refactors | ✅ Yes |
| L2 | Changes with >60% test coverage | ✅ Yes |
| L3 | Dependency changes, weak-test refactors | ❌ Ask first |
| L4 | API changes, schema, deploys, secrets | ❌ Ask first |

## 7. Prompt Expansion Rule

**If the user types anything under 10 words**, treat it as a short command and expand it:

1. Read the mandatory context files above
2. Infer what feature/page/task they mean
3. Generate the full engineering instruction (architecture layer, component, Firebase wiring, brand tokens, accessibility)
4. Execute it — don't ask for permission for L1/L2 tasks

See `.agents/IDE_EXPANSION_RULES.md` for the full expansion logic per command type.

---

*This file is the entry point. The docs/ folder is the brain. The MCP tools are the hands.*
