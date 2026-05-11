# Apple Legal Doc Aesthetic — Integration Complete ✅

## Summary

Successfully integrated the "Apple legal doc" aesthetic into the Resources → Templates experience in Guardrail HR. The system now reads as: **"Maintained documentation + traceable versioning + calm controls."**

---

## Files Created

### 1. **TemplateCardLegal.tsx**
**Path:** `/src/app/components/resources/TemplateCardLegal.tsx`

**Apple Legal Doc Aesthetic:**
- Minimal, authoritative, quiet confidence
- Border-led in light mode (shadow-1 only)
- Liquid glass in dark mode (minimal shadows)
- Subtle 1px lift on hover
- **Only title and "Download" button open modal** (card NOT clickable)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Title (strong, hover → accent)    Reviewed Jan 2026    │
│                                     v2.1                 │
│  One-line description (muted)                           │
│                                                          │
│  [CA] [Wage & Hour] [Policy]                           │
│                                                          │
│  Download →    Add to plan                              │
└─────────────────────────────────────────────────────────┘
```

---

### 2. **TemplatePreviewModalV2.tsx** (Refined)
**Path:** `/src/app/components/resources/TemplatePreviewModalV2.tsx`

**Modal Specifications:**
- Max width: 1040px, responsive to 92vw
- Max height: 86vh
- Entry animation: **200ms** ease-out, fade + scale 0.98 → 1
- Backdrop: 60% dim + subtle blur

**Two-Column Layout:**

**Left (65%) — Document Preview:**
- White paper (even in dark mode)
- Page stack depth effect
- Inside-paper header: "Guardrail HR" | "DOC-ID • v2.1"
- Inside-paper footer: "Reviewed Month YYYY" | "Page X of Y"
- Zoom controls (75%–150%)
- Page navigation dots

**Right (35%) — Detail Cards:**
1. **In 10 minutes** (Calendar icon, checklist)
2. **What you'll customize** (Edit icon, bullet list)
3. **Format compatibility** (FileText icon, PDF/DOCX/GDocs)
4. **Version history accordion** (Shield icon, collapsed default)

**Sticky Action Bar:**
- Primary: "Download template" (accent button)
- Secondary: "Add to plan" (border button, toggle state)
- Tertiary: "View in resources" (text link)
- Confidence line: **"Templates are maintained and versioned. Not legal advice."**

---

## Files Modified

### **ResourcesHub.tsx**
**Path:** `/src/app/pages/resources/ResourcesHub.tsx`

**Changes:**
```tsx
// Import new component
import { TemplateCardLegal } from '@/app/components/resources/TemplateCardLegal';

// Replace inline card markup with component
{filteredTemplates.map((template) => (
  <TemplateCardLegal
    key={template.slug}
    template={template}
    onPreview={openTemplatePreview}
    onAddToPlan={toggleTemplatePlanItem}
    isInPlan={templatePlanItems.includes(template.slug)}
  />
))}
```

---

## Design Philosophy

### **No Marketing Language**
- ✅ "Download" (not "Download now" or "Get template")
- ✅ "Templates are maintained and versioned" (confidence line)
- ✅ "Not legal advice" (authority without urgency)
- ✅ "Reviewed Jan 2026 • v2.1" (trust meta)

### **Border-Led Light Mode**
- `shadow-theme-1` only (subtle)
- `hover:shadow-theme-1` (no big shadow jump)
- Border transitions for all hover states
- Airy, spacious layout

### **Liquid Glass Dark Mode**
- Borders + faint inner glow
- Minimal shadows (preserve existing aesthetic)
- White paper contrasts against dark chrome

### **Interaction Model**
- ✅ Title button → Opens modal
- ✅ Download link → Opens modal
- ✅ Add to plan → Toggles state
- ❌ Card background → NOT clickable

---

## Visual Hierarchy

### **Template Card**
```
Priority 1: Title (16px, semibold, hover → accent)
Priority 2: Description (14px, muted, line-clamp-1)
Priority 3: Chips (12px, surface-2 + border-2)
Priority 4: Trust meta (11px, right-aligned, muted)
Priority 5: Actions (14px, accent + muted)
```

### **Modal Header**
```
Priority 1: Template title (20px, semibold)
Priority 2: Document ID + version (12px, mono, muted)
Priority 3: Chips (12px, surface-2 + border-2)
```

### **Document Preview**
```
Priority 1: Paper content (white background)
Priority 2: Zoom controls (left)
Priority 3: Page indicator (right)
Priority 4: Page navigation (dots below)
```

---

## Typography Scale

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Page title | 24–32px | Semibold | text-1 |
| Section title | 20–24px | Semibold | text-1 |
| Card title | 16px | Semibold | text-1 → accent (hover) |
| Body text | 14–15px | Regular | text-2 |
| Metadata | 12px | Medium | text-3 |
| Trust meta | 11px | Medium/Mono | text-3 |
| Inside paper title | 24pt | Semibold | gray-900 |
| Inside paper body | 11.5pt | Regular | gray-700 |
| Inside paper header/footer | 9pt | Regular | gray-500 |

---

## Spacing System (8px Grid)

| Element | Spacing |
|---------|---------|
| Card padding | 24px (py-5 px-6) |
| Card gap (vertical) | 12px (space-y-3) |
| Section margin bottom | 48px (mb-12) |
| Header stack | 24px (space-y-6) |
| Filter bar gap | 12px (gap-3) |
| Chip gap | 8px (gap-2) |
| Action gap | 16px (gap-4) |
| Title → description | 12px (mb-3) |
| Description → chips | 16px (mb-4) |
| Chips → actions | 20px + border (mb-5 + pt-4 + border-t) |

---

## Shadow System

### **Light Mode**
```css
Card default: border-theme-border-1
Card hover: shadow-theme-1
Modal: shadow-[0_8px_32px_rgba(0,0,0,0.12)]
Paper: shadow-[0_2px_12px_rgba(0,0,0,0.08)]
```

### **Dark Mode**
```css
Card default: border-theme-border-1
Card hover: border-theme-border-2 + shadow-theme-1 (minimal)
Modal: shadow-[0_8px_32px_rgba(0,0,0,0.4)]
Paper: shadow-[0_2px_12px_rgba(0,0,0,0.08)]
```

---

## Animation Specifications

### **Card Hover**
```css
transition: all 200ms
transform: translateY(-1px)
border-color: theme-border-2
shadow: theme-1
```

### **Modal Entry**
```css
transition: 200ms ease-out
initial: { opacity: 0, scale: 0.98 }
animate: { opacity: 1, scale: 1 }
exit: { opacity: 0, scale: 0.98 }
```

### **Version History Accordion**
```css
transition: smooth
initial: { opacity: 0, height: 0 }
animate: { opacity: 1, height: 'auto' }
exit: { opacity: 0, height: 0 }
```

---

## Accessibility Features

### **Keyboard Navigation**
- ✅ Title button: Focus ring (ring-2 ring-theme-focus/40)
- ✅ Download link: Focus ring
- ✅ Add to plan: Focus ring
- ✅ Tab order: Title → Download → Add to plan
- ✅ Enter/Space: Activate focused button

### **Screen Reader Support**
- ✅ Semantic `<button>` elements
- ✅ Descriptive button text
- ✅ Implicit ARIA from content
- ✅ Modal: Focus trap, Escape to close

### **Touch Targets**
- ✅ All buttons: 44px+ height
- ✅ Title button: Full width
- ✅ Clear spacing between targets

---

## Component Props

### **TemplateCardLegal**
```tsx
interface TemplateCardLegalProps {
  template: Template;
  onPreview: (template: Template) => void;
  onAddToPlan: (slug: string) => void;
  isInPlan: boolean;
  className?: string;
}
```

### **TemplatePreviewModalV2**
```tsx
interface TemplatePreviewModalV2Props {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (templateSlug: string) => void;
  onAddToPlan?: (templateSlug: string) => void;
  isInPlan?: boolean;
}
```

---

## Usage Example

```tsx
import { TemplateCardLegal } from '@/app/components/resources/TemplateCardLegal';
import { TemplatePreviewModalV2 } from '@/app/components/resources/TemplatePreviewModalV2';

