# TASK-026: Cloud Functions & Backend Microservices

## Objective
Transitioning from the foundational Next.js platform architecture into the backend data pipelines explicitly mapped out in the project spec. This task hardens the isolated Firebase Cloud Functions (`uploadAvatar` and `exportToBigQuery`), creates proper deployment scripts (Rule #3 compliance), and validates their integration.

## Affected Components
- `portable/functions/exportToBigQuery/`
- `portable/functions/uploadAvatar/`
- `firebase.json` (to register the functions for deployment)

## Sequential Plan

### Step 1: Harden & Test `uploadAvatar` Microservice
- **What**: Enhance the existing `uploadAvatar` function to ensure strict Zod input validation, proper Firebase Storage interactions, and error handling.
- **How**: Refactor `index.ts`, ensure `package.json` dependencies are installed (e.g., `firebase-admin`, `firebase-functions`), add a basic Vitest unit test suite, and ensure TypeScript (`tsc`) compiles cleanly.
- **Verify**: Run `npm run build` safely.
- **Deploy**: Create `deploy.ps1` ensuring it preflights, builds, and deploys using `firebase deploy --only functions:uploadAvatar`.

### Step 2: Harden & Test `exportToBigQuery` Pipeline
- **What**: Ensure the `exportEventToBQ` Firestore trigger correctly streams newly created user events into the `firebase_analytics.user_events_raw` BigQuery table.
- **How**: Refactor logic, add retry logic/dead-letter if BQ insert fails. Write basic tests. Build correctly.
- **Verify**: `tsc` build pass, mock payload test pass. 
- **Deploy**: Create `deploy.ps1`.

### Step 3: Register Functions & CLI Configuration 
- **What**: Ensure Firebase CLI (`firebase.json`) correctly maps to these nested directory sources.
- **How**: Update `firebase.json` `functions` array to point to codebase `uploadAvatar` and `exportToBigQuery`.

### Step 4: Validate Production Pipeline 
- **What**: Dry-run the deploy scripts to prove integration.
- **How**: Execute `deploy.ps1` scripts for both microservices.

---

## Execution Record
- [x] Step 1: `uploadAvatar` Implementation & Testing
- [x] Step 2: `exportToBigQuery` Implementation & Testing
- [x] Step 3: Firebase Config Wiring
- [x] Step 4: Verification via `deploy.ps1`
