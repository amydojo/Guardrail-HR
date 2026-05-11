import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { AssessmentScore } from '@/app/types/assessment';
import { DRIVERS, QUESTION_DETAILS, QuestionMapping } from '@/app/types/drivers';
import { ScoreBreakdownDrawer } from '@/app/components/ScoreBreakdownDrawer';

interface ResultsPageProps {
  score: number;
  onReviewAnswers?: () => void;
  onRetakeAssessment?: () => void;
  completedAt?: number;
  scoreVersion?: number;
  scoreHistory?: AssessmentScore[];
  userAnswers?: Record<string, boolean>;
  onGoToQuestion?: (questionId: string) => void;
  answersChangedWithoutRescoring?: boolean;
  isReEntry?: boolean;
}

export function ResultsPage({
  score,
  completedAt,
  userAnswers = {},
  onGoToQuestion,
  answersChangedWithoutRescoring,
  isReEntry
}: ResultsPageProps) {
  const [activeAnswersDrawer, setActiveAnswersDrawer] = useState<string | null>(null);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getQuestionsForDriver = (driverId: string): QuestionMapping[] => {
    const driver = DRIVERS.find(d => d.id === driverId);
    if (!driver) return [];

    return driver.relatedQuestions.map(qId => {
      const details = QUESTION_DETAILS[qId];
      const userAnswer = userAnswers[qId];

      return {
        questionId: qId,
        questionText: details.text,
        section: details.section,
        weight: details.weight,
        userAnswer,
        status: userAnswer === false ? 'contributing' : userAnswer === true ? 'positive' : 'neutral'
      };
    });
  };

  // Get top 2 drivers based on user answers
  const getTopDrivers = () => {
    return DRIVERS.filter(driver => {
      return driver.relatedQuestions.some(qId => userAnswers[qId] === false);
    }).slice(0, 2);
  };

  const topDrivers = getTopDrivers();

  // Risk level interpretation
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { 
      label: 'Lower exposure', 
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-800/50'
    };
    if (score >= 60) return { 
      label: 'Moderate exposure', 
      color: 'text-amber-700 dark:text-yellow-400',
      bg: 'bg-amber-50 dark:bg-yellow-950/30',
      border: 'border-amber-300 dark:border-yellow-800/50'
    };
    return { 
      label: 'Elevated exposure', 
      color: 'text-orange-700 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-950/30',
      border: 'border-orange-300 dark:border-orange-800/50'
    };
  };

  const riskLevel = getRiskLevel(score);

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1">
      <div className="mx-auto max-w-[1080px] px-6 xl:px-8 py-12 sm:py-16 xl:py-20">
        {/* Banner for changed answers without rescoring */}
        {answersChangedWithoutRescoring && (
          <div className="mb-8 p-4 bg-theme-surface-1 rounded-2xl border border-theme-border-1">
            <p className="text-[14px] text-theme-text-1">
              <span className="font-medium">Answers updated</span> (score unchanged)
            </p>
            <p className="text-[13px] text-theme-text-2 mt-1">
              Run reassessment to update the score
            </p>
          </div>
        )}

        {/* HERO - Score + Risk Level + Drivers + Primary CTA */}
        <section className="mb-12">
          {/* Score with risk label */}
          <div className="text-center mb-8 max-w-[520px] mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-[72px] sm:text-[84px] font-semibold leading-none tracking-tight text-theme-text-1">
                {score}
                <span className="text-theme-text-3 text-[48px] sm:text-[56px]"> / 100</span>
              </div>
            </div>

            {/* Risk level chip */}
            <div className="mb-3">
              <span className={`px-3 py-1.5 rounded-lg text-[13px] font-medium ${riskLevel.bg} ${riskLevel.border} ${riskLevel.color}`}>
                {riskLevel.label}
              </span>
            </div>

            {/* 1-line plain-language interpretation */}
            <p className="text-[16px] sm:text-[17px] text-theme-text-2 mb-6 leading-[1.65]">
              This score reflects common wage & hour enforcement risk factors based on how your answers map to CA wage & hour rules.
            </p>

            {/* How calculated - link row with arrow */}
            <div className="text-center mb-4">
              <button
                onClick={() => setShowScoreBreakdown(true)}
                className="inline-flex items-center gap-1.5 text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors"
              >
                How we calculated this
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Last updated - reduced prominence */}
            {completedAt && (
              <p className="text-[12px] text-theme-text-3 mt-6">
                Last updated: {formatDate(completedAt)}
              </p>
            )}
          </div>
        </section>

        {/* What's driving your score */}
        <section id="insights-section" className="mb-12 scroll-mt-6">
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-6">
            What's driving your score
          </h2>

          <div className="space-y-4">
            {DRIVERS.map((driver) => {
              const questions = getQuestionsForDriver(driver.id);
              const contributingCount = questions.filter(q => q.status === 'contributing').length;

              return (
                <div
                  key={driver.id}
                  className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 p-5"
                >
                  {/* Title + risk badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight">
                      {driver.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-theme-chip-bg border border-theme-chip-border text-[11px] text-theme-chip-text">
                      Moderate
                    </span>
                  </div>

                  {/* Traceability line */}
                  <p className="text-[13px] text-theme-text-3 mb-2">
                    Flagged from: {contributingCount} {contributingCount === 1 ? 'answer' : 'answers'}
                  </p>

                  {/* One-line consequence */}
                  <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-3">
                    {driver.summary}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => setActiveAnswersDrawer(driver.id)}
                    className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors"
                  >
                    View answers
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Lightweight CTA to resources */}
        <section className="mb-16">
          <div className="text-center py-8">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-[15px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors"
            >
              View matching templates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="pt-8 border-t border-theme-border-2">
          <div className="max-w-[720px] mx-auto">
            <p className="text-[13px] text-theme-text-3 text-center leading-[1.65]">
              Guardrail provides informational HR compliance guidance, not legal advice.
            </p>
          </div>
        </section>
      </div>

      {/* Answer traceability drawers */}
      {DRIVERS.map((driver) => {
        const questions = getQuestionsForDriver(driver.id);
        const isOpen = activeAnswersDrawer === driver.id;

        return (
          <div
            key={`drawer-${driver.id}`}
            className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-theme-surface-1 border-l border-theme-border-2 shadow-xl transform transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-theme-border-1">
                <h3 className="text-[15px] font-medium text-theme-text-2">
                  Related answers
                </h3>
                <button
                  onClick={() => setActiveAnswersDrawer(null)}
                  className="text-theme-text-3 hover:text-theme-text-1 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-3">
                  {questions.map((q) => (
                    <div
                      key={q.questionId}
                      className="bg-theme-bg rounded-xl border border-theme-border-1 p-4"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <p className="text-[13px] text-theme-text-3 mb-1">
                            {q.section}
                          </p>
                          <p className="text-[14px] text-theme-text-1 font-medium">
                            {q.questionText}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-medium flex-shrink-0 ${
                            q.status === 'contributing'
                              ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50'
                              : q.status === 'positive'
                              ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50'
                              : 'bg-theme-chip-bg text-theme-chip-text border border-theme-chip-border'
                          }`}
                        >
                          {q.status === 'contributing'
                            ? 'Contributing'
                            : q.status === 'positive'
                            ? 'Positive'
                            : 'Neutral'}
                        </span>
                      </div>
                      <p className="text-[13px] text-theme-text-2">
                        Your answer: {q.userAnswer === true ? 'Yes' : q.userAnswer === false ? 'No' : 'Not answered'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Backdrop for drawer */}
      {activeAnswersDrawer && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setActiveAnswersDrawer(null)}
        />
      )}

      {/* Score Breakdown Drawer */}
      <ScoreBreakdownDrawer
        isOpen={showScoreBreakdown}
        onClose={() => setShowScoreBreakdown(false)}
        score={score}
        scoreHistory={[]}
        userAnswers={userAnswers}
      />
    </div>
  );
}
