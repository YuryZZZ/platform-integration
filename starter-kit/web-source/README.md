# ⚡ Portals — Reusable Web Platform Template

> **A production-grade Next.js 15 template for building any web portal, SaaS product, or marketing site — fast.**
> Clone it. Configure it. Ship it.

<p align="center">
  <strong>Next.js 15 · React 19 · TypeScript 5.7 · Tailwind CSS 4 · Framer Motion</strong>
</p>

---

## 🚀 What Is This?

This is a **master template** — a fully-wired, multi-agent-ready web platform designed for rapid replication. You clone it once, run the init script, rename your brand, and you have a production-grade site in under 10 minutes.

It is maintained as **global files**: the canonical source of truth. Instantiated projects copy it but **never push changes back** — instead they use the [Template Feedback Engine](#-template-feedback-engine) to log improvements for backporting.

---

## ✨ What's Included

| Layer | What you get |
|-------|-------------|
| **Marketing Site** | 13 pages: Home, Pricing, Product, About, Customers, Surfaces, Resources, Blog, FAQ, Contact, Demo, Signup, Login |
| **Design System** | Token-driven CSS variables, dark/light mode, glassmorphism, typography scale |
| **Component Library** | 55+ production-ready components with full TypeScript types |
| **Multi-Surface** | Responsive across mobile, tablet, desktop, and ultra-wide (1536px+) |
| **Agent Workflows** | `.agents/workflows/` — AI agent playbooks for sync, deploy, feedback |
| **AI Integration Layer** | `_platform/` — wiring for Firebase, Lovable, Stitch, GitHub MCP |
| **Build Pipeline** | Cloud Build, Dockerfile, Vercel config, Firebase App Hosting |
| **Feedback Engine** | `npm run log:feedback` — records fixes for global template improvement |

---

## 🏁 Quick Start (3 Steps)

```powershell
# 1. Clone the template
git clone https://github.com/YuryZZZ/nexus-ai-platform.git my-new-project
cd my-new-project

# 2. Initialize for your project
.\scripts\init.ps1 -ProjectName "My Project" -PrimaryColor "#6366f1"

# 3. Start dev server
npm install && npm run dev
```

See **[TEMPLATE_INIT.md](./TEMPLATE_INIT.md)** for the full customization checklist.

---

## 🗂️ Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── (marketing)/        # All public marketing pages
│   │   ├── (auth)/             # Login / Signup
│   │   └── globals.css         # Design tokens (CSS variables)
│   ├── components/
│   │   ├── layout/             # Nav, Footer, Section, CtaBand
│   │   ├── blocks/             # CMS-driven content blocks
│   │   └── ui/                 # Atomic UI components
│   └── lib/                    # Integrations, hooks, utilities
├── _platform/                  # Platform integration stubs (Firebase, AI)
├── .agents/workflows/          # AI agent playbooks
├── .template-feedback/         # Logged improvements for backporting
├── scripts/
│   ├── init.ps1                # New project initializer
│   └── log-feedback.js         # Template feedback engine
├── docs/                       # Architecture, API, task logs
└── .env.example                # All environment variables documented
```

---

## 🎨 Customising Your Instance

| What to change | Where |
|---|---|
| Brand name & tagline | `src/app/(marketing)/page.tsx` hero section |
| Primary color | `src/app/globals.css` — `--color-primary` token |
| Navigation links | `src/components/layout/Navbar.tsx` |
| Pricing tiers | `src/app/(marketing)/pricing/page.tsx` |
| Logo | `public/logo.svg` |
| Fonts | `src/app/layout.tsx` — Google Fonts import + CSS `--font-*` vars |
| SEO defaults | `src/app/layout.tsx` — metadata object |

---

## 🤖 Multi-Agent Workflows

This template is designed for AI-assisted development. Available slash commands in Antigravity:

| Command | What it does |
|---|---|
| `/github-sync` | Pull latest from GitHub |
| `/lovable-sync` | Import Lovable-generated UI into the project |
| `/master-flow` | Full pipeline: Design → Code → Firebase → Deploy |
| `/template-feedback` | Record a fix for backporting to global template |
| `/verify-pyramid` | Run the full QA verification suite |
| `/deploy-changed` | Deploy only changed Cloud Functions |

---

## 📦 Template Feedback Engine

When you fix a bug or add a feature in an **instantiated project**, record it so it can be backported to this master template:

```bash
npm run log:feedback "Fix: framer-motion pages need use client directive in Next.js 15"
```

This captures the exact git diff and saves it to `.template-feedback/<timestamp>.md`. Periodically review these logs to improve the global template.

> **Rule**: Never directly edit the global template files from inside an instantiated project. Log → Review → Backport.

---

## 🔗 Connected Services

| Service | Purpose | Config |
|---|---|---|
| **GitHub** | Source control, CI/CD | `GITHUB_TOKEN` in `.env.local` |
| **Google Stitch** | AI UI design generation | `STITCH_API_KEY` |
| **Firebase** | Auth, Firestore, Hosting | `FIREBASE_PROJECT_ID` |
| **Lovable** | AI app builder sync | `LOVABLE_API_KEY` |
| **Vercel / Cloud Run** | Production hosting | `vercel.json` / `cloudbuild.yaml` |

---

## 📄 License

Private repository. All rights reserved.
Template by [YuryZZZ](https://github.com/YuryZZZ).
