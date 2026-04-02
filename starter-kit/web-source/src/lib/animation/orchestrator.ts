export type EasingFunction = 
  | 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  | 'spring' | 'bounce' | 'elastic';

export interface AnimationStep {
  id: string;
  duration: number;
  delay?: number;
  easing?: EasingFunction;
  keyframes: Keyframe[];
  onStart?: () => void;
  onComplete?: () => void;
}

export interface TimelineOptions {
  autoPlay?: boolean;
  loop?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export class AnimationTimeline {
  private animations: Map<string, AnimationStep> = new Map();
  private currentTime: number = 0;
  private isPlaying: boolean = false;
  private startTime: number = 0;
  private rafId: number | null = null;
  private options: TimelineOptions;

  constructor(options: TimelineOptions = {}) {
    this.options = { autoPlay: false, loop: false, direction: 'normal', ...options };
  }

  add(step: AnimationStep): this {
    this.animations.set(step.id, step);
    return this;
  }

  remove(id: string): boolean {
    return this.animations.delete(id);
  }

  getDuration(): number {
    let max = 0;
    this.animations.forEach(a => {
      const end = a.duration + (a.delay || 0);
      if (end > max) max = end;
    });
    return max;
  }

  play(): void {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startTime = performance.now() - this.currentTime;
    this.tick();
  }

  pause(): void {
    this.isPlaying = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  stop(): void {
    this.isPlaying = false;
    this.currentTime = 0;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  seek(time: number): void {
    this.currentTime = Math.max(0, Math.min(time, this.getDuration()));
    this.options.onProgress?.(this.currentTime / this.getDuration());
  }

  reverse(): void {
    this.options.direction = this.options.direction === 'normal' ? 'reverse' : 'normal';
  }

  private tick = (): void => {
    if (!this.isPlaying) return;
    
    const now = performance.now();
    this.currentTime = now - this.startTime;
    const totalDuration = this.getDuration();
    
    this.options.onProgress?.(this.currentTime / totalDuration);
    
    this.animations.forEach(animation => {
      const animTime = this.currentTime - (animation.delay || 0);
      if (animTime >= 0 && animTime <= animation.duration) {
        animation.onStart?.();
      }
      if (animTime >= animation.duration) {
        animation.onComplete?.();
      }
    });

    if (this.currentTime >= totalDuration) {
      if (this.options.loop) {
        this.currentTime = 0;
        this.startTime = now;
      } else {
        this.isPlaying = false;
        this.options.onComplete?.();
        return;
      }
    }
    
    this.rafId = requestAnimationFrame(this.tick);
  };
}

export class AnimationGroup {
  private animations: AnimationStep[] = [];
  private mode: 'parallel' | 'sequential';

  constructor(mode: 'parallel' | 'sequential' = 'parallel') {
    this.mode = mode;
  }

  add(animation: AnimationStep): this {
    this.animations.push(animation);
    return this;
  }

  getDuration(): number {
    if (this.mode === 'parallel') {
      return Math.max(...this.animations.map(a => a.duration + (a.delay || 0)));
    }
    return this.animations.reduce((sum, a) => sum + a.duration + (a.delay || 0), 0);
  }
}

export const easingFunctions: Record<EasingFunction, string> = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
};
