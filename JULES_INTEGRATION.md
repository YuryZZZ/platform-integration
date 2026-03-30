# Jules Integration Guide — Asynchronous Cloud Agent

> **Purpose**: How to use Google Jules for heavy-compute, async coding tasks that run
> in isolated cloud VMs without blocking local development.
>
> **Version**: 1.0.0 | **Last Updated**: 2026-03-30

---

## Table of Contents

1. [What is Jules?](#1-what-is-jules)
2. [CLI Installation & Setup](#2-cli-installation--setup)
3. [CLI Usage (Terminal Workflow)](#3-cli-usage-terminal-workflow)
4. [REST API (v1alpha)](#4-rest-api-v1alpha)
5. [Session State Machine](#5-session-state-machine)
6. [Advanced Workflows](#6-advanced-workflows)
7. [Integration with Antigravity](#7-integration-with-antigravity)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. What is Jules?

Jules is Google's **asynchronous, cloud-native coding agent** that executes tasks in isolated virtual machines. Unlike Antigravity (which works locally and synchronously), Jules handles:

- Repository-wide refactoring across thousands of files
- Dependency updates across monorepos
- Security vulnerability patching (parallel)
- Large-scale test generation
- Database schema migrations
- Code format standardization (e.g., CommonJS → ES Modules)

### Key Characteristics

| Property          | Value                                           |
| ----------------- | ----------------------------------------------- |
| Execution         | Asynchronous, non-blocking                      |
| Environment       | Isolated Google Cloud VM per session            |
| Model             | Gemini 3 Pro (reasoning)                        |
| Input             | Natural language prompt + GitHub repo           |
| Output            | Pull Request with code changes                  |
| Authentication    | API key (`X-Goog-Api-Key`)                      |
| Monitoring        | CLI polling or REST API activities              |

### When to Use Jules vs Antigravity

| Scenario                          | Use            |
| --------------------------------- | -------------- |
| Quick file edit (< 10 files)      | Antigravity    |
| Local debugging with browser      | Antigravity    |
| Repo-wide refactor (100+ files)   | **Jules**      |
| Dependency update (entire mono)   | **Jules**      |
| Security audit + auto-patching    | **Jules**      |
| Multi-hour migration task         | **Jules**      |
| Feature development (interactive) | Antigravity    |
| Deployment + verification         | Antigravity    |

---

## 2. CLI Installation & Setup

### Install the Gemini CLI Jules Extension

```powershell
# Install the Jules extension
gemini extensions install https://github.com/gemini-cli-extensions/jules

# Enable auto-updates (recommended)
gemini extensions install https://github.com/gemini-cli-extensions/jules --auto-update

# Verify installation
gemini extensions list
```

### Prerequisites

- **Gemini CLI** installed and authenticated (v0.4.0+)
- **GitHub repository** with the Jules GitHub App installed
- **Jules API key** (generated from [jules.google](https://jules.google) → Settings → API Keys)

### Set Up API Key

```powershell
# Option A: Environment variable (for REST API usage)
$env:JULES_API_KEY = "your-jules-api-key-here"

# Option B: Pass directly in requests via X-Goog-Api-Key header
# (See REST API section below)
```

> **Note**: The Jules API key is separate from your GCP API key or Gemini API key.
> Generate it at [jules.google](https://jules.google) → Settings → API Keys.

### Install Jules GitHub App

1. Go to: https://github.com/apps/jules-by-google
2. Click **Install**
3. Select repositories Jules should have access to
4. Grant permissions: Read & write (contents, pull requests, issues)

> **Critical**: Jules needs the GitHub App installed to clone repos and submit PRs.

---

## 3. CLI Usage (Terminal Workflow)

### Basic Commands

```powershell
# Delegate a task to Jules (async — returns immediately)
/jules convert all CommonJS modules to ES modules across the entire repository

# Check status of the last task
/jules what is the status of my last task?

# Check status of a specific session
/jules status SESSION_ID

# Send a follow-up message to an active session
/jules tell my active session to also add TypeScript types to the converted modules

# List recent sessions
/jules list my recent sessions
```

### Example: Repository-Wide Refactoring

```powershell
# Step 1: Kick off the task (non-blocking)
/jules refactor all Python files in src/ to use type hints. 
       Add return type annotations to all public functions.
       Run the existing test suite to verify nothing breaks.

# Step 2: Continue local work while Jules runs in the cloud...
cd web && npm run dev

# Step 3: Check progress periodically
/jules what is the status?

# Step 4: When complete, Jules creates a PR
# → Review the PR at https://github.com/YOUR_USER/YOUR_REPO/pulls
```

### Pipeline: Security Extension → Jules

```powershell
# Step 1: Scan for vulnerabilities
/security scan this repository for critical security issues

# Step 2: Pipe the report to Jules for patching
/jules fix all Critical and High vulnerabilities from the security report.
       Create separate PRs for each fix category.
       Run tests after each fix.
```

> Jules spawns parallel VMs for each fix category, creating discrete PRs.

---

## 4. REST API (v1alpha)

### Base URL

```
https://jules.googleapis.com/v1alpha
```

### Authentication

All requests require the `X-Goog-Api-Key` header:

```
X-Goog-Api-Key: YOUR_API_KEY
```

### Resource Hierarchy

```
Source (GitHub repository)
  └── Session (a unit of work)
       └── Activity (an immutable event within the session)
```

| Resource     | API Endpoint               | Description                                      |
| ------------ | -------------------------- | ------------------------------------------------ |
| **Source**   | `/v1alpha/sources`         | Target GitHub repository with Jules App installed |
| **Session**  | `/v1alpha/sessions`        | Stateful unit of work (cloning → planning → executing → PR) |
| **Activity** | `/v1alpha/sessions/{id}/activities` | Immutable event log entries for audit trail |

### Create a Session

```bash
curl -X POST https://jules.googleapis.com/v1alpha/sessions \
  -H "X-Goog-Api-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Refactor all database queries to use parameterized statements",
    "sourceContext": {
      "repository": "YOUR_USER/YOUR_REPO",
      "branch": "master"
    },
    "requirePlanApproval": true
  }'
```

**Response**:
```json
{
  "name": "sessions/abc123",
  "state": "QUEUED",
  "createTime": "2026-03-30T14:00:00Z",
  "sourceContext": {
    "repository": "YOUR_USER/YOUR_REPO",
    "branch": "master"
  }
}
```

### Approve a Plan

When `requirePlanApproval: true`, the session pauses at `AWAITING_PLAN_APPROVAL`:

```bash
curl -X POST https://jules.googleapis.com/v1alpha/sessions/abc123:approvePlan \
  -H "X-Goog-Api-Key: $API_KEY"
```

### Send Mid-Flight Message

Inject corrections or new constraints into an active session:

```bash
curl -X POST https://jules.googleapis.com/v1alpha/sessions/abc123:sendMessage \
  -H "X-Goog-Api-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Also ensure all refactored modules are fully typed in TypeScript"
  }'
```

### List Activities (Polling)

Activities are immutable — cache aggressively:

```bash
# Get all activities
curl https://jules.googleapis.com/v1alpha/sessions/abc123/activities \
  -H "X-Goog-Api-Key: $API_KEY"

# Paginated (with cursor)
curl "https://jules.googleapis.com/v1alpha/sessions/abc123/activities?pageSize=10&pageToken=TOKEN" \
  -H "X-Goog-Api-Key: $API_KEY"

# Only new activities since a timestamp
curl "https://jules.googleapis.com/v1alpha/sessions/abc123/activities?filter=createTime>2026-03-30T14:05:00Z" \
  -H "X-Goog-Api-Key: $API_KEY"
```

### Get Session Status

```bash
curl https://jules.googleapis.com/v1alpha/sessions/abc123 \
  -H "X-Goog-Api-Key: $API_KEY"
```

---

## 5. Session State Machine

```
                    POST /sessions
                         │
                         ▼
                    ┌──────────┐
                    │  QUEUED   │
                    └────┬─────┘
                         │
                         ▼
                   ┌───────────┐
                   │ PLANNING  │  ← Gemini 3 Pro analyzes codebase
                   └─────┬─────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
   ┌─────────────────────┐   ┌───────────────┐
   │ AWAITING_PLAN_APPROVAL │ │  IN_PROGRESS  │
   │ (if requirePlanApproval)│ │  (auto-approved)│
   └──────────┬──────────┘   └───────┬───────┘
              │                      │
              │ POST :approvePlan    │
              │                      │
              └──────────┬───────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │ IN_PROGRESS │  ← File modifications, testing in VM
                  └──────┬──────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        ┌───────────┐        ┌──────────┐
        │ COMPLETED │        │  FAILED  │
        │ (PR created)│      │ (error)  │
        └───────────┘        └──────────┘
```

### State Descriptions

| State                     | What's Happening                                        | Duration      |
| ------------------------- | ------------------------------------------------------- | ------------- |
| `QUEUED`                  | Session accepted, waiting for VM allocation              | Seconds       |
| `PLANNING`               | Gemini 3 Pro reads codebase, formulates strategy         | 1-5 minutes   |
| `AWAITING_PLAN_APPROVAL` | Plan ready, waiting for human approval (if configured)   | Until approved |
| `IN_PROGRESS`            | VM executing: editing files, running tests, building     | 5-60 minutes  |
| `COMPLETED`              | All changes committed, PR created on GitHub              | Terminal      |
| `FAILED`                 | Error during execution (build failure, test failure, etc)| Terminal      |

---

## 6. Advanced Workflows

### Parallel Security Patching

```bash
# Create multiple sessions targeting different vulnerability categories
for category in "SQL_INJECTION" "XSS" "EXPOSED_SECRETS"; do
  curl -X POST https://jules.googleapis.com/v1alpha/sessions \
    -H "X-Goog-Api-Key: $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"prompt\": \"Fix all $category vulnerabilities. Create a focused PR.\",
      \"sourceContext\": {
        \"repository\": \"YOUR_USER/YOUR_REPO\",
        \"branch\": \"master\"
      }
    }"
done
```

### Dependency Update Sweep

```powershell
/jules update all npm dependencies to their latest versions.
       Run the test suite after each major version bump.
       If tests fail, pin to the last compatible version.
       Generate a changelog of all version changes.
```

### Code Migration (CommonJS → ESM)

```powershell
/jules convert all CommonJS require() statements to ES module imports.
       Update package.json to set "type": "module".
       Fix all relative import paths to include file extensions.
       Run the existing test suite to verify nothing breaks.
```

---

## 7. Integration with Antigravity

### The "Better Together" Workflow

```
Developer in Antigravity IDE
  │
  ├── Local work (synchronous)
  │     └── Feature development, debugging, UI polish
  │     └── Uses MCP servers (Firebase, GitHub, Cloud Run)
  │
  ├── Heavy work → delegate to Jules (asynchronous)
  │     └── /jules refactor entire test suite to Jest
  │     └── /jules update all dependencies
  │     └── /jules add TypeScript types to all JS files
  │
  └── Review Jules PRs → merge → continue local work
        └── git pull origin master
        └── Verify changes locally
        └── Deploy via /deploy-changed workflow
```

### Workflow Tip: Jules → Antigravity Handoff

1. Jules creates a PR with code changes
2. Antigravity pulls the branch: `git pull origin master`
3. Antigravity runs verification: `/verify-pyramid`
4. Antigravity deploys: `/deploy-changed`
5. Antigravity updates docs: `docs/deployments.md`

---

## 8. Troubleshooting

| Problem                                  | Cause                              | Fix                                                  |
| ---------------------------------------- | ---------------------------------- | ---------------------------------------------------- |
| `Extension not found: jules`             | Not installed                      | `gemini extensions install .../jules`                |
| `401 Unauthorized`                       | API key missing or invalid         | Set `X-Goog-Api-Key` or `GOOGLE_AI_API_KEY` env var |
| Session stays `QUEUED` for > 5 min       | VM allocation backlog              | Wait; check Google Cloud status page                 |
| Session `FAILED` immediately             | GitHub App not installed on repo   | Install at github.com/apps/jules-by-google           |
| PR not created after `COMPLETED`         | Branch protections blocking push   | Allow Jules App in repo branch rules                 |
| `AWAITING_PLAN_APPROVAL` — stuck         | `requirePlanApproval: true` set    | POST `:approvePlan` endpoint                         |
| Tests fail in Jules VM but pass locally  | Different Node/Python version      | Specify version in prompt or Dockerfile              |
| Jules changes conflict with local work   | Parallel edits on same files       | Pull Jules PR first, resolve conflicts               |

---

## Reference Links

| Resource                   | URL                                              |
| -------------------------- | ------------------------------------------------ |
| Jules Web App              | https://jules.google                              |
| Jules GitHub App           | https://github.com/apps/jules-by-google          |
| Gemini CLI Extensions      | https://github.com/gemini-cli-extensions         |
| Jules REST API docs        | https://jules.google (API reference in settings)  |
| Jules API Keys             | https://jules.google → Settings → API Keys       |
