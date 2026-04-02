# START HERE

> **One folder to copy. Two bat files to run. That's it.**

---

## New Project — 3 Steps

```
1. Copy starter-kit\  to your new project folder
   (web-source\ is already inside — 1MB, no node_modules)

2. Double-click setup.bat
   Answer 4 questions. Everything else is automatic.

3. When ready to go live — double-click deploy.bat
   TypeScript check → build → git push → Firebase auto-deploys
```

---

## setup.bat — What It Asks (4 questions only)

```
Brand color?    #E8A020
Phone?          0800 530 0853
Email?          info@yoursite.co.uk
Domain?         yoursite.co.uk
```

## setup.bat — What It Does Automatically

| Step | Action |
|------|--------|
| Detect | Project name from folder name |
| Detect | Firebase ID = folder name (lowercase) |
| Create | `web\` from `web-source\` (1MB clean copy) |
| Compute | 4 brand colors from your 1 hex input |
| Replace | All `<<PLACEHOLDER>>` in 200+ files |
| Create | `web\.env.local` with Google AI key pre-filled |
| Update | `globals.css`, `brand-overrides.css`, `.lovable\system.md` |
| Install | npm install in `web\` |
| Create | GitHub repo via API |
| Push | git init + first commit + push |
| Open | 5 browser tabs: GitHub, Stitch, Lovable, Jules, Firebase |

---

## After setup.bat — One-Time Browser Setup (5 min)

| Tab | Action |
|-----|--------|
| **GitHub** | Settings → Secrets → add `FIREBASE_SERVICE_ACCOUNT` |
| **Stitch** | Create project → enter brand color |
| **Lovable** | Connect GitHub → select your repo |
| **Jules** | Get API key → add to `web\.env.local` |
| **Firebase** | Enable App Hosting → connect GitHub repo |

---

## Building the Site

```
cd web
npm run dev           → localhost:4000

Edit page.tsx         → replace content with your company info
Drop images in public\  → hero.png, team.png, service photos
```

---

## Deploying — ONE click

```
Double-click deploy.bat

It does:
  1. TypeScript check (0 errors)
  2. Build verify (must pass)
  3. git push → Firebase auto-deploys
  4. Opens Firebase console to watch
```

**Live in 2-3 minutes. No Firebase CLI. No manual steps.**

Site URL: `https://your-project-id.web.app`

---

## What's in This Folder

```
starter-kit\
├── setup.bat          ← Run first (one-time project setup)
├── deploy.bat         ← Run to deploy (every time)
├── START_HERE.md      ← This file
│
├── web-source\        ← Clean Nexus web app (1MB, no node_modules)
│   ├── src\app\       ← Edit page.tsx, globals.css, brand-overrides.css
│   ├── src\components\blocks\  ← READ-ONLY (Nexus framework)
│   ├── public\        ← Your images go here
│   └── package.json   ← npm install runs automatically
│
├── .agents\workflows\ ← master-flow, jules-dispatch, verify-pyramid, deploy-changed
├── docs\              ← Jules, Stitch, Lovable, GitHub integration guides
├── .lovable\system.md ← Auto-filled by setup.bat
├── .github\workflows\ ← CI/CD (auto-deploy on git push)
├── firebase.json      ← Firebase Hosting config
└── .gitignore         ← .env.local excluded (never committed)
```

---

## Rules

- **Never commit `.env.local`** — API keys, always gitignored
- **Never edit** `web\src\components\blocks\` — Nexus READ-ONLY
- **Brand color** → `globals.css` (`--color-primary` only) + `brand-overrides.css`
- **Always run deploy.bat** — not git push manually (it verifies first)
