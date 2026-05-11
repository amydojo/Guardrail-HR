export interface AssessmentAnswer {
  questionId: string;
  value: boolean;
  timestamp: number;
  version: string;
}

export interface AssessmentScore {
  score: number;
  completedAt: number;
  version: number;
  answers: Record<string, boolean>;
}

export interface AssessmentState {
  assessmentVersion: string; // e.g., "Wage & Hour v1"
  currentScore: AssessmentScore | null;
  scoreHistory: AssessmentScore[];
  answers: Record<string, AssessmentAnswer>;
  businessType: 'commissions' | 'tipped' | 'piece-rate' | 'none';
}

export const ASSESSMENT_VERSION = 'Wage & Hour v1';
