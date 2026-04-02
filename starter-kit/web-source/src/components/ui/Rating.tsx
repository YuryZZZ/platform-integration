import { useState } from 'react';
import './Rating.css';

interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Rating({
  value = 0,
  max = 5,
  onChange,
  readonly = false,
  size = 'md'
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  const handleClick = (index: number) => {
    if (!readonly && onChange) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverValue(index + 1);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!readonly && onChange) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onChange(index + 1);
      }
    }
  };

  return (
    <div
      className={`rating rating--${size}`}
      role="slider"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`Rating: ${value} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          className={`rating__star ${i < displayValue ? 'rating__star--filled' : ''}`}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onKeyDown={(e) => handleKeyDown(e, i)}
          disabled={readonly}
          aria-label={`${i + 1} star${i === 0 ? '' : 's'}`}
        >
          {i < displayValue ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}
