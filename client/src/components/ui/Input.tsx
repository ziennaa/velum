import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-text-secondary uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-9 rounded-lg',
              'bg-surface-overlay border border-border',
              'text-text-primary text-sm',
              'placeholder:text-text-muted',
              'transition-all duration-150',
              'outline-none',
              'hover:border-border-strong',
              'focus:border-accent/60 focus:ring-2 focus:ring-accent/15',
              leftIcon ? 'pl-9 pr-3' : 'px-3',
              error && 'border-danger/50 focus:border-danger/70 focus:ring-danger/10',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-danger">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';