import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CURSOR_COLORS, getInitials } from '@/lib/utils';
import type { User } from '@/types';

interface UserIdentityBadgeProps {
  user: User;
  onUpdateName: (name: string) => void;
  onUpdateColor: (color: string) => void;
}

export function UserIdentityBadge({
  user,
  onUpdateName,
  onUpdateColor,
}: UserIdentityBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftName, setDraftName] = useState(user.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) setDraftName(user.name);
  }, [user.name, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setDraftName(user.name);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        handleSave();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, draftName]);

  const handleSave = () => {
    const trimmed = draftName.trim();
    if (trimmed && trimmed !== user.name) {
      onUpdateName(trimmed);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setDraftName(user.name);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex-shrink-0" ref={containerRef}>

      {/* ── Badge trigger ─────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1.5 h-7 pl-1.5 pr-2.5 rounded-lg',
          'border text-xs transition-all duration-150 select-none',
          isOpen
            ? 'bg-surface-overlay border-border-strong'
            : 'border-transparent hover:bg-surface-overlay hover:border-border'
        )}
        title="Edit your display name and colour"
      >
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
          style={{ backgroundColor: user.color }}
        >
          {user.initials}
        </div>
        <span className="text-text-secondary max-w-[72px] truncate leading-none">
          {user.name}
        </span>
        <span className="text-text-muted text-[10px] leading-none">·&nbsp;You</span>
        <ChevronDown
          size={10}
          className={cn(
            'text-text-muted transition-transform duration-150 flex-shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* ── Edit popover ──────────────────────────────────────────────── */}
      {isOpen && (
        <div className="absolute right-0 top-9 z-50 w-64 bg-surface-raised border border-border-strong rounded-xl shadow-card-hover animate-fade-in p-3">

          {/* Name section */}
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">
            Display name
          </p>

          {/* 
            FIX: The row uses overflow-hidden on the wrapper and min-w-0 on
            the input so it shrinks properly. The check button is flex-shrink-0
            so it never gets squeezed — it stays inside the container.
          */}
          <div className="flex items-center gap-1.5 mb-3 w-full overflow-hidden">
            {/* Live avatar preview */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 transition-colors duration-150"
              style={{ backgroundColor: user.color }}
            >
              {getInitials(draftName || user.name)}
            </div>

            {/* Input — min-w-0 lets it shrink when siblings need space */}
            <input
              ref={inputRef}
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={user.name}
              maxLength={30}
              className={cn(
                'flex-1 min-w-0 h-7 px-2 rounded-md text-xs',
                'bg-surface-overlay border border-border',
                'text-text-primary placeholder:text-text-muted',
                'outline-none transition-all',
                'focus:border-accent/60 focus:ring-1 focus:ring-accent/15'
              )}
            />

            {/* Check button — flex-shrink-0 keeps it from being pushed out */}
            <button
              onClick={handleSave}
              className={cn(
                'w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0',
                'bg-accent/10 border border-accent/20 text-accent',
                'hover:bg-accent/20 transition-colors'
              )}
              title="Save (Enter)"
            >
              <Check size={11} />
            </button>
          </div>

          {/* Colour picker */}
          <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">
            Cursor colour
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {CURSOR_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onUpdateColor(c)}
                title={c}
                className="w-5 h-5 rounded-full transition-transform duration-150 hover:scale-110 focus:outline-none flex-shrink-0"
                style={{
                  backgroundColor: c,
                  boxShadow:
                    user.color === c
                      ? `0 0 0 2px rgb(var(--color-surface-raised)), 0 0 0 3.5px ${c}`
                      : 'none',
                  transform: user.color === c ? 'scale(1.2)' : undefined,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}