---
description: The Definitive Lovable + Supabase Two-Way Sync Architectural Pipeline
---

# Lovable + Supabase Two-Way Sync Pipeline
**DO NOT DEVIATE FROM THIS WORKFLOW.** Lovable enforces a strict 1-way repository creation policy (it cannot adopt existing repositories). To use Lovable while maintaining our Zero-Touch Next.js 15 template, you must execute this inversion sequence exactly as written.

## 1. The Core Limitation
- **Code:** Lovable writes React files. It legally requires storing these files in a GitHub repo that **it creates**. 
- **Database:** Supabase only holds data/auth. Lovable natively points to Supabase.
- **Conflict:** `setup.ps1` zero-touch creates its own Github repo. This makes it impossible to sync to Lovable. 
- **Solution:** We let Lovable generate the Repo and the Supabase instance, and then we force-inject our zero-touch architecture over it.

## 2. The Execution Flow (For Antigravity/Agent)

When a user requests to build a Lovable-connected project, execute these steps:

### Phase 1: User Provisioning
Ask the user to do exactly this:
1. Go to Lovable.dev and click **New Project**.
2. Click **Connect Supabase** to provision the database.
3. Provide the Antigravity Agent with:
   - The **Lovable-generated GitHub Repository URL** (e.g. `https://github.com/YuryZZZ/super-builder-studio.git`)
   - The **Supabase Project URL** (`https://...supabase.co`)
   - The **Supabase ANON Key** (`sb_publishable_...`)
   - The **Supabase Database Password**

### Phase 2: Repository Hijack (Automated)
Once the Agent has the GitHub URL, run this from the local `starter-kit` workspace to overwrite Lovable's blank slate with our 1MB Next.js architecture:
```bash
git remote add lovable <LOVABLE_GITHUB_URL>
git fetch lovable
git push -f lovable master:main
git remote set-url origin <LOVABLE_GITHUB_URL>
git branch -M main
git push -u origin main
```

### Phase 3: Supabase Injection (Automated)
Inject the Supabase keys into the local `.env.local` securely:
```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[YOUR-ID].supabase.co:5432/postgres
```

### Phase 4: CLI Mapping (Automated)
Ensure the local VSCode is bound to Supabase. 
Ensure the user runs `npx supabase login` locally if the token has expired.
```bash
npx supabase init
npx supabase link --project-ref [YOUR-SUPABASE-PROJECT-REF]
```

### Phase 5: MCP Registration (Automated)
Register the Supabase MCP Server in `~/.gemini/settings.json` so Antigravity can query the database directly natively natively:
```json
"supabase": {
  "type": "http",
  "url": "https://mcp.supabase.com/mcp?project_ref=[YOUR-SUPABASE-PROJECT-REF]&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching%2Cstorage",
  "timeout": 60000,
  "trust": true
}
```

## 3. End-State
- **Deployments:** Running `deploy.bat` will now natively push our code straight to the Lovable-linked GitHub repo, instantly updating the Lovable Interface.
- **Workflow:** When Lovable builds a new React component, run `git pull` locally to retrieve it into VSCode.
