# TASK-007: Phase 3 - Security Hardening

## Objective
Implement Stage 16 of the Master Plan. Establish core security services (GDPR handling, rate limiting, and input sanitization) for the multi-tenant SaaS architecture. AI-specific security (prompt defense, retention crons for voice) will be skipped per user request.

## Affected Components
- `src/app/api/admin/gdpr/route.ts`: GDPR deletion handler.
- `src/lib/api/rate-limiter.ts`: Redis/In-memory rate limiting logic.
- `src/lib/api/sanitize.ts`: Input sanitization middleware/function.
- `src/lib/gdpr/pii-redactor.ts`: Service to redact PII from logs.

## Sequential Plan
### Step 1: GDPR Deletion Edge API (`app/api/admin/gdpr/route.ts`)
- **What**: Create an API route to handle GDPR 'Right to be Forgotten' user deletion requests.
- **How**: Accept `userId` or `email`, verify admin privileges, and mock the deletion queue insertion.

### Step 2: Rate Limiter (`lib/api/rate-limiter.ts`)
- **What**: Implement token bucket or sliding window rate limiting.
- **How**: Build a generic rate limit service exported for Next.js Route Handlers.

### Step 3: Input Sanitization (`lib/api/sanitize.ts`)
- **What**: XSS and NoSQL injection defense.
- **How**: Export a utility that recursively sanitizes strings in JSON payloads using standard regex or a sanitizer library.

### Step 4: PII Redaction (`lib/gdpr/pii-redactor.ts`)
- **What**: Prevent PII (emails, phone numbers, credit cards) from entering the audit logs.
- **How**: Implement regex-based masking for standard PII formats.

---

## Execution Record
- [x] Step 1: GDPR Route
- [x] Step 2: Rate Limiter
- [x] Step 3: Input Sanitizer
- [x] Step 4: PII Redactor

### Status: DONE
All core security logic (GDPR cleanup, Rate Limits, Payload Sanitization, and Log Redaction) has been established to harden the tenant borders.
