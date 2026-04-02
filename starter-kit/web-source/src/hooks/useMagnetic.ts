import { useState, useCallback, useRef, useEffect } from 'react';

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
  const targetPosition = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
    
    if (distance < radius) {
      const factor = (1 - distance / radius) * strength;
      targetPosition.current = {
        x: (e.clientX - centerX) * factor,
        y: (e.clientY - centerY) * factor,
      };
    } else {
      targetPosition.current = { x: 0, y: 0 };
    }
  }, [strength, radius]);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.current.x - prev.x) * easing,
        y: prev.y + (targetPosition.current.y - prev.y) * easing,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, easing]);

  return [ref as React.RefObject<T>, position];
}
