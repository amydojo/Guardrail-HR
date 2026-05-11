import { Bookmark } from 'lucide-react';
import { useSavedItems } from '@/app/context/SavedItemsContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface SaveButtonProps {
  type: 'resource' | 'template';
  slug: string;
  title: string;
  category?: string;
  version?: string;
  variant?: 'default' | 'compact';
  className?: string;
}

export function SaveButton({
  type,
  slug,
  title,
  category,
  version,
  variant = 'default',
  className = '',
}: SaveButtonProps) {
  const { isSaved, saveItem, unsaveItem, getSavedItem } = useSavedItems();
  const navigate = useNavigate();
  const saved = isSaved(type, slug, version);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      // Unsave
      const savedItem = getSavedItem(type, slug, version);
      if (savedItem) {
        unsaveItem(savedItem.id);
        toast('Removed from saved');
      }
    } else {
      // Save
      saveItem({
        type,
        slug,
        title,
        category,
        version,
      });

      // Show toast with "View Saved" action
      toast('Added to saved', {
        action: {
          label: 'View Saved',
          onClick: () => navigate('/saved'),
        },
      });
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
          saved
            ? 'bg-theme-surface-2 border-theme-border-2 text-theme-accent'
            : 'bg-theme-surface-1 border-theme-border-1 text-theme-text-3 hover:bg-theme-surface-2 hover:text-theme-text-2'
        } ${className}`}
        aria-label={saved ? 'Remove from Saved' : 'Save'}
        title={saved ? 'Saved' : 'Save'}
      >
        <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-[13px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
        saved
          ? 'bg-theme-surface-2 border-theme-border-2 text-theme-text-2'
          : 'bg-theme-surface-1 border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-2'
      } ${className}`}
    >
      <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
      <span>{saved ? 'Saved' : 'Save'}</span>
    </button>
  );
}