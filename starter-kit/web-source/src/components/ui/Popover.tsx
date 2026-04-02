import React, { useState, useRef, useEffect } from 'react';
import './Popover.css';

export interface PopoverProps {
  content: React.ReactNode;
  trigger?: 'click' | 'hover';
  position?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

export function Popover({ content, trigger = 'click', position = 'top', children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      triggerRef.current && 
      !triggerRef.current.contains(event.target as Node) &&
      popoverRef.current && 
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (trigger === 'click' && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [trigger, isOpen]);

  const events = trigger === 'hover' 
    ? { 
        onMouseEnter: () => setIsOpen(true), 
        onMouseLeave: () => setIsOpen(false) 
      }
    : { 
        onClick: () => setIsOpen(!isOpen) 
      };

  return (
    <div className="popover-wrapper" ref={triggerRef} {...events}>
      {children}
      {isOpen && (
        <div 
          ref={popoverRef}
          className={`popover popover--${position}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
