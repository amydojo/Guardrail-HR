import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { SavedItemsProvider } from '@/app/context/SavedItemsContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <ThemeProvider>
      <SavedItemsProvider>
        <RouterProvider router={router} />
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'bg-theme-surface-1 border-theme-border-1 text-theme-text-1',
          }}
        />
      </SavedItemsProvider>
    </ThemeProvider>
  );
}