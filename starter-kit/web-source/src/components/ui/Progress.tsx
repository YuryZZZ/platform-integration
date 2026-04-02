interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'default' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function Progress({ value, max = 100, variant = 'default', size = 'md', showValue, className }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`progress progress--${variant} progress--${size} ${className || ''}`}>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="progress__value">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
