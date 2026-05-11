/**
 * Independent Contractor Agreement (California)
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
  SignatureBlock,
  Token,
  OrderedList,
  UnorderedList,
  ListItem,
  VersionHistory,
} from './TemplateDocument';

export function IndependentContractorAgreement() {
  const templateMeta = {
    title: 'Independent contractor agreement',
    jurisdiction: 'California',
    version: '1.8',
    reviewedDate: 'January 2026',
    documentType: 'Agreement',
    totalPages: 3,
  };

  return (
    <TemplateDocument pageSize="letter">
      {/* PAGE 1: COVER */}
      <CoverPage {...templateMeta} />

      {/* PAGE 2: AGREEMENT TERMS */}
      <Page
        pageNumber={2}
        totalPages={templateMeta.totalPages}
        documentTitle={templateMeta.title}
        version={templateMeta.version}
        reviewedDate={templateMeta.reviewedDate}
      >
        <div style={{ marginBottom: '32px' }}>
          <Paragraph style={{ fontWeight: 600, fontSize: '12pt' }}>
            INDEPENDENT CONTRACTOR SERVICES AGREEMENT
          </Paragraph>
        </div>

        <SectionHeader number="1" title="Parties" level={1} rule />
        
        <Paragraph>
          This Independent Contractor Agreement ("Agreement") is entered into as of{' '}
          <Token name="EFFECTIVE_DATE" /> between:
        </Paragraph>

        <div style={{ marginLeft: '24px', marginBottom: '16px' }}>
          <Paragraph>
            <strong>Company:</strong> <Token name="COMPANY_NAME" />
            <br />
            Address: <Token name="COMPANY_ADDRESS" />
            <br />
            ("Company")
          </Paragraph>

          <Paragraph>
            <strong>Contractor:</strong> <Token name="CONTRACTOR_NAME" />
            <br />
            Address: <Token name="CONTRACTOR_ADDRESS" />
            <br />
            Business Entity: <Token name="CONTRACTOR_ENTITY_TYPE" />
            <br />
            ("Contractor")
          </Paragraph>
        </div>

        <SectionHeader number="2" title="Services & Scope of Work" level={1} />
        
        <Paragraph>
          Contractor agrees to provide the following services to Company:
        </Paragraph>

        <div style={{ marginLeft: '24px', marginBottom: '16px', padding: '16px', background: '#f9fafb', border: '1pt solid #e5e5e5', borderRadius: '8px' }}>
          <Paragraph>
            <Token name="SERVICES_DESCRIPTION" />
          </Paragraph>
        </div>

        <Paragraph>
          Contractor shall perform services as an independent business and shall have sole control over
          the manner and means of performing the services, subject to the specifications and requirements
          set forth in any applicable statement of work or project description.
        </Paragraph>

        <SectionHeader number="3" title="Compensation" level={1} />
        
        <Paragraph>
          Company shall pay Contractor as follows:
        </Paragraph>

        <div style={{ marginLeft: '24px', marginBottom: '16px' }}>
          <FieldRow label="Rate" token="COMPENSATION_RATE" />
          <FieldRow label="Payment Schedule" token="PAYMENT_SCHEDULE" />
          <FieldRow label="Invoice Submission" token="INVOICE_PROCESS" />
        </div>

        <Paragraph>
          Contractor is responsible for all expenses unless otherwise agreed in writing. Contractor shall
          submit invoices detailing services performed, dates, and hours (if applicable). Payment shall
          be made within <Token name="PAYMENT_TERMS" /> days of receipt of valid invoice.
        </Paragraph>

        <SectionHeader number="4" title="Independent Contractor Relationship" level={1} />
        
        <Paragraph>
          The parties intend and agree that Contractor is an independent contractor and not an employee
          of Company. Contractor acknowledges and agrees:
        </Paragraph>

        <UnorderedList>
          <ListItem>
            Contractor is not entitled to employee benefits, including health insurance, retirement plans,
            paid time off, or workers' compensation
          </ListItem>
          <ListItem>
            Contractor is responsible for all federal, state, and local taxes on compensation received,
            including self-employment taxes
          </ListItem>
          <ListItem>
            Contractor maintains a separate business with multiple clients or the ability to serve multiple
            clients
          </ListItem>
          <ListItem>
            Contractor has control over the manner and means of performing services, including work schedule,
            methods, and location
          </ListItem>
          <ListItem>
            Contractor provides necessary tools, equipment, and materials to perform services (except as
            specifically provided by Company)
          </ListItem>
        </UnorderedList>

        <Callout label="California ABC Test">
          <p>
            Under California law (AB 5 and Dynamex), a worker is presumed to be an employee unless the
            hiring entity proves all three factors of the ABC test:
          </p>
          <p style={{ marginTop: '8px' }}>
            <strong>(A)</strong> The worker is free from control and direction of the hiring entity;
            <br />
            <strong>(B)</strong> The worker performs work outside the usual course of the hiring entity's
            business; and
            <br />
            <strong>(C)</strong> The worker is customarily engaged in an independently established trade,
            occupation, or business.
          </p>
          <p style={{ marginTop: '8px' }}>
            This agreement is intended to comply with the ABC test. Consult legal counsel to ensure proper
            classification.
          </p>
        </Callout>
      </Page>

      {/* PAGE 3: TERMS & CONDITIONS */}
      <Page
        pageNumber={3}
        totalPages={templateMeta.totalPages}
        documentTitle={templateMeta.title}
        version={templateMeta.version}
        reviewedDate={templateMeta.reviewedDate}
      >
        <SectionHeader number="5" title="Term & Termination" level={1} rule />
        
        <Paragraph>
          This Agreement begins on <Token name="START_DATE" /> and continues until <Token name="END_DATE" />,
          unless terminated earlier as provided below.
        </Paragraph>

        <Paragraph>
          Either party may terminate this Agreement:
        </Paragraph>

        <UnorderedList>
          <ListItem>
            For convenience with <Token name="TERMINATION_NOTICE_DAYS" /> days' written notice
          </ListItem>
          <ListItem>
            Immediately for material breach if the breaching party fails to cure within 10 days of written
            notice
          </ListItem>
          <ListItem>
            Immediately if required by law or governmental order
          </ListItem>
        </UnorderedList>

        <Paragraph>
          Upon termination, Contractor shall immediately return all Company property, equipment, and
          confidential information. Company shall pay Contractor for all services satisfactorily performed
          through the termination date.
        </Paragraph>

        <SectionHeader number="6" title="Confidentiality" level={1} />
        
        <Paragraph>
          Contractor agrees to keep confidential all proprietary and confidential information disclosed
          by Company, including business plans, customer lists, financial information, and trade secrets.
          Contractor shall not use or disclose confidential information except as necessary to perform
          services under this Agreement.
        </Paragraph>

        <SectionHeader number="7" title="Work Product & Intellectual Property" level={1} />
        
        <Paragraph>
          All work product, deliverables, and intellectual property created by Contractor in the course
          of performing services under this Agreement ("Work Product") shall be deemed a work made for
          hire and shall be the sole property of Company. To the extent any Work Product does not qualify
          as a work made for hire, Contractor hereby assigns all rights, title, and interest in the Work
          Product to Company.
        </Paragraph>

        <SectionHeader number="8" title="Insurance & Indemnification" level={1} />
        
        <Paragraph>
          Contractor shall maintain general liability insurance with minimum coverage of{' '}
          <Token name="INSURANCE_AMOUNT" /> and shall name Company as an additional insured. Contractor
          agrees to indemnify and hold Company harmless from any claims, damages, or liabilities arising
          from Contractor's performance of services or breach of this Agreement.
        </Paragraph>

        <SectionHeader number="9" title="Governing Law" level={1} />
        
        <Paragraph>
          This Agreement shall be governed by the laws of the State of California without regard to
          conflicts of law principles. Any disputes shall be resolved in the state or federal courts
          located in <Token name="JURISDICTION_COUNTY" /> County, California.
        </Paragraph>

        <SectionHeader number="10" title="Signatures" level={1} rule />
        
        <Paragraph>
          By signing below, the parties agree to the terms and conditions of this Independent Contractor
          Agreement.
        </Paragraph>

        <div style={{ marginTop: '24px' }}>
          <Paragraph style={{ fontWeight: 600, marginBottom: '16px' }}>COMPANY:</Paragraph>
          <SignatureBlock
            fields={[
              { label: 'Authorized Signature', type: 'signature' },
              { label: 'Date', type: 'date' },
              { label: 'Printed Name', type: 'name', token: 'COMPANY_SIGNATORY_NAME' },
              { label: 'Title', type: 'name', token: 'COMPANY_SIGNATORY_TITLE' },
            ]}
          />
        </div>

        <div style={{ marginTop: '32px' }}>
          <Paragraph style={{ fontWeight: 600, marginBottom: '16px' }}>CONTRACTOR:</Paragraph>
          <SignatureBlock
            fields={[
              { label: 'Contractor Signature', type: 'signature' },
              { label: 'Date', type: 'date' },
              { label: 'Printed Name', type: 'name', token: 'CONTRACTOR_NAME' },
            ]}
          />
        </div>

        <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '0.5pt solid #e5e5e5' }}>
          <Paragraph style={{ fontSize: '9pt', color: '#737373' }}>
            This template is maintained by Guardrail HR and reviewed for compliance with current California
            law. This document is informational only and does not constitute legal advice. Consult with legal
            counsel to ensure this agreement meets your specific needs and complies with applicable laws,
            including proper worker classification under California's ABC test.
          </Paragraph>
        </div>

        <VersionHistory
          entries={[
            {
              version: '1.8',
              date: 'January 2026',
              changes: [
                'Updated ABC test callout language',
                'Clarified work product ownership provisions',
                'Added insurance requirements section',
              ],
            },
            {
              version: '1.5',
              date: 'September 2025',
              changes: [
                'Strengthened independent contractor factors',
                'Updated termination notice provisions',
              ],
            },
            {
              version: '1.0',
              date: 'June 2025',
              changes: ['Initial release'],
            },
          ]}
        />
      </Page>
    </TemplateDocument>
  );
}
