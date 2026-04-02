# Icon Guidelines

## Icon Library

This project uses **Lucide React** for icons - a beautiful & consistent icon toolkit.

### Installation
```bash
npm install lucide-react
```

### Usage
```tsx
import { Home, Settings, Search } from 'lucide-react';

<Home className="w-6 h-6" />
<Settings className="w-5 h-5 text-muted-foreground" />
```

## Icon Sizes

| Size | Pixels | Tailwind Class | Usage |
|------|--------|----------------|-------|
| sm | 16px | w-4 h-4 | Inline text, badges |
| md | 20px | w-5 h-5 | Buttons, inputs |
| lg | 24px | w-6 h-6 | Navigation, headers |
| xl | 32px | w-8 h-8 | Feature highlights |

## Accessibility

### Decorative Icons
For icons that don't convey meaning:
```tsx
<Search aria-hidden="true" className="w-5 h-5" />
```

### Functional Icons
For icons that convey meaning:
```tsx
<button aria-label="Search">
  <Search className="w-5 h-5" />
</button>
```

### Color
- Icons inherit color via `currentColor`
- Use text utilities: `text-primary`, `text-muted-foreground`

## Common Icons by Category

### Navigation
`Home`, `Menu`, `X`, `ChevronDown`, `ChevronRight`, `ChevronLeft`, `ArrowLeft`, `ArrowRight`

### Actions
`Plus`, `Minus`, `Edit`, `Trash2`, `Save`, `Download`, `Upload`, `RefreshCw`, `Copy`, `Check`

### Status
`CheckCircle`, `AlertCircle`, `Info`, `AlertTriangle`, `Loader2`, `XCircle`

### Media
`Play`, `Pause`, `Volume2`, `VolumeX`, `Image`, `Video`, `Music`

### Communication
`Mail`, `MessageSquare`, `Phone`, `Bell`, `Send`

### Files
`File`, `FileText`, `Folder`, `FolderOpen`, `Download`, `Upload`

### Users
`User`, `Users`, `UserPlus`, `UserX`, `LogIn`, `LogOut`

## Best Practices

1. **Consistency**: Use the same icon for the same action throughout the app
2. **Size**: Match icon size to text size (e.g., 16px icons with 14px text)
3. **Alignment**: Vertically center icons with adjacent text
4. **Spacing**: Add margin between icon and text (typically 8px)
