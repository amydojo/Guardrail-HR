# Document Preview Frame System

Complete React-based document system for legal templates with production-ready print CSS, standardized layouts, and export capabilities.

## 🎯 Overview

The Document Preview Frame system provides a comprehensive solution for creating, previewing, and exporting legal documents with:

- **US Letter & A4 support** with proper dimensions and margins
- **1-inch margins** on all sides with standardized header/footer placement
- **Theme-aware styling** with automatic light/dark mode adaptation
- **Print-optimized CSS** with proper page breaks and margin preservation
- **Reusable primitives** for consistent document structure
- **Export stubs** for PDF, DOCX, and Google Docs

## 📁 File Structure

```
/src/app/components/document-system/
├── types.ts                              # TypeScript type definitions
├── DocumentPreviewFrame.tsx              # Main page frame with margins
├── DocumentPrimitives.tsx                # Reusable document components
├── DocumentDownloadActions.tsx           # Export buttons and flows
├── DemoMealRestBreakPolicy.tsx          # Demo: 3-page meal break policy
├── DemoTimekeepingPolicy.tsx            # Demo: 3-page timekeeping policy
├── DemoIndependentContractorAgreement.tsx # Demo: 3-page contractor agreement
└── index.ts                              # Barrel exports

/src/styles/
└── document-print.css                    # Print-specific CSS rules

/src/app/pages/
└── DocumentSystemDemo.tsx                # Demo page at /document-system-demo
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { Document, Page, DocTitle, H1, Body } from '@/app/components/document-system';

const metadata = {
  title: 'My Document',
  docId: 'DOC-001',
  version: 'v1.0',
  jurisdiction: 'California',
  reviewedDate: 'January 2026',
  totalPages: 1,
};

export function MyDocument() {
  return (
    <Document metadata={metadata}>
      <Page>
        <DocTitle>My Document Title</DocTitle>
        <H1>1. Introduction</H1>
        <Body>This is the document content...</Body>
      </Page>
    </Document>
  );
}
```

### With Download Actions

```tsx
import { DocumentDownloadActions } from '@/app/components/document-system';

<DocumentDownloadActions
  metadata={{
    title: 'Employee Handbook',
    docId: 'GR-HR-001',
    version: 'v2.0',
    jurisdiction: 'California',
    reviewedDate: 'January 2026',
    totalPages: 10,
  }}
/>
```

## 📐 Layout Specifications

### Page Dimensions

- **US Letter**: 8.5 × 11 inches (816 × 1056 px @ 96dpi)
- **A4**: 210 × 297 mm (794 × 1123 px @ 96dpi)

### Margins

- **All sides**: 1 inch (72px @ 96dpi)
- **Content area (US Letter)**: 6.5 × 9 inches
- **Content area (A4)**: 165 × 247 mm

### Header Layout

```
Left: "Guardrail HR"
Right: "DOC-ID • Version"
Height: 48px top padding + 12px bottom padding
```

### Footer Layout

```
Left: "Reviewed Month YYYY"
Right: "Page X of Y"
Height: 12px top padding + 48px bottom padding
```

## 🎨 Document Primitives

### Typography Components

```tsx
<DocTitle>Document Title</DocTitle>           // 24pt, weight 600, -0.02em tracking
<H1>1. Major Section</H1>                      // 18pt, weight 600, -0.015em tracking
<H2>1.1 Subsection</H2>                        // 14pt, weight 600, -0.01em tracking
<H3>Minor Heading</H3>                         // 12pt, weight 600
<Body>Paragraph text...</Body>                 // 11.5pt, weight 400, 1.5 line height
<Meta>SMALL CAPS LABEL</Meta>                  // 9pt, uppercase, 0.01em tracking
```

### Layout Components

