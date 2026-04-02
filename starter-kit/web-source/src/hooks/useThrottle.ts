import { useState, useRef, useEffect } from 'react';

/**
 * Throttles a value by the specified limit.
 * Returns the throttled value that updates at most once every `limit` milliseconds.
 * 
 * @param value - The value to throttle
 * @param limit - The throttle limit in milliseconds
 * @returns The throttled value
 * 
 * @example
 * const [scrollY, setScrollY] = useState(0);
 * const throttledScrollY = useThrottle(scrollY, 100);
 * 
 * useEffect(() => {
 *   // This effect runs at most every 100ms during scroll
 *   updateScrollPosition(throttledScrollY);
 * }, [throttledScrollY]);
 */
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRan.current;

    if (timeSinceLastRun >= limit) {
      lastRan.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastRan.current = Date.now();
        setThrottledValue(value);
      }, limit - timeSinceLastRun);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle;
