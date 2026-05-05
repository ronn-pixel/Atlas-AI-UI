import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  className?: string;
  minimal?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  className,
  minimal = false
}: PaginationProps) {
  const pageSizes = [10, 20, 50, 100];

  if (minimal) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-white dark:bg-slate-950 border border-border-subtle dark:border-white/10 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
        >
          {pageSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        
        <div className="flex items-center gap-1 bg-white dark:bg-slate-950 p-0.5 rounded-xl border border-border-subtle dark:border-white/5">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="px-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{currentPage} / {Math.max(1, totalPages)}</span>
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-2 py-2 px-4 bg-card-bg border-t border-border-subtle", className)}>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-text-muted">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-bg-app border border-border-subtle rounded px-1.5 py-0.5 outline-none focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer"
          >
            {pageSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span>records</span>
        </div>
        <div className="hidden sm:block w-px h-3 bg-border-subtle mx-1" />
        <span>Total: <span className="text-text-primary">{totalRecords}</span></span>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded border border-border-subtle bg-card-bg text-text-muted hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="First Page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded border border-border-subtle bg-card-bg text-text-muted hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-1.5 bg-bg-app border border-border-subtle rounded text-[13px] font-black uppercase tracking-widest text-text-muted mx-2">
          Page <span className="text-text-primary">{currentPage}</span> / <span className="text-text-primary">{totalPages}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded border border-border-subtle bg-card-bg text-text-muted hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded border border-border-subtle bg-card-bg text-text-muted hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Last Page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
