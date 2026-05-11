import { ResourceData } from './resourcesData';

export const RESOURCES_DATA_PART3: Record<string, ResourceData> = {
  'payroll-records-audit': {
    slug: 'payroll-records-audit',
    title: 'Payroll records audit guide',
    subtitle: 'Comprehensive checklist for reviewing payroll compliance and record retention',
    type: 'Guide',
    lastUpdated: 'January 2026',
    estimatedTime: '15 min',
    format: 'PDF + Audit Checklist',
    overview: 'This audit guide helps you systematically review payroll records for compliance with California and federal requirements. Use it quarterly or annually to identify and remedy record-keeping gaps before they become audit findings.',
    sections: [
      {
        id: 'audit-scope',
        title: 'Audit scope and preparation',
        summary: 'What to review and how to organize an effective payroll audit',
        effort: 'low',
        content: {
          overview: 'A thorough payroll audit reviews records, systems, and processes to ensure compliance with wage and hour laws.',
          subsections: [
            {
              title: 'Records to review',
              content: 'Gather these documents for audit:',
              items: [
                'Wage statements (paystubs) for sample pay periods',
                'Time records (clock in/out, meal breaks, timesheets)',
                'Payroll registers showing gross pay, deductions, net pay',
                'Employee classification documents (exempt vs. non-exempt)',
                'Independent contractor agreements and 1099s',
                'Job descriptions and offer letters',
                'Policy manuals (timekeeping, overtime, breaks)',
                'Previous audit findings and corrective actions taken'
              ]
            },
            {
              title: 'Sample selection',
              content: 'How to select representative records:',
              items: [
                'Review 3-6 recent pay periods (covering at least one full month)',
                'Include sample of employees from each classification (exempt, non-exempt, contractor)',
                'Prioritize high-risk roles (managers, fluctuating schedules, commission/bonus)',
                'Include recently hired and recently terminated employees',
                'Sample different departments and locations if applicable'
              ]
            },
            {
              title: 'Audit frequency',
              content: 'How often to conduct reviews:',
              items: [
                'Full audit: Annually at minimum',
                'Targeted review: Quarterly for high-risk areas',
                'After major changes: New payroll system, policy updates, classification changes',
                'Post-complaint: Immediately after employee complaint or agency inquiry'
              ]
            }
          ]
        }
      },
      {
        id: 'wage-statement-review',
        title: 'Wage statement compliance',
        summary: 'Verify paystubs contain all nine required fields',
        effort: 'medium',
        content: {
          overview: 'Review wage statements to ensure they comply with California Labor Code §226 requirements.',
          subsections: [
            {
              title: 'Nine-field checklist',
              content: 'Confirm each wage statement includes:',
              items: [
                '✓ Gross wages earned (separate from net pay)',
                '✓ Total hours worked (for non-exempt employees)',
                '✓ Number of piece-rate units and rate (if applicable)',
                '✓ All deductions itemized separately (not grouped)',
                '✓ Net wages earned (take-home pay)',
                '✓ Pay period start and end dates (not just check date)',
                '✓ Employee name and last four of SSN or EIN',
                '✓ Employer legal name and address',
                '✓ All applicable hourly rates and hours worked at each rate'
              ]
            },
            {
              title: 'Common errors to flag',
              content: 'Look for these frequent violations:',
              items: [
                'Missing pay period dates or showing only check date',
                'Combining gross and net wages into one field',
                'Grouping deductions (e.g., "Taxes" instead of itemizing each tax)',
                'Not showing separate overtime and double-time rates',
                'Using P.O. Box instead of physical address',
                'Abbreviations that could confuse employees'
              ]
            },
            {
              title: 'Remediation steps',
              content: 'If violations found:',
              items: [
                'Correct template immediately for future pay periods',
                'Provide corrected statements to affected employees',
                'Calculate potential exposure ($50-$100 per violation, max $4,000 per employee)',
                'Document corrective actions taken and date implemented',
                'Consider whether to voluntarily pay penalties or contest'
              ]
            }
          ]
        }
      },
      {
        id: 'time-records',
        title: 'Time and attendance records',
        summary: 'Review accuracy and completeness of hours worked documentation',
        effort: 'high',
        content: {
          overview: 'Verify time records accurately capture all hours worked, meal breaks, and overtime.',
          subsections: [
            {
              title: 'Completeness check',
              content: 'Ensure time records show:',
              items: [
                'Clock in/out times for each shift',
                'Meal break start and end times (must clock out/in)',
                'All hours worked, including before/after shift and partial hours',
                'Overtime and double-time hours separately tracked',
                'No gaps or missing punch data',
                'Corrections documented and approved by supervisor'
              ]
            },
            {
              title: 'Meal and rest break compliance',
              content: 'Review break records for violations:',
              items: [
                'Meal breaks provided before end of 5th hour',
                'Meal breaks at least 30 minutes duration',
                'No meal breaks missed without premium pay',
                'Rest breaks provided (at least one per 4 hours worked)',
                'Rest breaks not at beginning or end of shift',
                'Patterns of late or short breaks that indicate systematic issue'
              ]
            },
            {
              title: 'Red flags',
              content: 'Investigate if you find:',
              items: [
                'Repeated missed punches or manual corrections',
                'Employee working through meal breaks frequently',
                'Employees clocking out exactly at scheduled time every day (suggests rounding or manipulation)',
                'Off-the-clock work (emails sent before clock in or after clock out)',
                'Time records inconsistent with work produced or emails sent',
                'Employees working 7 days per week regularly'
              ]
            },
            {
              title: 'Retention verification',
              content: 'Confirm records are being kept for required period:',
              items: [
                'Time records retained for 3 years minimum (4 years recommended)',
                'Accessible and organized for easy retrieval',
                'Secure storage with backup copies',
                'Former employee records retained post-termination'
              ]
            }
          ]
        }
      },
      {
        id: 'classification-review',
        title: 'Employee classification audit',
        summary: 'Verify exempt and contractor classifications are supportable',
        effort: 'high',
        content: {
          overview: 'Review employee and contractor classifications to identify misclassification risks.',
          subsections: [
            {
              title: 'Exempt employee review',
              content: 'For each exempt classification, verify:',
              items: [
                'Salary meets current minimum threshold (2026: $66,560+ in CA)',
                'Job description shows exempt duties as primary responsibility',
                'Employee actually performs exempt duties more than 50% of time',
                'No evidence of detailed supervision or task assignments',
                'Position fits executive, administrative, or professional exemption',
                'Salary is not reduced for partial-day absences'
              ]
            },
            {
              title: 'Independent contractor review',
              content: 'For contractors, verify ABC test compliance:',
              items: [
                'A: Contractor has freedom from control (sets own schedule, methods)',
                'B: Work is outside usual course of hiring entity\'s business',
                'C: Contractor has independently established trade/business',
                'Written agreement on file with proper terms',
                'Contractor has business license, insurance, EIN',
                'Contractor has other clients (not exclusive relationship)',
                'Payment is per project, not hourly',
                'Form 1099 issued (not W-2)'
              ]
            },
            {
              title: 'High-risk classifications',
              content: 'Prioritize review of:',
              items: [
                'Employees with "manager" or "supervisor" titles but no direct reports',
                'Exempt employees earning close to minimum threshold',
                'Administrative assistants classified as exempt',
                'Contractors working on-site with company equipment',
                'Contractors engaged for more than 6 months',
                'Any classification that changed recently'
              ]
            }
          ]
        }
      },
      {
        id: 'remediation',
        title: 'Findings and remediation plan',
        summary: 'How to address audit findings and prevent recurrence',
        effort: 'medium',
        content: {
          overview: 'Document audit findings, calculate exposure, and implement corrective actions.',
          subsections: [
            {
              title: 'Documenting findings',
              content: 'Create audit report that includes:',
              items: [
                'Summary of records reviewed (dates, employees, sample size)',
                'Specific violations identified with examples',
                'Number of affected employees',
                'Time period of violations',
                'Estimated financial exposure',
                'Root cause analysis (system error, policy gap, training issue)',
                'Recommended corrective actions with timeline'
              ]
            },
            {
              title: 'Immediate corrections',
              content: 'Take these steps promptly:',
              items: [
                'Fix any system or template errors causing violations',
                'Reclassify misclassified employees immediately',
                'Pay any owed wages, overtime, or premium pay',
                'Provide corrected wage statements if required',
                'Implement stop-gap measures to prevent ongoing violations',
                'Notify affected employees of errors and corrections made'
              ]
            },
            {
              title: 'Long-term improvements',
              content: 'Prevent recurrence with:',
              items: [
                'Update policies and employee handbook',
                'Train managers and supervisors on requirements',
                'Implement system controls (alerts, exception reports)',
                'Establish regular audit schedule',
                'Assign compliance ownership to specific role',
                'Consider engaging employment counsel for complex issues'
              ]
            },
            {
              title: 'When to self-report',
              content: 'Consider voluntary disclosure if:',
              items: [
                'Violations are widespread and affect many employees',
                'Significant unpaid wages owed',
                'Misclassification issues identified',
                'Consult employment attorney before self-reporting',
                'May reduce penalties or demonstrate good faith'
              ]
            }
          ]
        }
      }
    ],
    relatedResources: [
      {
        slug: 'wage-statement-guide',
        title: 'Wage statement requirements',
        description: 'Detailed guide to the nine required fields'
      },
      {
        slug: 'exemption-checklist',
        title: 'Exemption checklist',
        description: 'Verify exempt classifications'
      },
      {
        slug: 'timekeeping-policy',
        title: 'Timekeeping policy template',
        description: 'Best practices for time tracking'
      }
    ]
  },

  'training-acknowledgment': {
    slug: 'training-acknowledgment',
    title: 'Policy acknowledgment form',
    subtitle: 'Template for documenting employee receipt and understanding of wage & hour policies',
    type: 'Template',
    lastUpdated: 'January 2026',
    estimatedTime: '5 min',
    format: 'DOC + PDF',
    overview: 'This acknowledgment form documents that employees have received, reviewed, and understood key wage and hour policies. Use it during onboarding and whenever policies are updated.',
    sections: [
      {
        id: 'form-sections',
        title: 'Required form sections',
        summary: 'Essential elements every acknowledgment form should include',
        effort: 'low',
        content: {
          overview: 'A comprehensive acknowledgment form protects both employer and employee by creating a record of policy communication.',
          subsections: [
            {
              title: 'Employee information',
              content: 'Capture identifying information:',
              items: [
                'Full legal name (as used for tax purposes)',
                'Employee ID number',
                'Job title and department',
                'Hire date or date of policy update',
                'Employment classification (exempt, non-exempt, contractor)'
              ]
            },
            {
              title: 'Policies acknowledged',
              content: 'List specific policies being acknowledged:',
              items: [
                'Timekeeping and time recording procedures',
                'Meal and rest break requirements',
                'Overtime authorization and compensation',
                'Off-the-clock work prohibition',
                'Wage statement delivery method',
                'Reporting missed breaks or time recording errors',
                'Anti-retaliation protection'
              ]
            },
            {
              title: 'Employee statements',
              content: 'Employee confirms:',
              items: [
                '"I have received a copy of the [Company Name] wage and hour policies"',
                '"I have read and understand these policies"',
                '"I have had an opportunity to ask questions and receive clarification"',
                '"I understand that I am responsible for complying with these policies"',
                '"I know how to report violations or concerns without retaliation"',
                '"I understand that failure to comply may result in disciplinary action"'
              ]
            },
            {
              title: 'Signature and date',
              content: 'Required signatures:',
              items: [
                'Employee signature and date',
                'Optional: Manager/supervisor signature confirming training provided',
                'HR representative signature (if applicable)',
                'Method of acknowledgment (in-person, electronic, mailed)'
              ]
            }
          ]
        }
      },
      {
        id: 'specific-acknowledgments',
        title: 'Policy-specific acknowledgments',
        summary: 'Detailed acknowledgments for high-risk policy areas',
        effort: 'medium',
        content: {
          overview: 'Include specific acknowledgment language for policies that carry high compliance risk.',
          subsections: [
            {
              title: 'Timekeeping acknowledgment',
              content: 'Employee acknowledges:',
              items: [
                '"I will accurately record all time worked, including start and stop times"',
                '"I will clock out and back in for meal periods"',
                '"I will not perform any work duties while clocked out"',
                '"I will report any missed punches or time recording errors immediately"',
                '"I understand that falsifying time records may result in termination"'
              ]
            },
            {
              title: 'Meal and rest breaks',
              content: 'Employee confirms understanding:',
              items: [
                '"I am entitled to meal breaks of at least 30 minutes when I work more than 5 hours"',
                '"I must clock out for meal breaks and remain completely off duty"',
                '"I am entitled to paid 10-minute rest breaks based on hours worked"',
                '"I must report any missed, late, or interrupted breaks to my supervisor immediately"',
                '"I understand that premium pay is owed for each missed break"'
              ]
            },
            {
              title: 'Overtime authorization',
              content: 'Employee acknowledges:',
              items: [
                '"I must obtain supervisor approval before working overtime"',
                '"All overtime hours will be compensated at the legally required rate"',
                '"California requires overtime for hours over 8 in a day or 40 in a week"',
                '"I will not work unauthorized overtime without prior approval"',
                '"Failure to obtain approval may result in discipline, but all time worked will be paid"'
              ]
            },
            {
              title: 'Off-the-clock work prohibition',
              content: 'Employee understands:',
              items: [
                '"I will not perform work before clocking in or after clocking out"',
                '"I will not respond to work communications during unpaid meal breaks"',
                '"I will not take work home without recording my time"',
                '"Any work performed must be recorded and will be compensated"',
                '"I will report if I am pressured to work off the clock"'
              ]
            }
          ]
        }
      },
      {
        id: 'delivery-methods',
        title: 'Acknowledgment delivery and collection',
        summary: 'How to effectively distribute and track policy acknowledgments',
        effort: 'low',
        content: {
          overview: 'The method of delivering and collecting acknowledgments affects their enforceability and usefulness.',
          subsections: [
            {
              title: 'Distribution methods',
              content: 'Options for providing policies:',
              items: [
                'New hire orientation: Review policies in person and sign at onboarding',
                'Employee handbook: Include acknowledgment page in handbook',
                'Electronic delivery: Use HRIS or document management system',
                'Email: Send policies with read receipt and reply with acknowledgment',
                'Standalone training: Conduct dedicated training session on wage & hour policies'
              ]
            },
            {
              title: 'Electronic acknowledgments',
              content: 'If using digital signatures:',
              items: [
                'Use compliant e-signature platform (DocuSign, Adobe Sign, etc.)',
                'Include IP address and timestamp with signature',
                'Provide option to print or download signed copy',
                'Maintain secure storage of executed documents',
                'Ensure system is accessible to all employees'
              ]
            },
            {
              title: 'Tracking and retention',
              content: 'Maintain acknowledgment records:',
              items: [
                'File signed acknowledgments in personnel files',
                'Create tracking log of who has/hasn\'t signed',
                'Follow up on outstanding acknowledgments promptly',
                'Retain for duration of employment plus 4 years',
                'Organize by policy version and effective date'
              ]
            },
            {
              title: 'Re-acknowledgment triggers',
              content: 'Obtain new acknowledgments when:',
              items: [
                'Policies are materially updated',
                'Employee changes classification (non-exempt to exempt)',
                'Employee transfers to role with different policies',
                'At least annually as a best practice',
                'After compliance issues or audit findings'
              ]
            }
          ]
        }
      },
      {
        id: 'best-practices',
        title: 'Implementation best practices',
        summary: 'How to make acknowledgments meaningful and defensible',
        effort: 'low',
        content: {
          overview: 'An acknowledgment form is only valuable if employees actually understand the policies they\'re signing.',
          subsections: [
            {
              title: 'Training before acknowledgment',
              content: 'Best practices:',
              items: [
                'Provide live or recorded training on policies before signing',
                'Allow time for employees to read policies thoroughly',
                'Encourage questions and provide clear answers',
                'Explain consequences of non-compliance',
                'Demonstrate how to use timekeeping system, report issues, etc.'
              ]
            },
            {
              title: 'Language and accessibility',
              content: 'Ensure acknowledgments are understandable:',
              items: [
                'Use plain language, not legalese',
                'Translate into languages spoken by workforce',
                'Provide in accessible formats for disabilities (large print, screen reader compatible)',
                'Keep acknowledgment form to 1-2 pages maximum',
                'Include contact information for questions'
              ]
            },
            {
              title: 'Documentation tips',
              content: 'Strengthen defensibility:',
              items: [
                'Attach copy of full policies to acknowledgment',
                'Include version number and effective date on form',
                'Have manager sign confirming training was provided',
                'Keep training attendance sheets or completion certificates',
                'Document any employee concerns or questions raised'
              ]
            },
            {
              title: 'What NOT to include',
              content: 'Avoid these problematic provisions:',
              items: [
                'Don\'t include releases or waivers of rights',
                'Don\'t make signing condition of continued employment for existing employees',
                'Don\'t include binding arbitration clauses (separate agreement)',
                'Don\'t bundle with unrelated acknowledgments (safety, confidentiality)',
                'Don\'t use acknowledgment as sole defense—actual compliance is key'
              ]
            }
          ]
        }
      }
    ],
    relatedResources: [
      {
        slug: 'timekeeping-policy',
        title: 'Timekeeping policy template',
        description: 'Policy to be acknowledged by employees'
      },
      {
        slug: 'meal-rest-breaks',
        title: 'Meal & rest breaks policy',
        description: 'Break policy requiring acknowledgment'
      },
      {
        slug: 'payroll-records-audit',
        title: 'Payroll records audit guide',
        description: 'Verify acknowledgments are on file during audit'
      }
    ]
  }
};
