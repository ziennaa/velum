import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CURSOR_COLORS, getInitials } from '@/lib/utils';
import { Button } from './Button';

interface IdentityModalProps {
  defaultName: string;
  defaultColor: string;
  onConfirm: (name: string, color: string) => void;
  onDismiss: () => void;
}

export function IdentityModal({
  defaultName,
  defaultColor,
  onConfirm,
  onDismiss,
}: IdentityModalProps) {
  const [name, setName] = useState(defaultName);
  const [color, setColor] = useState(defaultColor);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 120);
    return () => clearTimeout(t);
  }, []);

  const displayName = name.trim() || defaultName;

  const handleConfirm = () => {
    onConfirm(displayName, color);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onDismiss}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-sm bg-surface border border-border-strong rounded-2xl shadow-card-hover animate-slide-up">
        
        {/* Top section */}
        <div className="px-6 pt-6 pb-5">
          
          {/* Avatar preview + heading */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 transition-colors duration-200"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 0 3px ${color}30`,
              }}
            >
              {getInitials(displayName)}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-primary leading-tight">
                How should we call you?
              </h2>
              <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                Visible to others editing this document
              </p>
            </div>
          </div>

          {/* Name input */}
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={defaultName}
            maxLength={30}
            className={cn(
              'w-full h-9 px-3 rounded-lg text-sm mb-4',
              'bg-surface-overlay border border-border',
              'text-text-primary placeholder:text-text-muted',
              'outline-none transition-all duration-150',
              'hover:border-border-strong',
              'focus:border-accent/60 focus:ring-2 focus:ring-accent/15'
            )}
          />

          {/* Colour swatches */}
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-medium mb-2.5">
              Cursor colour
            </p>
            <div className="flex gap-2 flex-wrap">
              {CURSOR_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  title={c}
                  className="w-6 h-6 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 focus:outline-none"
                  style={{
                    backgroundColor: c,
                    boxShadow:
                      color === c
                        ? `0 0 0 2px #09090B, 0 0 0 4px ${c}`
                        : 'none',
                    transform: color === c ? 'scale(1.15)' : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-0" />

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={onDismiss}
            className="text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            Continue as guest
          </button>
          <Button size="sm" onClick={handleConfirm}>
            Start collaborating
          </Button>
        </div>
      </div>
    </div>
  );
}