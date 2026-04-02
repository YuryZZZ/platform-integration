# TASK-AUTH: Auth System

## Context
Implementing Step 9 from the Master Plan (Auth System). This involves wiring up NextAuth (Auth.js) securely in the Next 15 App Router.

## Scope
- [x] 9.1 NextAuth/Auth.js setup config
- [x] 9.2 API route for NextAuth (`app/api/auth/[...nextauth]/route.ts`)
- [x] 9.3 Login page logic + hook to trigger sign in (`app/(auth)/login/page.tsx`)
- [x] 9.4 JWT / Session decoding integration (Middleware / App Shell)

## Step-by-Step Execution Plan

### Step 1: Install Auth.js
Run `npm install next-auth@beta`

### Step 2: Auth Configuration
Create `src/auth.ts`:
- Use `Credentials` provider for simulated login (standard email/pass mock).
- Configure session strategy (JWT).
- Export `handlers` (`GET`, `POST`), `auth`, `signIn`, `signOut`.

### Step 3: API Route
Create `src/app/api/auth/[...nextauth]/route.ts`:
- Re-export the handlers from `auth.ts`.

### Step 4: Login Page Integration
Update `src/app/(auth)/login/page.tsx`:
- Convert form to use Next.js server actions calling `signIn` OR client-side submission using `next-auth/react`. (We'll use standard server action `signIn('credentials', ...)` since we are using App Router).

### Step 5: Protect App Routes
Update or create `src/middleware.ts`:
- Guard `/app` routes using Auth.js middleware.
- Verify JWT decoding is working smoothly.
