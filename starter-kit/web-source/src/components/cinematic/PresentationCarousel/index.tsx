'use client';
import { useState, useCallback, useEffect, useRef, forwardRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselItem, PresentationCarouselProps, CarouselEffect } from './types';

const effectConfigs: Record<CarouselEffect, { rotateY: number; translateZ: number; scale: number; opacity: number }> = {
  'cube': { rotateY: 90, translateZ: 300, scale: 1, opacity: 1 },
  'card-stack': { rotateY: 0, translateZ: 0, scale: 0.9, opacity: 0.7 },
  'depth-stack': { rotateY: 0, translateZ: -200, scale: 0.85, opacity: 0.5 },
  'fade-scale': { rotateY: 0, translateZ: 0, scale: 0.8, opacity: 0 },
  'slide-3d': { rotateY: 45, translateZ: -100, scale: 0.9, opacity: 0.6 },
};

export const PresentationCarousel = forwardRef<HTMLDivElement, PresentationCarouselProps>(
  ({
    items,
    effect = 'cube',
    autoPlay = false,
    autoPlayInterval = 5000,
    pauseOnHover = true,
    showIndicators = true,
    showNavigation = true,
    infinite = true,
    initialIndex = 0,
    className,
    style,
    itemWidth = 400,
    itemHeight = 300,
    perspective = 1200,
    onItemChange,
    onItemClick,
    renderItem,
    ariaLabel = 'Image carousel',
    reducedMotion: reducedMotionProp,
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const systemReducedMotion = useReducedMotion();
    const shouldReduceMotion = reducedMotionProp ?? systemReducedMotion ?? false;
    const itemCount = items.length;

    const validIndex = useCallback((index: number) => {
      if (infinite) return ((index % itemCount) + itemCount) % itemCount;
      return Math.max(0, Math.min(index, itemCount - 1));
    }, [infinite, itemCount]);

    const goToIndex = useCallback((index: number, dir: number = 1) => {
      const newIndex = validIndex(index);
      setDirection(dir);
      setCurrentIndex(newIndex);
      onItemChange?.(newIndex, items[newIndex]);
    }, [validIndex, items, onItemChange]);

    const goNext = useCallback(() => {
      if (!infinite && currentIndex >= itemCount - 1) return;
      goToIndex(currentIndex + 1, 1);
    }, [infinite, currentIndex, itemCount, goToIndex]);

    const goPrev = useCallback(() => {
      if (!infinite && currentIndex <= 0) return;
      goToIndex(currentIndex - 1, -1);
    }, [infinite, currentIndex, goToIndex]);

    useEffect(() => {
      if (!autoPlay || isPaused || itemCount <= 1) {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        return;
      }
      autoPlayRef.current = setInterval(goNext, autoPlayInterval);
      return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
    }, [autoPlay, autoPlayInterval, isPaused, itemCount, goNext]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'ArrowRight') goNext();
      };
      const container = containerRef.current;
      container?.addEventListener('keydown', handleKeyDown);
      return () => container?.removeEventListener('keydown', handleKeyDown);
    }, [goPrev, goNext]);

    const getItemStyle = (index: number): React.CSSProperties => {
      const diff = index - currentIndex;
      const config = effectConfigs[effect];
      const absDistance = Math.abs(diff);
      if (shouldReduceMotion) {
        return { opacity: diff === 0 ? 1 : 0, zIndex: diff === 0 ? 1 : 0, position: 'absolute' as const };
      }
      return {
        transform: `rotateY(${diff * config.rotateY}deg) translateZ(${config.translateZ}px)`,
        opacity: diff === 0 ? 1 : Math.max(0, config.opacity - absDistance * 0.2),
        zIndex: itemCount - absDistance,
        position: 'absolute' as const,
      };
    };

    return (
      <div
        ref={containerRef}
        className={cn('relative overflow-hidden', className)}
        style={{ ...style, perspective: `${perspective}px`, width: itemWidth, height: itemHeight }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                style={getItemStyle(index)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full h-full cursor-pointer"
                onClick={() => onItemClick?.(index, item)}
              >
                {renderItem ? renderItem(item, index, index === currentIndex) : item.content}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {showNavigation && (
          <>
            <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10" aria-label="Previous">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-10" aria-label="Next">
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}
        {showIndicators && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn('w-2 h-2 rounded-full transition-all', index === currentIndex ? 'bg-white w-4' : 'bg-white/50')}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

PresentationCarousel.displayName = 'PresentationCarousel';
export default PresentationCarousel;
