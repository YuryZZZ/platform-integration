# Prompt to Portal — End-to-End Walkthrough

> **Purpose**: The complete, linear flow from "I have an idea" to "here is your live URL".
> This walkthrough covers both **Lovable** (rapid visual iteration) and **Google Stitch** (design-system-driven generation). Follow the path that best fits your project.
>
> **Time**: ~30 minutes for a new project, ~10 minutes for a new screen on an existing project.

---

## Two Primary Paths to Production

Depending on your workflow preference, choose between:

### Path A: The Lovable Flow (Rapid Prototyping)
Best for: Highly visual builders who want instant preview panels, drag-and-drop combined with chat, and deep GitHub two-way synchronization. 
*(Note: Requires using the Lovable web interface).*
```
 IDEA → LOVABLE ↔ GITHUB ↔ ANTIGRAVITY IDE → FIREBASE → LIVE URL
```

### Path B: The "One Interface" Flow (Stitch + Jules + Antigravity)
Best for: Developers who want to stay entirely inside the Antigravity IDE chat without context switching. Antigravity connects to Stitch via MCP for UI, and delegates heavy backend work to Jules VMs via CLI.
```
 IDEA → ANTIGRAVITY (Mission Control) 
          ├─→ STITCH (UI Gen via MCP)
          ├─→ JULES (Heavy Compute via CLI)
          └─→ INCALL (Firebase Deploy via CLI)
```

---

## PATH A: The Lovable Flow (Step-by-Step)

### Step 1: Ideate and Prototype in Lovable (10 min)
1. Go to [lovable.dev](https://lovable.dev).
2. Create a new prompt: *"A dashboard for monitoring GCP costs with charts, alerts, and a drill-down by service."*
3. Lovable will scaffold a complete Vite/React application instantly.
4. Iterate visually using chat commands inside the Lovable web editor.

### Step 2: Push to GitHub via Two-Way Sync (1 min)
Lovable connects directly to GitHub.
1. Click **Connect to GitHub** in the top right of your Lovable project.
2. Select your repository (`YOUR_USER/YOUR_REPO`).
3. Lovable will export the codebase and push a PR (or commit directly to `main`/`master`) containing all generated React code and Tailwind styles.

### Step 3: Pull & Extend in Antigravity IDE (10 min)
Now, bring the visual prototype into your local development environment to add real logic.
```powershell
# 1. Pull Lovable changes
git fetch origin master
git pull origin master --ff-only

# 2. Add real backend logic using your local IDE agent
"Antigravity, review the new Lovable components in web/src/. 
 Replace the mock data in the Cost Dashboard with live Firestore real-time listeners. 
 Add Firebase Auth to the login view."
```

*(Note: If Lovable authored the project using Supabase, you can keep it, or see [lovable-sync.md](./workflows/lovable-sync.md) for how to swap it to Firebase).*

### Step 4: Deploy to Firebase Hosting (3 min)
```powershell
# Build the UI
cd web && npx next build  # (Or Vite: npm run build)

# Deploy to Firebase
cd .. && npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

---

## PATH B: The "One Interface" Flow (Stitch + Jules + Antigravity)

Because Antigravity has terminal access and MCP connections, you can build an entire application without ever leaving this chat window.

### Step 1: Generate UI via Stitch MCP (5 min)
Open Stitch to establish your design identity.
```
"Antigravity, create a new Stitch project called 'My Portal' and generate screens for:
 1. Login page with Google auth
 2. Dashboard with KPI cards"
```
*This invokes Stitch MCP tools: `create_project` → `create_design_system` → `generate_screen_from_text`.*

Alternatively, you can start in the web UI at **[stitch.withgoogle.com](https://stitch.withgoogle.com)**, create your project/screens there, and then continue to Step 2.

### Step 2: Lock the Design Tokens via `DESIGN.md` (2 min)
```
"Antigravity, generate a DESIGN.md from my Stitch project"
```
*This extracts colors, typography, shapes, and structural grids into `docs/DESIGN.md`, ensuring all future code structurally matches the design.*

### Step 3: Scaffold Code in Antigravity (10 min)
```
"Scaffold React components from the DESIGN.md for all screens 
 in my Stitch project. Use the react-components skill."
```
Antigravity automatically respects your `docs/DESIGN.md` limits while building out the components locally.

### Step 3.5: Asynchronous Heavy Lifting with Jules (Optional)
If you need to make massive changes across 50 files (e.g., migrating a database schema, translating the entire app from JavaScript to TypeScript, or running a massive security audit), **do not block your local IDE**. Instead, ask Antigravity to dispatch Jules:

```
"Antigravity, use the terminal to run Jules and have it migrate all my 
 Supabase queries to Firebase across the entire repository."
```
*Antigravity will run `/jules "migrate supabase to firebase..."` in the terminal. Jules spins up an isolated Google Cloud VM, does the 20-minute heavy compute, and submits a Pull Request to your GitHub, while you keep working locally.*

### Step 4: Push and Deploy (3 min)
```powershell
# Commit your newly scaffolded logic
git add -A && git commit -m "feat: initial stitch portal" && git push origin master

# Deploy
npx firebase-tools deploy --only hosting
```

---

## Step 5: Verification (Common Step For Both Paths)

Whether you used Lovable or Stitch, verify your deployment autonomously.

Ask Antigravity:
```
"Navigate to https://your-project.web.app/ in the browser and take a screenshot.
 Check that the login page renders correctly and console errors are absent."
```

Or run the predefined workflow:
```powershell
/verify-pyramid
```

**Output**: Visual confirmation + health check. Your portal is live and ready for users.

---

## Quick Comparison: Which Tool Does What?

| Feature / Step      | Lovable Flow                                      | Stitch Flow                                    |
|---------------------|---------------------------------------------------|------------------------------------------------|
| **Starting Point**  | Visual prototyping environment (`lovable.dev`)      | Conceptual design constraints (`stitch.withgoogle.com`) |
| **Code Generation** | Cloud-native via Lovable's engine                 | Local via Antigravity utilizing `DESIGN.md`    |
| **Version Control** | Two-way GitHub sync (push/pull directly)          | Manual local `git commit / push`               |
| **Design Control**  | Fluid visual tweaks in-browser                    | Deterministic application of tokens             |
| **Backend Integration** | Antigravity IDE (Local)                         | Antigravity (Local) + **Jules (Cloud VMs)**     |
| **Deployment Target** | Vercel, Netlify, Firebase                       | Firebase Hosting, Cloud Run                    |
