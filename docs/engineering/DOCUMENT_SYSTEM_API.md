# Document System API Reference

Complete API documentation for all components in the DocumentPreviewFrame system.

## Core Components

### `<Document>`

Multi-page document container with automatic header/footer management.

```tsx
import { Document } from '@/app/components/document-system';

<Document 
  metadata={DocumentMetadata} 
  paperSize="us-letter" | "a4"  // Optional, default: "us-letter"
>
  <Page>{/* Page 1 */}</Page>
  <Page>{/* Page 2 */}</Page>
</Document>
```

**Props:**
- `metadata: DocumentMetadata` - Document information for headers/footers
- `paperSize?: 'us-letter' | 'a4'` - Paper format (default: 'us-letter')
- `children: React.ReactNode` - Page components

---

### `<DocumentPreviewFrame>`

Single page frame with header, footer, and margins (typically used internally by `<Document>`).

```tsx
import { DocumentPreviewFrame } from '@/app/components/document-system';

<DocumentPreviewFrame
  metadata={metadata}
  currentPage={1}
  paperSize="us-letter"
>
  {/* Page content */}
</DocumentPreviewFrame>
```

**Props:**
- `metadata: DocumentMetadata` - Document information
- `currentPage: number` - Current page number for footer
- `paperSize?: 'us-letter' | 'a4'` - Paper format
- `children: React.ReactNode` - Page content
- `className?: string` - Additional CSS classes

**Layout:**
- Header: 48px top padding, 12px bottom, border-bottom
- Content: 72px horizontal padding, 32px vertical
- Footer: 12px top padding, 48px bottom, border-top

---

### `<Page>`

Content wrapper for manual page breaks.

```tsx
import { Page } from '@/app/components/document-system';

<Page className="custom-class">
  {/* Page content */}
</Page>
```

**Props:**
- `children: React.ReactNode` - Page content
- `className?: string` - Additional CSS classes

---

## Typography Primitives

### `<DocTitle>`

Main document title (24pt, cover pages).

```tsx
<DocTitle className="text-center">
  Independent Contractor Agreement
</DocTitle>
```

**Styling:**
- Size: 24pt
- Weight: 600 (semibold)
- Tracking: -0.02em
- Line height: 1.2

---

### `<H1>`

Major section headings (18pt).

```tsx
<H1>1. Services & Scope of Work</H1>
```

**Styling:**
- Size: 18pt
- Weight: 600
- Tracking: -0.015em
- Line height: 1.3
- Margin: 32px top, 16px bottom

---

### `<H2>`

Subsection headings (14pt).

```tsx
<H2>2.1 Timing and Duration</H2>
```

**Styling:**
- Size: 14pt
- Weight: 600
- Tracking: -0.01em
- Line height: 1.4
- Margin: 24px top, 12px bottom

---

### `<H3>`

Minor headings (12pt).

```tsx
<H3>Additional Requirements</H3>
```

**Styling:**
- Size: 12pt
- Weight: 600
- Line height: 1.4
- Margin: 16px top, 8px bottom

---

### `<Body>`

Paragraph text (11.5pt).

```tsx
<Body>
  This is the standard paragraph text used throughout documents.
</Body>
```

**Styling:**
- Size: 11.5pt
- Weight: 400 (normal)
- Line height: 1.5
- Margin: 12px bottom

---

### `<Meta>`

Small caps metadata (9pt).

```tsx
<Meta>COMPANY INFORMATION</Meta>
```

**Styling:**
- Size: 9pt
- Weight: 400
- Tracking: 0.01em
- Transform: uppercase

---

## Layout Primitives

### `<FieldPairComponent>`

Label and value pair with optional placeholder token.

```tsx
<FieldPairComponent
  label="Company Name"
  value="Acme Corporation"
  placeholder="[COMPANY_NAME]"
  className="custom-class"
/>
```

**Props:**
- `label: string` - Field label (e.g., "Company Name")
- `value: string` - Field value
- `placeholder?: string` - Token placeholder (e.g., "[COMPANY_NAME]")
- `className?: string` - Additional CSS classes

**Renders:**
```
Company Name: [COMPANY_NAME]
```

---

### `<Callout>`

Highlighted notice box with left accent border.

```tsx
<Callout
  title="Important"
  content="This is a critical notice that requires attention."
  variant="important"
  className="custom-class"
/>
```

**Props:**
- `title?: string` - Optional callout title
- `content: string | React.ReactNode` - Callout content
- `variant?: 'info' | 'warning' | 'important'` - Visual style (default: 'info')
- `className?: string` - Additional CSS classes

**Variants:**
- `info`: Blue accent (default)
- `warning`: Orange accent
- `important`: Red accent

---

### `<ChecklistItem>`

