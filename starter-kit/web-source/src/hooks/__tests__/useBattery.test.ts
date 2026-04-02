// @ts-nocheck
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBattery } from '../useBattery';

describe('useBattery', () => {
  const originalGetBattery = navigator.getBattery;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    Object.defineProperty(navigator, 'getBattery', {
      value: originalGetBattery,
      writable: true,
      configurable: true,
    });
  });

  it('returns default values when navigator.getBattery is not available', () => {
    // @ts-expect-error - testing undefined case
    delete navigator.getBattery;
    
    const { result } = renderHook(() => useBattery());
    expect(result.current.isSupported).toBe(false);
    expect(result.current.level).toBe(1);
    expect(result.current.charging).toBe(true);
  });

  it('returns isSupported true when battery API is available', async () => {
    Object.defineProperty(navigator, 'getBattery', {
      value: vi.fn().mockResolvedValue({
        level: 0.75,
        charging: false,
        chargingTime: Infinity,
        dischargingTime: Infinity,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useBattery());
    
    await waitFor(() => {
      expect(result.current.isSupported).toBe(true);
    });
  });

  it('has correct default level and charging state', () => {
    // @ts-expect-error - testing undefined case
    delete navigator.getBattery;
    
    const { result } = renderHook(() => useBattery());
    expect(result.current.level).toBe(1);
    expect(result.current.charging).toBe(true);
    expect(result.current.chargingTime).toBe(0);
    expect(result.current.dischargingTime).toBe(Infinity);
  });
});
