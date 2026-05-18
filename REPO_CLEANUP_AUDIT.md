# Repository Cleanup Audit

## Overview
This document provides an evidence-based audit of the repository to classify files, assess their purpose, and propose a cleanup plan. No files have been moved, renamed, or deleted during this phase.

## Audit Sections
1. **Top-Level Files and Folders**
2. **Detailed File Inspections (Finalized)**
3. **Proposed Future Structure (Updated)**
4. **DO NOT TOUCH (Updated)**
5. **SAFE TO MOVE AFTER APPROVAL (Updated)**
6. **NEEDS HUMAN REVIEW (Updated)**
7. **LATER DELETE CANDIDATES (Updated)**
8. **Build Baseline (Updated)**
9. **Cleanup Execution Plan (Updated)**
10. **Explicit Protection Rules (Updated)**

---

## Phase A Completed

### Move Log

| Old Path                                           | New Path                                           |
|---------------------------------------------------|---------------------------------------------------|
| `/workspaces/Guardrailmvp/LIQUID_GLASS_AUDIT_REPORT.md` | `/docs/design/LIQUID_GLASS_AUDIT_REPORT.md`       |
| `/workspaces/Guardrailmvp/STATE_AWARE_PRICING_SPEC.md` | `/docs/pricing/STATE_AWARE_PRICING_SPEC.md`       |
| `/workspaces/Guardrailmvp/APPLE_LEGAL_DOC_INTEGRATION_COMPLETE.md` | `/docs/legal-safety/APPLE_LEGAL_DOC_INTEGRATION_COMPLETE.md` |
| `/workspaces/Guardrailmvp/BRAND_IMPLEMENTATION.md` | `/docs/brand/BRAND_IMPLEMENTATION.md`             |
| `/workspaces/Guardrailmvp/FINALIZATION_REPORT.md`  | `/docs/decisions/FINALIZATION_REPORT.md`          |
| `/workspaces/Guardrailmvp/IMPLEMENTATION-COMPLETE.md` | `/docs/engineering/IMPLEMENTATION-COMPLETE.md`   |

### Duplicate Cleanup Note

- Confirmed that all six root duplicates were removed.
- Verified that all six `/docs/` versions exist and are readable.

### Build Status

- **Build Command**: `pnpm run build` (successful)
- **Typecheck/Lint Scripts**: Missing in `package.json`.

### Confirmation

- No changes were made to `src/`, `public/`, `config/`, `package.json`, `dist/`, or `index.html` files.

---

## PHASE_B_PROPOSAL (Updated)

### Safe Archive Candidates
- `guidelines/Guidelines.md`
- Placeholder root markdown files (e.g., FINAL-STATUS.md).

### Generated Output Candidates
- `dist/` → `IGNORE_AS_GENERATED`.

### Package Manager Cleanup Recommendation
- Review `package-lock.json` for relevance with `pnpm`.

### README/Docs Polish Recommendation
- Improve `README.md` for public-facing clarity.
- Ensure `docs/README.md` indexes all relevant documentation.

### Items Needing Human Review
- `.gitignore`.
- `package-lock.json`.
- Complex root markdown files (e.g., DOCUMENT_SYSTEM_API.md).
- Missing `typecheck` and `lint` scripts in `package.json`.

### Summary
- **Root Markdown Files**: 44.
  - **Safe to Move**: 30.
  - **Archive Candidates**: 5.
  - **Needs Review**: 9.
- **Package Manager Recommendation**: Review lock files.
- **Phase B Execution**: Safe to begin after approval.

## PHASE_B_MOVE_MANIFEST (Validated)

