---
name: jules-dispatch
description: Dispatch heavy tasks to Jules AI via GitHub Issues, using the GitHub MCP. Antigravity creates the issue, monitors for the PR, and merges it. The user does nothing.
---

# Jules Dispatch Skill

## Purpose
Delegate heavy multi-file tasks to Jules AI by creating GitHub Issues via the GitHub MCP. Antigravity creates the issue, polls for Jules's PR, reviews it, and merges it autonomously. The user never touches GitHub manually.

---

## When to Use Jules

| Task | Use Jules? |
|------|-----------|
| Single file edit (< 100 lines) | ❌ Antigravity does it directly |
| 2-5 file refactor | ❌ Antigravity does it directly |
| 10+ file changes | ✅ Jules |
| Full TypeScript sweep | ✅ Jules |
| Generate test suite for a module | ✅ Jules |
| Security audit across all routes | ✅ Jules |
| Database migrations | ✅ Jules |
| Major dependency upgrades | ✅ Jules (L4 — confirm approach first) |
| SEO/a11y auto-fix across all pages | ✅ Jules |

---

## Step 1 — Read Project Identity

```
Read docs/PROJECT_SPEC.md → extract:
  GitHub Repo: <org>/<repo>  (e.g. "YuryZZZ/platform-integration")
```

---

## Step 2 — Create GitHub Issue via MCP (Antigravity does this)

```javascript
// Antigravity calls this directly — no user action:
github.create_issue({
  owner: "<org from PROJECT_SPEC>",
  repo: "<repo from PROJECT_SPEC>",
  title: "Jules: [specific task title]",
  body: `
## Task for Jules AI

### What to Build / Fix
[Specific, numbered action steps. Be explicit about file paths and logic.]

### Files to Touch
**Include:**
  [list of specific files or directories]

**Exclude (do NOT modify):**
  - GEMINI.md
  - docs/
  - .agents/
  - apphosting.yaml
  - .env*
  - *.test.ts, *.spec.ts

### Technical Requirements
- TypeScript strict mode: \`npx tsc --noEmit\` must exit 0
- Lint: \`npm run lint\` must exit 0  
- Build: \`npm run build\` must exit 0
- No new npm dependencies unless already in package.json
- No \`any\` types
- Follow patterns of adjacent files (read them first)
- Use existing utilities — do not reinvent

### Verification Jules Must Run Before PR
\`\`\`bash
npx tsc --noEmit
npm run lint
npm run build
\`\`\`

### Output Expected
PR to master titled: "[type]([scope]): [description]"
PR description: table of every changed file + one-line reason
  `,
  labels: ["jules"]
})
```

---

## Step 3 — Record Dispatch

Update the active task file in `docs/tasks/TASK-NNN.md`:
```markdown
**Jules Issue:** #[issue number]
**Dispatched:** [ISO timestamp]
**Status:** WAITING_FOR_JULES
```

Update `docs/CURRENT_STATUS.md`:
```markdown
**Current Loop Phase:** PHASE-3 DEVELOP — Waiting for Jules PR #[N]
```

---

## Step 4 — Poll for Jules PR (Antigravity does this automatically)

Jules typically creates a PR within 10-60 minutes. Poll using:

```javascript
// Check every 10 minutes:
github.list_pull_requests({
  owner: "<org>",
  repo: "<repo>",
  state: "open"
})

// Jules PRs are identified by:
// - Branch starting with "jules/" 
// - Title matching the issue title
// - Author = jules[bot] or jules-ai
```

While waiting for Jules, **continue other loop work** — don't block. Move to next prioritized task and return to check Jules status periodically.

---

## Step 5 — Review Jules PR

When Jules PR appears:

```javascript
// Get the PR diff:
github.get_pull_request({
  owner: "<org>",
  repo: "<repo>",
  pull_number: <pr_number>
})

// Get changed files:
github.get_pull_request_files({
  owner: "<org>",
  repo: "<repo>",
  pull_number: <pr_number>
})
```

Auto-approve if:
- ✅ All changed files are within the scoped directories
- ✅ No changes to excluded files (GEMINI.md, docs/, .agents/, etc.)
- ✅ All CI checks pass (TypeScript, lint, build)
- ✅ No new dependencies added unexpectedly

Reject and comment if:
- ❌ Changes outside scope
- ❌ CI checks failing
- ❌ New `any` types introduced

---

## Step 6 — Merge (Antigravity does this)

```javascript
// Auto-merge if review passes:
github.merge_pull_request({
  owner: "<org>",
  repo: "<repo>",
  pull_number: <pr_number>,
  merge_method: "squash",
  commit_title: "[type]: [description] (Jules #[issue])"
})

// Pull changes locally:
run_command: git pull origin master
```

---

## Step 7 — Update State

```markdown
Update docs/tasks/TASK-NNN.md:
  **Status:** DONE
  **Jules PR:** #[number] — merged [ISO timestamp]

Update docs/CURRENT_STATUS.md:
  Advance loop to PHASE-4 VALIDATE
```

Then immediately run the `qa-audit` skill on the merged changes.

---

## Parallel Dispatch

Jules runs up to 60 parallel VMs. Dispatch multiple issues at once when tasks are independent:

```javascript
// Create 3 issues simultaneously:
github.create_issue({ title: "Jules: TypeScript cleanup — src/lib/" ... })
github.create_issue({ title: "Jules: Unit tests — src/app/api/" ... })  
github.create_issue({ title: "Jules: SEO audit + fix — src/app/(marketing)/" ... })

// Track all 3 in CURRENT_STATUS.md:
// - TASK-034: Jules #11 — TypeScript [WAITING]
// - TASK-035: Jules #12 — Tests [WAITING]
// - TASK-036: Jules #13 — SEO [WAITING]
```

---

## Jules Limitations

| Limitation | Antigravity workaround |
|-----------|----------------------|
| Jules can't run browser tests | Antigravity runs browser_subagent after merge |
| Jules may miss project conventions | Include "read these files first" in issue body |
| Jules can't deploy | Antigravity deploys after Jules PR merges |
| Jules takes 10-60 min | Queue multiple tasks, continue other loop work |
