import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Trash2, ExternalLink, MoreHorizontal, Users } from 'lucide-react';
import type { Document } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface DocumentCardProps {
  document: Document;
  onDelete: (id: string) => void;
}

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpen = () => navigate(`/editor/${document._id}`);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Delete "${document.title}"? This cannot be undone.`)) return;
    setIsDeleting(true);
    await onDelete(document._id);
  };

  return (
    <div
      onClick={handleOpen}
      className={cn(
        'group relative p-5 rounded-xl cursor-pointer select-none',
        'bg-surface border border-border',
        'hover:border-border-strong hover:bg-surface-raised',
        'hover:shadow-card-hover',
        'transition-all duration-200',
        'animate-fade-in',
        isDeleting && 'opacity-50 pointer-events-none'
      )}
    >
      {}
      <div className="absolute inset-0 rounded-xl bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent-muted border border-accent/20 flex items-center justify-center flex-shrink-0">
            <FileText size={16} className="text-accent" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-text-primary truncate max-w-[180px] group-hover:text-white transition-colors">
              {document.title}
            </h3>
          </div>
        </div>

        {}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={cn(
              'w-7 h-7 rounded-lg flex items-center justify-center',
              'text-text-muted hover:text-text-secondary',
              'hover:bg-surface-overlay',
              'transition-all duration-150',
              'opacity-0 group-hover:opacity-100',
            )}
          >
            <MoreHorizontal size={15} />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-8 z-10 w-40 py-1 rounded-xl bg-surface-raised border border-border-strong shadow-card-hover animate-fade-in"
              onBlur={() => setShowMenu(false)}
            >
              <button
                onClick={handleOpen}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
              >
                <ExternalLink size={13} />
                Open editor
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-danger hover:bg-danger/5 transition-colors"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {}
      <div className="relative flex items-center justify-between">
        <span className="text-2xs text-text-muted">
          Edited {formatRelativeTime(document.updatedAt)}
        </span>
        {document.collaboratorCount > 0 && (
          <span className="flex items-center gap-1 text-2xs text-text-muted">
            <Users size={10} />
            {document.collaboratorCount}
          </span>
        )}
      </div>
    </div>
  );
}