function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [planItems, setPlanItems] = useState<string[]>([]);

  const openPreview = (template: Template) => {
    setSelectedTemplate(template);
    setModalOpen(true);
  };

  const togglePlan = (slug: string) => {
    setPlanItems(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  return (
    <>
      {/* Template List */}
      <div className="space-y-3">
        {templates.map(template => (
          <TemplateCardLegal
            key={template.slug}
            template={template}
            onPreview={openPreview}
            onAddToPlan={togglePlan}
            isInPlan={planItems.includes(template.slug)}
          />
        ))}
      </div>

      {/* Preview Modal */}
      <TemplatePreviewModalV2
        template={selectedTemplate}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDownload={(slug) => console.log('Download:', slug)}
        onAddToPlan={togglePlan}
        isInPlan={selectedTemplate ? planItems.includes(selectedTemplate.slug) : false}
      />
    </>
  );
}
```

---

## Testing Checklist

### **Visual Testing**
- [ ] Light mode: Border-led, airy, shadow-1 only
- [ ] Dark mode: Liquid glass, minimal shadows
- [ ] Card hover: 1px lift, border darken, shadow-1
- [ ] Modal entrance: 200ms fade + scale
- [ ] White paper in dark mode (contrast)
- [ ] Trust meta alignment (right, top-aligned)

### **Interaction Testing**
- [ ] Title button opens modal
- [ ] Download link opens modal
- [ ] Add to plan toggles state
- [ ] Card background does NOT open modal
- [ ] Modal closes on Escape
- [ ] Modal closes on backdrop click
- [ ] Modal closes on X button

### **Responsive Testing**
- [ ] Mobile: Cards stack vertically
- [ ] Tablet: Cards maintain layout
- [ ] Desktop: Full two-column modal
- [ ] Modal: 92vw on mobile, 1040px on desktop

### **Accessibility Testing**
- [ ] Keyboard: Tab through all interactive elements
- [ ] Keyboard: Enter/Space activate buttons
- [ ] Screen reader: All buttons announced correctly
- [ ] Focus rings visible on Tab navigation
- [ ] Touch targets 44px+ height

---

## Next Steps (Optional Enhancements)

### **Export Pipeline Integration**
- Integrate `/src/utils/templateExport.ts` for PDF/DOCX/GDocs export
- Add export validation checklist modal
- Connect download button to actual export functions

### **Advanced Features**
- Template versioning UI (diff view)
- Customization field inline editing
- Preview with filled-in placeholders
- Save draft customizations

### **Performance**
- Lazy load modal content
- Image optimization for document preview
- Virtual scrolling for large template lists

---

## Conclusion

The Resources → Templates experience now embodies the **"Apple legal doc"** aesthetic:
- ✅ Minimal, authoritative, quiet confidence
- ✅ Feels like maintained documentation system
- ✅ No marketing language, no urgency
- ✅ Border-led light mode, liquid glass dark mode
- ✅ Traceable versioning + calm controls

**The system reads as:** *"Maintained documentation + traceable versioning + calm controls."*
