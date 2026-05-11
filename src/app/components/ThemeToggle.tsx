import { useTheme } from '@/app/context/ThemeContext';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const options = [
    { value: 'system' as const, label: 'System', icon: Monitor },
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
  ];

  // Determine which icon to show (for desktop icon-only button)
  const getDisplayIcon = () => {
    if (theme === 'system') {
      // Show the actual resolved theme icon
      return resolvedTheme === 'dark' ? Moon : Sun;
    }
    return theme === 'dark' ? Moon : Sun;
  };

  const DisplayIcon = getDisplayIcon();
  const currentLabel = theme === 'system' 
    ? `${resolvedTheme === 'dark' ? 'Dark' : 'Light'} mode (System)`
    : `${theme === 'light' ? 'Light' : 'Dark'} mode`;

  return (
    <div className="relative" ref={menuRef}>
      {/* Desktop: Icon-only button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-lg transition-all duration-200 text-theme-text-3 hover:text-theme-text-1 hover:bg-theme-surface-1 focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
        aria-label={currentLabel}
        title={currentLabel}
      >
        <DisplayIcon className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-theme-surface-3 border border-theme-border-1 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="p-1.5">
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-all ${
                    theme === option.value
                      ? 'bg-theme-accent-soft text-theme-accent'
                      : 'text-theme-text-2 hover:bg-theme-surface-1 hover:text-theme-text-1'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{option.label}</span>
                  {theme === option.value && (
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="px-4 py-3 border-t border-theme-border-2 bg-theme-surface-2">
            <p className="text-[11px] text-theme-text-3 leading-[1.5]">
              Affects readability and printing. System follows your device settings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
