import { useRef, useEffect } from 'react';

/**
 * usePrevious hook - Tracks the previous value of a state or prop
 * 
 * @param value - The current value to track
 * @returns The previous value (undefined on first render)
 * 
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * 
 * // On first render: prevCount is undefined
 * // After count changes: prevCount is the previous count value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}
