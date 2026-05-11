/**
 * Meal & Rest Break Policy (California)
 * Premium legal template implementation
 */

import {
  TemplateDocument,
  CoverPage,
  Page,
  SectionHeader,
  Paragraph,
  Callout,
  FieldRow,
  CheckboxRow,
  SignatureBlock,
  Token,
  OrderedList,
  UnorderedList,
  ListItem,
  VersionHistory,
} from './TemplateDocument';

export function MealRestBreakPolicy() {
  const templateMeta = {
    title: 'Meal & rest break policy',
    jurisdiction: 'California',
    version: '2.1',
    reviewedDate: 'January 2026',
    documentType: 'Policy',
    totalPages: 3,
  };

  return (
    <TemplateDocument pageSize="letter">
      {/* PAGE 1: COVER */}
      <CoverPage {...templateMeta} />

      {/* PAGE 2: POLICY CONTENT */}
      <Page
        pageNumber={2}
        totalPages={templateMeta.totalPages}
        documentTitle={templateMeta.title}
        version={templateMeta.version}
        reviewedDate={templateMeta.reviewedDate}
      >
        {/* Company Information */}
        <div style={{ marginBottom: '32px' }}>
          <FieldRow label="Company Name" token="COMPANY_NAME" />
          <FieldRow label="Effective Date" token="EFFECTIVE_DATE" />
          <FieldRow label="Policy Owner" token="POLICY_OWNER_NAME" />
          <FieldRow label="Last Updated" token="LAST_UPDATED_DATE" />
        </div>

        <SectionHeader number="1" title="Policy Statement" level={1} rule />
        
        <Paragraph>
          <Token name="COMPANY_NAME" /> is committed to full compliance with California meal and rest break
          requirements under California Labor Code sections 512 and applicable Industrial Welfare Commission
          Wage Orders. This policy applies to all non-exempt employees working in California.
        </Paragraph>

        <Paragraph>
          Employees are required to take all meal and rest breaks as required by law. Supervisors and managers
          are prohibited from encouraging, pressuring, or requiring employees to skip breaks or work during
          breaks. Any violations of this policy must be reported immediately.
        </Paragraph>

        <SectionHeader number="2" title="Meal Break Requirements" level={1} />

        <SectionHeader title="2.1 General Rules" level={2} />
        
        <Paragraph>
          Non-exempt employees are entitled to an unpaid meal break under the following conditions:
        </Paragraph>

        <UnorderedList>
          <ListItem>
            <strong>5+ hour shift:</strong> One 30-minute unpaid meal break must begin before the end of the
            fifth hour of work
          </ListItem>
          <ListItem>
            <strong>10+ hour shift:</strong> A second 30-minute unpaid meal break must begin before the end
            of the tenth hour of work
          </ListItem>
          <ListItem>
            <strong>12+ hour shift:</strong> The second meal break may be waived only if the first meal
            break was taken and the total work time is no more than 12 hours
          </ListItem>
        </UnorderedList>

        <SectionHeader title="2.2 Meal Break Waivers" level={2} />
        
        <Paragraph>
          An employee may waive the first meal break only if:
        </Paragraph>

        <UnorderedList>
          <ListItem>The total work shift does not exceed 6 hours</ListItem>
          <ListItem>The waiver is documented in writing and signed by both employee and employer</ListItem>
          <ListItem>The employee voluntarily agrees to the waiver without pressure or coercion</ListItem>
        </UnorderedList>

        <Callout label="Important">
          <p>
            Meal break waivers are strictly voluntary. Employees may revoke a waiver at any time with
            reasonable notice. Supervisors may not pressure employees to sign waivers or continue working
            during meal breaks.
          </p>
        </Callout>

        <SectionHeader number="3" title="Rest Break Requirements" level={1} />
        
        <Paragraph>
          Non-exempt employees are entitled to paid 10-minute rest breaks based on hours worked:
        </Paragraph>

        <UnorderedList>
          <ListItem>
            <strong>3.5 to 6 hours:</strong> One 10-minute paid rest break
          </ListItem>
          <ListItem>
            <strong>6+ to 10 hours:</strong> Two 10-minute paid rest breaks
          </ListItem>
          <ListItem>
            <strong>10+ to 14 hours:</strong> Three 10-minute paid rest breaks
          </ListItem>
        </UnorderedList>

        <Paragraph>
          Rest breaks should be taken in the middle of each work period when practicable. Rest breaks
          cannot be combined with meal breaks or used to arrive late or leave early.
        </Paragraph>
      </Page>

      {/* PAGE 3: PROCEDURES & ACKNOWLEDGMENT */}
      <Page
        pageNumber={3}
        totalPages={templateMeta.totalPages}
        documentTitle={templateMeta.title}
        version={templateMeta.version}
        reviewedDate={templateMeta.reviewedDate}
      >
        <SectionHeader number="4" title="Break Recording & Compliance" level={1} rule />
        
        <Paragraph>
          All employees must accurately record meal and rest breaks in <Token name="TIMEKEEPING_SYSTEM" />.
          Employees must:
        </Paragraph>

        <OrderedList>
          <ListItem>Clock out at the start of each meal break</ListItem>
          <ListItem>Clock in at the end of each meal break</ListItem>
          <ListItem>Report any missed, shortened, or interrupted breaks to their supervisor immediately</ListItem>
          <ListItem>Notify HR if they feel pressured to skip breaks or work during breaks</ListItem>
        </OrderedList>

        <SectionHeader number="5" title="Missed Break Reporting" level={1} />
        
        <Paragraph>
          If an employee misses a meal or rest break due to operational needs, they must:
        </Paragraph>

        <UnorderedList>
          <ListItem>Report the missed break to their supervisor the same day</ListItem>
          <ListItem>Submit a missed break report form within 24 hours</ListItem>
          <ListItem>
            Receive one additional hour of pay at their regular rate for each missed meal or rest break
          </ListItem>
        </UnorderedList>

        <Callout label="Note">
          <p>
            Repeated missed breaks may indicate scheduling or staffing issues. Managers must review missed
            break patterns with HR to ensure adequate coverage and compliance.
          </p>
        </Callout>

        <SectionHeader number="6" title="Manager Responsibilities" level={1} />
        
        <Paragraph>
          Supervisors and managers must:
        </Paragraph>

        <CheckboxRow>Schedule work to allow employees to take all required breaks</CheckboxRow>
        <CheckboxRow>Ensure adequate staffing and coverage during break periods</CheckboxRow>
        <CheckboxRow>Never pressure or encourage employees to skip or shorten breaks</CheckboxRow>
        <CheckboxRow>Promptly investigate and report any break violations</CheckboxRow>
        <CheckboxRow>Review timekeeping records weekly for missed or late breaks</CheckboxRow>

        <SectionHeader number="7" title="Employee Acknowledgment" level={1} rule />
        
        <Paragraph>
          I acknowledge that I have received, read, and understand this meal and rest break policy. I
          understand that I am entitled to all meal and rest breaks required by California law, and I am
          required to accurately record all breaks in the timekeeping system.
        </Paragraph>

        <SignatureBlock
          fields={[
            { label: 'Employee Signature', type: 'signature' },
            { label: 'Date', type: 'date' },
            { label: 'Printed Name', type: 'name', token: 'EMPLOYEE_NAME' },
          ]}
        />

        <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '0.5pt solid #e5e5e5' }}>
          <Paragraph style={{ fontSize: '9pt', color: '#737373' }}>
            This template is maintained by Guardrail HR and reviewed for compliance with current California
            law. This document is informational only and does not constitute legal advice. Consult with legal
            counsel to ensure your specific policy meets your business needs and complies with applicable laws.
          </Paragraph>
        </div>

        <VersionHistory
          entries={[
            {
              version: '2.1',
              date: 'January 2026',
              changes: [
                'Clarified break attestation language',
                'Updated formatting for readability',
                'Added missed break reporting procedures',
              ],
            },
            {
              version: '2.0',
              date: 'November 2025',
              changes: [
                'Restructured sections for compliance',
                'Added manager responsibility checklist',
                'Updated waiver language',
              ],
            },
            {
              version: '1.0',
              date: 'September 2025',
              changes: ['Initial release'],
            },
          ]}
        />
      </Page>
    </TemplateDocument>
  );
}
