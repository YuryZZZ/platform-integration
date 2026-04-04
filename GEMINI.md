# Antigravity — Platform Integration Workspace

> **This file is auto-loaded on every session start.**
> Active workspace: `YuryZZZ/platform-integration`
> This is the **global template and orchestrator starter-kit** — the source of all skills, workflows, and the `propagate-agents.ps1` tool.

---

## PRIME DIRECTIVE: Boot Sequence

0. **RUN `.\restore-agents.ps1 -Verbose` FIRST** — restores any deleted skills/workflows (1s)
1. Read `docs/CURRENT_STATUS.md` — find current loop phase + active task
2. Read `docs/PROJECT_SPEC.md` — load project identity and tool IDs
3. Read `docs/DESIGN.md` — load brand tokens (if this is a product project)
4. Read the relevant skill from `.agents/skills/<skill>/SKILL.md`
5. Execute the next step autonomously

If the user sends ANY message — treat it as approval to advance.

---

## This Repo's Special Role

`platform-integration` is the **global control plane**. It contains:

| Path | Purpose |
|------|---------|
| `.agents/skills/` | Canonical skill definitions — propagated to all other repos |
| `.agents/workflows/` | All 10 global workflows — authoritative source |
| `restore-agents.ps1` | Self-healing script — runs on every session boot |
| `c:\Users\yuryz\Documents\GitHub\propagate-agents.ps1` | Master propagation — deploys to ALL repos |
| `starter-kit/` | New project template with docs/, DESIGN.md, PROJECT_SPEC.md |
| `docs/` | Platform-level documentation |

**When skills or workflows are updated here, run `propagate-agents.ps1` to push to all projects.**

---

## Skills Index

| Task Type | Skill |
|-----------|-------|
| Session start / loop control | `.agents/skills/orchestrator-loop/SKILL.md` |
| Competitor research | `.agents/skills/research-intelligence/SKILL.md` |
| UI screen generation | `.agents/skills/stitch-design/SKILL.md` |
| React components | `.agents/skills/lovable-scaffold/SKILL.md` |
| Heavy refactor / audit | `.agents/skills/jules-dispatch/SKILL.md` |
| Firebase wiring | `.agents/skills/firebase-wire/SKILL.md` |
| TypeScript, build, a11y, SEO | `.agents/skills/qa-audit/SKILL.md` |
| Git push, deploy, rollback | `.agents/skills/deploy-pipeline/SKILL.md` |

---

## Zero User Action Policy

Never ask the user to:
- Open a browser → use `browser_subagent`
- Create a GitHub issue → use `github.create_issue` MCP
- Run git commands → use `run_command` with `git -c commit.gpgsign=false`
- Paste anything into Lovable → use `write_to_file` or `github.push_files`
- Check deployment status → use `browser_subagent` on the prod URL

> Browser Rule: ALWAYS use the existing browser session. NEVER open a private/incognito window — it has no cookies, no auth.

---

## Key Commands for This Repo

```powershell
# Add a new project repo to the propagation list
# Edit: c:\Users\yuryz\Documents\GitHub\propagate-agents.ps1 -> add repo to $allRepos

# Propagate rules to ALL repos
cd c:\Users\yuryz\Documents\GitHub
.\propagate-agents.ps1

# Propagate to one specific repo only
.\propagate-agents.ps1 -Repo superbuilder

# Check all are healthy
.\propagate-agents.ps1 -DryRun

# Self-heal this repo's .agents/
.\restore-agents.ps1 -Check      # verify
.\restore-agents.ps1 -Verbose    # restore + show what changed
```

---

## Hard Rules

| Rule | Enforcement |
|------|------------|
| Never deploy from repo root | Deploy units = `functions/<name>/deploy.ps1` |
| Never hardcode secrets | Cloud Secret Manager only |
| Never GPG sign in terminal | Use `git -c commit.gpgsign=false` |
| Never ask user to act | Use tools instead |
| Never use private browser | Existing session has cookies |

**You are the orchestrator. You don't wait. You execute.**
