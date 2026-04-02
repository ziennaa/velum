import type { PresenceUser } from '@/types';
import { cn } from '@/lib/utils';

interface PresenceAvatarsProps {
  users: PresenceUser[];
  currentUserId?: number;
}

export function PresenceAvatars({ users, currentUserId }: PresenceAvatarsProps) {
  if (users.length === 0) return null;
  const MAX_VISIBLE = 5;
  const visibleUsers = users.slice(0, MAX_VISIBLE);
  const overflowCount = users.length - MAX_VISIBLE;

  return (
    <div className="flex items-center" role="list" aria-label="Active collaborators">
      <div className="flex -space-x-2">
        {visibleUsers.map((user) => (
          <div
            key={user.clientId}
            role="listitem"
            title={user.name}
            className={cn(
              'relative w-7 h-7 rounded-full',
              'border-2 flex items-center justify-center',
              'text-[10px] font-bold text-white',
              'cursor-default select-none',
              'transition-transform hover:z-10 hover:scale-110',
              'ring-1 ring-black/20',
              currentUserId === user.clientId && 'ring-2 ring-white/30'
            )}
            style={{
              backgroundColor: user.color,
              borderColor: user.color,
            }}
          >
            {user.initials}
          </div>
        ))}

        {overflowCount > 0 && (
          <div
            className={cn(
              'w-7 h-7 rounded-full',
              'border-2 border-border-strong',
              'bg-surface-overlay',
              'flex items-center justify-center',
              'text-[10px] font-semibold text-text-secondary'
            )}
          >
            +{overflowCount}
          </div>
        )}
      </div>

      {}
      <span className="ml-2.5 text-xs text-text-muted">
        {users.length === 1 ? 'Just you' : `${users.length} editing`}
      </span>
    </div>
  );
}