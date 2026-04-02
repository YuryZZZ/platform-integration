export type Direction = 'up' | 'down' | 'left' | 'right';

export interface FocusableElement {
  id: string;
  element: HTMLElement;
  rect: DOMRect;
}

function isInDirection(from: DOMRect, to: DOMRect, direction: Direction): boolean {
  const tolerance = 20; // pixels
  switch (direction) {
    case 'right':
      return to.left >= from.right - tolerance &&
        Math.abs(to.top - from.top) < from.height + tolerance;
    case 'left':
      return to.right <= from.left + tolerance &&
        Math.abs(to.top - from.top) < from.height + tolerance;
    case 'down':
      return to.top >= from.bottom - tolerance &&
        Math.abs(to.left - from.left) < from.width + tolerance;
    case 'up':
      return to.bottom <= from.top + tolerance &&
        Math.abs(to.left - from.left) < from.width + tolerance;
    default:
      return false;
  }
}

function getDistance(from: DOMRect, to: DOMRect): number {
  const fromCenterX = from.left + from.width / 2;
  const fromCenterY = from.top + from.height / 2;
  const toCenterX = to.left + to.width / 2;
  const toCenterY = to.top + to.height / 2;
  return Math.sqrt(
    Math.pow(toCenterX - fromCenterX, 2) +
    Math.pow(toCenterY - fromCenterY, 2)
  );
}

export function findNextFocus(
  currentId: string,
  direction: Direction,
  elements: Map<string, HTMLElement>
): string | null {
  const currentElement = elements.get(currentId);
  if (!currentElement) return null;

  const currentRect = currentElement.getBoundingClientRect();
  const candidates: FocusableElement[] = [];

  elements.forEach((element, id) => {
    if (id === currentId) return;
    const rect = element.getBoundingClientRect();
    if (isInDirection(currentRect, rect, direction)) {
      candidates.push({ id, element, rect });
    }
  });

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => getDistance(currentRect, a.rect) - getDistance(currentRect, b.rect));
  return candidates[0].id;
}
