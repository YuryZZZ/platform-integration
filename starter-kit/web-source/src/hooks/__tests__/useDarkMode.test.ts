// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from '../useDarkMode';

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear();
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('returns false by default', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDarkMode).toBe(false);
  });

  it('toggles dark mode', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isDarkMode).toBe(true);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => {
      result.current.toggle();
    });
    expect(localStorage.getItem('darkMode')).toBe('true');
  });

  it('can enable dark mode directly', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => {
      result.current.enable();
    });
    expect(result.current.isDarkMode).toBe(true);
  });

  it('can disable dark mode directly', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isDarkMode).toBe(true);
    act(() => {
      result.current.disable();
    });
    expect(result.current.isDarkMode).toBe(false);
  });
});
