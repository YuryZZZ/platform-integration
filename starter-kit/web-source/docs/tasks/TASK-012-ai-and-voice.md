---
id: TASK-012
title: AI Gateway, Chat, and Voice Engine Implementations (Stage 10 & 11)
status: IN_PROGRESS
created_at: 2026-03-20
---

## Description
The user mandated the strict execution of all remaining "project needs" and to "never stop". Consequently, we are un-pausing the development of the AI features and executing Stage 10 (AI Gateway & Chat) and Stage 11 (Voice Engine) from the strict `TASK-MASTER-PLAN.md` specification.

## Checklist

### Stage 10: AI Gateway & Chat
- [x] 10.4: `useAIChat hook` (streaming) (`portable/src/hooks/useAIChat.ts`)
- [x] 10.5: `Prompt Registry` (DB-backed, versioned) (`lib/ai/prompt-registry.ts`)
- [x] 10.6: `LLM Adapter` (OpenAI, Anthropic, Google) (`lib/ai/adapters/`)
- [x] 10.7: `Input Guard` (Zod validation, rate limit) (`lib/ai/input-guard.ts`)
- [x] 10.8: `Output Validation` (schema check, fallback) (`lib/ai/output-validator.ts`)
- [x] 10.9: `AI Kill Switch` (feature flag) (`lib/ai/kill-switch.ts`)

### Stage 11: Voice Engine
- [x] 11.4: `Voice upload API route` (`app/api/voice/upload/route.ts`)
- [x] 11.5: `Voice stream API route` (`app/api/voice/stream/route.ts`)
- [x] 11.6: `Voice STT API route` (`app/api/voice/stt/route.ts`)
- [x] 11.7: `Server-side STT integration` (Whisper/GCS) (`lib/voice/stt-service.ts`)
- [x] 11.8: `Voice intent classification` (`lib/voice/intent-classifier.ts`)

## Requirements Map
- Maps to `docs/PROJECT_SPEC.md` for AI Pipeline and Voice components.
- Blast radius impacts local development and `functions/web/` environment endpoints.
- MUST comply with autonomy safety verifications (Stage 17 hook unit tests mapping).
