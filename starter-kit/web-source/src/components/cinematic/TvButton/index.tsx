import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tvButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-lg font-medium',
    'min-w-[64px] min-h-[64px]',
    'transition-colors focus:outline-none',
    'focus-visible:ring-4 focus-visible:ring-offset-4',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-2 border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-16 px-6 py-3 text-base',
        lg: 'h-20 px-8 py-4 text-lg',
        icon: 'h-16 w-16',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface TvButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof tvButtonVariants> {
  tvId?: string;
}

const TvButton = React.forwardRef<HTMLButtonElement, TvButtonProps>(
  ({ className, variant, size, tvId, ...props }, ref) => (
    <button 
      className={cn(tvButtonVariants({ variant, size, className }))} 
      ref={ref} 
      data-tv-id={tvId} 
      {...props} 
    />
  )
);

TvButton.displayName = 'TvButton';

export { TvButton, tvButtonVariants };
