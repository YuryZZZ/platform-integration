/**
 * Surface Detection Core Module
 * Nexus AI Spec v4.6 - Three-Phase Detection Algorithm
 * 
 * Phase 1: Media Query Probing (CSS capabilities)
 * Phase 2: Input Modality Detection (pointer/touch/voice)
 * Phase 3: Environmental Signals (viewport, preferences)
 */

import type {
  SurfaceType,
  MotionIntensity,
  SurfaceCapabilities,
  DetectionOptions,
  DetectionResult,
} from './types';

// Default breakpoints aligned with Nexus AI Spec
const DEFAULT_TABLET_BREAKPOINT = 768;
const DEFAULT_CINEMATIC_BREAKPOINT = 1920;
const TV_OVERSCAN_SAFE_PADDING = 48;

/**
 * Phase 1: Detect CSS capabilities via media queries and API checks
 */
function detectCssCapabilities(): {
  supportsHover: boolean;
  supportsFinePointer: boolean;
  supportsScrollTimelines: boolean;
  supportsContainerQueries: boolean;
  supportsLongAnimationFrames: boolean;
  supportsViewTransitions: boolean;
} {
  if (typeof window === 'undefined') {
    // SSR defaults
    return {
      supportsHover: false,
      supportsFinePointer: false,
      supportsScrollTimelines: false,
      supportsContainerQueries: false,
      supportsLongAnimationFrames: false,
      supportsViewTransitions: false,
    };
  }

  const matchMedia = window.matchMedia.bind(window);

  // Hover capability
  const supportsHover = matchMedia('(hover: hover)').matches;

  // Fine pointer capability (mouse, trackpad)
  const supportsFinePointer = matchMedia('(pointer: fine)').matches;

  // CSS Scroll Timelines API
  const supportsScrollTimelines = 'scrollTimeline' in (CSS as any).prototype ||
    CSS.supports('animation-timeline', 'scroll()');

  // CSS Container Queries
  const supportsContainerQueries = CSS.supports('container-type', 'inline-size');

  // Long Animation Frames API
  const supportsLongAnimationFrames = 'PerformanceLongAnimationFrameTiming' in window;

  // View Transitions API
  const supportsViewTransitions = 'startViewTransition' in document;

  return {
    supportsHover,
    supportsFinePointer,
    supportsScrollTimelines,
    supportsContainerQueries,
    supportsLongAnimationFrames,
    supportsViewTransitions,
  };
}

/**
 * Phase 2: Detect input modalities (touch, voice, speech)
 */
function detectInputModalities(): {
  supportsTouch: boolean;
  supportsVoiceCapture: boolean;
  supportsSpeechRecognition: boolean;
} {
  if (typeof window === 'undefined') {
    return {
      supportsTouch: false,
      supportsVoiceCapture: false,
      supportsSpeechRecognition: false,
    };
  }

  // Touch capability - check for touch points and max touch points
  const supportsTouch = 'ontouchstart' in window || 
    (navigator.maxTouchPoints > 0);

  // Voice capture - check for media devices
  const supportsVoiceCapture = !!(navigator.mediaDevices && 
    navigator.mediaDevices.getUserMedia);

  // Speech recognition API
  const SpeechRecognition = (window as any).SpeechRecognition || 
    (window as any).webkitSpeechRecognition;
  const supportsSpeechRecognition = !!SpeechRecognition;

  return {
    supportsTouch,
    supportsVoiceCapture,
    supportsSpeechRecognition,
  };
}

/**
 * Phase 3: Detect environmental signals (motion preference, viewport, TV mode)
 */
function detectEnvironmentalSignals(
  options: DetectionOptions
): {
  motionIntensity: MotionIntensity;
  minFontPx: number;
  overscanSafePaddingPx: number;
  isTvMode: boolean;
} {
  if (typeof window === 'undefined') {
    return {
      motionIntensity: 'full',
      minFontPx: 16,
      overscanSafePaddingPx: 0,
      isTvMode: false,
    };
  }

  const matchMedia = window.matchMedia.bind(window);

  // Motion preference detection
  let motionIntensity: MotionIntensity = 'full';
  
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    motionIntensity = 'none';
  } else if (matchMedia('(prefers-reduced-motion)').matches) {
    // Partial reduction preference
    motionIntensity = 'reduced';
  }

  // Check for low-end device indicators
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as any).deviceMemory || 8;
  
  if (hardwareConcurrency <= 2 || deviceMemory <= 2) {
    // Reduce motion on low-end devices
    motionIntensity = motionIntensity === 'full' ? 'minimal' : motionIntensity;
  }

  // Minimum font size based on display type
  let minFontPx = 16;
  
  // Check for TV/10-foot interface indicators
  const isTvMode = detectTvMode();
  
  if (isTvMode) {
    minFontPx = 24; // Larger fonts for TV
  } else if (matchMedia('(max-width: 767px)').matches) {
    minFontPx = 16; // Mobile baseline
  }

  // Overscan safe padding for TVs
  const overscanSafePaddingPx = isTvMode ? TV_OVERSCAN_SAFE_PADDING : 0;

  return {
    motionIntensity,
    minFontPx,
    overscanSafePaddingPx,
    isTvMode,
  };
}

/**
 * Detect if running in TV/Cinematic mode
 */
