import { useState, useCallback, useRef, useEffect } from 'react';

interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

interface SpringState {
  value: number;
  velocity: number;
}

export function useSpring(
  initialValue: number = 0,
  config: SpringConfig = {}
): [number, (target: number) => void] {
  const { stiffness = 100, damping = 10, mass = 1 } = config;
  const [state, setState] = useState<SpringState>({ value: initialValue, velocity: 0 });
  const targetRef = useRef(initialValue);
  const rafRef = useRef<number | null>(null);

  const setTarget = useCallback((target: number) => {
    targetRef.current = target;
  }, []);

  useEffect(() => {
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setState(prev => {
        const displacement = targetRef.current - prev.value;
        const springForce = stiffness * displacement;
        const dampingForce = -damping * prev.velocity;
        const acceleration = (springForce + dampingForce) / mass;
        const newVelocity = prev.velocity + acceleration * deltaTime;
        const newValue = prev.value + newVelocity * deltaTime;

        if (Math.abs(displacement) < 0.001 && Math.abs(newVelocity) < 0.001) {
          return { value: targetRef.current, velocity: 0 };
        }

        return { value: newValue, velocity: newVelocity };
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [stiffness, damping, mass]);

  return [state.value, setTarget];
}
