---
description: How to sync Lovable UI designs to your project repo
---

## Lovable → GitHub Sync Workflow

// turbo-all

### Prerequisites

- Lovable workspace connected to GitHub
- GitHub repo: `YOUR_USER/YOUR_REPO`

### Steps

1. Open Lovable at https://lovable.dev and make UI changes in your project

2. When ready, click "Connect to GitHub" → select your target repo

3. Lovable will create a branch/PR. Pull from GitHub:

```powershell
git fetch origin master && git pull origin master --ff-only
```

4. Review what Lovable generated:

```powershell
ls web/src/components/
```

5. Build and verify:

```powershell
cd web && npx next build
```

6. Deploy:

```powershell
cd .. && npx firebase-tools deploy --only hosting --project YOUR_FIREBASE_PROJECT
```

7. Push:

```powershell
git add -A && git commit -m "feat: integrate Lovable UI updates" && git push origin master
```

### Design Tokens (for Lovable)

Paste these into your Lovable project settings to match the design system:

- **Background**: `#0f172a` (slate-900)
- **Cards**: `rgba(255,255,255,0.03)` with `border: rgba(255,255,255,0.06)`
- **Primary**: indigo-500 (`#6366f1`)
- **Accent**: purple-500 (`#a855f7`)
- **Success**: emerald-400 (`#34d399`)
- **Font**: Inter / system-ui

> See [DESIGN.md](../starter-kit/docs/DESIGN.md) for the full design system specification.
> See [STITCH_DESIGN.md](../STITCH_DESIGN.md) for Google Stitch integration.

### Supabase vs Firebase — When to Swap

Lovable has a **deep native integration with Supabase** — it auto-generates tables, RLS
policies, auth, and real-time subscriptions directly from chat prompts. This is a major
productivity advantage.

**Keep Supabase when:**
- Lovable generated the app and you want the fastest path to production
- You need **relational queries** (JOINs, foreign keys, ACID transactions)
- You need **pgvector** for AI/vector search inside the database
- You want SQL-native **Row-Level Security** (more granular than Firestore rules)
- You want **no vendor lock-in** (standard PostgreSQL, exportable)

**Swap to Firebase when:**
- Deep integration with **Google Cloud ecosystem** is required (BigQuery, Cloud Run, IAM)
- You need **offline-first** mobile sync (Firebase's strongest feature)
- The app is **read-heavy real-time** (chat, live feeds) at massive scale
- You're deploying to **Firebase Hosting** and want everything in one project

#### Quick Swap Commands (if migrating)

```powershell
# Remove Supabase
npm uninstall @supabase/supabase-js @supabase/auth-helpers-react

# Install Firebase
npm install firebase
```

Replace `supabaseClient.ts` with `firebase.ts`:
```typescript
// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

> **Bottom line**: If Lovable generated the app with Supabase and it works — keep it.
> Only swap if you need deep Google ecosystem integration.
