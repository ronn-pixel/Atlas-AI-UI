import * as React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:opacity-90 shadow-sm',
      secondary: 'bg-trust text-white hover:opacity-90 shadow-sm',
      outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700',
      ghost: 'bg-transparent hover:bg-slate-50 text-text-muted hover:text-text-primary',
      danger: 'bg-danger text-white shadow-sm',
      success: 'bg-success text-white shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-4 text-[11px] font-bold uppercase tracking-wider',
      md: 'h-9 px-4 text-xs font-bold',
      lg: 'h-11 px-8 text-sm font-bold',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-trust disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
