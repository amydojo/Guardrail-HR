/**
 * SavedSection Component
 * Dashboard section showing saved resources + templates
 * Apple/Linear-caliber: segmented control, row layout, precise interactions
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FileText, Settings, ArrowRight } from 'lucide-react';
import { getSaved, getSavedByKind, SavedItem } from '@/app/saved/savedStorage';
import { SavedToggle } from '@/app/components/saved/SavedToggle';

type SavedFilter = 'resources' | 'templates';

export function SavedSection() {
  const [filter, setFilter] = useState<SavedFilter>('resources');
  const [items, setItems] = useState<SavedItem[]>([]);

  useEffect(() => {
    loadItems();
    
    // Listen for storage changes to sync across tabs
    const handleStorageChange = () => {
      loadItems();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [filter]);

  const loadItems = () => {
    const kind = filter === 'resources' ? 'resource' : 'template';
    const filtered = getSavedByKind(kind);
    setItems(filtered);
  };

  const displayItems = items.slice(0, 5);
  const hasMore = items.length > 5;
  const isEmpty = items.length === 0;

  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 shadow-theme-2 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-theme-border-2">
        <h2 className="text-[17px] font-semibold text-theme-text-1 mb-1.5 tracking-tight">
          Saved
        </h2>
        <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-4">
          Quick access to the resources + templates you pinned.
        </p>

        {/* Segmented control */}
        <div className="inline-flex bg-theme-surface-2 border border-theme-border-2 rounded-lg p-1 gap-1">
          <button
            onClick={() => setFilter('resources')}
            aria-pressed={filter === 'resources'}
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
              filter === 'resources'
                ? 'bg-theme-surface-1 text-theme-text-1 shadow-theme-1'
                : 'text-theme-text-3 hover:text-theme-text-2'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setFilter('templates')}
            aria-pressed={filter === 'templates'}
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
              filter === 'templates'
                ? 'bg-theme-surface-1 text-theme-text-1 shadow-theme-1'
                : 'text-theme-text-3 hover:text-theme-text-2'
            }`}
          >
            Templates
          </button>
        </div>
      </div>

      {/* List */}
      {isEmpty ? (
        <div className="px-6 py-12 text-center">
          <p className="text-[15px] text-theme-text-2 font-medium mb-1">
            Nothing saved yet
          </p>
          <p className="text-[14px] text-theme-text-3 mb-5 leading-[1.65]">
            Save a resource or template to keep it here.
          </p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 text-[13px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
          >
            Browse resources
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-theme-border-2">
            {displayItems.map((item, index) => (
              <SavedRow
                key={item.id}
                item={item}
                onUpdate={loadItems}
                isLast={index === displayItems.length - 1 && !hasMore}
              />
            ))}
          </div>

          {/* Footer with "view all saved" */}
          {!isEmpty && (
            <div className="px-6 py-4 border-t border-theme-border-2">
              <Link
                to="/saved"
                className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-2 font-medium hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded"
              >
                View all saved ({items.length})
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * SavedRow Component
 * Individual row in the saved list
 */
interface SavedRowProps {
  item: SavedItem;
  onUpdate: () => void;
  isLast?: boolean;
}

function SavedRow({ item, onUpdate, isLast = false }: SavedRowProps) {
  const isTemplate = item.kind === 'template';
  const primaryUrl = isTemplate
    ? `/resources/templates/${item.slug}/customize`
    : `/resources/${item.slug}`;
  const primaryLabel = isTemplate ? 'Customize' : 'Open';

  return (
    <div className="group px-6 py-4 hover:bg-theme-surface-2 transition-colors">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-theme-surface-2 border border-theme-border-2 flex items-center justify-center flex-shrink-0 group-hover:border-theme-border-1 transition-colors">
          {isTemplate ? (
            <Settings className="w-5 h-5 text-theme-text-2" strokeWidth={1.5} />
          ) : (
            <FileText className="w-5 h-5 text-theme-text-2" strokeWidth={1.5} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-semibold text-theme-text-1 mb-0.5 truncate">
            {item.title}
          </h3>
          <p className="text-[13px] text-theme-text-3">
            {isTemplate ? 'Template' : 'Resource'} • {item.meta}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to={primaryUrl}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-theme-accent text-white text-[13px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
          >
            {primaryLabel}
          </Link>
          <SavedToggle
            kind={item.kind}
            slug={item.slug}
            title={item.title}
            meta={item.meta}
            variant="icon"
          />
        </div>
      </div>
    </div>
  );
}