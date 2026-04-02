import type { Keyframe, AnimationConfig, AnimationPreset, FillMode, PlaybackDirection, AnimationIntensity } from './types';

export type PresetName =
  | 'fadeIn'
  | 'fadeOut'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideOutUp'
  | 'slideOutDown'
  | 'scaleIn'
  | 'scaleOut'
  | 'bounce'
  | 'pulse'
  | 'shake';

const intensityMultipliers: Record<AnimationIntensity, number> = {
  low: 0.5,
  medium: 1.0,
  high: 1.5
};

function applyIntensity(value: number, intensity: AnimationIntensity): number {
  return value * intensityMultipliers[intensity];
}

export const presets: Record<PresetName, (intensity?: AnimationIntensity) => AnimationPreset> = {
  fadeIn: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'fadeIn',
    keyframes: [
      { offset: 0, opacity: 0 },
      { offset: 1, opacity: 1 }
    ],
    config: {
      duration: applyIntensity(300, intensity),
      easing: 'ease-out',
      fill: 'forwards' as FillMode,
      direction: 'normal' as PlaybackDirection
    },
    cssClass: 'animate-fade-in',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  fadeOut: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'fadeOut',
    keyframes: [
      { offset: 0, opacity: 1 },
      { offset: 1, opacity: 0 }
    ],
    config: {
      duration: applyIntensity(300, intensity),
      easing: 'ease-in',
      fill: 'forwards' as FillMode,
      direction: 'normal' as PlaybackDirection
    },
    cssClass: 'animate-fade-out',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  slideInUp: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'slideInUp',
    keyframes: [
      { offset: 0, opacity: 0, transform: `translateY(${applyIntensity(20, intensity)}px)` },
      { offset: 1, opacity: 1, transform: 'translateY(0)' }
    ],
    config: {
      duration: applyIntensity(400, intensity),
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards' as FillMode,
      direction: 'normal' as PlaybackDirection
    },
    cssClass: 'animate-slide-in-up',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  slideInDown: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'slideInDown',
    keyframes: [
      { offset: 0, opacity: 0, transform: `translateY(-${applyIntensity(20, intensity)}px)` },
      { offset: 1, opacity: 1, transform: 'translateY(0)' }
    ],
    config: {
      duration: applyIntensity(400, intensity),
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards' as FillMode,
      direction: 'normal' as PlaybackDirection
    },
    cssClass: 'animate-slide-in-down',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  slideOutUp: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'slideOutUp',
    keyframes: [
      { offset: 0, opacity: 1, transform: 'translateY(0)' },
      { offset: 1, opacity: 0, transform: `translateY(-${applyIntensity(20, intensity)}px)` }
    ],
    config: {
      duration: applyIntensity(300, intensity),
      easing: 'ease-in',
      fill: 'forwards' as FillMode,
      direction: 'normal' as PlaybackDirection
    },
    cssClass: 'animate-slide-out-up',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  slideOutDown: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'slideOutDown',
    keyframes: [
      { offset: 0, opacity: 1, transform: 'translateY(0)' },
      { offset: 1, opacity: 0, transform: `translateY(${applyIntensity(20, intensity)}px)` }
    ],
    config: {
      duration: applyIntensity(300, intensity),
      easing: 'ease-in',
      fill: 'forwards' as FillMode,
      direction: 'normal' as PlaybackDirection
    },
    cssClass: 'animate-slide-out-down',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  scaleIn: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'scaleIn',
    keyframes: [
      { offset: 0, opacity: 0, transform: `scale(${applyIntensity(0.8, intensity)})` },
      { offset: 1, opacity: 1, transform: 'scale(1)' }
    ],
    config: {
      duration: applyIntensity(350, intensity),
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards' as FillMode,
      direction: 'normal' as PlaybackDirection
    },
    cssClass: 'animate-scale-in',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  scaleOut: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'scaleOut',
    keyframes: [
      { offset: 0, opacity: 1, transform: 'scale(1)' },
      { offset: 1, opacity: 0, transform: `scale(${applyIntensity(0.8, intensity)})` }
    ],
    config: {
      duration: applyIntensity(250, intensity),
      easing: 'ease-in',
      fill: 'forwards' as FillMode,
      direction: 'normal' as PlaybackDirection
    },
    cssClass: 'animate-scale-out',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  bounce: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'bounce',
    keyframes: [
      { offset: 0, transform: 'translateY(0)' },
      { offset: 0.4, transform: `translateY(-${applyIntensity(20, intensity)}px)` },
      { offset: 0.8, transform: `translateY(-${applyIntensity(10, intensity)}px)` },
      { offset: 1, transform: 'translateY(0)' }
    ],
    config: {
      duration: applyIntensity(800, intensity),
      easing: 'ease-in-out',
      fill: 'both' as FillMode,
      direction: 'normal' as PlaybackDirection,
      iterations: 1
    },
    cssClass: 'animate-bounce',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  pulse: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'pulse',
    keyframes: [
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: `scale(${1 + applyIntensity(0.05, intensity)})` },
      { offset: 1, transform: 'scale(1)' }
    ],
    config: {
      duration: applyIntensity(1500, intensity),
      easing: 'ease-in-out',
      fill: 'both' as FillMode,
      direction: 'normal' as PlaybackDirection,
      iterations: Infinity
    },
    cssClass: 'animate-pulse',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  shake: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'shake',
    keyframes: [
      { offset: 0, transform: 'translateX(0)' },
      { offset: 0.1, transform: `translateX(-${applyIntensity(5, intensity)}px)` },
      { offset: 0.2, transform: `translateX(${applyIntensity(5, intensity)}px)` },
      { offset: 0.3, transform: `translateX(-${applyIntensity(5, intensity)}px)` },
      { offset: 0.4, transform: `translateX(${applyIntensity(5, intensity)}px)` },
      { offset: 0.5, transform: `translateX(-${applyIntensity(5, intensity)}px)` },
      { offset: 0.6, transform: `translateX(${applyIntensity(5, intensity)}px)` },
      { offset: 0.7, transform: `translateX(-${applyIntensity(5, intensity)}px)` },
      { offset: 0.8, transform: `translateX(${applyIntensity(5, intensity)}px)` },
      { offset: 0.9, transform: `translateX(-${applyIntensity(5, intensity)}px)` },
      { offset: 1, transform: 'translateX(0)' }
    ],
    config: {
      duration: applyIntensity(500, intensity),
      easing: 'ease-in-out',
      fill: 'both' as FillMode,
      direction: 'normal' as PlaybackDirection,
      iterations: 1
    },
    cssClass: 'animate-shake',
    intensityMultiplier: intensityMultipliers[intensity]
  })
};

