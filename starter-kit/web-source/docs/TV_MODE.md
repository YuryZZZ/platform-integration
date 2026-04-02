# TV/Cinematic Mode Guide

## Overview

TV Mode provides a 10-foot UI optimized for television displays with:
- Spatial navigation using D-pad/arrow keys
- Focus management with visible indicators
- Overscan-safe layouts (5% padding)
- High contrast colors
- 64px minimum touch targets

## Setup

```tsx
import { TvProvider } from '@/lib/cinematic';

function App() {
  return (
    <TvProvider initialFocusId="menu-item-1">
      <TvLayout />
    </TvProvider>
  );
}
```

## Spatial Navigation

### useTvNavigation Hook

```tsx
import { useTvNavigation } from '@/lib/cinematic';
import { useRef } from 'react';

function TvMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { focusedId, registerElement } = useTvNavigation({
    containerRef,
    onSelect: (id) => console.log('Selected:', id),
    onFocusChange: (id) => console.log('Focus changed to:', id),
  });

  return (
    <div ref={containerRef}>
      {items.map(item => (
        <button
          key={item.id}
          ref={(el) => el && registerElement(item.id, el)}
          data-focused={focusedId === item.id}
          className={focusedId === item.id ? 'ring-4 ring-white' : ''}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
```

### Navigation Algorithm

The spatial navigation uses Euclidean distance with directional filtering:
1. Filter elements in the direction of movement
2. Calculate distance from current element
3. Select the closest element in that direction

## TV Components

### TvButton

```tsx
import { TvButton } from '@/components/cinematic';

<TvButton
  focusId="btn-primary"
  variant="primary"
  size="tv"  // 64px minimum
  onFocus={() => announce('Primary button')}
  onSelect={() => handleSubmit()}
>
  Submit
</TvButton>
```

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| focusId | string | Unique identifier for navigation |
| onFocus | () => void | Focus callback |
| onSelect | () => void | Selection callback |
| size | 'tv' | Forces 64px minimum |

### TvContainer

```tsx
import { TvContainer } from '@/components/cinematic';

<TvContainer safeZone={0.05}>
  {/* Content is safe from overscan */}
</TvContainer>
```

### TvMenu

```tsx
import { TvMenu, TvMenuItem } from '@/components/cinematic';

<TvMenu orientation="horizontal">
  <TvMenuItem id="home">Home</TvMenuItem>
  <TvMenuItem id="search">Search</TvMenuItem>
  <TvMenuItem id="settings">Settings</TvMenuItem>
</TvMenu>
```

## Keyboard Controls

| Key | Action |
|-----|--------|
| Arrow Up | Move focus up |
| Arrow Down | Move focus down |
| Arrow Left | Move focus left |
| Arrow Right | Move focus right |
| Enter | Select focused item |
| Space | Select focused item |
| Escape | Go back / close |
| Tab | Move to next focusable group |

## CSS Classes for TV

```css
/* TV-specific focus styles */
.tv:focus {
  outline: 4px solid white;
  outline-offset: 4px;
}

/* TV minimum touch targets */
.tv-touch-target {
  min-width: 64px;
  min-height: 64px;
}

/* Overscan safe area */
.tv-safe-zone {
  padding: 5%;
}
```

## Best Practices

1. **Minimum Touch Target**: Always use 64px minimum for TV
2. **Focus Indicators**: High contrast focus rings (4px white)
3. **Typography**: Use larger font sizes (minimum 24px for body text)
4. **Spacing**: Increase spacing between interactive elements
5. **Color Contrast**: Ensure 7:1 contrast ratio for TV
