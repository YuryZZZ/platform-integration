---
name: jules-dispatch
description: Delegate heavy, multi-file, or long-running tasks to Jules AI (Google Labs). Jules runs on a cloud VM with full repo access. Use for tasks > 10 files, security audits, full TypeScript cleanup, test generation, or anything > 30 minutes of IDE work.
---

# Jules Dispatch Skill

## Purpose
Jules is an async AI agent that runs on a cloud VM. Delegation to Jules frees the IDE for other work. Use Jules for heavy lifting, not for small edits.

---

## When to Use Jules (vs Antigravity Direct)

| Task | Use Jules? |
|------|-----------|
| Single file edit | ❌ Do it directly |
| 2-5 file refactor | ❌ Do it directly |
| 10+ file refactor | ✅ Jules |
| Full TypeScript error sweep | ✅ Jules |
| Generate all unit tests for a module | ✅ Jules |
| Security audit across all routes | ✅ Jules |
| Database migration scripts | ✅ Jules |
| Dependency upgrades (major version) | ✅ Jules |
| SEO/accessibility audit + auto-fix | ✅ Jules |
| Converting all pages to new framework version | ✅ Jules |

---

## Step 1 — Scope the Task Precisely

Before dispatching, define:
```
SCOPE: exactly which directories/files Jules should touch
  Include: src/lib/auth/, src/app/api/auth/
  Exclude: GEMINI.md, docs/, .agents/, apphosting.yaml

ACTION: numbered steps Jules must follow exactly
  1. Read src/lib/auth/session.ts
  2. Replace all JWT operations with NextAuth v5 equivalents
  3. Update all API routes that call verifyJWT()
  ...

CONSTRAINTS:
  - Do NOT change public API contracts (route paths, response shapes)
  - Do NOT bump dependency versions (flag if needed, ask)
  - All changes must pass: npm run typecheck && npm run test
  - Follow existing code patterns — read 3 related files first

OUTPUT:
  - PR titled: "refactor: [description]" | "fix: [description]" | "feat: [description]"
  - PR description must list every file changed with reason
  - All files must pass TypeScript strict mode
```

---

## Step 2 — Write the Jules Issue

Create a GitHub Issue as the dispatch vehicle:

```javascript
github.create_issue({
  owner: "<org from PROJECT_SPEC>",
  repo: "<repo from PROJECT_SPEC>",
  title: "Jules: [task title]",
  body: `
## Task for Jules AI

### Scope
**Include:** [directories and files]
**Exclude:** GEMINI.md, docs/, .agents/, apphosting.yaml, *.env*

### Action Steps
[numbered steps]

### Constraints
- Do not change public API contracts
- Do not bump dependency major versions
- All changes must pass: \`npm run typecheck && npm run test\`
- Follow existing patterns in the codebase

### Verification
Jules must run these before creating the PR:
- \`npm run typecheck\` → 0 errors
- \`npm run test\` → all pass
- \`npm run lint\` → 0 warnings

### Output Expected
- PR to master with title: "[type]: [description]"
- Summary in PR description of every changed file + reason
  `,
  labels: ["jules", "automated"]
})
```

---

## Step 3 — Tag Issue for Jules

After creating the issue, tag it so Jules picks it up:
- Label: `jules` (Jules monitors this label on configured repos)
- Assign: `@jules` (if available in repo settings)

---

## Step 4 — Monitor & Merge

```javascript
// Poll for Jules PR every 5 minutes:
github.list_pull_requests({
  owner: "<org>",
  repo: "<repo>",
  state: "open",
  head: "jules/"  // Jules PRs branch from "jules/<issue-number>"
})

// When PR appears:
// 1. Review the changed files list
// 2. Run visual verification if UI changed
// 3. Merge if all checks pass:
github.merge_pull_request({
  owner: "<org>",
  repo: "<repo>",
  pull_number: <pr_number>,
  merge_method: "squash"
})
```

---

## Step 5 — Update Task

After merge:
```markdown
Update TASK-NNN status: DONE
Note: "Delegated to Jules — PR #NNN merged"
Update CURRENT_STATUS.md → advance loop phase
```

---

## Jules Limitations — Know These

| Limitation | Workaround |
|-----------|-----------|
| Jules can't access external APIs | Provide mock data or fixtures in the issue |
| Jules can't run browser tests | Antigravity runs Playwright after merge |
| Jules takes 10-60 min | Queue multiple Jules tasks simultaneously |
| Jules may miss project conventions | Include "read these 3 files first" in scope |
| Jules can't deploy | Always deploy from Antigravity after Jules PR merges |

---

## Parallel Dispatch Pattern

Jules supports up to 60 parallel VMs. To run multiple tasks:
```
Issue 1: "Jules: Full TypeScript cleanup — src/lib/"
Issue 2: "Jules: Generate unit tests — src/app/api/"
Issue 3: "Jules: SEO audit — src/app/(marketing)/"
```
Create all 3 issues → all 3 run in parallel → merge in order.
