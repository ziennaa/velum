import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
  } from 'react';
  
  type Theme = 'light' | 'dark';
  
  const STORAGE_KEY = 'velum_theme';
  
  interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
  }
  
  const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => {},
  });
  
  function getInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
    }
    return 'dark';
  }
  
  export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
    useEffect(() => {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {}
    }, [theme]);
  
    const toggleTheme = () =>
      setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
  
  export function useTheme() {
    return useContext(ThemeContext);
  }