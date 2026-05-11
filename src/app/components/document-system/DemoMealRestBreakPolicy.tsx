/**
 * Demo: Meal & Rest Break Policy
 * California-compliant policy template with 3 pages
 * GR-WH-001 • v2.1 • Reviewed: Jan 2026
 */

import React from 'react';
import { Document, Page } from './DocumentPreviewFrame';
import {
  DocTitle,
  H1,
  H2,
  Body,
  Callout,
  FieldPairComponent,
  FieldGroup,
  ChecklistItem,
  SignatureBlock,
  Divider,
  Spacer,
  CoverPills,
  OrderedList,
} from './DocumentPrimitives';
import { DocumentMetadata } from './types';

const metadata: DocumentMetadata = {
  title: 'Meal & Rest Break Policy',
  docId: 'GR-WH-001',
  version: 'v2.1',
  jurisdiction: 'California',
  reviewedDate: 'January 2026',
  totalPages: 3,
};

export function DemoMealRestBreakPolicy() {
  return (
    <Document metadata={metadata}>
      {/* Page 1: Cover + Overview */}
      <Page>
        <div className="text-center">
          <DocTitle>Meal & Rest Break Policy</DocTitle>
          <Spacer size="md" />
          <CoverPills items={['California', 'v2.1', 'Policy', 'Reviewed Jan 2026']} />
          <Spacer size="xl" />
          <FieldGroup>
            <FieldPairComponent label="Company Name" value="[COMPANY_NAME]" placeholder="[COMPANY_NAME]" />
            <FieldPairComponent label="Effective Date" value="[EFFECTIVE_DATE]" placeholder="[EFFECTIVE_DATE]" />
            <FieldPairComponent label="Policy Owner" value="[POLICY_OWNER]" placeholder="[POLICY_OWNER]" />
          </FieldGroup>
        </div>

        <Spacer size="xl" />
        <Divider />

        <H1>1. Policy Statement</H1>
        <Body>
          [COMPANY_NAME] is committed to full compliance with California wage and hour laws. This policy outlines the
          meal and rest break requirements for all non-exempt employees working in California. Managers and supervisors
          are responsible for ensuring employees take all required breaks and are never pressured or encouraged to skip
          breaks.
        </Body>

        <Callout
          title="Important"
          content="Failure to provide compliant meal and rest breaks may result in penalty payments of one hour of wages for each workday a break is not provided."
          variant="important"
        />

        <H1>2. Meal Break Requirements</H1>
        <H2>2.1 Timing and Duration</H2>
        <Body>
          Non-exempt employees who work more than five (5) hours in a workday must receive an unpaid meal break of at
          least thirty (30) minutes. The meal break must begin before the end of the fifth hour of work.
        </Body>

        <H2>2.2 Second Meal Break</H2>
        <Body>
          Employees who work more than ten (10) hours in a workday must receive a second thirty (30) minute meal break
          before the end of the tenth hour of work.
        </Body>

        <H2>2.3 Duty-Free Requirement</H2>
        <Body>
          During meal breaks, employees must be completely relieved of all duties and free to leave the premises. The
          Company will not exercise control over employees' activities during meal breaks.
        </Body>
      </Page>

      {/* Page 2: Rest Breaks + Procedures */}
      <Page>
        <H1>3. Rest Break Requirements</H1>
        <H2>3.1 Timing and Duration</H2>
        <Body>
          Non-exempt employees are authorized and permitted to take a paid ten (10) minute rest break for every four
          (4) hours worked, or major fraction thereof. Rest breaks should be scheduled as close to the middle of the
          work period as practicable.
        </Body>

        <H2>3.2 Rest Break Schedule</H2>
        <OrderedList>
          <li>
            <strong>3.5 to 6 hours worked:</strong> One (1) ten-minute rest break
          </li>
          <li>
            <strong>6 to 10 hours worked:</strong> Two (2) ten-minute rest breaks
          </li>
          <li>
            <strong>10 to 14 hours worked:</strong> Three (3) ten-minute rest breaks
          </li>
        </OrderedList>

        <Callout
          content="Rest breaks are paid time and must not be combined with meal breaks or used to arrive late or leave early without supervisor approval."
        />

        <H1>4. Manager and Supervisor Responsibilities</H1>
        <Body>
          Managers and supervisors must actively ensure compliance with this policy. Specific responsibilities include:
        </Body>

        <div className="space-y-3 my-4">
          <ChecklistItem>Schedule work to allow employees to take all required breaks</ChecklistItem>
          <ChecklistItem>Never pressure or encourage employees to skip breaks</ChecklistItem>
          <ChecklistItem>Never interrupt employees during meal breaks unless an emergency occurs</ChecklistItem>
          <ChecklistItem>Ensure adequate coverage so employees can take breaks without disruption</ChecklistItem>
          <ChecklistItem>Document any instances where an employee voluntarily waives a meal break (if permitted)</ChecklistItem>
          <ChecklistItem>Report any break compliance issues to Human Resources immediately</ChecklistItem>
        </div>

        <H1>5. Meal Break Waivers</H1>
        <H2>5.1 First Meal Break Waiver</H2>
        <Body>
          An employee may voluntarily waive their first meal break if the total work period is no more than six (6)
          hours. The waiver must be in writing and can be revoked at any time by the employee.
        </Body>

        <H2>5.2 Second Meal Break Waiver</H2>
        <Body>
          An employee may voluntarily waive their second meal break if the total work period is no more than twelve
          (12) hours AND the employee has not waived their first meal break. The waiver must be in writing and
          mutually agreed upon.
        </Body>
      </Page>

      {/* Page 3: On-Duty Meals + Acknowledgment */}
      <Page>
        <H1>6. On-Duty Meal Periods</H1>
        <Body>
          In limited circumstances where the nature of work prevents an employee from being relieved of all duties, an
          on-duty meal period may be permitted. This requires:
        </Body>

        <OrderedList>
          <li>The nature of the work prevents the employee from being relieved of all duties</li>
          <li>The employee and employer agree in writing to an on-duty meal period</li>
          <li>The on-duty meal period is paid as work time</li>
          <li>The agreement may be revoked by either party with written notice</li>
        </OrderedList>

        <Callout
          title="Manager Approval Required"
          content="All on-duty meal period agreements must be reviewed and approved by Human Resources before implementation."
          variant="warning"
        />

        <H1>7. Reporting Break Violations</H1>
        <Body>
          Employees who are not provided with compliant meal or rest breaks, or who are pressured to skip breaks, must
          immediately report the issue to their supervisor or Human Resources. Reports can be made confidentially and
          without fear of retaliation.
        </Body>

        <Body>
          The Company will investigate all reports promptly and take corrective action as needed. Employees may be
          entitled to penalty payments for missed breaks as required by California law.
        </Body>

        <Divider />

        <H1>8. Employee Acknowledgment</H1>
        <Body>
          I acknowledge that I have received, read, and understand this Meal & Rest Break Policy. I understand my
          rights to meal and rest breaks and my responsibility to take all required breaks. I agree to report any
          concerns about break compliance to my supervisor or Human Resources.
        </Body>

        <SignatureBlock
          lines={[
            { label: 'Employee Signature', name: '[EMPLOYEE_NAME]' },
            { label: 'Manager Signature', name: '[MANAGER_NAME]' },
          ]}
        />

        <Spacer size="lg" />

        <div className="text-center">
          <Body className="text-[10pt] text-theme-text-3">
            This document is provided for informational purposes only and does not constitute legal advice.
            <br />
            Consult with qualified legal counsel for guidance specific to your situation.
          </Body>
        </div>
      </Page>
    </Document>
  );
}
