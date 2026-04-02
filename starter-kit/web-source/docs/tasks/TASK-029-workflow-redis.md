# TASK-029: Distributed Workflow Engine (Redis & BullMQ)

## Objective
The workflow engine currently executes synchronously in `engine.ts`. To support long-running tasks, RAG document processing, and scaled background workers, we must integrate BullMQ backed by a Redis cluster (Spec §18 caching/queues).

## Affected Components
- `src/lib/workflow/queue.ts` (New file)
- `package.json` (add `bullmq` & `ioredis`)

## Sequential Plan

### Step 1: Install Dependencies
- **What**: Enhance Next.js API ecosystem with Redis.
- **How**: Install `bullmq` and `ioredis`.

### Step 2: Implement Redis Connection Singleton
- **What**: Create a reusable cache connection.
- **How**: Export `getRedisClient()`.

### Step 3: Implement BullMQ Queue & Worker
- **What**: Create the job queue.
- **How**: Define `workflowQueue` and the `Worker` instance that safely calls `WorkflowEngine.execute`.

---

## Execution Record
- [x] Step 1: Install Dependencies
- [x] Step 2: Implement Redis Connection
- [x] Step 3: Implement BullMQ Queue
