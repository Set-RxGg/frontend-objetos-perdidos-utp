'use client';

import Link from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi2';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: Readonly<BreadcrumbsProps>) {
  return (
    <nav className="text-text-muted flex items-center gap-1.5 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <HiOutlineChevronRight className="h-3 w-3" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-text-secondary transition"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-text-primary font-medium' : ''}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
