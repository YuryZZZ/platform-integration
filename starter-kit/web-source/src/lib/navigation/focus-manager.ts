/**
 * Focus Manager Module
 * Manages focus history and focus trapping
 */

export class FocusManager {
  private focusHistory: HTMLElement[] = [];
  private trapContainer: HTMLElement | null = null;
  private trapHandler: ((e: KeyboardEvent) => void) | null = null;

  pushFocus(element: HTMLElement): void {
    this.focusHistory.push(element);
  }

  popFocus(): HTMLElement | null {
    return this.focusHistory.pop() || null;
  }

  getCurrentFocus(): HTMLElement | null {
    if (this.focusHistory.length === 0) {
      return document.activeElement as HTMLElement;
    }
    return this.focusHistory[this.focusHistory.length - 1];
  }

  trapFocus(container: HTMLElement): void {
    this.trapContainer = container;
    const focusables = container.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusables.length === 0) return;

    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    this.trapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', this.trapHandler);
    firstFocusable.focus();
  }

  releaseTrap(): void {
    if (this.trapContainer && this.trapHandler) {
      this.trapContainer.removeEventListener('keydown', this.trapHandler);
      this.trapContainer = null;
      this.trapHandler = null;
    }
  }
}

export const focusManager = new FocusManager();
