/**
 * Design Tokens — Nexus AI
 * All visual tokens in one place. Overridable for design-drop-in.
 * These map to CSS custom properties set by ThemeProvider.
 */

export interface DesignTokens {
  colors: {
    // Brand
    primary: string;
    primaryHover: string;
    primaryForeground: string;
    secondary: string;
    secondaryHover: string;
    secondaryForeground: string;
    accent: string;
    accentHover: string;
    accentForeground: string;

    // Surfaces
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    muted: string;
    mutedForeground: string;

    // Borders
    border: string;
    input: string;
    ring: string;

    // Semantic
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    info: string;
    infoForeground: string;

    // Sidebar (AppShell)
    sidebarBackground: string;
    sidebarForeground: string;
    sidebarBorder: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
  };

  fonts: {
    sans: string;
    mono: string;
    display: string;
  };

  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };

  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };

  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    inner: string;
    glow: string;
  };

  transitions: {
    fast: string;
    normal: string;
    slow: string;
    spring: string;
  };

  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    tv: string;
  };
}

export const lightTokens: DesignTokens = {
  colors: {
    primary: 'hsl(222, 84%, 55%)',
    primaryHover: 'hsl(222, 84%, 48%)',
    primaryForeground: 'hsl(0, 0%, 100%)',
    secondary: 'hsl(210, 40%, 96%)',
    secondaryHover: 'hsl(210, 40%, 92%)',
    secondaryForeground: 'hsl(222, 47%, 11%)',
    accent: 'hsl(262, 83%, 58%)',
    accentHover: 'hsl(262, 83%, 50%)',
    accentForeground: 'hsl(0, 0%, 100%)',

    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(222, 47%, 11%)',
    card: 'hsl(0, 0%, 100%)',
    cardForeground: 'hsl(222, 47%, 11%)',
    popover: 'hsl(0, 0%, 100%)',
    popoverForeground: 'hsl(222, 47%, 11%)',
    muted: 'hsl(210, 40%, 96%)',
    mutedForeground: 'hsl(215, 16%, 47%)',

    border: 'hsl(214, 32%, 91%)',
    input: 'hsl(214, 32%, 91%)',
    ring: 'hsl(222, 84%, 55%)',

    destructive: 'hsl(0, 84%, 60%)',
    destructiveForeground: 'hsl(0, 0%, 100%)',
    success: 'hsl(142, 71%, 45%)',
    successForeground: 'hsl(0, 0%, 100%)',
    warning: 'hsl(38, 92%, 50%)',
    warningForeground: 'hsl(0, 0%, 100%)',
    info: 'hsl(199, 89%, 48%)',
    infoForeground: 'hsl(0, 0%, 100%)',

    sidebarBackground: 'hsl(210, 40%, 98%)',
    sidebarForeground: 'hsl(222, 47%, 11%)',
    sidebarBorder: 'hsl(214, 32%, 91%)',
    sidebarAccent: 'hsl(210, 40%, 94%)',
    sidebarAccentForeground: 'hsl(222, 47%, 11%)',
  },
  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    display: "'Outfit', 'Inter', sans-serif",
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgb(99 102 241 / 0.3)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    tv: '1920px',
  },
};

export const darkTokens: DesignTokens = {
  ...lightTokens,
  colors: {
    primary: 'hsl(222, 84%, 60%)',
    primaryHover: 'hsl(222, 84%, 66%)',
    primaryForeground: 'hsl(0, 0%, 100%)',
    secondary: 'hsl(217, 33%, 17%)',
    secondaryHover: 'hsl(217, 33%, 22%)',
    secondaryForeground: 'hsl(210, 40%, 98%)',
    accent: 'hsl(262, 83%, 65%)',
    accentHover: 'hsl(262, 83%, 72%)',
    accentForeground: 'hsl(0, 0%, 100%)',

    background: 'hsl(222, 47%, 6%)',
    foreground: 'hsl(210, 40%, 98%)',
    card: 'hsl(222, 47%, 9%)',
    cardForeground: 'hsl(210, 40%, 98%)',
    popover: 'hsl(222, 47%, 9%)',
    popoverForeground: 'hsl(210, 40%, 98%)',
    muted: 'hsl(217, 33%, 17%)',
    mutedForeground: 'hsl(215, 20%, 65%)',

    border: 'hsl(217, 33%, 17%)',
    input: 'hsl(217, 33%, 17%)',
    ring: 'hsl(222, 84%, 60%)',

    destructive: 'hsl(0, 62%, 50%)',
    destructiveForeground: 'hsl(0, 0%, 100%)',
    success: 'hsl(142, 71%, 45%)',
    successForeground: 'hsl(0, 0%, 100%)',
    warning: 'hsl(38, 92%, 50%)',
    warningForeground: 'hsl(0, 0%, 100%)',
    info: 'hsl(199, 89%, 48%)',
    infoForeground: 'hsl(0, 0%, 100%)',

    sidebarBackground: 'hsl(222, 47%, 5%)',
    sidebarForeground: 'hsl(210, 40%, 98%)',
    sidebarBorder: 'hsl(217, 33%, 15%)',
    sidebarAccent: 'hsl(217, 33%, 12%)',
    sidebarAccentForeground: 'hsl(210, 40%, 98%)',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
    glow: '0 0 20px rgb(129 140 248 / 0.4)',
  },
};

/**
 * Convert tokens to CSS custom property strings
 */
export function tokensToCSSVars(tokens: DesignTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  // Colors
  Object.entries(tokens.colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    vars[`--color-${cssKey}`] = value;
  });

  // Fonts
  vars['--font-sans'] = tokens.fonts.sans;
  vars['--font-mono'] = tokens.fonts.mono;
  vars['--font-display'] = tokens.fonts.display;

  // Radius
  Object.entries(tokens.radius).forEach(([key, value]) => {
    vars[`--radius-${key}`] = value;
  });

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    vars[`--spacing-${key}`] = value;
  });

  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    vars[`--shadow-${key}`] = value;
  });

  // Transitions
  Object.entries(tokens.transitions).forEach(([key, value]) => {
    vars[`--transition-${key}`] = value;
  });

  return vars;
}
