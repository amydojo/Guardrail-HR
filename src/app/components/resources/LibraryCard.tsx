import { Link } from 'react-router';
import { FileText, FileSpreadsheet, File, Calculator, Plus, Check, ArrowRight } from 'lucide-react';

interface LibraryCardProps {
  slug: string;
  title: string;
  type: string;
  topics: string[];
  bestFor: string;
  readTime?: string;
  format?: string;
  isInPlan: boolean;
  onTogglePlan: () => void;
}

export function LibraryCard({
  slug,
  title,
  type,
  topics,
  bestFor,
  readTime,
  format,
  isInPlan,
  onTogglePlan,
}: LibraryCardProps) {
  // Icon based on format
  const getIcon = () => {
    switch (format?.toUpperCase()) {
      case 'XLS':
      case 'XLSX':
        return FileSpreadsheet;
      case 'DOC':
      case 'DOCX':
        return File;
      case 'TOOL':
        return Calculator;
      default:
        return FileText;
    }
  };

  const Icon = getIcon();

  // Show 1 type chip + 1 topic chip + +N chip if more topics exist
  const visibleTopics = topics.slice(0, 1);
  const remainingCount = topics.length - 1;

  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl p-5 hover:border-theme-border-2 transition-all group">
      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-theme-surface-2 border border-theme-border-2 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-theme-text-2" strokeWidth={1.5} />
        </div>
        <h3 className="text-[15px] font-medium text-theme-text-1 line-clamp-2 leading-snug flex-1">
          {title}
        </h3>
      </div>

      {/* Chips: 1 type + 1 topic + +N if more */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="px-2 py-0.5 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[11px] text-theme-text-3 font-medium capitalize">
          {type}
        </span>
        {visibleTopics.map((topic) => (
          <span
            key={topic}
            className="px-2 py-0.5 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[11px] text-theme-text-3"
          >
            {topic}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="px-2 py-0.5 bg-theme-surface-2 border border-theme-border-2 rounded-md text-[11px] text-theme-text-3">
            +{remainingCount}
          </span>
        )}
      </div>

      {/* Best for */}
      <p className="text-[13px] text-theme-text-3 mb-3 line-clamp-1">
        best for: {bestFor}
      </p>

      {/* Meta */}
      {(readTime || format) && (
        <p className="text-[12px] text-theme-text-3 mb-4">
          {readTime}
          {readTime && format && ' · '}
          {format}
        </p>
      )}

      {/* Footer divider */}
      <div className="border-t border-theme-border-2/60 mt-4 pt-3">
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to={`/resources/${slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-theme-surface-1 border border-theme-border-1 text-theme-text-2 text-[13px] font-medium rounded-lg hover:bg-theme-surface-2 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1"
          >
            View
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
          <button
            onClick={onTogglePlan}
            className={`px-3 py-2 border rounded-lg text-[13px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1 ${
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