# Official Firebase Integration Prompt Guide
*(For use with Antigravity and Jules during backend wiring)*

This guide defines entirely how Antigravity and Jules should interpret the instruction *"Wire this application to Firebase."* Because backend services are extremely complex and error-prone, AI models must rely on extremely robust, structured prompts based on these specifications.

## 1. The Migration Pattern (Supabase -> Firebase)
Often, UI obtained from Lovable inadvertently includes generic Supabase references or standard Next.js mock data.
*   **Expansion Rule:** When prompted to *"Migrate to Firebase"*, Antigravity MUST expand this into a massive 1,000-word prompt encompassing all files in the targeted directory.
*   **The Command Structure:**
> *"Scan `src/components/*` for any instances of hardcoded state, dummy JSON, or Supabase queries. Replace all static imports with explicit `@firebase/app` and `@firebase/firestore` modular (v9) imports. Ensure `getFirestore()`, `collection()`, `doc()`, and `onSnapshot()` are utilized to wire these components into purely reactive data streams."*

## 2. Authentication Enforcement
Firebase Auth acts as the core identity provider. AI generations frequently forget to protect routes.
*   **Expansion Rule:** When instructed to implement auth, Antigravity MUST generate the complete provider wrapper.
*   **The Command Structure:**
> *"Create an `AuthProvider.tsx` context bridging `onAuthStateChanged()` from the Firebase Auth SDK. Ensure that standard email/password flows are implemented using `signInWithEmailAndPassword` and `createUserWithEmailAndPassword`. Generate a `ProtectedRoute.tsx` higher-order component that aggressively redirects unauthenticated users to `/login`."*

## 3. Real-Time vs. One-Time Fetching
Language models generally implement `getDocs()` by default as it is the simplest polling mechanism. In modern architectures, polling is unacceptable.
*   **Expansion Rule:** You must explicitly instruct the agent to utilize real-time listeners unless specifically told otherwise.
*   **The Command Structure:**
> *"Use the `useEffect` hook with `onSnapshot` to subscribe to the Firestore `projects` collection. Handle the loading state gracefully, and crucially, ensure the unsubscribe function is returned in the `useEffect` cleanup block to prevent massive memory leaks and billing spikes on Google Cloud."*

## 4. Jules Background Scripting
When tasking the cloud worker (Jules) with modifying 50+ files to use a new Firebase collection structure:
*   **The Command Structure (via the Terminal):**
> `/jules "Identify every place in the `src/` directory where the 'User Profile' is read or written. Refactor all queries to use a new Firestore subcollection path pattern: `clients/{clientId}/users/{userId}`. Update all TypeScript interfaces to match this schema, run the tests, and submit a PR."`

---

## 5. Security Rules Generation
When Antigravity generates Firebase wiring, it MUST simultaneously generate matching `firestore.rules`.
*   **The Command Structure:**
> *"Write matching Firestore security rules preventing unauthorized reads on the `admin_logs` collection, and allow standard authenticated reads/writes only where `request.auth.uid == resource.data.userId`."*

## 6. Firebase App Hosting (Recommended for Next.js)
Firebase App Hosting (GA since April 2025) auto-provisions Cloud Run, Cloud Build, and CDN from a GitHub connection. For Next.js projects, **prefer App Hosting over manual `firebase deploy`**.
*   **The Command Structure:**
> *"Set up Firebase App Hosting for this Next.js project. Connect it to the GitHub repository so that every push to `main` triggers an automatic build and deploy via Cloud Run. Configure environment variables via `apphosting.yaml` and store secrets in Cloud Secret Manager."*

## 7. Integration Health Dashboard
Every generated portal MUST include a health check endpoint.
*   **The Command Structure:**
> *"Create a `GET /api/integrations/health` route that returns JSON with status, latencyMs, and quotaRemaining for each adapter (GitHub, Stitch, Firebase, Lovable). Require admin session auth. Surface this at `/status` in the app dashboard."*
