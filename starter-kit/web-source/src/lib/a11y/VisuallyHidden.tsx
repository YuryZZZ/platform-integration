/**
 * VisuallyHidden Component
 * Hides content visually while keeping it accessible to screen readers
 */

import React, { forwardRef, ElementType, ComponentPropsWithRef } from 'react';

export interface VisuallyHiddenProps<E extends ElementType = 'span'> {
  /** Content to hide visually */
  children: React.ReactNode;
  /** Element type to render as */
  as?: E;
  /** Whether the content should become visible when focused */
  focusable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

type Props<E extends ElementType> = VisuallyHiddenProps<E> & 
  Omit<ComponentPropsWithRef<E>, keyof VisuallyHiddenProps<E>>;

// Base visually hidden styles
const hiddenStyles: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
};

// Styles for focusable visually hidden content (skip links)
const focusableStyles: React.CSSProperties = {
  ...hiddenStyles,
  // Reset styles on focus
};

/**
 * VisuallyHidden component
 * Hides content visually while keeping it accessible to screen readers
 * Use focusable=true for skip links that should appear on focus
 */
export const VisuallyHidden = forwardRef<HTMLElement, Props<ElementType>>(
  ({ children, as, focusable = false, className, style, ...restProps }, ref) => {
    const Component = as || 'span';

    const combinedStyles: React.CSSProperties = {
      ...hiddenStyles,
      ...(focusable ? focusableStyles : {}),
      ...style,
    };

    // For focusable variant, we need special focus styles
    const focusClassName = focusable
      ? `visually-hidden-focusable ${className || ''}`.trim()
      : className;

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={focusClassName}
        style={combinedStyles}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;
