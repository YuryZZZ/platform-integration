// @ts-nocheck
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSpatialNav } from './useSpatialNav'

describe('useSpatialNav', () => {
  it('should return currentFocus, moveFocus, and setFocus', () => {
    const { result } = renderHook(() => useSpatialNav())
    expect(result.current).toHaveProperty('currentFocus')
    expect(result.current).toHaveProperty('moveFocus')
    expect(result.current).toHaveProperty('setFocus')
  })

  it('should have moveFocus as a function', () => {
    const { result } = renderHook(() => useSpatialNav())
    expect(typeof result.current.moveFocus).toBe('function')
  })
})
