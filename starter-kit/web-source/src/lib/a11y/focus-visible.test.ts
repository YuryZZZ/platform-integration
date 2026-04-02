// @ts-nocheck
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { initFocusVisible, isFocusVisible, focusVisiblePolyfill } from './focus-visible'

describe('focus-visible', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('initFocusVisible', () => {
    it('should initialize without errors', () => {
      expect(() => initFocusVisible()).not.toThrow()
    })

    it('should be safe to call multiple times', () => {
      initFocusVisible()
      expect(() => initFocusVisible()).not.toThrow()
    })
  })

  describe('isFocusVisible', () => {
    it('should return a boolean', () => {
      const result = isFocusVisible()
      expect(typeof result).toBe('boolean')
    })
  })

  describe('focusVisiblePolyfill', () => {
    it('should add event listeners', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener')
      focusVisiblePolyfill()
      expect(addEventListenerSpy).toHaveBeenCalled()
    })
  })
})
