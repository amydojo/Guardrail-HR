# Guardrail HR Templates — Design Specification
**Version 1.0 • January 2026**

---

## Overview

This specification defines the design system for Guardrail HR's downloadable legal templates. The system prioritizes credibility, precision, and premium print aesthetics while maintaining brand consistency with the Guardrail HR web application.

**Design Principles:**
- **Credible** — Feels like a paid legal product, not a Canva template
- **Minimal** — High whitespace, precise alignment, restrained chrome
- **Legible** — Optimized for print and screen reading
- **Versioned** — Clear version tracking and change management

---

## Typography Scale

**Font Stack:** System font stack (Inter-equivalent)
```
font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
```

### Document Typography

| Element | Size | Weight | Line Height | Tracking | Usage |
|---------|------|--------|-------------|----------|-------|
| **Doc Title** | 24pt | 600 | 1.2 | -0.02em | Cover page title |
| **H1** | 18pt | 600 | 1.3 | -0.015em | Major section headers |
| **H2** | 14pt | 600 | 1.4 | -0.01em | Subsection headers |
| **H3** | 12pt | 600 | 1.4 | 0 | Minor headers |
| **Body** | 11pt | 400 | 1.65 | 0 | Paragraph text |
| **Meta** | 9pt | 400 | 1.5 | 0.01em | Dates, versions, footnotes |
| **Label** | 10pt | 500 | 1.4 | 0.005em | Field labels |

**Color (Light Mode):**
- Title/Headers: `#1a1a1a` (near black)
- Body: `#2d2d2d` (dark gray)
- Meta: `#737373` (mid gray)
- Accent (micro use only): `#5b6ff5` (Guardrail blue)

**Color (Dark Mode):**
- Title/Headers: `#f5f5f5`
- Body: `#e0e0e0`
- Meta: `#a3a3a3`

---

## Spacing System (8px Grid)

**Vertical Rhythm:**
- Section spacing: 32px (4 grid units)
- Subsection spacing: 24px (3 grid units)
- Paragraph spacing: 16px (2 grid units)
- Line item spacing: 12px (1.5 grid units)
- Tight spacing: 8px (1 grid unit)

**Margins:**
- Page margins: 1 inch (72pt / 96px) all sides
- Content width: US Letter = 6.5", A4 = 6.5"

**Indentation:**
- List indent: 24px
- Nested indent: 16px increments
- Field indent: 0px (flush left)

---

## Page Formats

### US Letter
- Dimensions: 8.5" × 11" (816px × 1056px @ 96 DPI)
- Margins: 1" all sides
- Content area: 6.5" × 9" (624px × 864px)

### A4
- Dimensions: 8.27" × 11.69" (794px × 1123px @ 96 DPI)
- Margins: 1" all sides
- Content area: 6.27" × 9.69" (602px × 931px)

---

## Document Components

### 1. Document Header (appears on every page)

**Layout:** Full width, top of page, 48px height, subtle border bottom

**Content:**
```
[LEFT]                           [RIGHT]
Guardrail HR                     Page X of Y
```

**Styling:**
- Font: 9pt, weight 400
- Text color: `#737373` (meta color)
- Border: 0.5pt solid `#e5e5e5`
- Padding: 12px vertical

---

### 2. Document Footer (appears on every page)

**Layout:** Full width, bottom of page, 40px height, subtle border top

**Content:**
```
[LEFT]                                           [RIGHT]
Document Title • Version X.X                     Reviewed [Month Year]
```

**Styling:**
- Font: 9pt, weight 400
- Text color: `#737373`
- Border: 0.5pt solid `#e5e5e5`
- Padding: 10px vertical

---

### 3. Cover Page Layout

**Structure:**
1. Header band (as above)
2. Document title (24pt, centered, 120px from top)
3. Metadata block (centered, 24px below title):
   - Jurisdiction
   - Version number
   - Reviewed date
   - Document type
4. Footer band (as above)

**Metadata Styling:**
- Pills: 10pt, weight 500, gray background `#f5f5f5`, border `#e5e5e5`, 8px padding, 6px radius
- Spacing: 8px gap between pills

---

### 4. Section Header

**Styling:**
- H1: 18pt, weight 600, 32px spacing above (first section: 48px from top)
- Optional rule: 0.5pt line below, color `#e5e5e5`, 8px margin below

---

### 5. Callout Box

**Use:** Important notes, disclaimers, legal notices

