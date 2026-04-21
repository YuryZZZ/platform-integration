# Prompt to Portal — End-to-End Walkthrough

> Linear flow from "I have an idea" to "here is the live URL".
> This walkthrough supports both the Lovable path and the Stitch plus Antigravity path.

---

## Two Primary Paths

### Path A: Lovable Flow

```text
IDEA -> LOVABLE -> GITHUB -> ANTIGRAVITY -> FIREBASE -> LIVE URL
```

### Path B: Stitch + Antigravity Flow

```text
IDEA -> ANTIGRAVITY
     -> STITCH
     -> JULES (optional heavy work)
     -> FIREBASE
     -> LIVE URL
```

---

## Step 0: Bootstrap A New Project Folder

Do this first.

```powershell
cd C:\path\to\platform-integration
.\start.bat
```

`start.bat` creates a generated project folder based on the framework starter kit and copies the reusable docs into `reference/`.

Then continue inside the generated project:

```powershell
cd C:\path\to\your-new-project
.\init.ps1
```

### Resulting Structure

```text
my-project/
|-- init.ps1
|-- docs/
|-- functions/
|-- reference/
|-- starter files
|-- ui/
`-- web/
```

`DESIGN.md` and `PROJECT_SPEC.md` are the source of truth for all agents and should be filled before large-scale generation.

---

## Step 0.5: Research

Use Antigravity to analyze a competitor or reference site and produce market intelligence that feeds `DESIGN.md`.

---

## Step 0.7: Generate Assets

Generate hero images and visual assets against the design rules in `DESIGN.md`.

---

## Path A: Lovable

### Step 1: Prototype in Lovable

Create the initial UI in [Lovable](https://lovable.dev).

### Step 2: Sync to GitHub

Connect Lovable to the target repository and let it open a branch or PR.

### Step 3: Extend in Antigravity

Pull the changes locally and replace mock data with live integrations.

```powershell
git fetch origin master
git pull origin master --ff-only
```

### Step 4: Deploy

```powershell
cd web
npm run build
cd ..
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

---

## Path B: Stitch + Antigravity

### Step 1: Generate UI with Stitch

Use Stitch to establish screens and design identity.

### Step 2: Lock Design Tokens

Generate `DESIGN.md` from the Stitch work.

### Step 3: Scaffold Code in Antigravity

Build components and logic from the design contract.

### Step 3.5: Use Jules For Heavy Work

Dispatch long-running migrations, audits, or broad refactors asynchronously when local IDE flow would otherwise block.

### Step 4: Push And Deploy

```powershell
git add -A
git commit -m "feat: initial portal"
git push origin master
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

---

## Step 4.5: QA Audit

Run accessibility, SEO, and performance checks before final verification.

---

## Step 5: Verification

Use Playwright or Antigravity browser validation against the live URL.

Typical path:

```powershell
cd ui
node validate-parallel.js --url https://YOUR_PROJECT_ID.web.app
```

---

## Quick Comparison

| Feature | Lovable Flow | Stitch Flow |
| --- | --- | --- |
| Starting point | Visual prototyping | Design-system-driven generation |
| Code generation | Lovable cloud flow | Antigravity local generation |
| GitHub integration | Direct sync | Local git flow |
| Heavy backend work | usually local after sync | local plus optional Jules |
| Deploy target | Firebase or other host | Firebase or Cloud Run |

---

## Rule For This Framework

No step in this document should require a specific username, machine path, live project id, or secret from the original author environment.
