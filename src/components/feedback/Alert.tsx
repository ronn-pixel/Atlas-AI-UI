import * as React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert = ({ variant = 'info', title, children, className }: AlertProps) => {
  const variants = {
    info: 'bg-trust/5 text-trust border-trust/20',
    success: 'bg-success/5 text-success border-success/20',
    warning: 'bg-warning/5 text-warning border-warning/20',
    danger: 'bg-danger/5 text-danger border-danger/20',
  };

  const icons = {
    info: <Info className="w-4 h-4" />,
    success: <CheckCircle2 className="w-4 h-4" />,
    warning: <AlertCircle className="w-4 h-4" />,
    danger: <XCircle className="w-4 h-4" />,
  };

  return (
    <div className={cn('p-4 rounded-lg border flex gap-3', variants[variant], className)}>
      <div className="mt-0.5">{icons[variant]}</div>
      <div>
        {title && <h5 className="font-bold text-sm mb-1">{title}</h5>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
};
