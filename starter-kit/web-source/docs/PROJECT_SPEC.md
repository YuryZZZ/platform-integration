# YOUR_PROJECT_NAME — Project Spec

> **This is the spec. No drift allowed.**
> Changes to purpose, domain, architecture, public contracts, or data model require
> explicit approval AND a spec update.

---

## Purpose

<!-- FILL THIS IN: What does this project do? One paragraph max. -->

_Example: A multi-agent intelligence platform for legal and construction forensics,
providing hybrid search, evidence assembly, and AI-powered document analysis._

---

## Boundaries

<!-- FILL THIS IN: What this project does NOT do. -->

- Prefers Google databases (Firestore, BigQuery). Supabase acceptable when Lovable-generated or PostgreSQL features needed.
- Does NOT handle: ___
- Does NOT integrate with: ___
- Out of scope: ___

---

## Architecture

### Platform Stack

| Layer          | Technology            | Purpose                    |
| -------------- | --------------------- | -------------------------- |
| **Frontend**   | Next.js + Nexus       | Block-based marketing + platform |
| **Styling**    | Tailwind CSS          | Utility-first CSS          |
| **Backend**    | Cloud Functions / Run | Serverless microservices   |
| **Database**   | Firestore / BigQuery  | Real-time / analytics data |
| **Hosting**    | Firebase App Hosting  | Auto-provisioned Cloud Run + CDN |
| **Auth**       | Firebase Auth         | User authentication        |
| **AI**         | Google AI Studio (Gemini) | `GOOGLE_AI_API_KEY` → `src/lib/gemini.ts` |
| **Design**     | Google Stitch         | AI UI design               |
| **IDE**        | Antigravity           | Agent-first development    |
| **Async Agent**| Jules                 | Cloud VM tasks — SEO, tests, security |

### Deploy Units

```
functions/
├── api-gateway/      → Cloud Run (YOUR_REGION)
├── my-service/       → Cloud Run (YOUR_REGION)
└── ...
```

Each function has its own `deploy.ps1`. **Never deploy repo root.**

### Data Model

<!-- FILL THIS IN: Key collections/tables and their purpose. -->

| Collection/Table | Purpose              | Schema Link |
| ---------------- | -------------------- | ----------- |
|                  |                      |             |

---

## Data Layer Map (Hard Boundary)

> **Rule:** Never use Firestore for platform internals. Never use PostgreSQL for generated sites.

| Layer | Database | Purpose | Access Pattern |
|-------|----------|---------|----------------|
| **Layer 1 — Control Plane** | PostgreSQL 16 | Internal platform data (prompts, tenants, audit logs, embeddings) | Payload Local API (server-only) |
| **Layer 2 — Generated Site Runtime** | Firebase (Firestore, Auth, Hosting) | Per-site user data, authentication, deployment | Firebase SDK (client + server) |

This boundary is hard and intentional. Architecture review required before any cross-layer data access.

---

## Public Contracts (API Surface)

<!-- FILL THIS IN: The endpoints that external systems depend on. -->

| Endpoint                 | Method | Purpose              | Breaking change? |
| ------------------------ | ------ | -------------------- | ---------------- |
| `/health`                | GET    | Service health check | Never change     |

---

## Design System

Design tokens are defined in `DESIGN.md` (see [docs/DESIGN.md](./DESIGN.md)).

| Token      | Value          |
| ---------- | -------------- |
| Primary    | `#6366f1`      |
| Background | `#0f172a`      |
| Font       | Inter          |
| Grid       | 8px base       |

---

## Autonomy Levels (Reference)

| Level | Scope                                    | Auto-apply? |
| ----- | ---------------------------------------- | ----------- |
| L1    | Tests, docs, logging, tiny refactors     | ✅ Yes      |
| L2    | Changes with >60% test coverage          | ✅ Yes      |
| L3    | Dependency changes, weak-test refactors  | ❌ Approval |
| L4    | API changes, schema, deploys, secrets    | ❌ Approval |

---

## Changelog

| Date       | Change                     | Approved By |
| ---------- | -------------------------- | ----------- |
| YYYY-MM-DD | Initial spec created       | @user       |
