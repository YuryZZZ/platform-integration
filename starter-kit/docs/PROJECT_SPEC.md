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
| **Frontend**   | Next.js (App Router)  | Static export → Firebase   |
| **Styling**    | Tailwind CSS          | Utility-first CSS          |
| **Backend**    | FastAPI (Python)      | Cloud Run microservices    |
| **Database**   | BigQuery / Firestore  | Analytics / real-time data |
| **Hosting**    | Firebase Hosting      | Static CDN delivery        |
| **Auth**       | Firebase Auth         | User authentication        |
| **AI**         | Gemini 3 Pro          | Reasoning, generation      |
| **Design**     | Google Stitch         | AI UI design               |
| **IDE**        | Antigravity           | Agent-first development    |
| **Async Agent**| Jules                 | Cloud VM code tasks        |

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
