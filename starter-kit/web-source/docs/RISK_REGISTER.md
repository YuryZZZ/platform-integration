# Risk Register
*(Maintained by the project team — reviewed monthly)*

> **Source:** openai.txt §Risk Register + operational experience

---

## Active Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Firebase Studio sunset before migration complete | High | High | Migration bridge in Weeks 1–2. Hard deadline at Month 6. All workspaces audited immediately. |
| R2 | Stitch API quota exhausted (350 standard + 50 experimental/month) | High | Medium | Cache all exports. Surface quota in admin dashboard. Fallback to static scaffold templates. |
| R3 | Antigravity public preview instability | High | Medium | Wrap all calls in try/catch. Fallback to manual scaffold output. |
| R4 | Lovable message or credit limits hit | Medium | Medium | Monitor usage. Quota-aware routing. Fallback to Antigravity code path. |
| R5 | Stitch precision failures on detailed specs | High | Medium | Treat Stitch as scaffold only. All precision work goes through component override system. |
| R6 | Container queries unsupported on older TVs | High | High | Core TV layout must not depend on container queries. Grid and Flex fallbacks required. |
| R7 | SpeechRecognition unreliable across browsers and TV | High | High | MediaRecorder + server STT baseline always primary. SpeechRecognition is optional enhancement only. |
| R8 | Bundle budget exceeded by animation libraries | Medium | High | GSAP marketing-only via dynamic import. Route-level lazy loading. No heavy runtimes on app routes. |
| R9 | Focus traps on TV | Medium | High | Playwright traversal tests. Real-device certification. Runtime focus anomaly logging. |
| R10 | Tenant data leakage across RLS boundary | Low | **Critical** | RLS on all tenant tables. Payload ACL never replaces RLS. Integration tests on every change. |
| R11 | GDPR deletion failure | Low | High | Deletion workflow tests required before every major release. Retention audit schedule enforced. |
| R12 | GitHub webhook secret exposed or missing verification | Low | High | Rotate quarterly. Verify HMAC on every payload. Never skip signature check in any environment. |
| R13 | PostgreSQL / Firebase data layer boundary violated | Medium | High | Architecture review required before any cross-layer data access. This boundary is hard. |

---

## Risk Review Log

| Date | Reviewer | Changes |
|------|----------|---------|
| 2026-03-30 | Antigravity | Initial register created from openai.txt |
