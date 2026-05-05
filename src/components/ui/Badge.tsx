import * as React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-slate-100 text-text-muted border-transparent',
      success: 'bg-[#D1FAE5] text-[#065F46] border-transparent',
      warning: 'bg-[#FEF3C7] text-[#92400E] border-transparent',
      danger: 'bg-danger/10 text-danger border-transparent',
      info: 'bg-[#DBEAFE] text-[#1E40AF] border-transparent',
      outline: 'border-border-subtle text-text-muted',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
