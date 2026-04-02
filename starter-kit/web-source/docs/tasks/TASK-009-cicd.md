# TASK-009: Phase 5 - CI/CD & Deployment Rails

## Objective
Execute Stage 19 of the Master Plan. Establish the strict deployment standards mandated by the global rules (Anti-Monolith, Deploy via `deploy.ps1`, Preflight checks). Adhering perfectly to Rule #3, we will define `functions/web` as our autonomous deployment unit.

## Affected Components
- `functions/web/deploy.ps1`: The core deployment script orchestrating preflights, health checks, and rollbacks for the web frontend.
- `.github/workflows/ci.yml`: Add DB migration steps and Lighthouse CI tests.
- `docs/deployments.md`: Mandatory deployment ledger.

## Sequential Plan
### Step 1: Deploy Unit isolation (`functions/web/deploy.ps1`)
- **What**: Create the standard PowerShell deployment script matching rule requirements to exist in a `functions/<name>` block.
- **How**: Implement Preflight (Lint, TS Check) -> Deploy (`npm run build`, `firebase deploy`) -> Health Check (`/api/health`) -> Record Status. Ensure it exits 0/1 correctly.

### Step 2: Deployment Ledger (`docs/deployments.md`)
- **What**: Create the deployment tracker to record all autonomous actions.
- **How**: Format a standard table keeping track of versions, deployed URLs, and Task IDs according to Rule #6.

### Step 3: CI Flow Enhancement (`.github/workflows/ci.yml`)
- **What**: Add Database Migration sanity checks and Lighthouse CI score validation to GitHub Actions.
- **How**: Modify the existing YAML (if present) to protect the branch against un-migrated code.

---

## Execution Record
- [x] Step 1: Deploy Unit (functions/web)
- [x] Step 2: Ledger creation
- [x] Step 3: CI Flow

### Status: DONE
The strict CI/CD and atomic boundaries for deployment are firmly established, ensuring the anti-monolith policy and rigorous database + UI benchmarks guard the production environment. 
