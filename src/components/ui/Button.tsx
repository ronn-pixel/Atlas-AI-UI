import * as React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'primaryAction';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'primaryAction';
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
      primaryAction: 'bg-accent hover:opacity-90 text-white shadow-xl shadow-accent/20 border-none transform active:scale-95',
    };

    const sizes = {
      sm: 'h-8 px-4 text-[11px] font-bold uppercase tracking-wider',
      md: 'h-9 px-4 text-xs font-bold',
      lg: 'h-11 px-8 text-sm font-bold',
      icon: 'h-9 w-9 p-0',
      primaryAction: 'h-14 w-[280px] min-w-[280px] max-w-[280px] px-0 inline-flex items-center justify-center text-[11px] font-black uppercase tracking-[0.4em]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-trust disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variant === 'primaryAction' && 'rounded-2xl gap-3 shrink-0',
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
