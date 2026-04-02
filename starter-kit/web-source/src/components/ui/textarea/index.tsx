import * as React from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error message to display */
  error?: string
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  /** Label text */
  label?: string
  /** Hint text */
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', resize = 'vertical', rows = 4, error, label, hint, id, ...props }, ref) => {
    const generatedId = React.useId()
    const fieldId = id || generatedId
    const errorId = error ? `${fieldId}-error` : undefined
    const hintId = hint ? `${fieldId}-hint` : undefined

    const resizeClass = `textarea-resize-${resize}`
    const stateClass = error ? 'textarea-error' : ''
    const classes = ['textarea', resizeClass, stateClass, className].filter(Boolean).join(' ')

    return (
      <div className="textarea-wrapper">
        {label && (
          <label htmlFor={fieldId} className="textarea-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          className={classes}
          rows={rows}
          aria-invalid={!!error}
          aria-errormessage={errorId}
          aria-describedby={hintId}
          {...props}
        />
        {hint && !error && (
          <p id={hintId} className="textarea-hint">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="textarea-error-message" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
