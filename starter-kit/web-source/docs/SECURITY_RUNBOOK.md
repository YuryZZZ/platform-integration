# Security Runbook — Nexus AI Emergency Procedures
> Spec §16: Emergency lockdown, incident response, rollback procedures
> **Owner**: SRE / Security team
> **Last Updated**: 2026-03-22T21:45:00Z

> [!CAUTION]
> This runbook contains destructive actions. Verify incident scope before executing any step.

---

## 1. Emergency Stop — Disable ALL Autonomous Actions

If `.emergency-stop` file exists at repo root, all agent actions halt.

```powershell
# CREATE emergency stop (disables AI gateway, autonomous deploys)
New-Item -Path "..\.emergency-stop" -ItemType File -Force
# Or on Linux/Mac:
touch ../.emergency-stop
```

```powershell
# REMOVE emergency stop (re-enables normal operation)
Remove-Item "..\.emergency-stop"
```

---

## 2. AI Gateway Kill Switch

### Instant disable (env — no deploy required)
```bash
# Set in Cloud Run environment
gcloud run services update nexus-web \
  --update-env-vars FEATURE_AI_CHAT=false

# Or set in .env.local for local dev
echo "FEATURE_AI_CHAT=false" >> .env.local
```

### DB-level disable (affects all instances immediately)
```sql
UPDATE feature_flags SET enabled = false WHERE key = 'FEATURE_AI_CHAT';
```

### Re-enable
```sql
UPDATE feature_flags SET enabled = true WHERE key = 'FEATURE_AI_CHAT';
```

---

## 3. Tenant Isolation Breach

If cross-tenant data leakage is detected:

**Step 1 — Lockdown affected tenant**
```sql
-- Revoke all sessions for affected tenant
DELETE FROM sessions WHERE tenant_id = '<affected-tenant-uuid>';

-- Log the incident
INSERT INTO audit_logs (action, resource_type, details)
VALUES ('security.breach', 'tenant', '{"severity": "critical", "action": "sessions_revoked"}');
```

**Step 2 — Verify RLS is active**
```sql
-- Check RLS on all tenant tables
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('users', 'sessions', 'ai_conversations', 'ai_messages',
                    'voice_transcripts', 'workflow_definitions', 'prompt_embeddings');
-- All rows should show rowsecurity = true
```

**Step 3 — Force tenant context in pg_stat_activity**
```sql
SELECT pid, usename, application_name, state, query
FROM pg_stat_activity
WHERE query NOT LIKE '%pg_stat_activity%';
```

**Step 4 — Rotate tenant secret + notify**
- Rotate `PAYLOAD_SECRET` and `JWT_SECRET`
- Notify affected tenant within 72 hours (GDPR Art. 33)
- File incident report in `docs/incidents/YYYY-MM-DD-breach.md`

---

## 4. Data Breach Response

### Scope assessment checklist
- [ ] Which tables were accessed?
- [ ] Which tenants are affected?
- [ ] Was PII (email, phone, IP) exposed?
- [ ] Was AI conversation data exposed?
- [ ] Time window of exposure

### Immediate containment
```bash
# 1. Take app offline
gcloud run services update nexus-web --no-traffic

# 2. Capture last 50 lines of logs
gcloud run services logs read nexus-web --limit=50 > /tmp/incident-logs.txt

# 3. Create rollback target
gcloud run revisions list --service nexus-web --limit=5
```

### GDPR notification timeline
- **72 hours**: Notify relevant supervisory authority (ICO for UK)
- **Without undue delay**: Notify affected data subjects if high risk
- **30 days**: Complete internal incident report

---

## 5. High Error Rate Rollback

**Trigger**: >5% error rate for >2 minutes post-deploy

```bash
# Identify last stable revision
gcloud run revisions list --service nexus-web --filter="status.conditions.type=Ready" --limit=5

# Roll back to previous revision
gcloud run services update-traffic nexus-web \
  --to-revisions=REVISION_NAME=100
```

---

## 6. P99 Latency Spike

**Trigger**: p99 latency >2× baseline for >3 minutes

```bash
# Check AI gateway latency
gcloud run services describe nexus-web --format="json" | jq '.status'

# Disable RAG (reduce DB load)
UPDATE feature_flags SET enabled = false WHERE key = 'FEATURE_KNOWLEDGE';

# Scale up
gcloud run services update nexus-web --min-instances=3 --max-instances=50
```

---

## 7. Rate Limit Bypass Attack

If the in-memory rate limiter is bypassed (e.g., IP spoofing):

```bash
# Enable strict Cloud Armor rules
gcloud compute security-policies rules create 1000 \
  --security-policy=nexus-waf \
  --src-ip-ranges="<attacker-cidr>/32" \
  --action=deny-403
```

---

## 8. Contacts

| Role | Contact |
|------|---------|
| On-call SRE | `#sre-oncall` Slack |
| Data Protection Officer | dpo@nexus.ai |
| Legal (GDPR) | legal@nexus.ai |
| Cloud Provider (GCP) | support.google.com |

---

## 9. Post-Incident

After incident resolution:
1. Remove `.emergency-stop` file
2. Re-enable feature flags
3. Update `docs/incidents/` with timeline and root cause
4. Run full `verify-pyramid` (lint → type → test → build → health)
5. Update this runbook with any new procedures learned
