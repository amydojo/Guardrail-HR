import { Link } from 'react-router';
import { ArrowRight, Download, FileText, CheckSquare, BookOpen, FileCheck, Calculator } from 'lucide-react';
import { SaveButton } from '@/app/components/SaveButton';

interface ResourceCardProps {
  slug: string;
  title: string;
  description: string;
  type: 'checklist' | 'template' | 'guide' | 'policy' | 'calculator';
  status?: 'updated' | 'new';
  readTime?: string;
  format?: string;
  fromResults?: boolean;
  featured?: boolean;
  onDownload?: (e: React.MouseEvent) => void;
  category?: string;
}

const typeIcons = {
  checklist: CheckSquare,
  template: FileText,
  guide: BookOpen,
  policy: FileCheck,
  calculator: Calculator,
};

export function ResourceCard({
  slug,
  title,
  description,
  type,
  status,
  readTime,
  format,
  fromResults,
  featured = false,
  onDownload,
  category,
}: ResourceCardProps) {
  const Icon = typeIcons[type];

  return (
    <Link
      to={`/resources/${slug}${fromResults ? '?from=results' : ''}`}
      className="group block bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 shadow-theme-1 transition-all duration-200 lg:hover:-translate-y-[1px] lg:hover:bg-theme-surface-1 lg:hover:border-theme-border-1 lg:hover:shadow-theme-2 active:bg-theme-surface-2 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg"
    >
      {/* Icon tile + Status */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center justify-center w-12 h-12 bg-theme-accent/8 rounded-xl border border-theme-accent/15">
          <Icon className="w-6 h-6 text-theme-accent" strokeWidth={1.5} />
        </div>
        {status && (
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
              status === 'updated'
                ? 'bg-theme-accent/8 text-theme-accent/90'
                : 'bg-emerald-500/8 text-emerald-400/90'
            }`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-[17px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[14px] text-theme-text-3 leading-[1.65] mb-5">
        {description}
      </p>

      {/* Meta row: time + format */}
      {(readTime || format) && (
        <div className="flex items-center gap-2 mb-5">
          {readTime && (
            <span className="text-[13px] text-theme-text-3">
              {readTime}
            </span>
          )}
          {readTime && format && (
            <span className="text-theme-text-3">•</span>
          )}
          {format && (
            <span className="text-[13px] text-theme-text-3 uppercase tracking-wide">
              {format}
            </span>
          )}
        </div>
      )}

      {/* Actions row */}
      <div className="pt-4 border-t border-theme-border-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[13px] text-theme-accent font-medium transition-all lg:group-hover:gap-2">
          View
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </span>
        <div className="flex items-center gap-2">
          {onDownload && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDownload(e);
              }}
              className="inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          )}
          <SaveButton
            type="resource"
            slug={slug}
            title={title}
            category={category}
            variant="compact"
          />
        </div>
      </div>
    </Link>
  );
}