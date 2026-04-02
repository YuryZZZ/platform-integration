/**
 * Surface Context Provider
 * React context for surface capabilities with user override support
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { SurfaceCapabilities, SurfaceType, DEFAULT_CAPABILITIES } from './types';
import { detectSurfaceCapabilities } from './detector';

const SURFACE_OVERRIDE_KEY = 'nexus_surface_override';

interface SurfaceContextValue {
  capabilities: SurfaceCapabilities;
  setSurfaceOverride: (surfaceType: SurfaceType | null) => void;
  clearSurfaceOverride: () => void;
  hasOverride: boolean;
  redetect: () => void;
}

const SurfaceContext = createContext<SurfaceContextValue | null>(null);

interface SurfaceProviderProps {
  children: React.ReactNode;
  initialCapabilities?: SurfaceCapabilities;
}

export const SurfaceProvider: React.FC<SurfaceProviderProps> = ({
  children,
  initialCapabilities,
}) => {
  const [capabilities, setCapabilities] = useState<SurfaceCapabilities>(
    initialCapabilities || DEFAULT_CAPABILITIES.DESKTOP
  );
  const [hasOverride, setHasOverride] = useState(false);

  const redetect = useCallback(() => {
    if (typeof window === 'undefined') return;
    const detected = detectSurfaceCapabilities();
    setCapabilities(detected);
  }, []);

  const setSurfaceOverride = useCallback((surfaceType: SurfaceType | null) => {
    if (typeof window === 'undefined') return;

    if (surfaceType === null) {
      localStorage.removeItem(SURFACE_OVERRIDE_KEY);
      setHasOverride(false);
      redetect();
    } else {
      localStorage.setItem(SURFACE_OVERRIDE_KEY, surfaceType);
      setHasOverride(true);
      setCapabilities(DEFAULT_CAPABILITIES[surfaceType]);
    }
  }, [redetect]);

  const clearSurfaceOverride = useCallback(() => {
    setSurfaceOverride(null);
  }, [setSurfaceOverride]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedOverride = localStorage.getItem(SURFACE_OVERRIDE_KEY) as SurfaceType | null;
    if (storedOverride && storedOverride in DEFAULT_CAPABILITIES) {
      setHasOverride(true);
      setCapabilities(DEFAULT_CAPABILITIES[storedOverride]);
    } else {
      redetect();
    }
  }, [redetect]);

  const value = useMemo(
    () => ({
      capabilities,
      setSurfaceOverride,
      clearSurfaceOverride,
      hasOverride,
      redetect,
    }),
    [capabilities, setSurfaceOverride, clearSurfaceOverride, hasOverride, redetect]
  );

  return (
    <SurfaceContext.Provider value={value}>
      {children}
    </SurfaceContext.Provider>
  );
};

export const useSurface = (): SurfaceContextValue => {
  const context = useContext(SurfaceContext);
  if (!context) {
    throw new Error('useSurface must be used within SurfaceProvider');
  }
  return context;
};

export default SurfaceProvider;
