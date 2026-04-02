# Architecture

## System Overview

The Nexus AI Design System is a multi-layered architecture supporting web, mobile, and TV interfaces through adaptive rendering.

## Architecture Layers

```
┌─────────────────────────────────────────────────────┐
│                   Application Layer                  │
├─────────────────────────────────────────────────────┤
│  Components                                          │
│  ┌───────────┐ ┌───────────────┐ ┌───────────┐     │
│  │    ui/    │ │  cinematic/   │ │  layout/  │     │
│  │ Primitives│ │  TV Components│ │  Layouts  │     │
│  └───────────┘ └───────────────┘ └───────────┘     │
├─────────────────────────────────────────────────────┤
│  Libraries                                           │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐         │
│  │cinematic/ │ │  surface/ │ │   a11y/   │         │
│  │Navigation │ │ Detection │ │Accessibil.│         │
│  └───────────┘ └───────────┘ └───────────┘         │
├─────────────────────────────────────────────────────┤
│  Foundation                                          │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐         │
│  │   Hooks   │ │   Types   │ │   Theme   │         │
│  └───────────┘ └───────────┘ └───────────┘         │
└─────────────────────────────────────────────────────┘
```

## Core Modules

### /lib/cinematic
TV navigation system with spatial focus management.

### /lib/surface
Device detection and capability sensing.

### /lib/a11y
Accessibility utilities including announcements and motion preferences.

### /components/ui
Primitive components (Button, Card, Input, etc.).

### /components/cinematic
TV-optimized components with larger touch targets and focus states.

## Data Flow

```
User Input → Surface Detection → Capability Resolution → Component Render
     ↓
TV Mode Detection
     ↓
Spatial Navigation (if TV)
     ↓
Focus Management
```

## Configuration

Environment variables in `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TV_MODE=false
```

## Key Design Decisions

1. **Surface-First Design**: Components adapt based on detected surface capabilities
2. **Accessibility by Default**: All components meet WCAG 2.1 AA standards
3. **TV Support**: Built-in spatial navigation for 10-foot UI experiences
4. **TypeScript Strict**: Full type safety throughout the codebase
