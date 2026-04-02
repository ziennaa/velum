import { createBrowserRouter } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import Editor from '@/pages/Editor';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/editor/:id',
    element: <Editor />,
  },
  {
    path: '*',
    element: <Dashboard />,
  },
]);