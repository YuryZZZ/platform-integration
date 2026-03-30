---
description: The complete "One Interface" master workflow for Antigravity, orchestrating Lovable, GitHub, Jules, and Firebase in a single chat.
---

# The "One Interface" Master Flow

> This workflow file contains the exact commands and agent prompts to execute the full lifecycle entirely from the Antigravity chat window.

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

## Step 4: Verify Locally (Playwright / Antigravity)

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

## Step 5: Go Live (Firebase Hosting)

**When to use:** The app looks perfect locally and you are ready to publish it to a global URL.

**Terminal Command:**
```powershell
# Build and Deploy
npm run build && npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID

# Commit the final wired integration
git add -A && git commit -m "feat: wired Lovable UI to live Firebase backend" && git push origin master
```
*Your code is safely on GitHub, and your app is live for users worldwide.*
