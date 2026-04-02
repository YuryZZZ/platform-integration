import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { detectSurface, type SurfaceCapabilities, type SurfaceType, type MotionIntensity } from './detectSurface';

/**
 * Get default capabilities for a surface type
 */
function getDefaultCapabilities(surfaceType: SurfaceType): SurfaceCapabilities {
  const baseCapabilities: SurfaceCapabilities = {
    surfaceType,
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
  };

  switch (surfaceType) {
    case 'SMARTPHONE':
      return {
        ...baseCapabilities,
        surfaceType: 'SMARTPHONE',
        supportsHover: false,
        supportsTouch: true,
        minFontPx: 16,
        motionIntensity: 'reduced',
      };
    case 'TABLET':
      return {
        ...baseCapabilities,
        surfaceType: 'TABLET',
        supportsTouch: true,
        minFontPx: 18,
        motionIntensity: 'reduced',
      };
    case 'CINEMATIC':
      return {
        ...baseCapabilities,
        surfaceType: 'CINEMATIC',
        supportsHover: false,
        supportsTouch: false,
        minFontPx: 24,
        overscanSafePaddingPx: 48,
        motionIntensity: 'minimal',
        hasSonicFeedback: true,
      };
    case 'DESKTOP':
    default:
      return baseCapabilities;
  }
}

export interface SurfaceContextValue {
  capabilities: SurfaceCapabilities;
  setOverride: (surfaceType: SurfaceType, motionIntensity?: MotionIntensity) => void;
  clearOverride: () => void;
  refresh: () => void;
}

const SurfaceContext = createContext<SurfaceContextValue | undefined>(undefined);

export function useSurfaceCapabilities(): SurfaceContextValue {
  const context = useContext(SurfaceContext);
  if (!context) throw new Error('useSurfaceCapabilities must be used within SurfaceProvider');
  return context;
}

export interface SurfaceProviderProps {
  children: ReactNode;
  initialSurfaceType?: SurfaceType;
  enableAutoDetection?: boolean;
  detectionInterval?: number;
}

export function SurfaceProvider({ 
  children, 
  initialSurfaceType = 'DESKTOP',
  enableAutoDetection = true,
  detectionInterval = 5000
}: SurfaceProviderProps) {
  // State for capabilities and override
  const [capabilities, setCapabilities] = useState<SurfaceCapabilities>(() => 
    getDefaultCapabilities(initialSurfaceType)
  );
  
  const [isOverridden, setIsOverridden] = useState(false);
  const [overrideSurfaceType, setOverrideSurfaceType] = useState<SurfaceType | null>(null);
  const [overrideMotionIntensity, setOverrideMotionIntensity] = useState<MotionIntensity | undefined>();

  // Detection function
  const detectAndUpdate = useCallback(() => {
    if (isOverridden && overrideSurfaceType) {
      // Use override values
      const caps = getDefaultCapabilities(overrideSurfaceType);
      if (overrideMotionIntensity) {
        caps.motionIntensity = overrideMotionIntensity;
      }
      setCapabilities(caps);
    } else if (enableAutoDetection) {
      // Auto-detect from hardware
      const detected = detectSurface();
      setCapabilities(detected);
    }
  }, [isOverridden, overrideSurfaceType, overrideMotionIntensity, enableAutoDetection]);

  // Set override function
  const setOverride = useCallback((surfaceType: SurfaceType, motionIntensity?: MotionIntensity) => {
    setOverrideSurfaceType(surfaceType);
    setOverrideMotionIntensity(motionIntensity);
    setIsOverridden(true);
    
    // Immediately update capabilities
    const caps = getDefaultCapabilities(surfaceType);
    if (motionIntensity) {
      caps.motionIntensity = motionIntensity;
    }
    setCapabilities(caps);
  }, []);

  // Clear override function
  const clearOverride = useCallback(() => {
    setOverrideSurfaceType(null);
    setOverrideMotionIntensity(undefined);
    setIsOverridden(false);
    
    // Revert to auto-detection
    if (enableAutoDetection) {
      const detected = detectSurface();
      setCapabilities(detected);
    }
  }, [enableAutoDetection]);

  // Refresh function (force re-detection)
  const refresh = useCallback(() => {
    if (isOverridden && overrideSurfaceType) {
      // Keep override but refresh capabilities
      const caps = getDefaultCapabilities(overrideSurfaceType);
      if (overrideMotionIntensity) {
        caps.motionIntensity = overrideMotionIntensity;
      }
      setCapabilities(caps);
    } else if (enableAutoDetection) {
      const detected = detectSurface();
      setCapabilities(detected);
    }
  }, [isOverridden, overrideSurfaceType, overrideMotionIntensity, enableAutoDetection]);

  // Effect for periodic auto-detection
  useEffect(() => {
    if (!enableAutoDetection || isOverridden) return;

    const intervalId = setInterval(() => {
      const detected = detectSurface();
      setCapabilities(prev => {
        // Only update if capabilities changed
        if (JSON.stringify(prev) !== JSON.stringify(detected)) {
          return detected;
        }
        return prev;
      });
    }, detectionInterval);

    return () => clearInterval(intervalId);
  }, [enableAutoDetection, detectionInterval, isOverridden]);

  // Initial detection on mount
  useEffect(() => {
    if (enableAutoDetection && !isOverridden) {
      const detected = detectSurface();
      setCapabilities(detected);
    }
  }, [enableAutoDetection, isOverridden]);

  // Context value
  const contextValue = useMemo<SurfaceContextValue>(() => ({
    capabilities,
    setOverride,
    clearOverride,
    refresh
  }), [capabilities, setOverride, clearOverride, refresh]);

  return (
    <SurfaceContext.Provider value={contextValue}>
      {children}
    </SurfaceContext.Provider>
  );
}
