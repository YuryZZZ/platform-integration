# Accessibility Guide

## Overview

The Nexus AI Design System is WCAG 2.1 AA compliant with comprehensive accessibility support.

## Features

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: ARIA live regions for announcements
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **High Contrast**: Supports `prefers-contrast` preference
- **Focus Management**: Visible focus indicators for all interactive elements

## Usage

### Screen Reader Announcements

```tsx
import { announce } from '@/lib/a11y';

function handleAction() {
  // Announce to screen readers
  announce('Action completed successfully', 'polite');
  
  // For urgent announcements
  announce('Error occurred', 'assertive');
}
```

### Reduced Motion

```tsx
import { useReducedMotion } from '@/lib/a11y';

function MyComponent() {
  const reducedMotion = useReducedMotion();
  
  return (
    <div
      className={reducedMotion ? 'static' : 'animate-fade-in'}
    >
      Content with conditional animation
    </div>
  );
}
```

### Focus Trap

For modal dialogs and focused interactions:

```tsx
import { useFocusTrap } from '@/lib/a11y';

function Modal({ isOpen, onClose }) {
  const containerRef = useFocusTrap(isOpen);
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### Visually Hidden

For screen-reader-only content:

```tsx
import { VisuallyHidden } from '@/lib/a11y';

<button>
  <VisuallyHidden>Close dialog</VisuallyHidden>
  <XIcon aria-hidden="true" />
</button>
```

## ARIA Patterns

### Button

```tsx
<button
  type="button"
  aria-label="Submit form"
  aria-disabled={isSubmitting}
>
  Submit
</button>
```

### Dialog

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirmation</h2>
  <p id="dialog-description">Are you sure you want to proceed?</p>
</div>
```

### Navigation

```tsx
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/home">Home</a>
    </li>
    <li role="none">
      <a role="menuitem" href="/about">About</a>
    </li>
  </ul>
</nav>
```

## Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI)
- [ ] Screen reader announces all important changes
- [ ] Reduced motion preference is respected
- [ ] No keyboard traps (except intentional focus traps)
- [ ] Form labels are properly associated

## Tools

- **axe DevTools**: Browser extension for automated testing
- **VoiceOver** (Mac): Screen reader testing
- **NVDA** (Windows): Screen reader testing
- **WAVE**: Web accessibility evaluation tool
