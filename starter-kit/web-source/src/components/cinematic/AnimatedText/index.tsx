import React, { useMemo, forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AnimatedTextSplitBy = 'characters' | 'words' | 'lines';
export type AnimatedTextEffect = 'fade' | 'slide' | 'scale' | 'wave' | 'bounce' | 'blur';

export interface AnimatedTextProps {
  text: string;
  splitBy?: AnimatedTextSplitBy;
  effect?: AnimatedTextEffect;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  onAnimationComplete?: () => void;
}

const effectVariants: Record<AnimatedTextEffect, Variants> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slide: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } },
  wave: { hidden: { opacity: 0, y: 20, rotateX: -90 }, visible: { opacity: 1, y: 0, rotateX: 0 } },
  bounce: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5 } } },
  blur: { hidden: { opacity: 0, filter: 'blur(10px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
};

export const AnimatedText = forwardRef<HTMLDivElement, AnimatedTextProps>(
  ({ text, splitBy = 'characters', effect = 'fade', className, staggerDelay = 0.03, duration = 0.5, once = true, as: Component = 'div', onAnimationComplete }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once, amount: 0.5 });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (isInView && !hasAnimated) setHasAnimated(true);
    }, [isInView, hasAnimated]);

    const segments = useMemo(() => {
      switch (splitBy) {
        case 'words': return text.split(' ');
        case 'lines': return text.split('\n');
        default: return text.split('');
      }
    }, [text, splitBy]);

    const containerVariants: Variants = {
      hidden: {},
      visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.1 } },
    };

    const childVariants: Variants = {
      hidden: effectVariants[effect].hidden,
      visible: { ...effectVariants[effect].visible, transition: { duration, ease: [0.215, 0.61, 0.355, 1] } },
    };

    return (
      <motion.div
        ref={containerRef}
        className={cn('inline-block', className)}
        variants={containerVariants}
        initial="hidden"
        animate={hasAnimated ? 'visible' : 'hidden'}
        onAnimationComplete={onAnimationComplete}
      >
        {segments.map((segment, index) => (
          <motion.span
            key={`${segment}-${index}`}
            className={cn('inline-block', splitBy === 'characters' && segment === ' ' && 'whitespace-pre')}
            variants={childVariants}
            style={{ display: 'inline-block' }}
          >
            {segment}
            {splitBy === 'words' && index < segments.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </motion.div>
    );
  }
);

AnimatedText.displayName = 'AnimatedText';
export default AnimatedText;
