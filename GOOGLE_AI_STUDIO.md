# Google AI Studio Integration Guide

> **Google AI Studio** (aistudio.google.com) is the primary AI/LLM layer in this stack.
> It gives you direct access to Gemini 2.5 Pro, Gemini Flash, and all Google AI models
> via a simple API key — no Cloud project required to get started.

---

## 1. Get Your API Key (2 minutes)

1. Go to **https://aistudio.google.com**
2. Sign in with your Google account
3. Click **Get API Key** → **Create API key**
4. Copy the key — add it to `.env.local`:

```env
GOOGLE_AI_API_KEY=AIza...your_key_here
```

> **Note**: AI Studio API key is FREE up to generous quotas.
> For production scale, switch to Vertex AI using the same Gemini models.

---

## 2. Install the SDK

```powershell
cd web
npm install @google/generative-ai
```

---

## 3. Client Utility (pre-built in this template)

The template includes `web/src/lib/gemini.ts` — a ready-to-use Gemini client:

```typescript
import { gemini, geminiFlash } from '@/lib/gemini';

// Single generation
const text = await gemini.generate('Write a description for a Victorian house extension');

// Streaming generation
const stream = await gemini.stream('Describe our services', { systemPrompt: 'You are a helpful builder assistant.' });

// Vision (image analysis)
const result = await gemini.vision(imageBase64, 'Describe this building project photo');

// Function calling
const result = await gemini.functionCall('Get the latest reviews', tools);
```

---

## 4. Available Models

| Model | Use Case | Speed | Quality |
|-------|----------|-------|---------|
| `gemini-2.5-pro` | Complex reasoning, long documents | Slower | Highest |
| `gemini-2.0-flash` | Real-time chat, quick generation | Fastest | High |
| `gemini-2.0-flash-thinking` | Step-by-step reasoning | Medium | Very High |

Set in `.env.local`:
```env
GOOGLE_AI_MODEL=gemini-2.0-flash          # default — fast and capable
GOOGLE_AI_MODEL_PRO=gemini-2.5-pro        # for complex tasks
```

---

## 5. Common Use Cases for Web Projects

### 5a — AI Chat / Enquiry Bot

```typescript
// src/app/api/chat/route.ts
import { gemini } from '@/lib/gemini';

export async function POST(req: Request) {
  const { message } = await req.json();
  
  const response = await gemini.generate(message, {
    systemPrompt: `You are a helpful assistant for ${process.env.NEXT_PUBLIC_SITE_NAME}. 
    Answer questions about our services. Be concise and professional.
    If asked about pricing, direct to the contact form.`,
  });
  
  return Response.json({ reply: response });
}
```

### 5b — Quote Estimator

```typescript
// src/app/api/estimate/route.ts
import { gemini } from '@/lib/gemini';

export async function POST(req: Request) {
  const { projectType, size, location } = await req.json();
  
  const estimate = await gemini.generate(
    `Estimate cost for: ${projectType}, ${size}sqm, ${location}`,
    { systemPrompt: 'You are a construction cost estimator. Give range in GBP.' }
  );
  
  return Response.json({ estimate });
}
```

### 5c — SEO Content Generation

```typescript
// scripts/generate-content.ts
import { gemini } from '@/lib/gemini';

const description = await gemini.generate(
  `Write a compelling 155-character meta description for a ${service} company in ${location}. 
   Include keywords naturally. Brand tone: professional, trustworthy.`
);
```

### 5d — Review Summariser

```typescript
const summary = await gemini.generate(reviews.join('\n'), {
  systemPrompt: 'Summarise these customer reviews into 2 sentences. Be objective and positive where warranted.'
});
```

---

## 6. Grounding with Google Search (Real-Time Data)

Gemini can search the web to answer questions about current events, pricing, regulations:

```typescript
const result = await gemini.generate(
  'What are current building regulations for loft conversions in London 2025?',
  { tools: [{ googleSearch: {} }] }  // grounding with Google Search
);
```

---

## 7. Jules + Google AI Studio

Jules uses **Gemini 3.1 Pro** internally. When sending Jules tasks, you can reference AI Studio:

```
/jules Add an AI chat widget to the contact page.
Use the existing @/lib/gemini Gemini client.
The widget should appear as a floating button (bottom-right).
It should answer questions about our services using the GOOGLE_AI_API_KEY.
Submit PR titled "feat: add AI chat widget"
```

---

## 8. Environment Variables Reference

```env
# ── Google AI Studio ─────────────────────────────────────
GOOGLE_AI_API_KEY=AIza...              # From aistudio.google.com
GOOGLE_AI_MODEL=gemini-2.0-flash       # Default model
GOOGLE_AI_MODEL_PRO=gemini-2.5-pro     # Pro model for complex tasks

# ── Optional: Vertex AI (production scale) ────────────────
# GOOGLE_CLOUD_PROJECT=your-project-id
# GOOGLE_CLOUD_LOCATION=us-central1
# (Uses ADC instead of API key when set)
```

---

## 9. Free Tier Limits (AI Studio)

| Model | Requests/min | Tokens/day | Cost |
|-------|-------------|------------|------|
| Gemini 2.0 Flash | 15 RPM | 1M TPD | Free |
| Gemini 2.5 Pro | 2 RPM | 50K TPD | Free |

For production load → upgrade to pay-as-you-go or Vertex AI.

---

## Reference Links

| Resource | URL |
|----------|-----|
| Google AI Studio | https://aistudio.google.com |
| Gemini API docs | https://ai.google.dev/docs |
| SDK npm package | https://www.npmjs.com/package/@google/generative-ai |
| Model catalogue | https://ai.google.dev/gemini-api/docs/models |
| Pricing | https://ai.google.dev/pricing |
