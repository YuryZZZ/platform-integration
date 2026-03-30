# Vercel Deployment Guide — Alternative to Firebase Hosting

> **Purpose**: Deploy Lovable-generated or Next.js frontends to Vercel's edge network
> as an alternative (or complement) to Firebase Hosting.
>
> **When to use**: Advanced edge caching, SSR requirements, data residency compliance,
> or integration with existing corporate CI/CD pipelines.
>
> **Version**: 1.0.0 | **Last Updated**: 2026-03-30

---

## Table of Contents

1. [Why Vercel?](#1-why-vercel)
2. [Setup](#2-setup)
3. [Configuration](#3-configuration)
4. [Environment Variables](#4-environment-variables)
5. [SPA Routing (vercel.json)](#5-spa-routing-verceljson)
6. [Staging & Branch Strategy](#6-staging--branch-strategy)
7. [OAuth Redirect Whitelisting](#7-oauth-redirect-whitelisting)
8. [Firebase Hosting vs Vercel](#8-firebase-hosting-vs-vercel)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Why Vercel?

| Feature                  | Firebase Hosting       | Vercel                          |
| ------------------------ | ---------------------- | ------------------------------- |
| Static hosting           | ✅                     | ✅                              |
| Edge CDN                 | ✅ (Google CDN)        | ✅ (Vercel Edge Network)        |
| Server-Side Rendering    | ❌ (static export only)| ✅ (native Next.js SSR)         |
| Preview deployments      | ❌                     | ✅ (per-PR ephemeral URLs)      |
| Branch-based deploys     | Limited                | ✅ (automatic per branch)       |
| Edge Functions           | ❌                     | ✅ (Vercel Edge Runtime)        |
| Analytics                | ❌                     | ✅ (Web Vitals, Speed Insights) |
| Custom domain            | ✅                     | ✅                              |
| Zero-config Next.js      | ❌ (needs `output: export`) | ✅ (full SSR support)      |
| Cost (hobby)             | Free tier generous     | Free tier (100 deploys/day)     |

### When to Choose Vercel

- Your app needs **SSR** (Server-Side Rendering) or **ISR** (Incremental Static Regeneration)
- You want **automatic preview deployments** for every PR
- You need **Edge Functions** for middleware (auth, redirects, A/B tests)
- Your team uses the **Vercel CI/CD** ecosystem
- Data residency requirements need specific edge regions

### When to Stay on Firebase Hosting

- Pure static export is sufficient
- Deep integration with Firebase Auth, Firestore, Cloud Functions
- You're already using the Firebase ecosystem end-to-end
- Cost optimization (Firebase free tier is more generous for static)

---

## 2. Setup

### Step 2.1: Import GitHub Repository

1. Go to https://vercel.com/new
2. **Import Git Repository** → select your GitHub repo
3. Authorize the Vercel GitHub App (if not already done)
4. Vercel detects the framework automatically

### Step 2.2: Configure Build Settings

For **Next.js** projects (standard):

| Setting          | Value            |
| ---------------- | ---------------- |
| Framework Preset | Next.js          |
| Build Command    | `npm run build`  |
| Output Directory | Auto-detected    |
| Node.js Version  | 22.x             |

For **Lovable-generated React/Vite** projects:

| Setting          | Value            |
| ---------------- | ---------------- |
| Framework Preset | Vite             |
| Build Command    | `npm run build`  |
| Output Directory | `dist`           |
| Node.js Version  | 22.x             |

### Step 2.3: Deploy

Click **Deploy**. Vercel builds and deploys automatically.

Your site is live at: `https://your-project.vercel.app`

---

## 3. Configuration

### Next.js (SSR Mode — No Static Export Needed)

If deploying to Vercel, you can **remove** the static export config:

```typescript
// web/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove: output: "export"
  // Vercel supports full SSR natively
};

export default nextConfig;
```

> **Note**: If you keep `output: "export"`, Vercel deploys as static — same as Firebase.
> Removing it unlocks SSR, API routes, and middleware.

### Lovable/Vite Projects

No special config needed. Vercel auto-detects Vite and uses the `dist/` output.

---

## 4. Environment Variables

### Migrating from Firebase/Lovable to Vercel

All environment variables stored in Lovable Cloud Secrets or local `.env` files must be
replicated in the Vercel dashboard.

**Vercel Dashboard** → Project → Settings → **Environment Variables**

| Variable Name                    | Value                                  | Environment     |
| -------------------------------- | -------------------------------------- | --------------- |
| `VITE_FIREBASE_API_KEY`          | `AIzaSy...`                            | Production      |
| `VITE_FIREBASE_AUTH_DOMAIN`      | `project.firebaseapp.com`              | Production      |
| `VITE_FIREBASE_PROJECT_ID`       | `studio-790024798-53451`               | Production      |
| `VITE_FIREBASE_STORAGE_BUCKET`   | `project.firebasestorage.app`          | Production      |
| `VITE_FIREBASE_MESSAGING_ID`    | `180289271561`                         | Production      |
| `VITE_FIREBASE_APP_ID`           | `1:180289271561:web:...`               | Production      |
| `VITE_SUPABASE_URL`             | (if using Supabase)                    | Production      |
| `VITE_SUPABASE_ANON_KEY`        | (if using Supabase)                    | Production      |
| `NEXT_PUBLIC_API_URL`           | `https://api-gateway-....run.app`       | Production      |

### Environment Scoping

Vercel supports per-environment variables:

| Scope          | When Used                  |
| -------------- | -------------------------- |
| **Production** | Main branch deploy         |
| **Preview**    | PR/branch preview deploys  |
| **Development**| `vercel dev` local server  |

> **Tip**: Use different API URLs for Preview (staging backend) vs Production (live backend).

---

## 5. SPA Routing (vercel.json)

### The Problem

Lovable generates React apps with client-side routing (`react-router` / `BrowserRouter`).
Direct navigation to `/dashboard` returns a **404** because no physical `dashboard.html` exists.

### The Fix

Create `vercel.json` in the repository root:

```json
{
  "rewrites": [
    {
      "source": "/((?!api|_next|static|favicon\\.ico).*)",
      "destination": "/index.html"
    }
  ]
}
```

This tells Vercel's edge network to serve `index.html` for all routes, letting React Router
handle routing client-side.

### For Next.js Apps

If using Next.js with page-based routing (not SPA), you typically **don't need** `vercel.json`.
Vercel handles Next.js routing automatically. Only add it for custom rewrites:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://api-gateway-nrlzg5ezsa-uc.a.run.app/api/:path*" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

---

## 6. Staging & Branch Strategy

### The Problem

Deploying directly from `main` to production is dangerous — experimental AI-generated code
(from Lovable or Jules) goes live immediately.

### The Solution: Branch-Based Deploys

```
lovable-dev (Lovable pushes here)
    │
    ▼
Vercel Preview Deploy  ← Ephemeral staging URL (auto-generated)
    │                     e.g., my-app-git-lovable-dev.vercel.app
    │
    │  (Manual review + testing)
    │
    ▼
Pull Request → main
    │
    ▼
Vercel Production Deploy ← https://my-app.vercel.app
```

### Step-by-Step Setup

#### 1. Create Feature Branch

```powershell
git checkout -b lovable-dev
git push -u origin lovable-dev
```

#### 2. Configure Lovable to Push to Feature Branch

In Lovable → Project Settings → GitHub → **Branch**: `lovable-dev`

#### 3. Configure Vercel

**Vercel Dashboard** → Project → Settings → **Git**:

| Setting                              | Value                            |
| ------------------------------------ | -------------------------------- |
| Production Branch                    | `main` (or `master`)            |
| Preview Branches                     | All (default)                    |
| Auto-deploy Production on Push       | ✅ Enabled                       |
| Ignored Build Step (optional)        | Skip if only docs changed        |

#### 4. The Workflow

```
1. Developer designs in Lovable
   └── Lovable pushes to `lovable-dev` branch

2. Vercel auto-generates Preview Deployment
   └── URL: my-app-git-lovable-dev-teamname.vercel.app
   └── Isolated environment (can use staging backend)

3. Developer tests the preview
   └── Verify UI, check API connections, run manual QA

4. Create Pull Request: lovable-dev → main
   └── Code review (Antigravity or human)
   └── CI tests pass

5. Merge PR
   └── Vercel auto-deploys to Production
   └── Site live at: my-app.vercel.app
```

### Environment per Branch

| Branch        | Backend API URL                          | Firebase Project        |
| ------------- | ---------------------------------------- | ----------------------- |
| `lovable-dev` | `https://email-to-cloud-staging-...`     | Staging project         |
| `main`        | `https://api-gateway-...`                | Production project      |

Set these in Vercel's environment variables with the appropriate scope (Preview vs Production).

---

## 7. OAuth Redirect Whitelisting

If your app uses OAuth (Google Sign-In, GitHub Auth, Firebase Auth), you must add your
Vercel domains to the provider's allowed redirect URIs.

### Firebase Auth

1. Go to Firebase Console → Authentication → Settings → **Authorized domains**
2. Add:
   - `your-project.vercel.app` (production)
   - `*.vercel.app` (preview deploys — or add individually)

### Google OAuth Console

1. Go to https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs**:
   ```
   https://your-project.vercel.app/api/auth/callback/google
   https://your-project-git-lovable-dev.vercel.app/api/auth/callback/google
   ```

### GitHub OAuth

1. Go to https://github.com/settings/developers → OAuth Apps
2. Add the Vercel domain to **Authorization callback URL**

---

## 8. Firebase Hosting vs Vercel — Decision Matrix

| Factor                    | Firebase Hosting                   | Vercel                              | Winner       |
| ------------------------- | ---------------------------------- | ----------------------------------- | ------------ |
| Static sites              | Excellent (free tier generous)     | Excellent                           | Tie          |
| SSR / dynamic rendering   | ❌ Not supported                   | ✅ Full Next.js SSR                 | Vercel       |
| Preview deploys           | Manual (channels)                  | ✅ Auto per PR                      | Vercel       |
| Firebase integration      | ✅ Native (same project)           | Via API/SDK (manual setup)          | Firebase     |
| Edge functions            | Cloud Functions (cold start)       | ✅ Edge Runtime (instant)           | Vercel       |
| Analytics                 | Google Analytics (separate)        | ✅ Built-in Web Vitals              | Vercel       |
| Custom domains + SSL      | ✅ Free                            | ✅ Free                             | Tie          |
| CI/CD complexity          | Manual (`firebase deploy`)         | ✅ Zero-config (Git push → deploy)  | Vercel       |
| Cost at scale             | Pay as you go (CDN egress)         | Pro plan needed (>100 deploys/day)  | Firebase     |
| Ecosystem lock-in         | Google Cloud                       | Vercel platform                     | Tie          |

### Recommendation

- **Start with Firebase Hosting** for simplicity + Firebase ecosystem integration
- **Graduate to Vercel** when you need SSR, preview deploys, or edge middleware
- **Use both**: Firebase Hosting for the main app, Vercel for marketing/docs site

---

## 9. Troubleshooting

| Problem                             | Cause                                  | Fix                                              |
| ----------------------------------- | -------------------------------------- | ------------------------------------------------ |
| 404 on direct navigation            | Missing SPA rewrite                    | Add `vercel.json` with rewrite rules             |
| Build fails: "Module not found"     | Missing dependencies                   | Run `npm install` locally first, commit lockfile  |
| Env vars not working in browser     | Missing `VITE_` or `NEXT_PUBLIC_` prefix | Prefix all client-side vars correctly           |
| Preview deploy shows production data | Same env vars for all scopes          | Set different values for Preview vs Production   |
| OAuth redirect fails                | Domain not whitelisted                 | Add Vercel domain to Firebase Auth + OAuth console|
| Build takes > 5 minutes             | Large `node_modules` or unbundled deps | Add `.vercelignore`, optimize imports            |
| `output: "export"` breaks SSR       | Static export mode enabled             | Remove from `next.config.ts` for full SSR        |
| CSS/fonts not loading               | Incorrect asset paths                  | Use relative paths or `public/` directory        |

---

## Starter Kit Addition

To add Vercel support to the starter kit, include this `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/((?!api|_next|static|favicon\\.ico).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

Add to `.gitignore`:

```gitignore
.vercel/
```
