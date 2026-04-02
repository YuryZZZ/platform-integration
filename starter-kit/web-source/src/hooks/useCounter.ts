import { useState, useCallback } from 'react';

interface UseCounterOptions {
  initial?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initial = 0, min = -Infinity, max = Infinity, step = 1 } = options;
  
  const [count, setCountState] = useState(Math.max(min, Math.min(max, initial)));
  
  const setCount = useCallback((value: number) => {
    setCountState(Math.max(min, Math.min(max, value)));
  }, [min, max]);
  
  const increment = useCallback(() => {
    setCountState(prev => Math.min(max, prev + step));
  }, [max, step]);
  
  const decrement = useCallback(() => {
    setCountState(prev => Math.max(min, prev - step));
  }, [min, step]);
  
  const reset = useCallback(() => {
    setCountState(Math.max(min, Math.min(max, initial)));
  }, [initial, min, max]);
  
  return { count, increment, decrement, reset, setCount };
}