```tsx
// Field pairs with placeholder tokens
<FieldPairComponent 
  label="Company Name" 
  value="[COMPANY_NAME]" 
  placeholder="[COMPANY_NAME]" 
/>

// Callout boxes
<Callout 
  title="Important" 
  content="This is an important notice." 
  variant="important" // 'info' | 'warning' | 'important'
/>

// Checklist items
<ChecklistItem>
  Schedule work to allow employees to take all required breaks
</ChecklistItem>

// Signature blocks (no tables, lines only)
<SignatureBlock
  lines={[
    { label: 'Employee Signature', name: '[EMPLOYEE_NAME]' },
    { label: 'Manager Signature', name: '[MANAGER_NAME]' },
  ]}
/>

// Lists
<OrderedList>
  <li>First item</li>
  <li>Second item</li>
</OrderedList>

<UnorderedList>
  <li>Bullet point</li>
  <li>Another point</li>
</UnorderedList>

// Field groups
<FieldGroup title="Company Information">
  <FieldPairComponent label="Name" value="..." />
  <FieldPairComponent label="Address" value="..." />
</FieldGroup>

// Cover page pills
<CoverPills items={['California', 'v2.1', 'Policy', 'Jan 2026']} />

// Dividers
<Divider />

// Spacing
<Spacer size="md" /> // 'sm' | 'md' | 'lg' | 'xl'
```

## 🖨️ Print CSS Features

### Automatic Page Breaks

```tsx
// Pages automatically break
<Document metadata={metadata}>
  <Page>{/* Page 1 content */}</Page>
  <Page>{/* Page 2 content */}</Page>
  <Page>{/* Page 3 content */}</Page>
</Document>
```

### Page Break Controls

```tsx
// Prevent element from breaking across pages
<div className="break-inside-avoid">
  {/* Content stays together */}
</div>

// Force page break before element
<div className="break-before">
  {/* Starts on new page */}
</div>

// Force page break after element
<div className="break-after">
  {/* Next content starts on new page */}
</div>
```

### Print Optimization

- ✅ Headers and footers on every page
- ✅ Proper 1-inch margins preserved
- ✅ Colors and backgrounds printed correctly
- ✅ Callouts maintain styling in print
- ✅ Signature lines render properly
- ✅ No widows or orphans (3+ lines)
- ✅ Headings don't break from following content

## 📥 Export System

### PDF Export (Stub)

```tsx
const handleDownloadPDF = async () => {
  // Production: Call PDF generation service
  // Example: await generatePDF(documentData)
  
  console.log('PDF generation would start here');
};
```

### DOCX Export (Stub)

```tsx
const handleDownloadDOCX = async () => {
  // Production: Call DOCX generation service
  // Example: await generateDOCX(documentData)
  
  console.log('DOCX generation would start here');
};
```

### Google Docs Copy (Stub)

```tsx
const handleCopyToGoogleDocs = async () => {
  // Production: Use Google Docs API
  // Example: await copyToGoogleDocs(documentData)
  
  console.log('Google Docs copy would start here');
};
```

## 🎯 Demo Templates

Three production-ready templates with realistic 3-page content:

### 1. Meal & Rest Break Policy
- **Doc ID**: GR-WH-001 • v2.1
- **Jurisdiction**: California
- **Pages**: 3
- **Content**: Policy statement, meal/rest break requirements, manager responsibilities, waivers, acknowledgment

### 2. Timekeeping Policy
- **Doc ID**: GR-WH-002 • v1.8
- **Jurisdiction**: CA + Federal
- **Pages**: 3
- **Content**: Purpose, recording requirements, meal/rest break recording, off-the-clock work prohibition, acknowledgment

### 3. Independent Contractor Agreement
- **Doc ID**: GR-IC-001 • v1.3
- **Jurisdiction**: California (ABC Test)
- **Pages**: 3
- **Content**: Recitals, scope of work, ABC test compliance, compensation, term and termination, signatures

## 🎨 Theme Support

All components automatically adapt to light and dark themes:

```tsx
// Light mode
background: #fafafa
text: #1a1a1a
borders: #e5e5e5
shadows: subtle (--shadow-1, --shadow-2)

// Dark mode
background: #0f0f0f
text: #f5f5f5
borders: #2d2d2d
shadows: reduced, border-focused
```

### Print Mode

In print, all colors revert to light mode equivalents for optimal printing:

```css
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```

## 🔧 Type Definitions

### DocumentMetadata

