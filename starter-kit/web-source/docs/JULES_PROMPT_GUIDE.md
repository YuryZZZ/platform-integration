# Jules Prompt Guide
*(For use with Antigravity delegation to Google Jules cloud agent)*

Jules is Google's **asynchronous, cloud-native coding agent** powered by **Gemini 3.1 Pro**. It runs on isolated Google Cloud VMs, supports up to **60 concurrent tasks**, and includes a **Critic Agent** that adversarially reviews its own code before submitting PRs.

When Antigravity delegates tasks to Jules, the prompts must be structured for maximum precision because Jules operates **without interactive feedback** — it gets one prompt, plans, executes, and submits a PR.

## 1. When to Delegate to Jules (Decision Rule)
| Scenario | Use |
|---|---|
| Quick file edit (< 10 files) | **Antigravity** (local) |
| Local debugging with browser | **Antigravity** (local) |
| Repo-wide refactor (100+ files) | **Jules** (cloud) |
| Dependency update (entire monorepo) | **Jules** (cloud) |
| Security audit + auto-patching | **Jules** (cloud) |
| Multi-hour migration task | **Jules** (cloud) |
| Feature development (interactive) | **Antigravity** (local) |
| Deployment + verification | **Antigravity** (local) |

## 2. Prompt Structure for Jules
Jules prompts must always specify:
1. **Scope** — exactly which directories/files to touch
2. **Action** — what to change
3. **Constraints** — what NOT to change
4. **Verification** — how to prove it worked (run tests, build)
5. **Output** — submit a PR with descriptive title

**Expansion Rule:** When the user says "send this to Jules", Antigravity MUST expand into this structure:

> *"/jules 'SCOPE: Scan all files in `src/` and `functions/`. ACTION: Refactor all CommonJS `require()` statements to ES module `import` syntax. Update `package.json` to set `type: module`. Fix all relative import paths to include file extensions. CONSTRAINTS: Do NOT modify any test files in `__tests__/` or config files in the root. VERIFICATION: Run `npm run build` and `npm test` after all changes. OUTPUT: Submit a single PR titled `refactor: migrate to ES modules`.'"*

## 3. Critic Agent Awareness
Jules now includes an integrated Critic Agent that performs adversarial self-review.
*   **Rule:** You do NOT need to ask Jules to review its own code — the Critic Agent does this automatically before submitting the PR.
*   **Advanced Rule:** For high-risk changes (security patches, schema migrations), explicitly ask Jules to run the Critic Agent twice:
> *"/jules '... After completing all changes, run your Critic Agent in STRICT mode focusing on security implications before submitting the PR.'"*

## 4. Parallel Task Spawning
Jules supports up to 60 concurrent sessions. For large audits, spawn parallel tasks:
> *"/jules 'Fix all SQL_INJECTION vulnerabilities. Create a focused PR.'"*
> *"/jules 'Fix all XSS vulnerabilities. Create a focused PR.'"*
> *"/jules 'Fix all EXPOSED_SECRETS issues. Create a focused PR.'"*

Each runs on a separate VM simultaneously.

## 5. Proactive Maintenance
Jules can scan repos for `#TODO` comments and deployment errors without an explicit prompt.
*   **Rule:** After any major deployment, consider running:
> *"/jules 'Scan the entire repository for TODO comments, FIXME tags, and deprecated API usage. Create a prioritized list as a GitHub Issue, then fix the top 5 highest-priority items and submit a PR.'"*

## 6. Post-Jules Handoff (Back to Antigravity)
After Jules completes and submits a PR:
```powershell
# 1. Pull the Jules branch
git fetch origin && git pull origin master --ff-only

# 2. Verify locally
/verify-pyramid

# 3. Deploy changed functions
/deploy-changed

# 4. Update deployment log
# Antigravity updates docs/deployments.md automatically
```
