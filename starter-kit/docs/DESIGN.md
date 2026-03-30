# DESIGN.md — Machine-Readable Design System

> **Purpose**: Single source of truth for visual design rules. Consumed by AI agents
> (Antigravity, Stitch, Lovable) to ensure style consistency across all generated code.
>
> **Generated from**: Google Stitch design system (or manually authored)
> **Format**: Optimized for LLM comprehension — descriptive constraints, not pixel-exact specs

---

## Grid System

| Token    | Value | Usage                        |
| -------- | ----- | ---------------------------- |
| `base`   | 8px   | Base spacing unit            |
| `xs`     | 4px   | Tight spacing (icons, chips) |
| `sm`     | 8px   | Component internal padding   |
| `md`     | 16px  | Card padding, section gaps   |
| `lg`     | 24px  | Section spacing              |
| `xl`     | 32px  | Page-level spacing           |
| `2xl`    | 48px  | Hero/header spacing          |
| `3xl`    | 64px  | Major section breaks         |

**Grid**: 12-column responsive grid.
- Desktop: max-width `1280px`, `24px` column gap
- Tablet: 8 columns, `16px` gap
- Mobile: 4 columns, `16px` gap

---

## Color Palette

### Semantic Colors

| Role            | Light Mode  | Dark Mode   | Usage                              |
| --------------- | ----------- | ----------- | ---------------------------------- |
| `background`    | `#ffffff`   | `#0f172a`   | Page background                    |
| `surface`       | `#f8fafc`   | `rgba(255,255,255,0.03)` | Card/panel background |
| `surface-hover` | `#f1f5f9`   | `rgba(255,255,255,0.05)` | Hovered card/panel    |
| `border`        | `#e2e8f0`   | `rgba(255,255,255,0.06)` | Card borders, dividers |
| `border-hover`  | `#cbd5e1`   | `rgba(99,102,241,0.2)`   | Hovered borders       |
| `text-primary`  | `#0f172a`   | `#ffffff`   | Headings, body text                |
| `text-secondary`| `#64748b`   | `#94a3b8`   | Subtext, labels, captions          |
| `text-muted`    | `#94a3b8`   | `#475569`   | Timestamps, placeholders           |

### Brand Colors

| Role       | Value     | Usage                                |
| ---------- | --------- | ------------------------------------ |
| `primary`  | `#6366f1` | Buttons, active tab indicator, links |
| `accent`   | `#a855f7` | Gradient endpoints, highlights       |
| `success`  | `#34d399` | Status badges, confirmations         |
| `warning`  | `#fbbf24` | Caution states, pending items        |
| `error`    | `#f87171` | Error messages, destructive actions  |
| `info`     | `#60a5fa` | Informational badges, tooltips       |

### Gradient Presets

| Name              | Value                                           | Usage            |
| ----------------- | ----------------------------------------------- | ---------------- |
| `hero-gradient`   | `from-slate-950 via-slate-900 to-indigo-950`    | Page backgrounds |
| `brand-gradient`  | `from-indigo-500 to-purple-600`                 | Buttons, headers |
| `card-glow`       | `radial-gradient(rgba(99,102,241,0.1), transparent)` | Card hover    |

---

## Typography

### Font Families

| Role      | Family                       | Fallback       | Usage                      |
| --------- | ---------------------------- | -------------- | -------------------------- |
| `sans`    | Inter                        | system-ui      | All UI text                |
| `mono`    | Geist Mono / JetBrains Mono  | monospace      | Code, IDs, timestamps      |
| `display` | Inter                        | system-ui      | Hero headings (optional)   |

### Type Scale

| Token  | Size   | Weight | Line Height | Usage                       |
| ------ | ------ | ------ | ----------- | --------------------------- |
| `h1`   | 32px   | 700    | 1.2         | Page title (one per page)   |
| `h2`   | 24px   | 600    | 1.3         | Section headings            |
| `h3`   | 20px   | 600    | 1.4         | Card titles, subsections    |
| `h4`   | 16px   | 600    | 1.5         | Small headings              |
| `body` | 14px   | 400    | 1.6         | Paragraphs, descriptions    |
| `sm`   | 13px   | 400    | 1.5         | Labels, secondary text      |
| `xs`   | 12px   | 400    | 1.4         | Badges, timestamps, captions|
| `code` | 13px   | 400    | 1.5         | Inline code, IDs            |

