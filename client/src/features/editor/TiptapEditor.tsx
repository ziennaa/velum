import { useEffect, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import type { User, PresenceUser, ConnectionStatus } from '@/types';

interface TiptapEditorProps {
  documentId: string;
  user: User;
  onConnectionChange: (status: ConnectionStatus) => void;
  onSaveStatusChange: (status: 'saved' | 'saving' | 'unsaved') => void;
  onPresenceChange: (users: PresenceUser[]) => void;
  onEditorReady: (editor: import('@tiptap/react').Editor) => void;
}

interface InnerEditorProps {
  ydoc: Y.Doc;
  provider: HocuspocusProvider;
  user: User;
  onSaveStatusChange: (status: 'saved' | 'saving' | 'unsaved') => void;
  onEditorReady: (editor: import('@tiptap/react').Editor) => void;
}

function InnerEditor({
  ydoc,
  provider,
  user,
  onSaveStatusChange,
  onEditorReady,
}: InnerEditorProps) {
  const saveTimeoutRef = useRef<number>();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: { name: user.name, color: user.color },
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing… or share this link to collaborate.',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content focus:outline-none',
      },
    },
    onUpdate() {
      onSaveStatusChange('saving');
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = window.setTimeout(() => {
        onSaveStatusChange('saved');
      }, 1500);
    },
    onCreate({ editor }) {
      onEditorReady(editor);
    },
  });

  useEffect(() => {
    return () => clearTimeout(saveTimeoutRef.current);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto tiptap-editor">
      <EditorContent editor={editor} />
    </div>
  );
}

export function TiptapEditor({
  documentId,
  user,
  onConnectionChange,
  onSaveStatusChange,
  onPresenceChange,
  onEditorReady,
}: TiptapEditorProps) {
  const [ready, setReady] = useState<{
    ydoc: Y.Doc;
    provider: HocuspocusProvider;
    myClientId: number;
  } | null>(null);

  useEffect(() => {
    setReady(null);

    const ydoc = new Y.Doc();
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

    const provider = new HocuspocusProvider({
      url: wsUrl,
      name: documentId,
      document: ydoc,

      onConnect() {
        onConnectionChange('connected');
      },

      onDisconnect() {
        onConnectionChange('disconnected');
      },

      onStatus({ status }) {
        if (status === 'connecting') onConnectionChange('connecting');
      },

      onSynced() {
        setReady({
          ydoc,
          provider,
          myClientId: ydoc.clientID,
        });
      },
    });

    provider.setAwarenessField('user', {
      name: user.name,
      color: user.color,
      initials: user.initials,
    });

    provider.awareness?.on('change', () => {
      const states = provider.awareness?.getStates();
      if (!states) return;

      const users: PresenceUser[] = [];
      states.forEach((state, clientId) => {
        if (clientId === ydoc.clientID) return;

        if (state.user) {
          users.push({
            clientId,
            name: state.user.name || 'Anonymous',
            color: state.user.color || '#6366F1',
            initials: state.user.initials || '??',
          });
        }
      });
      onPresenceChange(users);
    });

    return () => {
      provider.destroy();
      ydoc.destroy();
      setReady(null);
    };
  }, [documentId]);

  if (!ready) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Connecting to document…</p>
        </div>
      </div>
    );
  }

  return (
    <InnerEditor
      ydoc={ready.ydoc}
      provider={ready.provider}
      user={user}
      onSaveStatusChange={onSaveStatusChange}
      onEditorReady={onEditorReady}
    />
  );
}