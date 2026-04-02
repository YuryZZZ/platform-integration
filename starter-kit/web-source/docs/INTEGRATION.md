# Integration Guide

## Installation

### npm
```bash
npm install @nexus-ai/design
```

### yarn
```bash
yarn add @nexus-ai/design
```

### pnpm
```bash
pnpm add @nexus-ai/design
```

## Quick Setup

### 1. Import Styles
```tsx
import '@nexus-ai/design/styles.css';
```

### 2. Wrap with Providers
```tsx
import { TvProvider, ThemeProvider } from '@nexus-ai/design';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <TvProvider initialFocusId="main">
        <YourApp />
      </TvProvider>
    </ThemeProvider>
  );
}
```

### 3. Import Components
```tsx
import { Button, Card, Input } from '@nexus-ai/design';
```

## Framework Integration

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@nexus-ai/design/styles.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import '@nexus-ai/design/styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Vite

```tsx
// main.tsx
import '@nexus-ai/design/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Tailwind Configuration

Add to your `tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nexus-ai/design/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
};

export default config;
```

## Storybook Integration

```ts
// .storybook/preview.ts
import '@nexus-ai/design/styles.css';

export const preview = {
  parameters: {
    backgrounds: { disable: true },
  },
};
```

## TypeScript

Types are included. No additional setup needed:
```tsx
import type { ButtonProps } from '@nexus-ai/design';
```
