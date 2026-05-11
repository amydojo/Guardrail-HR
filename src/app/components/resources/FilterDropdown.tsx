import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
          selected.length > 0
            ? 'bg-theme-surface-1 border-theme-accent-border text-theme-text-1'
            : 'bg-theme-surface-1 text-theme-text-2 border-theme-border-1 hover:bg-theme-surface-2'
        }`}
        aria-label={`Filter by ${label}`}
        aria-expanded={isOpen}
      >
        {label}
        {selected.length > 0 && (
          <span className="ml-0.5 px-1.5 py-0.5 bg-theme-accent-soft text-theme-accent rounded text-[11px] font-semibold">
            {selected.length}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 min-w-[180px] bg-theme-surface-1 border border-theme-border-1 rounded-lg shadow-theme-2 py-1 z-40 max-h-[280px] overflow-auto">
          {selected.length > 0 && (
            <>
              <button
                onClick={clearAll}
                className="w-full px-3 py-2 text-left text-[13px] text-theme-accent hover:bg-theme-surface-2 transition-colors flex items-center gap-2 focus:outline-none focus:bg-theme-surface-2 font-medium"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
                Clear all
              </button>
              <div className="border-t border-theme-border-2 my-1" />
            </>
          )}
          {options.length === 0 ? (
            <div className="px-3 py-2 text-[13px] text-theme-text-3">No options</div>
          ) : (
            options.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className="w-full px-3 py-2 text-left text-[13px] text-theme-text-2 hover:bg-theme-surface-2 transition-colors flex items-center gap-2 focus:outline-none focus:bg-theme-surface-2"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    selected.includes(option)
                      ? 'bg-theme-accent border-theme-accent'
                      : 'border-theme-border-1'
                  }`}
                >
                  {selected.includes(option) && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
                </div>
                {option}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
