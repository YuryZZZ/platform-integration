'use client';

/**
 * ThemeProvider — Nexus AI
 * Manages light/dark/system theme with CSS variable injection.
 * Design-drop-in ready: swap tokens to change the entire visual system.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { lightTokens, darkTokens, tokensToCSSVars, type DesignTokens } from './tokens';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** Current theme mode setting */
  mode: ThemeMode;
  /** Resolved theme (light or dark, after system preference resolution) */
  resolvedTheme: ResolvedTheme;
  /** Current design tokens (resolved for the active theme) */
  tokens: DesignTokens;
  /** Set theme mode */
  setMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark */
  toggle: () => void;
  /** Override specific tokens (for design-drop-in) */
  overrideTokens: (overrides: Partial<DesignTokens>) => void;
  /** Reset token overrides */
  resetTokens: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'nexus-theme-mode';

function getSystemPreference(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'system') return getSystemPreference();
  return mode;
}

function getStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // localStorage not available
  }
  return 'system';
}

function mergeTokens(base: DesignTokens, overrides: Partial<DesignTokens>): DesignTokens {
  return {
    colors: { ...base.colors, ...(overrides.colors || {}) },
    fonts: { ...base.fonts, ...(overrides.fonts || {}) },
    radius: { ...base.radius, ...(overrides.radius || {}) },
    spacing: { ...base.spacing, ...(overrides.spacing || {}) },
    shadows: { ...base.shadows, ...(overrides.shadows || {}) },
    transitions: { ...base.transitions, ...(overrides.transitions || {}) },
    breakpoints: { ...base.breakpoints, ...(overrides.breakpoints || {}) },
  };
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme mode (default: system) */
  defaultMode?: ThemeMode;
  /** Custom light tokens override */
  lightOverrides?: Partial<DesignTokens>;
  /** Custom dark tokens override */
  darkOverrides?: Partial<DesignTokens>;
  /** Disable persistence to localStorage */
  disablePersistence?: boolean;
  /** Apply CSS variables to this element (default: document.documentElement) */
  applyTo?: 'root' | 'provider';
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
  lightOverrides,
  darkOverrides,
  disablePersistence = false,
  applyTo = 'root',
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() =>
    disablePersistence ? defaultMode : getStoredMode()
  );
  const [tokenOverrides, setTokenOverrides] = useState<Partial<DesignTokens>>({});
  const [systemPref, setSystemPref] = useState<ResolvedTheme>(() => getSystemPreference());

  // Listen for system preference changes
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemPref(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: ResolvedTheme = mode === 'system' ? systemPref : mode;

  // Compute final tokens
  const tokens = useMemo(() => {
    const baseTokens = resolvedTheme === 'dark'
      ? mergeTokens(darkTokens, darkOverrides || {})
      : mergeTokens(lightTokens, lightOverrides || {});

    return mergeTokens(baseTokens, tokenOverrides);
  }, [resolvedTheme, lightOverrides, darkOverrides, tokenOverrides]);

  // Apply CSS variables
  useEffect(() => {
    const vars = tokensToCSSVars(tokens);
    const target = applyTo === 'root' ? document.documentElement : null;

    if (target) {
      // Set theme attribute
      target.setAttribute('data-theme', resolvedTheme);
      target.classList.toggle('dark', resolvedTheme === 'dark');
      target.classList.toggle('light', resolvedTheme === 'light');

      // Set CSS variables
      Object.entries(vars).forEach(([key, value]) => {
        target.style.setProperty(key, value);
      });
    }
  }, [tokens, resolvedTheme, applyTo]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    if (!disablePersistence) {
      try {
        localStorage.setItem(STORAGE_KEY, newMode);
      } catch {
        // silently fail
      }
    }
  }, [disablePersistence]);

  const toggle = useCallback(() => {
    setMode(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setMode]);

  const overrideTokens = useCallback((overrides: Partial<DesignTokens>) => {
    setTokenOverrides(prev => mergeTokens(prev as DesignTokens, overrides) as Partial<DesignTokens>);
  }, []);

  const resetTokens = useCallback(() => {
    setTokenOverrides({});
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({
    mode,
    resolvedTheme,
    tokens,
    setMode,
    toggle,
    overrideTokens,
    resetTokens,
  }), [mode, resolvedTheme, tokens, setMode, toggle, overrideTokens, resetTokens]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme hook — access theme state and controls
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;
