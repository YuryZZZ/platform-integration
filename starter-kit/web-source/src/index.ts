// ============================================
// Award-Winning Design System
// Main Export File
// ============================================

// Cinematic Components
export { AnimatedText } from './components/cinematic/AnimatedText';
export type { AnimatedTextProps, AnimatedTextSplitBy, AnimatedTextEffect } from './components/cinematic/AnimatedText';

export { SplitText } from './components/cinematic/SplitText/SplitText';
export type { SplitTextProps, SplitType, StaggerFrom, SplitTextAnimation } from './components/cinematic/SplitText/types';

export { ScrollReveal } from './components/cinematic/ScrollReveal';
export type { ScrollRevealProps, RevealEffect } from './components/cinematic/ScrollReveal';

export { ParallaxLayer } from './components/cinematic/ParallaxLayer';
export type { ParallaxLayerProps } from './components/cinematic/ParallaxLayer';

export { PresentationCarousel } from './components/cinematic/PresentationCarousel';
export type { CarouselItem, PresentationCarouselProps, CarouselEffect } from './components/cinematic/PresentationCarousel/types';

// Navigation Components
// NOTE: MorphNav and LiquidTransition are not yet implemented

// Animation Hooks
export { useSpring } from './hooks/useSpring';
export { useMagnetic } from './hooks/useMagnetic';
export { useGlitch } from './hooks/useGlitch';

// Animation Library
export { presets, createStaggeredSequence, generateAllPresetCss } from './lib/animation/presets';
export type { PresetName } from './lib/animation/presets';

export { advancedPresets, getAdvancedPreset } from './lib/animation/advancedPresets';
export type { AdvancedPresetName } from './lib/animation/advancedPresets';

export { AnimationTimeline, AnimationGroup, easingFunctions } from './lib/animation/orchestrator';
export type { AnimationStep, TimelineOptions, EasingFunction } from './lib/animation/orchestrator';

// Scroll System
export { LocomotiveScroll } from './lib/scroll/LocomotiveScroll';
export type { LocomotiveScrollConfig, ScrollState, ScrollCallback } from './lib/scroll/LocomotiveScroll';

export { ScrollTrigger } from './lib/scroll/ScrollTrigger';
export type { ScrollTriggerConfig, ScrollTriggerEntry } from './lib/scroll/ScrollTrigger';

// Magnetic System
export { MagneticField } from './lib/magnetic/MagneticField';
export type { MagneticConfig, MagneticState } from './lib/magnetic/MagneticField';

// Effects
export { generateNoiseFilter, getNoiseStyles, noisePresets, defaultNoiseConfig } from './lib/effects/NoiseEffect';
export type { NoiseType, NoiseConfig } from './lib/effects/NoiseEffect';

export { generateGrainCSS, getGrainOverlayStyles, grainPresets, defaultGrainConfig } from './lib/effects/GrainEffect';
export type { GrainDirection, GrainStyle, GrainConfig } from './lib/effects/GrainEffect';

// WebGL/3D System
// NOTE: WebGL components not yet implemented

// Utility
export { cn } from './lib/utils';
