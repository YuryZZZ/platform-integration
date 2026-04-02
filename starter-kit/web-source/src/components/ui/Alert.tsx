import { useState } from 'react';
import './Alert.css';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({ 
  variant = 'info', 
  title, 
  children, 
  icon, 
  dismissible, 
  onDismiss, 
  className 
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={`alert alert--${variant} ${className || ''}`} role="alert">
      {icon && <div className="alert__icon">{icon}</div>}
      <div className="alert__content">
        {title && <h4 className="alert__title">{title}</h4>}
        <div className="alert__message">{children}</div>
      </div>
      {dismissible && (
        <button className="alert__dismiss" onClick={handleDismiss} aria-label="Dismiss">
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
}
