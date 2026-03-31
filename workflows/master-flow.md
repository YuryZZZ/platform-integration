---
description: The complete "One Interface" master workflow for Antigravity, orchestrating Lovable, GitHub, Jules, and Firebase in a single chat.
---

# The "One Interface" Master Flow

> This workflow file contains the exact commands and agent prompts to execute the full lifecycle entirely from the Antigravity chat window.

## Step 0: Initialize the Project & Open Antigravity

**When to use:** You are creating a brand new application and need to scaffold our enterprise architecture.

**Terminal Command (run in your standard terminal/Command Prompt):**
```powershell
# 1. Clone this master repository
git clone https://github.com/YuryZZZ/platform-integration.git my-new-project

# 2. Enter the starter kit and initialize the project securely
cd my-new-project/starter-kit
./init.ps1

# 3. Open the Antigravity IDE securely
code .  # Or open the folder directly in your Antigravity app
```
*Once Antigravity opens, you will proceed with the rest of the steps exclusively from inside the IDE chat.*

---

## Step 0.5: Competitor Research & Market Intelligence

**When to use:** Before building anything, you want to study what already works in the market. Feed a competitor's live site into the AI so it can analyze their messaging, SEO structure, design patterns, and trust signals — then use that intelligence to build something better.

**Antigravity Prompt:**
```text
"Read the content from https://COMPETITOR-SITE.com/ and analyze it. 
 Produce a Market Intelligence Report covering:
 1. Their messaging hierarchy (headlines, CTAs, value propositions)
 2. SEO structure (heading tags, meta descriptions, keyword density)
 3. Design patterns (hero layout, social proof placement, color scheme)
 4. Trust signals (testimonials, badges, guarantees)
 5. Gaps and weaknesses we can exploit
 Then use this report to inform the DESIGN.md and the initial screen prompts."
```

> **How it works:** Antigravity has a built-in `read_url_content` tool that scrapes any public URL and converts it to markdown. No external API needed.

---

## Step 0.7: Generate Visual Assets

**When to use:** You need hero images, product mockups, brand illustrations, or scroll-animation frames — without Photoshop or stock photos.

**Antigravity Prompt:**
```text
"Generate a hero image for a premium construction management portal. 
 Dark background, isometric 3D view of a modern building site with 
 cranes and safety equipment. Professional, corporate aesthetic 
 matching our DESIGN.md color palette."
```

> **How it works:** Antigravity has a built-in `generate_image` tool. For scroll-bound animations, generate two states (e.g., "before" and "after"), then use a video generation tool to create a transition video.

---

## Step 1: Pull the Visuals (GitHub ← Lovable)

**When to use:** You just finished designing a beautiful new UI layer in Lovable.dev visually, clicked "Connect to GitHub", and need to bring that down to your local machine to add real backend logic.

**Terminal Command:**
```powershell
git fetch origin master && git pull origin master --ff-only
```
*Antigravity will execute this and download your new React components into the `web/src/` directory.*

---

## Step 2: Wire the Brains (Antigravity + Firebase)

**When to use:** Your UI is downloaded, but it relies on fake mock data or Supabase. You need to connect it to your enterprise Google Cloud/Firebase architecture.

**Antigravity Prompt:**
```text
"Review the new React components I just pulled from Lovable in the web/src/ directory. 
 Please rip out all the hardcoded mock data and replace it with real-time listeners 
 using the Firebase v9 SDK. Ensure we are using 'getFirestore()' and 'onSnapshot()' 
 so the dashboard updates live."
```
*Antigravity reads your codebase, imports Firebase, and wires the components securely.*

---

## Step 3: Heavy Lift / Deep Audit (Jules)

**When to use:** You need to refactor massive amounts of code, run a deep security audit, or translate 50 files to TypeScript without freezing your local Antigravity IDE.

**Terminal Command:**
```powershell
/jules "Run a comprehensive security audit on the entire codebase, looking for exposed API keys, XSS vulnerabilities in the Lovable React components, and insecure Firestore rules. If you find any, patch them and submit a Pull Request."
```
*Jules wakes up in a Google Cloud VM, clones your repo, does the 20-minute compute task, and opens a PR on GitHub while you keep working locally on CSS tweaks.*

---

## Step 4: QA Audit — Accessibility & SEO

**When to use:** Before deploying, run an automated quality audit that catches accessibility violations, SEO gaps, and UI/UX issues.

**Antigravity Prompt:**
```text
"Run a comprehensive QA audit on the entire codebase:
 1. ACCESSIBILITY: Scan all components for missing ARIA labels, improper 
    heading hierarchy (h1→h2→h3), missing alt text on images, and 
    insufficient color contrast ratios. Fix all issues automatically.
 2. SEO: Verify every page has a unique <title>, meta description, 
    canonical URL, and proper Open Graph tags. Fix any gaps.
 3. PERFORMANCE: Check for images without lazy loading, unoptimized 
    fonts, and render-blocking scripts. Fix automatically.
 Report what was found and what was fixed."
```

---

## Step 5: Verify Locally (Playwright / Antigravity)

**When to use:** Before deploying, you want to make sure the app actually runs and the Firebase connection works.

**Terminal Command:**
```powershell
# Start the local server
npm run dev
```

**Antigravity Prompt:**
```text
"Navigate the browser to http://localhost:3000. Take a screenshot of the login 
 page to verify the Lovable UI looks correct, and check the browser console to 
 ensure there are no Firebase database permission errors."
```

---

## Step 6: Go Live (Firebase Hosting / App Hosting)

**When to use:** The app looks perfect locally and you are ready to publish it to a global URL.

**Terminal Command:**
```powershell
# Build and Deploy
npm run build && npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID

# Commit the final wired integration
git add -A && git commit -m "feat: wired Lovable UI to live Firebase backend" && git push origin master
```
*Your code is safely on GitHub, and your app is live for users worldwide.*
