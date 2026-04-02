import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    type ReactNode,
  } from 'react';
  import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
  import { cn } from '@/lib/utils';
  
  type ToastType = 'success' | 'error' | 'info';
  
  interface Toast {
    id: string;
    type: ToastType;
    message: string;
  }
  
  interface ToastContextValue {
    toast: {
      success: (message: string) => void;
      error: (message: string) => void;
      info: (message: string) => void;
    };
  }
  
  const ToastContext = createContext<ToastContextValue | null>(null);
  
  export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
  
    const addToast = useCallback((type: ToastType, message: string) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    }, []);
  
    const removeToast = useCallback((id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
  
    const toast = {
      success: (msg: string) => addToast('success', msg),
      error: (msg: string) => addToast('error', msg),
      info: (msg: string) => addToast('info', msg),
    };
  
    const icons: Record<ToastType, ReactNode> = {
      success: <CheckCircle2 size={15} className="text-success flex-shrink-0" />,
      error: <AlertCircle size={15} className="text-danger flex-shrink-0" />,
      info: <Info size={15} className="text-accent flex-shrink-0" />,
    };
  
    const styles: Record<ToastType, string> = {
      success: 'border-success/20',
      error: 'border-danger/20',
      info: 'border-accent/20',
    };
  
    return (
      <ToastContext.Provider value={{ toast }}>
        {children}
        {}
        <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={cn(
                'pointer-events-auto',
                'flex items-center gap-2.5',
                'px-4 py-3 rounded-xl',
                'bg-surface-overlay border backdrop-blur-sm',
                'shadow-card text-sm text-text-primary',
                'animate-slide-up max-w-[320px]',
                styles[t.type]
              )}
            >
              {icons[t.type]}
              <span className="flex-1 text-sm">{t.message}</span>
              <button
                onClick={() => removeToast(t.id)}
                className="text-text-muted hover:text-text-secondary transition-colors pointer-events-auto"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      </ToastContext.Provider>
    );
  }
  
  export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx.toast;
  }