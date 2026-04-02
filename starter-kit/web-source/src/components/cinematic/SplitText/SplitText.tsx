import React, { useMemo, useRef, useEffect, useState, forwardRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SplitTextProps, SplitType, StaggerFrom } from './types';

const defaultScrambleChars = '!<>-_\\/[]{}—=+*^?#________';

const useScramble = (text: string, chars: string, isActive: boolean) => {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number>(undefined);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);

  useEffect(() => {
    if (!isActive) { setDisplayText(text); return; }
    const length = text.length;
    queueRef.current = Array.from({ length }, (_, i) => ({
      from: chars[Math.floor(Math.random() * chars.length)],
      to: text[i],
      start: Math.floor(Math.random() * 20),
      end: Math.floor(Math.random() * 20) + 20,
    }));
    let frame = 0;
    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < length; i++) {
        const { from, to, start, end } = queueRef.current[i];
        let char = queueRef.current[i].char;
        if (frame >= end) { complete++; output += to; }
        else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queueRef.current[i].char = char;
          }
          output += char;
        } else { output += from; }
      }
      setDisplayText(output);
      if (complete < length) { frame++; frameRef.current = requestAnimationFrame(update); }
      else if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    frameRef.current = requestAnimationFrame(update);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [text, chars, isActive]);

  return displayText;
};

export const SplitText = forwardRef<HTMLDivElement, SplitTextProps>(
  ({
    children,
    splitType = 'chars',
    className,
    animation = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0, 0.55, 0.45, 1] } },
    staggerFrom = 'first',
    staggerDelay = 0,
    trigger = 'inView',
    threshold = 1,
    onComplete,
    scrambleOnHover = false,
    scrambleChars = defaultScrambleChars,
    loop = false,
    loopDelay = 2,
  }, ref) => {
    const text = typeof children === 'string' ? children : '';
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isInView = useInView(containerRef, { once: !loop, amount: threshold });

    const displayText = useScramble(text, scrambleChars, scrambleOnHover && isHovered);

    const segments = useMemo(() => {
      switch (splitType) {
        case 'words': return text.split(' ');
        case 'lines': return text.split('\n');
        case 'words-and-chars': return text.split(' ').flatMap((w, i, arr) => [...w.split(''), i < arr.length - 1 ? [' '] : []]);
        default: return text.split('');
      }
    }, [text, splitType]);

    const staggerDelayCalc = (index: number, total: number) => {
      switch (staggerFrom) {
        case 'last': return (total - 1 - index) * staggerDelay;
        case 'center': return Math.abs(Math.floor(total / 2) - index) * staggerDelay;
        case 'random': return Math.random() * total * staggerDelay;
        default: return index * staggerDelay;
      }
    };

    useEffect(() => {
      if (trigger === 'load' || (trigger === 'inView' && isInView)) {
        controls.start('visible');
        setHasAnimated(true);
      }
    }, [isInView, trigger, controls]);

    useEffect(() => {
      if (hasAnimated && loop) {
        const timeout = setTimeout(() => {
          controls.start('hidden').then(() => { setHasAnimated(false); });
        }, loopDelay * 1000);
        return () => clearTimeout(timeout);
      }
    }, [hasAnimated, loop, loopDelay, controls]);

    return (
      <motion.div
        ref={containerRef}
        className={cn('inline-block', className)}
        onMouseEnter={() => scrambleOnHover && setIsHovered(true)}
        onMouseLeave={() => scrambleOnHover && setIsHovered(false)}
      >
        {(scrambleOnHover && isHovered ? displayText : text).split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block whitespace-pre"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: animation.initial as any,
              visible: { ...animation.animate, transition: { ...animation.transition, delay: staggerDelayCalc(index, segments.length) } } as any,
            }}
            style={{ display: 'inline-block' }}
            onAnimationComplete={index === segments.length - 1 ? onComplete : undefined}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  }
);

SplitText.displayName = 'SplitText';
export default SplitText;
