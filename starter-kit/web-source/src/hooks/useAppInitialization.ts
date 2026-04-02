'use client';

import { useEffect } from 'react';
import { initFocusVisible } from '@/lib/a11y/focus-visible';

export function useAppInitialization(): void {
  useEffect(() => {
    // Initialize focus-visible polyfill for keyboard navigation
    initFocusVisible();
    
    // Add any other initialization logic here
    console.log('[Nexus AI] App initialized');
  }, []);
}
