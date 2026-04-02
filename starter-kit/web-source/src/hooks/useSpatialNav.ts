import { useRef, useCallback, useEffect, useState } from 'react';
import { findNextFocus, Direction } from '../lib/cinematic/spatialNavigation';

interface UseSpatialNavOptions {
  initialFocusId?: string;
  onFocusChange?: (id: string) => void;
  onSelect?: (id: string) => void;
}

interface UseSpatialNavReturn {
  focusedId: string | null;
  focusNext: (direction: Direction) => void;
  registerElement: (id: string, element: HTMLElement) => void;
  deregisterElement: (id: string) => void;
  selectCurrent: () => void;
}

/**
 * React hook for spatial navigation on TV/10-foot interfaces.
 * Handles D-pad navigation, focus management, and focus trapping.
 *
 * @example
 * function TvMenu() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const { focusedId, registerElement } = useSpatialNav({
 *     containerRef,
 *     onSelect: (id) => console.log(''Selected:'', id),
 *   });
 *   return (
 *     <div ref={containerRef}>
 *       <button ref={(el) => el && registerElement(''item1'', el)}>Item 1</button>
 *     </div>
 *   );
 * }
 */
export function useSpatialNav(options?: UseSpatialNavOptions): UseSpatialNavReturn {
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const [focusedId, setFocusedId] = useState<string | null>(options?.initialFocusId ?? null);

  const registerElement = useCallback((id: string, element: HTMLElement) => {
    elementsRef.current.set(id, element);
  }, []);

  const deregisterElement = useCallback((id: string) => {
    elementsRef.current.delete(id);
  }, []);

  const focusNext = useCallback((direction: Direction) => {
    if (!focusedId) return;
    const nextId = findNextFocus(focusedId, direction, elementsRef.current);
    if (nextId) {
      setFocusedId(nextId);
      options?.onFocusChange?.(nextId);
    }
  }, [focusedId, options]);

  const selectCurrent = useCallback(() => {
    if (focusedId) {
      options?.onSelect?.(focusedId);
    }
  }, [focusedId, options]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right'
      };
      if (keyMap[e.key]) {
        e.preventDefault();
        focusNext(keyMap[e.key]);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCurrent();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusNext, selectCurrent]);

  return { focusedId, focusNext, registerElement, deregisterElement, selectCurrent };
}

