/**
 * useFocusTrap Hook
 * Traps focus within a container element for modal dialogs and similar UI patterns
 */

import { useEffect, useCallback, useRef } from 'react';
import type { RefObject } from 'react';

// Selector for all focusable elements
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface UseFocusTrapOptions {
  /** Whether the focus trap is currently active */
  isActive?: boolean;
  /** Callback when Escape key is pressed */
  onEscape?: () => void;
  /** Whether to auto-focus the first element when trap activates */
  autoFocus?: boolean;
  /** Whether to return focus to the previously focused element on deactivate */
  returnFocus?: boolean;
}

/**
 * Gets all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter((el) => {
      // Ensure element is visible and has dimensions
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && 
             style.visibility !== 'hidden' &&
             el.offsetParent !== null;
    });
}

/**
 * Hook to trap focus within a container element
 * @param containerRef - Ref to the container element
 * @param options - Focus trap options
 */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: RefObject<T>,
  options: UseFocusTrapOptions = {}
): void {
  const {
    isActive = true,
    onEscape,
    autoFocus = true,
    returnFocus = true,
  } = options;

  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the previously focused element when trap activates
  useEffect(() => {
    if (isActive && typeof document !== 'undefined') {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isActive]);

  // Handle focus trapping
  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const focusableElements = getFocusableElements(container);

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Auto-focus first element
    if (autoFocus) {
      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        firstElement.focus();
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive, containerRef, autoFocus]);

  // Handle keyboard events
  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    const container = containerRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements(container);
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift+Tab: if on first element, go to last
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if on last element, go to first
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, containerRef, onEscape]);

  // Return focus on deactivate
  useEffect(() => {
    if (!isActive && returnFocus && previousFocusRef.current) {
      const timeoutId = setTimeout(() => {
        previousFocusRef.current?.focus();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isActive, returnFocus]);
}

export default useFocusTrap;