Checkbox list item with Unicode checkbox.

```tsx
<ChecklistItem>
  Never pressure or encourage employees to skip breaks
</ChecklistItem>
```

**Props:**
- `children: React.ReactNode` - Checklist item text
- `className?: string` - Additional CSS classes

**Renders:**
```
☐ Never pressure or encourage employees to skip breaks
```

---

### `<SignatureBlock>`

Signature lines without tables.

```tsx
<SignatureBlock
  lines={[
    { label: 'Employee Signature', name: '[EMPLOYEE_NAME]' },
    { label: 'Manager Signature', name: '[MANAGER_NAME]' },
  ]}
  className="custom-class"
/>
```

**Props:**
- `lines: SignatureLine[]` - Array of signature line configs
- `className?: string` - Additional CSS classes

**SignatureLine Interface:**
```typescript
interface SignatureLine {
  label: string;      // "Employee Signature"
  name?: string;      // "[EMPLOYEE_NAME]" (optional)
}
```

**Renders:**
```
Employee Signature: ___________________ Date: _________
Printed Name: [EMPLOYEE_NAME]

Manager Signature: ____________________ Date: _________
Printed Name: [MANAGER_NAME]
```

---

### `<OrderedList>`

Numbered list with proper styling.

```tsx
<OrderedList>
  <li>First requirement</li>
  <li>Second requirement</li>
  <li>Third requirement</li>
</OrderedList>
```

**Props:**
- `children: React.ReactNode` - List items (use `<li>` tags)
- `className?: string` - Additional CSS classes

---

### `<UnorderedList>`

Bulleted list with proper styling.

```tsx
<UnorderedList>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</UnorderedList>
```

**Props:**
- `children: React.ReactNode` - List items (use `<li>` tags)
- `className?: string` - Additional CSS classes

---

### `<FieldGroup>`

Container for multiple field pairs with optional title.

```tsx
<FieldGroup title="Company Information">
  <FieldPairComponent label="Name" value="[COMPANY_NAME]" />
  <FieldPairComponent label="Address" value="[COMPANY_ADDRESS]" />
  <FieldPairComponent label="Phone" value="[COMPANY_PHONE]" />
</FieldGroup>
```

**Props:**
- `children: React.ReactNode` - Field pair components
- `title?: string` - Optional group title (rendered as Meta)
- `className?: string` - Additional CSS classes

---

### `<CoverPills>`

Metadata pills for cover pages.

```tsx
<CoverPills 
  items={['California', 'v2.1', 'Policy', 'Reviewed Jan 2026']} 
  className="custom-class"
/>
```

**Props:**
- `items: string[]` - Array of pill labels
- `className?: string` - Additional CSS classes

**Renders:**
```
[California] [v2.1] [Policy] [Reviewed Jan 2026]
```

---

### `<Divider>`

Horizontal rule with subtle styling.

```tsx
<Divider className="custom-class" />
```

**Props:**
- `className?: string` - Additional CSS classes

---

### `<Spacer>`

Explicit vertical spacing.

```tsx
<Spacer size="md" />
```

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Spacing size (default: 'md')

**Sizes:**
- `sm`: 12px
- `md`: 24px
- `lg`: 32px
- `xl`: 48px

---

## Export Components

### `<DocumentDownloadActions>`

Full download action bar with all export options.

```tsx
<DocumentDownloadActions
  metadata={{
    title: 'Employee Handbook',
    docId: 'GR-HR-001',
    version: 'v2.0',
    jurisdiction: 'California',
    reviewedDate: 'January 2026',
    totalPages: 10,
  }}
  className="custom-class"
/>
```

**Props:**
- `metadata: DocumentMetadata` - Document information for exports
- `className?: string` - Additional CSS classes

**Buttons:**
- Print (opens browser print dialog)
- Download PDF (primary action)
- More menu (DOCX, Google Docs)

---

### `<CompactDownloadActions>`

Minimal icon-only download buttons.

```tsx
<CompactDownloadActions
  metadata={metadata}
  className="custom-class"
/>
```

**Props:**
- `metadata: DocumentMetadata` - Document information
- `className?: string` - Additional CSS classes

**Buttons:**
- Print icon button
- Download PDF icon button

---

## TypeScript Interfaces

### DocumentMetadata

```typescript
interface DocumentMetadata {
  title: string;           // Document title
  docId: string;           // Document ID (e.g., "GR-WH-001")
  version: string;         // Version (e.g., "v2.1")
  jurisdiction: string;    // Jurisdiction (e.g., "California")
  reviewedDate: string;    // Review date (e.g., "January 2026")
  totalPages: number;      // Total page count
}
```

---

### PaperSize

```typescript
type PaperSize = 'us-letter' | 'a4';
```

---

### FieldPair