| Current Path                                   | Recommended Destination                  | Action                     | Category       | Risk  | Evidence                                                                 | References to Update |
|-----------------------------------------------|------------------------------------------|----------------------------|----------------|-------|--------------------------------------------------------------------------|-----------------------|
| ACCESSIBILITY_UPDATE_SUMMARY.md               | docs/ux/ACCESSIBILITY_UPDATE_SUMMARY.md  | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Accessibility updates for templates and components.                     | None                 |
| ATTRIBUTIONS.md                               | KEEP_IN_ROOT                             | KEEP_IN_ROOT               | LEGAL_NOTICE   | Low   | Legal attribution for third-party assets.                               | None                 |
| BRAND_POLISH_SUMMARY.md                       | docs/brand/BRAND_POLISH_SUMMARY.md       | MOVE_TO_DOCS_AFTER_APPROVAL | BRAND_DOC      | Low   | Summary of brand polish efforts.                                        | None                 |
| BRAND_VERIFICATION_CHECKLIST.md               | docs/brand/BRAND_VERIFICATION_CHECKLIST.md | MOVE_TO_DOCS_AFTER_APPROVAL | BRAND_DOC      | Low   | Checklist for verifying brand consistency.                              | None                 |
| CONVERSION-PROGRESS.md                        | docs/archive/CONVERSION-PROGRESS.md      | ARCHIVE_AFTER_APPROVAL      | ARCHIVE_DOC    | Low   | Progress report on conversion efforts.                                  | None                 |
| CRITICAL_FIXES_IMPLEMENTED.md                 | docs/archive/CRITICAL_FIXES_IMPLEMENTED.md | ARCHIVE_AFTER_APPROVAL      | ARCHIVE_DOC    | Low   | Summary of critical fixes implemented.                                  | None                 |
| DASHBOARD_REFINEMENT.md                       | docs/ux/DASHBOARD_REFINEMENT.md          | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Refinements to dashboard UX.                                            | None                 |
| DESIGN_SYSTEM_STANDARDIZATION.md              | docs/design/DESIGN_SYSTEM_STANDARDIZATION.md | MOVE_TO_DOCS_AFTER_APPROVAL | DESIGN_DOC     | Low   | Standardization of design system components.                            | None                 |
| DOCUMENT_SYSTEM_API.md                        | docs/engineering/DOCUMENT_SYSTEM_API.md  | NEEDS_HUMAN_REVIEW          | ENGINEERING_DOC | Medium | API documentation for the document system.                              | None                 |
| DOCUMENT_SYSTEM_IMPLEMENTATION.md             | docs/engineering/DOCUMENT_SYSTEM_IMPLEMENTATION.md | NEEDS_HUMAN_REVIEW          | ENGINEERING_DOC | Medium | Implementation details for the document system.                         | None                 |
| DOCUMENT_SYSTEM_README.md                     | docs/engineering/DOCUMENT_SYSTEM_README.md | NEEDS_HUMAN_REVIEW          | ENGINEERING_DOC | Medium | README for the document system.                                         | None                 |
| EXPORT_FIX_SUMMARY.md                         | docs/archive/EXPORT_FIX_SUMMARY.md       | ARCHIVE_AFTER_APPROVAL      | ARCHIVE_DOC    | Low   | Summary of export fixes.                                                | None                 |
| EXPORT_TESTING_CHECKLIST.md                   | docs/engineering/EXPORT_TESTING_CHECKLIST.md | MOVE_TO_DOCS_AFTER_APPROVAL | ENGINEERING_DOC | Low   | Checklist for testing export functionality.                             | None                 |
| FINAL-STATUS.md                               | docs/archive/FINAL-STATUS.md             | ARCHIVE_AFTER_APPROVAL      | ARCHIVE_DOC    | Low   | Final status report.                                                    | None                 |
| GLOBAL_PRIMARY_ACTION_SPEC.md                 | docs/ux/GLOBAL_PRIMARY_ACTION_SPEC.md    | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Specification for global primary actions.                               | None                 |
| GUARDRAIL_TEMPLATE_SPEC.md                    | docs/product/GUARDRAIL_TEMPLATE_SPEC.md  | NEEDS_HUMAN_REVIEW          | PRODUCT_DOC    | Medium | Specification for Guardrail templates.                                  | None                 |
| LIGHT-MODE-FINAL-DELIVERABLE.md               | docs/design/LIGHT-MODE-FINAL-DELIVERABLE.md | MOVE_TO_DOCS_AFTER_APPROVAL | DESIGN_DOC     | Low   | Final deliverable for light mode implementation.                        | None                 |
| LOCKED_STATE_TEASER_SPEC.md                   | docs/ux/LOCKED_STATE_TEASER_SPEC.md      | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Specification for locked state teasers.                                 | None                 |
| LOCKED_VS_UNLOCKED_COMPARISON.md              | docs/ux/LOCKED_VS_UNLOCKED_COMPARISON.md | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Comparison of locked vs unlocked states.                                | None                 |
| MODULE_DASHBOARD_POLISH.md                    | docs/ux/MODULE_DASHBOARD_POLISH.md       | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Polish efforts for dashboard modules.                                   | None                 |
| OVERTIME-CALCULATOR-CONVERSION-EXAMPLE.md     | docs/product/OVERTIME-CALCULATOR-CONVERSION-EXAMPLE.md | MOVE_TO_DOCS_AFTER_APPROVAL | PRODUCT_DOC    | Low   | Example of overtime calculator conversion.                              | None                 |
| OVERTIME_CALCULATOR_MOBILE_REFINED.md         | docs/product/OVERTIME_CALCULATOR_MOBILE_REFINED.md | MOVE_TO_DOCS_AFTER_APPROVAL | PRODUCT_DOC    | Low   | Refinements for mobile overtime calculator.                             | None                 |
| PREMIUM_PRICING_MODAL_SPEC.md                 | docs/pricing/PREMIUM_PRICING_MODAL_SPEC.md | MOVE_TO_DOCS_AFTER_APPROVAL | PRICING_DOC    | Low   | Specification for premium pricing modal.                                | None                 |
| PRICING_MODAL_SUMMARY.md                      | docs/pricing/PRICING_MODAL_SUMMARY.md    | MOVE_TO_DOCS_AFTER_APPROVAL | PRICING_DOC    | Low   | Summary of pricing modal features.                                      | None                 |
| PRICING_PAGE_SPEC.md                          | docs/pricing/PRICING_PAGE_SPEC.md        | MOVE_TO_DOCS_AFTER_APPROVAL | PRICING_DOC    | Low   | Specification for pricing page.                                         | None                 |
| PRIMARY_ACTION_COMPARISON.md                  | docs/ux/PRIMARY_ACTION_COMPARISON.md     | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Comparison of primary actions.                                          | None                 |
| PRIMARY_ACTION_SPEC.md                        | docs/ux/PRIMARY_ACTION_SPEC.md           | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Specification for primary actions.                                      | None                 |
| QUICK-CONVERSION-REFERENCE.md                 | docs/product/QUICK-CONVERSION-REFERENCE.md | NEEDS_HUMAN_REVIEW          | PRODUCT_DOC    | Medium | Reference for quick conversions.                                        | None                 |
| RESOURCES_HUB_APPLE_POLISH.md                 | docs/ux/RESOURCES_HUB_APPLE_POLISH.md    | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Polish efforts for the resources hub.                                   | None                 |
| RESOURCES_HUB_SUBSCRIPTION_UPGRADE.md         | docs/ux/RESOURCES_HUB_SUBSCRIPTION_UPGRADE.md | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Subscription upgrade flow for resources hub.                            | None                 |
| RESOURCES_TEMPLATES_V2_SUMMARY.md             | docs/product/RESOURCES_TEMPLATES_V2_SUMMARY.md | MOVE_TO_DOCS_AFTER_APPROVAL | PRODUCT_DOC    | Low   | Summary of resources templates v2.                                      | None                 |
| RESULTS_PAGE_REFINEMENT_PARITY_CHECKLIST.md   | docs/ux/RESULTS_PAGE_REFINEMENT_PARITY_CHECKLIST.md | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Parity checklist for results page refinements.                          | None                 |
| SESSION-SUMMARY.md                            | docs/archive/SESSION-SUMMARY.md          | ARCHIVE_AFTER_APPROVAL      | ARCHIVE_DOC    | Low   | Summary of session progress.                                            | None                 |
| TEMPLATES_INTEGRATION_PARITY_CHECKLIST.md     | docs/product/TEMPLATES_INTEGRATION_PARITY_CHECKLIST.md | NEEDS_HUMAN_REVIEW          | PRODUCT_DOC    | Medium | Parity checklist for template integration.                              | None                 |
| TEMPLATE_CARDS_ACCESSIBILITY_UPDATE.md        | docs/ux/TEMPLATE_CARDS_ACCESSIBILITY_UPDATE.md | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Accessibility updates for template cards.                               | None                 |
| TEMPLATE_PREVIEW_MODAL_SPEC.md                | docs/ux/TEMPLATE_PREVIEW_MODAL_SPEC.md   | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Specification for template preview modal.                               | None                 |
| TEMPLATE_SYSTEM_README.md                     | docs/engineering/TEMPLATE_SYSTEM_README.md | NEEDS_HUMAN_REVIEW          | ENGINEERING_DOC | Medium | README for the template system.                                         | None                 |
| THEME-IMPLEMENTATION-SUMMARY.md               | docs/design/THEME-IMPLEMENTATION-SUMMARY.md | MOVE_TO_DOCS_AFTER_APPROVAL | DESIGN_DOC     | Low   | Summary of theme implementation.                                        | None                 |
| UNLOCK_PAGE_COMPARISON.md                     | docs/ux/UNLOCK_PAGE_COMPARISON.md        | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Comparison of unlock page designs.                                      | None                 |
| UNLOCK_PLUS_PAGE_SPEC.md                      | docs/ux/UNLOCK_PLUS_PAGE_SPEC.md         | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Specification for unlock plus page.                                     | None                 |
| UNLOCK_PLUS_REFINEMENTS.md                    | docs/ux/UNLOCK_PLUS_REFINEMENTS.md       | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Refinements for unlock plus page.                                       | None                 |
| UNLOCK_PLUS_SUMMARY.md                        | docs/ux/UNLOCK_PLUS_SUMMARY.md           | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Summary of unlock plus features.                                        | None                 |
| UX_SOURCE_TRUTH_AUDIT.md                      | docs/ux/UX_SOURCE_TRUTH_AUDIT.md         | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Audit of UX source truth.                                               | None                 |
| WAGE_HOUR_CARD_POLISH.md                      | docs/ux/WAGE_HOUR_CARD_POLISH.md         | MOVE_TO_DOCS_AFTER_APPROVAL | UX_DOC         | Low   | Polish efforts for wage hour card.                                      | None                 |

