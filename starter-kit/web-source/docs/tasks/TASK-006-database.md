# TASK-006: Phase 3 - Database & Migrations

## Objective
Implement Stage 15 of the Master Plan, specifically establishing the database migration runner and seed data script for the Core multi-tenant SaaS features (Tenants, Users, Auth), while adhering to the user request to skip AI/Knowledge/Workflow migrations for now.

## Affected Components
- `src/lib/db/migrate.ts`: Migration runner logic connecting to Postgres.
- `src/lib/db/migrations/001_core.sql`: The actual SQL definitions for Core Tables.
- `src/lib/db/seed.ts`: Seed script for initialization.
- `src/lib/db/schema.ts`: Will be updated to act as the single source of truth or type exports.

## Sequential Plan
### Step 1: Migration Runner (`lib/db/migrate.ts`)
- **What**: Create a script that connects to the `DATABASE_URL` and executes pending SQL files from a `migrations` array/directory.
- **How**: Build an idempotent `runMigrations()` function using `pg` or existing DB client logic.

### Step 2: Core Schema Migration (`lib/db/migrations/001_core.sql`)
- **What**: Separate the Core SQL DDL (Tenants, Users, CMS basic tables, RLS policies) into a dedicated `.sql` file, omitting the AI and Workflow tables per user request.
- **How**: Extract SQL from `schema.ts` and write it to the static migration file.

### Step 3: Database Seed Script (`lib/db/seed.ts`)
- **What**: Script to populate the DB with the initial mock data.
- **How**: Create a default tenant "Acme", an admin user, and initialize a basic site config.

---

## Execution Record
- [x] Step 1: Create `migrate.ts`
- [x] Step 2: Create `001_core.sql`
- [x] Step 3: Create `seed.ts`

### Status: DONE
The Postgres baseline tables are defined for the Core Multi-tenant Application and CMS Payload mapping natively. AI and Workflow tables successfully excluded.
