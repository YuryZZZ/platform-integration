import { useEffect, useRef, RefObject } from 'react';

interface UseEventListenerOptions<K extends keyof HTMLElementEventMap> {
  element: RefObject<HTMLElement | Window | Document>;
  eventType: K;
  handler: (event: HTMLElementEventMap[K]) => void;
  options?: AddEventListenerOptions;
}

export function useEventListener<K extends keyof HTMLElementEventMap>(
  { element, eventType, handler, options }: UseEventListenerOptions<K>
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element.current;
    if (!target) return;

    const eventListener = (event: HTMLElementEventMap[K]) => {
      savedHandler.current(event);
    };

    target.addEventListener(eventType, eventListener as EventListener, options);

    return () => {
      target.removeEventListener(eventType, eventListener as EventListener);
    };
  }, [element, eventType, options]);
}
