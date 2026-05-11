/**
 * Saved Page
 * Dedicated page showing all saved resources + templates
 * Apple/Linear-caliber: clean, precise, functional
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, FileText, Settings, Trash2 } from 'lucide-react';
import { getSaved, getSavedByKind, SavedItem, unsaveItem } from '@/app/saved/savedStorage';
import { toast } from 'sonner';

type SavedFilter = 'resources' | 'templates';

export function SavedPage() {
  const [filter, setFilter] = useState<SavedFilter>('resources');
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    loadItems();
  }, [filter]);

  const loadItems = () => {
    const kind = filter === 'resources' ? 'resource' : 'template';
    const filtered = getSavedByKind(kind);
    setItems(filtered);
  };

  const handleRemove = (item: SavedItem) => {
    unsaveItem(item.kind, item.slug);
    loadItems();
    toast('Removed from saved');
  };

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="mx-auto max-w-[1080px] px-6 xl:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[13px] text-theme-text-3 hover:text-theme-text-2 mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <h1 className="text-[28px] sm:text-[32px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
            Saved
          </h1>
          <p className="text-[15px] text-theme-text-2 leading-[1.65] mb-6">
            Your saved resources and templates for quick access.
          </p>

          {/* Segmented control */}
          <div className="inline-flex bg-theme-surface-2 border border-theme-border-2 rounded-lg p-1 gap-1">
            <button
              onClick={() => setFilter('resources')}
              aria-pressed={filter === 'resources'}
              className={`px-4 py-2 rounded-md text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                filter === 'resources'
                  ? 'bg-theme-surface-1 text-theme-text-1 shadow-theme-1'
                  : 'text-theme-text-3 hover:text-theme-text-2'
              }`}
            >
              Resources ({getSavedByKind('resource').length})
            </button>
            <button
              onClick={() => setFilter('templates')}
              aria-pressed={filter === 'templates'}
              className={`px-4 py-2 rounded-md text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                filter === 'templates'
                  ? 'bg-theme-surface-1 text-theme-text-1 shadow-theme-1'
                  : 'text-theme-text-3 hover:text-theme-text-2'
              }`}
            >
              Templates ({getSavedByKind('template').length})
            </button>
          </div>
        </div>

        {/* List */}
        {isEmpty ? (
          <div className="bg-theme-surface-1 border border-theme-border-1 rounded-2xl p-12 text-center">
            <p className="text-[16px] text-theme-text-2 font-medium mb-2">
              No {filter} saved yet
            </p>
            <p className="text-[14px] text-theme-text-3 mb-6 leading-[1.65]">
              Save a {filter === 'resources' ? 'resource' : 'template'} to keep it here for quick access.
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-theme-accent text-white text-[14px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 shadow-theme-2"
            >
              Browse resources
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {items.map((item) => (
              <SavedItemCard
                key={item.id}
                item={item}
                onRemove={() => handleRemove(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * SavedItemCard Component
 * Full-width card for saved item with remove action
 */
interface SavedItemCardProps {
  item: SavedItem;
  onRemove: () => void;
}

function SavedItemCard({ item, onRemove }: SavedItemCardProps) {
  const isTemplate = item.kind === 'template';
  const primaryUrl = isTemplate
    ? `/resources/templates/${item.slug}/customize`
    : `/resources/${item.slug}`;
  const detailUrl = isTemplate
    ? `/resources/templates/${item.slug}`
    : `/resources/${item.slug}`;
  const primaryLabel = isTemplate ? 'Customize' : 'Open';

  // Format saved date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl p-5 hover:border-theme-border-2 transition-all group">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-theme-surface-2 border border-theme-border-2 flex items-center justify-center flex-shrink-0">
          {isTemplate ? (
            <Settings className="w-5 h-5 text-theme-text-2" strokeWidth={1.5} />
          ) : (
            <FileText className="w-5 h-5 text-theme-text-2" strokeWidth={1.5} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] font-semibold text-theme-text-1 mb-1 tracking-tight">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-[13px] text-theme-text-3 mb-4">
            <span className="px-2 py-0.5 bg-theme-surface-2 border border-theme-border-2 rounded text-[11px] uppercase tracking-wide font-medium">
              {isTemplate ? 'Template' : 'Resource'}
            </span>
            <span>•</span>
            <span>{item.meta}</span>
            <span>•</span>
            <span>{formatDate(item.savedAt)}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={primaryUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-theme-accent text-white text-[13px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            >
              {primaryLabel}
            </Link>
            <Link
              to={detailUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-theme-surface-1 border border-theme-border-1 text-theme-text-2 text-[13px] font-medium rounded-lg hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
            >
              View details
            </Link>
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-theme-text-3 hover:text-red-500 text-[13px] font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              aria-label="Remove from saved"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}