import { useState } from 'react';
import { ChevronLeft, Lock } from 'lucide-react';

interface Question {
  id: string;
  section: string;
  text: string;
  weight: number;
  conditional?: 'commissions' | 'tipped' | 'piece-rate';
}

interface AssessmentProps {
  onComplete: (score: number, answers: Record<string, boolean>) => void;
  businessType?: 'commissions' | 'tipped' | 'piece-rate' | 'none';
  initialAnswers?: Record<string, boolean>;
  reviewMode?: boolean;
  onReturnToResults?: () => void;
  editedAnswers?: Record<string, boolean>;
  onAnswerEdit?: (questionId: string, value: boolean) => void;
  onCancelReview?: () => void;
  isReassessment?: boolean;
  lastCompletedDate?: number;
  targetQuestionIndex?: number | null;
}

const sections = [
  'Pay rates, job type, and overtime',
  'Breaks',
  'Timekeeping and scheduling',
  'Paydays and records',
  'Independent contractors',
  'Additional questions'
];

const questions: Question[] = [
  // SECTION 1
  {
    id: 'Q1',
    section: 'Pay rates, job type, and overtime',
    text: 'Do you make sure every employee is paid at least the correct minimum wage for where they work (including any higher city rules)?',
    weight: 10
  },
  {
    id: 'Q2',
    section: 'Pay rates, job type, and overtime',
    text: 'Do you know which set of California wage rules applies to your business type (and do you re-check if your business changes what it does)?',
    weight: 5
  },
  {
    id: 'Q3',
    section: 'Pay rates, job type, and overtime',
    text: 'If you treat anyone as salaried and not eligible for overtime, have you checked that their job duties and pay level meet California rules (and do you re-check when their role or pay changes)?',
    weight: 10
  },
  {
    id: 'Q4',
    section: 'Pay rates, job type, and overtime',
    text: "For hourly employees, do you pay overtime and double-time correctly when they work long days or long weeks (even if the overtime wasn't approved ahead of time)?",
    weight: 10
  },
  {
    id: 'Q5',
    section: 'Pay rates, job type, and overtime',
    text: 'If you pay bonuses, incentives, or other extra pay, do you make sure overtime pay is calculated using the correct average hourly rate that includes those extras?',
    weight: 6
  },
  // SECTION 2
  {
    id: 'Q6',
    section: 'Breaks',
    text: 'Do employees usually get their meal breaks on time, and do you track meal breaks (example: on a timecard or app)?',
    weight: 7
  },
  {
    id: 'Q7',
    section: 'Breaks',
    text: 'Do you allow paid rest breaks during the day, and do managers avoid discouraging people from taking them?',
    weight: 7
  },
  {
    id: 'Q8',
    section: 'Breaks',
    text: 'If an employee misses a required meal or rest break, do you pay the required extra hour of pay and show it on the paycheck?',
    weight: 6
  },
  // SECTION 3
  {
    id: 'Q9',
    section: 'Timekeeping and scheduling',
    text: 'Do you make sure employees are paid for all time worked, including before or after shift work, remote work, after-hours calls, texts, emails, and required meetings or trainings?',
    weight: 8
  },
  {
    id: 'Q10',
    section: 'Timekeeping and scheduling',
    text: 'If your time system rounds time, have you checked that it does not regularly short employees on pay?',
    weight: 3
  },
  {
    id: 'Q11',
    section: 'Timekeeping and scheduling',
    text: 'If employees show up for a shift but are sent home early or cancelled after reporting, do you pay the required show-up pay?',
    weight: 4
  },
  {
    id: 'Q12',
    section: 'Timekeeping and scheduling',
    text: 'If employees work split shifts, do you check whether an extra split-shift payment is owed?',
    weight: 3
  },
  {
    id: 'Q13',
    section: 'Timekeeping and scheduling',
    text: 'If employees travel between work locations during the workday, do you pay them for that travel time when required?',
    weight: 3
  },
  {
    id: 'Q14',
    section: 'Timekeeping and scheduling',
    text: 'If employees are on-call, have you checked whether any on-call time needs to be paid based on how restricted they are?',
    weight: 3
  },
  // SECTION 4
  {
    id: 'Q15',
    section: 'Paydays and records',
    text: 'Do you always pay employees on time on your regular paydays?',
    weight: 3
  },
  {
    id: 'Q16',
    section: 'Paydays and records',
    text: 'When someone quits or is let go, do you have a process to ensure the final paycheck is paid on time, including unused vacation or PTO?',
    weight: 5
  },
  {
    id: 'Q17',
    section: 'Paydays and records',
    text: 'Do your paystubs clearly show required information, and do you review them occasionally for errors?',
    weight: 6
  },
  {
    id: 'Q18',
    section: 'Paydays and records',
    text: 'Do you keep payroll and time records and can you pull them quickly if requested?',
    weight: 3
  },
  {
    id: 'Q19',
    section: 'Paydays and records',
    text: 'Do you avoid paycheck deductions unless required by law or clearly authorized in writing?',
    weight: 3
  },
  {
    id: 'Q20',
    section: 'Paydays and records',
    text: 'Do you reimburse employees for required work expenses such as mileage, tools, uniforms, or required phone or internet use?',
    weight: 4
  },
  // SECTION 5
  {
    id: 'Q21',
    section: 'Independent contractors',
    text: 'If you use independent contractors, do you have a process to confirm they are properly classified under California rules and keep records of that decision?',
    weight: 10
  },
  // SECTION 6 - Conditional
  {
    id: 'Q22A',
    section: 'Additional questions',
    text: 'Do you have a written commission plan that explains how commissions are earned and paid, and do employees receive and acknowledge it?',
    weight: 4,
    conditional: 'commissions'
  },
  {
    id: 'Q22B',
    section: 'Additional questions',
    text: 'Do employees keep their tips and does any tip pool follow California rules?',
    weight: 4,
    conditional: 'tipped'
  },
  {
    id: 'Q22C',
    section: 'Additional questions',
    text: 'Do you also pay for break time and other non-piece work time as required?',
    weight: 4,
    conditional: 'piece-rate'
  }
];

