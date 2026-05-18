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
┌──────────────────────────────────────────────┐
│  Title (strong, hover → accent)    Reviewed Jan 2026    │
│                                     v2.1                 │
│  One-line description (muted)                           │
│                                                          │
│  [CA] [Wage & Hour] [Policy]                           │
│                                                          │
│  Download →    Add to plan                              │
└──────────────────────────────────────────────┘
```

---

### 2. **TemplatePreviewModalV2.tsx** (Refined)
**Path:** `/src/app/components/resources/TemplatePreviewModalV2.tsx`

**Modal Specifications:**
- Max width: 1040px, responsive to 92vw