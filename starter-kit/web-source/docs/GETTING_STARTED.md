# Getting Started

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

```bash
# Clone the repository
git clone https://github.com/your-org/nexus-ai-design.git
cd nexus-ai-design

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Primitive components
│   ├── cinematic/    # TV-optimized components
│   └── layout/       # Layout primitives
├── lib/
│   ├── cinematic/    # TV navigation system
│   ├── surface/      # Device detection
│   └── a11y/         # Accessibility utilities
├── hooks/            # Custom React hooks
├── types/            # TypeScript definitions
└── app/              # Next.js app router
```

## Quick Start

```tsx
import { TvProvider, useSurfaceDetection } from '@/lib/cinematic';
import { Card, Button } from '@/components/ui';

function App() {
  const { surface } = useSurfaceDetection();
  
  return (
    <TvProvider>
      <Card>
        <h1>Surface: {surface}</h1>
        <Button variant="primary">Get Started</Button>
      </Card>
    </TvProvider>
  );
}
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm test` | Run tests |
| `npm run storybook` | Start Storybook |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript validation |

## Next Steps

- [Architecture Guide](./ARCHITECTURE.md)
- [Component Reference](./COMPONENTS.md)
- [TV Mode Guide](./TV_MODE.md)
- [Accessibility Guide](./ACCESSIBILITY.md)
- [Theming Guide](./THEME.md)
