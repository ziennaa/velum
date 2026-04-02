import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-surface-overlay',
        className
      )}
    />
  );
}

export function DocumentCardSkeleton() {
  return (
    <div className="p-5 rounded-xl bg-surface border border-border animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-5 w-40 rounded" />
        <Skeleton className="h-7 w-7 rounded-lg" />
      </div>
      <Skeleton className="h-3 w-24 rounded mb-2" />
      <Skeleton className="h-3 w-32 rounded" />
    </div>
  );
}