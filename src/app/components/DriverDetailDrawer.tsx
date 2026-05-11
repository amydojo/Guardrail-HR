import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router';
import { QuestionMapping } from '@/app/types/drivers';

interface Driver {
  id: string;
  title: string;
  summary: string;
  whyThisShowedUp: string;
  contributingThemes: string[];
  relatedQuestions: string[];
}

interface Action {
  id: string;
  title: string;
  effort: string;
  impact: string;
}

interface DriverDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
  questions: QuestionMapping[];
  relatedActions: Action[];
  onGoToQuestion: (questionId: string) => void;
}

export function DriverDetailDrawer({
  isOpen,
  onClose,
  driver,
  questions,
  relatedActions,
  onGoToQuestion
}: DriverDetailDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-theme-bg border-t border-theme-border-1 rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-theme-border-1 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-6 xl:px-8 pb-8 pt-4">
          <div className="mx-auto max-w-[720px]">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-1">
                  {driver.title}
                </h2>
                <p className="text-[14px] text-theme-text-3">
                  {driver.summary}
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 rounded-lg hover:bg-theme-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              >
                <X className="w-5 h-5 text-theme-icon-2" />
              </button>
            </div>

            {/* Why this matters */}
            <div className="mb-6">
              <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                Why this matters
              </h3>
              <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-3">
                {driver.whyThisShowedUp}
              </p>
              <ul className="space-y-2">
                {driver.contributingThemes.map((theme, idx) => (
                  <li key={idx} className="flex gap-2 text-[14px] text-theme-text-2">
                    <span className="text-theme-text-3">•</span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What triggered this */}
            <div className="mb-6">
              <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                What triggered this
              </h3>
              <ul className="space-y-2">
                {driver.contributingThemes.map((theme, idx) => (
                  <li key={idx} className="flex gap-2 text-[14px] text-theme-text-2">
                    <span className="text-theme-text-3">•</span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related answers */}
            {questions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                  Related answers
                </h3>
                <div className="space-y-2">
                  {questions.map((q) => (
                    <div
                      key={q.questionId}
                      className="flex items-center justify-between px-4 py-3 bg-theme-surface-1 rounded-xl border border-theme-border-1"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="text-[14px] text-theme-text-2 mb-1">
                          {q.questionText}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] text-theme-text-3">
                            {q.section}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-theme-chip-bg border border-theme-chip-border text-[11px] text-theme-chip-text">
                            {q.userAnswer === false ? 'No' : 'Yes'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onGoToQuestion(q.questionId)}
                        className="inline-flex items-center gap-1 text-[13px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded-lg"
                      >
                        Go to question
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended actions */}
            {relatedActions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                  Recommended actions
                </h3>
                <div className="space-y-2">
                  {relatedActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        onClose();
                        const element = document.getElementById('recommended-actions');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-theme-surface-1 rounded-xl border border-theme-border-1 hover:bg-theme-surface-2 hover:border-theme-border-2 transition-all text-left group focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                    >
                      <div className="flex-1">
                        <div className="text-[14px] text-theme-text-1 mb-1">{action.title}</div>
                        <div className="flex gap-2">
                          <span className="text-[12px] text-theme-text-3">{action.effort} effort</span>
                          <span className="text-[12px] text-theme-text-3">·</span>
                          <span className="text-[12px] text-theme-text-3">{action.impact} impact</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-theme-icon-2 group-hover:text-theme-icon-1 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended resources */}
            <div>
              <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3">
                Recommended resources
              </h3>
              <Link
                to="/resources?from=results"
                className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 rounded-lg"
              >
                View matched resources
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
