import { X } from 'lucide-react';
import { QuestionMapping } from '@/app/types/drivers';

interface RelatedAnswersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  driverTitle: string;
  interpretation: string;
  questions: QuestionMapping[];
  onGoToQuestion: (questionId: string) => void;
}

export function RelatedAnswersDrawer({
  isOpen,
  onClose,
  driverTitle,
  interpretation,
  questions,
  onGoToQuestion
}: RelatedAnswersDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slideUp">
        <div className="mx-auto max-w-[390px] bg-theme-surface-elevated rounded-t-[28px] border-t border-theme-border-1 max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-theme-border-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[17px] font-semibold">Related answers</h3>
              <button
                onClick={onClose}
                className="p-1 -mr-1 hover:bg-theme-surface-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                <X className="w-5 h-5 text-theme-icon-2" />
              </button>
            </div>
            <p className="text-[13px] text-theme-text-3">{driverTitle}</p>
            <p className="text-[13px] text-theme-text-3 mt-1">
              These responses contributed to this risk signal.
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {/* Interpretation */}
            <div className="mb-6 p-4 bg-theme-surface-1 rounded-[16px] border border-theme-border-2">
              <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-2">
                How this was interpreted
              </h4>
              <p className="text-[14px] text-theme-text-2 leading-relaxed">
                {interpretation}
              </p>
            </div>

            {/* Question list */}
            <div className="space-y-3">
              {questions.map((q) => (
                <div
                  key={q.questionId}
                  className="bg-theme-surface-1 rounded-[16px] p-4 border border-theme-border-2"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[13px] font-medium text-theme-text-3">
                          {q.questionId}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          q.status === 'contributing' 
                            ? 'bg-yellow-900/20 text-yellow-600'
                            : q.status === 'positive'
                            ? 'bg-green-900/20 text-green-600'
                            : 'bg-theme-chip-bg text-theme-chip-text'
                        }`}>
                          {q.status === 'contributing' ? 'Contributing' : q.status === 'positive' ? 'Positive' : 'Neutral'}
                        </span>
                      </div>
                      <p className="text-[14px] text-theme-text-1 leading-snug mb-2">
                        {q.questionText}
                      </p>
                      <div className="flex items-center gap-3 text-[13px]">
                        <span className="text-theme-text-3">Your answer:</span>
                        <span className={`font-medium ${
                          q.userAnswer === true ? 'text-theme-text-1' : 'text-theme-text-2'
                        }`}>
                          {q.userAnswer === true ? 'Yes' : q.userAnswer === false ? 'No' : 'Not answered'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      onGoToQuestion(q.questionId);
                      onClose();
                    }}
                    className="w-full px-4 py-2 rounded-[12px] border border-theme-border-1 text-[13px] font-medium text-theme-text-2 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                  >
                    View question →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
