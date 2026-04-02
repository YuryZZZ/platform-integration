---
description: How to record an action/bugfix so it can be backported to the global template.
---
# Template Feedback Workflow

The `Portals/Design` project (and other generated projects) serves as an instantiation of our "global files" template. To maintain the global Files, the AI agent must never change the global template blindly if assigned to a specific project. 

Instead, whenever you (the AI agent or User) implement a feature, fix a bug, or improve the architecture in the instantiated project, you must record this change so that the global template maintainers can incorporate it into the root "global template".

## Steps to run this workflow

1. Commit your changes locally to the instantiated project using `git commit`. 
2. Execute the logging debugging engine by running:
   ```bash
   npm run log:feedback "Short description of the fix or feature"
   ```
   *Note: This script will capture the git diff (either the working tree diff or the exact diff of the last commit) and save it to `.template-feedback/<timestamp>-description.md`.*
3. Open the newly generated markdown file in `.template-feedback/` and briefly fill out the `## Intent` section, explaining **why** this change should be applied to the global template.
4. Notify the user that the action has been recorded in the tuning/debugging engine.
