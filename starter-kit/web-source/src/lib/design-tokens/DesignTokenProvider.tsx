/**
 * DesignTokenProvider — CMS-driven theming system
 * Reads design tokens from the CMS (or props) and injects them as CSS custom properties.
 * This is what makes one template work for any brand / website.
 * 
 * Usage:
 *   <DesignTokenProvider tokens={tokensFromCMS}>
 *     <App />
 *   </DesignTokenProvider>
 * 
 * Created: 2026-03-20T10:15:00Z
 */

'use client';

import React, { createContext, useContext, useMemo } from 'react';

/* ─────────────────────────────────────────────────────────── */
/*  Token Schema                                               */
/* ─────────────────────────────────────────────────────────── */

export interface DesignTokens {
  /* Brand */
  brandName?: string;
  brandLogo?: string;
  brandFavicon?: string;

  /* Colors */
  colorPrimary?: string;       // e.g. '#6366f1'
  colorPrimaryLight?: string;  // e.g. '#a78bfa'
  colorPrimaryDark?: string;   // e.g. '#4f46e5'
  colorAccent?: string;        // e.g. '#06b6d4'
  colorSuccess?: string;       // e.g. '#10b981'
  colorWarning?: string;       // e.g. '#f59e0b'
  colorError?: string;         // e.g. '#ef4444'

  /* Surfaces */
  colorBackground?: string;    // e.g. '#0a0f1e'
  colorSurface?: string;       // e.g. '#111827'
  colorSurfaceElevated?: string;
  colorBorder?: string;        // e.g. 'rgba(255,255,255,0.06)'

  /* Text */
  colorTextPrimary?: string;
  colorTextSecondary?: string;
  colorTextTertiary?: string;

  /* Typography */
  fontDisplay?: string;        // e.g. "'Outfit', sans-serif"
  fontBody?: string;           // e.g. "'Inter', sans-serif"
  fontMono?: string;           // e.g. "'JetBrains Mono', monospace"

  /* Radius */
  radiusSm?: string;           // e.g. '0.5rem'
  radiusMd?: string;           // e.g. '0.875rem'
  radiusLg?: string;           // e.g. '1.25rem'
  radiusXl?: string;           // e.g. '1.5rem'
  radiusFull?: string;         // e.g. '9999px'

  /* Spacing Scale */
  spaceUnit?: string;          // e.g. '0.25rem'

  /* Motion */
  motionDuration?: string;     // e.g. '0.3s'
  motionEasing?: string;       // e.g. 'cubic-bezier(0.16, 1, 0.3, 1)'
  motionReduced?: boolean;

  /* Gradients */
  gradientPrimary?: string;
  gradientAccent?: string;
  gradientHero?: string;

  /* Custom Overrides — any key → CSS var */
  custom?: Record<string, string>;
}

/* ─────────────────────────────────────────────────────────── */
/*  Defaults                                                   */
/* ─────────────────────────────────────────────────────────── */

const defaultTokens: DesignTokens = {
  brandName: 'Portal',
  colorPrimary: '#6366f1',
  colorPrimaryLight: '#a78bfa',
  colorPrimaryDark: '#4f46e5',
  colorAccent: '#06b6d4',
  colorSuccess: '#10b981',
  colorWarning: '#f59e0b',
  colorError: '#ef4444',
  colorBackground: '#0a0f1e',
  colorSurface: '#111827',
  colorSurfaceElevated: '#1e293b',
  colorBorder: 'rgba(255,255,255,0.06)',
  colorTextPrimary: 'rgba(240,244,248,0.95)',
  colorTextSecondary: 'rgba(148,163,184,0.85)',
  colorTextTertiary: 'rgba(100,116,139,0.7)',
  fontDisplay: "'Outfit', sans-serif",
  fontBody: "'Inter', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  radiusSm: '0.5rem',
  radiusMd: '0.875rem',
  radiusLg: '1.25rem',
  radiusXl: '1.5rem',
  radiusFull: '9999px',
  spaceUnit: '0.25rem',
  motionDuration: '0.3s',
  motionEasing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  motionReduced: false,
  gradientPrimary: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  gradientAccent: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
  gradientHero: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 30%, #06b6d4 60%, #a78bfa 100%)',
};

/* ─────────────────────────────────────────────────────────── */
/*  Context                                                    */
/* ─────────────────────────────────────────────────────────── */

interface DesignTokenContextValue {
  tokens: DesignTokens;
  cssVars: Record<string, string>;
}

const DesignTokenContext = createContext<DesignTokenContextValue>({
  tokens: defaultTokens,
  cssVars: {},
});

export function useDesignTokens() {
  return useContext(DesignTokenContext);
}

/* ─────────────────────────────────────────────────────────── */
/*  Token → CSS Variable Mapping                               */
/* ─────────────────────────────────────────────────────────── */

