---
name: orchestrator-loop
description: The master non-stop autonomous loop. Controls the full RESEARCH → TASK → DEVELOP → VALIDATE → DEPLOY cycle. Read this before every session start.
---

# Orchestrator Loop Skill

## Purpose
You are a non-stop integration platform. This skill defines the perpetual loop logic. After any task completes, you immediately start the next one without waiting for the user.

---

## Boot Sequence (Every Session Start)

Run this EVERY time a new conversation starts, silently, before responding:

```
1. read_file: docs/PROJECT_SPEC.md         → load project identity, tool IDs
2. read_file: docs/DESIGN.md               → load brand tokens
3. read_file: docs/CURRENT_STATUS.md       → find current loop phase + active step
4. run_file:  docs/tasks/TASK-*.md (glob)  → count open vs done tasks
5. Determine: what is the next action?
6. Execute it immediately.
```

---

## The Loop (Repeat Forever)

```
┌─────────────────────────────────────────────────────────┐
│  PHASE 1: RESEARCH                                       │
│  Skill: research-intelligence                            │
│  → Scan competitors, best practices, security advisories │
│  → Output: new tasks in docs/tasks/TASK-NNN-*.md         │
├─────────────────────────────────────────────────────────┤
│  PHASE 2: PRIORITIZE                                     │
│  Tool: sequential-thinking MCP                          │
│  → Read all open TASK-*.md files                         │
│  → Rank by: impact × effort⁻¹ × dependency order        │
│  → Pick the top task                                     │
├─────────────────────────────────────────────────────────┤
│  PHASE 3: DEVELOP                                        │
│  Route by task type:                                     │
│  UI screen   → skill: stitch-design                     │
│  React comp  → skill: lovable-scaffold                  │
│  Heavy lift  → skill: jules-dispatch                    │
│  Data wiring → skill: firebase-wire                     │
│  Deploy      → skill: deploy-pipeline                   │
├─────────────────────────────────────────────────────────┤
│  PHASE 4: VALIDATE                                       │
│  Skill: qa-audit                                        │
│  → TypeScript check → visual check → a11y → SEO         │
│  → Update task status to DONE                            │
├─────────────────────────────────────────────────────────┤
│  PHASE 5: DEPLOY                                         │
│  Skill: deploy-pipeline                                 │
│  → git push → verify live URL → update deployments.md   │
└─────────────────────────────────────────────────────────┘
          ↑                                      │
          └──────────── REPEAT ←─────────────────┘
```

---

## State Machine

Update `docs/CURRENT_STATUS.md` after every phase transition:

```markdown
**Current Loop Phase**: PHASE-N — [RESEARCH|PRIORITIZE|DEVELOP|VALIDATE|DEPLOY]
**Current Task**: TASK-NNN — [task title]
**Next Action**: [specific next step]
**Last Completed**: [ISO timestamp]
```

---

## Interruption Rules

| Condition | Action |
|-----------|--------|
| User types "stop" or "pause" | Pause loop, save state, report what was in progress |
| User types "status" or "?" | Report current phase + task without stopping |
| L4 decision required | Pause, ask once clearly, resume on approval |
| `.emergency-stop` file exists at repo root | Full stop, report to user |
| `npm run build` fails | Stop, fix errors, re-run before proceeding |
| Health check non-2xx after deploy | Roll back, create bug task, loop back to DEVELOP |

---

## Task File Format

Every task must follow this structure:

```markdown
# TASK-NNN: [Title]

**Status:** PLAN | IN_PROGRESS | VERIFY | DONE | BLOCKED
**Phase:** [which loop phase owns this]
**Priority:** CRITICAL | HIGH | MEDIUM | LOW
**Created:** [ISO timestamp]
**Skill:** [which skill to use: stitch-design | lovable-scaffold | jules-dispatch | firebase-wire | qa-audit]

## Goal
[What done looks like — specific, measurable]

## Steps
- [ ] Step 1
- [ ] Step 2

## Verification
- [ ] Check 1
- [ ] Check 2

## Done Criteria
[Exact conditions that mark this DONE]
```

---

## Autonomous Decision Rules

| User input | Loop interprets as |
|---|---|
| < 10 words | Expand to full spec using PROJECT_SPEC + DESIGN, execute |
| "continue" | Advance to next loop phase |
| "?" or "status" | Report state, don't stop |
| "build X" | Create TASK → stitch-design → lovable-scaffold → firebase-wire |
| "deploy" | Skip to deploy-pipeline if VALIDATE passed |
| "research" | Force Phase 1 — research-intelligence |
| "delegate" | Force Phase 3 → jules-dispatch |
