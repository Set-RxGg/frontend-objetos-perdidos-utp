import { forwardRef } from 'react';

import { cn } from '@/lib/cn';

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'rounded-input border-border w-full border px-3 py-2 transition outline-none',
        'focus:border-primary-500 focus:ring-primary-200 focus:ring-2',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
