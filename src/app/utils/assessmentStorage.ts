import { AssessmentState, ASSESSMENT_VERSION } from '@/app/types/assessment';

const STORAGE_KEY = 'guardrail_wage_hour_assessment';

export function loadAssessmentState(): AssessmentState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load assessment state:', error);
    return null;
  }
}

export function saveAssessmentState(state: AssessmentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save assessment state:', error);
  }
}

export function createInitialState(businessType: 'commissions' | 'tipped' | 'piece-rate' | 'none'): AssessmentState {
  return {
    assessmentVersion: ASSESSMENT_VERSION,
    currentScore: null,
    scoreHistory: [],
    answers: {},
    businessType
  };
}

export function clearAssessmentState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear assessment state:', error);
  }
}
