# Guardrail HR Template Export - Testing Checklist

## Test Environment Setup

Before testing, ensure you have:
- Microsoft Word for Mac installed
- Google Docs access via browser
- A template open in the customize view with fields filled in

## Test Data

Use these values to test Unicode support:
- Company Name: `José & Müller GmbH 株式会社 🚀`
- Effective Date: `January 15, 2026`
- Policy Owner: `Françoise Müller`
- Other text fields: Include em dashes `—`, curly quotes `"example"`, and accented characters `café`

---

## ACCEPTANCE TEST A: DOCX Unicode Support

**Objective:** Verify DOCX files open in Microsoft Word without corruption or recovery prompts.

### Steps:
1. Fill in template fields with Unicode test data (see above)
2. Click "Download DOCX" button
3. Open the downloaded `.docx` file in Microsoft Word for Mac
4. Observe the file opening process

### Expected Results:
✅ File opens immediately without any recovery prompt
✅ No "Word found unreadable content" warning
✅ All Unicode characters (José, Müller, 株式会社, emoji) render correctly
✅ Em dashes `—` and curly quotes `""` display properly
✅ File structure is intact (headings, lists, formatting preserved)

### Status: [ ]

---

## ACCEPTANCE TEST B: PDF Token Population

**Objective:** Ensure exported PDFs show populated values, not raw `{{TOKEN}}` placeholders.

### Steps:
1. Fill in all template fields with test data
2. Click "Print PDF" button
3. In print dialog, save as PDF or print to PDF
4. Open the resulting PDF file
5. Search for the string `{{` or `[[` in the PDF

### Expected Results:
✅ Company name appears as "José & Müller GmbH 株式会社 🚀" (not `{{COMPANY_NAME}}`)
✅ Effective date appears as "January 15, 2026" (not `{{EFFECTIVE_DATE}}`)
✅ Policy owner appears as "Françoise Müller" (not `{{POLICY_OWNER_NAME}}`)
✅ NO instances of `{{` or `[[` found in PDF content
✅ All inline tokens in paragraphs are replaced (e.g., "José & Müller GmbH 株式会社 🚀 is committed to...")

### Status: [ ]

---

## ACCEPTANCE TEST C: Section Header Spacing

**Objective:** Verify section headers have proper spacing between number and title.

### Steps:
1. Export template as PDF
2. Locate section headers with numbers (e.g., "1. Policy Statement", "2. Meal Break Requirements")
3. Examine spacing between number and title

### Expected Results:
✅ Headers render as "1 Policy Statement" or "1. Policy Statement" with visible space
✅ NOT "1Policy Statement" (no space)
✅ Spacing is consistent across all numbered headers
✅ Sub-headers like "2.1 General Rules" also have proper spacing

### Status: [ ]

---

## ACCEPTANCE TEST D: WYSIWYG Export Consistency

**Objective:** Ensure exports match the preview (What You See Is What You Get).

### Steps:
1. Fill in template fields
2. Review the preview in the browser
3. Note the formatting, spacing, and content
4. Export as PDF
5. Export as DOCX
6. Compare both exports to the browser preview

### Expected Results:
✅ PDF matches preview layout and content
✅ DOCX matches preview content (layout may differ slightly due to Word's rendering)
✅ All populated values in preview appear in both exports
✅ Section headers, paragraphs, lists, and callouts maintain structure
✅ No content is missing or duplicated

### Status: [ ]

---

## VALIDATION TEST: Missing Fields

**Objective:** Verify that exports are blocked when required fields are empty.

### Steps:
1. Leave some required fields empty (e.g., Company Name blank)
2. Attempt to export as PDF
3. Attempt to export as DOCX

### Expected Results:
✅ Export is blocked with clear error message
✅ Error message lists the specific missing fields (e.g., "Cannot export: The following fields are missing values: COMPANY_NAME, EFFECTIVE_DATE")
✅ User is prompted to fill in all required fields before exporting

### Status: [ ]

---

## ADDITIONAL CHECKS

### PDF Print Quality
- [ ] Page breaks are clean (no cut-off content)
- [ ] Headers and footers appear on each page
- [ ] Page numbers are sequential
- [ ] Margins are consistent (0.75" top/bottom, 1" left/right)

### DOCX Quality
- [ ] File opens in Google Docs without errors
- [ ] Headings are recognized as heading styles (H1, H2, H3)
- [ ] Lists maintain formatting (bullets, numbering)
- [ ] Bold and italic formatting preserved

### Live Preview
- [ ] Token values appear in preview immediately after filling form
- [ ] Preview updates in real-time as fields are edited
- [ ] Empty fields show placeholder text like `[[COMPANY_NAME]]`
- [ ] No raw `{{TOKEN}}` syntax visible in preview

---

## Known Limitations

- DOCX export converts HTML to DOCX structure, so some advanced CSS styling may not transfer
- Complex layouts (multi-column, etc.) may render differently in Word
- Custom fonts may fall back to system fonts in Word
- Print preview in browser may differ from final PDF depending on browser

---

## Troubleshooting

### If DOCX shows recovery prompt:
- Check that `docx` library is properly installed
- Verify no `btoa()` or data URI usage in exportToDocx.ts
- Ensure `Packer.toBlob()` is being used, not data URI

### If PDF shows `{{TOKEN}}`:
- Verify Token component is using `useTokenValue()` hook
- Check that TemplatePreviewWrapper is providing TokenContext
- Ensure validation is catching unreplaced tokens before export

### If section headers lack spacing:
- Check SectionHeader component has `{' '}` between number and title
- Verify CSS has `.template-section-header__number { margin-right: 0.25em; }`
- Inspect renderTemplateToHtml.ts for inline styles

---

## Sign-off

- [ ] All acceptance tests (A-D) passed
- [ ] Validation test passed
- [ ] Additional checks completed
- [ ] No console errors during export
- [ ] Ready for production deployment

**Tester Name:** _________________
**Date:** _________________
**Notes:** _________________
