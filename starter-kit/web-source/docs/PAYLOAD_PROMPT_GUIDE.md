# Payload CMS Prompt Guide
*(For use with Antigravity when building or modifying the Nexus control plane)*

Payload CMS 3 is the Nexus control plane — unified content management, AI governance, and operational data. It does **not** replace PostgreSQL; it runs on top of it via the Postgres adapter.

> **Critical Rule:** Payload is Layer 1 (PostgreSQL) only. It has no role in Layer 2 (Firebase runtime for generated sites). See `docs/PROJECT_SPEC.md` — Data Layer Map.

## 1. Collection Reference

| Collection | Group | Purpose |
|------------|-------|---------|
| `prompts` | AI Governance | Versioned AI prompt registry with approval workflow and risk levels |
| `tenants` | System | Tenant metadata, motion intensity defaults, voice policy |
| `users` | System | Auth-enabled users — tenant-aware, role-based (admin / editor / viewer) |
| `workflowJobs` | Operations | Async job visibility and status tracking |
| `auditLogs` | Operations | AI decisions, access events, GDPR deletion audit |
| `pages` | Content | CMS-managed pages with Lexical rich-text editor |

## 2. Globals Reference

| Global | Purpose |
|--------|---------|
| `siteSettings` | Site name, default OG image, navigation config |
| `featureFlags` | Fluid motion, sonic, AI enabled — togglable from admin UI without redeploy |
| `assistantDefaults` | Default prompt slugs, model preference hints |
| `trustPageSettings` | Compliance badges, trust copy blocks, downloadable asset references |

## 3. Prompt Governance Workflow

The prompt lifecycle is strictly enforced:

```
Draft → In Review → Approved → Published → Archived
```

**Rules:**
- Published prompts require `approvedBy` and `lastReviewedAt` to be set — enforced by a `beforeChange` hook.
- Prompt changes require pull request review, staging validation, and schema regression checks before production promotion.
- Only **published** prompts are returned by the AI gateway in production.
- Prompt versions are capped at **20 per document** to control storage.

**Expansion Rule:** When the user asks Antigravity to "create a new prompt" or "modify a prompt", Antigravity MUST:
> *"Create a new entry in the `prompts` collection with status `draft`. Set the `riskLevel` field based on content sensitivity (low/medium/high). Include a `slug` for programmatic lookup. Do NOT set status to `published` — that requires manual approval via the admin panel."*

## 4. Local API Safety Rule (CRITICAL)

The Payload Local API **skips access control by default**. Always pass `overrideAccess: false` and `user` for any call that must respect permissions:

```typescript
const result = await payload.find({
  collection: 'prompts',
  where: { slug: { equals: 'default-assistant' } },
  overrideAccess: false,   // ← REQUIRED for access-controlled reads
  user,
  depth: 0,
})
```

**Expansion Rule:** When Antigravity generates any Payload API call, it MUST include `overrideAccess: false` unless the call is explicitly a system-level operation (seeds, migrations, background jobs).

## 5. Payload + RLS Boundary (Dual Layer Security)

Payload access control handles **application-layer** permissions. Postgres RLS handles **database-layer** tenant isolation. **Both are required.**

- Payload ACL does **not** replace RLS.
- RLS must be enabled and tested on all tenant-scoped tables regardless of what Payload enforces above it.
- RLS policies are applied via `npm run db:rls` and validated via `npm run test:rls`.

```sql
-- Applied to all tenant-scoped tables, validated in CI
ALTER TABLE prompt_embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON prompt_embeddings
  USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

## 6. Feature Flags (Runtime Control)

All three feature flags are controllable from the Payload admin panel without redeploy:

| Flag | Default | Effect |
|------|---------|--------|
| `FEATURE_FLUID_MOTION` | `true` | Disables GSAP + all enhanced motion globally when `false` |
| `FEATURE_SONIC` | `false` | Sound cues — off by default |
| `AI_FEATURE_ENABLED` | `true` | AI gateway master switch — UI remains navigable when `false` |

## 7. Creating New Collections

When Antigravity is asked to add a new Payload collection:

**Expansion Rule:**
> *"Create the collection definition in `collections/[Group]/[Name].ts`. Include typed fields with Zod validation. Add tenant-scoped access control using the `isAdminOrTenantMember` pattern. Register the collection in `payload.config.ts`. After creation, run `npm run db:migrate` to generate the migration, then `npm run db:rls` to apply Row Level Security policies to the new table."*

**File must include:**
1. `slug` — kebab-case collection name
2. `fields` — typed field definitions with validation
3. `access` — read/create/update/delete functions with tenant scoping
4. `hooks` — `beforeChange` / `afterChange` as needed
5. `admin.group` — proper grouping (AI Governance, System, Operations, Content)

---

### Example Antigravity Expansion:
If the user types: *"Add a knowledge documents collection to Payload"*

**Antigravity MUST generate:**
> *"Create `collections/Content/KnowledgeDocuments.ts` with fields: `title` (text, required), `content` (richText, Lexical), `sourceUrl` (text, optional), `tenant` (relationship to tenants, required), `embedding` (json, for pgvector storage), `status` (select: draft/processing/indexed/error). Add tenant-scoped access control. Register in `payload.config.ts`. Run `npm run db:migrate` to create the table, then `npm run db:rls` to apply tenant isolation. Do NOT store embeddings in Firestore — this is Layer 1 data."*
