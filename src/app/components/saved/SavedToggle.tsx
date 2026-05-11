/**
 * SavedToggle Component
 * Consistent save/unsave button across Resources + Templates
 * 
 * Supports two variants:
 * - "button" (default): Text button with "Save" / "Saved" label
 * - "icon": Icon-only toggle with tooltip
 */

import { Plus, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isSaved, toggleSaved, SavedItem } from '@/app/saved/savedStorage';
import { toast } from 'sonner';
import { Link } from 'react-router';

interface SavedToggleProps {
  kind: 'resource' | 'template';
  slug: string;
  title: string;
  meta: string;
  variant?: 'button' | 'icon';
  className?: string;
}

export function SavedToggle({
  kind,
  slug,
  title,
  meta,
  variant = 'button',
  className = '',
}: SavedToggleProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isSaved(kind, slug));
  }, [kind, slug]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const result = toggleSaved({ kind, slug, title, meta });
    setSaved(result.saved);

    if (result.saved) {
      toast('Added to saved', {
        description: `Find it in your ${kind === 'resource' ? 'resources' : 'templates'} saved items`,
        action: {
          label: 'View Saved',
          onClick: () => {
            window.location.href = '/saved';
          },
        },
      });
    } else {
      toast('Removed from saved');
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        aria-pressed={saved}
        aria-label={saved ? 'remove from saved' : 'save this'}
        title={saved ? 'remove from saved' : 'save this'}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
          saved
            ? 'bg-theme-surface-2 border-theme-border-2 text-theme-text-2'
            : 'bg-theme-surface-1 border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-2'
        } ${className}`}
      >
        {saved ? <Check className="w-4 h-4" strokeWidth={2} /> : <Plus className="w-4 h-4" strokeWidth={2} />}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
        saved
          ? 'bg-theme-surface-2 border border-theme-border-2 text-theme-text-2'
          : 'bg-theme-surface-1 border border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-2'
      } ${className}`}
    >
      {saved ? (
        <>
          <Check className="w-4 h-4" strokeWidth={2} />
          Saved
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" strokeWidth={2} />
          Save
        </>
      )}
    </button>
  );
}