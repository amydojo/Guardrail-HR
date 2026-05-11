/**
 * Template Card (Apple Legal Doc Aesthetic)
 * 
 * Design Philosophy:
 * - Minimal, authoritative, quiet confidence
 * - Feels like a maintained documentation system
 * - No marketing language, no urgency, no "download now" vibes
 * 
 * Interaction Model:
 * - Title button: Opens preview modal
 * - Download link: Opens preview modal
 * - Card itself: NOT clickable
 * - Save: Toggles saved state
 * 
 * Visual System:
 * - Light mode: Border-led, airy, shadow-1 only
 * - Dark mode: Borders + faint glow, minimal shadows
 * - Hover: Subtle border darken + 1-2px lift
 */

import React from 'react';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { Template } from '@/app/data/templatesData';

interface TemplateCardLegalProps {
  template: Template;
  onPreview: (template: Template) => void;
  onAddToPlan: (slug: string) => void;
  isInPlan: boolean;
  className?: string;
}

export function TemplateCardLegal({
  template,
  onPreview,
  onAddToPlan,
  isInPlan,
  className = '',
}: TemplateCardLegalProps) {
  const [isSaved, setIsSaved] = React.useState(isInPlan);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    onAddToPlan(template.slug);
  };

  return (
    <div
      className={`group bg-theme-surface-1 border border-theme-border-1 rounded-xl transition-all duration-200 hover:-translate-y-[1px] hover:border-theme-border-2 hover:shadow-theme-1 ${className}`}
    >
      <div className="px-6 py-5">
        {/* Header Row: Title + Meta */}
        <div className="flex items-start justify-between gap-6 mb-3">
          {/* Left: Title */}
          <div className="flex-1 min-w-0">
            <button
              onClick={() => onPreview(template)}
              className="text-left w-full focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded-lg -mx-2 -my-1 px-2 py-1"
            >
              <h3 className="text-[16px] font-semibold text-theme-text-1 tracking-tight leading-tight group-hover:text-theme-accent transition-colors">
                {template.title}
              </h3>
            </button>
          </div>

          {/* Right: Trust Meta */}
          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
            <div className="text-[11px] text-theme-text-3 font-medium">
              Reviewed {template.reviewedDate}
            </div>
            <div className="text-[11px] text-theme-text-3 font-mono">
              v{template.version}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-4 line-clamp-1">
          {template.subtitle}
        </p>

        {/* Chips Row */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[12px] font-medium text-theme-text-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {template.jurisdiction}
          </span>
          <span className="px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[12px] font-medium text-theme-text-2">
            {template.module}
          </span>
          <span className="px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[12px] font-medium text-theme-text-2">
            {template.type}
          </span>
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-4 pt-4 border-t border-theme-border-2">
          {/* Primary: Customize & generate */}
          <button
            onClick={() => {
              window.location.href = `/resources/templates/${template.slug}/customize`;
            }}
            className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded-lg"
          >
            Customize & generate
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Secondary: Preview (modal) */}
          <button
            onClick={() => onPreview(template)}
            className="inline-flex items-center gap-1.5 text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded-lg"
          >
            Preview
          </button>

          {/* Save */}
          <button
            onClick={(e) => handleToggleSave(e)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
              isSaved
                ? 'bg-theme-surface-2 border-theme-border-2 text-theme-text-2'
                : 'bg-theme-surface-1 border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-2'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                saved
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Template Card Skeleton — Loading State
 */
export function TemplateCardLegalSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-theme-surface-1 border border-theme-border-1 rounded-xl overflow-hidden animate-pulse ${className}`}>
      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-6 mb-3">
          <div className="h-5 bg-theme-surface-2 rounded w-2/3" />
          <div className="h-4 bg-theme-surface-2 rounded w-24" />
        </div>
        <div className="h-4 bg-theme-surface-2 rounded w-full mb-4" />
        <div className="flex gap-2 mb-5">
          <div className="h-6 bg-theme-surface-2 rounded w-20" />
          <div className="h-6 bg-theme-surface-2 rounded w-24" />
          <div className="h-6 bg-theme-surface-2 rounded w-16" />
        </div>
        <div className="flex gap-4 pt-4 border-t border-theme-border-2">
          <div className="h-5 bg-theme-surface-2 rounded w-24" />
          <div className="h-5 bg-theme-surface-2 rounded w-28" />
        </div>
      </div>
    </div>
  );
}