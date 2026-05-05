import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Loader = ({ className, size = 'md' }: { className?: string, size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <Loader2 className={cn('text-primary animate-spin', sizes[size])} />
    </div>
  );
};
