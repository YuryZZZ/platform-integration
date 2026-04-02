// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { detectSurfaceCapabilities } from './detector'
import { SurfaceType } from './types'

describe('detector', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('detectSurfaceCapabilities', () => {
    it('should return desktop capabilities on server side', () => {
      const result = detectSurfaceCapabilities()
      expect(result.surfaceType).toBeDefined()
    })

    it('should detect hover capability', () => {
      // Mock window.matchMedia
      const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(hover: hover)',
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }))
      
      Object.defineProperty(window, 'matchMedia', {
        value: matchMediaMock,
      })

      const result = detectSurfaceCapabilities()
      expect(typeof result.supportsHover).toBe('boolean')
    })

    it('should detect touch capability', () => {
      Object.defineProperty(navigator, 'maxTouchPoints', {
        value: 5,
        configurable: true,
      })

      const result = detectSurfaceCapabilities()
      expect(typeof result.supportsTouch).toBe('boolean')
    })

    it('should return valid surface type', () => {
      const result = detectSurfaceCapabilities()
      expect(['SMARTPHONE', 'TABLET', 'DESKTOP', 'CINEMATIC']).toContain(result.surfaceType)
    })

    it('should return valid motion intensity', () => {
      const result = detectSurfaceCapabilities()
      expect(['full', 'reduced', 'minimal', 'none']).toContain(result.motionIntensity)
    })
  })
})
