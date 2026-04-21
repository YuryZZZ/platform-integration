# Starter Kit - Quick Start

> Copy this folder to start a new project in under 5 minutes.

## Fastest Path

If you have the full `platform-integration` repo on disk, run `start.bat` from the repo root. It copies this starter kit, adds the reference docs, and prepares a clean project folder automatically.

## Manual Usage

```powershell
# 1. Copy this folder to your new project location
Copy-Item -Recurse .\starter-kit C:\Projects\my-new-project

# 2. Go there
cd C:\Projects\my-new-project

# 3. Run the initializer
.\init.ps1

# 4. Install frontend if the template has not already been materialised
cd web
npx -y create-next-app@latest ./ --typescript --eslint --app --src-dir=false --import-alias="@/*" --use-npm --yes
cd ..

# 5. Build and deploy
cd web
npm run build
cd ..
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID

# 6. Install the validator
cd ui
npm install
npx playwright install chromium
node validate-parallel.js --url https://YOUR_PROJECT_ID.web.app
cd ..

# 7. Push to GitHub
git add -A
git commit -m "feat: initial project"
git push -u origin master
```

## What's Inside

```text
starter-kit/
|-- init.ps1
|-- firebase.json
|-- .firebaserc
|-- .github/workflows/
|-- .agents/workflows/
|-- docs/
|-- specs/TASK.md
|-- functions/api-gateway/
|-- ui/
|-- web/
`-- scripts/
```

## Parallel Validator

The `ui/validate-parallel.js` script validates all defined routes in parallel.

```powershell
node validate-parallel.js --url https://mysite.web.app
node validate-parallel.js --url https://mysite.web.app --workers 10
node validate-parallel.js --url https://mysite.web.app --headed
```

Output is written to `ui/screenshots/` plus `validation_report.json`.

## Full Guides

- Generated project reference: `reference/INDEX.md`
- Full walkthrough: `../NEW_PROJECT_GUIDE.md`
