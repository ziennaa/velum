import type { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline,
  Code,
  Quote,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Minus,
  Undo2,
  Redo2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn('toolbar-btn', isActive && 'active')}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
}

function Separator() {
  return <div className="w-px h-5 bg-border mx-0.5 flex-shrink-0" />;
}

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return (
      <div className="h-11 border-b border-border flex items-center px-4 gap-1">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-md bg-surface-overlay animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="h-11 border-b border-border bg-surface/80 backdrop-blur-sm flex items-center px-4 gap-0.5 flex-shrink-0 sticky top-0 z-10">
      {}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo2 size={14} />
      </ToolbarButton>

      <Separator />

      {}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={14} />
      </ToolbarButton>

      <Separator />

      {}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold (Ctrl+B)"
      >
        <Bold size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic (Ctrl+I)"
      >
        <Italic size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Underline (Ctrl+U)"
      >
        <Underline size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        title="Inline code"
      >
        <Code size={14} />
      </ToolbarButton>

      <Separator />

      {}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet list"
      >
        <List size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Numbered list"
      >
        <ListOrdered size={14} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Block quote"
      >
        <Quote size={14} />
      </ToolbarButton>

      <Separator />

      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal rule"
      >
        <Minus size={14} />
      </ToolbarButton>
    </div>
  );
}