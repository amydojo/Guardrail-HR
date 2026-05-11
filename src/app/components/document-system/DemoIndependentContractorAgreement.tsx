/**
 * Demo: Independent Contractor Agreement
 * California ABC test-compliant agreement template
 * GR-IC-001 • v1.3 • Reviewed: Jan 2026
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
  SignatureBlock,
  Divider,
  Spacer,
  CoverPills,
  OrderedList,
  UnorderedList,
} from './DocumentPrimitives';
import { DocumentMetadata } from './types';

const metadata: DocumentMetadata = {
  title: 'Independent Contractor Agreement',
  docId: 'GR-IC-001',
  version: 'v1.3',
  jurisdiction: 'California',
  reviewedDate: 'January 2026',
  totalPages: 3,
};

export function DemoIndependentContractorAgreement() {
  return (
    <Document metadata={metadata}>
      {/* Page 1: Cover + Recitals */}
      <Page>
        <div className="text-center">
          <DocTitle>Independent Contractor Agreement</DocTitle>
          <Spacer size="md" />
          <CoverPills items={['California', 'v1.3', 'Agreement', 'Reviewed Jan 2026']} />
          <Spacer size="xl" />
        </div>

        <Body>
          This Independent Contractor Agreement ("Agreement") is entered into as of [EFFECTIVE_DATE] ("Effective
          Date") by and between:
        </Body>

        <FieldGroup title="Company Information">
          <FieldPairComponent label="Company Name" value="[COMPANY_NAME]" placeholder="[COMPANY_NAME]" />
          <FieldPairComponent label="Company Address" value="[COMPANY_ADDRESS]" placeholder="[COMPANY_ADDRESS]" />
          <FieldPairComponent
            label="Company Representative"
            value="[COMPANY_REP]"
            placeholder="[COMPANY_REP]"
          />
        </FieldGroup>

        <Body className="text-center my-4">(hereinafter "Company")</Body>

        <Body>and</Body>

        <FieldGroup title="Contractor Information">
          <FieldPairComponent label="Contractor Name" value="[CONTRACTOR_NAME]" placeholder="[CONTRACTOR_NAME]" />
          <FieldPairComponent
            label="Contractor Address"
            value="[CONTRACTOR_ADDRESS]"
            placeholder="[CONTRACTOR_ADDRESS]"
          />
          <FieldPairComponent
            label="Business Entity Type"
            value="[ENTITY_TYPE]"
            placeholder="[ENTITY_TYPE]"
          />
        </FieldGroup>

        <Body className="text-center my-4">(hereinafter "Contractor")</Body>

        <Callout
          title="California ABC Test Notice"
          content="Under California law (AB5), workers are presumed to be employees unless the hiring entity can establish all three factors of the ABC test. This agreement is designed to support an independent contractor relationship."
          variant="important"
        />

        <H1>Recitals</H1>
        <Body>
          WHEREAS, Contractor operates an independent business providing [SERVICE_TYPE] services to various clients;
        </Body>
        <Body>WHEREAS, Company desires to engage Contractor on an independent basis to provide certain services;</Body>
        <Body>
          WHEREAS, Contractor has the skill, experience, and resources necessary to provide the services independently;
        </Body>
        <Body>
          NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree
          as follows:
        </Body>
      </Page>

      {/* Page 2: Services + Control */}
      <Page>
        <H1>1. Services and Scope of Work</H1>
        <Body>
          Contractor agrees to provide the following services to Company on an independent contractor basis:
        </Body>

        <div className="my-4 p-4 bg-[#f9fafb] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#2d2d2d] rounded-[8px]">
          <Body className="text-[10pt] italic mb-0">
            [DETAILED_SCOPE_OF_WORK]
            <br />
            <br />
            Example: Contractor will provide graphic design services including logo design, marketing materials, and
            website graphics as requested by Company on a project-by-project basis.
          </Body>
        </div>

        <H1>2. Independent Contractor Relationship</H1>
        <Body>
          The parties acknowledge and agree that Contractor is an independent contractor and not an employee of Company
          for any purpose. This relationship is established to satisfy the California ABC test requirements:
        </Body>

        <H2>2.1 Freedom from Control (Prong A)</H2>
        <Body>
          Contractor has complete control over the manner, means, and methods of performing the services. Company will
          not:
        </Body>
        <UnorderedList>
          <li>Set Contractor's work hours or schedule</li>
          <li>Require Contractor to work from Company's premises</li>
          <li>Provide detailed instructions on how to perform the work</li>
          <li>Supervise Contractor's day-to-day activities</li>
          <li>Provide training on how to perform the services</li>
        </UnorderedList>

        <H2>2.2 Outside Usual Course of Business (Prong B)</H2>
        <Body>
          The services provided by Contractor are outside the usual course of Company's business operations.
          Specifically:
        </Body>
        <UnorderedList>
          <li>Services are [PROJECT-BASED / SPECIALIZED / SUPPLEMENTAL] in nature</li>
          <li>Services are not part of Company's regular business activities</li>
          <li>Work is performed at locations separate from Company's business</li>
        </UnorderedList>

        <H2>2.3 Independent Established Business (Prong C)</H2>
        <Body>
          Contractor represents and warrants that they maintain an independently established business providing similar
          services to other clients. Evidence includes:
        </Body>
        <UnorderedList>
          <li>Business license or registration: [LICENSE_NUMBER]</li>
          <li>Maintains business location separate from Company</li>
          <li>Provides services to multiple clients in the same industry</li>
          <li>Advertises services publicly and seeks other clients</li>
          <li>Maintains own tools, equipment, and resources</li>
        </UnorderedList>
      </Page>

      {/* Page 3: Compensation + Signatures */}
      <Page>
        <H1>3. Compensation and Payment Terms</H1>
        <Body>Company will compensate Contractor as follows:</Body>

        <FieldGroup>
          <FieldPairComponent label="Rate Structure" value="[RATE_STRUCTURE]" placeholder="[RATE_STRUCTURE]" />
          <FieldPairComponent label="Payment Schedule" value="[PAYMENT_TERMS]" placeholder="[PAYMENT_TERMS]" />
          <FieldPairComponent label="Invoice Due Date" value="[DUE_DATE]" placeholder="[DUE_DATE]" />
        </FieldGroup>

        <Body>
          Contractor is responsible for all federal, state, and local taxes, including self-employment taxes. Company
          will issue IRS Form 1099-NEC for services performed.
        </Body>

        <H1>4. No Employee Benefits</H1>
        <Body>
          Contractor is not entitled to any employee benefits including, but not limited to, health insurance, paid
          time off, retirement benefits, workers' compensation, unemployment insurance, or any other benefits provided
          to Company employees.
        </Body>

        <H1>5. Business Expenses</H1>
        <Body>
          Contractor is responsible for all business expenses incurred in performing services, including equipment,
          supplies, insurance, licensing, and travel costs, unless specifically agreed otherwise in writing.
        </Body>

        <H1>6. Term and Termination</H1>
        <Body>
          This Agreement begins on [EFFECTIVE_DATE] and continues until terminated by either party with [NOTICE_PERIOD]
          written notice. Either party may terminate immediately for material breach of this Agreement.
        </Body>

        <H1>7. Confidentiality</H1>
        <Body>
          Contractor agrees to maintain the confidentiality of all proprietary and confidential information disclosed
          by Company during the term of this Agreement and for [CONFIDENTIALITY_PERIOD] thereafter.
        </Body>

        <Callout
          content="This Agreement constitutes the entire understanding between the parties. Any amendments must be in writing and signed by both parties."
        />

        <Divider />

        <Body>
          IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date first written above.
        </Body>

        <SignatureBlock
          lines={[
            { label: 'Company Representative', name: '[COMPANY_REP]' },
            { label: 'Contractor', name: '[CONTRACTOR_NAME]' },
          ]}
        />

        <Spacer size="md" />

        <div className="text-center">
          <Body className="text-[10pt] text-theme-text-3">
            This document is provided for informational purposes only and does not constitute legal advice.
            <br />
            Consult with qualified legal counsel before using this agreement.
          </Body>
        </div>
      </Page>
    </Document>
  );
}
