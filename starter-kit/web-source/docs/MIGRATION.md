# Migration Guide

## From Material UI

### Component Mapping
| Material UI | Nexus AI | Notes |
|-------------|----------|-------|
| Button | Button | Similar API |
| TextField | Input | Use Form wrapper |
| Dialog | Dialog | Radix-based |
| Select | Select | Radix-based |
| Snackbar | Toast | Use toast() function |
| Drawer | Sheet | Side prop |

### Theming
Material UI uses theme object. Nexus AI uses CSS custom properties:
```css
:root {
  --color-primary-500: #3b82f6;
}
```

### Migration Steps
1. Install Nexus AI: `npm install @nexus-ai/design`
2. Replace imports one component at a time
3. Update theme configuration
4. Test accessibility features

## From Chakra UI

### Component Mapping
| Chakra UI | Nexus AI | Notes |
|-----------|----------|-------|
| Box | div | Use Tailwind classes |
| Stack | Stack | Layout component |
| Button | Button | Similar API |
| Modal | Dialog | Radix-based |
| Flex | div | Use flex utilities |

### Styling
Chakra uses `sx` prop. Nexus AI uses Tailwind:
```tsx
// Chakra
<Box sx={{ bg: 'blue.500', p: 4 }} />

// Nexus AI
<div className="bg-blue-500 p-4" />
```

## From shadcn/ui

Nexus AI is built on shadcn/ui patterns. Migration is straightforward:
- Components have similar APIs
- Same Radix primitives
- Tailwind for styling
- Add TV/Cinematic components as needed

### Migration Steps
1. Replace `@/components/ui` imports with `@nexus-ai/design`
2. Update Tailwind config to include package
3. Add TvProvider for TV features
4. Use useSurfaceDetection for adaptive rendering

## From Ant Design

### Component Mapping
| Ant Design | Nexus AI | Notes |
|------------|----------|-------|
| Button | Button | Different variants |
| Input | Input | Similar API |
| Modal | Dialog | Radix-based |
| Table | Table | Different API |
| Form | Form | React Hook Form |

### Styling
Ant uses Less. Nexus AI uses Tailwind CSS:
```tsx
// Ant
<Button type="primary" size="large" />

// Nexus AI
<Button variant="primary" size="lg" />
```
