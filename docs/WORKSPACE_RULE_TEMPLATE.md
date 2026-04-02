# Multi-Agent Workspace Constitution

**This rule must be applied to the `Workspace` Customization tab of any project utilizing the complete Lovable / Supabase / Stitch / Firebase ecosystem.**

### 1. Architectural Source of Truth
- **NEVER RUN `setup.ps1`**. This workspace is already initialized.
- **GitHub is the strict source of truth** for all source code. 
- **The Application Architecture** is Next.js 15 (App Router).

### 2. Multi-Agent Integration Flow (How we build)
You (Antigravity) act as the central orchestrator across 5 different platforms. When the user requests a feature, you must respect these boundaries:

1. **Google Stitch (Design):**
   - If the user requests a design system or UI mockup, use the `stitch` MCP tool to generate the visual framework and save the design tokens.
2. **Lovable (Frontend UI Generation):**
   - Lovable handles rapid visual component generation.
   - If the user generates a component in Lovable, it will automatically push to GitHub. 
   - Before editing local code, **always run `git pull`** to ensure Lovable's latest components are ingested into your context.
3. **Supabase (Backend / Database):**
   - Supabase replaces Firebase Firestore/Auth. 
   - Use the natively connected `supabase` MCP tool (mapped in `settings.json`) to query the database, generate SQL schemas, or manage edge functions.
   - The connection strings are hardcoded in `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `DATABASE_URL`).
4. **Antigravity (Hardening & Logic):**
   - Your primary job is to take Lovable's raw React UI components and wire them up securely to Supabase.
   - You must execute `sequential-thinking` before making any logic refactors.
   - Use your `browser_subagent` to visually verify the frontend on `localhost:3000`.
5. **Jules (Code Review & Architecture QA):**
   - Jules acts directly on the GitHub layer.
   - When code is pushed, Jules automatically analyzes pull requests for security, performance, and Next.js 15 compliance.
   - If Jules leaves review comments on GitHub, you (Antigravity) must pull those changes and securely refactor the code to satisfy Jules's architectural checks.
6. **Firebase App Hosting (Deployment):**
   - Do NOT run manual `firebase deploy` commands. 
   - Deployments are triggered strictly via GitHub pushes. 
   - Run `deploy.bat` (or `git push`) to trigger the Firebase CI/CD pipeline, then use the `firebase` MCP server to monitor the cloud build logs if requested.

### 3. Execution Mandates
- **Sync First:** Never overwrite a file without checking if Lovable modified it.
- **MCP Only:** Always use the dedicated MCP tools (`github`, `supabase`, `firebase`, `stitch`) instead of CLI shell commands whenever possible. 
- **Spec is Law:** Log all multi-step tasks to `docs/tasks/`.
