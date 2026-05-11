import { X } from 'lucide-react';

interface SaveExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExit: () => void;
}

export function SaveExitModal({ isOpen, onClose, onSaveExit }: SaveExitModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[420px] bg-theme-surface-elevated rounded-[20px] border border-theme-border-2 p-6 md:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-[20px] font-semibold">
              Save your progress?
            </h2>
            <button
              onClick={onClose}
              className="text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <p className="text-[14px] text-theme-text-2 leading-relaxed mb-6">
            Your answers are saved automatically. You can return and continue anytime.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={onSaveExit}
              className="w-full px-5 py-3 rounded-[14px] bg-theme-surface-1 text-theme-text-1 text-[15px] font-medium hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Save & exit
            </button>
            <button
              onClick={onClose}
              className="w-full px-5 py-3 text-[14px] text-theme-text-2 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Continue assessment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
