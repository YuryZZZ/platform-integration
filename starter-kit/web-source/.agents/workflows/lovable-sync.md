---
description: How to sync Lovable UI designs to the email_to_cloud repo
---

## Lovable → GitHub Sync Workflow

// turbo-all

### Prerequisites

- Lovable workspace `golden-precision` connected to GitHub
- GitHub repo: `YuryZZZ/email_to_cloud`

### Steps

1. Open Lovable at https://lovable.dev and make UI changes in the `golden-precision` project

2. When ready, click "Connect to GitHub" → select `YuryZZZ/email_to_cloud`

3. Lovable will create a branch/PR. Pull from GitHub:

```powershell
cd c:\Users\yuryz\Documents\GitHub\email_to_cloud
git pull origin master
```

4. Copy relevant Lovable components into the admin UI:

```powershell
# Review what Lovable generated
ls web/src/components/
```

5. Build and verify:

```powershell
cd web && npx next build
```

6. Deploy:

```powershell
cd .. && npx firebase-tools deploy --only hosting --project studio-790024798-53451
```

7. Push:

```powershell
git add -A && git commit -m "feat: integrate Lovable UI updates" && git push origin master
```

### Design Tokens (for Lovable)

Use these in your Lovable project to match the admin UI:

- **Background**: `#0f172a` (slate-900)
- **Cards**: `rgba(255,255,255,0.03)` with `border: rgba(255,255,255,0.06)`
- **Primary**: indigo-500 (`#6366f1`)
- **Accent**: purple-500 (`#a855f7`)
- **Success**: emerald-400 (`#34d399`)
- **Font**: Inter / system-ui
