import { ChevronDown, ArrowRight, FileText } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { AssessmentScore } from '@/app/types/assessment';
import { DRIVERS, ASSESSMENT_SECTIONS, QUESTION_DETAILS, QUESTION_TO_SECTION, QuestionMapping } from '@/app/types/drivers';
import { RelatedAnswersDrawer } from '@/app/components/RelatedAnswersDrawer';
import { ScoreBreakdownDrawer } from '@/app/components/ScoreBreakdownDrawer';
import { AssessmentDiffView } from '@/app/components/AssessmentDiffView';
import { PrintableResultsReport } from '@/app/components/PrintableResultsReport';
import { PremiumPricingModal } from '@/app/components/PremiumPricingModal';

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
  isReEntry?: boolean; // True when returning to completed assessment
}

export function ResultsPage({ 
  score, 
  onReviewAnswers, 
  onRetakeAssessment, 
  completedAt, 
  scoreVersion, 
  scoreHistory = [],
  userAnswers = {},
  onGoToQuestion,
  answersChangedWithoutRescoring,
  isReEntry
}: ResultsPageProps) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [expandedActions, setExpandedActions] = useState<Record<string, boolean>>({});
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [showDiffView, setShowDiffView] = useState(false);
  const [showPrintableReport, setShowPrintableReport] = useState(false);
  const [showPremiumPricingModal, setShowPremiumPricingModal] = useState(false);

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleAction = (actionId: string) => {
    setExpandedActions(prev => ({
      ...prev,
      [actionId]: !prev[actionId]
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

  const getDriversForSection = (sectionId: string) => {
    return DRIVERS.filter(driver => {
      return driver.relatedQuestions.some(qId => QUESTION_TO_SECTION[qId] === sectionId);
    });
  };

  const shouldHighlightDriver = (driverId: string) => {
    if (!selectedSection) return true;
    return getDriversForSection(selectedSection).some(d => d.id === driverId);
  };

  // Get top 2 drivers based on user answers
  const getTopDrivers = () => {
    return DRIVERS.filter(driver => {
      // Only show drivers with contributing questions (user answered false)
      return driver.relatedQuestions.some(qId => userAnswers[qId] === false);
    }).slice(0, 2);
  };

  const topDrivers = getTopDrivers();

  // Check if there is previous assessment to compare
  const hasPreviousAssessment = scoreHistory && scoreHistory.length > 0;

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1">
      {/* Container with max-width for desktop */}
      <div className="mx-auto max-w-[1080px] px-6 xl:px-8 py-12 sm:py-16 xl:py-20">
        {/* Banner for changed answers without rescoring */}
        {answersChangedWithoutRescoring && (
          <div className="mb-8 p-4 bg-theme-surface-1 rounded-2xl border border-theme-border-1 max-w-[390px] xl:max-w-full">
            <p className="text-[14px] text-theme-text-1">
              <span className="font-medium">Answers updated</span> (score unchanged)
            </p>
            <p className="text-[13px] text-theme-text-3 mt-1">
              Run reassessment to update the score
            </p>
          </div>
        )}

        {/* SECTION 1 - Hero / Score - Above the Fold Only */}
        <section className="mb-16">
          {isReEntry ? (
            /* Re-Entry State - Returning Days Later */
            <div className="max-w-[640px] mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-[28px] sm:text-[32px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
                  Wage & Hour Assessment
                </h1>
                <p className="text-[15px] text-theme-text-3">
                  Last reviewed {completedAt && formatDate(completedAt)}
                </p>
              </div>

              {/* Re-Entry Callout */}
              <div className="mb-8 p-5 sm:p-6 bg-theme-surface-1 rounded-2xl border border-theme-border-1">
                <h2 className="text-[15px] font-medium text-theme-text-1 mb-2">
                  Your last assessment
                </h2>
                <p className="text-[14px] text-theme-text-2 leading-[1.65]">
                  This reflects your responses at the time it was completed. You can review details, take action, or re-run the assessment if things have changed.
                </p>
              </div>

              {/* Score - Secondary Treatment */}
              <div className="mb-8 text-center">
                <div className="text-[56px] sm:text-[64px] font-semibold leading-none tracking-tight mb-3 text-theme-text-1">
                  {score}
                  <span className="text-theme-text-3 text-[36px] sm:text-[42px]"> / 100</span>
                </div>
                <p className="text-[15px] text-theme-text-2">
                  Risk assessment score
                </p>
              </div>

              {/* Top Drivers - Muted */}
              {topDrivers.length > 0 && (
                <div className="mb-8">
                  <p className="text-[13px] text-theme-text-3 mb-3">Key drivers:</p>
                  <div className="space-y-2">
                    {topDrivers.map(driver => (
                      <div 
                        key={driver.id}
                        className="px-4 py-2.5 bg-theme-surface-2 rounded-xl border border-theme-border-2 text-left"
                      >
                        <p className="text-[14px] text-theme-text-2">{driver.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Actions - Equal Weight */}
              <div className="space-y-3">
                <button
                  onClick={() => scrollToSection('next-steps')}
                  className="w-full px-6 py-3.5 rounded-xl bg-theme-accent text-theme-text-1 text-[15px] font-medium hover:bg-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                >
                  View recommended actions
                </button>
                {onRetakeAssessment && (
                  <button
                    onClick={onRetakeAssessment}
                    className="w-full px-6 py-3.5 rounded-xl border border-theme-border-1 text-[15px] font-medium text-theme-text-1 hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                  >
                    Re-run assessment
                  </button>
                )}
              </div>

              {/* Secondary Link */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowScoreBreakdown(true)}
                  className="text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                >
                  See how this was calculated
                </button>
              </div>
            </div>
          ) : (
            /* Initial Results State - Just Completed */
            <div className="text-center mb-8 max-w-[520px] mx-auto">
              {/* Score - Large, Neutral */}
              <div className="text-[72px] sm:text-[84px] font-semibold leading-none tracking-tight mb-4 text-theme-text-1">
                {score}
                <span className="text-theme-text-3 text-[48px] sm:text-[56px]"> / 100</span>
              </div>
              
              {/* Score Meaning - 1 Sentence Max */}
              <p className="text-[16px] sm:text-[17px] text-theme-text-1 mb-10 leading-relaxed">
                This score reflects common wage & hour enforcement risk factors based on your responses.
              </p>

              {/* Top Drivers - Max 2, Short Labels Only */}
              {topDrivers.length > 0 && (
                <div className="mb-10">
                  <p className="text-[13px] text-theme-text-3 mb-4">Top drivers:</p>
                  <div className="space-y-2">
                    {topDrivers.map(driver => (
                      <div 
                        key={driver.id}
                        className="px-4 py-3 bg-theme-surface-1 rounded-xl border border-theme-border-1 text-left"
                      >
                        <p className="text-[15px] text-theme-text-1">{driver.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Action - Single CTA */}
              <button
                onClick={() => scrollToSection('next-steps')}
                className="w-full sm:w-auto sm:min-w-[280px] px-8 py-3.5 rounded-xl bg-theme-accent text-theme-text-1 text-[15px] font-medium hover:bg-theme-accent-hover transition-colors mb-3 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                View recommended actions
              </button>

              {/* Secondary Link - Text Only */}
              <div className="text-center">
                <button
                  onClick={() => setShowScoreBreakdown(true)}
                  className="text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                >
                  See how this was calculated
                </button>
              </div>

              {/* Compare to previous run - Optional advanced link */}
              {hasPreviousAssessment && (
                <div className="text-center mt-3">
                  <button
                    onClick={() => setShowDiffView(true)}
                    className="text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                  >
                    Compare to previous run
                  </button>
                </div>
              )}

              {/* Last updated timestamp */}
              {completedAt && (
                <p className="text-[12px] text-theme-text-3 mt-6">
                  Last updated: {formatDate(completedAt)}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Assessment Map */}
        <section className="mb-12">
          <h2 className="text-[17px] font-medium text-theme-text-2 mb-2">
            How we analyzed your responses
          </h2>
          <p className="text-[14px] text-theme-text-3 mb-4 leading-[1.65]">
            We apply rule-based checks aligned with California wage & hour requirements to identify common risk areas.
          </p>
          <div className="flex flex-wrap gap-2">
            {ASSESSMENT_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0 ${
                  selectedSection === section.id
                    ? 'bg-theme-accent text-theme-text-1'
                    : 'bg-theme-surface-1 text-theme-text-2 border border-theme-border-1 hover:bg-theme-surface-1'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 2 - Insight Cards */}
        <section id="insights" className="mb-16">
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
            What's driving your score
          </h2>
          <p className="text-[15px] text-theme-text-3 mb-6 leading-[1.65]">
            Key areas affecting your wage & hour exposure
          </p>
          
          {/* 2-column grid on desktop */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {DRIVERS.map((driver) => {
              const questions = getQuestionsForDriver(driver.id);
              const isHighlighted = shouldHighlightDriver(driver.id);
              const contributingCount = questions.filter(q => q.status === 'contributing').length;
              const isExpanded = expandedCards[driver.id];

              return (
                <div
                  key={driver.id}
                  className={`bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 transition-all ${
                    !isHighlighted ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  {/* Collapsed state */}
                  <h3 className="text-[17px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
                    {driver.title}
                  </h3>
                  <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-4">
                    {driver.summary}
                  </p>

                  {/* Inline answer trace - single disclosure affordance */}
                  <button
                    onClick={() => toggleCard(driver.id)}
                    className="flex items-center gap-1.5 text-[13px] text-theme-text-3 hover:text-theme-text-2 transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                  >
                    <span>Based on {contributingCount} {contributingCount === 1 ? 'answer' : 'answers'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  {/* Expanded state */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-4 border-t border-theme-border-2 space-y-5">
                      {/* Why this showed up */}
                      <div>
                        <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-2">
                          Why this showed up
                        </h4>
                        <p className="text-[14px] text-theme-text-2 leading-[1.65] mb-4">
                          {driver.whyThisShowedUp}
                        </p>
                        
                        {/* Contributing themes */}
                        <ul className="space-y-2">
                          {driver.contributingThemes.map((theme, idx) => (
                            <li key={idx} className="flex gap-2 text-[14px] text-theme-text-2">
                              <span className="text-theme-text-3">•</span>
                              <span>{theme}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Single CTA */}
                      <button
                        onClick={() => setActiveDrawer(driver.id)}
                        className="text-[14px] font-medium text-theme-accent hover:text-theme-accent-hover transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                      >
                        <span>Review related answers</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3 - Recommended next steps */}
        <section id="next-steps" className="mb-16">
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
            High-impact risk-reduction actions
          </h2>
          <p className="text-[15px] text-theme-text-3 mb-6 leading-[1.65]">
            These actions reflect common compliance practices and are provided for informational guidance only.
          </p>
          
          <div className="space-y-4">
            {/* Action 1: Review exemption classifications */}
            <div className="bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 scroll-mt-6">
              <div className="mb-4">
                <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                  Review exemption classifications
                </h3>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
                    Low effort
                  </span>
                  <span className="px-3 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
                    High impact
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => toggleAction('action-1')}
                className="flex items-center gap-1.5 text-[15px] text-theme-accent hover:text-theme-accent-hover transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                <span>{expandedActions['action-1'] ? 'Show less' : 'Read more'}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    expandedActions['action-1'] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  expandedActions['action-1'] ? 'max-h-[800px] opacity-100 mb-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-2">
                      Why this matters
                    </h4>
                    <p className="text-[14px] text-theme-text-2 leading-[1.65]">
                      Misclassifying even one employee as exempt can lead to years of back overtime pay. A quick review now helps you identify gaps before they become disputes. Most fixes require only documentation, not operational changes.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-2">
                      Steps to take
                    </h4>
                    <ul className="space-y-2 text-[14px] text-theme-text-2">
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Verify current salaries meet or exceed California's minimum for exempt employees</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Document primary duties and confirm they align with exemption requirements</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Check that exempt employees exercise independent judgment on significant matters</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Review job titles to ensure they accurately reflect actual responsibilities</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-3">
                      Applies to
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        Salaried staff
                      </span>
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        Managers
                      </span>
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        Supervisors
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full px-5 py-3 rounded-xl border border-theme-border-1 text-[15px] font-medium hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">
                View details
              </button>
            </div>

            {/* Action 2: Document contractor relationships */}
            <div className="bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 scroll-mt-6">
              <div className="mb-4">
                <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                  Document contractor relationships
                </h3>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
                    Medium effort
                  </span>
                  <span className="px-3 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
                    High impact
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => toggleAction('action-2')}
                className="flex items-center gap-1.5 text-[15px] text-theme-accent hover:text-theme-accent-hover transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                <span>{expandedActions['action-2'] ? 'Show less' : 'Read more'}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    expandedActions['action-2'] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  expandedActions['action-2'] ? 'max-h-[800px] opacity-100 mb-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-2">
                      Why this matters
                    </h4>
                    <p className="text-[14px] text-theme-text-2 leading-[1.65]">
                      Written agreements create a clear record of the relationship terms and help demonstrate independence. They also protect both parties by clarifying deliverables, payment terms, and intellectual property ownership.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-2">
                      Steps to take
                    </h4>
                    <ul className="space-y-2 text-[14px] text-theme-text-2">
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Obtain signed independent contractor agreements before work begins</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Confirm agreements specify project-based deliverables, not ongoing duties</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Verify contractors maintain their own tools, workspace, and schedule flexibility</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Review payment structures to ensure project or milestone-based payments</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-3">
                      Applies to
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        Contractors
                      </span>
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        Freelancers
                      </span>
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        Consultants
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full px-5 py-3 rounded-xl border border-theme-border-1 text-[15px] font-medium hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">
                View details
              </button>
            </div>

            {/* Action 3: Verify wage statements */}
            <div className="bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1 scroll-mt-6">
              <div className="mb-4">
                <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                  Verify wage statements
                </h3>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
                    Low effort
                  </span>
                  <span className="px-3 py-1 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[13px] text-theme-chip-text">
                    Medium impact
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => toggleAction('action-3')}
                className="flex items-center gap-1.5 text-[15px] text-theme-accent hover:text-theme-accent-hover transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                <span>{expandedActions['action-3'] ? 'Show less' : 'Read more'}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    expandedActions['action-3'] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  expandedActions['action-3'] ? 'max-h-[800px] opacity-100 mb-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-2">
                      Why this matters
                    </h4>
                    <p className="text-[14px] text-theme-text-2 leading-[1.65]">
                      Wage statement violations are among the most common labor claims in California. They're also among the easiest to fix. Most payroll providers can adjust templates to include all required information without changing your processes.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-2">
                      Steps to take
                    </h4>
                    <ul className="space-y-2 text-[14px] text-theme-text-2">
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Confirm all nine required items appear on current pay stubs</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Check that gross wages, deductions, and net wages are clearly separated</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Ensure pay period start and end dates are explicitly stated</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-theme-text-3">•</span>
                        <span>Verify hourly rates and total hours appear for all non-exempt employees</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide mb-3">
                      Applies to
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        All employees
                      </span>
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        Hourly staff
                      </span>
                      <span className="px-3 py-1.5 bg-theme-chip-bg border border-theme-chip-border rounded-lg text-[12px] text-theme-chip-text">
                        Payroll systems
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full px-5 py-3 rounded-xl border border-theme-border-1 text-[15px] font-medium hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">
                View details
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4 - Tools to reduce risk (kept from original) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-theme-text-1 tracking-tight leading-tight">
              Tools to reduce risk
            </h2>
            <Link
              to="/resources/wage-hour?from=results"
              className="text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Open resources hub →
            </Link>
          </div>
          <p className="text-[15px] text-theme-text-3 mb-6 leading-[1.65]">
            Templates and guides tailored to the risk areas identified in your results.
          </p>
          
          <div className="space-y-4">
            <div className="bg-theme-surface-1 rounded-2xl p-6 border border-theme-border-1">
              <h3 className="text-[17px] font-semibold text-theme-text-1 mb-2 tracking-tight leading-tight">
                Exemption checklist
              </h3>
              <p className="text-[14px] text-theme-text-3 mb-4 leading-[1.65]">
                Step-by-step classification verification
              </p>
              
              <Link
                to="/resources/exemption-checklist?from=results"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-theme-chip-bg border border-theme-chip-border text-[15px] font-medium text-theme-chip-text hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                <span>View resource</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5 - Subtle upgrade prompt */}
        <section className="text-center py-8">
          <p className="text-[15px] text-theme-text-3 mb-5">
            Unlock full breakdowns, templates, and guides
          </p>
          <button
            onClick={() => setShowPremiumPricingModal(true)}
            className="px-8 py-3.5 rounded-2xl bg-theme-surface-1 border border-theme-border-1 text-[15px] font-medium hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
          >
            Unlock Guardrail Plus
          </button>
        </section>

        {/* Export button - unobtrusive placement */}
        <section className="text-center py-6">
          <button
            onClick={() => setShowPrintableReport(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-transparent border border-theme-border-1 text-[14px] font-medium text-theme-text-3 hover:text-theme-text-2 hover:bg-theme-surface-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
          >
            <FileText className="w-4 h-4" />
            <span>Export / Print</span>
          </button>
        </section>

        {/* SECTION 6 - Important Disclaimer - Always Visible */}
        <section className="mt-16 pt-8 border-t border-theme-border-2">
          <div className="bg-theme-surface-1 rounded-2xl p-6 sm:p-7 border border-theme-border-1 max-w-[720px] mx-auto">
            <h3 className="text-[15px] font-medium text-theme-text-2 mb-3">
              Important information
            </h3>
            <p className="text-[14px] text-theme-text-3 leading-[1.65]">
              This assessment provides informational guidance only and does not constitute 
              legal advice, interpretation, or a determination of compliance or non-compliance. 
              Results are based on rule-based checks and the responses you provided. For specific 
              guidance on your circumstances, consult with qualified legal or compliance professionals.
            </p>
          </div>
        </section>
      </div>

      {/* Related Answers Drawer */}
      {DRIVERS.map((driver) => (
        <RelatedAnswersDrawer
          key={driver.id}
          isOpen={activeDrawer === driver.id}
          onClose={() => setActiveDrawer(null)}
          driverTitle={driver.title}
          interpretation={driver.whyThisShowedUp}
          questions={getQuestionsForDriver(driver.id)}
          onGoToQuestion={onGoToQuestion || (() => {})}
        />
      ))}

      {/* Score Breakdown Drawer */}
      <ScoreBreakdownDrawer
        isOpen={showScoreBreakdown}
        onClose={() => setShowScoreBreakdown(false)}
        score={score}
        scoreHistory={scoreHistory}
        userAnswers={userAnswers}
      />

      {/* Assessment Diff View */}
      {showDiffView && hasPreviousAssessment && (
        <AssessmentDiffView
          oldScore={scoreHistory[scoreHistory.length - 1].score}
          newScore={score}
          oldDate={scoreHistory[scoreHistory.length - 1].completedAt}
          newDate={completedAt || Date.now()}
          answerChanges={[
            {
              questionId: 'Q2',
              questionText: 'Do you have documented exemption classifications for salaried employees?',
              oldAnswer: 'No',
              newAnswer: 'Yes'
            }
          ]}
          driverChanges={[
            {
              driverId: 'classification',
              driverTitle: 'Employee classification',
              status: 'no-longer-flagged'
            }
          ]}
          onClose={() => setShowDiffView(false)}
        />
      )}

      {/* Printable Results Report */}
      {showPrintableReport && (
        <PrintableResultsReport
          score={score}
          companyName="Acme Corp"
          assessmentDate={completedAt || Date.now()}
          jurisdiction="California"
          drivers={[
            {
              title: 'Employee classification',
              explanation: 'Exemption documentation may be incomplete or outdated.'
            },
            {
              title: 'Wage statements & pay timing',
              explanation: 'Pay stub information may not include all required California disclosures.'
            }
          ]}
          actions={[
            { title: 'Review exemption classifications for salaried roles.' },
            { title: 'Verify wage statements include all nine required California elements.' },
            { title: 'Confirm current processes for tracking meal and rest breaks.' }
          ]}
          onClose={() => setShowPrintableReport(false)}
        />
      )}

      {/* Premium Pricing Modal */}
      {showPremiumPricingModal && (
        <PremiumPricingModal
          isOpen={showPremiumPricingModal}
          onClose={() => setShowPremiumPricingModal(false)}
        />
      )}
    </div>
  );
}