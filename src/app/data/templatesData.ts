/**
 * Templates Data
 * Downloadable artifacts: policies, forms, checklists
 */

export interface Template {
  slug: string;
  title: string;
  subtitle: string;
  type: 'Policy' | 'Form' | 'Checklist' | 'Agreement';
  jurisdiction: 'CA' | 'Federal' | 'CA + Federal';
  module: 'Wage & Hour' | 'Classification' | 'Harassment Prevention' | 'Leave Management';
  reviewedDate: string;
  version: string;
  format: string;
  estimatedTime: string;
  inTenMinutes: string[];
  customizeFields: string[];
  implementationSteps: {
    id: string;
    title: string;
    summary: string;
    content: string;
  }[];
  askCounselIf: string[];
  changeLog: {
    version: string;
    date: string;
    changes: string[];
  }[];
  relatedResources: {
    slug: string;
    title: string;
    description: string;
  }[];
  featured?: boolean;
}

export const TEMPLATES_DATA: Record<string, Template> = {
  'meal-rest-break-policy': {
    slug: 'meal-rest-break-policy',
    title: 'Meal & rest break policy',
    subtitle: 'California-compliant policy template with timing requirements and acknowledgment form',
    type: 'Policy',
    jurisdiction: 'CA',
    module: 'Wage & Hour',
    reviewedDate: 'January 2026',
    version: '2.1',
    format: 'DOCX',
    estimatedTime: '10 min',
    inTenMinutes: [
      'Customized policy document ready for employee handbook',
      'Acknowledgment form with required signatures',
      'Clear timing requirements (5hrs for meal, 4hrs for rest) documented'
    ],
    customizeFields: [
      'Company name and location',
      'Meal break timing preferences (before or after 5hrs)',
      'Manager contact for break issues',
      'Acknowledgment date and signature lines'
    ],
    implementationSteps: [
      {
        id: 'customize',
        title: 'Customize template',
        summary: 'Fill in company-specific information and timing preferences',
        content: 'Replace bracketed fields with your company details. Choose meal break timing that works for your operations while staying within the 5-hour window. Update manager contact information.'
      },
      {
        id: 'legal-review',
        title: 'Legal review (recommended)',
        summary: 'Have counsel review if you have complex scheduling or multi-site operations',
        content: 'Consider legal review if you have non-traditional schedules, multiple locations with different break rooms, or unique operational constraints.'
      },
      {
        id: 'distribute',
        title: 'Distribute to employees',
        summary: 'Add to handbook and collect signed acknowledgments',
        content: 'Incorporate into employee handbook. Distribute to all California employees. Collect signed acknowledgment forms and retain in personnel files for duration of employment plus 3 years.'
      }
    ],
    askCounselIf: [
      'You have employees working shifts longer than 10 hours',
      'Your operations involve on-call or emergency response work',
      'You need to implement on-duty meal periods',
      'You have collective bargaining agreements affecting breaks'
    ],
    changeLog: [
      {
        version: '2.1',
        date: 'January 2026',
        changes: [
          'Updated acknowledgment language for 2026 requirements',
          'Added clarification on rest break timing between meal breaks',
          'Updated reference to current Labor Code sections'
        ]
      },
      {
        version: '2.0',
        date: 'June 2025',
        changes: [
          'Major revision to reflect Donohue v. AMN Services decision',
          'Added explicit rest break placement guidance'
        ]
      }
    ],
    relatedResources: [
      {
        slug: 'wage-hour-disclosure',
        title: 'Break violations assessment',
        description: 'Scan current practices for meal and rest break compliance'
      },
      {
        slug: 'timekeeping-policy',
        title: 'Timekeeping policy template',
        description: 'Ensure accurate recording of break periods'
      }
    ],
    featured: true
  },
  'timekeeping-policy': {
    slug: 'timekeeping-policy',
    title: 'Timekeeping policy',
    subtitle: 'Template for accurate time tracking with required record retention schedules',
    type: 'Policy',
    jurisdiction: 'CA + Federal',
    module: 'Wage & Hour',
    reviewedDate: 'January 2026',
    version: '1.3',
    format: 'DOCX',
    estimatedTime: '12 min',
    inTenMinutes: [
      'Complete timekeeping policy ready for handbook',
      'Clear requirements for recording hours, breaks, and overtime',
      'Retention schedule matching CA 3-year requirement'
    ],
    customizeFields: [
      'Company name and timekeeping system details',
      'Manager approval workflow',
      'Payroll contact information',
      'Policy effective date'
    ],
    implementationSteps: [
      {
        id: 'customize',
        title: 'Customize template',
        summary: 'Add company-specific system details and approval workflow',
        content: 'Update timekeeping system name, approval process, and payroll contact. Specify which employees use which tracking method (clock, app, manual).'
      },
      {
        id: 'train-managers',
        title: 'Train managers',
        summary: 'Ensure supervisors understand approval and correction procedures',
        content: 'Review approval timeline, correction procedures, and consequences of time theft or falsification with all managers before rollout.'
      },
      {
        id: 'distribute',
        title: 'Distribute and acknowledge',
        summary: 'Add to handbook and collect signed acknowledgments',
        content: 'Add to employee handbook. Distribute to all employees. Collect signed acknowledgment forms. Retain acknowledgments for 3 years after separation.'
      }
    ],
    askCounselIf: [
      'You have remote workers clocking in from personal devices',
      'Employees regularly work off-the-clock hours',
      'You need to implement automatic rounding policies',
      'You use biometric timekeeping (fingerprint/facial recognition)'
    ],
    changeLog: [
      {
        version: '1.3',
        date: 'January 2026',
        changes: [
          'Added guidance on remote work timekeeping',
          'Updated retention schedule language',
          'Clarified break recording requirements'
        ]
      }
    ],
    relatedResources: [
      {
        slug: 'meal-rest-breaks',
        title: 'Meal & rest breaks policy',
        description: 'Coordinate break documentation requirements'
      },
      {
        slug: 'payroll-records-audit',
        title: 'Payroll records audit guide',
        description: 'Verify retention and completeness of time records'
      }
    ],
    featured: true
  },
  'exempt-employee-acknowledgment': {
    slug: 'exempt-employee-acknowledgment',
    title: 'Exempt employee acknowledgment',
    subtitle: 'Form documenting exempt classification and salary basis requirements',
    type: 'Form',
    jurisdiction: 'CA + Federal',
    module: 'Classification',
    reviewedDate: 'January 2026',
    version: '1.0',
    format: 'PDF',
    estimatedTime: '8 min',
    inTenMinutes: [
      'Signed acknowledgment of exempt status and duties',
      'Documentation of salary amount and basis',
      'Proof employee understands no overtime eligibility'
    ],
    customizeFields: [
      'Employee name and position title',
      'Salary amount and pay frequency',
      'Primary exempt duties description',
      'Effective date and signatures'
    ],
    implementationSteps: [
      {
        id: 'verify',
        title: 'Verify exemption',
        summary: 'Confirm employee meets salary and duties tests before using form',
        content: 'Use exemption checklist to verify employee actually qualifies. This form documents an existing exemption — it does not create one.'
      },
      {
        id: 'complete',
        title: 'Complete form',
        summary: 'Fill in employee details and have both parties sign',
        content: 'Complete all fields. Review with employee. Both employee and authorized manager must sign. Date must match or precede classification effective date.'
      },
      {
        id: 'retain',
        title: 'Retain in personnel file',
        summary: 'Keep with other classification documentation',
        content: 'Store in personnel file with job description and offer letter. Retain for duration of employment plus 3 years. Update if duties or salary change significantly.'
      }
    ],
    askCounselIf: [
      'Employee regularly performs non-exempt duties more than 50% of time',
      'Salary is below current California threshold ($66,560/year)',
      'Employee previously filed wage claim or complained about classification',
      'Position involves supervising fewer than 2 full-time employees (executive exemption)'
    ],
    changeLog: [
      {
        version: '1.0',
        date: 'January 2026',
        changes: [
          'Initial release',
          'Reflects 2026 salary thresholds',
          'Includes updated duties language'
        ]
      }
    ],
    relatedResources: [
      {
        slug: 'exemption-checklist',
        title: 'Exemption checklist',
        description: 'Verify employee meets all exemption requirements before using this form'
      }
    ],
    featured: true
  },
  'contractor-agreement': {
    slug: 'contractor-agreement',
    title: 'Independent contractor agreement',
    subtitle: 'Template agreement with ABC test compliance provisions for California',
    type: 'Agreement',
    jurisdiction: 'CA',
    module: 'Classification',
    reviewedDate: 'December 2025',
    version: '3.0',
    format: 'DOCX',
    estimatedTime: '15 min',
    inTenMinutes: [
      'Attorney-reviewed agreement template addressing ABC test',
      'Provisions covering control, business nature, and independent establishment',
      'Signature and date blocks for both parties'
    ],
    customizeFields: [
      'Company and contractor names/addresses',
      'Scope of work and deliverables',
      'Payment terms and schedule',
      'Start date and term',
      'Specific tools/equipment contractor provides'
    ],
    implementationSteps: [
      {
        id: 'verify-classification',
        title: 'Verify IC classification',
        summary: 'Confirm relationship meets ABC test before using agreement',
        content: 'This agreement alone does not make someone an independent contractor. Use contractor documentation checklist to verify ABC test compliance first.'
      },
      {
        id: 'customize',
        title: 'Customize agreement',
        summary: 'Fill in work scope, payment terms, and company details',
        content: 'Be specific about deliverables and outcomes, not hours or methods. Emphasize contractor\'s control over how work is performed. Include contractor\'s business details (license, insurance, other clients).'
      },
      {
        id: 'execute',
        title: 'Execute and retain',
        summary: 'Both parties sign before work begins',
        content: 'Have both parties sign before contractor begins work. Retain executed copy for duration of relationship plus 4 years. Update if scope or terms change materially.'
      }
    ],
    askCounselIf: [
      'Contractor will work on-site at your location regularly',
      'You are providing tools, equipment, or office space',
      'Contractor\'s work is part of your core business operations',
      'Relationship will last longer than 6 months',
      'Contractor does not have other clients or independent business'
    ],
    changeLog: [
      {
        version: '3.0',
        date: 'December 2025',
        changes: [
          'Major revision for AB 2257 clarifications',
          'Added business-to-business exception language',
          'Updated ABC test compliance provisions'
        ]
      },
      {
        version: '2.1',
        date: 'March 2024',
        changes: [
          'Updated for Dynamex/AB 5 standard',
          'Added explicit ABC test language'
        ]
      }
    ],
    relatedResources: [
      {
        slug: 'contractor-documentation',
        title: 'Contractor documentation checklist',
        description: 'Verify ABC test compliance before executing agreement'
      }
    ],
    featured: true
  },
  'wage-statement-template': {
    slug: 'wage-statement-template',
    title: 'Wage statement template',
    subtitle: 'Compliant paystub format with all required California wage statement fields',
    type: 'Form',
    jurisdiction: 'CA',
    module: 'Wage & Hour',
    reviewedDate: 'January 2026',
    version: '1.2',
    format: 'XLSX',
    estimatedTime: '10 min',
    inTenMinutes: [
      'Template showing all 9 required wage statement items',
      'Sample calculations for regular, overtime, and double-time',
      'Format ready to share with payroll provider'
    ],
    customizeFields: [
      'Company legal name and address',
      'Pay period dates',
      'Employee name and last 4 of SSN',
      'Rate and hours by type',
      'Deduction descriptions'
    ],
    implementationSteps: [
      {
        id: 'review-requirements',
        title: 'Review requirements',
        summary: 'Understand all 9 required fields before customizing',
        content: 'Review wage statement requirements guide to understand each required field. This template includes all mandatory items but you must populate with accurate data.'
      },
      {
        id: 'customize',
        title: 'Customize template',
        summary: 'Fill in company information and sample pay data',
        content: 'Add company name, address, and sample employee data. Show examples of overtime calculations. Include all deduction types you use. Verify totals calculate correctly.'
      },
      {
        id: 'implement',
        title: 'Share with payroll provider',
        summary: 'Ensure your payroll system outputs all required fields',
        content: 'Share template with payroll provider. Verify their system can output all fields. Test with sample paystub before first payroll. Audit quarterly for compliance.'
      }
    ],
    askCounselIf: [
      'You have piece-rate, commission, or other non-hourly compensation',
      'Employees work in multiple pay rates or positions per period',
      'You provide non-cash compensation (lodging, meals)',
      'You have garnishments or complex deduction scenarios'
    ],
    changeLog: [
      {
        version: '1.2',
        date: 'January 2026',
        changes: [
          'Updated for 2026 minimum wage rates in examples',
          'Added clarification on overtime rate display',
          'Updated inclusive date range format'
        ]
      }
    ],
    relatedResources: [
      {
        slug: 'wage-statement-guide',
        title: 'Wage statement requirements',
        description: 'Detailed explanation of all required fields'
      },
      {
        slug: 'overtime-calculator',
        title: 'Overtime calculator',
        description: 'Calculate correct overtime rates for paystubs'
      }
    ],
    featured: true
  },
  'new-hire-acknowledgment': {
    slug: 'new-hire-acknowledgment',
    title: 'New hire acknowledgment package',
    subtitle: 'Bundle of required California new hire forms and acknowledgments',
    type: 'Form',
    jurisdiction: 'CA',
    module: 'Wage & Hour',
    reviewedDate: 'January 2026',
    version: '2.0',
    format: 'PDF',
    estimatedTime: '8 min',
    inTenMinutes: [
      'Complete new hire acknowledgment packet',
      'Forms covering wage notice, handbook, breaks, and payday notice',
      'Signature pages for all required acknowledgments'
    ],
    customizeFields: [
      'Employee name and hire date',
      'Position title and pay rate',
      'Regular payday schedule',
      'Company name and worksite location'
    ],
    implementationSteps: [
      {
        id: 'customize',
        title: 'Customize forms',
        summary: 'Fill in employee and company information',
        content: 'Complete all employee details, position information, and pay terms. Verify hire date and first payday. Ensure worksite address is correct for multi-location companies.'
      },
      {
        id: 'review-at-hire',
        title: 'Review with new hire',
        summary: 'Explain each form during onboarding',
        content: 'Review each document with employee during onboarding. Explain payday schedule, break requirements, and handbook policies. Give employee opportunity to ask questions.'
      },
      {
        id: 'collect-and-retain',
        title: 'Collect signatures and retain',
        summary: 'Get signed copies and store in personnel file',
        content: 'Collect all signed forms. Provide employee with copies. Retain originals in personnel file. Keep for duration of employment plus 3 years.'
      }
    ],
    askCounselIf: [
      'Employee will work remotely or at multiple locations',
      'Compensation includes commission, bonus, or piece-rate',
      'Employee is rehire or boomerang (returning after separation)',
      'Employee is exempt but previously worked as non-exempt for you'
    ],
    changeLog: [
      {
        version: '2.0',
        date: 'January 2026',
        changes: [
          'Updated wage notice for 2026 minimum wage',
          'Revised break acknowledgment language',
          'Added remote work location disclosure'
        ]
      }
    ],
    relatedResources: [
      {
        slug: 'meal-rest-breaks',
        title: 'Meal & rest breaks policy',
        description: 'Detailed break requirements to reference during onboarding'
      }
    ],
    featured: false
  }
};

export const ALL_TEMPLATES = Object.values(TEMPLATES_DATA);
