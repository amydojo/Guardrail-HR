/**
 * Demo: Timekeeping Policy
 * CA + Federal compliant timekeeping best practices
 * GR-WH-002 • v1.8 • Reviewed: Jan 2026
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
  UnorderedList,
} from './DocumentPrimitives';
import { DocumentMetadata } from './types';

const metadata: DocumentMetadata = {
  title: 'Timekeeping Policy',
  docId: 'GR-WH-002',
  version: 'v1.8',
  jurisdiction: 'CA + Federal',
  reviewedDate: 'January 2026',
  totalPages: 3,
};

export function DemoTimekeepingPolicy() {
  return (
    <Document metadata={metadata}>
      {/* Page 1: Cover + Purpose */}
      <Page>
        <div className="text-center">
          <DocTitle>Timekeeping Policy</DocTitle>
          <Spacer size="md" />
          <CoverPills items={['CA + Federal', 'v1.8', 'Policy', 'Reviewed Jan 2026']} />
          <Spacer size="xl" />
          <FieldGroup>
            <FieldPairComponent label="Company Name" value="[COMPANY_NAME]" placeholder="[COMPANY_NAME]" />
            <FieldPairComponent label="Effective Date" value="[EFFECTIVE_DATE]" placeholder="[EFFECTIVE_DATE]" />
            <FieldPairComponent label="Timekeeping System" value="[SYSTEM_NAME]" placeholder="[SYSTEM_NAME]" />
          </FieldGroup>
        </div>

        <Spacer size="xl" />
        <Divider />

        <H1>1. Purpose and Scope</H1>
        <Body>
          [COMPANY_NAME] maintains accurate records of all hours worked by non-exempt employees to ensure proper
          compensation and compliance with federal and California wage and hour laws. This policy applies to all
          non-exempt employees and establishes standards for recording work time, meal breaks, and rest breaks.
        </Body>

        <Callout
          title="Legal Requirement"
          content="Accurate timekeeping is required by law. Falsification of time records may result in disciplinary action, up to and including termination."
          variant="important"
        />

        <H1>2. Time Recording Requirements</H1>
        <H2>2.1 Recording All Time Worked</H2>
        <Body>
          Employees must accurately record all time worked using the Company's designated timekeeping system. "Time
          worked" includes all hours during which an employee is required to be on duty or at a prescribed workplace,
          whether or not actually performing work.
        </Body>

        <Body>Time worked includes, but is not limited to:</Body>
        <UnorderedList>
          <li>Regular work hours and scheduled shifts</li>
          <li>Overtime hours, whether pre-approved or not</li>
          <li>Training sessions, meetings, and required events</li>
          <li>Travel time during working hours</li>
          <li>Time spent working from home or remotely</li>
          <li>Any time spent performing work-related tasks before or after regular shifts</li>
        </UnorderedList>

        <H2>2.2 Start and End Times</H2>
        <Body>
          Employees must clock in at the start of each work shift and clock out at the end. Clocking in more than
          seven (7) minutes before a scheduled shift or clocking out more than seven (7) minutes after a shift requires
          supervisor approval.
        </Body>
      </Page>

      {/* Page 2: Meal Breaks + Procedures */}
      <Page>
        <H1>3. Meal and Rest Break Recording</H1>
        <H2>3.1 Meal Break Clocking</H2>
        <Body>
          Employees must clock out at the beginning of each meal break and clock in at the end. Meal breaks should be
          at least thirty (30) minutes in duration. Any meal break shorter than thirty minutes will be paid as working
          time.
        </Body>

        <Callout
          content="If you are interrupted during a meal break or perform any work, immediately report this to your supervisor. The meal break must be paid and may need to be rescheduled."
        />

        <H2>3.2 Rest Break Policy</H2>
        <Body>
          Rest breaks are paid time and do not require clocking out. Employees should take authorized ten (10) minute
          rest breaks as scheduled by their supervisor. Rest breaks should not be combined with meal breaks or used to
          arrive late or leave early.
        </Body>

        <H1>4. Time Record Accuracy</H1>
        <H2>4.1 Employee Responsibilities</H2>
        <div className="space-y-3 my-4">
          <ChecklistItem>Record all time worked completely and accurately each day</ChecklistItem>
          <ChecklistItem>Clock in and out for all shifts and meal breaks as required</ChecklistItem>
          <ChecklistItem>Review time records regularly for accuracy</ChecklistItem>
          <ChecklistItem>Report any errors or discrepancies immediately to your supervisor</ChecklistItem>
          <ChecklistItem>Never clock in or out for another employee</ChecklistItem>
          <ChecklistItem>Never allow another employee to clock in or out for you</ChecklistItem>
          <ChecklistItem>Obtain supervisor approval for all overtime before working</ChecklistItem>
        </div>

        <H2>4.2 Supervisor Responsibilities</H2>
        <Body>
          Supervisors must review and approve employee time records each pay period. This includes verifying the
          accuracy of start times, end times, meal breaks, and any overtime worked. Supervisors must investigate and
          correct any discrepancies promptly.
        </Body>

        <H1>5. Correcting Time Records</H1>
        <Body>
          If you discover an error in your time records, notify your supervisor immediately. Do not attempt to modify
          time records on your own. All corrections must be documented and approved by management.
        </Body>

        <Body>Common corrections include:</Body>
        <UnorderedList>
          <li>Missed clock-in or clock-out</li>
          <li>Incorrect time entry</li>
          <li>Work performed but not recorded</li>
          <li>Meal break interruption or shortened duration</li>
        </UnorderedList>
      </Page>

      {/* Page 3: Off-the-Clock Work + Acknowledgment */}
      <Page>
        <H1>6. Off-the-Clock Work Prohibition</H1>
        <Body>
          Employees must never perform work "off the clock." All time worked must be recorded in the timekeeping
          system, regardless of whether the work was requested or approved in advance. This includes:
        </Body>

        <UnorderedList>
          <li>Checking or responding to work emails outside scheduled hours</li>
          <li>Taking work phone calls before or after shifts</li>
          <li>Performing job duties during meal breaks</li>
          <li>Attending work-related meetings or training</li>
          <li>Traveling for work purposes</li>
        </UnorderedList>

        <Callout
          title="Zero Tolerance"
          content="Working off the clock is strictly prohibited. If a supervisor instructs you not to record time worked, report this to Human Resources immediately."
          variant="warning"
        />

        <H1>7. Record Retention</H1>
        <Body>
          [COMPANY_NAME] will maintain time records for all employees for a minimum of four (4) years as required by
          California law. Employees may request copies of their time records at any time by contacting Human Resources.
        </Body>

        <H1>8. Violations and Discipline</H1>
        <Body>
          Violations of this timekeeping policy may result in disciplinary action, up to and including termination.
          Violations include, but are not limited to:
        </Body>

        <UnorderedList>
          <li>Falsifying time records</li>
          <li>Clocking in or out for another employee</li>
          <li>Working off the clock</li>
          <li>Failing to record all time worked</li>
          <li>Failing to report time record errors</li>
        </UnorderedList>

        <Divider />

        <H1>9. Employee Acknowledgment</H1>
        <Body>
          I acknowledge that I have received, read, and understand this Timekeeping Policy. I understand my
          responsibility to accurately record all time worked and to report any errors or concerns immediately. I
          understand that falsifying time records or working off the clock may result in disciplinary action.
        </Body>

        <SignatureBlock
          lines={[
            { label: 'Employee Signature', name: '[EMPLOYEE_NAME]' },
            { label: 'Supervisor Signature', name: '[SUPERVISOR_NAME]' },
          ]}
        />

        <Spacer size="md" />

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
