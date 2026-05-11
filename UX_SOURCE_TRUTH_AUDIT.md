# Guardrail HR v1 - UX Source of Truth Audit
**Audit Date:** January 27, 2026  
**Status:** Comprehensive Implementation Review

---

## Executive Summary

**Overall Compliance: 60% ⚠️**

The current implementation demonstrates strong visual design and interaction patterns aligned with the calm, professional aesthetic. However, there are **critical gaps** in meeting the core UX Source of Truth requirements, particularly around:
1. Missing explicit disclosure/consent flow before assessment
2. Incomplete scope definition on landing page
3. Missing "what this is NOT" messaging
4. Insufficient disclaimer visibility on results page
5. Ambiguous paywall boundaries

---

## 1. Landing Page — Scope & Trust

### ✅ MEETS REQUIREMENTS
- Clear headline defines product as "compliance diagnostics"
- Single primary CTA: "Run wage & hour scan"
- Trust line includes "Not legal advice · Free diagnostic"
- Professional, calm tone established

### ❌ GAPS IDENTIFIED

#### **Critical: Missing "What it is NOT"**
**UX Source of Truth Requirement:**
> "User should immediately understand what it is not: legal advice, interpretation, or consultation"

**Current State:**
- Only has "Not legal advice" in small trust line (13px, gray-600)
- No explicit section explaining boundaries
- No "who it's NOT for" messaging

**Impact:** High - Users may have unrealistic expectations

**Recommendation:**
```tsx
// Add explicit boundary section to landing page
<section className="mx-auto max-w-[680px] px-5 py-12 border-t border-gray-900/50">
  <h2 className="text-[17px] font-medium text-gray-400 mb-6">What this is</h2>
  <ul className="space-y-3 mb-8">
    <li className="flex items-start gap-3">
      <Check className="w-4 h-4 text-[#5b6ff5] mt-1" />
      <span className="text-[15px] text-gray-300">
        Informational risk assessment based on your inputs
      </span>
    </li>
    <li className="flex items-start gap-3">
      <Check className="w-4 h-4 text-[#5b6ff5] mt-1" />
      <span className="text-[15px] text-gray-300">
        Understanding of potential exposure areas
      </span>
    </li>
  </ul>
  
  <h3 className="text-[17px] font-medium text-gray-400 mb-6">What this is not</h3>
  <ul className="space-y-3">
    <li className="flex items-start gap-3">
      <X className="w-4 h-4 text-gray-600 mt-1" />
      <span className="text-[15px] text-gray-400">
        Legal advice or interpretation of laws
      </span>
    </li>
    <li className="flex items-start gap-3">
      <X className="w-4 h-4 text-gray-600 mt-1" />
      <span className="text-[15px] text-gray-400">
        Confirmation of compliance or non-compliance
      </span>
    </li>
    <li className="flex items-start gap-3">
      <X className="w-4 h-4 text-gray-600 mt-1" />
      <span className="text-[15px] text-gray-400">
        Substitute for qualified legal counsel
      </span>
    </li>
  </ul>
</section>
```

#### **Minor: Disclaimer not "visible" per requirements**
**UX Source of Truth Requirement:**
> "Visible disclaimer (not hidden)"

**Current State:**
- Disclaimer exists but is subtle (13px, low contrast)
- Could be missed by users scanning quickly

**Impact:** Medium

**Recommendation:**
- Increase disclaimer prominence (14-15px, gray-400)
- Consider adding icon for visual anchor
- Move to more prominent position

---

## 2. Assessment Start — Disclosure & Consent

### ❌ CRITICAL FAILURE

**UX Source of Truth Requirement:**
> "Before any questions are answered: User sees an explicit informational disclaimer... Dedicated start screen or modal... User intentionally proceeds (no auto-start)"

**Current State:**
- **WageHourModule.tsx goes directly to assessment** on CTA click
- **No disclosure screen between module page and first question**
- Assessment starts immediately (WageHourAssessmentPage shows Q1 directly)
- Users can accidentally start without understanding scope

**Impact:** CRITICAL - Violates core UX principle

**Current Flow:**
```
Landing Page → WageHourModule → [CTA: Begin] → WageHourAssessmentPage (Q1)
                                      ❌ MISSING DISCLOSURE
```

**Required Flow:**
```
Landing Page → WageHourModule → [CTA: Begin] → DISCLOSURE SCREEN → [Confirm & Start] → Assessment Q1
```

**Recommendation:**
Create `WageHourDisclosurePage.tsx` or modal component with:

