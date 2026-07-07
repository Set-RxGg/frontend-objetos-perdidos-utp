'use client';

import { cn } from '@/lib/cn';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Readonly<PaginationProps>) {
  if (totalPages <= 1) return null;

  const pages: (number | 'ellipsis')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="text-text-secondary hover:bg-background-muted hover:text-text-primary flex h-9 w-9 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-30"
      >
        <HiOutlineChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} className="text-text-muted px-2">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition',
              p === currentPage
                ? 'bg-primary-500 text-white'
                : 'text-text-secondary hover:bg-background-muted hover:text-text-primary',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="text-text-secondary hover:bg-background-muted hover:text-text-primary flex h-9 w-9 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-30"
      >
        <HiOutlineChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
