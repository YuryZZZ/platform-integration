// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import { findNearestFocusable, getAllFocusables, Direction } from './spatial-nav'

describe('spatial-nav', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('getAllFocusables', () => {
    it('should return empty array when no focusables exist', () => {
      const focusables = getAllFocusables()
      expect(focusables).toEqual([])
    })

    it('should return all focusable elements', () => {
      document.body.innerHTML = `
        <button data-focusable>Button 1</button>
        <button data-focusable>Button 2</button>
        <a href="#">Link</a>
      `
      const focusables = getAllFocusables()
      expect(focusables.length).toBe(3)
    })

    it('should exclude hidden elements', () => {
      document.body.innerHTML = `
        <button data-focusable>Visible</button>
        <button data-focusable style="display: none">Hidden</button>
      `
      const focusables = getAllFocusables()
      expect(focusables.length).toBe(1)
    })
  })

  describe('findNearestFocusable', () => {
    it('should return null when no focusables exist', () => {
      const element = document.createElement('button')
      const result = findNearestFocusable(element, 'right', [])
      expect(result).toBeNull()
    })

    it('should find nearest element in direction', () => {
      document.body.innerHTML = `
        <button id="current" style="position: absolute; left: 0; top: 0;">Current</button>
        <button id="right" style="position: absolute; left: 100px; top: 0;">Right</button>
        <button id="down" style="position: absolute; left: 0; top: 100px;">Down</button>
      `
      const current = document.getElementById('current')!
      const right = document.getElementById('right')!
      const down = document.getElementById('down')!
      const focusables = [current, right, down]

      const resultRight = findNearestFocusable(current, 'right' as Direction, focusables)
      expect(resultRight).toBe(right)

      const resultDown = findNearestFocusable(current, 'down' as Direction, focusables)
      expect(resultDown).toBe(down)
    })
  })
})
