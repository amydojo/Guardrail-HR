import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface AssessmentTransitionProps {
  onComplete: () => void;
  score: number;
}

type TransitionState = 
  | 'finalizing'
  | 'computing'
  | 'pre-reveal'
  | 'reveal'
  | 'complete';

export function AssessmentTransition({ onComplete, score }: AssessmentTransitionProps) {
  const [state, setState] = useState<TransitionState>('finalizing');
  const [checklistProgress, setChecklistProgress] = useState<number>(0);

  useEffect(() => {
    // State progression with measured timing
    const timeline = [
      { state: 'finalizing' as TransitionState, duration: 800 },
      { state: 'computing' as TransitionState, duration: 3500 },
      { state: 'pre-reveal' as TransitionState, duration: 1200 },
      { state: 'reveal' as TransitionState, duration: 2000 },
      { state: 'complete' as TransitionState, duration: 0 }
    ];

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const progressTimeline = () => {
      if (currentIndex < timeline.length) {
        const current = timeline[currentIndex];
        setState(current.state);
        
        if (current.duration > 0) {
          timeoutId = setTimeout(() => {
            currentIndex++;
            progressTimeline();
          }, current.duration);
        } else {
          // Final state - trigger completion
          setTimeout(() => {
            onComplete();
          }, 500);
        }
      }
    };

    progressTimeline();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onComplete]);

  // Checklist progression during computing state
  useEffect(() => {
    if (state === 'computing') {
      const steps = [
        { delay: 400, index: 0 },
        { delay: 1400, index: 1 },
        { delay: 2600, index: 2 }
      ];

      const timeouts = steps.map(({ delay, index }) => 
        setTimeout(() => setChecklistProgress(index + 1), delay)
      );

      return () => timeouts.forEach(clearTimeout);
    }
  }, [state]);

  const getExposureLabel = (score: number) => {
    if (score >= 70) return 'Elevated exposure under CA wage & hour rules';
    if (score >= 40) return 'Moderate exposure under CA wage & hour rules';
    return 'Lower exposure under CA wage & hour rules';
  };

  // State 1: Finalizing
  if (state === 'finalizing') {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[14px] text-theme-text-3">
            Finalizing your assessment
          </p>
        </div>
      </div>
    );
  }

  // State 2: Computing
  if (state === 'computing') {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-5">
        <div className="w-full max-w-[480px]">
          <div className="bg-theme-surface-elevated rounded-[20px] p-8 border border-theme-border-2">
            <h2 className="text-[20px] font-medium text-theme-text-1 mb-8 text-center">
              Calculating your compliance exposure
            </h2>
            
            <div className="space-y-4">
              {/* Checklist Item 1 */}
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                  checklistProgress >= 1 
                    ? 'border-theme-accent bg-theme-accent' 
                    : 'border-theme-border-1'
                }`}>
                  {checklistProgress >= 1 && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
                <div className={`flex-1 transition-colors duration-300 ${
                  checklistProgress >= 1 ? 'text-theme-text-2' : 'text-theme-text-3'
                }`}>
                  <p className="text-[15px]">Reviewing answers</p>
                </div>
              </div>

              {/* Checklist Item 2 */}
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                  checklistProgress >= 2 
                    ? 'border-theme-accent bg-theme-accent' 
                    : 'border-theme-border-1'
                }`}>
                  {checklistProgress >= 2 && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
                <div className={`flex-1 transition-colors duration-300 ${
                  checklistProgress >= 2 ? 'text-theme-text-2' : 'text-theme-text-3'
                }`}>
                  <p className="text-[15px]">Applying California rules</p>
                </div>
              </div>

              {/* Checklist Item 3 */}
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                  checklistProgress >= 3 
                    ? 'border-theme-accent bg-theme-accent' 
                    : 'border-theme-border-1'
                }`}>
                  {checklistProgress >= 3 && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
                <div className={`flex-1 transition-colors duration-300 ${
                  checklistProgress >= 3 ? 'text-theme-text-2' : 'text-theme-text-3'
                }`}>
                  <p className="text-[15px]">Mapping exposure to risk categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State 3: Pre-Reveal Pause
  if (state === 'pre-reveal') {
    return (
      <div className="min-h-screen bg-theme-bg">
        {/* Empty Home layout shell */}
        <div className="mx-auto max-w-[1200px] px-5 xl:px-8 pt-16 xl:pt-20 pb-8">
          <div className="max-w-[720px] min-h-[60vh] flex items-center">
            <p className="text-[17px] text-theme-text-3">
              Your diagnostic snapshot is ready
            </p>
          </div>
        </div>
      </div>
    );
  }

  // State 4: Score Reveal
  if (state === 'reveal') {
    return (
      <div className="min-h-screen bg-theme-bg">
        {/* Snapshot Header */}
        <section className="mx-auto max-w-[1200px] px-5 xl:px-8 pt-16 xl:pt-20 pb-8">
          <div className="max-w-[720px]">
            <h1 className="text-[32px] xl:text-[40px] font-semibold mb-3 opacity-0 animate-fade-in">
              Your compliance snapshot
            </h1>
            <p className="text-[15px] text-theme-text-3 mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Based on your Wage & Hour scan
            </p>
            <p className="text-[13px] text-theme-text-3 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
              Completed {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </section>

        {/* Score Reveal */}
        <section className="mx-auto max-w-[1200px] px-5 xl:px-8 py-12 xl:py-16">
          <div className="mb-12">
            {/* Score */}
            <div className="flex items-baseline gap-3 mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <span className="text-[72px] xl:text-[84px] font-semibold leading-none tracking-tight">
                {score}
              </span>
              <span className="text-[42px] xl:text-[48px] font-normal text-theme-text-3 leading-none">
                / 100
              </span>
            </div>
            
            {/* Supporting line */}
            <p className="text-[16px] text-theme-text-2 mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '900ms' }}>
              {getExposureLabel(score)}
            </p>

            {/* Grounding sentence */}
            <p className="text-[14px] text-theme-text-3 leading-relaxed max-w-[600px] opacity-0 animate-fade-in" style={{ animationDelay: '1100ms' }}>
              This score reflects rule-based checks against California wage & hour requirements based on your responses.
            </p>
          </div>
        </section>

        {/* Animations */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  // State 5: Complete (this won't render as onComplete() is called)
  return null;
}