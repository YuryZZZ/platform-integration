/**
 * Surface Detection Module
 * Client-side detection of surface capabilities
 */

import type { SurfaceCapabilities, SurfaceType, MotionIntensity } from './types';
import { DEFAULT_CAPABILITIES } from './types';

/**
 * Detects surface capabilities from client-side APIs
 */
export function detectSurfaceCapabilities(): SurfaceCapabilities {
  if (typeof window === 'undefined') {
    return DEFAULT_CAPABILITIES.DESKTOP;
  }

  // Detect hover capability
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  
  // Detect pointer precision
  const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
  
  // Detect touch capability
  const supportsTouch = navigator.maxTouchPoints > 0;
  
  // Detect motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Detect CSS features
  const supportsContainerQueries = CSS.supports('container-type', 'inline-size');
  const supportsScrollTimelines = 'AnimationTimeline' in window;
  const supportsViewTransitions = 'startViewTransition' in document;
  const supportsLongAnimationFrames = 'Performance' in window && 'longAnimationFrames' in (window as any).Performance.prototype;
  
  // Detect voice/speech APIs
  const supportsVoiceCapture = 'MediaRecorder' in window;
  const supportsSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  
  // Determine surface type
  const surfaceType = determineSurfaceType(supportsHover, supportsFinePointer, supportsTouch);
  
  // Determine motion intensity
  const motionIntensity = determineMotionIntensity(surfaceType, prefersReducedMotion);
  
  // Get defaults for this surface type
  const defaults = DEFAULT_CAPABILITIES[surfaceType];
  
  return {
    surfaceType,
    supportsHover,
    supportsFinePointer,
    supportsTouch,
    supportsVoiceCapture,
    supportsSpeechRecognition,
    supportsScrollTimelines,
    supportsContainerQueries,
    supportsLongAnimationFrames,
    supportsViewTransitions,
    hasSonicFeedback: surfaceType === 'CINEMATIC' || surfaceType === 'SMARTPHONE',
    motionIntensity,
    minFontPx: defaults.minFontPx,
    overscanSafePaddingPx: defaults.overscanSafePaddingPx,
  };
}

/**
 * Determines surface type from capabilities
 */
function determineSurfaceType(
  supportsHover: boolean,
  supportsFinePointer: boolean,
  supportsTouch: boolean
): SurfaceType {
  // TV detection: no hover, no fine pointer, no touch, large viewport
  if (!supportsHover && !supportsFinePointer && !supportsTouch) {
    // Could be TV or desktop without mouse
    const viewport = window.innerWidth * window.innerHeight;
    if (viewport > 2000000) { // Roughly 1080p+ 
      return 'CINEMATIC';
    }
  }
  
  // Mobile: touch-first, no hover
  if (supportsTouch && !supportsHover) {
    const viewport = window.innerWidth;
    return viewport < 768 ? 'SMARTPHONE' : 'TABLET';
  }
  
  // Tablet with pointer: touch + fine pointer
  if (supportsTouch && supportsFinePointer) {
    return 'TABLET';
  }
  
  // Desktop: hover + fine pointer
  if (supportsHover && supportsFinePointer) {
    return 'DESKTOP';
  }
  
  // Default to desktop
  return 'DESKTOP';
}

/**
 * Determines motion intensity based on surface and preferences
 */
function determineMotionIntensity(
  surfaceType: SurfaceType,
  prefersReducedMotion: boolean
): MotionIntensity {
  if (prefersReducedMotion) {
    return 'none';
  }
  
  switch (surfaceType) {
    case 'CINEMATIC':
      return 'minimal';
    case 'SMARTPHONE':
    case 'TABLET':
      return 'reduced';
    case 'DESKTOP':
    default:
      return 'full';
  }
}
