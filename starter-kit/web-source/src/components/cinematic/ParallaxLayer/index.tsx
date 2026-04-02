import { useRef, useEffect, useState, forwardRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = slower, positive = faster
  className?: string;
  offset?: ['start' | 'center' | 'end', 'start' | 'center' | 'end'];
}

export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
  ({ children, speed = 0.5, className, offset = ['start', 'end'] }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: [`${offset[0]} start`, `${offset[1]} start`],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
      <div ref={containerRef} className={cn('relative', className)}>
        <motion.div style={{ y: smoothY }}>
          {children}
        </motion.div>
      </div>
    );
  }
);

ParallaxLayer.displayName = 'ParallaxLayer';
export default ParallaxLayer;
