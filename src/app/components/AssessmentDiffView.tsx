import { ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface AnswerChange {
  questionId: string;
  questionText: string;
  oldAnswer: string;
  newAnswer: string;
}

interface DriverChange {
  driverId: string;
  driverTitle: string;
  status: 'previously-flagged' | 'newly-flagged' | 'no-longer-flagged';
}

interface DiffViewProps {
  oldScore: number;
  newScore: number;
  oldDate: number;
  newDate: number;
  answerChanges: AnswerChange[];
  driverChanges: DriverChange[];
  onClose: () => void;
}

export function AssessmentDiffView({
  oldScore,
  newScore,
  oldDate,
  newDate,
  answerChanges,
  driverChanges,
  onClose
}: DiffViewProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    answers: false,
    drivers: false,
    score: true // Score section open by default
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const previouslyFlagged = driverChanges.filter(d => d.status === 'previously-flagged');
  const newlyFlagged = driverChanges.filter(d => d.status === 'newly-flagged');
  const noLongerFlagged = driverChanges.filter(d => d.status === 'no-longer-flagged');

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen px-5 py-12 flex items-start justify-center">
        <div className="w-full max-w-[760px] bg-theme-bg rounded-[20px] border border-theme-border-2">
          {/* Header */}
          <div className="px-6 md:px-8 py-6 border-b border-theme-border-2">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-[20px] md:text-[22px] font-semibold mb-2">
                  Compare assessment runs
                </h2>
                <p className="text-[14px] text-theme-text-3">
                  {formatDate(oldDate)} → {formatDate(newDate)}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                Close
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Score Movement */}
            <div>
              <button
                onClick={() => toggleSection('score')}
                className="w-full flex items-center justify-between text-left mb-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                <div>
                  <h3 className="text-[16px] font-medium text-theme-text-1 mb-1">
                    Score movement
                  </h3>
                  <p className="text-[13px] text-theme-text-3">
                    {oldScore === newScore ? 'Score unchanged' : '1 change'}
                  </p>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-theme-icon-2 transition-transform duration-300 ${
                    expandedSections['score'] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  expandedSections['score'] ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-theme-surface-elevated rounded-[12px] border border-theme-border-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[28px] font-semibold text-theme-text-2">
                        {oldScore}
                      </span>
                      <ArrowRight className="w-4 h-4 text-theme-icon-2 flex-shrink-0" />
                      <span className="text-[28px] font-semibold text-theme-text-1">
                        {newScore}
                      </span>
                    </div>
                    <p className="text-[13px] text-theme-text-3">
                      Score changed from {oldScore} to {newScore}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Answers Updated */}
            {answerChanges.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('answers')}
                  className="w-full flex items-center justify-between text-left mb-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                >
                  <div>
                    <h3 className="text-[16px] font-medium text-theme-text-1 mb-1">
                      Answers updated
                    </h3>
                    <p className="text-[13px] text-theme-text-3">
                      {answerChanges.length} {answerChanges.length === 1 ? 'change' : 'changes'}
                    </p>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-theme-icon-2 transition-transform duration-300 ${
                      expandedSections['answers'] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedSections['answers'] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-3">
                    {answerChanges.map((change) => (
                      <div 
                        key={change.questionId}
                        className="p-5 bg-theme-surface-elevated rounded-[12px] border border-theme-border-2"
                      >
                        <p className="text-[14px] text-theme-text-1 mb-4">
                          {change.questionText}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <span className="text-[12px] text-theme-text-3 mt-1 flex-shrink-0">
                              Previous:
                            </span>
                            <p className="text-[13px] text-theme-text-3">
                              {change.oldAnswer}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-[12px] text-theme-text-3 mt-1 flex-shrink-0">
                              Current:
                            </span>
                            <p className="text-[13px] text-theme-text-1">
                              {change.newAnswer}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Drivers Changed */}
            {driverChanges.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('drivers')}
                  className="w-full flex items-center justify-between text-left mb-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                >
                  <div>
                    <h3 className="text-[16px] font-medium text-theme-text-1 mb-1">
                      Drivers changed
                    </h3>
                    <p className="text-[13px] text-theme-text-3">
                      {driverChanges.length} {driverChanges.length === 1 ? 'change' : 'changes'}
                    </p>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-theme-icon-2 transition-transform duration-300 ${
                      expandedSections['drivers'] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedSections['drivers'] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Previously Flagged (Still Present) */}
                    {previouslyFlagged.length > 0 && (
                      <div>
                        <p className="text-[12px] text-theme-text-3 mb-2">
                          Previously flagged
                        </p>
                        <div className="space-y-2">
                          {previouslyFlagged.map((driver) => (
                            <div 
                              key={driver.driverId}
                              className="px-4 py-3 bg-theme-surface-elevated rounded-[10px] border border-theme-border-2"
                            >
                              <p className="text-[14px] text-theme-text-2">
                                {driver.driverTitle}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Newly Flagged */}
                    {newlyFlagged.length > 0 && (
                      <div>
                        <p className="text-[12px] text-theme-text-3 mb-2">
                          Newly flagged
                        </p>
                        <div className="space-y-2">
                          {newlyFlagged.map((driver) => (
                            <div 
                              key={driver.driverId}
                              className="px-4 py-3 bg-theme-surface-elevated rounded-[10px] border border-theme-border-2"
                            >
                              <p className="text-[14px] text-theme-text-1">
                                {driver.driverTitle}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No Longer Flagged */}
                    {noLongerFlagged.length > 0 && (
                      <div>
                        <p className="text-[12px] text-theme-text-3 mb-2">
                          No longer flagged
                        </p>
                        <div className="space-y-2">
                          {noLongerFlagged.map((driver) => (
                            <div 
                              key={driver.driverId}
                              className="px-4 py-3 bg-theme-bg rounded-[10px] border border-theme-border-2"
                            >
                              <p className="text-[14px] text-theme-text-3">
                                {driver.driverTitle}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {answerChanges.length === 0 && driverChanges.length === 0 && oldScore === newScore && (
              <div className="py-12 text-center">
                <p className="text-[15px] text-theme-text-3">
                  No changes detected between runs
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-5 border-t border-theme-border-2">
            <button
              onClick={onClose}
              className="w-full md:w-auto px-6 py-2.5 rounded-[12px] bg-theme-surface-2 text-[14px] font-medium text-theme-text-2 hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Close comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
