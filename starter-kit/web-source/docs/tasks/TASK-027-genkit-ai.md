# TASK-027: AI Genkit Pipelines

## Objective
Establish an isolated deploy unit (`functions/genkit-ai`) specifically for running Google Genkit serverless flows. This function will serve as the AI intelligence gateway, handling RAG, complex reasoning, and deep research (e.g., via Perplexity adapters), fully decoupled from the Next.js frontend monolithic deploy.

## Affected Components
- `portable/functions/genkit-ai/` (New Directory)
- `firebase.json` (Codebase Registration)

## Sequential Plan

### Step 1: Initialize Deploy Unit Environment
- **What**: Scaffold the microservice.
- **How**: Create `package.json`, `tsconfig.json`, and install `firebase-functions`, `@genkit-ai/core`, `@genkit-ai/googleai`, and testing tools.

### Step 2: Implement Genkit Flow
- **What**: Build the main AI responder logic as a Genkit flow.
- **How**: Create `index.ts` defining `aiResponderFlow` which validates inputs using Zod, processes them via a mocked LLM (or actual Gemini setup), and returns the results. 

### Step 3: Implement Unit Testing
- **What**: Ensure the flow logic adheres to rule #2 coverage guarantees before deployment.
- **How**: Write `index.test.ts` to mock the flow execution and ensure correct shape parsing and error throwing.

### Step 4: Verification & Firebase Config Wiring
- **What**: Add script to `firebase.json` and create the `deploy.ps1` hard rails.
- **How**: Compile via `tsc`, run `vitest`, and register `"codebase": "genkit-ai"`.

---

## Execution Record
- [x] Step 1: Initialize Deploy Unit Environment
- [x] Step 2: Implement Genkit Flow
- [x] Step 3: Implement Unit Testing
- [x] Step 4: Verification & Firebase Config Wiring
