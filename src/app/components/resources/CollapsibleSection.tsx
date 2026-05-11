import { ChevronDown } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  summary?: string;
  effort?: 'low' | 'medium' | 'high';
  children: ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function CollapsibleSection({
  title,
  summary,
  effort,
  children,
  defaultOpen = false,
  onToggle,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  const effortColors = {
    low: 'bg-theme-success-bg border-theme-success-border text-theme-success',
    medium: 'bg-theme-warning-bg border-theme-warning-border text-theme-warning',
    high: 'bg-theme-danger-bg border-theme-danger-border text-theme-danger',
  };

  return (
    <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 overflow-hidden transition-all duration-200">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-inset"
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight">{title}</h3>
            {effort && (
              <span className={`px-2.5 py-1 border rounded-lg text-[11px] font-medium uppercase tracking-wide ${effortColors[effort]}`}>
                {effort}
              </span>
            )}
          </div>
          {summary && (
            <p className="text-[14px] text-theme-text-3 leading-[1.65]">{summary}</p>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-theme-icon-2 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 text-[14px] text-theme-text-2 leading-[1.65] space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
