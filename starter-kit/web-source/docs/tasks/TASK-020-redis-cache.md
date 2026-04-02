# TASK-020: Redis Cache, Sessions & BullMQ (Specs 41-50) & Missed DB Models

## Objective
Implement Domain 5 (Redis integrations) and finalize the skipped Database/Security modules (Tasks 15.6, 16.8, 16.10) to ensure complete backend alignment before CI deployment.

## Affected Components
- `portable/src/lib/db/schema.ts` (Add Voice Tables)
- `portable/src/lib/security/prompt-guard.ts` (16.8 Prompt Injection Defense)
- `portable/src/lib/cron/data-retention.ts` (16.10 Data Retention Cron)
- `portable/src/lib/redis/client.ts` (Spec 41, 42)
- `portable/src/lib/redis/pubsub.ts` (Spec 43)
- `portable/src/lib/redis/rate-limiter.ts` (Spec 44)
- `portable/src/lib/redis/session.ts` (Spec 45)
- `portable/src/lib/redis/queue.ts` (Spec 46)

## Sequential Plan
### Step 1: Database & Security Backfill
- **What**: Address skipped steps from earlier phases to make the schema 100% complete.
- **How**: 
  - Add `voice_sessions` and `voice_transcripts` to `schema.ts`.
  - Create a lightweight `prompt-guard.ts` utility that intercepts and sanitizes LLM inputs against injection keywords.
  - Create `data-retention.ts` simulating a cron job that soft-deletes 30-day voice data.

### Step 2: Redis Core & Pub/Sub
- **What**: Create the Redis connection client and Pub/Sub mechanics (Specs 41, 43).
- **How**: Abstract generic `ioredis` connections via `lib/redis/client.ts` utilizing `REDIS_URL` environment variables.

### Step 3: Rate Limiter & Sessions
- **What**: Replace the mock rate limiter with a genuine Redis Token-Bucket implementation (Spec 44, 45).
- **How**: Implement sliding window logic in `rate-limiter.ts` ensuring API edge safety.

### Step 4: BullMQ Job Queues
- **What**: Configure BullMQ for async jobs (Spec 46).
- **How**: Create `queue.ts` exporting a unified `generateQueue` pipeline wrapper.

---

## Execution Record
- [x] Step 1: Missed Schema & Security
- [x] Step 2: Redis Core
- [x] Step 3: Redis Edge Middleware
- [x] Step 4: Async Queuing

### Status: DONE
