import { X } from 'lucide-react';

interface ChangedAnswer {
  questionId: string;
  questionText: string;
  oldAnswer: boolean;
  newAnswer: boolean;
}

interface ScoreChangePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  currentScore: number;
  projectedScore: number;
  changedAnswers: ChangedAnswer[];
  onConfirm: () => void;
}

export function ScoreChangePreview({
  isOpen,
  onClose,
  currentScore,
  projectedScore,
  changedAnswers,
  onConfirm
}: ScoreChangePreviewProps) {
  if (!isOpen) return null;

  const scoreDelta = projectedScore - currentScore;
  const isImprovement = scoreDelta > 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 animate-fadeIn flex items-center justify-center p-5"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-theme-surface-elevated rounded-[24px] border border-theme-border-1 max-w-[360px] w-full max-h-[80vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-theme-border-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[20px] font-semibold">Score change preview</h3>
              <button
                onClick={onClose}
                className="p-1 -mr-1 hover:bg-theme-surface-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                <X className="w-5 h-5 text-theme-icon-2" />
              </button>
            </div>
            <p className="text-[14px] text-theme-text-3">
              Review changes before updating your score
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {/* Score comparison */}
            <div className="bg-theme-surface-1 rounded-[20px] p-5 border border-theme-border-2 mb-5">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="text-center">
                  <div className="text-[13px] text-theme-text-3 mb-1">Current</div>
                  <div className="text-[32px] font-semibold">{currentScore}</div>
                </div>
                <div className="text-[24px] text-theme-text-3">→</div>
                <div className="text-center">
                  <div className="text-[13px] text-theme-text-3 mb-1">Projected</div>
                  <div className="text-[32px] font-semibold">{projectedScore}</div>
                </div>
              </div>
              <div className="text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-[13px] font-medium ${
                  isImprovement 
                    ? 'bg-green-900/20 text-green-600'
                    : scoreDelta < 0
                    ? 'bg-red-900/20 text-red-600'
                    : 'bg-theme-chip-bg text-theme-chip-text'
                }`}>
                  {isImprovement ? '+' : ''}{scoreDelta} points
                </span>
              </div>
            </div>

            {/* Changed answers */}
            <div>
              <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-3">
                Changed answers ({changedAnswers.length})
              </h4>
              <div className="space-y-2">
                {changedAnswers.map((change) => (
                  <div
                    key={change.questionId}
                    className="bg-theme-surface-1 rounded-[14px] p-3 border border-theme-border-2"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-[12px] font-medium text-theme-text-3 mt-0.5">
                        {change.questionId}
                      </span>
                      <p className="text-[13px] text-theme-text-1 leading-snug flex-1">
                        {change.questionText}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <span className="px-2 py-0.5 bg-theme-chip-bg text-theme-chip-text rounded">
                        {change.oldAnswer ? 'Yes' : 'No'}
                      </span>
                      <span className="text-theme-text-3">→</span>
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        change.newAnswer 
                          ? 'bg-blue-900/20 text-blue-400'
                          : 'bg-theme-chip-bg text-theme-chip-text'
                      }`}>
                        {change.newAnswer ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-5 border-t border-theme-border-2 space-y-3">
            <button
              onClick={onConfirm}
              className="w-full px-6 py-3.5 rounded-[16px] bg-theme-accent text-theme-text-1 text-[15px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Update score
            </button>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 rounded-[16px] border border-theme-border-1 text-[15px] font-medium text-theme-text-2 hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
