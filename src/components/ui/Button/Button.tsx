import { forwardRef } from 'react';

import { cn } from '@/lib/cn';

import { ButtonProps } from './button.types';
import { buttonVariants } from './button.variants';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading = false, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          className,
        )}
        {...props}
      >
        {loading ? 'Cargando...' : children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
