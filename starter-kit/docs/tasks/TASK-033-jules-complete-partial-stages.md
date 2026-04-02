# Jules Task: Complete Remaining Partial Stages in Nexus Platform

## What to Build

The Nexus AI platform template (`platform-integration/starter-kit`) has the following **unfinished partial stages** identified in `docs/tasks/TASK-MASTER-PLAN.md`. Complete them all.

---

## Scope

**Repository:** `YuryZZZ/platform-integration` (work in `starter-kit/` directory)

**Include:**
- `starter-kit/src/app/(marketing)/` — marketing pages
- `starter-kit/src/app/(app)/` — app pages  
- `starter-kit/src/lib/ai/` — AI gateway
- `starter-kit/src/lib/voice/` — voice engine
- `starter-kit/src/lib/db/migrations/` — database migrations

**Exclude (do NOT touch):**
- `starter-kit/GEMINI.md`
- `starter-kit/docs/`
- `starter-kit/.agents/`
- `starter-kit/apphosting.yaml`
- `starter-kit/.env*`
- Any file ending in `.test.ts` or `.spec.ts`

---

## Tasks (Complete ALL of these)

### Task A — Marketing Pages (Stage 7, currently 67%)

Complete these 4 missing marketing pages. Each page must use the existing layout components from `starter-kit/src/components/layout/`:

**A1. Resources/Blog listing page** (`src/app/(marketing)/resources/page.tsx`)
- Use `Section`, `ContentGrid`, HeroSection-style header
- Display 6 sample article cards (hardcoded sample data is fine)
- Each card: title, excerpt, category chip, read time, date
- Filter tabs: All | Case Studies | Guides | News
- Export `metadata` with title + description

**A2. Contact page** (`src/app/(marketing)/contact/page.tsx`)
- Split layout: left = value props + contact info, right = form
- Form fields: name, company, email, role (select), message
- `onSubmit`: POST to `/api/contact` (create this API route)
- `/api/contact/route.ts`: validate fields (Zod), add to Firestore `leads` collection, return 200
- Export `metadata`

**A3. Changelog page** (`src/app/(marketing)/changelog/page.tsx`)
- Timeline layout with 5 hardcoded sample releases
- Version badge, date, headline, bullet list of changes
- Color-coded: green=feature, blue=improvement, yellow=fix
- Export `metadata`

**A4. Trust/Security page** (`src/app/(marketing)/security/page.tsx`)
- Already has a stub — add: 4 compliance sections (GDPR, SOC2, Encryption, Access Control)
- Each section: icon, title, description, status badge (Compliant / In Progress)
- Add a "Download Security Brief" CTA button (href="/security-brief.pdf")
- Export `metadata`

---

### Task B — AI Gateway Models Route (Stage 10, item 10.9)

**B1.** `src/app/api/ai/models/route.ts` — List available models per configured API keys:
```typescript
// GET /api/ai/models
// Returns: { models: Array<{ id, name, provider, available: boolean }> }
// Available = true only if the corresponding API key env var is set
// Read from MODEL_REGISTRY in src/lib/ai/model-resolver.ts
```

---

### Task C — Database Migrations (Stage 15, items 15.5-15.7)

Create these SQL migration files. Follow the pattern of `001_core.sql`.

**C1.** `src/lib/db/migrations/003_ai_tables.sql`:
- `ai_conversations` (id, tenant_id, user_id, model, created_at)
- `ai_messages` (id, conversation_id, role, content, tokens, created_at)
- `ai_prompts` (id, tenant_id, name, version, content, created_at)
- Row Level Security policies (tenant_id isolation)

**C2.** `src/lib/db/migrations/004_voice_tables.sql`:
- `voice_sessions` (id, tenant_id, user_id, duration_seconds, created_at)
- `voice_transcripts` (id, session_id, text, confidence, created_at)
- RLS policies

**C3.** `src/lib/db/migrations/005_workflow_tables.sql`:
- `workflow_definitions` (id, tenant_id, name, steps jsonb, created_at)
- `workflow_jobs` (id, definition_id, status, started_at, completed_at)
- `workflow_step_results` (id, job_id, step_index, output jsonb, created_at)
- RLS policies

---

## Constraints

- TypeScript strict mode — `npx tsc --noEmit` must exit 0 after your changes
- No new npm dependencies unless already in `package.json`
- All new API routes must use the existing `withAuth` middleware from `src/lib/api/middleware.ts`
- All new Firestore writes must import from `src/lib/firebase.ts`
- Follow existing file patterns — read 2-3 adjacent files before creating new ones
- No `any` types

## Verification Jules Must Run

```bash
cd starter-kit
npx tsc --noEmit    # must exit 0
npm run lint        # must exit 0
npm run build       # must exit 0
```

## Output

- PR to `master` branch titled: `feat(platform): complete partial stages 7, 10, 15`
- PR description must list every file created/modified with one-line reason
