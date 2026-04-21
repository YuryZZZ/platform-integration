# Quick Start

> Fastest path: clone `platform-integration`, run `start.bat`, then continue inside the generated project with `init.ps1`.

---

## Prerequisites

- Node.js 18+
- Git configured
- Google Cloud SDK installed
- Firebase CLI installed
- Antigravity installed
- Optional: Jules API key and GitHub App access

---

## Step 1: Authenticate the machine

```powershell
gcloud auth login
gcloud auth application-default login
firebase login
```

Optional GitHub SSH verification:

```powershell
ssh -T git@github.com
```

---

## Step 2: Bootstrap a new project from this repo

```powershell
cd C:\path\to\platform-integration
.\start.bat
```

What `start.bat` does:

1. Copies `starter-kit/` into a new project folder.
2. Copies the reusable platform docs into `reference/`.
3. Creates local env placeholders.
4. Personalizes the starter docs with the project name.

---

## Step 3: Initialize the generated project

```powershell
cd C:\path\to\your-new-project
.\init.ps1
```

Optional automation flags:

```powershell
.\init.ps1 -CreateProject -EnableApis -InstallDependencies
```

The initializer now keeps these scopes separate:

- project values: `YOUR_PROJECT_ID`, `YOUR_PROJECT_NAME`, `YOUR_REGION`
- repo values: `YOUR_GITHUB_OWNER`, `YOUR_REPO`
- machine-local values: `YOUR_LOCAL_USER`, PATs, API keys, CLI auth state

`YOUR_LOCAL_USER` is the local Windows account name used by MCP file paths. It is not assumed to match the GitHub owner.

---

## Step 4: Fill local-only config

Update these local files before first deploy:

- `.env.local`
- `web/.env.local`
- `reference/configs/mcp_config.json.reference` copied to your local Antigravity or Gemini MCP config
- `docs/PROJECT_SPEC.md`
- `docs/DESIGN.md`

---

## Step 5: Build and validate

```powershell
cd web
npm install
npm run build
cd ..\ui
npm install
npx playwright install chromium
node validate-parallel.js --url https://YOUR_PROJECT_ID.web.app
```

---

## Step 6: Deploy

```powershell
cd ..
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

If you are using backend services, deploy each one from its own folder:

```powershell
cd functions\api-gateway
.\deploy.ps1
```

---

## Step 7: Use the reference docs only when needed

- `INDEX.md`: repo contract and starting points
- `FRAMEWORK_TEMPLATE.md`: portability rules and second-PC contract
- `NEW_PROJECT_GUIDE.md`: detailed walkthrough
- `AUTH_FLOW.md`: credential model and token handling
- `JULES_INTEGRATION.md`: async delegation flow
- `STITCH_DESIGN.md`: Stitch design workflow

---

## Done When

- The generated project opens in Antigravity
- `init.ps1` completes cleanly
- `.env.local` values are filled
- `npm run build` succeeds
- Hosting deploy succeeds
- No repo-owned file still needs a hardcoded local username or path
