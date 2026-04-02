import { useState, useCallback, useRef, useEffect } from 'react';

interface GlitchOptions {
  intensity?: number;
  interval?: number;
  duration?: number;
}

export function useGlitch(options: GlitchOptions = {}): [boolean, () => void, () => void] {
  const { intensity = 1, interval = 50, duration = 300 } = options;
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsGlitching(true);
    
    intervalRef.current = setInterval(() => {
      // Random glitch trigger
      if (Math.random() < 0.3 * intensity) {
        setIsGlitching(prev => !prev);
      }
    }, interval);

    timeoutRef.current = setTimeout(() => {
      stop();
    }, duration);
  }, [intensity, interval, duration]);

  const stop = useCallback(() => {
    setIsGlitching(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return [isGlitching, start, stop];
}