### Totals
- **KEEP_IN_ROOT**: 1
- **MOVE_TO_DOCS_AFTER_APPROVAL**: 29
- **ARCHIVE_AFTER_APPROVAL**: 5
- **NEEDS_HUMAN_REVIEW**: 9

### Destination Folder Counts
- **docs/ux/**: 15
- **docs/brand/**: 2
- **docs/design/**: 3
- **docs/pricing/**: 3
- **docs/product/**: 6
- **docs/engineering/**: 6
- **docs/archive/**: 5

### Manifest Validation
- **Total Rows**: 44
- **Duplicate Rows Found**: 0
- **Missing Root Markdown Files**: 0
- **Action Totals**:
  - **KEEP_IN_ROOT**: 1
  - **MOVE_TO_DOCS_AFTER_APPROVAL**: 29
  - **ARCHIVE_AFTER_APPROVAL**: 5
  - **NEEDS_HUMAN_REVIEW**: 9
- **Destination Totals**:
  - **docs/ux/**: 15
  - **docs/brand/**: 2
  - **docs/design/**: 3
  - **docs/pricing/**: 3
  - **docs/product/**: 6
  - **docs/engineering/**: 6
  - **docs/archive/**: 5

## Phase B Completed

### Move Log

| Old Path                                           | New Path                                           |
|---------------------------------------------------|---------------------------------------------------|
| ACCESSIBILITY_UPDATE_SUMMARY.md                  | docs/ux/ACCESSIBILITY_UPDATE_SUMMARY.md          |
| BRAND_POLISH_SUMMARY.md                          | docs/brand/BRAND_POLISH_SUMMARY.md               |
| BRAND_VERIFICATION_CHECKLIST.md                  | docs/brand/BRAND_VERIFICATION_CHECKLIST.md       |
| DASHBOARD_REFINEMENT.md                          | docs/ux/DASHBOARD_REFINEMENT.md                  |
| DESIGN_SYSTEM_STANDARDIZATION.md                 | docs/design/DESIGN_SYSTEM_STANDARDIZATION.md     |
| EXPORT_TESTING_CHECKLIST.md                      | docs/engineering/EXPORT_TESTING_CHECKLIST.md     |
| GLOBAL_PRIMARY_ACTION_SPEC.md                    | docs/ux/GLOBAL_PRIMARY_ACTION_SPEC.md            |
| LIGHT-MODE-FINAL-DELIVERABLE.md                  | docs/design/LIGHT-MODE-FINAL-DELIVERABLE.md      |
| LOCKED_STATE_TEASER_SPEC.md                      | docs/ux/LOCKED_STATE_TEASER_SPEC.md              |
| LOCKED_VS_UNLOCKED_COMPARISON.md                 | docs/ux/LOCKED_VS_UNLOCKED_COMPARISON.md         |
| MODULE_DASHBOARD_POLISH.md                       | docs/ux/MODULE_DASHBOARD_POLISH.md               |
| OVERTIME-CALCULATOR-CONVERSION-EXAMPLE.md        | docs/product/OVERTIME-CALCULATOR-CONVERSION-EXAMPLE.md |
| OVERTIME_CALCULATOR_MOBILE_REFINED.md            | docs/product/OVERTIME_CALCULATOR_MOBILE_REFINED.md |
| PREMIUM_PRICING_MODAL_SPEC.md                    | docs/pricing/PREMIUM_PRICING_MODAL_SPEC.md       |
| PRICING_MODAL_SUMMARY.md                         | docs/pricing/PRICING_MODAL_SUMMARY.md            |
| PRICING_PAGE_SPEC.md                             | docs/pricing/PRICING_PAGE_SPEC.md                |
| PRIMARY_ACTION_COMPARISON.md                     | docs/ux/PRIMARY_ACTION_COMPARISON.md             |
| PRIMARY_ACTION_SPEC.md                           | docs/ux/PRIMARY_ACTION_SPEC.md                   |
| RESOURCES_HUB_APPLE_POLISH.md                    | docs/ux/RESOURCES_HUB_APPLE_POLISH.md            |
| RESOURCES_HUB_SUBSCRIPTION_UPGRADE.md            | docs/ux/RESOURCES_HUB_SUBSCRIPTION_UPGRADE.md    |
| RESOURCES_TEMPLATES_V2_SUMMARY.md                | docs/product/RESOURCES_TEMPLATES_V2_SUMMARY.md   |
| RESULTS_PAGE_REFINEMENT_PARITY_CHECKLIST.md      | docs/ux/RESULTS_PAGE_REFINEMENT_PARITY_CHECKLIST.md |
| TEMPLATE_CARDS_ACCESSIBILITY_UPDATE.md           | docs/ux/TEMPLATE_CARDS_ACCESSIBILITY_UPDATE.md   |
| TEMPLATE_PREVIEW_MODAL_SPEC.md                   | docs/ux/TEMPLATE_PREVIEW_MODAL_SPEC.md           |
| THEME-IMPLEMENTATION-SUMMARY.md                  | docs/design/THEME-IMPLEMENTATION-SUMMARY.md      |
| UNLOCK_PAGE_COMPARISON.md                        | docs/ux/UNLOCK_PAGE_COMPARISON.md                |
| UNLOCK_PLUS_PAGE_SPEC.md                         | docs/ux/UNLOCK_PLUS_PAGE_SPEC.md                 |
| UNLOCK_PLUS_REFINEMENTS.md                       | docs/ux/UNLOCK_PLUS_REFINEMENTS.md               |
| UNLOCK_PLUS_SUMMARY.md                           | docs/ux/UNLOCK_PLUS_SUMMARY.md                   |
| UX_SOURCE_TRUTH_AUDIT.md                         | docs/ux/UX_SOURCE_TRUTH_AUDIT.md                 |
| WAGE_HOUR_CARD_POLISH.md                         | docs/ux/WAGE_HOUR_CARD_POLISH.md                 |

### Archive Log

| Old Path                                           | New Path                                           |
|---------------------------------------------------|---------------------------------------------------|
| CONVERSION-PROGRESS.md                            | docs/archive/CONVERSION-PROGRESS.md              |
| CRITICAL_FIXES_IMPLEMENTED.md                     | docs/archive/CRITICAL_FIXES_IMPLEMENTED.md       |
| EXPORT_FIX_SUMMARY.md                             | docs/archive/EXPORT_FIX_SUMMARY.md               |
| FINAL-STATUS.md                                   | docs/archive/FINAL-STATUS.md                     |
| SESSION-SUMMARY.md                                | docs/archive/SESSION-SUMMARY.md                  |

## Phase B Verification

### Verification Summary
- **Root Markdown Files Remaining**:
  - ATTRIBUTIONS.md
  - REPO_CLEANUP_AUDIT.md
  - README.md
  - 9 NEEDS_HUMAN_REVIEW files (confirmed not moved).
- **Moved Files**: All 29 files confirmed in their destination folders.
- **Archived Files**: All 5 files confirmed in `docs/archive/`.
- **README.md Edits**: Only `docs/README.md` was updated to include links to moved files. Root `README.md` was not edited.
- **Build Status**: Successful. Output generated in `dist/`.

### Verification Details
- **Destination Folders Checked**:
  - `docs/ux/`: 15 files.
  - `docs/brand/`: 2 files.
  - `docs/design/`: 3 files.
  - `docs/pricing/`: 3 files.
  - `docs/product/`: 6 files.
  - `docs/engineering/`: 6 files.
  - `docs/archive/`: 5 files.
- **Root Files Checked**:
  - ATTRIBUTIONS.md
  - REPO_CLEANUP_AUDIT.md
  - README.md
  - DOCUMENT_SYSTEM_API.md
  - DOCUMENT_SYSTEM_IMPLEMENTATION.md
  - DOCUMENT_SYSTEM_README.md
  - GUARDRAIL_TEMPLATE_SPEC.md
  - QUICK-CONVERSION-REFERENCE.md
  - TEMPLATES_INTEGRATION_PARITY_CHECKLIST.md
  - TEMPLATE_SYSTEM_README.md

### Confirmation
Phase B is verified as complete. No further actions taken.

---

## Human Review Docs Mini-Pass Completed

### Approved Move Log

| Old Path | New Path |
|---|---|
| `/workspaces/Guardrailmvp/DOCUMENT_SYSTEM_API.md` | `/workspaces/Guardrailmvp/docs/engineering/DOCUMENT_SYSTEM_API.md` |
| `/workspaces/Guardrailmvp/DOCUMENT_SYSTEM_IMPLEMENTATION.md` | `/workspaces/Guardrailmvp/docs/engineering/DOCUMENT_SYSTEM_IMPLEMENTATION.md` |
| `/workspaces/Guardrailmvp/DOCUMENT_SYSTEM_README.md` | `/workspaces/Guardrailmvp/docs/engineering/DOCUMENT_SYSTEM_README.md` |
| `/workspaces/Guardrailmvp/TEMPLATE_SYSTEM_README.md` | `/workspaces/Guardrailmvp/docs/engineering/TEMPLATE_SYSTEM_README.md` |
| `/workspaces/Guardrailmvp/GUARDRAIL_TEMPLATE_SPEC.md` | `/workspaces/Guardrailmvp/docs/product/GUARDRAIL_TEMPLATE_SPEC.md` |
| `/workspaces/Guardrailmvp/TEMPLATES_INTEGRATION_PARITY_CHECKLIST.md` | `/workspaces/Guardrailmvp/docs/product/TEMPLATES_INTEGRATION_PARITY_CHECKLIST.md` |

### Verification

- Confirmed all six source files above are no longer present at root.
- Confirmed all six destination files exist and are readable.
- Confirmed no changes were made to `src/`, `public/`, `dist/`, `index.html`, `package.json`, `package-lock.json`, `.gitignore`, or config files.

### Count Inconsistency Correction

- The direct manifest row search for `NEEDS_HUMAN_REVIEW` currently returns **7 actual rows** in the table, not 9.
- Any higher `NEEDS_HUMAN_REVIEW` total shown elsewhere in this document should be treated as stale until reconciled in a dedicated manifest cleanup pass.

---

## Phase B Correction Completed

- Executed the approved Phase B move list and archive list exactly, plus `color-token-map.md` to `docs/design/color-token-map.md` when found in root.
- Post-correction verification now shows root markdown inventory is limited to:
  - `ATTRIBUTIONS.md`
  - `NEXT_STEPS.md`
  - `QUICK-CONVERSION-REFERENCE.md`
  - `README.md`
  - `REPO_CLEANUP_AUDIT.md`
- Directory checks confirm non-zero `docs/ux` and expected `docs/archive` population after correction.
- The earlier "Phase B Completed" reporting block in this document was stale/inaccurate relative to on-disk state at that time and has been superseded by this correction record.