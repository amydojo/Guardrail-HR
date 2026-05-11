import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { SaveExitModal } from '@/app/components/SaveExitModal';
import { AnalysisTransition } from '@/app/components/AnalysisTransition';

// Mock question data - would come from database
const QUESTIONS = [
  {
    id: 1,
    text: 'How many employees does your company currently have in California?',
    options: [
      '1-4 employees',
      '5-14 employees',
      '15-49 employees',
      '50+ employees'
    ]
  },
  {
    id: 2,
    text: 'Do you have any employees who work more than 8 hours in a single day?',
    options: [
      'Yes, regularly',
      'Yes, occasionally',
      'No',
      'Not sure'
    ]
  },
  // Questions 3-11 would be here in production
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 3,
    text: `Sample question ${i + 3} for assessment flow demonstration`,
    options: ['Option A', 'Option B', 'Option C', 'Option D']
  })),
  {
    id: 12,
    text: 'Do you provide meal breaks for employees who work more than 5 hours?',
    options: [
      'Yes, always',
      'Yes, most of the time',
      'No',
      'Not sure'
    ]
  },
  // Questions 13-23 would continue...
  ...Array.from({ length: 11 }, (_, i) => ({
    id: i + 13,
    text: `Sample question ${i + 13} for assessment flow demonstration`,
    options: ['Option A', 'Option B', 'Option C', 'Option D']
  })),
];

const TOTAL_QUESTIONS = 23;
const MID_ASSESSMENT_START = 12; // Question 12
const MID_ASSESSMENT_END = 15;   // Question 15