export function WageHourAssessment({ 
  onComplete, 
  businessType = 'none', 
  initialAnswers = {}, 
  reviewMode = false, 
  onReturnToResults, 
  editedAnswers = {},
  onAnswerEdit,
  onCancelReview,
  isReassessment,
  lastCompletedDate,
  targetQuestionIndex
}: AssessmentProps) {
  const [currentIndex, setCurrentIndex] = useState(targetQuestionIndex !== null ? targetQuestionIndex : 0);
  const [answers, setAnswers] = useState<Record<string, boolean>>(initialAnswers);
  const [showingSectionHeader, setShowingSectionHeader] = useState(true);
  const [unlockedQuestions, setUnlockedQuestions] = useState<Set<string>>(new Set());

  // Filter questions based on business type
  const activeQuestions = questions.filter(q => {
    if (!q.conditional) return true;
    return q.conditional === businessType;
  });

  const currentQuestion = activeQuestions[currentIndex];
  const currentSection = currentQuestion?.section;
  const previousSection = currentIndex > 0 ? activeQuestions[currentIndex - 1]?.section : null;
  const isNewSection = currentSection !== previousSection;

  const isQuestionLocked = reviewMode && !unlockedQuestions.has(currentQuestion?.id);
  const isQuestionEdited = editedAnswers && editedAnswers.hasOwnProperty(currentQuestion?.id);
  const hasAnyEdits = Object.keys(editedAnswers).length > 0;

  const handleUnlockQuestion = () => {
    setUnlockedQuestions(prev => new Set(prev).add(currentQuestion.id));
  };

  const handleAnswer = (answer: boolean) => {
    if (isQuestionLocked) return;

    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    // Track as edited in review mode
    if (reviewMode && onAnswerEdit) {
      onAnswerEdit(currentQuestion.id, answer);
    }

    // In review mode, don't auto-advance
    if (reviewMode) {
      return;
    }

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentIndex < activeQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowingSectionHeader(true);
      } else {
        // Calculate final score
        const totalPoints = activeQuestions.reduce((sum, q) => sum + q.weight, 0);
        const earnedPoints = activeQuestions.reduce((sum, q) => {
          return newAnswers[q.id] === true ? sum + q.weight : sum;
        }, 0);
        const score = Math.round((earnedPoints / totalPoints) * 100);
        
        onComplete(score, newAnswers);
      }
    }, 150);
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowingSectionHeader(true);
    }
  };

  const handleRecalculateAndReturn = () => {
    // Calculate final score with updated answers
    const totalPoints = activeQuestions.reduce((sum, q) => sum + q.weight, 0);
    const earnedPoints = activeQuestions.reduce((sum, q) => {
      return answers[q.id] === true ? sum + q.weight : sum;
    }, 0);
    const score = Math.round((earnedPoints / totalPoints) * 100);
    
    onComplete(score, answers);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowingSectionHeader(true);
    }
  };

  const getSectionIndex = () => {
    const uniqueSections = Array.from(new Set(activeQuestions.map(q => q.section)));
    return uniqueSections.indexOf(currentSection) + 1;
  };

  const getTotalSections = () => {
    return Array.from(new Set(activeQuestions.map(q => q.section))).length;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1 flex flex-col">
      <div className="mx-auto max-w-[640px] w-full flex-1 flex flex-col px-6">
        {/* Review mode header bar */}
        {reviewMode && (
          <div className="bg-theme-surface-1 border-b border-theme-border-2 py-3 -mx-6 px-6">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-theme-text-2">Reviewing saved answers</span>
              <button
                onClick={onCancelReview}
                className="text-[13px] text-theme-accent hover:text-theme-accent-hover font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              >
                Return to results
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="pt-8 pb-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`p-2 -ml-2 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
              currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-theme-icon-2" />
          </button>
          
          <div className="text-center">
            <div className="text-[13px] text-theme-text-3">
              Wage & Hour — California
            </div>
            {reviewMode && lastCompletedDate && (
              <div className="text-[11px] text-theme-text-3 mt-0.5">
                Based on your last completed assessment
              </div>
            )}
            {!reviewMode && (
              <div className="text-[13px] text-theme-text-3 mt-0.5">
                Section {getSectionIndex()} of {getTotalSections()}
              </div>
            )}
          </div>

          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="h-1 bg-theme-border-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-theme-border-1 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-8 flex flex-col justify-center">
          {isNewSection && showingSectionHeader && !reviewMode ? (
            // Section header screen
            <div className="space-y-6 animate-fadeIn max-w-[480px] mx-auto text-center">
              <div className="text-[13px] text-theme-text-3 uppercase tracking-wide">
                Section {getSectionIndex()}
              </div>
              <h2 className="text-[28px] sm:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-tight">
                {currentSection}
              </h2>
              <button
                onClick={() => setShowingSectionHeader(false)}
                className="mt-8 px-8 py-3.5 rounded-xl bg-theme-accent text-theme-text-1 text-[15px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
              >
                Continue
              </button>
            </div>
          ) : (
            // Question screen
            <div className="space-y-8 animate-fadeIn max-w-[560px] mx-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] text-theme-text-3">
                    Question {currentIndex + 1} of {activeQuestions.length}
                  </div>
                  {isQuestionEdited && (
                    <div className="text-[11px] text-yellow-600 bg-yellow-900/20 px-2.5 py-1 rounded-lg">
                      Edited
                    </div>
                  )}
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-medium text-white tracking-tight leading-[1.4]">
                  {currentQuestion.text}
                </h3>
              </div>

              {isQuestionLocked ? (
                // Locked state - show answer with unlock option
                <div className="space-y-3 pt-2">
                  <div className="px-6 py-5 rounded-2xl bg-theme-surface-1 border border-theme-border-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[17px] text-theme-text-1">
                        {answers[currentQuestion.id] === true ? 'Yes' : answers[currentQuestion.id] === false ? 'No' : 'No answer'}
                      </span>
                      <Lock className="w-4 h-4 text-theme-icon-2" />
                    </div>
                  </div>
                  <button
                    onClick={handleUnlockQuestion}
                    className="w-full px-6 py-3 rounded-xl border border-theme-border-1 text-[15px] font-medium text-theme-text-2 hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                  >
                    Change answer
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => handleAnswer(true)}
                    className={`w-full px-6 py-4 rounded-xl text-[17px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                      answers[currentQuestion.id] === true
                        ? 'bg-theme-accent text-theme-text-1'
                        : 'bg-theme-surface-1 text-theme-text-1 border border-theme-border-1 hover:bg-theme-surface-1'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className={`w-full px-6 py-4 rounded-xl text-[17px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                      answers[currentQuestion.id] === false
                        ? 'bg-theme-accent text-theme-text-1'
                        : 'bg-theme-surface-1 text-theme-text-1 border border-theme-border-1 hover:bg-theme-surface-1'
                    }`}
                  >
                    No
                  </button>
                </div>
              )}
              
              {/* Review mode navigation */}
              {reviewMode && (
                <div className="pt-2 space-y-3">
                  {currentIndex < activeQuestions.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="w-full px-6 py-3 rounded-xl border border-theme-border-1 text-[15px] font-medium hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                    >
                      Next question
                    </button>
                  )}
                  {currentIndex === activeQuestions.length - 1 && (
                    <>
                      <button
                        onClick={onCancelReview}
                        className="w-full px-6 py-3 rounded-xl border border-theme-border-1 text-[15px] font-medium text-theme-text-2 hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40"
                      >
                        Cancel changes
                      </button>
                      <button
                        onClick={handleRecalculateAndReturn}
                        disabled={!hasAnyEdits}
                        className={`w-full px-6 py-3 rounded-xl text-[15px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
                          hasAnyEdits
                            ? 'bg-theme-accent text-theme-text-1 hover:bg-theme-accent-hover'
                            : 'bg-theme-surface-1 border border-theme-border-2 text-theme-text-3 cursor-not-allowed'
                        }`}
                      >
                        Recalculate score
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}