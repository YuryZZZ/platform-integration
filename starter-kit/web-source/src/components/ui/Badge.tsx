import React from 'react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  dot = false, 
  className = '' 
}: BadgeProps) {
  return (
    <span 
      className={`badge badge--${variant} badge--${size} ${dot ? 'badge--dot' : ''} ${className}`.trim()}
      role="status"
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </span>
  );
}
