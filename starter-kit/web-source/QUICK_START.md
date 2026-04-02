# Nexus AI — Global Autonomous Overview

> **Repository Status:** Fully Integrated  
> **Framework:** Next.js 15, Payload CMS 3.x, Genkit, Firebase Studio.

*Get up and running with the award-winning design system and autonomous orchestration engine in 5 minutes.*

---

## 1. Quick Boot Sequence (30 Seconds)

To launch the entire matrix (including the embedded CMS, Postgres, and the UI layout engine), navigate into the `portable/` directory.

```bash
cd portable/
npm install --legacy-peer-deps

# Spin up Postgres required for the embedded Payload CMS
npm run docker:up

# Start the Web Engine + Edge Middleware + CMS
npm run dev
```

The system will natively spawn:
1.  **Public Marketing & Portal Sandbox** — `http://localhost:3001`
2.  **Payload CMS Administration Gui** — `http://localhost:3001/admin`

---

## 2. Operating the Autonomous Agent 

This project is no longer a static template; it is an **orchestration environment** built for Agents (Antigravity/Gemini) utilizing MCP connections. You do not need to manually write boilerplate. 

**Give the AI high-level directives:**
> *"Agent, utilize `getPayload()` to autonomously mass-generate 50 SEO-optimized construction landing pages into Postgres. Then query the `mcp_StitchMCP_generate_screen_from_text` server to output a new dashboard interface for these pages natively saving to `src/components/`."*

### Available Agent Tooling (MCP Arsenal):
*   **Local CMS API:** Agents use Native `GET/POST` bypassing the CMS GUI securely.
*   **Stitch MCP Server:** Dynamically queries UI layout generations injected as actual React code.
*   **Firebase Studio MCP:** Agents automate rule checks, bindings, and Cloud Run Hosting updates dynamically.
*   **GitHub MCP:** Fully autonomous CI/CD trigger pulling, feature branching, and commit generation perfectly sandboxed.
*   **Lovable AI Export API:** Safely snapshots data schema states to generate decoupled PWA exports instantly.

---

## 4. The Automation Factory (Platform Integration Tools)

Your framework is enveloped by the `platform-integration` toolchain, structurally ensuring you never have to manually copy files or visually test regressions alone.

*   **Lovable UI Synchronization (`scripts/sync_lovable.ps1`)**: Immediately pulls generated UI variations from the external Lovable compiler directly into your `portable/src/components/lovable` workspace natively via GitHub.
*   **The AI Workflow Command Center (`.agents/workflows/`)**: Execute `/lovable-sync` or `/github-sync` in chat. Your AI agent will read these exact markdown instructions to trigger scripts, commit files, and spin down pipelines seamlessly.
*   **Continuous Integration Daemon (`scripts/auto-sync.ps1`)**: Background watcher polling GitHub continuously to ensure your local workstation runs the identical production template.
*   **End-to-End Visual Validator (`Playwright E2E`)**: Fires a headless browser to map the Next.js visual nodes, mathematically verifying the `/admin` CMS bounds and complex GSAP animations dynamically load before any deployment sequence executes.

---

## 5. Reference Documentation 

For an exact breakdown of how to use and deploy autonomous features, refer specifically to the portable documentation:

- [Project Specifications](./portable/docs/PROJECT_SPEC.md)
- [Autonomous Agents Quick Start](./portable/QUICK_START.md)
- [Architecture & Infrastructure](./portable/docs/ARCHITECTURE.md)
- [Troubleshooting & Execution Limits](./portable/docs/TROUBLESHOOTING.md)
- [API Contracts](./portable/docs/API_CONTRACTS.md)
