---
description: impact-analysis
---

1. If any packages/** or functions/\_shared/** changed:
2. For each changed package version folder (packages/<pkg>/vX/):
   - Read .consumers; if missing => impacted = ALL functions/\*
3. Output impacted functions list + required verification order (leaf-first if known).
4. Block deploy-changed unless impacted set is verified.
