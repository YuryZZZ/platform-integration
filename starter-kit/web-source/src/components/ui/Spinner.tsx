import * as React from 'react';
import './Spinner.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  label?: string;
  className?: string;
}

export function Spinner({
  size = 'md',
  color,
  label = 'Loading',
  className = '',
}: SpinnerProps): React.ReactElement {
  const style: React.CSSProperties = color ? { color } : {};

  return (
    <span
      className={`spinner spinner--${size} ${className}`.trim()}
      style={style}
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-testid="spinner"
    >
      <svg
        className="spinner__svg"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="spinner__circle"
          cx="25"
          cy="25"
          r="20"
        />
      </svg>
      <span className="spinner__label">{label}</span>
    </span>
  );
}

Spinner.displayName = 'Spinner';
