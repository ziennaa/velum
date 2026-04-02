import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  onCreate: () => void;
  isCreating?: boolean;
}

export function EmptyState({ onCreate, isCreating }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      {}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-surface border border-border-strong flex items-center justify-center">
          <FileText size={28} className="text-text-muted" />
        </div>
        {}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/20 scale-110" />
      </div>

      <h3 className="text-base font-semibold text-text-primary mb-2">No documents yet</h3>
      <p className="text-sm text-text-secondary max-w-xs leading-relaxed mb-6">
        Create your first document and start writing. Invite teammates to collaborate in real time.
      </p>

      <Button onClick={onCreate} isLoading={isCreating} leftIcon={<Plus size={15} />}>
        New Document
      </Button>
    </div>
  );
}