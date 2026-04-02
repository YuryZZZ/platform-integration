import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { useSpatialNav } from '../../../hooks/useSpatialNav';
import './TvCard.css';

export type TvCardAspectRatio = '16-9' | '4-3' | '1-1' | 'portrait';
export type TvCardSize = 'small' | 'medium' | 'large';

export interface TvCardProps {
  /** Unique identifier for spatial navigation */
  id: string;
  /** Card title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional image URL */
  imageUrl?: string;
  /** Aspect ratio for the card */
  aspectRatio?: TvCardAspectRatio;
  /** Size variant */
  size?: TvCardSize;
  /** Whether the card is selected */
  selected?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Callback when card is selected/activated */
  onSelect?: () => void;
  /** Callback when card receives focus */
  onFocus?: () => void;
  /** Additional content (description, metadata, etc.) */
  children?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface TvCardRef {
  /** Programmatically focus the card */
  focus: () => void;
  /** Programmatically blur the card */
  blur: () => void;
}

const SIZE_MAP: Record<TvCardSize, number> = {
  small: 160,
  medium: 240,
  large: 320,
};

const ASPECT_RATIO_MAP: Record<TvCardAspectRatio, number> = {
  '16-9': 9 / 16,
  '4-3': 3 / 4,
  '1-1': 1,
  'portrait': 1.5,
};

export const TvCard = forwardRef<TvCardRef, TvCardProps>(({
  id,
  title,
  subtitle,
  imageUrl,
  aspectRatio = '16-9',
  size = 'medium',
  selected = false,
  disabled = false,
  onSelect,
  onFocus,
  children,
  className = '',
}, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const width = SIZE_MAP[size];
  const height = width * ASPECT_RATIO_MAP[aspectRatio];
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      cardRef.current?.focus();
      handleFocus();
    },
    blur: () => {
      cardRef.current?.blur();
      handleBlur();
    },
  }));

  const handleClick = useCallback(() => {
    if (!disabled && onSelect) {
      onSelect();
    }
  }, [disabled, onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  const classNames = [
    'tv-card',
    `tv-card--${size}`,
    `tv-card--${aspectRatio}`,
    isFocused && 'tv-card--focused',
    selected && 'tv-card--selected',
    disabled && 'tv-card--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={cardRef}
      className={classNames}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={title}
      aria-selected={selected}
      aria-disabled={disabled}
      data-testid={`tv-card-${id}`}
    >
      {imageUrl && (
        <div className="tv-card__image-container">
          <img
            src={imageUrl}
            alt={title}
            className="tv-card__image"
            loading="lazy"
          />
          <div className="tv-card__image-overlay" />
        </div>
      )}
      <div className="tv-card__content">
        <h3 className="tv-card__title">{title}</h3>
        {subtitle && <p className="tv-card__subtitle">{subtitle}</p>}
        {children && <div className="tv-card__children">{children}</div>}
      </div>
      {selected && (
        <div className="tv-card__selected-indicator" aria-hidden="true" />
      )}
    </div>
  );
});

TvCard.displayName = 'TvCard';

export default TvCard;
