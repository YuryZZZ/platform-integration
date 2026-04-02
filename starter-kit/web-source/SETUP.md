# Nexus AI Platform — Quick Replication Guide

> **Repo:** [github.com/YuryZZZ/nexus-ai-platform](https://github.com/YuryZZZ/nexus-ai-platform) (private)  
> **Baseline tag:** `v1.0-starter`  
> **Stack:** Next.js 15.5 · React 19 · PostgreSQL 16 · GLM-4-Plus · Framer Motion

---

## 🚀 Zero to Running in 4 Commands

```bash
git clone https://github.com/YuryZZZ/nexus-ai-platform.git
cd nexus-ai-platform
npm install
cp .env.example .env.local   # then fill in DATABASE_URL, AUTH_SECRET, GLM_API_KEY
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) — Login: **admin** / **admin**

---

## New Website Setup (Platform Reuse)

To spin up this platform for a new website/client:

```powershell
# Creates .env.local, db, site config in one command
.\scripts\new-website.ps1 -Name "Acme Corp" -Slug "acme-corp"
```

This will:
1. Create `.env.local` from template
2. Provision a new PostgreSQL database
3. Save site config to `config/sites/acme-corp.json`
4. Print next steps

---

## 1. Clone & Install

```bash
git clone https://github.com/YuryZZZ/nexus-ai-platform.git
cd nexus-ai-platform
npm install
```

## 2. Database Setup

```bash
# Option A: Use the setup script
npm run db:setup

# Option B: Manual
psql -U postgres -c "CREATE DATABASE nexus_ai;"
psql -U postgres -d nexus_ai -f db/seed_v1_core.sql
```

## 3. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```env
# Required
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nexus_ai
AUTH_SECRET=your-random-secret-32-chars-minimum
AUTH_URL=http://localhost:3001

# AI (GLM-4-Plus — https://open.bigmodel.cn)
GLM_API_KEY=your-glm-api-key

# Integrations (optional)
GITHUB_TOKEN=ghp_...
FIREBASE_PROJECT_ID=your-project-id
LOVABLE_API_KEY=your-lovable-key
```

## 4. Run

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

**Login:** `admin` / `admin`

---

## Integration Setup

### 🔗 GitHub Integration

1. Create a [Personal Access Token](https://github.com/settings/tokens) with `repo` scope
2. Set `GITHUB_TOKEN=ghp_...` in `.env.local`
3. The GitHub adapter at `src/lib/integrations/github.ts` handles:
   - Repository management (create, list, clone)
   - CI/CD pipeline triggers
   - Deployment status tracking
   - Code search across repos

### 🎨 Google Stitch (AI UI Design)

Stitch connects via **MCP server** — no API key needed. It's pre-configured in `~/.gemini/settings.json`.

**Usage:** The Stitch adapter at `src/lib/integrations/stitch.ts` enables:
- AI-powered screen generation from text prompts
- Design variants and iterations
- Export to React/HTML code

### 🔥 Firebase Studio

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable: Authentication, Firestore, Hosting, Cloud Functions
3. Set in `.env.local`:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_API_KEY=AIza...
   ```
4. The adapter at `src/lib/integrations/firebase-studio.ts` provides:
   - Auth (email/password, Google SSO)
   - Firestore real-time data sync
   - Firebase Hosting deployment
   - Cloud Functions management

### 💜 Lovable (AI App Builder)

1. Get API key from [lovable.dev](https://lovable.dev)
2. Set `LOVABLE_API_KEY=your-key` in `.env.local`
3. The adapter at `src/lib/integrations/lovable.ts` enables:
   - AI-powered app scaffolding
   - Component generation
   - Deployment to Lovable hosting

---

## Architecture At a Glance

```
nexus-ai-platform/
├── src/app/
│   ├── (marketing)/     # 15 public pages (homepage, pricing, etc.)
│   ├── (app)/           # 8 app pages (dashboard, chat, workflows, etc.)
│   ├── login/           # Premium glassmorphism login
│   └── api/             # 13 REST endpoints → PostgreSQL
├── src/lib/
│   ├── integrations/    # GitHub, Stitch, Firebase, Lovable adapters
│   ├── knowledge/       # RAG pipeline + full-text search
│   ├── workflow/        # Workflow engine + scheduler
│   └── voice/           # STT + intent classification
├── portable/            # Design system (55+ components, 35+ hooks)
└── db/                  # PostgreSQL seeds + migrations
```

## Restore to Baseline

```bash
git checkout v1.0-starter
```

## Status Check

```bash
# Verify all 13 endpoints
curl http://localhost:3001/api/workflows        # 200
curl http://localhost:3001/api/knowledge        # 200
curl http://localhost:3001/api/settings         # 200
curl http://localhost:3001/api/integrations     # 200
curl http://localhost:3001/api/cms/entries      # 200
curl http://localhost:3001/api/ai/conversations # 200
```
