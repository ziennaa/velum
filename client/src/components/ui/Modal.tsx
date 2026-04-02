import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {}
      <div
        className={cn(
          'relative z-10 w-full max-w-md',
          'bg-surface border border-border-strong',
          'rounded-2xl shadow-card-hover',
          'animate-slide-up',
          className
        )}
      >
        {}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="w-8 h-8 p-0">
            <X size={15} />
          </Button>
        </div>
        {}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}