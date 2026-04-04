import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'w-8 h-8 rounded-lg',
        'flex items-center justify-center',
        'text-text-muted hover:text-text-secondary',
        'hover:bg-surface-overlay',
        'transition-all duration-150',
        className
      )}
    >
      {isDark ? (
        <Sun size={15} className="transition-transform duration-200" />
      ) : (
        <Moon size={15} className="transition-transform duration-200" />
      )}
    </button>
  );
}