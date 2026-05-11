import { ResourceData } from './resourcesData';

export const RESOURCES_DATA_PART2: Record<string, ResourceData> = {
  'timekeeping-policy': {
    slug: 'timekeeping-policy',
    title: 'Timekeeping policy template',
    subtitle: 'Best practices for accurate time tracking and California record retention requirements',
    type: 'Template',
    lastUpdated: 'January 2026',
    estimatedTime: '10 min',
    format: 'DOC + Policy Template',
    overview: 'This policy template provides a framework for accurate time tracking, meal/rest break recording, and record retention. Use it to establish consistent timekeeping practices and reduce wage and hour disputes.',
    sections: [
      {
        id: 'time-recording',
        title: 'Time recording requirements',
        summary: 'How and when employees must record work time',
        effort: 'low',
        content: {
          overview: 'California requires employers to maintain accurate records of hours worked. This section outlines time recording rules and employee responsibilities.',
          subsections: [
            {
              title: 'Clock in/out procedures',
              content: 'Employees must:',
              items: [
                'Clock in at the start of each shift before beginning work',
                'Clock out for unpaid meal periods (30 minutes or more)',
                'Clock in when returning from meal periods',
                'Clock out at the end of each shift',
                'Use assigned time clock, badge, or system—no buddy punching'
              ]
            },
            {
              title: 'Meal and rest break recording',
              content: 'Break tracking requirements:',
              items: [
                'Meal periods: Must clock out and back in',
                'Rest periods: Remain clocked in (paid time)',
                'Partial or interrupted breaks: Report immediately to supervisor',
                'Late or missed breaks: Report same day for premium pay processing'
              ]
            },
            {
              title: 'Off-the-clock work prohibition',
              content: 'Employees are strictly prohibited from:',
              items: [
                'Working before clocking in or after clocking out',
                'Responding to work emails or calls while off the clock',
                'Taking work home without recording time',
                'Performing any job duties during unpaid meal breaks',
                'Skipping meal or rest breaks to leave early'
              ]
            },
            {
              title: 'Time record corrections',
              content: 'Process for fixing errors:',
              items: [
                'Employees must report missed punches or errors by end of shift',
                'Supervisor approves corrections in writing',
                'Corrections must be documented with reason and date',
                'Systematic errors (timeclock malfunctions) reported to payroll immediately'
              ]
            }
          ]
        }
      },
      {
        id: 'manager-responsibilities',
        title: 'Manager and supervisor duties',
        summary: 'Oversight and enforcement of timekeeping policies',
        effort: 'medium',
        content: {
          overview: 'Supervisors are responsible for ensuring employees accurately record time and comply with break requirements.',
          subsections: [
            {
              title: 'Daily monitoring',
              content: 'Managers must:',
              items: [
                'Review time records daily for missing punches or irregularities',
                'Ensure employees take meal and rest breaks at appropriate times',
                'Address any reported missed or late breaks immediately',
                'Approve or deny time correction requests promptly',
                'Report systematic issues to HR within 24 hours'
              ]
            },
            {
              title: 'Preventing violations',
              content: 'Proactive compliance steps:',
              items: [
                'Schedule adequate coverage so breaks can be taken',
                'Remind employees to take breaks before they\'re due',
                'Do not pressure employees to skip breaks or work through meals',
                'Investigate complaints of managers discouraging breaks',
                'Model appropriate break-taking behavior'
              ]
            },
            {
              title: 'Violation reporting',
              content: 'When violations occur:',
              items: [
                'Document missed meal or rest breaks immediately',
                'Submit premium pay authorization same day',
                'Report patterns of violations to HR',
                'Participate in corrective action planning',
                'Do not retaliate against employees who report violations'
              ]
            }
          ]
        }
      },
      {
        id: 'record-retention',
        title: 'Record retention requirements',
        summary: 'How long to keep time records and what must be preserved',
        effort: 'low',
        content: {
          overview: 'California requires employers to retain time and payroll records for at least three years. Best practice is four years to align with statute of limitations.',
          subsections: [
            {
              title: 'Minimum retention periods',
              content: 'Keep these records for specified duration:',
              items: [
                'Time records (clock in/out, meal breaks): 3 years minimum, 4 years recommended',
                'Payroll records (wage statements, pay registers): 3 years minimum',
                'Personnel files (hire date, job description, termination): 4 years after separation',
                'Tip records (if applicable): 3 years',
                'FLSA compliance records: 3 years (federal requirement)'
              ]
            },
            {
              title: 'What to retain',
              content: 'Records must include:',
              items: [
                'Employee name and address',
                'Occupation/job title',
                'Time of day and day of week work begins',
                'Hours worked each workday and total hours each workweek',
                'Basis of pay (hourly, salary, piece rate, commission)',
                'Regular rate of pay and overtime rate',
                'All wages earned each pay period',
                'Meal and rest break records or attestations'
              ]
            },
            {
              title: 'Storage and access',
              content: 'How records should be maintained:',
              items: [
                'Secure storage (physical or electronic) with access controls',
                'Organized by employee and date for easy retrieval',
                'Available for inspection by Labor Commissioner upon request',
                'Backup copies recommended in case of system failure',
                'Former employee records retained for full retention period'
              ]
            }
          ]
        }
      },
      {
        id: 'remote-work',
        title: 'Remote and hybrid work considerations',
        summary: 'Special timekeeping rules for off-site employees',
        effort: 'medium',
        content: {
          overview: 'Remote workers have the same timekeeping requirements as on-site employees, but tracking can be more challenging.',
          subsections: [
            {
              title: 'Time tracking for remote workers',
              content: 'Remote employees must:',
              items: [
                'Use company-provided time tracking system or app',
                'Record actual start and stop times, not scheduled times',
                'Clock in/out for meal periods',
                'Report any time worked outside scheduled hours',
                'Confirm breaks were taken as required'
              ]
            },
            {
              title: 'Employer obligations',
              content: 'Employers must ensure:',
              items: [
                'Remote employees have functioning time tracking tools',
                'Clear instructions on when/how to record time',
                'Meal and rest breaks are taken even when working from home',
                'No expectation to respond to communications during breaks',
                'Overtime is approved in advance, not performed without authorization'
              ]
            },
            {
              title: 'Common remote work issues',
              content: 'Address these risks:',
              items: [
                'Employees working "off the clock" by checking emails before logging in',
                'Skipping meal breaks because they\'re home',
                'Inconsistent time recording across remote and in-office days',
                'Managers not monitoring remote employee time records',
                'Lack of documentation when equipment failure prevents clocking in'
              ]
            }
          ]
        }
      }
    ],
    relatedResources: [
      {
        slug: 'meal-rest-breaks',
        title: 'Meal & rest breaks policy',
        description: 'California break requirements and timing rules'
      },
      {
        slug: 'payroll-records-audit',
        title: 'Payroll records audit guide',
        description: 'Review checklist for compliant record-keeping'
      },
      {
        slug: 'training-acknowledgment',
        title: 'Policy acknowledgment form',
        description: 'Employee acknowledgment of timekeeping policy'
      }
    ]
  },

  'contractor-documentation': {
    slug: 'contractor-documentation',
    title: 'Contractor documentation checklist',
    subtitle: 'Essential elements for compliant independent contractor agreements and AB5 compliance',
    type: 'Checklist',
    lastUpdated: 'January 2026',
    estimatedTime: '12 min',
    format: 'PDF + Checklist',
    overview: 'California\'s ABC test (AB5) makes it difficult to classify workers as independent contractors. This checklist covers the ABC test requirements, essential contract terms, and documentation needed to support independent contractor status.',
    sections: [
      {
        id: 'abc-test',
        title: 'The ABC test',
        summary: 'All three prongs must be met for independent contractor status',
        effort: 'high',
        content: {
          overview: 'Under AB5, workers are presumed to be employees unless the hiring entity proves all three elements of the ABC test.',
          subsections: [
            {
              title: 'Prong A: Freedom from control',
              content: 'Contractor must be free from control and direction in performing work:',
              items: [
                'Contractor sets own schedule and work hours',
                'Contractor determines how to complete the work (methods and processes)',
                'No requirement to attend meetings, trainings, or follow company policies',
                'Contractor uses own tools, equipment, and workspace',
                'Hiring entity does not supervise or review work in progress',
                'Red flag: Detailed instructions, daily check-ins, or required office hours'
              ]
            },
            {
              title: 'Prong B: Outside usual business',
              content: 'Work must be outside the usual course of the hiring entity\'s business:',
              items: [
                'Contractor performs work different from what the company usually does',
                'Example: A restaurant hiring a plumber is outside usual business',
                'Example: A restaurant hiring a cook is NOT outside usual business',
                'This prong is hardest to satisfy for core business functions',
                'Exception: If contractor works at a location other than hiring entity\'s place of business and is in independent trade/occupation'
              ]
            },
            {
              title: 'Prong C: Independently established trade',
              content: 'Contractor must have an independently established business:',
              items: [
                'Contractor has own business entity (LLC, corporation, sole proprietorship)',
                'Business license and liability insurance in contractor\'s name',
                'Contractor advertises services to public',
                'Contractor has other clients (not exclusively for one hiring entity)',
                'Contractor has own business location or registered address',
                'Red flag: No business license, works exclusively for one company'
              ]
            }
          ]
        }
      },
      {
        id: 'contract-elements',
        title: 'Required contract elements',
        summary: 'Essential terms every independent contractor agreement must include',
        effort: 'medium',
        content: {
          overview: 'A written agreement is critical for establishing and documenting independent contractor status.',
          subsections: [
            {
              title: 'Scope of work and deliverables',
              content: 'Agreement must specify:',
              items: [
                'Specific project or deliverable (not "ongoing services")',
                'Defined start and end dates or milestones',
                'Acceptance criteria for deliverables',
                'Project-based rather than time-based engagement',
                'Avoid language suggesting employment (e.g., "duties," "responsibilities")'
              ]
            },
            {
              title: 'Independence and control',
              content: 'Contract should state:',
              items: [
                'Contractor free to set own schedule and work methods',
                'Contractor uses own tools and equipment',
                'Contractor can hire assistants or subcontractors',
                'No requirement to work exclusively for hiring entity',
                'Contractor responsible for own workspace'
              ]
            },
            {
              title: 'Payment terms',
              content: 'Compensation structure:',
              items: [
                'Payment per project, milestone, or deliverable (not hourly or salary)',
                'Invoicing procedure and payment timing',
                'Contractor responsible for own expenses',
                'No benefits (health insurance, PTO, retirement)',
                'No reimbursement for typical business expenses'
              ]
            },
            {
              title: 'Tax and legal status',
              content: 'Agreement must address:',
              items: [
                'Contractor responsible for own taxes (will receive 1099, not W-2)',
                'No tax withholding by hiring entity',
                'Contractor maintains own workers\' compensation insurance',
                'Contractor is not entitled to unemployment or disability benefits',
                'Acknowledgment that contractor is not an employee'
              ]
            },
            {
              title: 'Intellectual property',
              content: 'Ownership of work product:',
              items: [
                'Specify who owns deliverables created during engagement',
                'Include work-for-hire language if hiring entity retains ownership',
                'Confidentiality obligations for proprietary information',
                'Return of materials upon completion of project'
              ]
            },
            {
              title: 'Termination',
              content: 'End of relationship terms:',
              items: [
                'Termination upon completion of deliverables',
                'Right to terminate for breach or non-performance',
                'Notice period for early termination',
                'No "employment at will" language'
              ]
            }
          ]
        }
      },
      {
        id: 'documentation',
        title: 'Supporting documentation',
        summary: 'Records to maintain demonstrating independent contractor status',
        effort: 'low',
        content: {
          overview: 'Beyond the written agreement, maintain these records to substantiate independent contractor classification.',
          subsections: [
            {
              title: 'Contractor credentials',
              content: 'Obtain and retain copies of:',
              items: [
                'Business license or registration',
                'Certificate of liability insurance naming contractor\'s business',
                'Professional licenses (if applicable)',
                'Employer Identification Number (EIN) or business tax ID',
                'Evidence of contractor\'s independent business (website, business cards)'
              ]
            },
            {
              title: 'Work records',
              content: 'Document the working relationship:',
              items: [
                'Invoices submitted by contractor (not timesheets)',
                'Deliverables and acceptance sign-offs',
                'Email communications referencing project deliverables',
                'Evidence contractor used own equipment/tools',
                'Proof contractor worked from own location'
              ]
            },
            {
              title: 'Tax forms',
              content: 'Annual tax documentation:',
              items: [
                'Form W-9 (completed before work begins)',
                'Form 1099-NEC issued annually if payments exceed $600',
                'No Form W-2 issued',
                'No payroll tax withholding'
              ]
            }
          ]
        }
      },
      {
        id: 'red-flags',
        title: 'Misclassification red flags',
        summary: 'Warning signs that suggest employee status, not contractor status',
        effort: 'medium',
        content: {
          overview: 'Review these common red flags that indicate a worker should be classified as an employee.',
          subsections: [
            {
              title: 'Control and supervision',
              content: 'Employee indicators:',
              items: [
                'Worker required to work specific hours or schedule',
                'Company provides training on how to do the work',
                'Work is supervised or reviewed before completion',
                'Worker must attend company meetings or events',
                'Worker uses company email address or has company business card'
              ]
            },
            {
              title: 'Economic dependence',
              content: 'Signs of employee relationship:',
              items: [
                'Worker has no other clients (works exclusively for you)',
                'Worker does not advertise services or have a business presence',
                'Paid hourly or salary rather than per project',
                'Receives reimbursement for expenses',
                'Relationship has continued for years without defined end date'
              ]
            },
            {
              title: 'Integration into business',
              content: 'Employment relationship indicators:',
              items: [
                'Worker performs core business functions',
                'Worker listed on company website or directory',
                'Worker wears company uniform or displays company branding',
                'Work is performed at company\'s location with company equipment',
                'Company provides tools, supplies, or technology'
              ]
            },
            {
              title: 'Benefits and treatment',
              content: 'Employee-like benefits:',
              items: [
                'Access to company benefits (health insurance, retirement)',
                'Paid time off or sick leave',
                'Company-provided training or professional development',
                'Performance reviews or disciplinary process',
                'Promotion opportunities or raises'
              ]
            }
          ]
        }
      }
    ],
    relatedResources: [
      {
        slug: 'exemption-checklist',
        title: 'Exemption checklist',
        description: 'Verify employee classifications are correct'
      },
      {
        slug: 'payroll-records-audit',
        title: 'Payroll records audit guide',
        description: 'Review worker classification in payroll records'
      },
      {
        slug: 'wage-statement-guide',
        title: 'Wage statement requirements',
        description: 'Ensure employees receive proper wage statements'
      }
    ]
  },

  'overtime-calculator': {
    slug: 'overtime-calculator',
    title: 'Overtime calculator',
    subtitle: 'Calculate daily, weekly, and double-time overtime under California wage and hour rules',
    type: 'Calculator',
    lastUpdated: 'January 2026',
    estimatedTime: '8 min',
    format: 'XLS + Calculator Tool',
    overview: 'California has more generous overtime rules than federal law, including daily overtime and double-time requirements. This calculator helps you accurately compute overtime pay under both California and federal rules.',
    sections: [
      {
        id: 'ca-overtime-rules',
        title: 'California overtime rules',
        summary: 'Daily and weekly overtime triggers and rates',
        effort: 'low',
        content: {
          overview: 'California requires overtime pay at 1.5x regular rate for hours over 8 in a day or 40 in a week, and double-time for hours over 12 in a day.',
          subsections: [
            {
              title: 'Daily overtime (1.5x rate)',
              content: 'Overtime is owed for:',
              items: [
                'More than 8 hours in a single workday',
                'First 8 hours on the 7th consecutive day of work in a workweek',
                'Example: 10-hour shift = 8 hours at regular rate + 2 hours at 1.5x',
                'Workday = 24-hour period starting at same time each day (define in policy)'
              ]
            },
            {
              title: 'Weekly overtime (1.5x rate)',
              content: 'Overtime for hours in excess of 40 per workweek:',
              items: [
                'Workweek = 7 consecutive 24-hour periods (168 hours)',
                'Must be fixed and recurring (e.g., Sunday-Saturday)',
                'Cannot change workweek to avoid overtime',
                'Example: 4 days × 10 hours = 40 regular hours (no overtime if no day exceeds 10)'
              ]
            },
            {
              title: 'Double-time (2x rate)',
              content: 'Double pay required for:',
              items: [
                'More than 12 hours in a single workday',
                'More than 8 hours on the 7th consecutive day of work in a workweek',
                'Example: 14-hour shift = 8 regular + 4 overtime (1.5x) + 2 double-time',
                'Double-time is not counted toward the 40-hour weekly threshold'
              ]
            }
          ]
        }
      },
      {
        id: 'calculation-examples',
        title: 'Step-by-step calculation examples',
        summary: 'How to calculate overtime in common scenarios',
        effort: 'medium',
        content: {
          overview: 'Walk through actual examples to see how California overtime rules apply.',
          subsections: [
            {
              title: 'Example 1: Single long shift',
              content: 'Employee works 13 hours on Monday, regular rate $20/hour:',
              items: [
                'First 8 hours: 8 × $20 = $160 (regular time)',
                'Hours 9-12: 4 × $30 = $120 (overtime at 1.5x)',
                'Hour 13: 1 × $40 = $40 (double-time at 2x)',
                'Total daily pay: $160 + $120 + $40 = $320',
                'Note: These hours also count toward weekly overtime calculation'
              ]
            },
            {
              title: 'Example 2: Multiple overtime triggers',
              content: 'Employee works 9 hours/day Mon-Fri, 6 hours Saturday ($20/hour):',
              items: [
                'Mon-Fri: 5 days × (8 regular + 1 OT) = 40 regular hours + 5 OT hours',
                'Saturday (6th day): 6 hours at regular rate',
                'Weekly total: 51 hours worked',
                'Payment: 40 regular ($800) + 11 OT hours ($330) = $1,130',
                'Note: Daily OT already paid, so no additional weekly OT owed'
              ]
            },
            {
              title: 'Example 3: Seventh day worked',
              content: 'Employee works 8 hours/day all 7 days ($20/hour):',
              items: [
                'Mon-Sat: 6 days × 8 hours = 48 hours',
                'First 40 hours at regular rate: $800',
                '8 hours over 40: 8 × $30 = $240 (weekly OT)',
                'Sunday (7th day): First 8 hours at 1.5x = 8 × $30 = $240',
                'Total week: $800 + $240 + $240 = $1,280'
              ]
            },
            {
              title: 'Example 4: Long shift on 7th day',
              content: 'Employee works 10 hours on 7th consecutive day ($20/hour):',
              items: [
                'First 8 hours: 8 × $30 = $240 (1.5x for 7th day)',
                'Hours 9-10: 2 × $40 = $80 (2x for over 8 on 7th day)',
                'Total for 7th day: $320',
                'Plus: Any applicable weekly overtime from hours 1-6 of the week'
              ]
            }
          ]
        }
      },
      {
        id: 'regular-rate',
        title: 'Calculating regular rate of pay',
        summary: 'Determining the base rate for overtime calculations',
        effort: 'medium',
        content: {
          overview: 'Overtime is calculated using the "regular rate of pay," which may be more than the base hourly wage if employee receives non-discretionary bonuses, commissions, or shift differentials.',
          subsections: [
            {
              title: 'Regular rate formula',
              content: 'Regular rate includes:',
              items: [
                'Base hourly wage or salary converted to hourly',
                'Non-discretionary bonuses (performance, attendance, production)',
                'Commissions earned during the pay period',
                'Shift differentials or hazard pay',
                'Divide total compensation by total hours worked to get regular rate'
              ]
            },
            {
              title: 'Excluded from regular rate',
              content: 'Do not include these in regular rate calculation:',
              items: [
                'Discretionary bonuses (employer has sole discretion)',
                'Gifts for special occasions',
                'Reimbursements for expenses',
                'Premium pay for weekends/holidays that is already 1.5x or 2x',
                'Paid time off, sick leave, or vacation pay'
              ]
            },
            {
              title: 'Example: Shift differential',
              content: 'Employee earns $20/hour plus $2/hour night shift differential:',
              items: [
                'Regular rate for night shift work: $22/hour',
                'Overtime rate: $22 × 1.5 = $33/hour',
                'Double-time rate: $22 × 2 = $44/hour',
                'Note: Differential only applies to hours actually worked on night shift'
              ]
            },
            {
              title: 'Example: Weekly bonus',
              content: 'Employee works 45 hours and earns $400 bonus that week ($20/hour base):',
              items: [
                'Total compensation: (45 × $20) + $400 = $1,300',
                'Regular rate: $1,300 ÷ 45 hours = $28.89/hour',
                'Overtime owed: 5 hours × ($28.89 × 1.5) = $216.68',
                'Total owed: 40 × $28.89 + 5 × $43.34 = $1,372.26',
                'Additional pay due: $1,372.26 - $1,300 = $72.26'
              ]
            }
          ]
        }
      },
      {
        id: 'alternative-workweeks',
        title: 'Alternative workweek schedules',
        summary: 'Exceptions for approved 4/10 and 9/80 schedules',
        effort: 'low',
        content: {
          overview: 'California allows alternative workweek schedules if properly adopted through a compliant election process.',
          subsections: [
            {
              title: '4/10 schedule',
              content: 'Four 10-hour days with three days off:',
              items: [
                'No daily overtime owed for hours 9 and 10 (if schedule properly adopted)',
                'Overtime begins after 10 hours in a day',
                'Overtime still owed for hours over 40 in the week',
                'Must be approved by 2/3 vote of affected employees',
                'Schedule must be regularly recurring, not ad hoc'
              ]
            },
            {
              title: '9/80 schedule',
              content: 'Nine-day work period with alternating Fridays off:',
              items: [
                'Week 1: 4 days × 9 hours + Friday 8 hours = 44 hours',
                'Week 2: 4 days × 9 hours + Friday off = 36 hours',
                'No daily OT for hours worked within approved schedule',
                'Requires proper election and documentation',
                'Must split Friday across two workweeks in timekeeping system'
              ]
            },
            {
              title: 'Election requirements',
              content: 'To implement alternative workweek:',
              items: [
                'Disclose proposed schedule in writing 14 days before vote',
                'Hold secret ballot election',
                'Requires 2/3 majority of affected employees to approve',
                'File results with California Division of Labor Standards Enforcement',
                'Can be repealed by majority vote after one year'
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
        description: 'Track hours accurately for overtime calculations'
      },
      {
        slug: 'wage-statement-guide',
        title: 'Wage statement requirements',
        description: 'Show overtime hours and rates on paystubs'
      },
      {
        slug: 'exemption-checklist',
        title: 'Exemption checklist',
        description: 'Verify employees are properly exempt from overtime'
      }
    ]
  }
};