```typescript
interface FieldPair {
  label: string;           // Field label
  value: string;           // Field value
  placeholder?: string;    // Optional token placeholder
}
```

---

### SignatureLine

```typescript
interface SignatureLine {
  label: string;           // Signature line label
  name?: string;           // Optional name placeholder
}
```

---

### CalloutContent

```typescript
interface CalloutContent {
  title?: string;          // Optional title
  content: string | React.ReactNode;
  variant?: 'info' | 'warning' | 'important';
}
```

---

## CSS Classes

### Page Break Controls

```tsx
// Prevent breaking inside element
<div className="break-inside-avoid">
  {/* Content stays together */}
</div>

// Force break before element
<div className="break-before">
  {/* Starts on new page */}
</div>

// Force break after element
<div className="break-after">
  {/* Following content starts on new page */}
</div>
```

### Print Visibility

```tsx
// Hide in print mode
<div className="print:hidden">
  {/* Not visible when printing */}
</div>

// Show only in print
<div className="hidden print:block">
  {/* Only visible when printing */}
</div>
```

### Paper Size

```tsx
// Apply to container for A4
<div className="paper-a4">
  <Document paperSize="a4">{/* ... */}</Document>
</div>
```

---

## Example: Complete Template

```tsx
import {
  Document,
  Page,
  DocTitle,
  H1,
  H2,
  Body,
  Callout,
  FieldPairComponent,
  FieldGroup,
  SignatureBlock,
  CoverPills,
  Spacer,
  Divider,
  DocumentDownloadActions,
} from '@/app/components/document-system';

const metadata = {
  title: 'Employment Agreement',
  docId: 'GR-HR-003',
  version: 'v1.0',
  jurisdiction: 'California',
  reviewedDate: 'January 2026',
  totalPages: 2,
};

export function EmploymentAgreement() {
  return (
    <>
      <DocumentDownloadActions metadata={metadata} />
      
      <Document metadata={metadata}>
        {/* Page 1: Cover */}
        <Page>
          <div className="text-center">
            <DocTitle>Employment Agreement</DocTitle>
            <Spacer size="md" />
            <CoverPills items={['California', 'v1.0', 'Agreement']} />
            <Spacer size="xl" />
          </div>

          <FieldGroup title="Company Information">
            <FieldPairComponent 
              label="Company Name" 
              value="[COMPANY_NAME]" 
              placeholder="[COMPANY_NAME]" 
            />
            <FieldPairComponent 
              label="Employee Name" 
              value="[EMPLOYEE_NAME]" 
              placeholder="[EMPLOYEE_NAME]" 
            />
          </FieldGroup>

          <Spacer size="lg" />
          <Divider />

          <H1>1. Position and Duties</H1>
          <Body>
            Employee agrees to serve as [JOB_TITLE] and will perform all 
            duties as reasonably assigned by the Company.
          </Body>

          <Callout
            title="At-Will Employment"
            content="This is an at-will employment relationship. Either party 
            may terminate this agreement at any time, with or without cause."
            variant="important"
          />
        </Page>

        {/* Page 2: Terms + Signatures */}
        <Page>
          <H1>2. Compensation</H1>
          <Body>
            Employee will receive an annual salary of [SALARY_AMOUNT], 
            payable in accordance with Company's regular payroll schedule.
          </Body>

          <H2>2.1 Benefits</H2>
          <Body>
            Employee is eligible for all standard benefits offered to 
            similarly situated employees, including health insurance, 
            retirement plans, and paid time off.
          </Body>

          <Spacer size="lg" />
          <Divider />

          <H1>3. Acknowledgment</H1>
          <Body>
            By signing below, both parties acknowledge that they have read, 
            understood, and agree to be bound by the terms of this Agreement.
          </Body>

          <SignatureBlock
            lines={[
              { label: 'Employee Signature', name: '[EMPLOYEE_NAME]' },
              { label: 'Company Representative', name: '[COMPANY_REP]' },
            ]}
          />
        </Page>
      </Document>
    </>
  );
}
```

---

## Print CSS Reference

Key classes and behaviors defined in `/src/styles/document-print.css`:

### Page Setup

```css
@page {
  size: letter;  /* or A4 for .paper-a4 */
  margin: 0;     /* Margins handled internally */
}
```

### Color Preservation

```css
* {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
```

### Page Break Rules

- Pages: `page-break-after: always` (except last)
- Callouts: `page-break-inside: avoid`
- Headings: `page-break-after: avoid`
- Signature blocks: `page-break-inside: avoid`
- Lists: `page-break-inside: avoid`

### Orphans and Widows

```css
p, li, h1, h2, h3, h4 {
  orphans: 3;
  widows: 3;
}
```

---

**Complete API documentation for the DocumentPreviewFrame system**