```tsx
export function AssessmentDisclosure({ onProceed, onCancel }) {
  return (
    <div className="mx-auto max-w-[680px] px-5 py-16">
      <h1 className="text-[32px] font-semibold mb-6">
        Before you begin
      </h1>
      
      <div className="bg-[#161616] rounded-[18px] p-8 border border-gray-900/50 mb-8">
        <h2 className="text-[17px] font-medium text-gray-300 mb-4">
          How this assessment works
        </h2>
        <ul className="space-y-4 text-[15px] text-gray-400">
          <li>• You'll answer 23 questions about your wage & hour practices</li>
          <li>• Your responses generate an informational risk score</li>
          <li>• Results identify potential exposure areas based on California law</li>
          <li>• Your answers are saved automatically</li>
        </ul>
      </div>

      <div className="bg-[#1a1a1a] rounded-[18px] p-8 border border-gray-800/50 mb-8">
        <h2 className="text-[17px] font-medium text-orange-400/90 mb-4">
          Important disclaimer
        </h2>
        <p className="text-[15px] text-gray-400 leading-relaxed mb-4">
          This assessment provides informational guidance only. It does not:
        </p>
        <ul className="space-y-3 text-[15px] text-gray-400">
          <li>• Constitute legal advice or interpretation</li>
          <li>• Confirm compliance or non-compliance</li>
          <li>• Replace consultation with qualified legal counsel</li>
        </ul>
        <p className="text-[14px] text-gray-500 mt-6">
          Results are based on rule-based checks and your inputs. Consult with 
          legal professionals for specific guidance.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onProceed}
          className="flex-1 px-7 py-3.5 rounded-[16px] bg-[#5b6ff5] text-white text-[15px] font-medium hover:bg-[#4a5ee0]"
        >
          I understand, start assessment
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-7 py-3.5 rounded-[16px] border border-gray-800 text-gray-300 text-[15px] font-medium hover:bg-gray-900/30"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
```

**Update routing:**
```tsx
// routes.tsx
{
  path: 'modules/wage-hour/disclosure',
  element: <WageHourDisclosurePage />
},

// WageHourModule.tsx - Update CTA
<Link to="/modules/wage-hour/disclosure"> // Changed from /assessment
  Begin
</Link>
```

---

## 3. Assessment Questions — Guided Completion

### ✅ MEETS REQUIREMENTS
- Plain-language questions
- Clear progress indicator (visual bar + "Question X of 23")
- Visible milestone text ("About halfway through", "Nearly complete")
- Predictable navigation
- Auto-save with confirmation ("Saved" indicator)
- No silent failures
- "Save & exit" always accessible
- Fatigue relief copy during mid-assessment

### ✅ EXCEEDS REQUIREMENTS
- Anxiety-reducing design patterns (mid-assessment breathing room)
- Reassurance micro-copy ("You can update any answer later")
- Midpoint marker with explicit confirmation
- Smooth transitions between questions

**Status:** EXCELLENT - No changes needed

---

## 4. Completion State — Clear Transition

### ✅ MEETS REQUIREMENTS
- Explicit completion when user clicks "Finish assessment"
- Clear transition via `AnalysisTransition` component (2-second screen)
- No ambiguity about next step
- No blank screens

**Status:** GOOD - Meets all requirements

---

## 5. Results Page — Explanation, Not Advice

### ✅ MEETS REQUIREMENTS
- Clear hierarchy: overall score → drivers → explanations
- Score understandable in <60 seconds
- Informational language throughout
- No prescriptive phrasing in main sections

### ⚠️ PARTIAL COMPLIANCE

#### **Disclaimer Visibility Issue**
**UX Source of Truth Requirement:**
> "Disclaimer visible on the page"

**Current State:**
- Disclaimer exists in `ScoreBreakdownDrawer` (only visible when drawer is opened)
- Disclaimer in `PrintableResultsReport` (only visible when printing)
- **NO disclaimer on main results page visible by default**

**Impact:** High

**Recommendation:**
Add persistent disclaimer footer to ResultsPage.tsx:

```tsx
// Add after all main content sections, before closing div
<section className="mt-16 pt-8 border-t border-gray-900/50">
  <div className="bg-[#161616] rounded-[16px] p-6 border border-gray-900/50 max-w-[640px]">
    <h3 className="text-[15px] font-medium text-gray-400 mb-3">
      Important information
    </h3>
    <p className="text-[14px] text-gray-500 leading-relaxed">
      This assessment provides informational guidance only and does not constitute 
      legal advice, interpretation, or a determination of compliance. Results are 
      based on rule-based checks and your responses. Consult qualified legal counsel 
      for specific guidance on your circumstances.
    </p>
  </div>
</section>
```

#### **Minor: Some action items could be interpreted as prescriptive**
**Current State:**
Review action item language for phrases like:
- "do X" → Change to "Consider reviewing X"
- "you should" → Change to "Organizations often evaluate"

**Impact:** Low - Mostly compliant, minor tweaks needed

---

## 6. Paywall / Access Boundary — Explicit Gating

### ⚠️ NEEDS IMPROVEMENT

#### **Current State:**
- Pricing page clearly shows Free vs Plus tiers
- Free tier shows what's included (score, categories, limited actions, one assessment)
- Plus tier shows enhanced features

#### **Gaps:**

