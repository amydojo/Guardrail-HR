/**
 * Fields Panel
 * Form interface for entering template token values
 */

import React, { useRef, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import type { TokensSchema, TemplateField } from '@/app/templates/templateRegistry';

// ============================================================================
// TYPES
// ============================================================================

interface FieldsPanelProps {
  schema: TokensSchema;
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
  missingRequired: TemplateField[];
  scrollToField?: string | null;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function FieldsPanel({
  schema,
  values,
  onChange,
  missingRequired,
  scrollToField,
}: FieldsPanelProps) {
  const fieldRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Scroll to field when requested
  useEffect(() => {
    if (scrollToField) {
      const element = fieldRefs.current.get(scrollToField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Focus the input
        const input = element.querySelector('input, textarea') as HTMLElement;
        if (input) {
          setTimeout(() => input.focus(), 300);
        }
      }
    }
  }, [scrollToField]);

  const handleFieldChange = (key: string, value: string) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  const isMissing = (fieldKey: string): boolean => {
    return missingRequired.some((f) => f.key === fieldKey);
  };

  return (
    <div className="space-y-6">
      {schema.sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          values={values}
          onChange={handleFieldChange}
          isMissing={isMissing}
          fieldRefs={fieldRefs}
        />
      ))}
    </div>
  );
}

// ============================================================================
// SECTION CARD
// ============================================================================

interface SectionCardProps {
  section: {
    id: string;
    title: string;
    description?: string;
    fields: TemplateField[];
  };
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  isMissing: (key: string) => boolean;
  fieldRefs: React.MutableRefObject<Map<string, HTMLElement>>;
}

function SectionCard({
  section,
  values,
  onChange,
  isMissing,
  fieldRefs,
}: SectionCardProps) {
  return (
    <div className="bg-theme-surface-1 border border-theme-border-1 rounded-xl p-5 lg:p-6">
      <div className="mb-4">
        <h3 className="text-[15px] font-semibold text-theme-text-1 mb-1">
          {section.title}
        </h3>
        {section.description && (
          <p className="text-[13px] text-theme-text-3">{section.description}</p>
        )}
      </div>

      <div className="space-y-5">
        {section.fields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={values[field.key] || ''}
            onChange={(value) => onChange(field.key, value)}
            isMissing={isMissing(field.key)}
            ref={(el) => {
              if (el) {
                fieldRefs.current.set(field.key, el);
              } else {
                fieldRefs.current.delete(field.key);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// FIELD INPUT
// ============================================================================

interface FieldInputProps {
  field: TemplateField;
  value: string;
  onChange: (value: string) => void;
  isMissing: boolean;
}

const FieldInput = React.forwardRef<HTMLDivElement, FieldInputProps>(
  ({ field, value, onChange, isMissing }, ref) => {
    const showError = field.required && isMissing;

    return (
      <div ref={ref} className="space-y-1.5">
        <label
          htmlFor={field.key}
          className="flex items-center gap-2 text-[13px] font-medium text-theme-text-1"
        >
          <span>{field.label}</span>
          {field.required && (
            <span className="text-[11px] text-theme-text-3 font-normal">
              required
            </span>
          )}
        </label>

        {field.type === 'textarea' ? (
          <textarea
            id={field.key}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={`w-full px-3 py-2 bg-theme-surface-2 border rounded-lg text-[14px] text-theme-text-1 placeholder:text-theme-text-3 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
              showError
                ? 'border-red-500 focus:border-red-500'
                : 'border-theme-border-1 focus:border-theme-border-1'
            }`}
          />
        ) : (
          <input
            type={field.type}
            id={field.key}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 bg-theme-surface-2 border rounded-lg text-[14px] text-theme-text-1 placeholder:text-theme-text-3 transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 ${
              showError
                ? 'border-red-500 focus:border-red-500'
                : 'border-theme-border-1 focus:border-theme-border-1'
            }`}
          />
        )}

        {showError && (
          <div className="flex items-center gap-1.5 text-[12px] text-red-600">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>This field is required</span>
          </div>
        )}

        {field.helpText && !showError && (
          <p className="text-[12px] text-theme-text-3">{field.helpText}</p>
        )}
      </div>
    );
  }
);

FieldInput.displayName = 'FieldInput';
