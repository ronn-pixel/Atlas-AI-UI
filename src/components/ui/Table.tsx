import * as React from 'react';
import { cn } from '@/utils/cn';

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full border-collapse text-left text-sm', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

export const THead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('bg-slate-50 border-y border-subtle', className)} {...props} />
  )
);
THead.displayName = 'THead';

export const TBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-subtle', className)} {...props} />
  )
);
TBody.displayName = 'TBody';

export const TR = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'transition-colors hover:bg-bg-app/50 border-b border-subtle last:border-0',
        className
      )}
      {...props}
    />
  )
);
TR.displayName = 'TR';

export const TH = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-9 px-4 text-left align-middle font-bold text-text-muted uppercase text-[10px] tracking-widest',
        className
      )}
      {...props}
    />
  )
);
TH.displayName = 'TH';

export const TD = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle', className)} {...props} />
  )
);
TD.displayName = 'TD';
