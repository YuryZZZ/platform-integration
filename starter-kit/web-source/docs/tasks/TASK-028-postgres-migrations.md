# TASK-028: Database Migrations (Voice & Analytics)

## Objective
Finalize the Postgres schemas. The foundational schema (`version: 1`) already included AI, RAG, and Workflow definitions, contrary to the checklist stating they were skipped. However, Voice analytics tracking (Stage 15.6) was entirely missing. We will build `version: 2` of the DB schema to add `voice_sessions` and `voice_transcripts` natively mapping to the Tenant schema.

## Affected Components
- `src/lib/db/schema.ts`

## Sequential Plan

### Step 1: Write `voice_sessions` Schema
- **What**: Track audio sessions per user/tenant.
- **How**: Add DDL for `voice_sessions` with RLS.

### Step 2: Write `voice_transcripts` Schema
- **What**: Store text results of STT generation.
- **How**: Add DDL for `voice_transcripts` with RLS.

### Step 3: Implement & Validate Migration V2
- **What**: Build the migration block in `schema.ts`.
- **How**: Write the SQL array export modification.

---

## Execution Record
- [x] Step 1: `voice_sessions` Schema
- [x] Step 2: `voice_transcripts` Schema
- [x] Step 3: Implement & Validate Migration V2
