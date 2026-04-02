/**
 * SkipLink Component
 * WCAG 2.1 AA compliant skip navigation link
 * Allows keyboard users to skip repetitive content
 */

import React, { useCallback, type KeyboardEvent } from 'react';
import './SkipLink.css';

export interface SkipLinkProps {
  /** ID of the main content element to skip to, default: 'main-content' */
  mainContentId?: string;
  /** Text for the skip link, default: 'Skip to main content' */
  skipText?: string;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * SkipLink Component
 * 
 * Visually hidden until focused, then appears at top of viewport.
 * Allows keyboard users to bypass navigation and jump to main content.
 * 
 * @example
 * // In your layout:
 * <SkipLink mainContentId="main-content" />
 * 
 * // Later in the page:
 * <main id="main-content" tabIndex={-1}>
 *   <!-- Main content here -->
 * </main>
 */
export function SkipLink({
  mainContentId = 'main-content',
  skipText = 'Skip to main content',
  className = '',
  'data-testid': testId = 'skip-link',
}: SkipLinkProps): React.ReactElement {
  
  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    
    const target = document.getElementById(mainContentId);
    
    if (target) {
      // Set tabindex if not already focusable
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      
      // Focus the target
      target.focus();
      
      // Scroll into view smoothly
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [mainContentId]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLAnchorElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event as unknown as React.MouseEvent<HTMLAnchorElement>);
    }
  }, [handleClick]);

  const combinedClassName = `skip-link ${className}`.trim();

  return (
    <a
      href={`#${mainContentId}`}
      className={combinedClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-testid={testId}
      // Accessibility attributes
      role="link"
    >
      {skipText}
    </a>
  );
}

/**
 * SkipLink with custom target variant
 * For skipping to specific sections other than main content
 */
export function SkipToSection({
  sectionId,
  linkText,
  ...props
}: {
  sectionId: string;
  linkText: string;
} & Omit<SkipLinkProps, 'mainContentId' | 'skipText'>): React.ReactElement {
  return (
    <SkipLink
      mainContentId={sectionId}
      skipText={linkText}
      {...props}
    />
  );
}

export default SkipLink;
