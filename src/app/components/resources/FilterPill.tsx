import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface FilterPillProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
}

export function FilterPill({ label, options, selected, onChange, multiSelect = true }: FilterPillProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (option: string) => {
    if (multiSelect) {
      if (selected.includes(option)) {
        onChange(selected.filter(s => s !== option));
      } else {
        onChange([...selected, option]);
      }
    } else {
      onChange([option]);
      setIsOpen(false);
    }
  };

  const hasSelection = selected.length > 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg ${
          hasSelection
            ? 'bg-theme-accent/10 text-theme-accent border border-theme-accent/20'
            : 'bg-theme-surface-elevated text-theme-text-3 border border-theme-border-2 hover:bg-theme-surface-1 hover:border-theme-border-1'
        }`}
      >
        {label}
        {hasSelection && (
          <span className="flex items-center justify-center w-5 h-5 bg-theme-accent/20 rounded-full text-[11px]">
            {selected.length}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-theme-surface-elevated border border-theme-border-2 rounded-[16px] shadow-xl shadow-black/40 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                onClick={() => handleToggle(option)}
                className={`w-full px-4 py-2.5 text-left text-[14px] transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'text-theme-accent bg-theme-accent/5'
                    : 'text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-2'
                }`}
              >
                {option}
                {isSelected && (
                  <span className="text-theme-accent">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ResetFilterButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function ResetFilterButton({ onClick, disabled }: ResetFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg ${
        disabled
          ? 'bg-theme-surface-elevated text-theme-text-disabled border border-theme-border-2 cursor-not-allowed'
          : 'bg-theme-surface-elevated text-theme-text-3 border border-theme-border-2 hover:bg-theme-surface-1 hover:border-theme-border-1'
      }`}
    >
      Reset
    </button>
  );
}
