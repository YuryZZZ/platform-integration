import { useEffect } from 'react';
import './Notification.css';

interface NotificationProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  autoClose?: number;
}

export function Notification({ type = 'info', title, message, icon, onClose, autoClose }: NotificationProps) {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className={`notification notification--${type}`} role="alert">
      {icon && <span className="notification__icon">{icon}</span>}
      <div className="notification__content">
        <div className="notification__title">{title}</div>
        {message && <div className="notification__message">{message}</div>}
      </div>
      {onClose && <button className="notification__close" onClick={onClose}>&times;</button>}
    </div>
  );
}
