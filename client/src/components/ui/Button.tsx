import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
const variantStyles: Record<Variant, string> = {
  primary: [
    'bg-accent text-white font-medium',
    'hover:bg-accent-hover',
    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'shadow-glow-sm hover:shadow-glow',
    'active:scale-[0.98]',
  ].join(' '),
  secondary: [
    'bg-surface-overlay border border-border-strong text-text-primary font-medium',
    'hover:bg-surface-raised hover:border-border-strong/80',
    'focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
    'active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-secondary',
    'hover:bg-surface-overlay hover:text-text-primary',
    'focus-visible:ring-2 focus-visible:ring-accent/50',
    'active:scale-[0.98]',
  ].join(' '),
  danger: [
    'bg-danger/10 border border-danger/20 text-danger font-medium',
    'hover:bg-danger/20 hover:border-danger/40',
    'focus-visible:ring-2 focus-visible:ring-danger/50',
    'active:scale-[0.98]',
  ].join(' '),
};
const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-6 text-base gap-2.5 rounded-lg',
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center',
          'font-medium transition-all duration-150',
          'disabled:opacity-50 disabled:pointer-events-none',
          'select-none outline-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = 'Button';