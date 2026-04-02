import { useEffect } from 'react';
import { History, Clock, RotateCcw, X, ChevronRight } from 'lucide-react';
import type { Revision } from '@/types';
import { useRevisions } from '@/hooks/useRevisions';
import { formatDateTime } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface RevisionPanelProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
  onRestored: () => void;
}

export function RevisionPanel({
  documentId,
  isOpen,
  onClose,
  onRestored,
}: RevisionPanelProps) {
  const { revisions, isLoading, isRestoring, fetchRevisions, restoreRevision } = useRevisions();
  const toast = useToast();
  useEffect(() => {
    if (isOpen) {
      fetchRevisions(documentId);
    }
  }, [isOpen, documentId, fetchRevisions]);

  const handleRestore = async (revision: Revision) => {
    if (
      !confirm(
        `Restore document to "${revision.documentTitle}" from ${formatDateTime(revision.createdAt)}?\n\nCurrent content will be overwritten.`
      )
    )
      return;

    const success = await restoreRevision(revision._id);
    if (success) {
      toast.success('Revision restored. Please reload the document.');
      onRestored();
      onClose();
    } else {
      toast.error('Failed to restore revision.');
    }
  };

  return (
    <div
      className={cn(
        'fixed right-0 top-0 bottom-0 z-30',
        'w-80 bg-surface border-l border-border',
        'flex flex-col',
        'transition-transform duration-300 ease-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <History size={15} className="text-accent" />
          <span className="text-sm font-semibold text-text-primary">Revision History</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-overlay transition-all"
        >
          <X size={14} />
        </button>
      </div>

      {}
      <div className="flex-1 overflow-y-auto p-3">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-3 rounded-lg bg-surface-overlay animate-pulse">
                <Skeleton className="h-3 w-28 mb-2" />
                <Skeleton className="h-3 w-40" />
              </div>
            ))}
          </div>
        ) : revisions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Clock size={28} className="text-text-muted mb-3" />
            <p className="text-sm text-text-secondary font-medium mb-1">No revisions yet</p>
            <p className="text-xs text-text-muted leading-relaxed">
              Revisions are saved automatically as you write.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <p className="text-2xs text-text-muted uppercase tracking-wider px-1 mb-2">
              {revisions.length} revision{revisions.length !== 1 ? 's' : ''}
            </p>

            {revisions.map((revision, index) => (
              <div
                key={revision._id}
                className="group p-3 rounded-xl bg-surface-overlay border border-border hover:border-border-strong transition-all duration-150 cursor-default"
              >
                {}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-text-primary">
                    {index === 0 ? 'Latest' : `#${revisions.length - index}`}
                  </span>
                  <span className="text-2xs text-text-muted">
                    {formatDateTime(revision.createdAt)}
                  </span>
                </div>

                {}
                {revision.contentPreview && (
                  <p className="text-xs text-text-secondary line-clamp-2 mb-2.5 leading-relaxed">
                    {revision.contentPreview}
                  </p>
                )}

                {}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRestore(revision)}
                  isLoading={isRestoring}
                  leftIcon={<RotateCcw size={11} />}
                  className="text-2xs h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent hover:text-accent-hover hover:bg-accent-muted"
                >
                  Restore this version
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}