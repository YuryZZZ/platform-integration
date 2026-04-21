# Authentication And Credentials Reference

> Portable reference for the Antigravity project template.
> Use placeholders in committed files. Keep real tokens and machine paths local only.

---

## Core Rule

A committed template file must never require one specific machine, username, project id, or personal token to work.

Safe in repo:

- placeholders such as `YOUR_PROJECT_ID`, `YOUR_GITHUB_OWNER`, `YOUR_LOCAL_USER`, `YOUR_STITCH_API_KEY`
- Firebase web SDK config examples marked as examples
- MCP reference files that require local replacement

Never commit:

- GitHub PATs
- service account JSON keys
- `.env.local`
- local ADC files
- personal Windows paths with real usernames unless clearly shown as placeholders

---

## Identity Split

These values are different and must stay different:

| Placeholder | Meaning |
| --- | --- |
| `YOUR_GITHUB_OWNER` | GitHub user or org that owns the repo |
| `YOUR_REPO` | repository name |
| `YOUR_LOCAL_USER` | local Windows account used in filesystem paths |
| `YOUR_PROJECT_ID` | Firebase / GCP project id |

Do not replace `YOUR_LOCAL_USER` with the GitHub owner unless both values truly match on that machine.

---

## Authentication Layers

| Platform | Auth method | Local storage | Verification |
| --- | --- | --- | --- |
| Google Cloud | OAuth + ADC | `%APPDATA%\gcloud\application_default_credentials.json` | `gcloud auth list` |
| Firebase CLI | OAuth | `%APPDATA%\firebase\` | `firebase projects:list` |
| GitHub git access | SSH or credential manager | OS-managed | `git ls-remote origin` or `ssh -T git@github.com` |
| GitHub MCP | Fine-grained PAT | local MCP config only | GitHub MCP tools respond |
| Lovable | GitHub OAuth app | managed by Lovable | sign in at lovable.dev |
| Antigravity MCP | inherits local credentials | Antigravity settings / local config | MCP tools respond |

---

## 1. Google Cloud

Interactive login:

```powershell
gcloud auth login
gcloud auth application-default login
```

What this gives you:

- authenticated `gcloud` CLI access
- ADC for Cloud Run, Firebase-backed tools, BigQuery, and other GCP SDKs

Recommended project setup:

```powershell
gcloud config set project YOUR_PROJECT_ID
gcloud config set compute/region YOUR_REGION
```

Common API enablement:

```powershell
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  firestore.googleapis.com \
  firebase.googleapis.com \
  bigquery.googleapis.com \
  --project=YOUR_PROJECT_ID
```

---

## 2. Firebase

Login:

```powershell
firebase login
```

Minimal committed project files:

`.firebaserc`

```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID"
  }
}
```

`firebase.json`

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

Notes:

- Firebase web `apiKey` is public by design, but keep examples generic in the framework.
- Use `cleanUrls: true` for multi-page static export flows.
- Avoid catch-all SPA rewrites in this template unless the project explicitly needs them.

---

## 3. GitHub

Git access options:

```powershell
git config --global credential.helper manager
```

or

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
ssh -T git@github.com
```

GitHub MCP requires a fine-grained PAT with at least:

- Contents: read/write
- Pull requests: read/write
- Issues: read/write
- Metadata: read
- Actions: optional but useful

Store that PAT only in local MCP config, never in the repository.

Example local-only MCP snippet:

```json
{
  "github": {
    "command": "C:\\Users\\YOUR_LOCAL_USER\\.gemini\\antigravity\\mcp_servers\\github-mcp-server\\github-mcp-server.exe",
    "args": ["stdio"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT"
    }
  }
}
```

---

## 4. Lovable

Lovable uses GitHub OAuth and the Lovable GitHub App.

Flow:

1. Sign into [Lovable](https://lovable.dev) with GitHub.
2. Authorize the Lovable GitHub App.
3. Connect the target repository.
4. Let Lovable create branches or PRs into GitHub.

No manual PAT is normally required for Lovable itself.

---

## 5. Antigravity And MCP

Antigravity consumes local MCP configuration and inherits your local credentials.

Template rule:

- committed reference files must use placeholders only
- the user copies them into local Antigravity or Gemini config and fills real values there

Portable example path pattern:

```text
C:\Users\YOUR_LOCAL_USER\AppData\Roaming\gcloud\application_default_credentials.json
```

Not portable:

```text
C:\Users\yuryz\AppData\Roaming\gcloud\application_default_credentials.json
```

---

## 6. Cloud Run

Deploys should use ADC from the local machine:

```powershell
gcloud run deploy SERVICE_NAME \
  --source . \
  --project YOUR_PROJECT_ID \
  --region YOUR_REGION
```

Each backend service should have its own `deploy.ps1` and be deployed from inside its own folder.

---

## 7. Validation Checklist

A project is auth-configured correctly when all of these are true:

- `gcloud auth list` shows the intended account
- `gcloud auth application-default login` has been run on this PC
- `firebase projects:list` works
- Git push/pull works with the chosen GitHub auth method
- Antigravity MCP tools can see Firebase/GCP/GitHub using local credentials
- No committed repo file contains a live PAT, service account key, or personal machine path

---

## 8. Rotation And Safety

Rotate or refresh:

- GitHub PATs on expiration or suspicion of exposure
- service account keys immediately if copied outside approved secret storage
- local CLI auth if tools begin failing with auth errors

Keep `.gitignore` covering at minimum:

```gitignore
.env.local
.env.*
*.credentials.json
application_default_credentials.json
sa-key.json
node_modules/
web/out/
web/.next/
```

---

## 9. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Firebase MCP tools fail | missing Firebase login or ADC | run `firebase login` and `gcloud auth application-default login` |
| Cloud Run deploy fails with permissions | wrong GCP account or project | check `gcloud auth list` and `gcloud config get-value project` |
| GitHub MCP returns 401 | PAT missing, expired, or under-scoped | create a new fine-grained PAT and update local MCP config |
| Generated project still mentions one username | stale template file | replace with placeholder-based reference and recommit |
| Bootstrap works only on one PC | machine-specific path is committed | move real values to local config and keep placeholders in repo |

---

## 10. Definition Of Done

The auth framework is done when a second machine can:

1. run local logins for Google, Firebase, and GitHub
2. copy placeholder values into local config only
3. use Antigravity and MCP without changing committed repository code
