import * as React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padded = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded border border-subtle bg-card-app shadow-sm overflow-hidden',
        padded && 'p-4',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';
