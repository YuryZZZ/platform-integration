'use client';

/**
 * Root Providers — Nexus AI
 * Composes all context providers into a single wrapper.
 * Each provider is independent — remove what you don't need for
 * a simpler site (e.g., a marketing site skips AI/Workflow providers).
 */

import React, { type ReactNode } from 'react';
import { ThemeProvider, type ThemeMode } from '@/lib/theme/ThemeProvider';
import type { DesignTokens } from '@/lib/theme/tokens';

// ─── Surface Context (lightweight) ─────────────────────────────────────

export type SurfaceType = 'smartphone' | 'tablet' | 'desktop' | 'cinematic';

const SurfaceContext = React.createContext<SurfaceType>('desktop');

export function useSurface() {
  return React.useContext(SurfaceContext);
}

function SurfaceProvider({ children }: { children: ReactNode }) {
  const [surface, setSurface] = React.useState<SurfaceType>('desktop');

  React.useEffect(() => {
    function detect() {
      const w = window.innerWidth;
      if (w < 640) return 'smartphone';
      if (w < 1024) return 'tablet';
      if (w >= 1920) return 'cinematic';
      return 'desktop';
    }
    setSurface(detect());

    const handler = () => setSurface(detect());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <SurfaceContext.Provider value={surface}>
      {children}
    </SurfaceContext.Provider>
  );
}

// ─── Toast / Notification Provider ──────────────────────────────────────

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function useToast() {
  return React.useContext(ToastContext);
}

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { ...toast, id }]);

    // Auto-dismiss
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

// ─── Global Modal Provider ──────────────────────────────────────────────

interface ModalContextValue {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = React.createContext<ModalContextValue>({
  isOpen: false,
  content: null,
  openModal: () => {},
  closeModal: () => {},
});

export function useModal() {
  return React.useContext(ModalContext);
}

function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState<ReactNode | null>(null);

  const openModal = React.useCallback((c: ReactNode) => {
    setContent(c);
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setContent(null), 300); // wait for animation
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

// ─── Root Provider Composition ──────────────────────────────────────────

export interface ProvidersProps {
  children: ReactNode;
  /** Default theme mode */
  defaultTheme?: ThemeMode;
  /** Custom light tokens (design-drop-in) */
  lightTokenOverrides?: Partial<DesignTokens>;
  /** Custom dark tokens (design-drop-in) */
  darkTokenOverrides?: Partial<DesignTokens>;
}

export function Providers({
  children,
  defaultTheme = 'system',
  lightTokenOverrides,
  darkTokenOverrides,
}: ProvidersProps) {
  return (
    <ThemeProvider
      defaultMode={defaultTheme}
      lightOverrides={lightTokenOverrides}
      darkOverrides={darkTokenOverrides}
    >
      <SurfaceProvider>
        <ToastProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ToastProvider>
      </SurfaceProvider>
    </ThemeProvider>
  );
}

export default Providers;
