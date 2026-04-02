# Official Google Stitch Prompt Guide
*(Sourced from the Google AI Developers Forum + March 2026 Updates)*

When using the Antigravity `Stitch MCP` or the web interface (`stitch.withgoogle.com`) to generate React UI screens, your prompts will dictate the quality of the generated code.

Always adhere to the following official Google Labs guidelines when authoring UI prompts:

## 0. Choose Your Generation Mode FIRST
Stitch offers three generation modes. Select the right one before prompting:

| Mode | Engine | When to Use |
|------|--------|-------------|
| **Ideate** | Fast exploration | Early brainstorming, divergent thinking, exploring many ideas |
| **Flash** | Speed-optimized | Rapid iteration, quick variants, low-stakes experiments |
| **Thinking** | Gemini 2.5 Pro | Production-quality, high-fidelity output for final screens |

> **Rule:** Use **Ideate** for the first 3-5 explorations. Switch to **Thinking** for the final production screens you intend to export as `DESIGN.md`.

## 1. Initial Prompt Generation
*   **Broad vs. Specific:** You can begin with a broad concept for exploration (e.g., *"An app for marathon runners"*) or provide specific details for higher precision from the start (e.g., *"An app for marathon runners with a bottom navigation bar, a map view on the home screen, and a list of upcoming races formatted as cards"*).

## 2. Refinement Rules (Iterating)
*   **Focus on Specifics:** **Do not ask for massive overhauls.** Work on one screen or component at a time. Make only one or two adjustments per prompt.
*   **Be Specific and Concise:** Avoid ambiguity. 
    * ❌ *Bad Rule:* "Make the homepage look better."
    * ✅ *Good Rule:* "Add a full-width search bar to the hero section of the homepage with a magnifying glass icon."

## 3. UI/UX Vocabulary Requirement
*   **Use Exact Terminology:** The AI generates more accurate code when you use standard CSS and UI terminology. Always refer to elements by their proper names:
    * "Navigation Bar / App Bar / Header"
    * "Call-to-Action (CTA) Button"
    * "Card Layout / Grid View"
    * "Floating Action Button (FAB)"
    * "Drawer / Sidebar"
    * "Hero Section"
    * "Bottom Sheet / Modal"
    * "Skeleton Loader / Shimmer"

## 4. Setting the Vibe (Design Tokens)
*   Use descriptive adjectives to heavily influence the AI's selection of semantic color palettes, typography, and imagery. 
    * Examples: *"Vibrant, Glassmorphism, Minimalist, Corporate, Dark Mode, High-Contrast, Playful, Brutalist, Neumorphic."*

## 5. Voice Interaction (New — March 2026)
*   You can now interact with the Stitch canvas via **voice** to critique designs, request variations (e.g., "show me this in warmer colors"), or interview the Design Agent to define product requirements.
*   The **Design Agent** tracks your full project history across all prompts for better consistency than single-prompt generation.

## 6. The Iterative Approach
*   **Do not expect perfection on the first output.** Generative UI is designed for iteration. If a change does not meet expectations, review the output, and rephrase the prompt to target the specific misinterpretation.

## 7. Precision Limitation (Critical Warning)
*   **Vibe design fails at precision.** "Make the button 2px bigger" is a spec, not a vibe.
*   Always treat Stitch output as a **starting scaffold**. Route all precision work through the component override system or direct code editing in Antigravity.

## 8. Export Targets
Stitch can export to multiple formats:
*   **React/Tailwind code** — Primary for Antigravity consumption
*   **HTML/CSS** — Standalone static exports
*   **Figma** — Retains layers and Auto Layout
*   **DESIGN.md** — Machine-readable design tokens
*   **ZIP download** — For offline use
*   **Google AI Studio** — For further AI exploration

---

### Real-World Antigravity Example:
*"Antigravity, use your Stitch MCP in **Thinking** mode. Generate a new dashboard screen for a financial admin. It should have a minimalist, dark mode aesthetic. Include a left-side Drawer navigation, a top Header with a profile avatar, and a central 3-column Grid View consisting of Card Layouts highlighting 'Total Revenue', 'Active Users', and 'Pending Tickets'."*
