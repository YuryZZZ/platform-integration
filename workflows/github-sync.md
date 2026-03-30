---
description: Sync local repo with GitHub (pull latest changes)
---

// turbo-all

## GitHub → Local Sync

1. Pull latest from GitHub:

   ```powershell
   git fetch origin master && git pull origin master --ff-only
   ```

2. If pull fails due to local changes, stash and retry:

   ```powershell
   git stash push -m "pre-sync" && git pull origin master --ff-only && git stash pop
   ```

3. Verify sync:
   ```powershell
   git log --oneline -3
   ```

## Background Auto-Sync (Optional)

Start the auto-sync daemon that checks every 30 seconds:

```powershell
Start-Process powershell -ArgumentList "-File scripts/auto-sync.ps1" -WindowStyle Hidden
```

To stop: find the process and kill it.

## Google Stitch Design Sync (Optional)

After pulling, regenerate your design tokens if the Stitch project was updated:

```
"Generate a DESIGN.md from my Stitch project"
```

> See [STITCH_DESIGN.md](../STITCH_DESIGN.md) for full Google Stitch workflow.
