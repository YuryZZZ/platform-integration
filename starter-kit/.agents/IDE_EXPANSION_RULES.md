---
description: System instructions forcing Antigravity to autonomously expand short user prompts into 1000+ word engineering-grade queries by ingesting the docs/ folder.
---

# Antigravity Super-Prompt Expansion Rules
*(System Level Prompting Engine)*

## Primary Directive
When a user issues a short operational command (e.g., *"Antigravity, generate the prompt for Lovable to build my dashboard"* or *"Antigravity, refactor this component to use Firebase"*), **you must NOT simply pass the short string along.**

You are required to process the short intent, read the localized context from the `docs/` directory, and autonomously synthesize a massive, 1,000+ word expert-level super-prompt that incorporates all business, design, and technical requirements simultaneously.

## Step 1: Ingest Context (The "Design Folder" Crawl)
Before generating any code or executing any subprocess (Stitch MCP or Jules CLI), you must silently read the following files:
1. `docs/DESIGN.md` (For brand colors, spacing, typography rules)
2. `docs/PROJECT_SPEC.md` (For Autonomy Levels and Database Policy constraints)
3. `docs/STITCH_PROMPT_GUIDE.md` (For UI component vocabulary limits and generation mode selection)
4. `docs/LOVABLE_PROMPT_GUIDE.md` (To prevent Supabase logic generation and enforce `.lovable/` folder)
5. `docs/FIREBASE_PROMPT_GUIDE.md` (To enforce v9 SDK rules and Firebase App Hosting)
6. `docs/JULES_PROMPT_GUIDE.md` (For async delegation, Critic Agent, and parallel task spawning)
7. `docs/COMPETITOR_RESEARCH.md` (For pre-build market intelligence — if populated)
8. `docs/PAYLOAD_PROMPT_GUIDE.md` (For Payload CMS collections, governance workflow, Local API safety, and RLS boundary)

## Step 2: Assemble the Mega-Prompt
If the user asks: *"Build me a new login screen"*

Your internal processing must construct a multi-part Mega-Prompt before attempting to generate the output:

### [Part A: Core Instruction & Vocabulary]
"Generate a standalone `LoginScreen.tsx` component formatted as a centered Card Layout."

### [Part B: Injected Visual Guidelines (From DESIGN.md)]
"You MUST strictly adhere to the following design system tokens: Primary background is #111827. CTA Button is #3B82F6. Border radius is `rounded-xl`. Typography is 'Inter' font family. Padding must follow the 8px grid system exclusively."

### [Part C: Architecture Constraints (From LOVABLE / FIREBASE GUIDES)]
"This component will be integrated into Firebase. DO NOT generate Supabase logic. Form state must be managed with a controlled React component. Prepare an `onSubmit` handler that expects `email` and `password` strings, but leave the internal logic blank or filled with a console warning. The actual Firebase integration will be handled by a higher-order component."

### [Part D: Deployment Constraints (From FIREBASE GUIDE)]
"This project uses Firebase App Hosting (GA) for Next.js. Deploy via GitHub connection with automatic Cloud Run provisioning. Store secrets in Cloud Secret Manager via `apphosting.yaml`. Never hardcode API keys."

### [Part E: Lovable Folder Generation (From LOVABLE GUIDE)]
"If generating output intended for Lovable, also create a `.lovable/system.md` file containing the design tokens from DESIGN.md so that future Lovable generations maintain consistency automatically."

## Step 3: Execution Output
Once the massive 1,000-word prompt is constructed internally:
1. Provide the code or the output requested directly.
2. If the user asked you to *generate the prompt* for another AI (like Lovable), present the full 1,000-word mega-prompt in a markdown code block so they can easily copy and paste it into the Lovable web UI.

**By following these rules, Antigravity acts as a 1000x multiplier. The user provides a 5-word sentence, and Antigravity outputs a production-grade, highly scoped engineering instruction based on the entire `Design` folder context.**