**Gap 1: No preview of locked content**
**UX Source of Truth Requirement:**
> "What is visible for free (if any) / What requires payment"

**Current State:**
- Users won't know what's locked until they encounter it
- No visual indication in results of locked sections

**Recommendation:**
Add locked state indicators in results:

```tsx
// In ResultsPage.tsx - for locked sections
<div className="relative">
  {/* Locked overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a] z-10 rounded-[16px] flex items-end justify-center pb-8">
    <div className="text-center">
      <Lock className="w-6 h-6 text-gray-600 mx-auto mb-3" />
      <p className="text-[14px] text-gray-400 mb-4">
        Available with Guardrail Plus
      </p>
      <Link
        to="/pricing"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#5b6ff5] text-white text-[14px] font-medium"
      >
        View plans
      </Link>
    </div>
  </div>
  
  {/* Blurred preview content */}
  <div className="blur-sm pointer-events-none">
    {/* Actual content preview */}
  </div>
</div>
```

**Gap 2: Boundary not explicit at assessment start**
**Recommendation:**
Add to disclosure screen:
```tsx
<p className="text-[13px] text-gray-600">
  You'll receive a free risk score and high-level categories. 
  Detailed actions and reassessment require Guardrail Plus.
</p>
```

---

## Non-Goals Compliance Check

### ✅ CORRECTLY OUT OF SCOPE
- No legal recommendations (compliant)
- No state-by-state edge cases (compliant - focused on California)
- No custom remediation plans (compliant - shows general actions)
- No consulting flows (compliant)

**Status:** EXCELLENT - Product correctly avoids scope creep

---

## Success Criteria Assessment

**UX Source of Truth Success Criteria:**
1. ✅ First-time user understands product scope in <10 seconds
   - **PASS** - Landing page is clear and concise
   
2. ⚠️ User completes assessment without confusion
   - **CONDITIONAL PASS** - Assessment flow is excellent, but missing disclosure step creates confusion risk
   
3. ⚠️ Results feel credible, calm, and non-threatening
   - **PASS** - Results design is excellent
   - **MINOR ISSUE** - Missing visible disclaimer reduces credibility
   
4. ❌ Boundaries (legal + access) are unmistakable
   - **FAIL** - Legal boundaries not explicit enough
   - **FAIL** - No disclosure/consent screen
   - **PARTIAL** - Access boundaries need clearer preview

---

## Priority Action Items

### 🔴 CRITICAL (Must Fix)
1. **Add Assessment Disclosure Screen** (Flow #2)
   - Create dedicated disclosure page/modal
   - Require explicit consent before Q1
   - Include full disclaimer and "how it works"
   - Estimated effort: 4 hours

2. **Add Visible Disclaimer to Results Page** (Flow #5)
   - Persistent footer section
   - Cannot be dismissed or hidden
   - Estimated effort: 1 hour

### 🟡 HIGH PRIORITY (Should Fix)
3. **Add "What this is NOT" Section to Landing** (Flow #1)
   - Explicit boundaries
   - X-marked items
   - Estimated effort: 2 hours

4. **Add Locked Content Previews** (Flow #6)
   - Visual indicators of Plus features
   - Blur/lock overlays
   - Estimated effort: 3 hours

### 🟢 MEDIUM PRIORITY (Nice to Have)
5. **Enhance Disclaimer Visibility on Landing**
   - Larger text, better contrast
   - Estimated effort: 30 minutes

6. **Review Action Item Language**
   - Ensure no prescriptive phrasing
   - Estimated effort: 1 hour

---

## Strengths to Maintain

1. ✅ **Assessment Experience** - World-class anxiety-reducing design
2. ✅ **Visual Design** - Calm, professional, Apple-caliber
3. ✅ **Progress Transparency** - Always clear where user is
4. ✅ **Scope Discipline** - No feature creep into legal advice
5. ✅ **Information Architecture** - Clear hierarchy and flow

---

## Conclusion

**Overall Assessment: Good foundation with critical gaps**

The current implementation demonstrates exceptional visual design and user experience patterns. However, it **fails critical UX Source of Truth requirements** around disclosure/consent and boundary clarity.

**Compliance Score by Section:**
- Landing Page: 70% ⚠️
- Assessment Start: 0% ❌ (Missing entirely)
- Assessment Questions: 100% ✅
- Completion State: 100% ✅
- Results Page: 80% ⚠️
- Paywall: 60% ⚠️

**Key Blockers for v1 Launch:**
1. Missing disclosure/consent screen (Section #2)
2. Insufficient disclaimer visibility (Sections #1, #5)
3. Unclear paywall boundaries (Section #6)

**Recommendation:** Address all CRITICAL items before v1 launch. The product cannot ship without explicit disclosure/consent flow and visible disclaimers.

---

**Next Steps:**
1. Review this audit with product team
2. Prioritize critical fixes
3. Implement disclosure screen immediately
4. Add visible disclaimers to all key pages
5. Re-audit after changes
