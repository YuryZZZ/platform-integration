import type { AnimationPreset, Keyframe, AnimationConfig, FillMode, PlaybackDirection, AnimationIntensity } from './types';

const intensityMultipliers: Record<AnimationIntensity, number> = {
  low: 0.5,
  medium: 1.0,
  high: 1.5
};

function applyIntensity(value: number, intensity: AnimationIntensity): number {
  return value * intensityMultipliers[intensity];
}

export type AdvancedPresetName =
  | 'liquid'
  | 'glitch'
  | 'flip3d'
  | 'magnetic'
  | 'parallax'
  | 'elastic'
  | 'revealMask'
  | 'morph';

export const advancedPresets: Record<AdvancedPresetName, (intensity?: AnimationIntensity) => AnimationPreset> = {
  liquid: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'liquid',
    keyframes: [
      { offset: 0, transform: 'scale(1) skewX(0deg)', opacity: 1 },
      { offset: 0.25, transform: `scale(${1 + applyIntensity(0.05, intensity)}) skewX(${applyIntensity(3, intensity)}deg)`, opacity: 0.9 },
      { offset: 0.5, transform: `scale(${1 - applyIntensity(0.03, intensity)}) skewX(-${applyIntensity(2, intensity)}deg)`, opacity: 0.95 },
      { offset: 0.75, transform: `scale(${1 + applyIntensity(0.02, intensity)}) skewX(${applyIntensity(1, intensity)}deg)`, opacity: 0.98 },
      { offset: 1, transform: 'scale(1) skewX(0deg)', opacity: 1 }
    ],
    config: { duration: applyIntensity(2000, intensity), easing: 'ease-in-out', fill: 'both' as FillMode, direction: 'normal' as PlaybackDirection },
    cssClass: 'animate-liquid',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  glitch: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'glitch',
    keyframes: [
      { offset: 0, transform: 'translate(0)', opacity: 1 },
      { offset: 0.2, transform: `translate(${applyIntensity(-5, intensity)}px, ${applyIntensity(2, intensity)}px) skewX(${applyIntensity(2, intensity)}deg)`, opacity: 0.8 },
      { offset: 0.4, transform: `translate(${applyIntensity(3, intensity)}px, ${applyIntensity(-1, intensity)}px) skewX(-${applyIntensity(1, intensity)}deg)`, opacity: 0.9 },
      { offset: 0.6, transform: `translate(${applyIntensity(-2, intensity)}px, 0) skewX(${applyIntensity(0.5, intensity)}deg)`, opacity: 0.85 },
      { offset: 0.8, transform: `translate(${applyIntensity(1, intensity)}px, 0)`, opacity: 0.95 },
      { offset: 1, transform: 'translate(0)', opacity: 1 }
    ],
    config: { duration: applyIntensity(300, intensity), easing: 'steps(6)', fill: 'both' as FillMode, direction: 'normal' as PlaybackDirection },
    cssClass: 'animate-glitch',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  flip3d: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'flip3d',
    keyframes: [
      { offset: 0, transform: 'perspective(400px) rotateY(0deg)', opacity: 1 },
      { offset: 0.5, transform: `perspective(400px) rotateY(${applyIntensity(90, intensity)}deg)`, opacity: 0.5 },
      { offset: 1, transform: 'perspective(400px) rotateY(180deg)', opacity: 1 }
    ],
    config: { duration: applyIntensity(800, intensity), easing: 'ease-in-out', fill: 'forwards' as FillMode, direction: 'normal' as PlaybackDirection },
    cssClass: 'animate-flip-3d',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  magnetic: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'magnetic',
    keyframes: [
      { offset: 0, transform: 'translate(0, 0) scale(1)' },
      { offset: 0.3, transform: `translate(${applyIntensity(10, intensity)}px, ${applyIntensity(-5, intensity)}px) scale(${1 + applyIntensity(0.05, intensity)})` },
      { offset: 0.6, transform: `translate(${applyIntensity(-5, intensity)}px, ${applyIntensity(8, intensity)}px) scale(${1 - applyIntensity(0.02, intensity)})` },
      { offset: 1, transform: 'translate(0, 0) scale(1)' }
    ],
    config: { duration: applyIntensity(400, intensity), easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'both' as FillMode, direction: 'normal' as PlaybackDirection },
    cssClass: 'animate-magnetic',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  parallax: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'parallax',
    keyframes: [
      { offset: 0, transform: `translateY(${applyIntensity(100, intensity)}px)`, opacity: 0 },
      { offset: 0.5, transform: `translateY(${applyIntensity(20, intensity)}px)`, opacity: 0.7 },
      { offset: 1, transform: 'translateY(0)', opacity: 1 }
    ],
    config: { duration: applyIntensity(1000, intensity), easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' as FillMode, direction: 'normal' as PlaybackDirection },
    cssClass: 'animate-parallax',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  elastic: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'elastic',
    keyframes: [
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.4, transform: `scale(${1 + applyIntensity(0.3, intensity)})` },
      { offset: 0.6, transform: `scale(${1 - applyIntensity(0.15, intensity)})` },
      { offset: 0.8, transform: `scale(${1 + applyIntensity(0.08, intensity)})` },
      { offset: 0.9, transform: `scale(${1 - applyIntensity(0.03, intensity)})` },
      { offset: 1, transform: 'scale(1)' }
    ],
    config: { duration: applyIntensity(1000, intensity), easing: 'ease-out', fill: 'both' as FillMode, direction: 'normal' as PlaybackDirection },
    cssClass: 'animate-elastic',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  revealMask: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'revealMask',
    keyframes: [
      { offset: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 },
      { offset: 0.5, clipPath: `polygon(0 0, ${applyIntensity(50, intensity)}% 0, ${applyIntensity(50, intensity)}% 100%, 0 100%)` },
      { offset: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }
    ],
    config: { duration: applyIntensity(800, intensity), easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'forwards' as FillMode, direction: 'normal' as PlaybackDirection },
    cssClass: 'animate-reveal-mask',
    intensityMultiplier: intensityMultipliers[intensity]
  }),

  morph: (intensity: AnimationIntensity = 'medium'): AnimationPreset => ({
    name: 'morph',
    keyframes: [
      { offset: 0, borderRadius: '0%', transform: 'scale(1) rotate(0deg)' },
      { offset: 0.25, borderRadius: `${applyIntensity(30, intensity)}%`, transform: `scale(${1 + applyIntensity(0.1, intensity)}) rotate(${applyIntensity(5, intensity)}deg)` },
      { offset: 0.5, borderRadius: `${applyIntensity(50, intensity)}%`, transform: `scale(${1 - applyIntensity(0.05, intensity)}) rotate(-${applyIntensity(3, intensity)}deg)` },
      { offset: 0.75, borderRadius: `${applyIntensity(25, intensity)}%`, transform: `scale(${1 + applyIntensity(0.03, intensity)}) rotate(${applyIntensity(2, intensity)}deg)` },
      { offset: 1, borderRadius: '0%', transform: 'scale(1) rotate(0deg)' }
    ],
    config: { duration: applyIntensity(2500, intensity), easing: 'ease-in-out', fill: 'both' as FillMode, direction: 'normal' as PlaybackDirection },
    cssClass: 'animate-morph',
    intensityMultiplier: intensityMultipliers[intensity]
  })
};

export function getAdvancedPreset(name: AdvancedPresetName, intensity: AnimationIntensity = 'medium'): AnimationPreset {
  return advancedPresets[name](intensity);
}
