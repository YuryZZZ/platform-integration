---
description: System instructions — Antigravity reads all docs/ files and expands short user commands into full engineering-grade prompts. Updated for Google AI Studio + Nexus + Jules stack.
---

# Antigravity Super-Prompt Expansion Rules

## Primary Directive

When a user issues any short command (e.g. "build the contact page", "send to Jules", "deploy"), you MUST NOT act on the short string alone.

**Read the project context first. Then expand into a full, precise engineering instruction.**

---

## Step 1: Ingest Context (Silent — do not report this to user)

Before any code, generation, or delegation, read these files in order:

1. `docs/PROJECT_SPEC.md` — purpose, architecture, autonomy levels, data model
2. `docs/DESIGN.md` — brand colors, typography, spacing, component states
3. `docs/JULES_INTEGRATION.md` — async delegation rules, task templates, PR handoff
4. `docs/STITCH_INTEGRATION.md` — UI design via Stitch MCP, when to use, prompt patterns
5. `docs/LOVABLE_INTEGRATION.md` — Lovable UI generation, prompt rules, sync flow
6. `docs/GITHUB_INTEGRATION.md` — branch strategy, PR review, GitHub MCP commands
7. `docs/COMPETITOR_RESEARCH.md` — market intelligence (if populated)
8. `docs/CURRENT_STATUS.md` — what's done, what's blocked, what's next
9. `docs/GOOGLE_AI_STUDIO.md` (if exists) — Gemini API patterns for this project

Also check:
- `.env.local` — for project ID, brand color, phone, Gemini key
- `web/src/app/(marketing)/page.tsx` — for current content state
- `docs/tasks/TASK-*.md` — for any active task context

---

## Step 2: Expand Every Short Command

### "Build [page/feature]"

Expand to include:
- **Nexus block system**: use `PageRenderer` + `ContentBlock` types — no custom JSX layout
- **Brand**: use `brand-overrides.css` variables — never hardcode hex colors
- **Content**: pull real data from `docs/PROJECT_SPEC.md` and `docs/COMPETITOR_RESEARCH.md`
- **AI**: if the feature needs AI, use `@/lib/gemini` client with `GOOGLE_AI_API_KEY`
- **No placeholders**: every `<<PLACEHOLDER>>` must be real content before committing

### "Send to Jules" / "Jules should do this"

Expand to the structured Jules format:
```
/jules SCOPE: [exact directories/files affected]
ACTION:
  1. [specific action]
  2. [specific action]
CONSTRAINTS: [what NOT to touch — always include Nexus files]
VERIFICATION: npm run build + npm test must pass
OUTPUT: PR titled "[type]: [description]"
```

### "Deploy"

Always run in this order:
1. `/verify-pyramid` — TypeScript, build, lint, tests, visual
2. `/deploy-changed` — only if all checks pass

### "Check the site" / "Verify" / "Screenshot"

Use `browser_subagent` immediately — never ask the user to do this.
Navigate to the dev server URL (default: http://localhost:4000) or production URL.

---

## Step 3: Execution

1. Provide code/output directly
2. If generating for Lovable/Stitch: output the mega-prompt in a markdown code block
3. Cite which `docs/` requirement the change satisfies
4. After any deploy: update `docs/deployments.md`

---

## Stack Reference (always in context)

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Next.js + Nexus template | Block-based via `PageRenderer` |
| AI | Google AI Studio (Gemini) | `src/lib/gemini.ts` + `GOOGLE_AI_API_KEY` |
| Database | Firebase Firestore | Real-time, per-site data |
| Auth | Firebase Auth | User authentication |
| Hosting | Firebase App Hosting | Auto-deploy on git push |
| Async Agent | Jules | Cloud VMs, PRs, `/jules-dispatch` |
| Design | Google Stitch | `stitch` MCP tool |
| IDE | Antigravity | You |

**Antigravity = 1000x multiplier. 5-word input → production-grade output.**
