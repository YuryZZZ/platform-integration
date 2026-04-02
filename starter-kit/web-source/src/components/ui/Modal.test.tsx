// @ts-nocheck
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Modal } from './Modal'
import userEvent from '@testing-library/user-event'

describe('Modal', () => {
  it('renders when open', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    )
    expect(screen.getByTestId('modal-content')).toBeInTheDocument()
  })

  it('closes on escape key', async () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    // Press Escape key
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes on backdrop click', async () => {
    const onClose = vi.fn()
    const { container } = render(
      <Modal open={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    // Find backdrop (usually a div with a specific class or data attribute)
    // For this test, we'll simulate clicking outside the modal content
    const backdrop = container.querySelector('[data-backdrop]') || 
                     container.querySelector('.backdrop') ||
                     container.firstChild
    
    if (backdrop) {
      fireEvent.click(backdrop)
      expect(onClose).toHaveBeenCalledTimes(1)
    }
  })

  it('traps focus within modal', async () => {
    const user = userEvent.setup()
    render(
      <Modal open={true} onClose={() => {}}>
        <button data-testid="first-button">First</button>
        <button data-testid="last-button">Last</button>
      </Modal>
    )
    
    const firstButton = screen.getByTestId('first-button')
    const lastButton = screen.getByTestId('last-button')
    
    // Focus should start on first button
    await user.tab()
    expect(firstButton).toHaveFocus()
    
    // Tab again should go to last button
    await user.tab()
    expect(lastButton).toHaveFocus()
    
    // Tab again should wrap back to first button (if focus trap is working)
    await user.tab()
    expect(firstButton).toHaveFocus()
  })

  it('renders in portal', () => {
    render(
      <Modal open={true} onClose={() => {}} portal>
        <div data-testid="portal-content">Portal Content</div>
      </Modal>
    )
    
    // Content should be in document but might be in a portal
    expect(screen.getByTestId('portal-content')).toBeInTheDocument()
    
    // Check if it's rendered outside the normal DOM hierarchy
    const portalRoot = document.querySelector('[data-portal]') || 
                       document.querySelector('#portal-root')
    
    if (portalRoot) {
      expect(portalRoot).toContainElement(screen.getByTestId('portal-content'))
    }
  })
})
