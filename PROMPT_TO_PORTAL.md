# Prompt to Portal — End-to-End Walkthrough

> **Purpose**: The complete, linear flow from "I have an idea" to "here's your live URL".
> Follow these steps in order. Each step produces an artifact that feeds the next.
>
> **Time**: ~30 minutes for a new project, ~10 minutes for a new screen on an existing project.

---

## The Flow at a Glance

```
 IDEA → STITCH → DESIGN.md → ANTIGRAVITY → GITHUB → FIREBASE → LIVE URL
  (1)     (2)       (3)          (4)          (5)       (6)        (7)
```

---

## Step 1: Define Your Idea (2 min)

Write a plain-English prompt describing what you want to build.

**Example prompts:**
```
"A construction document management portal with login, project list,
 PDF viewer with annotations, and real-time collaboration."
```

```
"A dashboard for monitoring GCP costs with charts, alerts, and
 a drill-down by service."
```

> **Tip**: Be specific about the screens you need. Each screen becomes a
> Stitch design → a React component → a route in your app.

---

## Step 2: Generate UI in Google Stitch (5 min)

Open Stitch and create your designs from the prompt.

### Option A: Via Antigravity (recommended)
```
"Create a new Stitch project called 'My Portal' and generate screens for:
 1. Login page with Google auth
 2. Dashboard with KPI cards and sidebar nav
 3. Project list with search and filters
 4. Document viewer with PDF annotations"
```

This calls the Stitch MCP tools automatically:
- `create_project` → creates the Stitch project
- `create_design_system` → sets colors, fonts, shapes
- `generate_screen_from_text` → generates each screen

### Option B: Via Stitch web UI
1. Go to [stitch.google.com](https://stitch.google.com)
2. Create a new project
3. Set your design system (colors, fonts, corner radius)
4. Generate screens from prompts

**Output**: A Stitch project with screens and a design system.

---

## Step 3: Generate DESIGN.md (2 min)

Extract the design tokens from Stitch into a machine-readable file that
locks all future code generation to your visual identity.

```
"Generate a DESIGN.md from my Stitch project"
```

This activates the `design-md` skill, which:
1. Reads your Stitch project's design system via MCP
2. Extracts colors, typography, spacing, shapes, states
3. Writes `docs/DESIGN.md` to your repo

**Output**: `docs/DESIGN.md` — your design system source of truth.

> If you don't use Stitch, create DESIGN.md manually from the
> [template](./starter-kit/docs/DESIGN.md).

---

## Step 4: Scaffold Code in Antigravity (10 min)

Now Antigravity generates production code that follows your design system.

### 4a. Initialize the project (first time only)
```powershell
# Clone the starter kit
git clone https://github.com/YuryZZZ/platform-integration.git
cd platform-integration/starter-kit
./init.ps1
```

### 4b. Generate React components from Stitch screens
```
"Scaffold React components from the DESIGN.md for all screens
 in my Stitch project. Use the react-components skill."
```

This activates the `react-components` skill, which:
1. Reads `docs/DESIGN.md` for visual constraints
2. Reads each Stitch screen for layout and content
3. Generates React + CSS components matching the design
4. Creates route files for each screen

### 4c. Add backend logic
```
"Create a Firebase auth login flow for the Login screen.
 Use Firestore for the project list data.
 Add real-time listeners for the document viewer."
```

### 4d. Verify locally
```powershell
npm run dev
# Opens at http://localhost:3000
```

**Output**: A working local app with all screens, routes, auth, and data.

---

## Step 5: Push to GitHub (1 min)

```powershell
git add -A
git commit -m "feat: initial portal with Stitch designs"
git push origin master
```

**Output**: Code on GitHub, ready for CI/CD.

---

## Step 6: Deploy to Firebase Hosting (3 min)

```powershell
# Build
npm run build

# Deploy
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

### Alternative: Deploy to Vercel
```powershell
npx vercel --prod
```

> See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for staging branches and edge config.

**Output**: A live URL.

---

## Step 7: Verify the Live Portal (2 min)

Antigravity automatically verifies the deployment:
```
"Navigate to https://your-project.web.app and take a screenshot.
 Check that the login page renders correctly."
```

Or in Antigravity terminal:
```powershell
/verify-pyramid
```

**Output**: Visual confirmation + health check. Your portal is live.

---

## The Complete Map

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  1. IDEA    │    │  2. STITCH  │    │  3. DESIGN  │
│  (Prompt)   │───▶│  (UI Gen)   │───▶│  (DESIGN.md)│
└─────────────┘    └─────────────┘    └──────┬──────┘
                                             │
                                             ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 7. VERIFY   │    │ 6. DEPLOY   │    │ 4. CODE     │
│ (Screenshot)│◀───│ (Firebase/  │◀───│ (Antigravity│
│             │    │  Vercel)    │    │  + Skills)  │
└─────────────┘    └──────┬──────┘    └──────┬──────┘
                          │                  │
                          │           ┌──────┴──────┐
                          │           │ 5. GITHUB   │
                          └───────────│ (Push+CI/CD)│
                                      └─────────────┘
```

---

## Iteration Loop (Adding Screens / Features)

After the initial deploy, adding new screens follows the same flow but faster:

```
"Add a settings page to my Stitch project with user profile,
 notification preferences, and API key management"
```

Then:
1. Stitch generates the screen → `generate_screen_from_text`
2. DESIGN.md stays the same (tokens are locked)
3. Antigravity scaffolds the new component + route
4. `git push` → Firebase auto-deploys (if CI/CD configured)

---

## Lovable Alternative Path

If you start in Lovable instead of Stitch:

```
 IDEA → LOVABLE → GITHUB PR → ANTIGRAVITY → FIREBASE → LIVE
```

1. Design in Lovable (visual drag-and-drop)
2. Lovable creates a GitHub PR with generated code
3. Antigravity pulls the PR, swaps Supabase → Firebase (if needed)
4. Apply DESIGN.md tokens for consistency
5. Deploy

> See [workflows/lovable-sync.md](./workflows/lovable-sync.md) for the full Lovable workflow.

---

## Quick Reference: Which Tool Does What

| Step | Tool | What It Produces |
|------|------|-----------------|
| Idea | You | Natural language prompt |
| UI Design | **Google Stitch** | High-fidelity screens + design system |
| Design Tokens | **design-md skill** | `DESIGN.md` (machine-readable) |
| Code | **Antigravity** | React components, routes, auth, data |
| Backend | **Antigravity** | Firebase/Firestore integration |
| Heavy Refactors | **Jules** | Async PRs from cloud VMs |
| Version Control | **GitHub** | Source of truth + CI/CD |
| Hosting | **Firebase** or **Vercel** | Live URL |
| Verification | **Antigravity + Playwright** | Screenshots + health checks |
