/**
 * Surface Detection Types
 * Nexus AI Spec v4.6 - Surface Detection System
 */

export type SurfaceType = 'SMARTPHONE' | 'TABLET' | 'DESKTOP' | 'CINEMATIC';

export type MotionIntensity = 'full' | 'reduced' | 'minimal' | 'none';

export interface SurfaceCapabilities {
  /** Detected surface type */
  surfaceType: SurfaceType;
  
  /** Device supports hover states (mouse/trackpad) */
  supportsHover: boolean;
  
  /** Device supports fine pointer (pixel-precise input) */
  supportsFinePointer: boolean;
  
  /** Device supports touch input */
  supportsTouch: boolean;
  
  /** Device supports voice capture (microphone) */
  supportsVoiceCapture: boolean;
  
  /** Device supports speech recognition APIs */
  supportsSpeechRecognition: boolean;
  
  /** Browser supports CSS Scroll Timelines API */
  supportsScrollTimelines: boolean;
  
  /** Browser supports CSS Container Queries */
  supportsContainerQueries: boolean;
  
  /** Browser supports Long Animation Frames API */
  supportsLongAnimationFrames: boolean;
  
  /** Browser supports View Transitions API */
  supportsViewTransitions: boolean;
  
  /** Device has sonic/haptic feedback capability */
  hasSonicFeedback: boolean;
  
  /** Motion preference intensity level */
  motionIntensity: MotionIntensity;
  
  /** Minimum readable font size in pixels */
  minFontPx: number;
  
  /** Safe padding for TV overscan in pixels */
  overscanSafePaddingPx: number;
}

/**
 * Detection options for customizing detection behavior
 */
export interface DetectionOptions {
  /** Force a specific surface type (bypasses detection) */
  forceSurfaceType?: SurfaceType;
  
  /** Custom viewport width breakpoint for tablet */
  tabletBreakpoint?: number;
  
  /** Custom viewport width breakpoint for cinematic */
  cinematicBreakpoint?: number;
  
  /** Enable verbose logging for debugging */
  debug?: boolean;
}

/**
 * Detection result with additional metadata
 */
export interface DetectionResult extends SurfaceCapabilities {
  /** Timestamp of detection */
  detectedAt: number;

  /** User agent string used for detection */
  userAgent: string;

  /** Viewport dimensions at detection time */
  viewport: {
    width: number;
    height: number;
  };
}

/**
 * Default capabilities for each surface type
 */
export const DEFAULT_CAPABILITIES: Record<SurfaceType, SurfaceCapabilities> = {
  SMARTPHONE: {
    surfaceType: 'SMARTPHONE',
    supportsHover: false,
    supportsFinePointer: false,
    supportsTouch: true,
    supportsVoiceCapture: true,
    supportsSpeechRecognition: true,
    supportsScrollTimelines: false,
    supportsContainerQueries: true,
    supportsLongAnimationFrames: false,
    supportsViewTransitions: false,
    hasSonicFeedback: true,
    motionIntensity: 'reduced',
    minFontPx: 16,
    overscanSafePaddingPx: 0,
  },
  TABLET: {
    surfaceType: 'TABLET',
    supportsHover: false,
    supportsFinePointer: true,
    supportsTouch: true,
    supportsVoiceCapture: true,
    supportsSpeechRecognition: true,
    supportsScrollTimelines: true,
    supportsContainerQueries: true,
    supportsLongAnimationFrames: true,
    supportsViewTransitions: true,
    hasSonicFeedback: true,
    motionIntensity: 'reduced',
    minFontPx: 18,
    overscanSafePaddingPx: 0,
  },
  DESKTOP: {
    surfaceType: 'DESKTOP',
    supportsHover: true,
    supportsFinePointer: true,
    supportsTouch: false,
    supportsVoiceCapture: true,
    supportsSpeechRecognition: true,
    supportsScrollTimelines: true,
    supportsContainerQueries: true,
    supportsLongAnimationFrames: true,
    supportsViewTransitions: true,
    hasSonicFeedback: false,
    motionIntensity: 'full',
    minFontPx: 16,
    overscanSafePaddingPx: 0,
  },
  CINEMATIC: {
    surfaceType: 'CINEMATIC',
    supportsHover: false,
    supportsFinePointer: false,
    supportsTouch: false,
    supportsVoiceCapture: true,
    supportsSpeechRecognition: true,
    supportsScrollTimelines: true,
    supportsContainerQueries: true,
    supportsLongAnimationFrames: true,
    supportsViewTransitions: true,
    hasSonicFeedback: true,
    motionIntensity: 'minimal',
    minFontPx: 24,
    overscanSafePaddingPx: 48,
  },
};
