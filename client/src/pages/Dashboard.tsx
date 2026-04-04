import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit3, RefreshCw, FileText } from 'lucide-react';
import { useDocuments } from '@/hooks/useDocuments';
import { useToast } from '@/components/ui/Toast';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { DocumentCard } from '@/features/dashboard/DocumentCard';
import { EmptyState } from '@/features/dashboard/EmptyState';
import { DocumentCardSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import type { Document } from '@/types';

export default function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const { documents, isLoading, error, createDocument, deleteDocument, refreshDocuments } =
    useDocuments();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const filteredDocuments = documents.filter((doc: Document) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async () => {
    setIsCreating(true);
    const title = newDocTitle.trim() || 'Untitled Document';
    const doc = await createDocument(title);
    if (doc) {
      setShowCreateModal(false);
      setNewDocTitle('');
      toast.success(`"${doc.title}" created`);
      navigate(`/editor/${doc._id}`);
    } else {
      toast.error('Failed to create document');
    }
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDocument(id);
    toast.success('Document deleted');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showCreateModal) handleCreate();
  };

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 h-14 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <Edit3 size={13} className="text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-text-primary">Velum</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshDocuments}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-surface-overlay transition-all"
              title="Refresh"
            >
              <RefreshCw size={14} />
            </button>
            <ThemeToggle />
            <Button
              size="sm"
              leftIcon={<Plus size={14} />}
              onClick={() => setShowCreateModal(true)}
            >
              New document
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1">
            Documents
          </h1>
          <p className="text-sm text-text-secondary">
            Shared workspace · Open any document to collaborate in real time
          </p>
        </div>

        {documents.length > 0 && (
          <div className="mb-6 max-w-sm">
            <Input
              placeholder="Search documents…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={14} />}
            />
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger mb-6">
            {error} —{' '}
            <button onClick={refreshDocuments} className="underline hover:no-underline">
              try again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <DocumentCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredDocuments.length === 0 && searchQuery ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText size={32} className="text-text-muted mb-3" />
            <p className="text-sm text-text-secondary font-medium mb-1">
              No documents match "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-accent hover:text-accent-hover underline"
            >
              Clear search
            </button>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <EmptyState
            onCreate={() => setShowCreateModal(true)}
            isCreating={isCreating}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((doc: Document) => (
              <DocumentCard key={doc._id} document={doc} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setNewDocTitle('');
        }}
        title="New document"
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Document title"
            placeholder="Untitled Document"
            value={newDocTitle}
            onChange={(e) => setNewDocTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <p className="text-xs text-text-muted">
            You can rename it anytime from the editor.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreate} isLoading={isCreating}>
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}