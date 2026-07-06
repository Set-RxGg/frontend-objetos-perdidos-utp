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
        'w-full rounded-md border border-gray-300 px-3 py-2 transition outline-none',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
