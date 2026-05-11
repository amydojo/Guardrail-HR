export interface ResourceSection {
  id: string;
  title: string;
  summary: string;
  effort: 'low' | 'medium' | 'high';
  content?: {
    overview?: string;
    items?: string[];
    subsections?: {
      title: string;
      content: string;
      items?: string[];
    }[];
  };
}

export interface RelatedResource {
  slug: string;
  title: string;
  description: string;
}

export interface ResourceData {
  slug: string;
  title: string;
  subtitle: string;
  type: 'Checklist' | 'Template' | 'Guide' | 'Policy' | 'Calculator';
  lastUpdated: string;
  estimatedTime: string;
  format: string;
  overview: string;
  sections: ResourceSection[];
  relatedResources: RelatedResource[];
}

export const RESOURCES_DATA: Record<string, ResourceData> = {
  'exemption-checklist': {
    slug: 'exemption-checklist',
    title: 'Exemption checklist',
    subtitle: 'Verify exempt employee classification with salary basis and duties tests',
    type: 'Checklist',
    lastUpdated: 'January 2026',
    estimatedTime: '10 min',
    format: 'PDF + Checklist',
    overview: 'This checklist helps you verify whether employees are properly classified as exempt from overtime under California and federal law. Use it to audit current classifications or evaluate new positions before making exempt determinations.',
    sections: [
      {
        id: 'salary-basis',
        title: 'Salary basis test',
        summary: 'Verify minimum salary threshold and payment consistency requirements',
        effort: 'low',
        content: {
          overview: 'California requires exempt employees to earn at least twice the state minimum wage for full-time employment. As of 2026, this means a minimum annual salary of approximately $66,560 for most exempt classifications.',
          subsections: [
            {
              title: 'Minimum salary requirements',
              content: 'Check that all exempt employees meet or exceed the current threshold:',
              items: [
                'California: $66,560/year minimum ($5,546.67/month) for most exemptions',
                'Federal: $35,568/year minimum ($684/week) under FLSA',
                'Computer professionals: Alternative of $55.58/hour in California',
                'Licensed professionals: Some exemptions have different thresholds'
              ]
            },
            {
              title: 'Salary basis rules',
              content: 'Verify employees are paid on a true salary basis:',
              items: [
                'Predetermined amount paid each pay period regardless of hours worked',
                'No deductions for partial-day absences (except FMLA, first/last week)',
                'Full salary paid for any week in which work is performed',
                'Deductions only permitted for full-day absences for personal reasons'
              ]
            },
            {
              title: 'Documentation checklist',
              content: 'Maintain records showing:',
              items: [
                'Offer letters or employment agreements stating salary amount',
                'Pay stubs confirming consistent salary payments',
                'Job descriptions listing exempt duties performed',
                'Any salary changes with effective dates and justification'
              ]
            }
          ]
        }
      },
      {
        id: 'duties-test',
        title: 'Duties test',
        summary: 'Confirm primary duties meet executive, administrative, or professional criteria',
        effort: 'medium',
        content: {
          overview: 'Even if an employee meets the salary basis test, they must spend more than 50% of their work time on exempt duties. California uses a stricter test than federal law.',
          subsections: [
            {
              title: 'Executive exemption',
              content: 'Primary duty must include:',
              items: [
                'Management of the enterprise or a customarily recognized department',
                'Regular direction of work of two or more full-time employees',
                'Authority to hire/fire or make recommendations given particular weight',
                'Customarily exercises discretion and independent judgment'
              ]
            },
            {
              title: 'Administrative exemption',
              content: 'Primary duty must include:',
              items: [
                'Office or non-manual work directly related to management or business operations',
                'Exercise of discretion and independent judgment on significant matters',
                'Work includes assisting with running the business (not production)',
                'More than 50% of time spent on exempt duties (CA requirement)'
              ]
            },
            {
              title: 'Professional exemption',
              content: 'Must meet one of these criteria:',
              items: [
                'Learned professional: Advanced knowledge in field of science/learning acquired through prolonged specialized study',
                'Artistic professional: Invention, imagination, originality, or talent in recognized artistic field',
                'Licensed professional: Attorney, physician, architect, engineer, teacher, or certified professional with state license'
              ]
            },
            {
              title: 'Red flag activities',
              content: 'Reconsider exemption if employee regularly:',
              items: [
                'Spends majority of time on routine, repetitive tasks',
                'Follows detailed instructions without discretion',
                'Performs primarily manual or production work',
                'Has limited authority to make independent decisions'
              ]
            }
          ]
        }
      },
      {
        id: 'documentation',
        title: 'Documentation requirements',
        summary: 'Maintain records that support exempt classification determination',
        effort: 'low',
        content: {
          overview: 'California law presumes all employees are non-exempt. The burden is on employers to prove exempt status with contemporaneous documentation.',
          subsections: [
            {
              title: 'Required documentation',
              content: 'Maintain these records for each exempt employee:',
              items: [
                'Current job description listing primary duties and responsibilities',
                'Offer letter or employment agreement stating exempt status and salary',
                'Organizational chart showing reporting relationships (for executive exemption)',
                'Performance reviews or documentation showing exercise of independent judgment',
                'Records of any classification reviews or audits performed'
              ]
            },
            {
              title: 'Retention requirements',
              content: 'Keep these records for the following periods:',
              items: [
                'Payroll records: 3 years minimum (4 years recommended in California)',
                'Job descriptions: Duration of employment plus 3 years',
                'Classification determinations: Duration of employment plus 4 years',
                'Time records (if maintained): 3 years minimum'
              ]
            }
          ]
        }
      },
      {
        id: 'red-flags',
        title: 'Red flags',
        summary: 'Common misclassification indicators and high-risk scenarios to review',
        effort: 'medium',
        content: {
          overview: 'Review these common misclassification patterns that increase audit risk and litigation exposure.',
          subsections: [
            {
              title: 'Title vs. duties mismatch',
              content: 'High-risk scenarios:',
              items: [
                'Job title includes "manager" but employee has no direct reports',
                'Title is "assistant manager" but person does not assist with management',
                '"Administrative assistant" classified as exempt administrative employee',
                'Job title changed to exempt role without change in actual duties'
              ]
            },
            {
              title: 'Compensation structures',
              content: 'Red flags in pay practices:',
              items: [
                'Salary is exactly or close to the minimum threshold (shows salary set to qualify, not based on market)',
                'Employee regularly works 50+ hours with no overtime discussion',
                'Deductions made from salary for partial-day absences',
                'Bonuses or incentives that exceed base salary (may indicate misclassification)'
              ]
            },
            {
              title: 'Operational indicators',
              content: 'Warning signs in daily operations:',
              items: [
                'Employee punches a time clock or submits timesheets (suggests non-exempt treatment)',
                'Supervisor provides detailed daily task assignments',
                'Work is reviewed line-by-line before approval',
                'Employee cannot make decisions without prior approval'
              ]
            },
            {
              title: 'Immediate review triggers',
              content: 'Audit classification immediately if:',
              items: [
                'Employee files complaint about unpaid overtime',
                'Former employee contacts attorney or DLSE about wages',
                'Job duties have changed significantly since last review',
                'Minimum salary threshold has increased (requires re-verification)'
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
        description: 'Complete list of required paystub fields and common errors'
      },
      {
        slug: 'overtime-calculator',
        title: 'Overtime calculator',
        description: 'Calculate daily, weekly, and double-time overtime for California'
      },
      {
        slug: 'timekeeping-policy',
        title: 'Timekeeping policy template',
        description: 'Best practices for accurate time tracking and records'
      }
    ]
  },

  'wage-statement-guide': {
    slug: 'wage-statement-guide',
    title: 'Wage statement requirements',
    subtitle: 'Complete guide to California paystub compliance and the nine required fields',
    type: 'Guide',
    lastUpdated: 'January 2026',
    estimatedTime: '8 min',
    format: 'PDF + Examples',
    overview: 'California Labor Code §226 requires all employers to provide accurate, itemized wage statements with each paycheck. This guide covers all nine required fields, formatting requirements, and common compliance errors.',
    sections: [
      {
        id: 'nine-required-fields',
        title: 'Nine required fields',
        summary: 'Every wage statement must include these specific data points',
        effort: 'low',
        content: {
          overview: 'California law requires nine specific pieces of information on every wage statement. Missing even one field can result in penalties of up to $4,000 per employee.',
          subsections: [
            {
              title: '1. Gross wages earned',
              content: 'Total compensation before deductions:',
              items: [
                'Must show all wages earned during the pay period',
                'Include regular pay, overtime, double-time, and any other compensation',
                'Piece-rate workers: Show tasks completed and rate per piece',
                'Do not combine with other fields—gross wages must be separately stated'
              ]
            },
            {
              title: '2. Total hours worked',
              content: 'Hour requirements vary by employee type:',
              items: [
                'Non-exempt employees: Must show actual hours worked during pay period',
                'Exempt employees: Not required to show hours (can show "Exempt" or leave blank)',
                'Piece-rate workers: Show both hours worked and pieces completed',
                'Part-time workers: Show actual hours, not "PT" or "varies"'
              ]
            },
            {
              title: '3. Number of piece-rate units and rate',
              content: 'Required only for piece-rate compensation:',
              items: [
                'Show number of units/pieces completed during pay period',
                'State the rate paid per unit',
                'If multiple piece rates apply, break down each separately',
                'Include separate compensation for rest and recovery periods'
              ]
            },
            {
              title: '4. All deductions',
              content: 'Itemize every deduction separately:',
              items: [
                'List each deduction on its own line with clear label',
                'Include taxes (federal, state, SDI, Medicare, etc.)',
                'Show employee benefit deductions (health, 401k, etc.)',
                'Court-ordered deductions must be clearly identified',
                'Do NOT group deductions—each must be listed individually'
              ]
            },
            {
              title: '5. Net wages earned',
              content: 'Final pay amount after all deductions:',
              items: [
                'Must equal gross wages minus total deductions',
                'Show as separate line item clearly labeled "Net Pay" or similar',
                'Amount should match the actual payment issued',
                'Cannot be combined with gross wages or other fields'
              ]
            },
            {
              title: '6. Pay period dates',
              content: 'Start and end dates for the period covered:',
              items: [
                'Must show both beginning and ending dates of pay period',
                'Format: "Pay Period: 01/01/2026 - 01/15/2026" or similar',
                'Distinguish from check date (they are often different)',
                'Cannot show only one date—both start and end required'
              ]
            },
            {
              title: '7. Employee name and last four of SSN or EIN',
              content: 'Employee identification:',
              items: [
                'Full legal name or name used for tax purposes',
                'Last four digits of Social Security Number OR full Employee ID number',
                'Do NOT show full SSN (privacy/security risk)',
                'Can use employee ID if SSN not used'
              ]
            },
            {
              title: '8. Employer name and address',
              content: 'Legal entity information:',
              items: [
                'Legal name of employing entity (as registered with EDD)',
                'Physical address of employer—not P.O. Box',
                'If mailing address differs, include both',
                'DBA names should also show legal name'
              ]
            },
            {
              title: '9. Applicable hourly rates and hours worked at each rate',
              content: 'Rate breakdown for non-exempt employees:',
              items: [
                'Regular hourly rate and hours worked at that rate',
                'Overtime rate and overtime hours separately listed',
                'Double-time rate and hours if applicable',
                'Any other differential rates (shift, weekend, etc.) shown separately',
                'Exempt employees: Not required (can omit this field)'
              ]
            }
          ]
        }
      },
      {
        id: 'format-examples',
        title: 'Formatting requirements',
        summary: 'Layout and presentation standards for compliant wage statements',
        effort: 'low',
        content: {
          overview: 'Beyond the nine required fields, California requires wage statements to be clear, readable, and logically organized.',
          subsections: [
            {
              title: 'Readability standards',
              content: 'Wage statements must be:',
              items: [
                'Legible and easy to read (minimum 10-point font recommended)',
                'Organized in logical sections (earnings, deductions, totals)',
                'Free of abbreviations that could confuse employees',
                'Available in English and Spanish if employee requests'
              ]
            },
            {
              title: 'Delivery requirements',
              content: 'How and when to provide statements:',
              items: [
                'Provided with each payment of wages (every pay period)',
                'Can be provided in paper or electronic format',
                'Electronic statements require employee consent and access',
                'Must be detachable or separately printable if electronic'
              ]
            }
          ]
        }
      },
      {
        id: 'common-errors',
        title: 'Common compliance errors',
        summary: 'Frequent mistakes that trigger penalties and how to avoid them',
        effort: 'medium',
        content: {
          overview: 'California issues more wage statement penalties than almost any other labor violation. These are the most common errors found in audits.',
          subsections: [
            {
              title: 'Grouping or combining fields',
              content: 'Each field must be separately stated:',
              items: [
                'Error: Showing "Total wages" without separating gross and net',
                'Error: Listing "Taxes" as single deduction instead of itemizing each tax',
                'Error: Combining regular and overtime hours into one "Total hours" field',
                'Fix: Break down every required field into its own clearly labeled line item'
              ]
            },
            {
              title: 'Missing or incomplete dates',
              content: 'Pay period dates are frequently done wrong:',
              items: [
                'Error: Showing only check date without pay period start/end dates',
                'Error: Showing only pay period end date',
                'Error: Using codes like "PP14" instead of actual dates',
                'Fix: Always show both start and end dates in clear MM/DD/YYYY format'
              ]
            },
            {
              title: 'Hourly rate problems',
              content: 'Rate and hours field is often non-compliant:',
              items: [
                'Error: Showing only total hours without breaking down by rate',
                'Error: Not separately listing overtime and double-time rates',
                'Error: Showing "varies" or ranges instead of actual rates paid',
                'Fix: List each rate separately with corresponding hours worked'
              ]
            },
            {
              title: 'Address and identification issues',
              content: 'Entity information errors:',
              items: [
                'Error: Using only P.O. Box instead of physical address',
                'Error: Showing DBA name without legal entity name',
                'Error: Missing last four of SSN or employee ID',
                'Fix: Include full legal name, physical address, and proper employee ID'
              ]
            }
          ]
        }
      },
      {
        id: 'penalties',
        title: 'Penalties and enforcement',
        summary: 'Financial consequences of non-compliant wage statements',
        effort: 'low',
        content: {
          overview: 'California imposes strict penalties for wage statement violations, even for technical errors that cause no actual harm to employees.',
          subsections: [
            {
              title: 'Initial violation penalties',
              content: 'Per Labor Code §226(e):',
              items: [
                '$50 per employee for initial pay period with violation',
                '$100 per employee for each subsequent violation',
                'Maximum of $4,000 per employee',
                'Penalties apply even if employee suffered no injury'
              ]
            },
            {
              title: 'Knowing and intentional violations',
              content: 'Higher penalties for willful violations:',
              items: [
                'Misdemeanor criminal charges possible',
                'Fines up to $1,000 and/or 6 months imprisonment',
                'PAGA lawsuits: $100 per employee per pay period',
                'Cannot be waived by agreement or arbitration clause'
              ]
            },
            {
              title: 'Class action risk',
              content: 'Wage statement violations are commonly alleged in class actions:',
              items: [
                'Systematic errors affect all employees = class certification more likely',
                'Plaintiff attorneys specifically look for §226 violations',
                'Easy to prove = high settlement pressure',
                'Cannot force arbitration for PAGA claims'
              ]
            }
          ]
        }
      }
    ],
    relatedResources: [
      {
        slug: 'payroll-records-audit',
        title: 'Payroll records audit guide',
        description: 'Review checklist for compliant payroll documentation'
      },
      {
        slug: 'timekeeping-policy',
        title: 'Timekeeping policy template',
        description: 'Best practices for accurate time tracking'
      },
      {
        slug: 'exemption-checklist',
        title: 'Exemption checklist',
        description: 'Verify exempt employee classification properly'
      }
    ]
  },

  'meal-rest-breaks': {
    slug: 'meal-rest-breaks',
    title: 'Meal & rest breaks policy',
    subtitle: 'California break requirements, timing rules, and premium pay obligations',
    type: 'Policy',
    lastUpdated: 'January 2026',
    estimatedTime: '12 min',
    format: 'DOC + Policy Template',
    overview: 'California has some of the strictest meal and rest break requirements in the nation. This policy template covers timing rules, waiver conditions, on-duty meal periods, and premium pay calculations for missed breaks.',
    sections: [
      {
        id: 'meal-periods',
        title: 'Meal period requirements',
        summary: 'When meal breaks must be provided and how long they must be',
        effort: 'low',
        content: {
          overview: 'California requires a 30-minute unpaid meal period for shifts exceeding 5 hours, with strict timing rules and penalty pay for violations.',
          subsections: [
            {
              title: 'Basic meal period rules',
              content: 'Timing and duration requirements:',
              items: [
                'First meal: Due no later than end of 5th hour of work (must start by 5:00 if shift begins at 12:00)',
                'Duration: Minimum 30 minutes, completely duty-free',
                'Second meal: Required if shift exceeds 10 hours (must start by 10th hour)',
                'Third meal: Not required by California law, even for 15+ hour shifts'
              ]
            },
            {
              title: 'Duty-free requirement',
              content: 'What "duty-free" means:',
              items: [
                'Employee must be relieved of all work duties',
                'Cannot be required to remain on premises unless on-duty meal period applies',
                'Employer cannot impede or discourage taking the full break',
                'Employee must be free to leave the worksite',
                'Responding to work calls/emails during meal period can violate duty-free requirement'
              ]
            },
            {
              title: 'First meal period waiver',
              content: 'When first meal can be waived:',
              items: [
                'Shift is 6 hours or less',
                'Waiver must be mutual and voluntary (not pressured)',
                'Waiver should be in writing (best practice)',
                'Employee can revoke waiver at any time',
                'Cannot waive if shift exceeds 6 hours'
              ]
            },
            {
              title: 'Second meal period waiver',
              content: 'When second meal can be waived:',
              items: [
                'Total shift does not exceed 12 hours',
                'First meal period was not waived',
                'Mutual written agreement required',
                'Employee can revoke waiver',
                'Both conditions must be met—cannot waive if shift is over 12 hours OR if first meal was waived'
              ]
            }
          ]
        }
      },
      {
        id: 'rest-periods',
        title: 'Rest period requirements',
        summary: 'Paid 10-minute breaks required based on hours worked',
        effort: 'low',
        content: {
          overview: 'Rest periods are paid breaks of at least 10 minutes for every 4 hours worked (or major fraction thereof).',
          subsections: [
            {
              title: 'Rest break timing and frequency',
              content: 'How many breaks are required:',
              items: [
                '3.5 to 6 hours: One 10-minute rest break',
                'Over 6 to 10 hours: Two 10-minute rest breaks',
                'Over 10 to 14 hours: Three 10-minute rest breaks',
                '"Major fraction" = anything more than 2 hours (so 3.5 hours triggers first rest break)'
              ]
            },
            {
              title: 'Timing within shift',
              content: 'When breaks should occur:',
              items: [
                'Must be in the middle of each work period "insofar as practicable"',
                'First rest break: Ideally around 2nd or 3rd hour of shift',
                'Second rest break: Ideally around 6th or 7th hour of shift',
                'Cannot be combined with meal periods or stacked together',
                'Cannot be at very beginning or very end of shift'
              ]
            },
            {
              title: 'Paid break requirement',
              content: 'Rest breaks must be paid:',
              items: [
                'Counted as "hours worked" for overtime and minimum wage purposes',
                'Paid at employee\'s regular rate (including any shift differentials)',
                'Cannot require employee to clock out',
                'Time must appear on timesheet as worked time'
              ]
            },
            {
              title: 'No waivers permitted',
              content: 'Rest breaks cannot be waived:',
              items: [
                'Employee cannot choose to skip rest break even if they want to',
                'Employer must affirmatively authorize and permit breaks',
                'Allowing employee to "work through" break creates liability',
                'Exception: Some collective bargaining agreements have different rules'
              ]
            }
          ]
        }
      },
      {
        id: 'on-duty-meals',
        title: 'On-duty meal periods',
        summary: 'When employees can be required to remain on duty during meals',
        effort: 'medium',
        content: {
          overview: 'In limited circumstances, employers can require employees to eat on duty if the nature of work prevents relief. This requires a written agreement and premium pay.',
          subsections: [
            {
              title: 'Eligibility requirements',
              content: 'On-duty meal periods only permitted when:',
              items: [
                'Nature of work prevents employee from being relieved of all duties',
                'Common examples: sole employee on duty, security guards, certain healthcare roles',
                'Not permitted just because it\'s busy or inconvenient',
                'Must be truly necessary based on job duties'
              ]
            },
            {
              title: 'Written agreement required',
              content: 'Documentation must include:',
              items: [
                'Written mutual agreement signed by both parties',
                'Statement of why duty-free meal is not possible',
                'Acknowledgment that employee can eat while working',
                'Confirmation that employee will be paid for the meal period',
                'Right to revoke agreement at any time'
              ]
            },
            {
              title: 'Compensation for on-duty meals',
              content: 'Payment requirements:',
              items: [
                'Entire meal period must be paid as time worked',
                'Counts toward overtime calculations',
                'Paid at regular rate (or overtime rate if applicable)',
                'Cannot be less than minimum wage per hour'
              ]
            }
          ]
        }
      },
      {
        id: 'premium-pay',
        title: 'Premium pay for missed breaks',
        summary: 'One hour of pay at regular rate for each break violation',
        effort: 'low',
        content: {
          overview: 'If an employer fails to provide a compliant meal or rest break, they owe premium pay of one additional hour at the employee\'s regular rate for each day a break was missed.',
          subsections: [
            {
              title: 'Premium pay calculation',
              content: 'How much is owed:',
              items: [
                'One hour of pay at employee\'s regular rate of pay',
                'Regular rate = base hourly rate plus non-discretionary bonuses, shift differentials, etc.',
                'Separate premium for meal break violation and rest break violation',
                'Maximum of two premium payments per day (one meal + one rest)',
                'Premium is due even if break was only 25 minutes instead of 30, or if timing was wrong'
              ]
            },
            {
              title: 'When premium pay is triggered',
              content: 'Violations requiring premium pay:',
              items: [
                'No meal break provided when required',
                'Meal break started too late (after 5th hour)',
                'Meal break was interrupted or not duty-free',
                'Rest break was not provided',
                'Rest break was too short or too late',
                'Employee was discouraged or impeded from taking break'
              ]
            },
            {
              title: 'Payment timing',
              content: 'When premium pay must be paid:',
              items: [
                'Due on the regular payday for the period in which violation occurred',
                'Cannot be delayed to a later pay period',
                'Must appear on wage statement as a separate line item',
                'Subject to wage statement requirements (must show hours and rate)'
              ]
            },
            {
              title: 'Statute of limitations',
              content: 'How long employees can claim missed breaks:',
              items: [
                'Three years for meal and rest break premium pay claims',
                'PAGA claims: Can go back one year prior to filing',
                'Class actions: Certification often covers 3-4 years',
                'Keep records of all meal and rest breaks taken/missed'
              ]
            }
          ]
        }
      },
      {
        id: 'best-practices',
        title: 'Compliance best practices',
        summary: 'Policies and procedures to reduce break violations',
        effort: 'medium',
        content: {
          overview: 'Implement these practices to ensure consistent break compliance and reduce litigation risk.',
          subsections: [
            {
              title: 'Written policy',
              content: 'Policy should address:',
              items: [
                'When breaks are required based on shift length',
                'How to request breaks and who approves',
                'Prohibition on working through breaks',
                'Process for reporting missed breaks',
                'Manager accountability for ensuring breaks occur'
              ]
            },
            {
              title: 'Timekeeping systems',
              content: 'Track breaks systematically:',
              items: [
                'Require employees to clock out/in for meal periods',
                'Set up alerts when meal break is approaching 5th hour',
                'Flag short or late meal periods automatically',
                'Track rest breaks (even though paid) to show compliance',
                'Review exception reports weekly'
              ]
            },
            {
              title: 'Training and communication',
              content: 'Educate employees and managers:',
              items: [
                'Train managers on break requirements and timing rules',
                'Communicate that breaks are mandatory, not optional',
                'Remind employees they cannot work through breaks to leave early',
                'Post break policy in common areas',
                'Include in new hire orientation'
              ]
            },
            {
              title: 'Attestation and auditing',
              content: 'Create paper trail of compliance:',
              items: [
                'Consider meal break attestations (employee confirms breaks provided)',
                'Review time records for patterns of missed breaks',
                'Audit high-volume or high-risk departments monthly',
                'Investigate and remedy any identified violations promptly',
                'Pay premium pay immediately when violation is discovered'
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
        description: 'Best practices for tracking time and breaks'
      },
      {
        slug: 'training-acknowledgment',
        title: 'Policy acknowledgment form',
        description: 'Employee acknowledgment of break policies'
      },
      {
        slug: 'payroll-records-audit',
        title: 'Payroll records audit guide',
        description: 'Review break compliance in payroll records'
      }
    ]
  }
};