export interface StaggeredSequenceItem {
  index: number;
  preset: AnimationPreset;
  delay: number;
}

export interface StaggeredSequence {
  items: StaggeredSequenceItem[];
  totalDuration: number;
}

export function createStaggeredSequence(
  count: number,
  presetName: PresetName,
  staggerDelay: number = 50,
  intensity: AnimationIntensity = 'medium'
): StaggeredSequence {
  const preset = presets[presetName](intensity);
  const items: StaggeredSequenceItem[] = [];

  for (let i = 0; i < count; i++) {
    items.push({
      index: i,
      preset,
      delay: i * staggerDelay
    });
  }

  return {
    items,
    totalDuration: preset.config.duration + (count - 1) * staggerDelay
  };
}

export function getPresetCss(preset: AnimationPreset): string {
  const keyframesName = `keyframes-${preset.name}`;
  const keyframesRule = `
@keyframes ${keyframesName} {
${preset.keyframes.map(kf => `  ${Math.round(kf.offset * 100)}% {
    ${kf.opacity !== undefined ? `opacity: ${kf.opacity};` : ''}
    ${kf.transform ? `transform: ${kf.transform};` : ''}
    ${kf.easing ? `animation-timing-function: ${kf.easing};` : ''}
  }`).join('\n')}
}`.trim();

  const animationRule = `
.${preset.cssClass} {
  animation: ${keyframesName} ${preset.config.duration}ms ${preset.config.easing} ${preset.config.delay || 0}ms ${preset.config.iterations || 1} ${preset.config.direction || 'normal'} ${preset.config.fill};
}`.trim();

  return `${keyframesRule}\n\n${animationRule}`;
}

export function generateAllPresetCss(intensity: AnimationIntensity = 'medium'): string {
  return (Object.keys(presets) as PresetName[])
    .map(name => getPresetCss(presets[name](intensity)))
    .join('\n\n');
}