function tokensToCssVars(tokens: DesignTokens): Record<string, string> {
  const vars: Record<string, string> = {};
  const mappers: Array<[keyof DesignTokens, string]> = [
    ['colorPrimary', '--token-color-primary'],
    ['colorPrimaryLight', '--token-color-primary-light'],
    ['colorPrimaryDark', '--token-color-primary-dark'],
    ['colorAccent', '--token-color-accent'],
    ['colorSuccess', '--token-color-success'],
    ['colorWarning', '--token-color-warning'],
    ['colorError', '--token-color-error'],
    ['colorBackground', '--token-color-bg'],
    ['colorSurface', '--token-color-surface'],
    ['colorSurfaceElevated', '--token-color-surface-elevated'],
    ['colorBorder', '--token-color-border'],
    ['colorTextPrimary', '--token-text-primary'],
    ['colorTextSecondary', '--token-text-secondary'],
    ['colorTextTertiary', '--token-text-tertiary'],
    ['fontDisplay', '--font-display'],
    ['fontBody', '--font-body'],
    ['fontMono', '--font-mono'],
    ['radiusSm', '--token-radius-sm'],
    ['radiusMd', '--token-radius-md'],
    ['radiusLg', '--token-radius-lg'],
    ['radiusXl', '--token-radius-xl'],
    ['radiusFull', '--token-radius-full'],
    ['spaceUnit', '--token-space-unit'],
    ['motionDuration', '--token-motion-duration'],
    ['motionEasing', '--token-motion-easing'],
    ['gradientPrimary', '--gradient-primary'],
    ['gradientAccent', '--gradient-accent'],
    ['gradientHero', '--gradient-hero'],
  ];

  for (const [key, cssVar] of mappers) {
    const val = tokens[key];
    if (val !== undefined && typeof val === 'string') {
      vars[cssVar] = val;
    }
  }

  // Custom overrides
  if (tokens.custom) {
    for (const [k, v] of Object.entries(tokens.custom)) {
      vars[k.startsWith('--') ? k : `--token-${k}`] = v;
    }
  }

  return vars;
}

/* ─────────────────────────────────────────────────────────── */
/*  Provider Component                                         */
/* ─────────────────────────────────────────────────────────── */

export interface DesignTokenProviderProps {
  children: React.ReactNode;
  tokens?: Partial<DesignTokens>;
  /** Scope: apply tokens to a wrapper div, or to :root */
  scope?: 'wrapper' | 'root';
}

export function DesignTokenProvider({
  children,
  tokens: userTokens = {},
  scope = 'wrapper',
}: DesignTokenProviderProps) {
  const mergedTokens = useMemo(
    () => ({ ...defaultTokens, ...userTokens }),
    [userTokens]
  );

  const cssVars = useMemo(
    () => tokensToCssVars(mergedTokens),
    [mergedTokens]
  );

  const contextValue = useMemo(
    () => ({ tokens: mergedTokens, cssVars }),
    [mergedTokens, cssVars]
  );

  if (scope === 'root') {
    // Inject as :root style tag
    return (
      <DesignTokenContext.Provider value={contextValue}>
        <style dangerouslySetInnerHTML={{
          __html: `:root { ${Object.entries(cssVars).map(([k, v]) => `${k}: ${v}`).join('; ')} }`
        }} />
        {children}
      </DesignTokenContext.Provider>
    );
  }

  return (
    <DesignTokenContext.Provider value={contextValue}>
      <div style={cssVars as React.CSSProperties}>
        {children}
      </div>
    </DesignTokenContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Preset Themes                                              */
/* ─────────────────────────────────────────────────────────── */

export const presetThemes: Record<string, Partial<DesignTokens>> = {
  midnight: {}, // Uses all defaults (dark indigo)
  
  corporate: {
    colorPrimary: '#2563eb',
    colorPrimaryLight: '#60a5fa',
    colorPrimaryDark: '#1d4ed8',
    colorAccent: '#0891b2',
    colorBackground: '#0f172a',
    colorSurface: '#1e293b',
    gradientPrimary: 'linear-gradient(135deg, #2563eb, #3b82f6)',
    gradientHero: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 30%, #0891b2 60%, #60a5fa 100%)',
  },

  construction: {
    colorPrimary: '#d97706',
    colorPrimaryLight: '#fbbf24',
    colorPrimaryDark: '#b45309',
    colorAccent: '#059669',
    colorBackground: '#1c1917',
    colorSurface: '#292524',
    colorSurfaceElevated: '#44403c',
    gradientPrimary: 'linear-gradient(135deg, #d97706, #f59e0b)',
    gradientAccent: 'linear-gradient(135deg, #059669, #34d399)',
    gradientHero: 'linear-gradient(135deg, #fbbf24 0%, #d97706 30%, #059669 60%, #fbbf24 100%)',
  },

  healthcare: {
    colorPrimary: '#0d9488',
    colorPrimaryLight: '#5eead4',
    colorPrimaryDark: '#0f766e',
    colorAccent: '#6366f1',
    colorBackground: '#042f2e',
    colorSurface: '#134e4a',
    gradientPrimary: 'linear-gradient(135deg, #0d9488, #14b8a6)',
    gradientHero: 'linear-gradient(135deg, #5eead4 0%, #0d9488 30%, #6366f1 60%, #5eead4 100%)',
  },

  legal: {
    colorPrimary: '#7c3aed',
    colorPrimaryLight: '#a78bfa',
    colorPrimaryDark: '#6d28d9',
    colorAccent: '#c084fc',
    colorBackground: '#0c0a1d',
    colorSurface: '#1a1533',
    gradientPrimary: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    gradientHero: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 30%, #c084fc 60%, #a78bfa 100%)',
  },

  realEstate: {
    colorPrimary: '#059669',
    colorPrimaryLight: '#34d399',
    colorPrimaryDark: '#047857',
    colorAccent: '#0891b2',
    colorBackground: '#022c22',
    colorSurface: '#064e3b',
    gradientPrimary: 'linear-gradient(135deg, #059669, #10b981)',
    gradientHero: 'linear-gradient(135deg, #34d399 0%, #059669 30%, #0891b2 60%, #34d399 100%)',
  },

  light: {
    colorBackground: '#ffffff',
    colorSurface: '#f8fafc',
    colorSurfaceElevated: '#f1f5f9',
    colorBorder: 'rgba(0,0,0,0.08)',
    colorTextPrimary: 'rgba(15,23,42,0.95)',
    colorTextSecondary: 'rgba(71,85,105,0.85)',
    colorTextTertiary: 'rgba(100,116,139,0.7)',
  },
};
