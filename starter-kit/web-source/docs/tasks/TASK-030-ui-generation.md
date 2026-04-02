# TASK-030: AI Product UIs (Knowledge Base & Workflow Builder)

## Objective
Now that the data pipelines, Redis queues, and Postgres schemas are operational, we must build the interfaces for users to actually interact with the system. We will utilize the **Stitch MCP UI Server** to autonomously generate high-fidelity, premium mockups and code structures for two primary features:
1. **AI Knowledge Base Manager**: Where users upload RAG data sources, view chunking progress, and track token usage.
2. **Visual Workflow Builder**: A drag-and-drop canvas layout for defining `engine.ts` steps (AI Prompts, Webhooks, Conditions).

## Affected Components
- `StitchMCP` (External Design Generation)
- `src/app/(app)/knowledge/page.tsx`
- `src/app/(app)/workflows/builder/page.tsx`

## Sequential Plan

### Step 1: Initialize Stitch Project
- **What**: Create a dedicated Stitch design project container for Nexus AI product features.
- **How**: Call `StitchMCP_create_project` to structure the workspace.

### Step 2: Generate Knowledge Base UI
- **What**: Generate a premium, dark-mode focused Data Source table and Dropzone UI.
- **How**: Call `StitchMCP_generate_screen_from_text` with precise specifications mapped to our `knowledge_sources` DB schema.

### Step 3: Generate Workflow Builder UI
- **What**: Generate a node-based flow builder interface.
- **How**: Call `StitchMCP_generate_screen_from_text` focusing on a sidebar tool pane and a clean, expansive visual canvas.

### Step 4: Scaffold Next.js Pages
- **What**: Create the actual `.tsx` files mapped to our App router for these features.
- **How**: Write the code into the `src/app/...` directories mimicking the generated design structure.

---

## Execution Record
- [x] Step 1: Initialize Stitch Project
- [x] Step 2: Generate Knowledge Base UI
- [x] Step 3: Generate Workflow Builder UI
- [x] Step 4: Scaffold Next.js Pages
