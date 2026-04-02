# Theming Guide

## Theme System Overview

The Nexus AI Design System uses CSS custom properties for theming with automatic dark mode support and TV-optimized overrides.

## CSS Variables

### Colors

```css
:root {
  /* Primary palette */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;
  
  /* Semantic colors */
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-muted: #64748b;
  --color-accent: #8b5cf6;
  --color-border: #e2e8f0;
  
  /* Status colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### Dark Mode

```css
[data-theme="dark"] {
  --color-background: #0f172a;
  --color-foreground: #f8fafc;
  --color-muted: #94a3b8;
  --color-border: #334155;
}
```

### TV Mode Colors

```css
[data-surface="tv"] {
  --color-background: #0a0a0a;
  --color-foreground: #ffffff;
  --color-primary-500: #4f8ff7;
  --focus-ring-width: 4px;
  --focus-ring-color: #ffffff;
}
```

## Typography

### Font Scale

```css
:root {
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-md: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
}
```

### TV Typography

```css
[data-surface="tv"] {
  --font-size-md: 1.5rem;     /* 24px - scaled up for TV */
  --font-size-lg: 1.75rem;    /* 28px */
  --font-size-xl: 2rem;       /* 32px */
  --font-size-2xl: 2.5rem;    /* 40px */
}
```

## Spacing

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

## Shadows

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
}

[data-surface="tv"] {
  --shadow-md: 0 8px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 16px 24px rgba(0, 0, 0, 0.4);
}
```

## Border Radius

```css
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 1rem;      /* 16px */
  --radius-full: 9999px;
}
```

## Usage

### Theme Provider

```tsx
import { ThemeProvider } from '@/lib/theme';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

### useTheme Hook

```tsx
import { useTheme } from '@/lib/theme';

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current: {resolvedTheme}
    </button>
  );
}
```

## Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Standard desktop |
| 2xl | 1536px | Ultra-wide desktop |
| 4k | 2560px+ | Cinematic/TV displays |

## Custom Theme

```tsx
import { ThemeProvider, createTheme } from '@/lib/theme';

const customTheme = createTheme({
  colors: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    accent: '#f59e0b',
  },
  fonts: {
    heading: 'Custom Font, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```
