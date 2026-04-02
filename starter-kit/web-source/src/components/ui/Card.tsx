import { forwardRef, HTMLAttributes } from 'react'
import { Focusable } from '@/components/navigation/Focusable'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>((
  {
    variant = 'default',
    padding = 'md',
    interactive = false,
    children,
    className = '',
    ...props
  },
  ref
) => {
  const classes = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    interactive ? 'card-interactive' : '',
    className
  ].filter(Boolean).join(' ')

  if (interactive) {
    return (
      <Focusable focusId={props.id}>
        <div ref={ref} className={classes} role="button" tabIndex={0} {...props}>
          {children}
        </div>
      </Focusable>
    )
  }

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>((
  { children, className = '', ...props },
  ref
) => (
  <div ref={ref} className={`card-header ${className}`} {...props}>
    {children}
  </div>
))

CardHeader.displayName = 'CardHeader'

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>((
  { children, className = '', ...props },
  ref
) => (
  <div ref={ref} className={`card-body ${className}`} {...props}>
    {children}
  </div>
))

CardBody.displayName = 'CardBody'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>((
  { children, className = '', ...props },
  ref
) => (
  <div ref={ref} className={`card-footer ${className}`} {...props}>
    {children}
  </div>
))

CardFooter.displayName = 'CardFooter'

// Alias: CardContent = CardBody (some patterns use CardContent)
export const CardContent = CardBody;
CardContent.displayName = 'CardContent';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>((
  { children, className = '', ...props },
  ref
) => (
  <h3 ref={ref} className={`card-title ${className}`} {...props}>
    {children}
  </h3>
))

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>((
  { children, className = '', ...props },
  ref
) => (
  <p ref={ref} className={`card-description ${className}`} {...props}>
    {children}
  </p>
))

CardDescription.displayName = 'CardDescription'