**Styling:**
- Background: `#f9fafb` (light gray)
- Border: 1pt solid `#e5e5e5`
- Radius: 8px
- Padding: 16px
- Font: 10pt, weight 400, line-height 1.6
- Margin: 16px vertical

**Prefix:** Optional icon or label (e.g., "Note:", "Important:")

---

### 6. Editable Field Row

**Use:** Fields user customizes (company name, dates, etc.)

**Format:**
```
[Label]:  [{{TOKEN_NAME}}]
```

**Styling:**
- Label: 10pt, weight 500, color `#2d2d2d`
- Token: 11pt, weight 400, color `#5b6ff5` (accent), monospace feel
- Token format: `{{COMPANY_NAME}}`, `{{EFFECTIVE_DATE}}`, etc.
- Vertical spacing: 12px between rows
- Colon spacing: 8px gap before token

**Example:**
```
Company Name:  {{COMPANY_NAME}}
Effective Date:  {{EFFECTIVE_DATE}}
Policy Owner:  {{POLICY_OWNER_NAME}}
```

---

### 7. Checkbox Row

**Use:** Acknowledgment sections, compliance checklists

**Format:**
```
☐  Checkbox label text here with proper line wrapping
```

**Styling:**
- Checkbox: 12pt Unicode ☐ (`U+2610`), color `#737373`
- Label: 11pt, weight 400, line-height 1.65
- Indent: 24px from checkbox to text
- Vertical spacing: 12px between items

---

### 8. Signature Block

**Use:** Final page, attestation, acknowledgment

**Layout:**
```
Employee Signature: _________________________________    Date: ____________

Printed Name: {{EMPLOYEE_NAME}}

Supervisor Signature: _______________________________    Date: ____________

Printed Name: {{SUPERVISOR_NAME}}
```

**Styling:**
- Labels: 10pt, weight 500
- Lines: 1pt solid `#d4d4d4`, 240px width (signature), 96px width (date)
- Vertical spacing: 24px between signature pairs
- Horizontal spacing: 32px between signature and date

---

### 9. Version History Table

**Use:** Final page, change log, revision tracking

**Layout:**
```
Version History

Version    Date              Changes
2.1        January 2026      • Clarified break attestation language
                             • Updated formatting for readability
2.0        November 2025     • Restructured sections for compliance
                             • Added federal guidelines
1.0        September 2025    • Initial release
```

**Styling:**
- Table header: 10pt, weight 600, border-bottom 1pt solid `#d4d4d4`, 8px padding-bottom
- Table rows: 10pt, weight 400, 12px vertical padding
- Version column: 64px width, weight 500
- Date column: 120px width
- Changes column: Bullet list, 10pt, line-height 1.6
- Border between rows: 0.5pt solid `#f0f0f0`

---

### 10. Numbered List Rules

**Format:**
```
1.  First item with proper indentation
    a.  Nested item follows alphabet convention
    b.  Second nested item
2.  Second top-level item continues
```

**Styling:**
- Top level: 11pt, weight 400, line-height 1.65
- Number format: `1.` (period-space), weight 600
- Indent: 24px
- Nested: Same font size, weight 400
- Nested format: `a.` (letter-period-space)
- Nested indent: +16px
- Vertical spacing: 12px between items, 8px between nested

---

### 11. Bulleted List Rules

**Format:**
```
•  First bullet item
•  Second bullet item
   - Nested bullet (en dash)
   - Second nested bullet
•  Third top-level item
```

**Styling:**
- Bullet: `•` (U+2022), color `#2d2d2d`, 11pt
- Text: 11pt, weight 400, line-height 1.65
- Indent: 24px
- Nested bullet: `–` (en dash, U+2013)
- Nested indent: +16px
- Vertical spacing: 12px between items, 8px between nested

---

## Token Placeholder System

**Purpose:** Clearly mark customizable fields users must replace

**Token Format:**
- Wrap in double braces: `{{TOKEN_NAME}}`
- ALL_CAPS_SNAKE_CASE naming
- Color: Guardrail blue `#5b6ff5`
- Font: Same as surrounding text, maintain readability

**Common Tokens:**
```
{{COMPANY_NAME}}
{{COMPANY_ADDRESS}}
{{EFFECTIVE_DATE}}
{{POLICY_OWNER_NAME}}
{{POLICY_OWNER_TITLE}}
{{EMPLOYEE_NAME}}
{{EMPLOYEE_ID}}
{{SUPERVISOR_NAME}}
{{DEPARTMENT}}
{{LAST_UPDATED_DATE}}
{{VERSION_NUMBER}}
{{JURISDICTION}}
```

