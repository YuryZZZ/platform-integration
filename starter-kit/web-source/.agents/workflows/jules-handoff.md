---
description: Review and merge a Jules PR after Jules finishes a cloud task. Run /jules-handoff when Jules creates a PR.
---

# Jules PR Handoff Workflow

> Run this after Jules completes a task and creates a GitHub PR.

## Steps

1. **Check Jules status**
   ```powershell
   /jules what is the status of my last task?
   ```

2. **Fetch the Jules branch**
   ```powershell
   git fetch origin
   ```

3. **Check out and test locally**
   ```powershell
   git checkout jules/[branch-name]    # Jules names branches automatically
   cd web
   npm run build
   npm test
   ```

4. **If build/tests pass → merge**
   - Use GitHub MCP: create review + merge
   - Or via GitHub UI: approve PR → Squash & Merge

5. **Pull master + verify**
   ```powershell
   git checkout master
   git pull origin master --ff-only
   ```

6. **Run verification pyramid**
   ```
   /verify-pyramid
   ```

7. **Deploy if affected**
   ```
   /deploy-changed
   ```

8. **Update deployment log**
   - Update `docs/deployments.md` with Jules PR reference
