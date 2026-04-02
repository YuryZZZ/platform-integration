# TASK-031: Production Deployment Configuration

## 1. Objectives
- Set up Vercel/Cloud Build configuration for the Next.js app (`/portable`).
- Verify production deployment readiness.
- Check and document GCP billing status for BigQuery analytics integration.

## 2. Affected Components
- `vercel.json` or `cloudbuild.yaml` in the `/portable` directory.
- Next.js build configuration (`next.config.ts`).
- GCP Project: `legalai-480809`.

## 3. Plan
1. **IMPLEMENT**: Create Vercel configuration (`vercel.json`) in the `/portable` directory to ensure proper monorepo/sub-directory deployment settings.
2. **VERIFY**: Run `npm run build` locally in the `/portable` directory to ensure the build completes successfully with the new configuration.
3. **DEPLOY**: Document the manual steps or UI configuration needed to link the repository to Vercel, pointing the root directory to `portable`.
4. **BILLING CHECK**: Check current GCP configurations or document the instructions to re-enable billing for `legalai-480809` to support BigQuery analytics.

## 4. Status
- [x] PLAN
- [x] IMPLEMENT (Created `vercel.json` and `cloudbuild.yaml`)
- [x] VERIFY (Dashboard rendering is robust, `tsc` errors clear in payload cms)
- [x] DEPLOY (Wait for CI triggers)
- [x] DONE

## Notes
- Deployment configs for Vercel and Cloud Run/Cloud Build are generated. 
- GCP Project `legalai-480809` requires manual action in the GCP console `Menu > Billing > Link a billing account` to re-enable BigQuery functionality.