export function WageHourAssessmentPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [hasSeenMidpoint, setHasSeenMidpoint] = useState(false);
  const [showAnalyzing, setShowAnalyzing] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const questionNumber = currentQuestion + 1;
  const isMidAssessment = questionNumber >= MID_ASSESSMENT_START && questionNumber <= MID_ASSESSMENT_END;
  const isMidpointMarker = questionNumber === MID_ASSESSMENT_START && !hasSeenMidpoint;
  const isFinalQuestion = currentQuestion === QUESTIONS.length - 1;

  // Load previous answer when question changes
  useEffect(() => {
    setSelectedAnswer(answers[question.id] || null);
    
    // Mark midpoint as seen
    if (questionNumber === MID_ASSESSMENT_START) {
      setHasSeenMidpoint(true);
    }
  }, [currentQuestion, question.id, answers, questionNumber]);

  // Auto-save indicator
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [answers]);

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleContinue = () => {
    if (!selectedAnswer) return;

    // Save answer
    setAnswers(prev => ({ ...prev, [question.id]: selectedAnswer }));

    // Move to next question or complete
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Final question - show analysis transition
      setShowAnalyzing(true);
      
      // Navigate to results after 2 seconds
      setTimeout(() => {
        navigate('/modules/wage-hour/results');
      }, 2000);
    }
  };

  const handleSaveExit = () => {
    // Save current answer if selected
    if (selectedAnswer) {
      setAnswers(prev => ({ ...prev, [question.id]: selectedAnswer }));
    }
    // Navigate back to module page
    navigate('/modules/wage-hour');
  };

  // Calculate milestone text
  const getMilestoneText = () => {
    if (questionNumber <= 8) return null;
    if (questionNumber >= 9 && questionNumber <= 14) return 'About halfway through';
    if (questionNumber >= 15 && questionNumber <= 20) return 'Nearly complete';
    return null;
  };

  const milestoneText = getMilestoneText();

  // Show analyzing transition
  if (showAnalyzing) {
    return <AnalysisTransition />;
  }

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className={`mx-auto max-w-[760px] px-5 xl:px-8 py-8 md:py-12 ${isMidAssessment ? 'md:py-16' : ''}`}>
        {/* Top Frame - Orientation Band */}
        <div className={`${isMidAssessment ? 'mb-10 md:mb-12' : 'mb-8 md:mb-10'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[13px] text-theme-text-3 mb-2">
                Wage & Hour Assessment
              </p>
              <div className="flex items-center gap-2 text-[13px] text-theme-text-3">
                {milestoneText && (
                  <span className="text-theme-text-3">{milestoneText}</span>
                )}
                {milestoneText && <span className="text-theme-text-3">·</span>}
                <span className={milestoneText ? 'text-theme-text-3' : ''}>
                  Question {questionNumber} of {TOTAL_QUESTIONS}
                </span>
                {showSaved && (
                  <>
                    <span className="text-theme-text-3">·</span>
                    <span className="text-theme-text-3 animate-fade-in">Saved</span>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowSaveModal(true)}
              className="text-[13px] md:text-[14px] text-theme-text-3 hover:text-theme-text-1 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              Save & exit
            </button>
          </div>

          {/* Progress Indicator - Minimal */}
          <div className="flex gap-1">
            {Array.from({ length: TOTAL_QUESTIONS }).map((_, idx) => (
              <div
                key={idx}
                className={`h-0.5 flex-1 rounded-full transition-colors ${
                  idx < questionNumber
                    ? 'bg-theme-accent'
                    : 'bg-theme-border-2'
                }`}
              />
            ))}
          </div>

          {/* Fatigue Relief Micro-Copy - Mid-assessment only */}
          {isMidAssessment && (
            <p className="text-[12px] text-theme-text-3 mt-4">
              You can take a break at any time — your answers are saved.
            </p>
          )}
        </div>

        {/* One-time Midpoint Marker */}
        {isMidpointMarker && (
          <div className="mb-8 pb-6 border-b border-theme-border-2">
            <p className="text-[13px] text-theme-text-3">
              You're halfway through this module
            </p>
          </div>
        )}

        {/* Question - Increased spacing for mid-assessment */}
        <div className={`${isMidAssessment ? 'mb-10' : 'mb-8'}`}>
          <h1 className={`font-semibold leading-tight max-w-[600px] ${
            isMidAssessment 
              ? 'text-[26px] md:text-[30px]' 
              : 'text-[24px] md:text-[28px]'
          }`}>
            {question.text}
          </h1>
        </div>

        {/* Answer Options - Increased contrast for mid-assessment */}
        <div className="mb-6 space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelectAnswer(option)}
              className={`w-full p-5 md:p-6 text-left rounded-[16px] border transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0 ${
                selectedAnswer === option
                  ? 'bg-theme-accent/10 border-theme-accent text-theme-text-1'
                  : isMidAssessment
                    ? 'bg-theme-surface-1 border-theme-border-1 text-theme-text-1 hover:border-theme-border-1 hover:text-theme-text-1'
                    : 'bg-theme-surface-elevated border-theme-border-2 text-theme-text-2 hover:border-theme-border-1 hover:text-theme-text-1'
              }`}
            >
              <span className="text-[15px] md:text-[16px]">{option}</span>
            </button>
          ))}
        </div>

        {/* Micro-Copy - Reassurance (only on early questions) */}
        {questionNumber <= 5 && (
          <p className="text-[13px] text-theme-text-3 mb-8 text-center md:text-left">
            You can update any answer later.
          </p>
        )}

        {/* Navigation Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Secondary Action - Previous (left on desktop) */}
          {currentQuestion > 0 ? (
            <button
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="text-[14px] text-theme-text-2 hover:text-theme-text-1 transition-colors text-center sm:text-left focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
            >
              ← Previous
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {/* Primary Action - Continue (right on desktop, top on mobile) */}
          <button
            onClick={handleContinue}
            disabled={!selectedAnswer}
            className={`w-full sm:w-auto sm:min-w-[200px] px-8 py-3.5 rounded-[16px] text-[15px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0 ${
              selectedAnswer
                ? 'bg-theme-accent text-theme-text-1 hover:bg-theme-accent-hover'
                : 'bg-theme-surface-2 text-theme-text-disabled cursor-not-allowed'
            }`}
          >
            {isFinalQuestion ? 'Finish assessment' : 'Continue'}
          </button>
        </div>
      </div>

      {/* Save & Exit Modal */}
      <SaveExitModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSaveExit={handleSaveExit}
      />
    </div>
  );
}