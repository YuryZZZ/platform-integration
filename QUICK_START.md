# Quick Start: New Project Setup

> Full stack: **Nexus UI → Antigravity → Jules → Firebase**
> From zero to live in < 2 hours.

---

## Prerequisites

- [ ] **Node.js** 18+ → `node --version`
- [ ] **Git** configured → `git config user.name`
- [ ] **Google Cloud SDK** → `gcloud --version`
- [ ] **Firebase CLI** → `npm install -g firebase-tools`
- [ ] **Antigravity IDE** installed
- [ ] **Jules API key** (optional but recommended) → https://jules.google.com → Settings → API Keys
- [ ] **Jules GitHub App** installed on your repo → https://github.com/apps/jules-by-google

---

## Step 1: Authenticate Everything (5 min)

```powershell
# 1. Google Cloud
gcloud auth login
gcloud auth application-default login

# 2. Firebase
firebase login

# 3. GitHub (verify SSH)
ssh -T git@github.com
# If fails: ssh-keygen -t ed25519 && cat ~/.ssh/id_ed25519.pub
# Add the key at https://github.com/settings/keys

# 4. Verify auth
gcloud config list --format="value(core.project)"
firebase projects:list
```

---

## Step 2: Create GitHub Repository (2 min)

```powershell
mkdir my-new-project && cd my-new-project
git init
git branch -M master

# Create initial structure
mkdir -p web/app functions docs/tasks docs/platform-integration ui .agents/workflows .github/workflows specs
```

---

## Step 3: Create GCP + Firebase Project (3 min)

```powershell
# Option A: Create new GCP project + Firebase
gcloud projects create my-project-id --name="My Project"
firebase projects:addfirebase my-project-id

# Option B: Use existing GCP project
firebase projects:addfirebase <EXISTING_PROJECT_ID>

# Register a web app
firebase apps:create WEB "my-dashboard" --project <PROJECT_ID>
```

---

## Step 4: Initialize Firebase Hosting (2 min)

```powershell
# Create firebase.json
@'
{
  "hosting": {
    "public": "web/out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
'@ | Set-Content firebase.json

# Create .firebaserc
@'
{
  "projects": {
    "default": "<PROJECT_ID>"
  }
}
'@ | Set-Content .firebaserc
```

---

## Step 5: Create Next.js Frontend (5 min)

```powershell
cd web
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm

# Configure for static export
@'
import type { NextConfig } from "next";
const nextConfig: NextConfig = { output: "export" };
export default nextConfig;
'@ | Set-Content next.config.ts

# Build
npx next build
```

---

## Step 6: Deploy to Firebase (1 min)

```powershell
cd ..
npx firebase-tools deploy --only hosting --project <PROJECT_ID>

# Visit: https://<PROJECT_ID>.web.app
```

---

## Step 7: Connect Lovable (3 min)

1. Go to https://lovable.dev → Create project
2. Design your UI components
3. Settings → Integrations → Connect to GitHub
4. Select your repo
5. Lovable creates a PR with UI code
6. Pull, review, merge:
   ```powershell
   git pull origin master
   cd web && npx next build
   cd .. && npx firebase-tools deploy --only hosting
   ```

---

## Step 8: Set Up E2E Testing (3 min)

```powershell
cd ui
npm init -y
npm install playwright

# Create test script (see ../docs/platform-integration/README.md for template)
# Run:
node validate.js
```

---

## Step 9: Set Up Documentation (2 min)

```powershell
# Create status file
echo "# Project Status`n`nLast Updated: $(Get-Date -Format 'yyyy-MM-dd')" > docs/CURRENT_STATUS.md

# Create task tracker
echo "# Tasks`n`n## TASK-001: Initial Setup`n**Status**: ✅ DONE" > docs/tasks/TASK-001.md

# Create deployment log
echo "# Deployments`n`n## $(Get-Date -Format 'yyyy-MM-dd')`n- Initial deploy" > docs/deployments.md
```

---

## Step 10: Push to GitHub (1 min)

```powershell
git add -A
git commit -m "feat: initial project setup with Firebase + Next.js + Lovable"
git remote add origin git@github.com:<USER>/<REPO>.git
git push -u origin master
```

---

## Total Setup Time: ~25 minutes

After these steps, you have:

- ✅ GitHub repo with Next.js frontend
- ✅ Firebase Hosting with auto-deploy
- ✅ Lovable connected for UI design
- ✅ Antigravity IDE ready for coding
- ✅ E2E testing framework
- ✅ Documentation structure
- ✅ Task tracking system
