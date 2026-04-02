# Design Tokens

## Color Palette

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| --color-primary-50 | #eff6ff | Light backgrounds |
| --color-primary-100 | #dbeafe | Hover states |
| --color-primary-500 | #3b82f6 | Primary actions |
| --color-primary-600 | #2563eb | Primary hover |
| --color-primary-900 | #1e3a8a | Dark accents |

### Semantic Colors
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| --background | #ffffff | #0f172a | Page background |
| --foreground | #0f172a | #f8fafc | Text color |
| --muted | #f1f5f9 | #1e293b | Secondary backgrounds |
| --border | #e2e8f0 | #334155 | Border color |
| --ring | #3b82f6 | #3b82f6 | Focus ring |

### Status Colors
| Token | Value | Usage |
|-------|-------|-------|
| --success | #22c55e | Success states |
| --warning | #f59e0b | Warning states |
| --error | #ef4444 | Error states |
| --info | #3b82f6 | Information |

## Typography

### Font Families
```css
--font-sans: system-ui, -apple-system, sans-serif;
--font-mono: ui-monospace, monospace;
```

### Font Size Scale
| Token | Size | Usage |
|-------|------|-------|
| text-xs | 12px | Captions, labels |
| text-sm | 14px | Small text |
| text-base | 16px | Body text |
| text-lg | 18px | Large body |
| text-xl | 20px | Headings |
| text-2xl | 24px | H3 |
| text-3xl | 30px | H2 |
| text-4xl | 36px | H1 |

## Spacing

| Token | Size | Pixels |
|-------|------|--------|
| space-1 | 0.25rem | 4px |
| space-2 | 0.5rem | 8px |
| space-3 | 0.75rem | 12px |
| space-4 | 1rem | 16px |
| space-6 | 1.5rem | 24px |
| space-8 | 2rem | 32px |

## Border Radius

| Token | Size | Usage |
|-------|------|-------|
| rounded-sm | 4px | Small elements |
| rounded-md | 8px | Buttons, inputs |
| rounded-lg | 16px | Cards, modals |
| rounded-full | 9999px | Avatars, pills |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation |
| shadow-md | 0 4px 6px rgba(0,0,0,0.1) | Cards, dropdowns |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | Modals, popovers |

## Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Standard desktop |
| 2xl | 1536px | Extra large |
| 4k | 2560px+ | Cinematic/8K fluid views |
