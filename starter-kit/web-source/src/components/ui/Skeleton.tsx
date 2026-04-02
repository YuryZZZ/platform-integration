import * as React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  width?: string;
  height?: string;
  variant?: 'text' | 'rect' | 'circle';
  className?: string;
  animation?: 'pulse' | 'shimmer' | 'none';
}

export function Skeleton({
  width,
  height,
  variant = 'rect',
  className = '',
  animation = 'pulse',
}: SkeletonProps): React.ReactElement {
  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  const animationClass = animation === 'none' ? '' : `skeleton--${animation}`;
  const variantClass = `skeleton--${variant}`;

  return (
    <span
      className={`skeleton ${variantClass} ${animationClass} ${className}`.trim()}
      style={style}
      aria-hidden="true"
      data-testid="skeleton"
    />
  );
}

Skeleton.displayName = 'Skeleton';