---

## Shape & Corners

| Element          | Radius  | Notes                           |
| ---------------- | ------- | ------------------------------- |
| Buttons          | `8px`   | Consistent across all sizes     |
| Cards            | `12px`  | Main content containers         |
| Badges / Chips   | `6px`   | Status indicators, tags         |
| Modals / Dialogs | `16px`  | Overlay containers              |
| Inputs           | `8px`   | Text fields, selects            |
| Full round       | `9999px`| Avatars, toggles, pills         |

---

## Component States

### Buttons

| State      | Background                    | Border               | Text       | Shadow       |
| ---------- | ----------------------------- | -------------------- | ---------- | ------------ |
| Default    | `primary`                     | none                 | white      | none         |
| Hover      | `primary` + 10% lighter      | none                 | white      | `0 4px 12px rgba(99,102,241,0.3)` |
| Active     | `primary` + 10% darker       | none                 | white      | none         |
| Disabled   | `surface`                     | `border`             | `text-muted` | none       |
| Loading    | `primary` at 70% opacity     | none                 | hidden     | none (show spinner) |

### Cards

| State   | Background  | Border        | Transform           |
| ------- | ----------- | ------------- | -------------------- |
| Default | `surface`   | `border`      | none                 |
| Hover   | `surface-hover` | `border-hover` | `translateY(-2px)` |
| Active  | `surface`   | `primary/30%` | none                 |

### Inputs

| State    | Background  | Border        | Ring                |
| -------- | ----------- | ------------- | ------------------- |
| Default  | `surface`   | `border`      | none                |
| Focus    | `surface`   | `primary`     | `0 0 0 3px primary/20%` |
| Error    | `surface`   | `error`       | `0 0 0 3px error/20%`   |
| Disabled | `background`| `border/50%`  | none                |

---

## Animations

| Name            | Duration | Easing                  | Usage                        |
| --------------- | -------- | ----------------------- | ---------------------------- |
| `fade-in`       | 200ms    | ease-out                | Elements appearing           |
| `fade-slide-up` | 300ms    | cubic-bezier(0.4,0,0.2,1) | Cards entering view       |
| `slide-in`      | 150ms    | ease-out                | Tab indicator movement       |
| `scale-up`      | 200ms    | cubic-bezier(0.4,0,0.2,1) | Modal/dialog entrance     |
| `stagger-delay` | 80ms     | —                       | Between sibling card entries |

### Motion Principles

- **Purposeful**: Every animation conveys meaning (entry, exit, state change)
- **Fast**: No animation exceeds 400ms
- **Reduced motion**: Respect `prefers-reduced-motion` — disable transforms, keep opacity fades

---

## Appearance

| Property           | Light Mode | Dark Mode   |
| ------------------ | ---------- | ----------- |
| Default mode       | —          | ✅ Primary  |
| Background         | `#ffffff`  | `#0f172a`   |
| Scrollbar track    | `#f1f5f9`  | `#1e293b`   |
| Scrollbar thumb    | `#cbd5e1`  | `#334155`   |
| Selection color    | `primary/20%` | `primary/30%` |

---

## Iconography

- **Style**: Outline (not filled) — 1.5px stroke
- **Size**: 16px (inline), 20px (buttons), 24px (nav)
- **Library**: Lucide React preferred, emoji fallback acceptable
- **Color**: Inherits `text-secondary` by default; `primary` when active

---

## Accessibility

- **Contrast**: All text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- **Focus rings**: Visible `3px` outline on all interactive elements
- **Keyboard nav**: All actions reachable via Tab + Enter/Space
- **Screen readers**: Semantic HTML, `aria-label` on icon-only buttons
- **Touch targets**: Minimum 44x44px on mobile

---

## Usage Instructions for AI Agents

1. **Read this file first** before generating any UI code
2. **Never invent colors** — use only the semantic color roles defined above
3. **Never change font families** without explicit user approval
4. **Apply component states** exactly as specified (hover, focus, disabled)
5. **Use the spacing tokens** — do not use arbitrary pixel values
6. **Respect the grid** — 12 columns desktop, 8 tablet, 4 mobile
7. **Dark mode is default** — design dark-first, light mode is secondary
8. **Animations are optional** — all UI must work without them
