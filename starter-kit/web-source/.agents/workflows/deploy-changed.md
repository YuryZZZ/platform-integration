---
description: Deploy the web frontend to Firebase Hosting. Run /deploy-changed after /verify-pyramid passes.
---

# /deploy-changed

> Prerequisites: `/verify-pyramid` must pass first. Never deploy a broken build.

// turbo-all

1. Read `docs/PROJECT_SPEC.md` to confirm the Firebase project ID and region.

2. Build the frontend:
   ```powershell
   cd web
   npm run build
   ```
   If build fails — STOP. Do not proceed to deploy.

3. Deploy to Firebase Hosting:
   ```powershell
   cd ..
   firebase deploy --only hosting --project YOUR_PROJECT_ID
   ```
   Where `YOUR_PROJECT_ID` is in `.firebaserc` or `.env.local`.

4. Verify the production URL loads correctly:
   - Navigate to `https://YOUR_PROJECT_ID.web.app`
   - Screenshot the homepage
   - Confirm: brand color correct, no placeholders, contact details visible
   - Check browser console: zero errors

5. Update deployment log:
   - Append to `docs/deployments.md`:
     ```
     ## YYYY-MM-DD HH:MM
     - URL: https://YOUR_PROJECT_ID.web.app
     - Task: TASK-XXX
     - Status: ✅ Live
     - Notes: [what changed]
     ```

6. Git commit and push:
   ```powershell
   git add -A
   git commit -m "deploy: [brief description of what changed]"
   git push origin master
   ```

7. If Firebase App Hosting (auto-deploy on push):
   - Step 3 is automatic — GitHub push triggers Cloud Run provisioning
   - Monitor at: https://console.firebase.google.com → App Hosting
   - Wait for green status before closing session
