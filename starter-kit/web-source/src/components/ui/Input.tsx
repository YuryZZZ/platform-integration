import { forwardRef, InputHTMLAttributes } from 'react'
import { Focusable } from '@/components/navigation/Focusable'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    fullWidth = false,
    id,
    className = '',
    ...props
  },
  ref
) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = error ? `${inputId}-error` : undefined
  const hintId = hint ? `${inputId}-hint` : undefined

  const classes = [
    'input-wrapper',
    error ? 'input-error' : '',
    fullWidth ? 'input-full' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div className="input-container">
        {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}
        <Focusable focusId={inputId}>
          <input
            ref={ref}
            id={inputId}
            className="input-field"
            aria-invalid={!!error}
            aria-describedby={errorId || hintId}
            {...props}
          />
        </Focusable>
        {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
      </div>
      {error && (
        <p id={errorId} className="input-message input-message-error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="input-message input-message-hint">
          {hint}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
