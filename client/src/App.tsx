import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { ToastProvider } from '@/components/ui/Toast';
import { ThemeProvider } from '@/context/ThemeContext';


export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  );
}