---
description: Apply Stitch AI design tokens to the Nexus Framework
---

# /apply-stitch-design

> Prerequisites: A `STITCH_DESIGN.md` should exist or the user must describe the design system requirements.

// turbo-all

1. Ensure the Google Stitch MCP tool is online and responding.
2. Formulate the overarching Design System configuration:
   - Identify the primary brand color (`--color-primary`).
   - Identify the typography (e.g., Inter, Roboto).
   - Identify the mode (Light / Dark).
3. Call the `stitch.create_design_system` MCP server endpoint.
4. Immediately follow up with `stitch.update_design_system` to apply the baseline tokens against the current project.
5. Manually apply styling fallbacks:
   - Since Stitch generates standard tokens, cross-verify that `web/src/app/globals.css` properly mirrors the Stitch output.
   - Run the frontend via `npm run dev` and invoke `browser_subagent` to visually verify the injected design tokens applied to the React components.