**Inline Example:**
```
This policy applies to all employees of {{COMPANY_NAME}} 
located in {{JURISDICTION}} as of {{EFFECTIVE_DATE}}.
```

---

## Shadow & Border System

### Light Mode
- **Primary border:** 1pt solid `#e5e5e5`
- **Subtle border:** 0.5pt solid `#f0f0f0`
- **Shadow (minimal use):** `0 1px 3px rgba(0,0,0,0.06)`
- **Shadow (cards/callouts):** `0 1px 2px rgba(0,0,0,0.04)`

**Rules:**
- Prefer borders over shadows
- Shadows only for elevation/depth, not decoration
- No drop shadows on text

### Dark Mode
- **Primary border:** 1pt solid `#2d2d2d`
- **Subtle border:** 0.5pt solid `#262626`
- **Glass effect (optional):** `backdrop-filter: blur(12px)`, subtle inner border
- **Shadow (glass cards):** `0 2px 8px rgba(0,0,0,0.3)`

---

## Color Palette

### Core Colors (Light Mode)
```
Background:    #ffffff
Surface:       #fafafa
Border-1:      #e5e5e5
Border-2:      #f0f0f0
Text-1:        #1a1a1a
Text-2:        #2d2d2d
Text-3:        #737373
Accent:        #5b6ff5
```

### Core Colors (Dark Mode)
```
Background:    #0f0f0f
Surface:       #1a1a1a
Border-1:      #2d2d2d
Border-2:      #262626
Text-1:        #f5f5f5
Text-2:        #e0e0e0
Text-3:        #a3a3a3
Accent:        #7b8fff
```

### Accent Usage Rules
- **Allowed:** Tokens, interactive links, micro elements
- **Not allowed:** Headers, body text, backgrounds (except hover states)

---

## Template-Specific Specs

### Template: Meal & Rest Break Policy (CA)
- **Jurisdiction:** California
- **Page count:** 3 pages
- **Sections:** Policy statement, timing requirements, meal breaks, rest breaks, waiver conditions, acknowledgment
- **Special components:** Checkbox list for break scenarios, signature block

### Template: Timekeeping Policy (CA + Federal)
- **Jurisdiction:** CA + Federal
- **Page count:** 3 pages
- **Sections:** Purpose, scope, time recording requirements, approval process, corrections, violations, record retention
- **Special components:** Editable field rows for system details, callout for legal requirements

### Template: Independent Contractor Agreement (CA)
- **Jurisdiction:** California
- **Page count:** 3 pages
- **Sections:** Parties, services, compensation, relationship, ABC test compliance, term, termination, signatures
- **Special components:** Signature block with dual parties, legal disclaimer callout, version history table

---

## Print CSS Requirements

### Page Setup
```css
@media print {
  @page {
    size: letter; /* or A4 */
    margin: 1in;
  }
  
  /* Prevent breaks inside */
  .section-header,
  .callout-box,
  .signature-block,
  .field-row {
    page-break-inside: avoid;
  }
  
  /* Ensure headers stay with content */
  h1, h2, h3 {
    page-break-after: avoid;
  }
}
```

### Color Management
- All borders and text render as black/gray in print
- Accent color tokens render as underlined text or bold
- Maintain contrast ratios for accessibility

---

## Implementation Notes

1. **PDF Export:** Templates must export cleanly to PDF with proper fonts embedded
2. **DOCX Compatibility:** Layout must survive conversion to Word format
3. **Accessibility:** WCAG AA contrast ratios minimum
4. **Versioning:** Every template includes version number in header and footer
5. **Legal Disclaimer:** Every template includes "Not legal advice" disclaimer on final page

---

## Figma Frame Specs (for designers)

### Spec Page Frame
- **Size:** 1920 × 3840px (allows scrolling)
- **Sections:** Typography scale, spacing grid, all components as examples, margin guides

### Template Frame (each)
- **Size:** 816 × 1056px (US Letter @ 96 DPI)
- **Pages:** 3 artboards per template, labeled "Page 1", "Page 2", "Page 3"
- **Guides:** 96px margins (1 inch), content grid 8px

---

**End of Specification**
