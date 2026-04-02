import React from 'react';
import './Divider.css';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export function Divider({ 
  orientation = 'horizontal', 
  variant = 'solid', 
  spacing = 'md', 
  label, 
  className 
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={`divider divider--vertical divider--${variant} divider--${spacing} ${className || ''}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <div
      className={`divider divider--horizontal divider--${variant} divider--${spacing} ${label ? 'divider--with-label' : ''} ${className || ''}`}
      role="separator"
      aria-orientation="horizontal"
    >
      {label && <span className="divider__label">{label}</span>}
    </div>
  );
}