```typescript
interface DocumentMetadata {
  title: string;           // "Meal & Rest Break Policy"
  docId: string;           // "GR-WH-001"
  version: string;         // "v2.1"
  jurisdiction: string;    // "California"
  reviewedDate: string;    // "January 2026"
  totalPages: number;      // 3
}
```

### FieldPair

```typescript
interface FieldPair {
  label: string;           // "Company Name"
  value: string;           // "Acme Corp"
  placeholder?: string;    // "[COMPANY_NAME]"
}
```

### SignatureLine

```typescript
interface SignatureLine {
  label: string;           // "Employee Signature"
  name?: string;           // "[EMPLOYEE_NAME]"
}
```

### CalloutContent

```typescript
interface CalloutContent {
  title?: string;          // "Important"
  content: string | React.ReactNode;
  variant?: 'info' | 'warning' | 'important';
}
```

## 🚀 Demo Page

Visit `/document-system-demo` to see:

- All three demo templates with full content
- Paper size switcher (US Letter / A4)
- Download actions (Print, PDF, DOCX, Google Docs)
- Template selector
- Live preview with theme support

## 📋 Implementation Checklist

When creating a new template:

- [ ] Import Document, Page, and primitives from `/document-system`
- [ ] Define metadata with all required fields
- [ ] Use proper typography hierarchy (DocTitle, H1, H2, Body)
- [ ] Add field pairs with bracket token placeholders
- [ ] Include callouts for important notices
- [ ] Use signature blocks (not tables) for attestations
- [ ] Add break-inside-avoid to elements that should stay together
- [ ] Test print preview (Cmd/Ctrl + P)
- [ ] Verify all pages have headers and footers
- [ ] Check that margins are correct (1 inch all sides)

## 🎓 Best Practices

1. **Use semantic primitives**: Don't use raw HTML tags; use the provided primitives
2. **Token placeholders**: Always use bracket tokens like `[COMPANY_NAME]` for customizable fields
3. **Page breaks**: Let pages break naturally; add `break-inside-avoid` only when needed
4. **Callout usage**: Use sparingly for truly important information
5. **Signature blocks**: Never use tables; always use the SignatureBlock component
6. **Lists**: Use OrderedList or UnorderedList components, not raw `<ol>` or `<ul>`
7. **Spacing**: Use Spacer component for explicit spacing; don't rely on margins
8. **Theme awareness**: Never hardcode colors; use theme tokens

## 🐛 Troubleshooting

### Issue: Page breaks in wrong places

**Solution**: Add `break-inside-avoid` class to the parent container:

```tsx
<div className="break-inside-avoid">
  {/* Content that should stay together */}
</div>
```

### Issue: Headers/footers not showing in print

**Solution**: Ensure you're using the `Document` and `Page` components correctly:

```tsx
<Document metadata={metadata}>
  <Page>{/* Content */}</Page>
</Document>
```

### Issue: Colors not printing

**Solution**: The print CSS includes `print-color-adjust: exact`. Ensure you're not overriding this.

### Issue: Margins incorrect in print

**Solution**: Don't add padding/margin to Page components. Use the provided spacing within content area.

## 📚 Additional Resources

- **Spec Page**: `/templates/preview` → "Spec + Mockups" tab
- **Typography Scale**: See TemplateSpecPage.tsx for complete token list
- **Print CSS**: `/src/styles/document-print.css`
- **Demo Templates**: `/src/app/components/document-system/Demo*.tsx`

## 🔮 Future Enhancements

Potential improvements for production use:

1. **Real PDF Generation**: Integrate with service like Puppeteer or PDFKit
2. **DOCX Generation**: Use library like `docx` or cloud service
3. **Google Docs API**: Implement real Google Docs creation
4. **Template Customization UI**: Form-based field replacement
5. **Version Control**: Track document revisions and changes
6. **Digital Signatures**: Integrate with DocuSign or similar
7. **Collaborative Editing**: Real-time document collaboration
8. **Template Marketplace**: Library of additional templates

---

**Built with Apple/Linear-caliber polish • Theme-aware • Print-optimized • Production-ready**
