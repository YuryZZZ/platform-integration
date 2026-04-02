/**
 * Screen Reader Announce Utility
 * Creates and manages aria-live regions for screen reader announcements
 */

export type AnnouncePriority = 'polite' | 'assertive';

interface LiveRegion {
  element: HTMLDivElement;
  clearTimeout: number | null;
}

let liveRegion: LiveRegion | null = null;

/**
 * Gets or creates the singleton aria-live region
 */
function getLiveRegion(priority: AnnouncePriority): HTMLDivElement {
  if (typeof document === 'undefined') {
    throw new Error('announce() cannot be called during SSR');
  }

  if (!liveRegion) {
    const element = document.createElement('div');
    element.setAttribute('role', 'status');
    element.setAttribute('aria-live', 'polite');
    element.setAttribute('aria-atomic', 'true');
    
    // Visually hidden but accessible to screen readers
    element.style.position = 'absolute';
    element.style.width = '1px';
    element.style.height = '1px';
    element.style.padding = '0';
    element.style.margin = '-1px';
    element.style.overflow = 'hidden';
    element.style.clip = 'rect(0, 0, 0, 0)';
    element.style.whiteSpace = 'nowrap';
    element.style.border = '0';
    
    document.body.appendChild(element);
    
    liveRegion = {
      element,
      clearTimeout: null,
    };
  }

  // Update aria-live attribute based on priority
  liveRegion.element.setAttribute('aria-live', priority);
  
  return liveRegion.element;
}

/**
 * Announces a message to screen readers using an aria-live region
 * @param message - The message to announce
 * @param priority - 'polite' (default) or 'assertive'
 */
export function announce(message: string, priority: AnnouncePriority = 'polite'): void {
  if (typeof document === 'undefined') {
    return; // SSR safety
  }

  const region = getLiveRegion(priority);

  // Clear any pending clear timeout
  if (liveRegion?.clearTimeout) {
    clearTimeout(liveRegion.clearTimeout);
    liveRegion.clearTimeout = null;
  }

  // Clear previous content
  region.textContent = '';

  // Set new content after a brief delay to ensure screen readers pick up the change
  requestAnimationFrame(() => {
    region.textContent = message;

    // Clear content after announcement to prevent re-announcement on DOM changes
    if (liveRegion) {
      liveRegion.clearTimeout = window.setTimeout(() => {
        region.textContent = '';
        if (liveRegion) {
          liveRegion.clearTimeout = null;
        }
      }, 1000);
    }
  });
}

/**
 * Clears the live region (useful for cleanup)
 */
export function clearAnnouncement(): void {
  if (liveRegion?.element) {
    liveRegion.element.textContent = '';
  }
  if (liveRegion?.clearTimeout) {
    clearTimeout(liveRegion.clearTimeout);
    liveRegion.clearTimeout = null;
  }
}
