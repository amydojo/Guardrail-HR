/**
 * Template Card V2 — Premium Template Card
 * Apple/Linear-caliber card with better hierarchy, trust signals, and subtle interactions
 * 
 * Design Principles:
 * - Light mode: border-led with shadow-1 only
 * - Dark mode: liquid glass with borders, minimal shadows
 * - Hover: subtle lift (1-2px translate) + border darken
 * - Clear hierarchy: title → description → chips → actions
 * - Trust meta: reviewed date + version on right
 */

import React from 'react';
import { Download, Plus, Check, FileText } from 'lucide-react';
import { Template } from '@/app/data/templatesData';
import { SaveButton } from '@/app/components/SaveButton';

interface TemplateCardV2Props {
  template: Template;
  onPreview: (template: Template) => void;
  onAddToPlan: (slug: string) => void;
  isInPlan: boolean;
  className?: string;
}

export function TemplateCardV2({
  template,
  onPreview,
  onAddToPlan,
  isInPlan,
  className = '',
}: TemplateCardV2Props) {
  // Format support indicators
  const formats = template.format.split('/').map((f) => f.trim());
  const supportsMultipleFormats = formats.length > 1;

  return (
    <div
      className={`group relative bg-theme-surface-1 border border-theme-border-1 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-[2px] hover:border-theme-border-2 hover:shadow-theme-1 ${className}`}
    >
      {/* Main Content */}
      <div className="p-6">
        {/* Header Row: Title + Trust Meta */}
        <div className="flex items-start justify-between gap-4 mb-3">
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

          {/* Trust Meta — Right side */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="text-[11px] text-theme-text-3 font-medium">
              Reviewed {template.reviewedDate}
            </div>
            <div className="text-[11px] text-theme-text-3 font-mono">
              v{template.version}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] text-theme-text-2 leading-relaxed mb-4 line-clamp-2">
          {template.subtitle}
        </p>

        {/* Metadata Chips Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Jurisdiction */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[12px] font-medium text-theme-text-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {template.jurisdiction}
          </span>

          {/* Module */}
          <span className="inline-flex items-center px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[12px] font-medium text-theme-text-2">
            {template.module}
          </span>

          {/* Type */}
          <span className="inline-flex items-center px-2.5 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[12px] font-medium text-theme-text-2">
            {template.type}
          </span>
        </div>

        {/* Format Pills Row — Only if multiple formats */}
        {supportsMultipleFormats && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] text-theme-text-3 font-medium uppercase tracking-wide">
              Formats:
            </span>
            <div className="flex items-center gap-1.5">
              {formats.map((format, index) => (
                <React.Fragment key={format}>
                  <span className="text-[11px] text-theme-text-2 font-medium">
                    {format}
                  </span>
                  {index < formats.length - 1 && (
                    <span className="text-[11px] text-theme-text-3">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Actions Row */}
        <div className="flex items-center gap-3 pt-4 border-t border-theme-border-2">
          {/* Primary: Customize & generate */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to customize page
              window.location.href = `/resources/templates/${template.slug}/customize`;
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-theme-accent text-white rounded-lg text-[14px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 shadow-theme-2"
          >
            Customize & generate
          </button>

          {/* Secondary: Preview (modal) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium text-theme-text-2 hover:text-theme-text-1 border border-theme-border-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
          >
            Preview
          </button>

          {/* Save Button */}
          <SaveButton
            type="template"
            slug={template.slug}
            title={template.title}
            category={template.module}
            version={template.version}
            variant="compact"
          />
        </div>
      </div>

      {/* Subtle hover indicator */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-theme-border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

/**
 * Template Card Skeleton — Loading state
 */
export function TemplateCardV2Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-theme-surface-1 border border-theme-border-1 rounded-xl overflow-hidden animate-pulse ${className}`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="h-5 bg-theme-surface-2 rounded w-2/3" />
          <div className="h-4 bg-theme-surface-2 rounded w-24" />
        </div>
        <div className="h-4 bg-theme-surface-2 rounded w-full mb-2" />
        <div className="h-4 bg-theme-surface-2 rounded w-4/5 mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-theme-surface-2 rounded w-20" />
          <div className="h-6 bg-theme-surface-2 rounded w-24" />
          <div className="h-6 bg-theme-surface-2 rounded w-16" />
        </div>
        <div className="flex gap-3 pt-4 border-t border-theme-border-2">
          <div className="flex-1 h-9 bg-theme-surface-2 rounded-lg" />
          <div className="h-9 bg-theme-surface-2 rounded-lg w-32" />
        </div>
      </div>
    </div>
  );
}

/**
 * Empty State — Premium upgrade with subtle CTA
 */
interface TemplateEmptyStateProps {
  onGetRecommendations: () => void;
  onLearnMore: () => void;
  hasCompletedScan: boolean;
}

export function TemplateEmptyState({
  onGetRecommendations,
  onLearnMore,
  hasCompletedScan,
}: TemplateEmptyStateProps) {
  if (!hasCompletedScan) {
    return (
      <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl p-12 text-center">
        <div className="max-w-[480px] mx-auto">
          <div className="w-12 h-12 bg-theme-surface-2 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-theme-text-3" />
          </div>
          <h3 className="text-[18px] font-semibold text-theme-text-1 tracking-tight mb-2">
            No templates match your filters
          </h3>
          <p className="text-[14px] text-theme-text-3 leading-relaxed mb-6">
            Try adjusting your search or filter criteria to find the right template for your needs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl p-12 text-center">
      <div className="max-w-[520px] mx-auto">
        <div className="w-12 h-12 bg-theme-accent/10 border border-theme-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-6 h-6 text-theme-accent" />
        </div>
        <h3 className="text-[18px] font-semibold text-theme-text-1 tracking-tight mb-2">
          Get personalized template recommendations
        </h3>
        <p className="text-[14px] text-theme-text-2 leading-relaxed mb-6">
          Based on your assessment results, we can recommend templates that address your specific compliance gaps.
        </p>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onGetRecommendations}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-theme-accent text-white rounded-lg text-[14px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 shadow-theme-2"
          >
            View recommended templates
          </button>
          <button
            onClick={onLearnMore}
            className="text-[13px] text-theme-text-3 hover:text-theme-text-1 transition-colors"
          >
            How recommendations work
          </button>
        </div>
      </div>
    </div>
  );
}