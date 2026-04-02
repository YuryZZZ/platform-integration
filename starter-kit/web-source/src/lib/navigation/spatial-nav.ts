/**
 * Spatial Navigation Module
 * Provides D-pad/arrow key navigation for TV and keyboard users
 */

export interface FocusableElement {
  element: HTMLElement;
  focusId?: string;
  focusGroup?: string;
  rect: DOMRect;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

/**
 * Find the nearest focusable element in a given direction
 */
export function findNearestFocusable(
  currentElement: HTMLElement,
  direction: Direction,
  focusables: HTMLElement[]
): HTMLElement | null {
  if (focusables.length === 0) {
    return null;
  }

  const currentRect = currentElement.getBoundingClientRect();
  const currentCenter = {
    x: currentRect.left + currentRect.width / 2,
    y: currentRect.top + currentRect.height / 2,
  };

  let nearestElement: HTMLElement | null = null;
  let nearestDistance = Infinity;

  for (const focusable of focusables) {
    if (focusable === currentElement) {
      continue;
    }

    const rect = focusable.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    // Check if element is in the correct direction
    const isInDirection = checkDirection(currentCenter, center, direction);
    if (!isInDirection) {
      continue;
    }

    const distance = calculateDistance(currentCenter, center);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestElement = focusable;
    }
  }

  return nearestElement;
}

function checkDirection(
  current: { x: number; y: number },
  target: { x: number; y: number },
  direction: Direction
): boolean {
  switch (direction) {
    case 'up':
      return target.y < current.y;
    case 'down':
      return target.y > current.y;
    case 'left':
      return target.x < current.x;
    case 'right':
      return target.x > current.x;
    default:
      return false;
  }
}

function calculateDistance(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getAllFocusables(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll('[data-focusable], a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
  ).filter(el => {
    const element = el as HTMLElement;
    return element.offsetWidth > 0 && element.offsetHeight > 0 && !element.hasAttribute('disabled');
  }) as HTMLElement[];
}
