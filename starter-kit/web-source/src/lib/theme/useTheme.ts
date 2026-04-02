import { useThemeContext } from './context';

export function useTheme() {
  const context = useThemeContext();
  return {
    theme: context.theme,
    setTheme: context.setTheme,
    toggleTheme: context.toggleTheme,
    resolvedTheme: context.resolvedTheme,
  };
}
