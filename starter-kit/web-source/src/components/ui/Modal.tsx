'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { focusManager } from '@/lib/navigation/focus-manager'
import { useAnnounce } from '@/hooks/useAnnounce'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const { announce } = useAnnounce()

  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocus.current = document.activeElement as HTMLElement

      // Trap focus in modal
      if (modalRef.current) {
        focusManager.trapFocus(modalRef.current)
      }

      // Announce to screen readers
      announce(`Dialog opened: ${title || 'Modal dialog'}`)

      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      return () => {
        focusManager.releaseTrap()
        document.body.style.overflow = ''

        // Restore focus
        if (previousFocus.current) {
          previousFocus.current.focus()
        }

        announce('Dialog closed')
      }
    }
  }, [isOpen, title, announce])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className={`modal modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header className="modal-header">
            <h2 id="modal-title" className="modal-title">{title}</h2>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close dialog"
            >
              ×
            </button>
          </header>
        )}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}
