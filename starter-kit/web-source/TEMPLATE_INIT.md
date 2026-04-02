# 🚀 TEMPLATE_INIT — Start Here

> This is the **single source of truth** for spinning up a new web project from the Portals template.
> Follow these steps in order. The whole process takes ~10 minutes.

---

## Step 0: Understand the Model

```
┌──────────────────────────┐        clone         ┌───────────────────────────────┐
│   Global Template        │ ──────────────────►  │   Instantiated Project        │
│   (Portals/Design)       │                       │   (my-client-portal)          │
│                          │                       │                               │
│  • Never edit directly   │     log:feedback      │  • Customize freely           │
│    from a project         │ ◄──────────────────  │  • Log fixes back             │
│  • Source of truth        │                       │  • Deploy independently       │
└──────────────────────────┘                       └───────────────────────────────┘
```

**Golden Rule:** When working on an instantiated project, never push changes back to the global template files directly. Use `npm run log:feedback "description"` to record improvements, then a template maintainer reviews and backports them.

---

## Step 1: Clone & Rename

```powershell
# Clone the master template
git clone https://github.com/YuryZZZ/nexus-ai-platform.git my-project-name
cd my-project-name

# Disconnect from the template origin, point to your own repo
git remote remove origin
git remote add origin https://github.com/YOUR-ORG/my-project-name.git
git push -u origin master
```

---

## Step 2: Run the Init Script

```powershell
.\scripts\init.ps1 -ProjectName "Acme Portal" -PrimaryColor "#6366f1" -Domain "acme.com"
```

This script will:
- ✅ Update `package.json` name and description
- ✅ Update `next.config.ts` metadata
- ✅ Set the primary brand color in `globals.css`
- ✅ Copy `.env.example` → `.env.local` (ready to fill in keys)
- ✅ Seed the first template-feedback log entry

---

## Step 3: Configure Environment Variables

Open `.env.local` and fill in the minimum required for local dev:

```bash
# Minimum required for local dev (no backend):
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3001

# Add services as you need them:
# GOOGLE_GENERATIVE_AI_API_KEY=
# FIREBASE_PROJECT_ID=
# GITHUB_TOKEN=
```

See `.env.example` for the full list of all supported variables with documentation.

---

## Step 4: Install & Run

```powershell
npm install
npm run dev        # → http://localhost:3001
npm run build      # Verify production build is clean (Exit code 0)
```

---

## Step 5: Customise Your Brand

Work through this checklist in order:

### 5a. Identity
- [ ] Replace `Nexus AI` text in `src/app/(marketing)/page.tsx` with your product name
- [ ] Replace tagline and hero copy
- [ ] Update `src/app/layout.tsx` metadata (title, description, OG tags)
- [ ] Update `public/logo.svg` (or swap for a PNG)

### 5b. Colors
- [ ] Open `src/app/globals.css`
- [ ] Change `--color-primary` (line ~30) to your brand hex
- [ ] Optionally adjust `--color-bg` (dark base) and `--color-surface`

### 5c. Navigation
- [ ] Edit `src/components/layout/Navbar.tsx` — update nav links and CTA label
- [ ] Edit `src/components/layout/Footer.tsx` — update footer links and company name

### 5d. Pages
- [ ] `pricing/page.tsx` — update plan names, prices, features
- [ ] `about/page.tsx` — update company story and team
- [ ] `contact/page.tsx` — update email/phone and office details
- [ ] Delete pages you don't need (e.g., remove `/surfaces` if not a multi-surface product)

### 5e. Google Stitch Design System (Optional)
If you have a Stitch project with custom design tokens:
```
In Antigravity chat: "Fetch the design tokens from Stitch project [PROJECT_ID] and sync them to globals.css"
```

---

## Step 6: Connect Services

Enable services as you need them:

### Firebase (Auth + Database)
```bash
# In your Firebase Console: create project, enable Auth and Firestore
firebase login
firebase init hosting --project YOUR_FIREBASE_PROJECT_ID
```

### Vercel (Hosting)
```bash
vercel --prod
```

### Google Cloud Run
```bash
# Uses cloudbuild.yaml — trigger via GitHub push or manually:
gcloud builds submit --config cloudbuild.yaml
```

---

## Step 7: Set Up AI Agent Workflows

The `.agents/workflows/` directory contains ready-to-use Antigravity slash commands.

Key ones for website development:
- **`/github-sync`** — Pull latest template improvements
- **`/master-flow`** — Full pipeline from Lovable design to production
- **`/template-feedback`** — When you fix a bug, record it!

---

## Step 8: Configure Stitch Design System

If you want AI-generated screen designs for new pages:
1. Create a project in [Google Stitch](https://stitch.withgoogle.com)
2. Note the `projectId`
3. Tell Antigravity: *"Generate a [page type] screen in Stitch project [ID] using our brand colors"*

---

## 🔁 Ongoing: Feedback Loop

Every time you fix something in this instantiated project:

```bash
git commit -m "fix: my fix description"
npm run log:feedback "My fix description — reason it should be in the template"
```

The log in `.template-feedback/` will capture the exact diff and intent. Periodically, a template maintainer (or Antigravity) reviews these and backports them to the global `Portals/Design` repo.

---

## 📋 Checklist Summary

```
[ ] Clone & disconnect from template origin
[ ] Run init.ps1 with your project name and color
[ ] Fill .env.local with your keys
[ ] npm install && npm run dev (verify it runs)
[ ] npm run build (verify Exit code 0)
[ ] Update hero copy and brand name
[ ] Update primary color in globals.css
[ ] Update navigation links
[ ] Connect Firebase / Vercel / Cloud Run
[ ] Create first Stitch design project
[ ] Make your first log:feedback entry
[ ] Push to your own GitHub
```

---

*Template maintained by YuryZZZ / Antigravity. See [README.md](./README.md) for overview.*
