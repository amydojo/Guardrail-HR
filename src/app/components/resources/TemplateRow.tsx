import { Link } from 'react-router';
import { Settings, Plus, Check, FileText } from 'lucide-react';

interface TemplateRowProps {
  slug: string;
  title: string;
  type: string;
  module: string;
  bestFor: string;
  reviewedDate?: string;
  version?: string;
  isInPlan: boolean;
  onTogglePlan: () => void;
  onPreview: () => void;
}

export function TemplateRow({
  slug,
  title,
  type,
  module,
  bestFor,
  reviewedDate,
  version,
  isInPlan,
  onTogglePlan,
  onPreview,
}: TemplateRowProps) {
  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl px-4 py-3 hover:border-theme-border-2 transition-all group">
      <div className="flex items-center gap-4">
        {/* Icon tile */}
        <div className="w-10 h-10 rounded-lg bg-theme-surface-2 border border-theme-border-2 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-theme-text-2" strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium text-theme-text-1 mb-1.5 line-clamp-1">
            {title}
          </h3>

          {/* Max 2 chips, lighter styling */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2 py-0.5 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[11px] text-theme-text-3 font-medium capitalize">
              {type}
            </span>
            <span className="px-2 py-0.5 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[11px] text-theme-text-3">
              {module}
            </span>
          </div>

          <p className="text-[12px] text-theme-text-3 line-clamp-1">
            best for: {bestFor}
          </p>
        </div>

        {/* Meta - lighter, less dominant */}
        {(reviewedDate || version) && (
          <div className="text-right text-[12px] text-theme-text-3 flex-shrink-0 hidden md:block min-w-[140px]">
            {reviewedDate && `reviewed ${reviewedDate}`}
            {reviewedDate && version && ' · '}
            {version && `v${version}`}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to={`/resources/templates/${slug}/customize`}
            className="px-4 py-2 bg-theme-accent text-white text-[13px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 whitespace-nowrap inline-flex items-center gap-2"
          >
            <Settings className="w-3.5 h-3.5" />
            Customize
          </Link>
          <button
            onClick={onPreview}
            className="px-4 py-2 bg-theme-surface-1 border border-theme-border-1 text-theme-text-1 text-[13px] font-medium rounded-lg hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 whitespace-nowrap"
          >
            Preview
          </button>
          <button
            onClick={onTogglePlan}
            className={`px-3 py-2 border rounded-lg text-[13px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
              isInPlan
                ? 'bg-theme-surface-2 border-theme-border-2 text-theme-text-2'
                : 'border-theme-border-1 text-theme-text-2 hover:bg-theme-surface-2'
            }`}
            title={isInPlan ? 'Saved' : 'Save'}
          >
            {isInPlan ? <Check className="w-4 h-4" strokeWidth={2} /> : <Plus className="w-4 h-4" strokeWidth={2} />}
          </button>
        </div>
      </div>
    </div>
  );
}