# TASK-013: Phase 8 - Knowledge/RAG & Visual Workflows

## Objective
Finalize Stage 12 (Knowledge & RAG) and Stage 13 (Workflow Engine) as demanded by the master plan. This involves creating the embedding engine, the ingestion pipeline, the source management, and the actual vector-similarity search logic. Also involves building out the frontend visual Workflow Builder using Drag and Drop concepts. 

## Affected Components
- `src/lib/knowledge/embeddings.ts`: Token manipulation and OpenAI API embeddings generator
- `src/lib/knowledge/rag-pipeline.ts`: Pgvector DB similarity search and RAG synthesis
- `src/lib/knowledge/ingestion.ts`: Pipeline to split, embed, and upsert docs
- `src/lib/knowledge/sources.ts`: Controller for Knowledge Sources
- `src/app/api/ai/search/route.ts`: App router endpoint executing RAG queries
- `portable/src/components/workflow/WorkflowBuilder.tsx`: Front-end drag and drop canvas
- `src/lib/workflow/step-types.ts`, `scheduler.ts`, `status.ts`: Workflow Engine Core types and scheduling abstractions
- `portable/src/hooks/useWorkflow.ts`: Front-end bridge

## Sequential Plan
### Step 1: Embeddings & Vector Operations (`embeddings.ts`, `rag-pipeline.ts`)
- **What**: Build the similarity search interface wrapper and chunking/embedding pipeline.
- **How**: Use `@ai-sdk/openai` embedding tools and naive semantic chunking. 

### Step 2: Ingestion & Sources (`ingestion.ts`, `sources.ts`)
- **What**: Implement operations that write to the knowledge database.
- **How**: Abstracted controllers wrapping `db.query` calls.

### Step 3: RAG API Route (`app/api/ai/search/route.ts`)
- **What**: Enhance the existing or generate the new route to query vector similarity and then use `streamText` to contextualize answers.
- **How**: Read prompt from generic system, provide RAG documents as context window blocks.

### Step 4: Visual Workflow Editor (`WorkflowBuilder.tsx`, `useWorkflow.ts`)
- **What**: An advanced visual interaction canvas for the workflow engine.
- **How**: Build a custom cinematic/glassmorphic grid canvas with Draggable Steps leveraging the Design Tokens already established in Stage 2.

### Step 5: Master Plan Sync
- **What**: Update `docs/tasks/TASK-MASTER-PLAN.md` with checkmarks reflecting Stage 12 and 13 completion!

---

## Execution Record
- [x] Step 1: Embeddings & RAG 
- [x] Step 2: Knowledge Ingestion
- [x] Step 3: Serverless Search Route
- [x] Step 4: Workflow UI Toolkit
- [x] Step 5: Sync Plan

### Status: DONE
