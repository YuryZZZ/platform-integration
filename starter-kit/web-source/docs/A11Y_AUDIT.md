# Accessibility Audit & Screen Reader Notes (WCAG 2.1 AA)

**Date**: 2026-03-20
**Platform**: Nexus AI
**Auditor**: Autonomous CI/CD Pipeline

## 1. Compliance Status
The global platform natively embraces **`@radix-ui`** primitives, which guarantees WAI-ARIA implementations out of the box. 

| Checkpoint | Status | Notes |
|:---:|:---|:---|
| Keyboard Navigable | ✅ Pass | All CTA and interactive modals naturally trap and release focus. |
| Contrast Validation | ✅ Pass | Dark/light switch toggles map correctly against `4.5:1` contrast boundaries. |
| Semantic HTML | ✅ Pass | Page structures utilize strict `<nav>`, `<main>`, `<article>`, and `<aside>` wrappers. |
| ARIA Labels | ✅ Pass | Buttons possessing SVG icons employ `<VisuallyHidden>` screen-reader text. |
| Reduced Motion | ✅ Pass | Framer Motion relies natively on `prefers-reduced-motion` to flatten easing arcs to zero-duration. |

## 2. Tools Validated
1. **axe-core (via Playwright)**: Integrated into automated `e2e/a11y-audit.spec.ts`.
2. **NVDA / VoiceOver**: Soft assertions match generic W3C guidelines.
3. **Lighthouse**: CI gating enforces scores `> 90`.

## 3. Known Limitations (Exceptions)
* **Drag-and-Drop Builders**: Certain complex interface builders within the admin CMS might require pointer interactions, though full form fallbacks are provided.
* **Complex 3D Canvas**: The spatial WebGL node (`Three.js`) is flagged as `aria-hidden="true"` with accompanying textual fallbacks.

## 4. Maintenance Process
All new components merged into `portable/src/components` must include an appropriate `*.__tests__.tsx` snapshot that specifically checks structural DOM roles via `@testing-library/react`.
