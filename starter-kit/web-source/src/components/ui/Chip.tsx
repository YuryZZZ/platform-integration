import React from 'react';
import './Chip.css';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  onDelete?: () => void;
  icon?: React.ReactNode;
  clickable?: boolean;
  onClick?: () => void;
}

export function Chip({ 
  children, 
  variant = 'default', 
  size = 'md', 
  onDelete, 
  icon, 
  clickable, 
  onClick 
}: ChipProps) {
  const Component = clickable ? 'button' : 'div';
  
  return (
    <Component
      className={`chip chip--${variant} chip--${size} ${clickable ? 'chip--clickable' : ''} ${onDelete ? 'chip--deletable' : ''}`}
      onClick={clickable ? onClick : undefined}
      type={clickable ? 'button' : undefined}
    >
      {icon && <span className="chip__icon">{icon}</span>}
      <span className="chip__label">{children}</span>
      {onDelete && (
        <button 
          className="chip__delete" 
          onClick={(e) => { e.stopPropagation(); onDelete(); }} 
          aria-label="Delete"
          type="button"
        >
          ×
        </button>
      )}
    </Component>
  );
}
