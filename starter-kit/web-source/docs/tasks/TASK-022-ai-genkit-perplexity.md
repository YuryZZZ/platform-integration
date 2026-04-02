# TASK-022: AI Integration & Workflow Control (Specs 61-70)

## Objective
Implement Domain 7 leveraging Google's Genkit serverless models crossed precisely with the Perplexity API. This constructs a deterministic AI pipeline combining local logic routing with deep-research verification routines.

## Affected Components
- `portable/src/lib/ai/genkit.ts` (Spec 61, 63: Genkit Boot/Tracing)
- `portable/src/lib/ai/flows.ts` (Spec 62, 68: Flow Definitions & Fallbacks)
- `portable/src/lib/ai/perplexity.ts` (Spec 65, 66: Fact Checks / Research)
- `portable/src/lib/ai/plugins/internal-api.ts` (Spec 69: Custom plugins)
- `portable/src/lib/ai/sanitization.ts` (Spec 70: PII Guards)
- `portable/docs/GENKIT_GUIDE.md` (Spec 64: Dev usage guide)

## Sequential Plan
### Step 1: Base Genkit Runtime
- **What**: Initialize Genkit telemetry and routing logic.
- **How**: Abstract `configureGenkit` activating local plugin endpoints with Stackdriver/GCP tracing contexts.

### Step 2: Perplexity Extractor
- **What**: Engineer deterministic API queries toward Perplexity models parsing complex systemic facts.
- **How**: Build fetch wrappers strictly asserting structured outputs.

### Step 3: PII Filters & Flow Construction
- **What**: Bind GDPR scrubbers over payloads and combine Perplexity logic into Genkit chains.
- **How**: Create a Redaction middleware triggering prior to firing Genkit flows. Fallback failovers implemented via Try/Catch on API limits.

### Step 4: Documentation (Guide)
- **What**: Define usage for local dev iteration.
- **How**: Produce `GENKIT_GUIDE.md` detailing start commands (`genkit start`).

---

## Execution Record
- [x] Step 1: Genkit Boot & Registry
- [x] Step 2: Perplexity API
- [x] Step 3: Secure AI Flows
- [x] Step 4: Genkit Guides

### Status: DONE
