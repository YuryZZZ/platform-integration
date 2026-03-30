---
description: Deploy changed components to production
---

// turbo-all

1. Build frontend:

   ```powershell
   cd web && npm run build
   ```

2. Deploy to Firebase:

   ```powershell
   cd .. && npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
   ```

3. Verify the deployed site loads correctly.

4. Update docs/deployments.md with the deploy details.

5. Git commit and push:
   ```powershell
   git add -A && git commit -m "deploy: frontend update" && git push origin master
   ```
