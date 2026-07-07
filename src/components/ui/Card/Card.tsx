import { cn } from '@/lib/cn';

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-card border-card-border shadow-card border bg-white',
        className,
      )}
      {...props}
    />
  );
}