function detectTvMode(): boolean {
  if (typeof window === 'undefined') return false;

  const matchMedia = window.matchMedia.bind(window);

  // Check for TV media type
  if (matchMedia('(tv)').matches) return true;

  // Check for large display with coarse pointer (typical TV setup)
  const isLargeDisplay = matchMedia('(min-width: 1920px)').matches;
  const hasCoarsePointer = matchMedia('(pointer: coarse)').matches;
  
  if (isLargeDisplay && hasCoarsePointer) return true;

  // Check for common TV user agent patterns
  const userAgent = navigator.userAgent.toLowerCase();
  const tvPatterns = ['tv', 'smart-tv', 'hbbtv', 'smarttv', 'appletv', 'roku', 'firetv'];
  
  if (tvPatterns.some(pattern => userAgent.includes(pattern))) {
    return true;
  }

  return false;
}

/**
 * Determine surface type from all detected signals
 */
function determineSurfaceType(
  cssCapabilities: ReturnType<typeof detectCssCapabilities>,
  inputModalities: ReturnType<typeof detectInputModalities>,
  environmentalSignals: ReturnType<typeof detectEnvironmentalSignals>,
  options: DetectionOptions
): SurfaceType {
  // Allow forced surface type
  if (options.forceSurfaceType) {
    return options.forceSurfaceType;
  }

  // TV/Cinematic takes priority
  if (environmentalSignals.isTvMode) {
    return 'CINEMATIC';
  }

  const tabletBreakpoint = options.tabletBreakpoint ?? DEFAULT_TABLET_BREAKPOINT;
  const cinematicBreakpoint = options.cinematicBreakpoint ?? DEFAULT_CINEMATIC_BREAKPOINT;

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;

  // Categorize by viewport and input capabilities
  if (viewportWidth >= cinematicBreakpoint) {
    return 'CINEMATIC';
  }

  // Touch-first devices
  if (inputModalities.supportsTouch && !cssCapabilities.supportsHover) {
    if (viewportWidth < tabletBreakpoint) {
      return 'SMARTPHONE';
    }
    return 'TABLET';
  }

  // Hybrid devices (touch + hover like Surface, iPad with trackpad)
  if (inputModalities.supportsTouch && cssCapabilities.supportsHover) {
    if (viewportWidth < tabletBreakpoint) {
      return 'SMARTPHONE';
    }
    if (viewportWidth < cinematicBreakpoint) {
      return 'TABLET';
    }
    return 'DESKTOP';
  }

  // Traditional desktop (hover, no touch)
  if (cssCapabilities.supportsHover && cssCapabilities.supportsFinePointer) {
    return 'DESKTOP';
  }

  // Fallback based on viewport
  if (viewportWidth < tabletBreakpoint) {
    return 'SMARTPHONE';
  }
  if (viewportWidth < cinematicBreakpoint) {
    return 'TABLET';
  }
  return 'DESKTOP';
}

/**
 * Detect sonic/haptic feedback capability
 */
function detectSonicFeedback(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for vibration API (haptic feedback)
  const hasVibration = 'vibrate' in navigator;

  // Check for audio context (sonic feedback capability)
  const hasAudioContext = 'AudioContext' in window || 
    'webkitAudioContext' in window;

  return hasVibration || hasAudioContext;
}

/**
 * Main detection function - Three-Phase Detection Algorithm
 * 
 * @param options - Detection configuration options
 * @returns Complete surface capabilities detection result
 */
export function detectSurface(options: DetectionOptions = {}): DetectionResult {
  // Phase 1: CSS Capabilities
  const cssCapabilities = detectCssCapabilities();

  // Phase 2: Input Modalities
  const inputModalities = detectInputModalities();

  // Phase 3: Environmental Signals
  const environmentalSignals = detectEnvironmentalSignals(options);

  // Determine surface type from all signals
  const surfaceType = determineSurfaceType(
    cssCapabilities,
    inputModalities,
    environmentalSignals,
    options
  );

  // Build complete capabilities object
  const capabilities: SurfaceCapabilities = {
    surfaceType,
    ...cssCapabilities,
    ...inputModalities,
    supportsScrollTimelines: cssCapabilities.supportsScrollTimelines,
    supportsContainerQueries: cssCapabilities.supportsContainerQueries,
    supportsLongAnimationFrames: cssCapabilities.supportsLongAnimationFrames,
    supportsViewTransitions: cssCapabilities.supportsViewTransitions,
    hasSonicFeedback: detectSonicFeedback(),
    motionIntensity: environmentalSignals.motionIntensity,
    minFontPx: environmentalSignals.minFontPx,
    overscanSafePaddingPx: environmentalSignals.overscanSafePaddingPx,
  };

  // Return with metadata
  return {
    ...capabilities,
    detectedAt: Date.now(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    viewport: {
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    },
  };
}

/**
 * Create a cached detector that only re-runs on significant changes
 */
export function createSurfaceDetector(options: DetectionOptions = {}) {
  let cachedResult: DetectionResult | null = null;
  let lastViewportWidth = 0;
  let lastViewportHeight = 0;

  const detect = (): DetectionResult => {
    if (typeof window === 'undefined') {
      return detectSurface(options);
    }

    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    // Return cached result if viewport hasn't changed
    if (
      cachedResult &&
      currentWidth === lastViewportWidth &&
      currentHeight === lastViewportHeight
    ) {
      return cachedResult;
    }

    // Re-detect and cache
    cachedResult = detectSurface(options);
    lastViewportWidth = currentWidth;
    lastViewportHeight = currentHeight;

    return cachedResult;
  };

  const invalidate = (): void => {
    cachedResult = null;
  };

  return { detect, invalidate };
}

// Re-export types
export type {
  SurfaceType,
  MotionIntensity,
  SurfaceCapabilities,
  DetectionOptions,
  DetectionResult,
} from './types';
