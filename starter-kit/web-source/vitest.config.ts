/**
 * Vitest Config — Step 82
 * Test configuration with React Testing Library and path aliases
 * 
 * Created: 2026-03-18T16:53:00Z
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'portable/src/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/.ai/**',
      '**/e2e/**',
      '**/dist/**',
      '**/.next/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['portable/src/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        '**/*.test.*',
        '**/*.spec.*',
        '**/index.ts',
        '**/types/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@portable': path.resolve(__dirname, './portable/src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
