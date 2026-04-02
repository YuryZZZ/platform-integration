// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClipboard } from '../useClipboard';

describe('useClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue(''),
      },
    });
  });

  it('returns initial copied state as false', () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.current.copied).toBe(false);
  });

  it('sets copied to true after successful copy', async () => {
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      await result.current.copy('test text');
    });
    expect(result.current.copied).toBe(true);
  });

  it('calls navigator.clipboard.writeText', async () => {
    const { result } = renderHook(() => useClipboard());
    await act(async () => {
      await result.current.copy('test text');
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
  });

  it('resets copied state after timeout', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useClipboard(1000));
    await act(async () => {
      await result.current.copy('test');
    });
    expect(result.current.copied).toBe(true);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.copied).toBe(false);
    vi.useRealTimers();
  });
});
