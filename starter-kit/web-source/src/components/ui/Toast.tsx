import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ToastContextValue {
  toasts: ToastMessage[];
  addToast: (type: ToastType, message: string, duration?: number) => string;
  removeToast: (id: string) => void;
}

// Context
const ToastContext = createContext<ToastContextValue | null>(null);

// Generate unique ID
let toastId = 0;
const generateId = (): string => {
  toastId += 1;
  return `toast-${Date.now()}-${toastId}`;
};

// Provider
interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 5 }: ToastProviderProps): React.JSX.Element {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, duration: number = 5000): string => {
      const id = generateId();
      const newToast: ToastMessage = { id, type, message, duration };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-maxToasts);
      });

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [maxToasts, removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Hook
export function useToast(): {
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  removeToast: (id: string) => void;
} {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast } = context;

  return {
    success: (message: string, duration?: number) => addToast('success', message, duration),
    error: (message: string, duration?: number) => addToast('error', message, duration),
    warning: (message: string, duration?: number) => addToast('warning', message, duration),
    info: (message: string, duration?: number) => addToast('info', message, duration),
    removeToast,
  };
}

// Global toast function for programmatic use
let globalAddToast: ((type: ToastType, message: string, duration?: number) => string) | null = null;

export function setGlobalToastHandler(
  handler: (type: ToastType, message: string, duration?: number) => string
): void {
  globalAddToast = handler;
}

export function toast(type: ToastType, message: string, duration?: number): string {
  if (!globalAddToast) {
    console.warn('Toast system not initialized. Ensure ToastProvider is mounted.');
    return '';
  }
  return globalAddToast(type, message, duration);
}

// Container Component
export function ToastContainer(): React.JSX.Element {
  const context = useContext(ToastContext);

  if (!context) {
    return <></>;
  }

  const { toasts, removeToast } = context;

  const getIcon = (type: ToastType): string => {
    switch (type) {
      case 'success':
        return '\u2713';
      case 'error':
        return '\u2717';
      case 'warning':
        return '\u26A0';
      case 'info':
        return '\u2139';
      default:
        return '';
    }
  };

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          role="alert"
          aria-live="polite"
        >
          <span className="toast__icon" aria-hidden="true">
            {getIcon(toast.type)}
          </span>
          <span className="toast__message">{toast.message}</span>
          <button
            className="toast__close"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
            type="button"
          >
            \u00D7
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastProvider;
