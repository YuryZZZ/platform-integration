# Complete Authentication & Credentials Reference

# Lovable → GitHub → Firebase → Antigravity → Cloud Run → Stitch

> **Purpose**: Every authentication credential, token, and login flow used across the
> entire development stack, documented in exact detail with actual commands, paths, and
> verification steps.
>
> **Last Updated**: 2026-02-28 | **Version**: 5.4

---

## Quick Status Table

| Platform         | Auth Method                        | Token Location                                          | Verify Command             | Status |
| ---------------- | ---------------------------------- | ------------------------------------------------------- | -------------------------- | ------ |
| **GCP**          | OAuth refresh token + ADC          | `%APPDATA%\gcloud\application_default_credentials.json` | `gcloud auth list`         | ✅     |
| **Firebase CLI** | OAuth refresh token                | `%APPDATA%\firebase\` (managed by CLI)                  | `firebase projects:list`   | ✅     |
| **GitHub (git)** | Windows Credential Manager         | OS credential store                                     | `git ls-remote origin`     | ✅     |
| **GitHub (PAT)** | Fine-grained Personal Access Token | `~/.gemini/antigravity/mcp_config.json` (env var)       | MCP: `mcp_github_get_me`   | ✅     |
| **Lovable**      | GitHub OAuth App                   | Managed by Lovable                                      | Login at lovable.dev       | ✅     |
| **Antigravity**  | MCP protocol (delegates to above)  | Reads ADC, Firebase CLI token, GitHub PAT               | MCP tools respond          | ✅     |
| **Cloud Run**    | GCP ADC (auto from gcloud)         | Same as GCP ADC                                         | `gcloud run services list` | ✅     |
| **BigQuery**     | GCP ADC                            | Same as GCP ADC                                         | `bq ls legalai-480809:`    | ✅     |

---

## 1. Google Cloud Platform (GCP)

### 1.1 User Login (Interactive)

```powershell
gcloud auth login
```

- Opens a browser for Google OAuth consent
- Creates a **refresh token** stored in `%APPDATA%\gcloud\`
- Used by: `gcloud` CLI commands, Cloud Run deploys, BigQuery queries

### 1.2 Application Default Credentials (ADC)

```powershell
gcloud auth application-default login
```

- Opens a browser, creates a **separate** OAuth credential
- Stored at: `%APPDATA%\gcloud\application_default_credentials.json`
- **Critical path**: This file is read by ALL MCP servers (Firebase, Cloud Run, BigQuery)
- Used by: Python SDKs (`google-cloud-bigquery`, `google-cloud-storage`), MCP servers, Node.js SDKs

**File contents (structure)**:

```json
{
  "account": "",
  "client_id": "764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com",
  "client_secret": "d-FL95Q19q7MQmFpd7hHD0Ty",
  "quota_project_id": "legalai-480809",
  "refresh_token": "1//REDACTED",
  "type": "authorized_user",
  "universe_domain": "googleapis.com"
}
```

### 1.3 Project Configuration

```powershell
gcloud config set project legalai-480809
gcloud config set compute/region us-central1
```

### 1.4 Service Account (CI/CD Only)

```powershell
# Create
gcloud iam service-accounts create ci-deployer \
  --display-name="CI/CD Deployer" \
  --project=legalai-480809

# Grant roles
gcloud projects add-iam-policy-binding legalai-480809 \
  --member="serviceAccount:ci-deployer@legalai-480809.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding legalai-480809 \
  --member="serviceAccount:ci-deployer@legalai-480809.iam.gserviceaccount.com" \
  --role="roles/firebase.hostingAdmin"

# Download key (CI only — NEVER commit to git)
gcloud iam service-accounts keys create sa-key.json \
  --iam-account=ci-deployer@legalai-480809.iam.gserviceaccount.com
```

### 1.5 Enabled APIs

```powershell
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  firestore.googleapis.com \
  firebase.googleapis.com \
  bigquery.googleapis.com \
  aiplatform.googleapis.com \
  --project=legalai-480809
