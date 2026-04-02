import React from 'react';
import './Drawer.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'full';
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ 
  isOpen, 
  onClose, 
  position = 'right', 
  size = 'md', 
  title, 
  children 
}: DrawerProps) {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="drawer__overlay" onClick={onClose} />
      <div 
        className={`drawer drawer--${position} drawer--${size}`} 
        role="dialog" 
        aria-modal="true"
      >
        <div className="drawer__header">
          {title && <h2 className="drawer__title">{title}</h2>}
          <button 
            className="drawer__close" 
            onClick={onClose} 
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="drawer__content">{children}</div>
      </div>
    </>
  );
}
