import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { ResultsPage } from '@/app/components/ResultsPageRefined';
import { PageContainer, Breadcrumb } from '@/app/components/shared/DesignSystem';

export function WageHourResultsPage() {
  const [searchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  
  // Check if this is a re-entry (user returning to completed assessment)
  // In production, this would check session storage, route state, or time since completion
  const isReEntry = searchParams.get('reentry') === 'true';
  
  // Mock data - in a real app this would come from state management or API
  const [score] = useState(72);
  const [completedAt] = useState(Date.now());
  const [userAnswers] = useState<Record<string, boolean>>({
    'Q2': false,
    'Q3': false,
    'Q15': false,
    'Q16': false,
    'Q17': false,
    'Q21': false
  });
  
  // Mock score history for testing diff view
  const scoreHistory = [
    {
      score: 78,
      completedAt: Date.now() - (7 * 24 * 60 * 60 * 1000), // 7 days ago
      version: 1
    }
  ];

  // Fade in on mount
  useEffect(() => {
    // Small delay to allow transition screen to finish
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Modules', href: '/modules' },
          { label: 'Wage & Hour', href: '/modules/wage-hour' },
          { label: 'Results' }
        ]}
      />

      {/* Results page component */}
      <ResultsPage
        score={score}
        completedAt={completedAt}
        userAnswers={userAnswers}
        isReEntry={isReEntry}
        onReviewAnswers={() => {
          // Navigate to assessment in review mode
          console.log('Review answers');
        }}
        onRetakeAssessment={() => {
          // Navigate to assessment
          console.log('Retake assessment');
        }}
        onGoToQuestion={(questionId) => {
          // Navigate to specific question
          console.log('Go to question:', questionId);
        }}
        scoreHistory={scoreHistory}
      />
    </PageContainer>
  );
}