```

### 1.6 Verification

```powershell
gcloud auth list                                    # Shows active account
gcloud config list                                  # Shows project, region
gcloud projects describe legalai-480809             # Shows project details
```

---

## 2. Firebase

### 2.1 CLI Authentication

```powershell
firebase login
```

- Opens browser for Google OAuth
- Stores refresh token in `%APPDATA%\firebase\` (managed by CLI)
- Same Google account as GCP login

### 2.2 Project Configuration

**`.firebaserc`** (in project root):

```json
{
  "projects": {
    "default": "studio-790024798-53451"
  }
}
```

**`firebase.json`** (in project root):

```json
{
  "hosting": {
    "public": "web/out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

### 2.3 Firebase SDK Config (Frontend — Public)

```typescript
// Get via: firebase apps:sdkconfig WEB <APP_ID>
// Or via MCP: mcp_firebase-mcp-server_firebase_get_sdk_config
const firebaseConfig = {
  apiKey: "AIzaSy...", // PUBLIC — safe to commit
  authDomain: "project.firebaseapp.com",
  projectId: "studio-790024798-53451",
  storageBucket: "project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};
```

> **Note**: The `apiKey` is PUBLIC by design. It's restricted by HTTP referrer rules, not secrecy.

### 2.4 Deploy Token (CI/CD)

```powershell
# For CI/CD (non-interactive):
$env:FIREBASE_TOKEN = (firebase login:ci)
firebase deploy --token $env:FIREBASE_TOKEN

# Or use service account + Workload Identity (preferred for GitHub Actions)
```

### 2.5 MCP Server Auth

The Firebase MCP server (`firebase-mcp-server`) uses:

1. **ADC** (`application_default_credentials.json`) — primary
2. **Firebase CLI token** — fallback
3. No separate API key needed

### 2.6 Verification

```powershell
firebase projects:list                              # Lists accessible projects
firebase use studio-790024798-53451                 # Set active project
firebase hosting:sites:list                         # List hosting sites
```

### 2.7 Key IDs

| Item                | Value                                    |
| ------------------- | ---------------------------------------- |
| Firebase Project ID | `studio-790024798-53451`                 |
| GCP Project ID      | `legalai-480809`                         |
| Hosting URL         | `https://studio-790024798-53451.web.app` |
| Hosting Site        | `studio-790024798-53451`                 |

---

## 3. GitHub

### 3.1 Git HTTPS Auth (Windows Credential Manager)

```powershell
git config --global credential.helper manager
git config --global user.name "YuryZZZ"
git config --global user.email "your_email@example.com"
```

When you first `git push`, Windows Credential Manager prompts for credentials and stores them.

### 3.2 Git SSH Auth (Alternative)

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add public key at: https://github.com/settings/keys
ssh -T git@github.com    # Verify: "Hi YuryZZZ!"
```

### 3.3 Personal Access Token (PAT) — For GitHub MCP Server

**Type**: Fine-grained token
**Created at**: https://github.com/settings/personal-access-tokens/new

**Required settings**:

| Setting           | Value                                   |
| ----------------- | --------------------------------------- |
| Token name        | `antigravity-mcp` (or descriptive name) |
| Expiration        | 90 days (then regenerate)               |
| Repository access | **All repositories**                    |
| Contents          | Read and write                          |
| Issues            | Read and write                          |
| Pull requests     | Read and write                          |
| Actions           | Read and write                          |
| Metadata          | Read (always required)                  |

**Token format**: `github_pat_11BCNSGDQ0...` (starts with `github_pat_`)

**Where it's stored**: In Antigravity's MCP config file (see Section 5.3)

> ⚠️ **NEVER commit the PAT to git.** Store in MCP config or password manager only.

### 3.4 GitHub Actions Secrets

```
Repository → Settings → Secrets and Variables → Actions
  GCP_PROJECT_ID          = legalai-480809
  FIREBASE_PROJECT_ID     = studio-790024798-53451
  FIREBASE_SERVICE_ACCOUNT = (JSON key content)
```

### 3.5 Workload Identity Federation (for Actions — Preferred)

```yaml
# .github/workflows/deploy.yml
- id: auth
  uses: google-github-actions/auth@v2
  with:
    workload_identity_provider: "projects/<NUM>/locations/global/workloadIdentityPools/<POOL>/providers/<PROVIDER>"
    service_account: "ci-deployer@legalai-480809.iam.gserviceaccount.com"
```

### 3.6 Verification

```powershell
git ls-remote origin                                # Tests HTTPS auth
ssh -T git@github.com                               # Tests SSH auth
# MCP: mcp_github_get_me                            # Tests PAT auth
```

### 3.7 Repository Details

| Item           | Value                                           |
| -------------- | ----------------------------------------------- |
| Owner          | `YuryZZZ`                                       |
| Repo           | `email_to_cloud`                                |
| Default branch | `master`                                        |
| Remote URL     | `https://github.com/YuryZZZ/email_to_cloud.git` |

---

## 4. Lovable

### 4.1 Authentication Flow

```
User → lovable.dev → "Sign in with GitHub" → GitHub OAuth consent
     → Lovable GitHub App installed on your account
     → Lovable gets read/write access to repos
```

**No manual tokens needed.** Lovable manages its GitHub integration entirely through OAuth.

### 4.2 How to Set Up

1. Go to https://lovable.dev
2. Click **Sign in with GitHub**
3. Authorize the **Lovable GitHub App**
4. Grant access to repositories (all or selected)
5. Create a project → it creates a GitHub repo automatically
6. To use an existing repo: **Transfer** from Lovable dashboard

### 4.3 Token Transfer

When Lovable pushes to GitHub, it uses its **GitHub App installation token** (auto-rotated, short-lived). You never see or manage this token.

### 4.4 Lovable → GitHub → Local Sync

```
Lovable edits UI
  ↓  (GitHub App push)
GitHub repository (PR or direct push)
  ↓  (auto-sync.ps1 or manual git pull)
Local repo on developer machine
  ↓  (Antigravity reads files)
Antigravity IDE
```

### 4.5 Lovable MCP Connectors (Optional)

Lovable can also **read** from MCP servers for additional context:

1. Go to https://lovable.dev → **Settings** → **Connectors** → **Personal connectors**
2. Click **New MCP server**
3. Provide: Server name, Server URL
4. Choose auth: OAuth, Bearer token, API key, or None
5. Click **Add & authorize**

**Prebuilt connectors**: Notion, Linear, Jira, Miro, n8n, Amplitude, Granola

> **Note**: Lovable connectors are user-specific, not shared. Available on paid plans.

---

## 5. Antigravity IDE

### 5.1 Authentication Architecture

```
Antigravity IDE
  └── MCP Protocol (JSON-RPC over stdio)
       ├── firebase-mcp-server
       │     └── reads: %APPDATA%\gcloud\application_default_credentials.json
       │     └── reads: %APPDATA%\firebase\ (CLI refresh token)
       │     └── calls: Firebase Admin API, Hosting API, Firestore API, Auth API
       │
       ├── cloudrun MCP
       │     └── reads: %APPDATA%\gcloud\application_default_credentials.json
       │     └── calls: Cloud Run Admin API
       │
       ├── github MCP
       │     └── reads: GITHUB_PERSONAL_ACCESS_TOKEN env var (from mcp_config.json)
       │     └── calls: GitHub REST API + GraphQL API
       │
       ├── sequential-thinking
       │     └── LOCAL ONLY — no authentication, no network
       │
       ├── bigquery MCP (via Toolbox SDK)
       │     └── reads: GOOGLE_APPLICATION_CREDENTIALS env var
       │     └── calls: BigQuery API
       │
       └── browser subagent
             └── LOCAL — uses Playwright/Chromium, browses as anonymous user
```

### 5.2 MCP Config Location

**Antigravity** (settings): `~/.gemini/antigravity/mcp_config.json`
**Gemini CLI** (project): `./mcp_config.json` (in project root)

### 5.3 Full MCP Config (Antigravity)

The GitHub MCP server is configured in Antigravity's settings (the GUI). The key fields:

```json
{
  "github": {
    "command": "C:\\Users\\yuryz\\.gemini\\antigravity\\mcp_servers\\github-mcp-server\\github-mcp-server.exe",
    "args": ["stdio"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "github_pat_11BCNSGDQ0..."
    }
  }
}
```

> This is the **native binary** approach — no Docker needed.

### 5.4 Project-Level MCP Config (`mcp_config.json` in repo root)

This is for the Gemini CLI and covers GCP services:

```json
{
  "mcpServers": {
    "bigquery": {
      "command": "npx",
      "args": [
        "-y",
        "@toolbox-sdk/server@latest",
        "--prebuilt",
        "bigquery",
        "--stdio"
      ],
      "env": {
        "BIGQUERY_PROJECT": "legalai-480809",
        "BIGQUERY_LOCATION": "US",
        "GOOGLE_APPLICATION_CREDENTIALS": "C:\\Users\\yuryz\\AppData\\Roaming\\gcloud\\application_default_credentials.json"
      }
    },
    "cloud-run": {
      "command": "npx",
      "args": ["-y", "@google-cloud/cloud-run-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "C:\\Users\\yuryz\\AppData\\Roaming\\gcloud\\application_default_credentials.json"
      }
    },
    "firebase": {
      "command": "npx",
      "args": ["-y", "firebase-tools@latest", "mcp"],
      "env": {
        "IS_GEMINI_CLI_EXTENSION": "true",
        "GOOGLE_APPLICATION_CREDENTIALS": "C:\\Users\\yuryz\\AppData\\Roaming\\gcloud\\application_default_credentials.json"
      }
    }
  }
}
```

### 5.5 What Each MCP Server Enables

| MCP Server              | Capabilities                                                                                                                                                       | Auth Required      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| **firebase-mcp-server** | Hosting deploy, Firestore CRUD, Auth user management, Security Rules, Remote Config, Cloud Functions logs, Storage URLs, Project management, Developer docs search | ADC + Firebase CLI |
| **cloudrun**            | Deploy services, view logs, manage traffic, list services                                                                                                          | ADC                |
| **github**              | Create/edit files, create PRs, manage issues, search code, list branches/commits, trigger Actions                                                                  | GitHub PAT         |
| **sequential-thinking** | Break problems into step-by-step reasoning chains                                                                                                                  | None               |
| **bigquery**            | Run queries, list datasets/tables, get schemas                                                                                                                     | ADC                |

### 5.6 Troubleshooting MCP Auth

| Problem                           | Fix                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Firebase MCP tools fail           | `firebase login` + `gcloud auth application-default login`                      |
| GitHub MCP "401 Unauthorized"     | Regenerate PAT with correct permissions; update in Antigravity settings         |
| Cloud Run MCP "permission denied" | `gcloud auth application-default login`                                         |
| BigQuery MCP "access denied"      | Check `GOOGLE_APPLICATION_CREDENTIALS` path exists                              |
| "MCP server not found"            | Verify the `command` path exists (e.g., `github-mcp-server.exe`)                |
| PAT expired (after 90 days)       | Regenerate at github.com/settings/personal-access-tokens → update in MCP config |

---

## 6. Cloud Run

### 6.1 Authentication

Cloud Run services use **GCP IAM** for deployment and **service-to-service** auth:

```powershell
# Deploy (uses ADC from gcloud auth)
gcloud run deploy api-gateway \
  --source . \
  --region us-central1 \
  --project legalai-480809 \
  --allow-unauthenticated

# Or via deploy script
cd functions/api-gateway && ./deploy.ps1
```

### 6.2 Deploy Script Auth Pattern

Every `deploy.ps1` follows this pattern:

```powershell
# Preflight: verify gcloud auth
$account = gcloud auth list --filter="status=ACTIVE" --format="value(account)" 2>$null
if (-not $account) {
    Write-Error "Not authenticated. Run: gcloud auth login"
    exit 1
}

# Deploy
gcloud run deploy SERVICE_NAME --source "." --region us-central1 --project legalai-480809
```

### 6.3 Service-to-Service Auth

For Cloud Run services calling each other:

```python
import google.auth
from google.auth.transport.requests import Request, AuthorizedSession

credentials, _ = google.auth.default()
authed_session = AuthorizedSession(credentials)
response = authed_session.get("https://other-service-url.run.app/api/data")
```

### 6.4 Service URLs (Current)

| Service     | URL                                                  |
| ----------- | ---------------------------------------------------- |
| API Gateway | `https://api-gateway-nrlzg5ezsa-uc.a.run.app`        |
| LAKF API    | `https://lakf-api-nrlzg5ezsa-uc.a.run.app`           |
| Ingestion   | `https://ingestion-service-nrlzg5ezsa-uc.a.run.app`  |
| Email API   | `https://email-to-cloud-api-nrlzg5ezsa-uc.a.run.app` |

### 6.5 Public vs Authenticated Endpoints

- `--allow-unauthenticated` → Public (CORS headers required)
- Default → Requires IAM `roles/run.invoker` or bearer token

---

## 7. Data Pipeline (Stitch)

### 7.1 Authentication

The Stitch pipeline runs locally or on Cloud Run and authenticates via **ADC**:

```python
from google.cloud import bigquery

# ADC is picked up automatically from environment
client = bigquery.Client(project="legalai-480809")
```

No separate tokens needed — uses the same `application_default_credentials.json`.

### 7.2 BigQuery Access

```python
# Reading data
query = "SELECT * FROM `legalai-480809.construction_ai.containers` LIMIT 10"
results = client.query(query).result()

# Writing stitch links
table_ref = "legalai-480809.construction_ai.knowledge_links"
errors = client.insert_rows_json(table_ref, links)
```

### 7.3 Cloud Storage Access

```python
from google.cloud import storage

client = storage.Client(project="legalai-480809")
bucket = client.bucket("legalai-480809-uploads")
blob = bucket.blob("data/file.pdf")
blob.download_to_filename("/tmp/file.pdf")
```

### 7.4 Stitch Methods

| Method                | How It Links                        | Auth                         |
| --------------------- | ----------------------------------- | ---------------------------- |
| `SAME_PARTICIPANTS`   | Same sender/receiver across sources | ADC → BigQuery               |
| `TEMPORAL_PROXIMITY`  | Events within time window           | ADC → BigQuery               |
| `SEMANTIC_SIMILARITY` | Vector cosine similarity            | ADC → BigQuery + AI Platform |

### 7.5 Running the Stitcher

```powershell
# Local (uses ADC)
python scripts/cross_platform_stitcher.py

# Or via Antigravity workflow
# /deploy_pipeline
```

---

## 8. Cross-Platform Token Flow

```
                    ┌─────────────────────────┐
                    │     Google Account       │
                    │  (yuryz@gmail.com)       │
                    └────────────┬─────────────┘
                                 │
              ╔══════════════════╪═══════════════════╗
              ║                  │                   ║
              ▼                  ▼                   ▼
     ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
     │   gcloud     │   │  firebase    │   │   GitHub     │
     │   auth       │   │  login       │   │   OAuth      │
     │   (ADC)      │   │  (CLI token) │   │   + PAT      │
     └──────┬───────┘   └──────┬───────┘   └──────┬───────┘
            │                  │                   │
     ┌──────┴───────┐         │            ┌──────┴───────┐
     │ Cloud Run    │         │            │   Lovable    │
     │ BigQuery     │         │            │ (GitHub App  │
     │ Storage      │         │            │  auto-token) │
     │ AI Platform  │         │            └──────┬───────┘
     └──────┬───────┘         │                   │
            │                  │                   │
            ▼                  ▼                   ▼
     ┌─────────────────────────────────────────────────────┐
     │                  Antigravity IDE                     │
     │                                                      │
     │  firebase-mcp ←── ADC + Firebase CLI token           │
     │  cloudrun   ←── ADC                                  │
     │  github     ←── PAT (env var in mcp_config.json)     │
     │  bigquery   ←── ADC (GOOGLE_APPLICATION_CREDENTIALS) │
     │  thinking   ←── (none, local)                        │
     └──────────────────────┬──────────────────────────────┘
                            │
                     ┌──────┴───────┐
                     │   Stitch     │
                     │  Pipeline    │
                     │  (uses ADC)  │
                     └──────────────┘
```

---

## 9. Secrets Checklist

### ⛔ NEVER Commit These

| Secret                                 | Where It Lives                | Rotation      |
| -------------------------------------- | ----------------------------- | ------------- |
| Service account JSON keys              | CI/CD secret store            | Yearly        |
| GitHub PAT                             | MCP config / password manager | Every 90 days |
| Firebase CI token                      | CI/CD env var                 | Per login     |
| `.env` files with secrets              | Local only                    | As needed     |
| `application_default_credentials.json` | `%APPDATA%\gcloud\`           | Per login     |

### ✅ Safe to Commit (Public by Design)

| Item                                            | Why It's Safe                     |
| ----------------------------------------------- | --------------------------------- |
| Firebase SDK config (`apiKey`)                  | Restricted by HTTP referrer rules |
| `.firebaserc`                                   | Just a project alias              |
| `firebase.json`                                 | Hosting config only               |
| Cloud Run service URLs                          | Public endpoints                  |
| `mcp_config.json` (project level, without PATs) | Just server definitions           |

### .gitignore Must Include

```gitignore
# Secrets
sa-key.json
legalai-key.json
*.credentials.json
.env
.env.*

# ADC (should never be in project dir, but just in case)
application_default_credentials.json

# Generated
web/out/
web/.next/
node_modules/
__pycache__/
*.pyc
venv/
```

---

## 10. Token Renewal Schedule

| Token         | Expires                       | How to Renew                                             | Alert  |
| ------------- | ----------------------------- | -------------------------------------------------------- | ------ |
| GCP ADC       | ~1 hour (auto-refreshed)      | `gcloud auth application-default login`                  | Auto   |
| Firebase CLI  | ~1 hour (auto-refreshed)      | `firebase login`                                         | Auto   |
| GitHub PAT    | 90 days (set at creation)     | Regenerate at github.com/settings/personal-access-tokens | Manual |
| Lovable OAuth | Indefinite (until revoked)    | Re-authorize at lovable.dev                              | N/A    |
| SA key        | None (until manually deleted) | `gcloud iam service-accounts keys create`                | N/A    |

---

## 11. Troubleshooting Quick Reference

| Symptom                                  | Likely Cause                     | Fix                                                         |
| ---------------------------------------- | -------------------------------- | ----------------------------------------------------------- |
| `gcloud: command not found`              | SDK not installed or not in PATH | Install from cloud.google.com/sdk                           |
| `firebase: command not found`            | CLI not installed globally       | `npm install -g firebase-tools`                             |
| `ERROR: (gcloud.auth) ... invalid_grant` | ADC expired or revoked           | `gcloud auth application-default login`                     |
| Firebase MCP: "No project"               | `.firebaserc` missing or wrong   | Create `.firebaserc` with correct project ID                |
| GitHub MCP: "401 Bad credentials"        | PAT expired or wrong permissions | Regenerate PAT, update MCP config                           |
| GitHub MCP: "Resource not accessible"    | PAT scope too narrow             | Edit PAT → All repositories + R/W permissions               |
| `git push` rejected                      | Auth not configured              | `git config --global credential.helper manager`             |
| Lovable can't push to repo               | GitHub App not authorized        | Re-authorize at github.com/settings/installations           |
| Cloud Run deploy: "permission denied"    | Missing IAM roles                | Grant `roles/run.admin` + `roles/cloudbuild.builds.builder` |
| Stitch: "BigQuery access denied"         | ADC not set or project mismatch  | `gcloud auth application-default login` + check project ID  |
