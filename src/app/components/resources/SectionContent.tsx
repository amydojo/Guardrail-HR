import { ResourceSection } from '@/app/data';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SectionContentProps {
  section: ResourceSection;
}

export function SectionContent({ section }: SectionContentProps) {
  const [expandedSubsections, setExpandedSubsections] = useState<number[]>([0]); // First subsection open by default
  const [showAllItems, setShowAllItems] = useState(false);

  // Empty state
  if (!section.content) {
    return (
      <div className="bg-theme-surface-1/30 rounded-[16px] border border-theme-border-2 p-8 text-center">
        <p className="text-[15px] text-theme-text-3 italic">Content coming soon.</p>
      </div>
    );
  }

  const toggleSubsection = (index: number) => {
    setExpandedSubsections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Progressive disclosure for long lists (show first 10 items)
  const topLevelItems = section.content.items || [];
  const ITEMS_THRESHOLD = 10;
  const displayedItems = showAllItems ? topLevelItems : topLevelItems.slice(0, ITEMS_THRESHOLD);
  const hasMoreItems = topLevelItems.length > ITEMS_THRESHOLD;
  const remainingCount = topLevelItems.length - ITEMS_THRESHOLD;

  return (
    <div className="space-y-5">
      {/* 1) Overview block: calm, readable card */}
      {section.content.overview && (
        <div className="bg-theme-surface-1/40 rounded-[16px] border border-theme-border-2 p-6">
          <p className="text-[15px] text-theme-text-1 leading-[1.7]">
            {section.content.overview}
          </p>
        </div>
      )}

      {/* 2) Items list: readable, not dense */}
      {topLevelItems.length > 0 && (
        <div className="space-y-3">
          <ul className="space-y-3.5">
            {displayedItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3.5 text-[15px] text-theme-text-1 leading-[1.65]">
                <span className="text-theme-accent mt-1.5 flex-shrink-0 text-[9px]">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          {/* Show more control */}
          {hasMoreItems && !showAllItems && (
            <button
              onClick={() => setShowAllItems(true)}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-theme-accent hover:text-theme-accent-hover font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Show {remainingCount} more {remainingCount === 1 ? 'item' : 'items'}
            </button>
          )}
          
          {/* Show less control */}
          {hasMoreItems && showAllItems && (
            <button
              onClick={() => setShowAllItems(false)}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Show less
            </button>
          )}
        </div>
      )}

      {/* 3) Subsections as accordions */}
      {section.content.subsections && section.content.subsections.length > 0 && (
        <div className="space-y-2.5">
          {section.content.subsections.map((subsection, idx) => {
            const isExpanded = expandedSubsections.includes(idx);
            const itemCount = subsection.items?.length || 0;
            
            return (
              <div
                key={idx}
                className="bg-theme-surface-1/40 rounded-[16px] border border-theme-border-2 overflow-hidden transition-all hover:border-theme-border-1"
              >
                {/* Accordion header */}
                <button
                  onClick={() => toggleSubsection(idx)}
                  className="w-full flex items-center justify-between p-5 hover:bg-theme-surface-1/70 transition-colors text-left group focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                >
                  <div className="flex-1 pr-4">
                    <h4 className="text-[15px] font-medium text-theme-text-2 mb-1 leading-tight group-hover:text-theme-text-1 transition-colors">
                      {subsection.title}
                    </h4>
                    {itemCount > 0 && !isExpanded && (
                      <span className="text-[12px] text-theme-text-3">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4.5 h-4.5 text-theme-icon-2 flex-shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Accordion content - open state */}
                {isExpanded && (
                  <div className="border-t border-theme-border-2">
                    <div className="p-5 space-y-4">
                      {subsection.content && (
                        <p className="text-[15px] text-theme-text-1 leading-[1.7]">
                          {subsection.content}
                        </p>
                      )}
                      {subsection.items && subsection.items.length > 0 && (
                        <ul className="space-y-3">
                          {subsection.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-3.5 text-[15px] text-theme-text-2 leading-[1.65]"
                            >
                              <span className="text-theme-accent/50 mt-1.5 flex-shrink-0 text-[9px]">▸</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
