export type AnimationPhase = 'idle' | 'running' | 'completed' | 'stopped' | 'error';
export type FillMode = 'none' | 'forwards' | 'backwards' | 'both';
export type PlaybackDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationIntensity = 'low' | 'medium' | 'high';

export interface Keyframe {
  offset: number;
  opacity?: number;
  transform?: string;
  easing?: string;
  clipPath?: string;
  borderRadius?: string;
  [key: string]: any;
}

export interface AnimationConfig {
  duration: number;
  easing?: string;
  delay?: number;
  fill?: FillMode;
  iterations?: number;
  direction?: PlaybackDirection;
  onStart?: () => void;
  onComplete?: () => void;
}

export interface AnimationPreset {
  name: string;
  keyframes: Keyframe[];
  config: AnimationConfig;
  cssClass: string;
  intensityMultiplier: number;
}

export interface AnimationSequence {
  animations: AnimationConfig[];
  parallel?: boolean;
  staggerDelay?: number;
}

export interface OrchestratorCallbacks {
  onStart?: () => void;
  onComplete?: () => void;
  onStop?: () => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

export interface OrchestratorOptions {
  element?: HTMLElement;
  reducedMotion?: boolean;
}
