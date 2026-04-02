import React from 'react';

export interface ContentGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ContentGrid component
 * Provides a named CSS grid layout with full/feature/popout/content zones
 * Works without JavaScript - uses pure CSS grid
 */
export function ContentGrid({ children, className = '' }: ContentGridProps): React.ReactElement {
  const combinedClassName = `content-grid ${className}`.trim();
  
  return (
    <div className={combinedClassName} data-testid="content-grid">
      {children}
    </div>
  );
}

export default ContentGrid;
