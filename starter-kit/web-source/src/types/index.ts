// Surface Types
export type SurfaceType = 'smartphone' | 'tablet' | 'desktop' | 'cinematic';

export type MotionIntensity = 'full' | 'reduced' | 'minimal' | 'none';

export interface SurfaceCapabilities {
  reducedMotion: boolean;
  highContrast: boolean;
  touchCapable: boolean;
  tvMode: boolean;
}

// Navigation Types
export type Direction = 'up' | 'down' | 'left' | 'right';

// Component Types
export type ComponentSize = 'sm' | 'md' | 'lg' | 'tv';
export type ComponentVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
