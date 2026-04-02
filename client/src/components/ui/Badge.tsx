import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'accent';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-surface-overlay border-border text-text-secondary',
  success: 'bg-success/10 border-success/20 text-success',
  warning: 'bg-warning/10 border-warning/20 text-warning',
  danger: 'bg-danger/10 border-danger/20 text-danger',
  accent: 'bg-accent-muted border-accent/20 text-accent-hover',
};

const dotStyles: Record<BadgeVariant, string> = {
  default: 'bg-text-muted',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  accent: 'bg-accent',
};

export function Badge({
  variant = 'default',
  children,
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'text-2xs font-medium uppercase tracking-wider',
        'px-2 py-0.5 rounded-full border',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotStyles[variant])}
        />
      )}
      {children}
    </span>
  );
}