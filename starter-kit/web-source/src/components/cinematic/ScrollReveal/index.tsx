import { useRef, useEffect, useState, forwardRef, ReactNode } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export type RevealEffect = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'blur';

export interface ScrollRevealProps {
  children: ReactNode;
  effect?: RevealEffect;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const effectVariants: Record<RevealEffect, Variants> = {
  'fade': { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  'slide-up': { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
  'slide-down': { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
  'slide-left': { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  'slide-right': { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  'scale': { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  'rotate': { hidden: { opacity: 0, rotate: -15, scale: 0.9 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
  'blur': { hidden: { opacity: 0, filter: 'blur(10px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
};

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, effect = 'fade', duration = 0.5, delay = 0, threshold = 0.1, className, once = true }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once, amount: threshold });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) controls.start('visible');
    }, [isInView, controls]);

    return (
      <motion.div
        ref={containerRef}
        className={cn(className)}
        variants={effectVariants[effect]}
        initial="hidden"
        animate={controls}
        transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';
export default ScrollReveal;
