export type SplitType = 'chars' | 'words' | 'lines' | 'words-and-chars';
export type StaggerFrom = 'first' | 'last' | 'center' | 'random';

export interface SplitTextAnimation {
  initial?: Record<string, number | string>;
  animate?: Record<string, number | string>;
  exit?: Record<string, number | string>;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: number[] | string;
    type?: 'spring' | 'tween';
    stiffness?: number;
    damping?: number;
  };
}

export interface SplitTextProps {
  children: string;
  splitType?: SplitType;
  className?: string;
  animation?: SplitTextAnimation;
  staggerFrom?: StaggerFrom;
  staggerDelay?: number;
  trigger?: 'inView' | 'load' | 'hover' | 'click';
  threshold?: number;
  onComplete?: () => void;
  scrambleOnHover?: boolean;
  scrambleChars?: string;
  loop?: boolean;
  loopDelay?: number;
}
