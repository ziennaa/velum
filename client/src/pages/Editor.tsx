import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, History, Edit3, Share2 } from 'lucide-react';
import type { Editor as TiptapEditorType } from '@tiptap/react';

import { TiptapEditor } from '@/features/editor/TiptapEditor';
import { EditorToolbar } from '@/features/editor/EditorToolbar';
import { PresenceAvatars } from '@/features/editor/PresenceAvatars';
import { CollaborationStatus } from '@/features/editor/CollaborationStatus';
import { RevisionPanel } from '@/features/editor/RevisionPanel';
import { UserIdentityBadge } from '@/features/editor/UserIdentityBadge';
import { IdentityModal } from '@/components/ui/IdentityModal';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/hooks/useUser';
import { useToast } from '@/components/ui/Toast';
import { documentsApi } from '@/lib/api';
import type { PresenceUser, ConnectionStatus } from '@/types';
import { cn } from '@/lib/utils';

export default function Editor() {
  const { id: documentId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { user, updateName, updateColor, dismissIdentityModal } = useUser();

  const [docTitle, setDocTitle] = useState('Untitled Document');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [presenceUsers, setPresenceUsers] = useState<PresenceUser[]>([]);
  const [editor, setEditor] = useState<TiptapEditorType | null>(null);
  const [isRevisionPanelOpen, setIsRevisionPanelOpen] = useState(false);

  useEffect(() => {
    if (!documentId) return;
    documentsApi
      .get(documentId)
      .then((doc) => setDocTitle(doc.title))
      .catch(() => toast.error('Failed to load document'));
  }, [documentId]);

  const saveTitleRef = useRef<number>();

  const handleTitleChange = (newTitle: string) => {
    setDocTitle(newTitle);
    clearTimeout(saveTitleRef.current);
    saveTitleRef.current = window.setTimeout(async () => {
      if (!documentId) return;
      setIsSavingTitle(true);
      try {
        await documentsApi.updateTitle(documentId, newTitle);
      } catch {
        toast.error('Failed to save title');
      } finally {
        setIsSavingTitle(false);
      }
    }, 800);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (!docTitle.trim()) setDocTitle('Untitled Document');
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      titleInputRef.current?.blur();
    }
  };

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied! Share it to collaborate.');
  }, []);

  const handleRevisionRestored = useCallback(() => {
    window.location.reload();
  }, []);

  const handleIdentityConfirm = useCallback(
    (name: string, color: string) => {
      updateName(name);
      updateColor(color);
    },
    [updateName, updateColor]
  );

  if (!documentId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <p className="text-text-secondary mb-4">Invalid document link.</p>
          <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-bg overflow-hidden">

      {!user.hasChosenName && (
        <IdentityModal
          defaultName={user.name}
          defaultColor={user.color}
          onConfirm={handleIdentityConfirm}
          onDismiss={dismissIdentityModal}
        />
      )}

      <header className="flex-shrink-0 h-14 border-b border-border bg-surface/60 backdrop-blur-md flex items-center px-4 gap-3 z-20">

        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-text-muted hover:text-text-secondary transition-colors text-sm flex-shrink-0"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Docs</span>
        </button>

        <div className="w-px h-5 bg-border flex-shrink-0" />

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center">
            <Edit3 size={10} className="text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              value={docTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              className={cn(
                'w-full max-w-xs text-sm font-semibold bg-transparent outline-none',
                'border-b border-accent/60 text-text-primary',
                'placeholder:text-text-muted pb-0.5'
              )}
              placeholder="Untitled Document"
              maxLength={200}
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="text-sm font-semibold text-text-primary hover:text-text-primary/80 transition-colors truncate max-w-xs"
              title="Click to rename"
            >
              {isSavingTitle ? `${docTitle}…` : docTitle}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <CollaborationStatus status={connectionStatus} saveStatus={saveStatus} />

          <div className="w-px h-4 bg-border" />

          <PresenceAvatars users={presenceUsers} />

          <UserIdentityBadge
            user={user}
            onUpdateName={updateName}
            onUpdateColor={updateColor}
          />

          <div className="w-px h-4 bg-border" />

          <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            leftIcon={<Share2 size={13} />}
            className="hidden sm:inline-flex"
          >
            Share
          </Button>

          <button
            onClick={() => setIsRevisionPanelOpen(!isRevisionPanelOpen)}
            title="Revision history"
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center',
              'transition-all duration-150 text-text-muted',
              isRevisionPanelOpen
                ? 'bg-accent/15 text-accent'
                : 'hover:bg-surface-overlay hover:text-text-secondary'
            )}
          >
            <History size={15} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={cn(
            'flex-1 flex flex-col overflow-hidden transition-all duration-300',
            isRevisionPanelOpen && 'mr-80'
          )}
        >
          <EditorToolbar editor={editor} />
          <TiptapEditor
            documentId={documentId}
            user={user}
            onConnectionChange={setConnectionStatus}
            onSaveStatusChange={setSaveStatus}
            onPresenceChange={setPresenceUsers}
            onEditorReady={setEditor}
          />
        </div>

        <RevisionPanel
          documentId={documentId}
          isOpen={isRevisionPanelOpen}
          onClose={() => setIsRevisionPanelOpen(false)}
          onRestored={handleRevisionRestored}
        />
      </div>
    </div>
  );
}