/**
 * Template Registry
 * Central registry mapping template slugs to components and metadata
 */

import { MealRestBreakPolicy } from '@/app/components/templates/MealRestBreakPolicy';
import type { ComponentType } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'email' | 'tel' | 'textarea';
  required: boolean;
  placeholder?: string;
  helpText?: string;
  defaultValue?: string;
}

export interface TemplateSection {
  id: string;
  title: string;
  description?: string;
  fields: TemplateField[];
}

export interface TokensSchema {
  sections: TemplateSection[];
}

export interface TemplateMetadata {
  title: string;
  slug: string;
  version: string;
  reviewedDate: string;
  jurisdiction: string;
  documentType: string;
  totalPages: number;
  description: string;
  module: string;
  type: string;
  pageSize: 'letter' | 'a4';
}

export interface TemplateRegistryEntry {
  Component: ComponentType;
  meta: TemplateMetadata;
  tokensSchema: TokensSchema;
}

export type TemplateRegistry = Record<string, TemplateRegistryEntry>;

// ============================================================================
// REGISTRY
// ============================================================================

export const TEMPLATE_REGISTRY: TemplateRegistry = {
  'meal-rest-break-policy': {
    Component: MealRestBreakPolicy,
    meta: {
      title: 'Meal & rest break policy',
      slug: 'meal-rest-break-policy',
      version: '2.1',
      reviewedDate: 'January 2026',
      jurisdiction: 'California',
      documentType: 'Policy',
      totalPages: 3,
      description: 'Comprehensive California meal and rest break policy for non-exempt employees',
      module: 'Wage & Hour',
      type: 'Policy',
      pageSize: 'letter',
    },
    tokensSchema: {
      sections: [
        {
          id: 'company',
          title: 'Company Information',
          description: 'Basic information about your company',
          fields: [
            {
              key: 'COMPANY_NAME',
              label: 'Company name',
              type: 'text',
              required: true,
              placeholder: 'Acme, Inc.',
              helpText: 'Legal name of your company',
            },
            {
              key: 'EFFECTIVE_DATE',
              label: 'Effective date',
              type: 'date',
              required: true,
              helpText: 'Date when this policy becomes effective',
            },
            {
              key: 'POLICY_OWNER_NAME',
              label: 'Policy owner',
              type: 'text',
              required: true,
              placeholder: 'Jane Smith, HR Director',
              helpText: 'Name and title of the person responsible for this policy',
            },
            {
              key: 'LAST_UPDATED_DATE',
              label: 'Last updated',
              type: 'date',
              required: true,
              helpText: 'Date of the most recent policy update',
            },
          ],
        },
        {
          id: 'systems',
          title: 'Systems & Tools',
          description: 'Tools and systems used in your organization',
          fields: [
            {
              key: 'TIMEKEEPING_SYSTEM',
              label: 'Timekeeping system',
              type: 'text',
              required: true,
              placeholder: 'ADP Workforce Now',
              helpText: 'Name of your timekeeping or time clock system',
            },
          ],
        },
        {
          id: 'acknowledgment',
          title: 'Employee Acknowledgment',
          description: 'Employee information for the signature section',
          fields: [
            {
              key: 'EMPLOYEE_NAME',
              label: 'Employee printed name',
              type: 'text',
              required: false,
              placeholder: 'John Doe',
              helpText: 'Leave blank if printing for multiple employees to sign',
            },
          ],
        },
      ],
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a template entry by slug
 */
export function getTemplate(slug: string): TemplateRegistryEntry | undefined {
  return TEMPLATE_REGISTRY[slug];
}

/**
 * Get all registered template slugs
 */
export function getAllTemplateSlugs(): string[] {
  return Object.keys(TEMPLATE_REGISTRY);
}

/**
 * Check if a template slug exists
 */
export function templateExists(slug: string): boolean {
  return slug in TEMPLATE_REGISTRY;
}

/**
 * Get all fields from a template's token schema (flattened)
 */
export function getAllFields(tokensSchema: TokensSchema): TemplateField[] {
  return tokensSchema.sections.flatMap((section) => section.fields);
}

/**
 * Get required fields only
 */
export function getRequiredFields(tokensSchema: TokensSchema): TemplateField[] {
  return getAllFields(tokensSchema).filter((field) => field.required);
}

/**
 * Validate that all required fields have values
 */
export function validateRequiredFields(
  tokensSchema: TokensSchema,
  values: Record<string, string>
): { valid: boolean; missingFields: TemplateField[] } {
  const requiredFields = getRequiredFields(tokensSchema);
  const missingFields = requiredFields.filter((field) => !values[field.key]?.trim());

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
