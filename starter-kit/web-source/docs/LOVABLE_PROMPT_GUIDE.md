# Official Lovable Prompt Guide
*(For use with lovable.dev Vibe Coding & React UI Generation — Updated March 2026)*

Lovable is a powerful full-stack generation engine. When operating within the Antigravity ecosystem, Lovable is used strictly as the **Upstream Visual Engine**.

To ensure Antigravity can reliably expand simple user requests into extremely detailed Lovable prompts (often expanding a 10-word request into a 1,000-word prompt), adhere to the following rules:

## 0. Use the `.lovable` Folder for Design Systems (Preferred)
Lovable now supports a native **`.lovable` folder** for formalized design system enforcement:

```
.lovable/
├── system.md       # Core installation instructions and high-level guidelines
└── rules/
    ├── colors.md   # Color palette specifications
    ├── spacing.md  # Grid and spacing rules
    └── components.md  # Component patterns and behaviors
```

* **How it works:** Lovable reads these files automatically during every generation. 
* **Integration with DESIGN.md:** When starting a new Lovable project, Antigravity should auto-generate the `.lovable/system.md` file from your `docs/DESIGN.md` tokens.
* **This replaces manual prompt injection** for design consistency in ongoing projects.

## 1. The "Design Injection" Rule (For Initial Prompts)
For the **first prompt** when creating a new Lovable project (before `.lovable/` exists), you **must inject the `DESIGN.md` parameters directly into the prompt**. 
Antigravity will automatically expand short prompts by prepending:
> *"Strictly adhere to the following semantic design tokens: [Contents of DESIGN.md]. Do not deviate from these hex codes or typography choices."*

## 2. Use Plan Mode Before Agent Mode
Lovable now offers **Plan Mode** (Feb 2026) which lets you review a detailed plan before the AI generates code.
* **Rule:** Always start complex features in **Plan Mode** first. Review the plan. Then switch to **Agent Mode** for execution.

## 3. Component Isolation Rule (Preventing Overwrites)
When generating UI for an *existing* application, you must explicitly instruct Lovable not to alter core layout structures.
* ❌ *Bad Prompt:* "Add a pricing table to the site."
* ✅ *Good Prompt (Antigravity Expanded):* "Generate a standalone React component called `PricingTable.tsx`. Do not edit the `App.tsx` or `index.css` root files. Keep it completely isolated so I can pull it via GitHub and mount it manually."

## 4. The "Mock Data Only" Rule (Firebase Preparation)
Lovable defaults to integrating Supabase. Since this architecture relies on Firebase, you must actively prevent Lovable from scaffolding real backend logic.
*   **Always include the following constraint in your Lovable prompt:**
> *"Do NOT add any backend logic, Supabase database queries, or authentication middleware. Build the UI completely statelessly using high-quality Typescript interfaces and hardcoded mock data. My local AI IDE (Antigravity) will handle the Firebase data wiring later."*

## 5. Agent Mode Safety Warning
> ⚠️ **Agent Mode calls are potentially destructive.** Agent Mode takes complete ownership of tasks, searches your codebase, and applies changes across multiple files autonomously.
> 
> **Rule:** Always snapshot to GitHub (`git commit && git push`) before running Agent Mode on any existing project.

## 6. Visual Edits (Click-to-Modify)
Lovable now supports **Visual Edits** — you can click and modify interface elements (text, colors, spacing) directly in the browser editor without writing prompts.
* **When to use:** Fine-tuning after initial generation. Faster than re-prompting for simple text or color changes.

## 7. The Complexity Ceiling
If a screen is too complex (e.g., a dashboard with 15 different charts and 4 sidebars), Lovable will timeout or truncate code.
*   **Rule:** Antigravity must break massive requests into sequential prompts. Instruct Lovable to build the `Sidebar` first, wait for output. Then instruct it to build the `MainContentArea`, wait for output. Compose them slowly.

---

### Example Antigravity Expansion Prompt:
If the user types: *"Antigravity, generate the prompt I need to paste into Lovable for our new chat interface."*

**Antigravity will generate:**
*"Build a standalone React component containing a modern Chat Interface. Strictly adhere to the following design system: Use #0F172A for the background, #3B82F6 for primary sent-message bubbles. Typography must be 'Inter'. Do NOT include any Supabase backend logic; use a mock array of 5 sample chat messages. Ensure the component relies purely on Tailwind CSS for styling and exports a single `ChatWindow` component. Create a `.lovable/system.md` file containing these design tokens for future consistency."*
