import type { PresenceUser } from '@/types';
import { cn } from '@/lib/utils';

interface PresenceAvatarsProps {
  users: PresenceUser[];
}

export function PresenceAvatars({ users }: PresenceAvatarsProps) {
  if (users.length === 0) return null;

  const MAX_VISIBLE = 4;
  const visible = users.slice(0, MAX_VISIBLE);
  const overflow = users.length - MAX_VISIBLE;

  return (
    <div className="flex items-center gap-2" role="list" aria-label="Collaborators">
      <div className="flex -space-x-2">
        {visible.map((user) => (
          <div
            key={user.clientId}
            role="listitem"
            title={user.name}
            className={cn(
              'w-7 h-7 rounded-full',
              'flex items-center justify-center',
              'text-[10px] font-bold text-white',
              'border-2 border-bg',
              'cursor-default select-none',
              'transition-transform duration-150 hover:scale-110 hover:z-10'
            )}
            style={{ backgroundColor: user.color }}
          >
            {user.initials}
          </div>
        ))}

        {overflow > 0 && (
          <div
            title={`${overflow} more collaborator${overflow !== 1 ? 's' : ''}`}
            className={cn(
              'w-7 h-7 rounded-full',
              'border-2 border-bg',
              'bg-surface-overlay',
              'flex items-center justify-center',
              'text-[10px] font-semibold text-text-secondary',
              'cursor-default'
            )}
          >
            +{overflow}
          </div>
        )}
      </div>

      <span className="text-xs text-text-muted">
        {users.length === 1 ? '1 other editing' : `${users.length} others editing`}
      </span>
    </div>
  );
}