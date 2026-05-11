/**
 * Document System Exports
 * Complete document preview frame system for legal templates
 */

// Core Components
export { Document, DocumentPreviewFrame, Page } from './DocumentPreviewFrame';

// Primitives
export {
  DocTitle,
  H1,
  H2,
  H3,
  Body,
  Meta,
  FieldPairComponent,
  Callout,
  ChecklistItem,
  OrderedList,
  UnorderedList,
  SignatureBlock,
  Divider,
  FieldGroup,
  CoverPills,
  Spacer,
} from './DocumentPrimitives';

// Download Actions
export { DocumentDownloadActions, CompactDownloadActions } from './DocumentDownloadActions';

// Demo Templates
export { DemoMealRestBreakPolicy } from './DemoMealRestBreakPolicy';
export { DemoTimekeepingPolicy } from './DemoTimekeepingPolicy';
export { DemoIndependentContractorAgreement } from './DemoIndependentContractorAgreement';

// Types
export type { DocumentMetadata, PaperSize, FieldPair, SignatureLine, CalloutContent } from './types';
