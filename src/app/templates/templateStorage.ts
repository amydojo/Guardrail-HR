/**
 * Template Storage
 * LocalStorage utilities for template drafts and generation records
 */

// ============================================================================
// TYPES
// ============================================================================

export interface TemplateDraft {
  slug: string;
  version: string;
  values: Record<string, string>;
  lastModified: string; // ISO date string
}

export interface GenerationRecord {
  id: string;
  slug: string;
  version: string;
  createdAt: string; // ISO date string
  values: Record<string, string>;
  outputs: {
    pdf?: boolean;
    docx?: boolean;
  };
  status: 'generated' | 'implemented';
  proofUrl?: string;
}

// ============================================================================
// DRAFT STORAGE
// ============================================================================

/**
 * Get draft key for localStorage
 */
function getDraftKey(slug: string, version: string): string {
  return `gr-template-draft:${slug}:v${version}`;
}

/**
 * Save template draft to localStorage
 */
export function saveDraft(
  slug: string,
  version: string,
  values: Record<string, string>
): void {
  const draft: TemplateDraft = {
    slug,
    version,
    values,
    lastModified: new Date().toISOString(),
  };
  
  const key = getDraftKey(slug, version);
  localStorage.setItem(key, JSON.stringify(draft));
}

/**
 * Load template draft from localStorage
 */
export function loadDraft(
  slug: string,
  version: string
): Record<string, string> | null {
  const key = getDraftKey(slug, version);
  const stored = localStorage.getItem(key);
  
  if (!stored) return null;
  
  try {
    const draft: TemplateDraft = JSON.parse(stored);
    return draft.values;
  } catch (error) {
    console.error('Failed to parse draft:', error);
    return null;
  }
}

/**
 * Delete template draft
 */
export function deleteDraft(slug: string, version: string): void {
  const key = getDraftKey(slug, version);
  localStorage.removeItem(key);
}

/**
 * Check if draft exists
 */
export function hasDraft(slug: string, version: string): boolean {
  const key = getDraftKey(slug, version);
  return localStorage.getItem(key) !== null;
}

// ============================================================================
// GENERATION RECORDS STORAGE
// ============================================================================

const RECORDS_KEY = 'gr-template-generated';

/**
 * Get all generation records
 */
export function getAllRecords(): GenerationRecord[] {
  const stored = localStorage.getItem(RECORDS_KEY);
  
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse generation records:', error);
    return [];
  }
}

/**
 * Add a new generation record
 */
export function addGenerationRecord(
  slug: string,
  version: string,
  values: Record<string, string>,
  outputs: { pdf?: boolean; docx?: boolean }
): GenerationRecord {
  const record: GenerationRecord = {
    id: generateRecordId(),
    slug,
    version,
    createdAt: new Date().toISOString(),
    values,
    outputs,
    status: 'generated',
  };
  
  const records = getAllRecords();
  records.push(record);
  
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  
  return record;
}

/**
 * Update a generation record
 */
export function updateGenerationRecord(
  id: string,
  updates: Partial<GenerationRecord>
): void {
  const records = getAllRecords();
  const index = records.findIndex((r) => r.id === id);
  
  if (index === -1) {
    console.warn('Generation record not found:', id);
    return;
  }
  
  records[index] = { ...records[index], ...updates };
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

/**
 * Get records for a specific template
 */
export function getRecordsForTemplate(slug: string): GenerationRecord[] {
  const records = getAllRecords();
  return records.filter((r) => r.slug === slug);
}

/**
 * Delete a generation record
 */
export function deleteGenerationRecord(id: string): void {
  const records = getAllRecords();
  const filtered = records.filter((r) => r.id !== id);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(filtered));
}

/**
 * Generate unique record ID
 */
function generateRecordId(): string {
  return `gr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Clear all template data (for testing/debugging)
 */
export function clearAllTemplateData(): void {
  // Remove all draft keys
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith('gr-template-draft:')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove generation records
  localStorage.removeItem(RECORDS_KEY);
}

/**
 * Export all template data (for backup)
 */
export function exportTemplateData(): {
  drafts: TemplateDraft[];
  records: GenerationRecord[];
} {
  const drafts: TemplateDraft[] = [];
  const keys = Object.keys(localStorage);
  
  keys.forEach((key) => {
    if (key.startsWith('gr-template-draft:')) {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          drafts.push(JSON.parse(stored));
        } catch (e) {
          // Skip invalid entries
        }
      }
    }
  });
  
  return {
    drafts,
    records: getAllRecords(),
  };
}
