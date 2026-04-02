import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import type { ConnectionStatus } from '@/types';
import { cn } from '@/lib/utils';

interface CollaborationStatusProps {
  status: ConnectionStatus;
  saveStatus: 'saved' | 'saving' | 'unsaved';
}

export function CollaborationStatus({ status, saveStatus }: CollaborationStatusProps) {
  const connectionConfig = {
    connected: {
      icon: <Wifi size={12} />,
      label: 'Live',
      className: 'text-success',
      dotClass: 'bg-success animate-pulse',
    },
    connecting: {
      icon: <RefreshCw size={12} className="animate-spin" />,
      label: 'Connecting',
      className: 'text-warning',
      dotClass: 'bg-warning',
    },
    reconnecting: {
      icon: <RefreshCw size={12} className="animate-spin" />,
      label: 'Reconnecting',
      className: 'text-warning',
      dotClass: 'bg-warning animate-pulse',
    },
    disconnected: {
      icon: <WifiOff size={12} />,
      label: 'Offline',
      className: 'text-danger',
      dotClass: 'bg-danger',
    },
  }[status];

  const saveConfig = {
    saved: { label: 'Saved', className: 'text-text-muted' },
    saving: { label: 'Saving…', className: 'text-text-muted' },
    unsaved: { label: 'Unsaved changes', className: 'text-warning' },
  }[saveStatus];

  return (
    <div className="flex items-center gap-3">
      {}
      <span className={cn('text-xs transition-colors duration-300', saveConfig.className)}>
        {saveConfig.label}
      </span>

      {}
      <div className="w-px h-3.5 bg-border" />

      {}
      <div className={cn('flex items-center gap-1.5 text-xs', connectionConfig.className)}>
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', connectionConfig.dotClass)} />
        {connectionConfig.label}
      </div>
    </div>
  );
}