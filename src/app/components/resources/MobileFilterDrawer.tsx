import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'library' | 'templates';
  // Library filters
  typeFilters: string[];
  setTypeFilters: (values: string[]) => void;
  topicFilters: string[];
  setTopicFilters: (values: string[]) => void;
  stageFilters: string[];
  setStageFilters: (values: string[]) => void;
  // Template filters
  templateModuleFilters: string[];
  setTemplateModuleFilters: (values: string[]) => void;
  templateTypeFilters: string[];
  setTemplateTypeFilters: (values: string[]) => void;
  // Options
  typeOptions: string[];
  topicOptions: string[];
  stageOptions: string[];
  moduleOptions: string[];
  templateTypeOptions: string[];
  onClearAll: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  activeTab,
  typeFilters,
  setTypeFilters,
  topicFilters,
  setTopicFilters,
  stageFilters,
  setStageFilters,
  templateModuleFilters,
  setTemplateModuleFilters,
  templateTypeFilters,
  setTemplateTypeFilters,
  typeOptions,
  topicOptions,
  stageOptions,
  moduleOptions,
  templateTypeOptions,
  onClearAll,
}: MobileFilterDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const toggleOption = (selected: string[], option: string, setter: (values: string[]) => void) => {
    setter(
      selected.includes(option)
        ? selected.filter(o => o !== option)
        : [...selected, option]
    );
  };

  const activeFiltersCount = activeTab === 'library'
    ? typeFilters.length + topicFilters.length + stageFilters.length
    : templateModuleFilters.length + templateTypeFilters.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-theme-surface-1 rounded-t-2xl shadow-theme-3 max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-theme-border-2">
              <h2 className="text-[17px] font-semibold text-theme-text-1">
                Filter {activeTab === 'library' ? 'resources' : 'templates'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-theme-text-3 hover:text-theme-text-1 transition-colors rounded-lg hover:bg-theme-surface-2"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Sections - scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {activeTab === 'library' ? (
                <>
                  {/* Type */}
                  <FilterSection
                    title="Type"
                    options={typeOptions}
                    selected={typeFilters}
                    onToggle={(option) => toggleOption(typeFilters, option, setTypeFilters)}
                    onClear={() => setTypeFilters([])}
                  />

                  {/* Topic */}
                  <FilterSection
                    title="Topic"
                    options={topicOptions}
                    selected={topicFilters}
                    onToggle={(option) => toggleOption(topicFilters, option, setTopicFilters)}
                    onClear={() => setTopicFilters([])}
                  />

                  {/* Stage */}
                  <FilterSection
                    title="Stage"
                    options={stageOptions}
                    selected={stageFilters}
                    onToggle={(option) => toggleOption(stageFilters, option, setStageFilters)}
                    onClear={() => setStageFilters([])}
                  />
                </>
              ) : (
                <>
                  {/* Module */}
                  <FilterSection
                    title="Module"
                    options={moduleOptions}
                    selected={templateModuleFilters}
                    onToggle={(option) => toggleOption(templateModuleFilters, option, setTemplateModuleFilters)}
                    onClear={() => setTemplateModuleFilters([])}
                  />

                  {/* Type */}
                  <FilterSection
                    title="Type"
                    options={templateTypeOptions}
                    selected={templateTypeFilters}
                    onToggle={(option) => toggleOption(templateTypeFilters, option, setTemplateTypeFilters)}
                    onClear={() => setTemplateTypeFilters([])}
                  />
                </>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-theme-border-2 bg-theme-surface-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClearAll();
                    onClose();
                  }}
                  className="flex-1 px-4 py-3 bg-theme-surface-1 border border-theme-border-1 text-theme-text-2 text-[15px] font-medium rounded-lg hover:bg-theme-surface-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                  disabled={activeFiltersCount === 0}
                >
                  Clear all
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-theme-accent text-white text-[15px] font-medium rounded-lg hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 shadow-theme-2"
                >
                  Apply filters
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Filter Section Component
interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  onClear: () => void;
}

function FilterSection({ title, options, selected, onToggle, onClear }: FilterSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-medium text-theme-text-1">
          {title}
        </h3>
        {selected.length > 0 && (
          <button
            onClick={onClear}
            className="text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded px-2 py-1"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map(option => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`px-4 py-2.5 text-[14px] font-medium rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                isSelected
                  ? 'bg-theme-accent text-white border-theme-accent'
                  : 'bg-theme-surface-1 text-theme-text-2 border-theme-border-1 hover:bg-theme-surface-2 hover:text-theme-text-1'
              }`}
              style={{ minHeight: '44px' }}
            >
              <span className="flex items-center gap-2">
                {isSelected && <Check className="w-4 h-4" strokeWidth={2.5} />}
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
