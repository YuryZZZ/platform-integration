# Starter Kit — Quick Start

> **Copy this folder to start a new project in < 5 minutes.**

## Usage

```powershell
# 1. Copy this folder to your new project location
Copy-Item -Recurse docs/platform-integration/starter-kit C:\Projects\my-new-project

# 2. Go there
cd C:\Projects\my-new-project

# 3. Run the initializer (fills in all placeholders, creates GCP project, enables APIs)
.\init.ps1

# 4. Install frontend
cd web && npx -y create-next-app@latest ./ --typescript --eslint --app --src-dir=false --import-alias="@/*" --use-npm --yes && cd ..

# 5. Configure static export
# Edit web/next.config.ts: add output: "export"

# 6. Build & deploy
cd web && npm run build && cd ..
npx firebase-tools deploy --only hosting

# 7. Install test runner
cd ui && npm install && npx playwright install chromium && cd ..

# 8. Validate all pages in parallel
cd ui && node validate-parallel.js --url https://YOUR_PROJECT_ID.web.app

# 9. Push to GitHub
git add -A && git commit -m "feat: initial project" && git push -u origin master
```

## What's Inside

```
starter-kit/
├── init.ps1                          # One-click project initializer
├── firebase.json                     # Firebase Hosting config
├── .firebaserc                       # Firebase project alias
├── .github/workflows/deploy.yml      # CI/CD pipeline
├── .agents/workflows/deploy-changed.md  # Antigravity workflow
├── docs/
│   ├── PROJECT_SPEC.md               # Spec template
│   ├── CURRENT_STATUS.md             # Status template
│   └── deployments.md                # Deploy log
├── specs/TASK.md                     # Task tracker
├── functions/api-gateway/            # Backend template
│   ├── main.py                       # FastAPI app
│   ├── requirements.txt
│   ├── Dockerfile
│   └── deploy.ps1                    # Cloud Run deploy script
├── ui/
│   ├── package.json                  # Test runner config
│   └── validate-parallel.js          # PARALLEL page validator (6 workers)
├── web/                              # Frontend (run create-next-app here)
└── scripts/                          # Data pipeline scripts
```

## Parallel Validator

The `ui/validate-parallel.js` runs ALL pages simultaneously:

```powershell
# Validate with 6 parallel browsers (default)
node validate-parallel.js --url https://mysite.web.app

# Use more workers for more pages
node validate-parallel.js --url https://mysite.web.app --workers 10

# Debug mode (shows browsers)
node validate-parallel.js --url https://mysite.web.app --headed
```

Output: screenshots in `ui/screenshots/` + `validation_report.json`

## Full Guide

See [NEW_PROJECT_GUIDE.md](../NEW_PROJECT_GUIDE.md) for the detailed A-to-Z walkthrough.
