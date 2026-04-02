# Design Guidelines

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Focus indicators**: Visible for all interactive elements
- **Keyboard navigation**: All features accessible via keyboard
- **Screen reader support**: ARIA labels and live regions

### Touch Targets
- **Minimum size**: 44x44px for mobile
- **TV minimum**: 64x64px for 10-foot UI
- **Spacing between targets**: 8px minimum

## Responsive Design

### Breakpoints
| Name | Min Width | Usage |
|------|-----------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| tv | 1920px | TV displays |

### Mobile-First Approach
- Start with mobile styles
- Use min-width media queries
- Progressive enhancement

## Motion Design

### Animation Durations
| Speed | Duration | Usage |
|-------|----------|-------|
| fast | 150ms | Micro-interactions |
| normal | 200ms | Standard transitions |
| slow | 300ms | Complex animations |

### Easing
- Default: `ease-in-out`
- Enter: `cubic-bezier(0.4, 0, 0.2, 1)`
- Exit: `cubic-bezier(0.4, 0, 1, 1)`

### Reduced Motion
Always respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

## Layout Principles

### Grid System
- 12-column grid or fluid auto-fit grids
- 8px base spacing
- Ultra-wide dynamic fluidity: Containers scale infinitely up to 8K via percentage paddings

### Whitespace
- Generous padding for readability
- Consistent spacing using design tokens
- Visual hierarchy through spacing

## Content Guidelines

### Heading Hierarchy
- H1: Page title only (one per page)
- H2: Major sections
- H3: Subsections
- H4-H6: Nested content

### Writing Style
- Sentence case for UI text
- Action-oriented language
- Clarity over cleverness
- Inclusive terminology

### Error Messages
- Clear and actionable
- Explain what went wrong
- Provide solution or next step
