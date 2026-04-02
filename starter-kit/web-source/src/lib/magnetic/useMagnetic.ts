import { useRef, useEffect, useState, useCallback } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
  easing?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: MagneticOptions = {}
): [React.RefObject<T>, { x: number; y: number }] {
  const { strength = 0.3, radius = 200, easing = 0.15 } = options;
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
    if (distance < radius) {
      const factor = (1 - distance / radius) * strength;
      setPosition(prev => ({
        x: prev.x + ((e.clientX - centerX) * factor - prev.x) * easing,
        y: prev.y + ((e.clientY - centerY) * factor - prev.y) * easing,
      }));
    } else {
      setPosition(prev => ({
        x: prev.x + (0 - prev.x) * easing,
        y: prev.y + (0 - prev.y) * easing,
      }));
    }
  }, [strength, radius, easing]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return [ref as React.RefObject<T>, position];
}
