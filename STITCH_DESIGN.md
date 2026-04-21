# Google Stitch — AI Design Platform Integration

> **Purpose**: How to use Google Stitch for AI-powered UI design and connect it to
> Antigravity via MCP for seamless design-to-code workflows.
>
> **Version**: 1.0.0 | **Last Updated**: 2026-03-30

---

> [!NOTE]
> **Naming Clarification**: This document covers **Google Stitch** — the AI-powered frontend
> design generation platform. This is different from the **Cross-Platform Thread Stitcher**
> data pipeline (documented in [README.md §7](./README.md#7-thread-stitcher)) which merges
> communications across email, WhatsApp, and calls into BigQuery.

---

## Table of Contents

1. [What is Google Stitch?](#1-what-is-google-stitch)
2. [MCP Server Configuration](#2-mcp-server-configuration)
3. [Stitch Agent Skills](#3-stitch-agent-skills)
4. [DESIGN.md Workflow](#4-designmd-workflow)
5. [Screen Generation Workflow](#5-screen-generation-workflow)
6. [Design System Management](#6-design-system-management)
7. [Integration with Lovable](#7-integration-with-lovable)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. What is Google Stitch?

Google Stitch is an **AI-powered frontend generation engine** that translates natural language
prompts (or reference images) into high-fidelity user interfaces. Unlike traditional design
tools (Figma, Sketch) that output static vector graphics, Stitch generates:

- **Structural layout data** — grid systems, component hierarchy
- **Design tokens** — colors, typography, spacing, shape
- **Functional component specifications** — state behaviors, interactions
- **Code-ready output** — React components, not just mockups
- **Figma export** — retaining layers and Auto Layout
- **Instant Prototypes** — stitch static screens into clickable interactive flows

### Generation Modes (March 2026)

| Mode | Model | Best For |
|------|-------|----------|
| **Ideate** | Fast exploration | Diverging on ideas, early brainstorming |
| **Flash** | Speed-optimized | Rapid iteration, quick variants |
| **Thinking** | Gemini 2.5 Pro | High-fidelity, production-quality output |

### Design Agent & Voice Canvas

Stitch now includes a **Design Agent** that tracks your full project history and reasons
across the entire workflow (not just single prompts), providing far better consistency.
You can also interact with the canvas via **voice** — critique designs, request variations,
or interview the agent to define product requirements.

> **⚠️ Precision Limitation**: Vibe design fails at precision. "Make the button 2px bigger"
> is a spec, not a vibe. Always treat Stitch output as a **starting scaffold**. Route all
> precision work through the component override system or direct code editing in Antigravity.

### How It Fits in the Stack

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   STITCH     │     │ ANTIGRAVITY  │     │  CODE        │
│  (Design)    │────▶│  (Scaffold)  │────▶│  (Deploy)    │
│              │ MCP │              │     │              │
│  DESIGN.md   │────▶│  Skills      │────▶│  React +     │
│  + Tokens    │     │  + Agent     │     │  Tailwind    │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 2. MCP Server Configuration

### Add Stitch to Antigravity's MCP Config

The Stitch MCP server connects Antigravity to your Stitch projects, enabling the agent
to read design tokens, generate screens, and apply design systems programmatically.

**Configuration** (`~/.gemini/settings.json` → `mcpServers` section):

```json
{
  "stitch": {
    "command": "npx",
    "args": [
      "-y",
      "@_davideast/stitch-mcp"
    ],
    "env": {
      "STITCH_API_KEY": "YOUR_STITCH_API_KEY"
    },
    "timeout": 60000,
    "trust": true
  }
}
```

### Authentication

The Stitch MCP server uses a **Stitch API Key**, set via the `STITCH_API_KEY` environment
variable. You can obtain this key from the Google Stitch platform settings.

> **Not to be confused with ADC**: Unlike Firebase and Cloud Run MCP servers (which use
> `GOOGLE_APPLICATION_CREDENTIALS`), Stitch uses its own API key.

### Reference Config

Add to [configs/mcp_config.json.reference](./configs/mcp_config.json.reference):

```json
"stitch": {
  "command": "npx",
  "args": ["-y", "@_davideast/stitch-mcp"],
  "env": {
    "STITCH_API_KEY": "YOUR_STITCH_API_KEY"
  },
  "timeout": 60000,
  "trust": true
}
```

> **Critical**: Use the absolute path to `npx` only if Antigravity cannot resolve `npx` from `PATH`.
> Portable placeholder example on Windows: `C:\Users\YOUR_USER\AppData\Roaming\npm\npx.cmd`

### Available MCP Tools

Once connected, Antigravity gains these Stitch tools:

| Tool                          | Purpose                                       |
| ----------------------------- | --------------------------------------------- |
| `list_projects`               | List all Stitch projects                      |
| `get_project`                 | Get project details (screens, design system)  |
| `create_project`              | Create a new Stitch project                   |
| `list_screens`                | List screens in a project                     |
| `get_screen`                  | Get screen details and code                   |
| `generate_screen_from_text`   | Generate a new screen from a text prompt      |
| `edit_screens`                | Edit existing screens with a prompt           |
| `generate_variants`           | Generate design variants of a screen          |
| `create_design_system`        | Create a design system (colors, fonts, shapes)|
| `update_design_system`        | Update an existing design system              |
| `apply_design_system`         | Apply a design system to screens              |
| `list_design_systems`         | List available design systems                 |

---

## 3. Stitch Agent Skills

The [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)
repository provides reusable **Agent Skills** for Antigravity that automate design workflows.

### Installing Skills

```powershell
# List available skills
npx skills add google-labs-code/stitch-skills --list

# Install a specific skill globally
npx skills add google-labs-code/stitch-skills --skill design-md --global

# Install all skills to workspace
npx skills add google-labs-code/stitch-skills --skill stitch-design
npx skills add google-labs-code/stitch-skills --skill react-components
npx skills add google-labs-code/stitch-skills --skill stitch-loop
npx skills add google-labs-code/stitch-skills --skill enhance-prompt
```

### Available Skills

| Skill Name          | SKILL.md Path                        | What It Does                                    |
| ------------------- | ------------------------------------ | ----------------------------------------------- |
| `design-md`         | `skills/design-md/SKILL.md`         | Queries Stitch, generates `DESIGN.md` file      |
| `stitch-design`     | `skills/stitch-design/SKILL.md`     | Unified entry point for UI generation           |
| `react-components`  | `skills/react-components/SKILL.md`  | Scaffolds React + Tailwind from DESIGN.md       |
| `stitch-loop`       | `skills/stitch-loop/SKILL.md`       | Generates complete multi-page sites from prompt |
| `enhance-prompt`    | `skills/enhance-prompt/SKILL.md`    | Refines vague prompts into Stitch-optimized specs|

### Skill 1: `design-md`

**Purpose**: Auto-generates a `DESIGN.md` file from a Stitch project's design system.

**How it works**:
1. Queries the Stitch MCP server for the target project
2. Reads the project's design system (colors, fonts, shapes, appearance)
3. Generates a machine-readable DESIGN.md in your repository root

**Usage**:
```
"Generate a DESIGN.md from my Stitch project"
```

### Skill 2: `stitch-design`

**Purpose**: Unified entry point for generating high-fidelity UI screens.

**How it works**:
1. Synthesizes UI/UX keywords from your prompt
2. Injects design system context from the project
3. Calls `generate_screen_from_text` with structured parameters

**Usage**:
```
"Design a modern analytics dashboard with charts, KPIs, and a sidebar nav"
```

### Skill 3: `react-components`

**Purpose**: Converts Stitch design tokens into production-ready React components.

**How it works**:
1. Reads the `DESIGN.md` file from the repository
2. Applies the color palette, typography, and spacing tokens
3. Scaffolds React components with Tailwind CSS classes
4. Ensures strict adherence to the defined aesthetics

**Usage**:
```
"Scaffold React components from the DESIGN.md for the dashboard project"
```

---

## 4. DESIGN.md Workflow

The `DESIGN.md` file is the **bridge between design and code**. It's a machine-readable
specification that any AI agent can consume to maintain visual consistency.

### Generation Flow

```
Step 1: Create a Stitch project with your design system
        └── Set colors, fonts, corner radius, appearance

Step 2: In Antigravity, activate the design-md skill
        └── "Generate a DESIGN.md from my Stitch LaunchPad project"

Step 3: Agent queries Stitch MCP → reads design tokens → writes DESIGN.md

Step 4: All subsequent code generation uses DESIGN.md as constraints
        └── Colors are locked to the palette
        └── Typography follows the scale
        └── Spacing uses the grid tokens
        └── Component states match the spec
```

### Manual Creation

If you don't have a Stitch project, create `DESIGN.md` manually using the template
at [starter-kit/docs/DESIGN.md](./starter-kit/docs/DESIGN.md).

### What DESIGN.md Prevents

| Without DESIGN.md                             | With DESIGN.md                                |
| --------------------------------------------- | --------------------------------------------- |
| AI hallucinates random colors                  | Colors locked to semantic palette             |
| Font choices vary per generation              | Typography follows defined scale              |
| Spacing is inconsistent (14px, 17px, 22px)    | Spacing uses 8px grid tokens                  |
| Component states are undefined                | Hover, focus, disabled states specified        |
| Every prompt needs CSS instructions           | Agent inherits rules automatically            |

---

## 5. Screen Generation Workflow

### From Prompt to Screen

```powershell
# In Antigravity, using natural language:
"Create a settings page with user profile, notification preferences, 
 and API key management. Use the design system from my Stitch project."
```

The agent:
1. Reads `DESIGN.md` for visual constraints
2. Calls `generate_screen_from_text` on the Stitch MCP server
3. Retrieves the generated screen code
4. Adapts it to your project structure (React + Tailwind)
5. Writes the component files

### Editing Existing Screens

```powershell
"Update the dashboard screen to add a monthly revenue chart in the KPI section"
```

Uses `edit_screens` to modify existing Stitch screens while preserving the design system.

### Generating Variants

```powershell
"Generate 3 layout variants of the search results page — 
 one with cards, one with a table, one with a list view"
```

Uses `generate_variants` to explore different layouts for the same content.

---

## 6. Design System Management

### Creating a Design System

Use the Stitch MCP tools to define your visual foundation:

```
"Create a design system with:
 - Primary color: indigo (#6366f1)
 - Font: Inter
 - Corner radius: medium (8px)
 - Appearance: dark mode default
 - Saturation: high"
```

### Applying to All Screens

After updating a design system, apply it to existing screens:

```
"Apply the updated design system to all screens in the project"
```

This uses `apply_design_system` to propagate token changes across every screen.

---

## 7. Integration with Lovable

### Stitch → Lovable Design Token Sync

When using both Stitch and Lovable, keep designs consistent:

1. **Export from Stitch**: Generate `DESIGN.md` with tokens
2. **Import to Lovable**: Paste the color/typography values into Lovable's system prompt
3. **Verify**: Both tools now generate UI that matches

### Design Token Reference (for Lovable prompts)

Copy this into Lovable's project settings or system prompt:

```
Use these design tokens:
- Background: #0f172a (dark mode)
- Cards: rgba(255,255,255,0.03) with border rgba(255,255,255,0.06)
- Primary: #6366f1 (indigo-500)
- Accent: #a855f7 (purple-500)
- Success: #34d399 (emerald-400)
- Error: #f87171 (red-400)
- Font: Inter, system-ui
- Corner radius: 8px buttons, 12px cards
- Spacing: 8px grid
```

---

## 8. Troubleshooting

| Problem                                    | Cause                           | Fix                                              |
| ------------------------------------------ | ------------------------------- | ------------------------------------------------ |
| Stitch MCP tools not appearing             | Package not installed           | `npx -y @_davideast/stitch-mcp`                 |
| "Permission denied" on Stitch tools        | ADC expired                     | `gcloud auth application-default login`          |
| `command` field fails to start             | Relative path to npx            | Use absolute path to `npx.cmd` on Windows        |
| DESIGN.md not being read by agent          | File not in project root        | Move to repo root (next to `package.json`)       |
| Generated code doesn't match design system | DESIGN.md not loaded            | Ensure skill reads DESIGN.md before generation   |
| Stitch project not found                   | Wrong project ID                | Run `list_projects` to verify available projects  |
| Screen generation timeout                  | Large/complex prompt            | Simplify prompt; generate in sections             |
