---
name: firebase-wire
description: Wire Firebase v9 modular SDK to React components. Covers Firestore CRUD, Auth, real-time listeners, security rules, and the Layer 1 (PostgreSQL) vs Layer 2 (Firestore) data boundary.
---

# Firebase Wire Skill

## Purpose
Replace mock data in components with live Firebase v9 calls. Wire authentication, Firestore collections, and real-time updates. Enforce the data layer boundary strictly.

---

## HARD BOUNDARY — Read Before Touching Any Data

```
Layer 1 (PostgreSQL / Supabase):
  → Platform internals ONLY: tenants, users, billing, migrations, audit logs
  → Accessed from: server-side API routes only (never from client components)
  → Never expose to Firestore

Layer 2 (Firebase Firestore):
  → Generated site runtime ONLY: leads, form submissions, user activity,
    real-time content, file uploads, notifications
  → Accessed from: client components via v9 SDK
  → Never store platform control-plane data here

IF UNSURE: ask "does this belong to the platform or to the generated site?"
  Platform → PostgreSQL | Generated site → Firestore
```

---

## Step 1 — Firebase Config

Ensure `src/lib/firebase.ts` exists:

```typescript
// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
```

Required `.env.local` keys:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## Step 2 — Real-Time Collection (onSnapshot)

For any list that must update in real time:

```typescript
'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useCollection<T>(
  collectionName: string,
  orderByField = 'createdAt',
  limitTo = 50
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy(orderByField, 'desc'),
      limit(limitTo)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map(d => ({ id: d.id, ...d.data() } as T)));
        setLoading(false);
      },
      (err) => { setError(err); setLoading(false); }
    );
    return () => unsub();
  }, [collectionName, orderByField, limitTo]);

  return { data, loading, error };
}
```

---

## Step 3 — Form Submit (addDoc)

For contact forms, lead capture, and any Write operation:

```typescript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function submitForm(formData: Record<string, string>) {
  try {
    await addDoc(collection(db, 'leads'), {
      ...formData,
      createdAt: serverTimestamp(),
      source: window.location.pathname,
      userAgent: navigator.userAgent,
    });
    return { success: true };
  } catch (err) {
    console.error('Firestore write failed:', err);
    return { success: false, error: err };
  }
}
```

---

## Step 4 — Authentication

For protected routes:

```typescript
'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
```

---

## Step 5 — Security Rules

After wiring any new collection, update `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Leads: anyone can write, only admin can read
    match /leads/{leadId} {
      allow create: if request.resource.data.keys().hasAll(['email', 'name']);
      allow read: if request.auth != null && request.auth.token.admin == true;
    }
    // User data: scoped to owner
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Deploy rules via MCP:
```javascript
firebase.firestore_update_rules({ rules: "<contents of firestore.rules>" })
```

---

## MCP Tool Reference

Use Firebase MCP tools (never CLI):

| Operation | MCP Tool |
|-----------|---------|
| List collections | `firebase.firestore_list_collections` |
| Get documents | `firebase.firestore_get_documents` |
| Add document | `firebase.firestore_add_document` |
| Update document | `firebase.firestore_update_document` |
| Delete document | `firebase.firestore_delete_document` |
| Update rules | `firebase.firestore_update_rules` |

---

## Common Errors

| Error | Fix |
|-------|-----|
| `FirebaseError: Missing or insufficient permissions` | Update firestore.rules + redeploy |
| `FirebaseError: Invalid collection reference` | Check collection name spelling |
| `onSnapshot not updating` | Check if component is unmounting — add cleanup |
| Module not found: firebase | `npm install firebase@latest` |
| `apiKey not valid` | Check NEXT_PUBLIC_ prefix on env vars |
