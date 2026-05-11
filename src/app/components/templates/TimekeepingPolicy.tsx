/**
 * Timekeeping Policy (California + Federal)
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

export function TimekeepingPolicy() {
  const templateMeta = {
    title: 'Timekeeping policy',
    jurisdiction: 'CA + Federal',
    version: '2.0',
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
          <FieldRow label="Timekeeping System" token="TIMEKEEPING_SYSTEM" />
          <FieldRow label="Effective Date" token="EFFECTIVE_DATE" />
          <FieldRow label="Policy Owner" token="POLICY_OWNER_NAME" />
        </div>

        <SectionHeader number="1" title="Purpose & Scope" level={1} rule />
        
        <Paragraph>
          <Token name="COMPANY_NAME" /> maintains this policy to ensure accurate recording of hours worked
          by all non-exempt employees in compliance with the Fair Labor Standards Act (FLSA) and California
          Labor Code requirements. Accurate time records are essential for proper wage payment, overtime
          calculation, and compliance with federal and state record retention laws.
        </Paragraph>

        <Paragraph>
          This policy applies to all non-exempt employees. Exempt employees are not required to track hours
          but may be required to record absences and time off as specified by management.
        </Paragraph>

        <Callout label="Legal Requirement">
          <p>
            Under California Labor Code section 1174 and federal FLSA regulations, employers must keep
            accurate records of hours worked, wages paid, and meal and rest breaks. Falsification of time
            records or working off the clock violates federal and state law and may result in disciplinary
            action up to and including termination.
          </p>
        </Callout>

        <SectionHeader number="2" title="Time Recording Requirements" level={1} />

        <SectionHeader title="2.1 Daily Requirements" level={2} />
        
        <Paragraph>
          All non-exempt employees must accurately record time worked using <Token name="TIMEKEEPING_SYSTEM" />.
          Employees must:
        </Paragraph>

        <UnorderedList>
          <ListItem>Clock in at the start of each work shift</ListItem>
          <ListItem>Clock out for unpaid meal breaks</ListItem>
          <ListItem>Clock in after unpaid meal breaks</ListItem>
          <ListItem>Clock out at the end of each work shift</ListItem>
          <ListItem>Record all paid time off, sick leave, and absences</ListItem>
        </UnorderedList>

        <Paragraph>
          Time must be recorded in real-time when starting or ending work. Employees may not estimate,
          recreate, or batch-enter time records except when correcting technical system errors with
          supervisor approval.
        </Paragraph>

        <SectionHeader title="2.2 Prohibited Practices" level={2} />
        
        <Paragraph>
          The following practices are strictly prohibited:
        </Paragraph>

        <UnorderedList>
          <ListItem>
            <strong>Working off the clock:</strong> All time worked must be recorded, including brief tasks
            before or after scheduled shifts
          </ListItem>
          <ListItem>
            <strong>Falsifying time records:</strong> Intentionally recording inaccurate start/end times or
            hours worked
          </ListItem>
          <ListItem>
            <strong>Clocking in/out for another employee:</strong> Each employee must record their own time
          </ListItem>
          <ListItem>
            <strong>Unauthorized overtime:</strong> Working overtime without prior supervisor approval (note:
            all hours worked must still be recorded and paid)
          </ListItem>
        </UnorderedList>

        <Callout label="Important">
          <p>
            Even if overtime was not pre-approved, all hours worked must be recorded and will be compensated
            at the appropriate rate. However, working unauthorized overtime may result in disciplinary action.
            Employees must never omit actual hours worked to avoid discipline.
          </p>
        </Callout>

        <SectionHeader number="3" title="Time Record Corrections" level={1} />
        
        <Paragraph>
          If an employee discovers an error in their time record, they must:
        </Paragraph>

        <OrderedList>
          <ListItem>Notify their supervisor immediately</ListItem>
          <ListItem>Submit a written correction request specifying the correct times</ListItem>
          <ListItem>Obtain supervisor approval for the correction</ListItem>
          <ListItem>
            Ensure the correction is processed before the end of the current pay period when possible
          </ListItem>
        </OrderedList>

        <Paragraph>
          Supervisors must review and approve all time corrections within 24 hours. Corrections affecting
          prior pay periods require HR approval.
        </Paragraph>
      </Page>

      {/* PAGE 3: APPROVAL & COMPLIANCE */}
      <Page
        pageNumber={3}
        totalPages={templateMeta.totalPages}
        documentTitle={templateMeta.title}
        version={templateMeta.version}
        reviewedDate={templateMeta.reviewedDate}
      >
        <SectionHeader number="4" title="Supervisor Approval Process" level={1} rule />
        
        <Paragraph>
          Supervisors are responsible for reviewing and approving employee time records each pay period.
          Supervisors must:
        </Paragraph>

        <CheckboxRow>
          Review time records for accuracy, missed punches, and unusual patterns
        </CheckboxRow>
        <CheckboxRow>
          Verify that all meal and rest breaks were taken as required
        </CheckboxRow>
        <CheckboxRow>
          Approve or correct time records before payroll deadline
        </CheckboxRow>
        <CheckboxRow>
          Investigate any reports of missed breaks, off-the-clock work, or time recording issues
        </CheckboxRow>
        <CheckboxRow>
          Ensure employees are not working unauthorized hours or skipping breaks
        </CheckboxRow>

        <Paragraph>
          Supervisors who fail to properly review and approve time records may be subject to disciplinary
          action. Encouraging or requiring employees to work off the clock or skip breaks is grounds for
          immediate termination.
        </Paragraph>

        <SectionHeader number="5" title="Overtime & Scheduling" level={1} />
        
        <Paragraph>
          Non-exempt employees may work overtime only with advance supervisor approval. California and
          federal law requires overtime compensation as follows:
        </Paragraph>

        <UnorderedList>
          <ListItem>
            <strong>California daily overtime:</strong> 1.5× regular rate for hours over 8 in a workday, 2×
            regular rate for hours over 12 in a workday
          </ListItem>
          <ListItem>
            <strong>California weekly overtime:</strong> 1.5× regular rate for hours over 40 in a workweek
          </ListItem>
          <ListItem>
            <strong>California seventh-day overtime:</strong> 1.5× regular rate for first 8 hours on seventh
            consecutive workday, 2× regular rate for hours over 8
          </ListItem>
          <ListItem>
            <strong>Federal overtime:</strong> 1.5× regular rate for hours over 40 in a workweek
          </ListItem>
        </UnorderedList>

        <Paragraph>
          Employees receive the overtime rate most favorable to them under federal or California law.
        </Paragraph>

        <SectionHeader number="6" title="Record Retention" level={1} />
        
        <Paragraph>
          <Token name="COMPANY_NAME" /> retains all timekeeping records for a minimum of four (4) years as
          required by California Labor Code section 1174. Records include:
        </Paragraph>

        <UnorderedList>
          <ListItem>Daily time worked and start/end times</ListItem>
          <ListItem>Meal and rest break records</ListItem>
          <ListItem>Wage statements and payment records</ListItem>
          <ListItem>Time correction requests and approvals</ListItem>
        </UnorderedList>

        <Paragraph>
          Employees may request copies of their time records at any time by submitting a written request
          to HR.
        </Paragraph>

        <SectionHeader number="7" title="Employee Acknowledgment" level={1} rule />
        
        <Paragraph>
          I acknowledge that I have received, read, and understand this timekeeping policy. I understand
          that I am required to accurately record all hours worked, and I am prohibited from working off
          the clock, falsifying time records, or clocking in/out for other employees. I understand that
          violations of this policy may result in disciplinary action up to and including termination.
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
            This template is maintained by Guardrail HR and reviewed for compliance with current federal
            and California law. This document is informational only and does not constitute legal advice.
            Consult with legal counsel to ensure your specific policy meets your business needs and complies
            with applicable laws.
          </Paragraph>
        </div>

        <VersionHistory
          entries={[
            {
              version: '2.0',
              date: 'January 2026',
              changes: [
                'Updated California and federal overtime calculation rules',
                'Clarified prohibited practices section',
                'Added supervisor approval checklist',
              ],
            },
            {
              version: '1.5',
              date: 'October 2025',
              changes: [
                'Added record retention requirements',
                'Clarified time correction procedures',
              ],
            },
            {
              version: '1.0',
              date: 'August 2025',
              changes: ['Initial release'],
            },
          ]}
        />
      </Page>
    </TemplateDocument>
  );
}
