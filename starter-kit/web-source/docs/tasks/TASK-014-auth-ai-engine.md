# Task 014: Auth, AI Gateway, and Voice Engine 

## Objective
Complete Stage 9 (Auth System integrations), Stage 10 (AI Gateway & Chat logic guards), and Stage 11 (Voice APIs) to bring the Master Plan up to 100% across the backend AI boundaries.

## Plan
1. **Stage 9: Auth Integration**
   - Create OAuth wrappers (`lib/auth/providers/oauth.ts`) mapping internal session states to external providers.
2. **Stage 10: AI Gateway**
   - Implement `useAIChat.ts` for front-end interface connecting to the streaming endpoints.
   - Flesh out `prompt-registry.ts` defining abstract DB-backed system prompts.
   - Build `adapter-registry.ts` switching models (OpenAI vs Anthropic) dynamically.
   - Create `input-guard.ts` (Zod schemas checking for injection bounds constraints).
   - Create `output-validator.ts` verifying LLM responses.
   - Inject the `kill-switch.ts` utilizing Redis/environment variables to sever the AI immediately if compromised.
3. **Stage 11: Voice Engine**
   - Implement `/voice/upload` endpoint.
   - Implement `/voice/stream` endpoint for continuous socket payloads.
   - Implement `/voice/stt` using Whisper AI transcription schemas.
   - Create `stt-service.ts` separating logic from route.
   - Create `intent-classifier.ts` parsing plain text transcripts into deterministic operational objects for workflows.

## Execution Record
- [x] Task 9.5: OAuth Providers
- [x] Task 10.4: useAIChat hook
- [x] Task 10.5: Prompt Registry
- [x] Task 10.6: LLM Adapters
- [x] Task 10.7: Input Guard 
- [x] Task 10.8: Output Validator
- [x] Task 10.9: Kill Switch
- [x] Task 11.4 - 11.8: Voice APIs and Processing

### Status: DONE
