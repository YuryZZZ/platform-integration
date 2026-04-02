import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TvContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  overscanSafe?: boolean; // Apply 5% padding on all sides
  navigationActive?: boolean; // Enable TV navigation mode
}

const TvContainer = React.forwardRef<HTMLDivElement, TvContainerProps>(
  ({ className, overscanSafe = true, navigationActive = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative w-full h-full',
        overscanSafe && 'p-[5%]', // Overscan safe zone
        navigationActive && 'tv-navigation-active',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
TvContainer.displayName = 'TvContainer';
export { TvContainer };
