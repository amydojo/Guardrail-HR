export interface QuestionMapping {
  questionId: string;
  questionText: string;
  section: string;
  weight: number;
  userAnswer?: boolean;
  status: 'contributing' | 'neutral' | 'positive';
}

export interface Driver {
  id: string;
  title: string;
  summary: string;
  relatedQuestions: string[]; // Question IDs
  whyThisShowedUp: string; // Expanded explanation
  contributingThemes: string[]; // Bullet points
}

export const ASSESSMENT_SECTIONS = [
  { id: 'pay-rates', label: 'Pay rates & overtime' },
  { id: 'breaks', label: 'Breaks' },
  { id: 'timekeeping', label: 'Timekeeping' },
  { id: 'paydays', label: 'Paydays & records' },
  { id: 'contractors', label: 'Contractors' }
] as const;

export const QUESTION_TO_SECTION: Record<string, string> = {
  'Q1': 'pay-rates',
  'Q2': 'pay-rates',
  'Q3': 'pay-rates',
  'Q4': 'pay-rates',
  'Q5': 'pay-rates',
  'Q6': 'breaks',
  'Q7': 'breaks',
  'Q8': 'breaks',
  'Q9': 'timekeeping',
  'Q10': 'timekeeping',
  'Q11': 'timekeeping',
  'Q12': 'timekeeping',
  'Q13': 'timekeeping',
  'Q14': 'timekeeping',
  'Q15': 'paydays',
  'Q16': 'paydays',
  'Q17': 'paydays',
  'Q18': 'paydays',
  'Q19': 'paydays',
  'Q20': 'paydays',
  'Q21': 'contractors',
  'Q22A': 'pay-rates',
  'Q22B': 'pay-rates',
  'Q22C': 'pay-rates'
};

export const DRIVERS: Driver[] = [
  {
    id: 'classification',
    title: 'Employee classification',
    summary: 'Incomplete exemption documentation can increase overtime and wage exposure',
    relatedQuestions: ['Q2', 'Q3'],
    whyThisShowedUp: 'Your responses indicate potential gaps in how exempt roles are verified and documented. This is one of the most common areas of exposure because the rules are specific and shift when roles or pay levels change.',
    contributingThemes: [
      'Missing or outdated exemption reviews',
      'Unclear documentation of job duties',
      'Pay levels that may not meet current thresholds'
    ]
  },
  {
    id: 'contractors',
    title: 'Contractor relationships',
    summary: 'Missing or outdated agreements may trigger misclassification risk',
    relatedQuestions: ['Q21'],
    whyThisShowedUp: 'Your response suggests independent contractor agreements or classification reviews may need attention. California applies a strict three-part test, and most arrangements require written documentation to demonstrate compliance.',
    contributingThemes: [
      'Absent or incomplete contractor agreements',
      'Unclear independence and control boundaries',
      'No regular classification review process'
    ]
  },
  {
    id: 'wage-statements',
    title: 'Wage statements & pay timing',
    summary: 'Small errors here are one of the most common causes of penalties',
    relatedQuestions: ['Q15', 'Q16', 'Q17'],
    whyThisShowedUp: 'Your responses flagged potential issues with pay timing or wage statement completeness. These are frequently audited areas, and even minor omissions can result in statutory penalties that accumulate quickly.',
    contributingThemes: [
      'Late or inconsistent pay delivery',
      'Missing required wage statement fields',
      'Final paycheck timing gaps'
    ]
  }
];

export const QUESTION_DETAILS: Record<string, { text: string; weight: number; section: string }> = {
  'Q1': {
    text: 'Minimum wage compliance',
    weight: 10,
    section: 'pay-rates'
  },
  'Q2': {
    text: 'Wage rules for business type',
    weight: 5,
    section: 'pay-rates'
  },
  'Q3': {
    text: 'Exempt classification verification',
    weight: 10,
    section: 'pay-rates'
  },
  'Q4': {
    text: 'Overtime and double-time calculation',
    weight: 10,
    section: 'pay-rates'
  },
  'Q5': {
    text: 'Bonus and incentive inclusion in overtime',
    weight: 6,
    section: 'pay-rates'
  },
  'Q6': {
    text: 'Meal break timing and tracking',
    weight: 7,
    section: 'breaks'
  },
  'Q7': {
    text: 'Rest break provision',
    weight: 7,
    section: 'breaks'
  },
  'Q8': {
    text: 'Missed break premium payment',
    weight: 6,
    section: 'breaks'
  },
  'Q9': {
    text: 'All time worked compensation',
    weight: 8,
    section: 'timekeeping'
  },
  'Q10': {
    text: 'Time rounding verification',
    weight: 3,
    section: 'timekeeping'
  },
  'Q11': {
    text: 'Show-up pay compliance',
    weight: 4,
    section: 'timekeeping'
  },
  'Q12': {
    text: 'Split-shift payment',
    weight: 3,
    section: 'timekeeping'
  },
  'Q13': {
    text: 'Travel time compensation',
    weight: 3,
    section: 'timekeeping'
  },
  'Q14': {
    text: 'On-call time evaluation',
    weight: 3,
    section: 'timekeeping'
  },
  'Q15': {
    text: 'Payday timeliness',
    weight: 3,
    section: 'paydays'
  },
  'Q16': {
    text: 'Final paycheck timing',
    weight: 5,
    section: 'paydays'
  },
  'Q17': {
    text: 'Wage statement completeness',
    weight: 6,
    section: 'paydays'
  },
  'Q18': {
    text: 'Payroll record retention',
    weight: 3,
    section: 'paydays'
  },
  'Q19': {
    text: 'Paycheck deduction controls',
    weight: 3,
    section: 'paydays'
  },
  'Q20': {
    text: 'Work expense reimbursement',
    weight: 4,
    section: 'paydays'
  },
  'Q21': {
    text: 'Contractor classification review',
    weight: 10,
    section: 'contractors'
  },
  'Q22A': {
    text: 'Commission plan documentation',
    weight: 4,
    section: 'pay-rates'
  },
  'Q22B': {
    text: 'Tip pooling compliance',
    weight: 4,
    section: 'pay-rates'
  },
  'Q22C': {
    text: 'Piece-rate break time payment',
    weight: 4,
    section: 'pay-rates'
  }
};
