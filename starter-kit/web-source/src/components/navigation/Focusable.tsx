import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export interface FocusableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onFocus' | 'onBlur'> {
  children: React.ReactNode;
  focusId?: string;
  focusGroup?: string;
  onFocus?: (element: HTMLElement) => void;
  onBlur?: (element: HTMLElement) => void;
  focusable?: boolean;
}

export interface FocusableHandle {
  focus: () => void;
  getElement: () => HTMLDivElement | null;
}

export const Focusable = forwardRef<FocusableHandle, FocusableProps>((props, ref) => {
  const {
    children,
    focusId,
    focusGroup,
    onFocus,
    onBlur,
    focusable = true,
    className = '',
    ...restProps
  } = props;

  const elementRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (elementRef.current) {
        elementRef.current.focus();
      }
    },
    getElement: () => elementRef.current,
  }));

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(e.currentTarget);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onBlur?.(e.currentTarget);
  };

  return (
    <div
      ref={elementRef}
      data-focusable={focusable}
      data-focus-id={focusId}
      data-focus-group={focusGroup}
      tabIndex={focusable ? 0 : -1}
      className={className}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...restProps}
    >
      {children}
    </div>
  );
});

Focusable.displayName = 'Focusable';

export default Focusable;
