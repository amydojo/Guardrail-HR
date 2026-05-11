# State-Aware Pricing Page — Design Specification

## Philosophy

**This is NOT a generic pricing landing page.**

This is a **decision surface informed by context** that adapts to the user's journey:
- ✅ Pre-scan: Educational, invitational
- ✅ Post-scan: Contextual, action-oriented
- ✅ Always calm, factual, no urgency
- ✅ Apple / Stripe / Linear internal quality

**Core Principle:**
> "The pricing page should acknowledge what the user has already experienced."

---

## Global Principles

### ✅ CALM, FACTUAL, INTERNAL-PRODUCT TONE

**Language:**
- No urgency ("Limited time!")
- No hype ("Revolutionary!")
- No guarantees ("100% compliant!")
- Plain, specific language

**Visual:**
- Dark theme consistent
- Generous spacing
- Typography-driven
- No decorative elements

---

### ✅ UPGRADE FRAMED AS CLARITY + CONTROL

**NOT framed as:**
- ❌ Safety ("Protect your business!")
- ❌ Compliance ("Stay compliant!")
- ❌ Fear ("Avoid costly mistakes!")

**FRAMED as:**
- ✅ Deeper clarity ("See why risk exists")
- ✅ Control tools ("What to do next")
- ✅ Documentation ("Export and share")
- ✅ Ongoing visibility ("Track changes")

**Example:**
- ❌ "Upgrade to stay safe"
- ✅ "Upgrade when you're ready to move from insight to action"

---

## State Detection

### User States

**State 1: Pre-Scan User**
```typescript
{
  completed: false
}
```
- Has NOT completed assessment
- Generic pricing information
- Educational tone
- "Start free" messaging

**State 2: Post-Scan User**
```typescript
{
  completed: true,
  score: 72,
  topRiskDrivers: ['Classification issues', 'Overtime'],
  lastUpdated: 'Jan 24, 2026',
  riskLevel: 'elevated' | 'moderate' | 'low'
}
```
- HAS completed assessment
- Contextual snapshot header
- Action-oriented tone
- "Unlock" messaging

---

## STATE 1: PRE-SCAN USER

### Hero Section

**Headline:**
```
Simple pricing. Clear outcomes.
```
- 56px semibold (40px mobile)
- Centered
- Direct, factual
- No hype

**Subhead:**
```
Start with a free compliance diagnostic.
Upgrade only when you're ready to take action.
```
- 19px gray-400 (17px mobile)
- Centered
- 2 lines max
- Validates free tier
- "Only when ready" (no pressure)

**Visual Treatment:**
```
Text-only hero
Generous whitespace
No background elements
Typography does the work
```

---

### Pricing Tiers (Pre-Scan)

**FREE DIAGNOSTIC**

**Title:** Free  
**Price:** $0  
**Description:**
```
Understand where risk exists.
```

**Includes:**
- ✔ Wage & Hour risk score
- ✔ High-level exposure categories
- ✔ Limited recommended actions
- ✔ One completed assessment

**Footer note:**
```
For initial understanding only.
```

**CTA:**
```
[Run free scan]
```
- Links to assessment
- Full-width button
- bg-[#161616], border
- Gray-300 text

---

**GUARDRAIL PLUS**

**Title:** Guardrail Plus  
**Price:** $49/month or $499/year  
**Description:**
```
For acting with confidence.
```

**Includes:**
- ✔ Answer-level traceability
- ✔ Prioritized action plan (effort × impact)
- ✔ Reassessment & score tracking
- ✔ Exportable reports (PDF, CSV)
- ✔ Templates & implementation guides

**Footer note:**
```
Designed for ongoing compliance management.
```

**Primary CTA:**
```
[Upgrade to Plus]
```
- bg-[#5b6ff5] (brand blue)
- White text

**Secondary CTA:**
```
View example report
```
- Text button, gray-600
- Subtle, optional

---

**Footer Reassurance (Pre-scan only):**
```
You can upgrade at any time after seeing your results.
```
- 13px gray-600, centered
- Reduces commitment anxiety
- Validates exploration

---

## STATE 2: POST-SCAN USER

### Snapshot Header (Replaces Hero)

**Title:**
```
Based on your latest assessment
```
- 40px semibold (32px mobile)
- Centered
- Contextual, not generic

**Subtext:**
```
This pricing reflects what becomes available after your Wage & Hour scan.
```
- 17px gray-500 (15px mobile)
- Grounds pricing in user's experience

---

**Compact Summary Row:**

```
┌─────────────────────────────────────────────────────┐
│ Latest score   Top risk drivers         Last updated│
│                                                      │
│ 72/100         [Classification issues]  Jan 24, 2026│
│                [Overtime calculation]                │
└─────────────────────────────────────────────────────┘
```

**Layout:**
```
bg-[#161616]/40
border-gray-900/30
rounded-[16px]
p-6
max-w-[720px]
```

**Desktop: Flex row (3 columns)**
**Mobile: Flex column (stacked)**

**Elements:**

1. **Latest Score**
   - Label: 12px gray-600 "Latest score"
   - Value: 20px semibold gray-300 "72/100"

2. **Top Risk Drivers**
   - Label: 12px gray-600 "Top risk drivers"
   - Tags: 1-2 max, pill-style
   - 13px gray-400 text
   - bg-[#161616], border-gray-900/50

3. **Last Updated**
   - Label: 12px gray-600 "Last updated"
   - Value: 13px gray-500 "Jan 24, 2026"
   - Right-aligned on desktop

**Why This Works:**
- Acknowledges user's journey
- Provides context for pricing
- Not promotional, informational
- Grounds upgrade in reality

---

### Pricing Tiers (Post-Scan)

**Key Differences from Pre-Scan:**

**FREE DIAGNOSTIC**

**Title:**
```
Free (current)
```
- Shows "(current)" badge
- 12px gray-600

**Description (Changed):**
```
You've identified where risk exists.
```
- Past tense ("You've")
- Acknowledges completion

**Muted Helper Line (NEW):**
```
Limited detail for follow-through.
```
- 13px gray-600
- Honest about limitation
- Suggests upgrade timing

**CTA (Changed):**
```
Currently active
```
- Border box, not button
- 14px gray-600 text
- No click action
- Validates current state

---

**GUARDRAIL PLUS**

**Description (Changed):**
```
See exactly why risk exists — and what to do next.
```
- More specific than pre-scan
- Action-oriented ("what to do next")
- Em dash (—) emphasis

**Context Line (NEW):**
```
Plus unlocks the details behind the signals already identified.
```
- 13px gray-500
- Contextual to user's scan
- "Already identified" = acknowledges their work

**Score-Aware Microcopy (OPTIONAL, SUBTLE):**

**If riskLevel === 'elevated':**
```
Most teams with flagged risk areas upgrade to support remediation and documentation.
```
- 12px gray-600
- Social proof (soft)
- Not "recommended" or "needed"
- "Support" not "fix"

**If riskLevel === 'low':**
```
Plus is commonly used for documentation, exports, and ongoing monitoring.
```
- 12px gray-600
- Different value prop
- Ongoing use case
- Not urgent

**If riskLevel === 'moderate':**
```
(No extra microcopy)
```
- Neutral state
- Standard description sufficient

**CTAs:**
```
[Upgrade to Plus]
View example report
```
- Same as pre-scan
- Primary + secondary

---

### What Changes Section (Post-Scan)

**Title (Changed):**
```
What becomes clearer with Guardrail Plus
```
- "Becomes clearer" (not "changes")
- Implies they already have insight
- Plus adds clarity

**Column Headers (Changed):**

**Left Column:**
```
What you have
```
- Not "Free diagnostic"
- Acknowledges current state

**Content:**
```
– Risk exists
– Broad categories
– Snapshot view
```
- Shortened (already experienced)
- Present tense
- Concise

---

**Right Column:**
```
What unlocks
```
- Not "Guardrail Plus"
- Focuses on unlocking

**Content:**
```
– Why risk exists (answer-level)
– What to fix first (effort × impact)
– How things change over time
– How to document and share
```
- Action-oriented
- Specific outcomes
- "How to" framing

---

**Neutral Line (Changed):**
```
Upgrade when you're ready to move from insight to action.
```
- "Insight to action" (key transition)
- "When you're ready" (user timing)
- Not "Most teams upgrade..."

---

### Footer CTA (Post-Scan)

**Headline (Changed):**
```
Ready to upgrade?
```
- 32px semibold
- Question format
- Direct, not persuasive

**Primary CTA:**
```
[Unlock Guardrail Plus]
```
- bg-[#5b6ff5]
- White text
- "Unlock" (not "Upgrade" or "Buy")

**Secondary CTA:**
```
Continue with free version
```
- Text button, gray-500
- Links back to results
- Validates free choice
- Not "No thanks" (negative)

---

## Comparison: Pre-Scan vs Post-Scan

### Hero / Header

| Element | Pre-Scan | Post-Scan |
|---------|----------|-----------|
| **Title** | "Simple pricing. Clear outcomes." | "Based on your latest assessment" |
| **Subhead** | Generic about free → upgrade | Contextual to their scan |
| **Visual** | Text-only hero | Snapshot card with score/drivers |
| **Tone** | Educational | Contextual |

---

### Free Tier

| Element | Pre-Scan | Post-Scan |
|---------|----------|-----------|
| **Title** | "Free" | "Free (current)" |
| **Description** | "Understand where risk exists." | "You've identified where risk exists." |
| **Helper Line** | None | "Limited detail for follow-through." |
| **CTA** | "Run free scan" (button) | "Currently active" (static) |

---

### Plus Tier

| Element | Pre-Scan | Post-Scan |
|---------|----------|-----------|
| **Description** | "For acting with confidence." | "See exactly why risk exists — and what to do next." |
| **Context Line** | None | "Plus unlocks the details behind the signals..." |
| **Score Microcopy** | None | Optional (elevated/low risk messaging) |
| **Footer Note** | "Designed for ongoing..." | (Replaced by microcopy if present) |

---

### Comparison Section

| Element | Pre-Scan | Post-Scan |
|---------|----------|-----------|
| **Title** | "What changes when you upgrade" | "What becomes clearer with Guardrail Plus" |
| **Left Header** | "Free diagnostic" | "What you have" |
| **Right Header** | "Guardrail Plus" | "What unlocks" |
| **Content** | Future-oriented descriptions | Present-oriented (already seen) |
| **Neutral Line** | "Most teams upgrade once..." | "Upgrade when ready to move from insight to action." |

---

### Footer CTA

| Element | Pre-Scan | Post-Scan |
|---------|----------|-----------|
| **Headline** | "Start free. Upgrade when useful." | "Ready to upgrade?" |
| **Primary CTA** | "Run free wage & hour scan" | "Unlock Guardrail Plus" |
| **Secondary CTA** | "View modules" | "Continue with free version" |

---

## Score-Aware Microcopy Logic

### When to Show

**Only if:**
- User has completed scan (post-scan state)
- Risk level is available
- Risk level is 'elevated' OR 'low'

**Don't show if:**
- Pre-scan user
- Risk level is 'moderate'
- Risk level unavailable

---

### Copy Variations

**Elevated Risk:**
```
Most teams with flagged risk areas upgrade to support remediation and documentation.
```

**Why this works:**
- Social proof ("most teams")
- Contextual ("flagged risk areas")
- Not urgent ("to support")
- Specific outcomes ("remediation and documentation")

**NOT:**
- ❌ "You should upgrade to fix these issues"
- ❌ "Reduce your risk with Plus"
- ❌ "Recommended for your risk level"

---

**Low Risk:**
```
Plus is commonly used for documentation, exports, and ongoing monitoring.
```

**Why this works:**
- Different value prop (not remediation)
- Ongoing use case
- Specific capabilities
- No urgency

**NOT:**
- ❌ "Your risk is low, but still consider Plus"
- ❌ "Stay compliant with Plus"
- ❌ "Maintain your good standing"

---

**Moderate Risk:**
```
(No additional microcopy)
```

**Why:**
- Neutral state
- Standard description sufficient
- Don't over-nudge
- Let user decide

---

## Visual Treatment

### Dark Theme Consistent

**Same as static pricing page:**
```
bg-[#0a0a0a]
Cards: bg-[#161616], bg-[#161616]/40
Borders: border-gray-900/30, border-gray-900/50
Text hierarchy: white → gray-300 → gray-400 → gray-500 → gray-600
```

---

### Snapshot Header Card

**Specific Styling:**
```
bg-[#161616]/40 (semi-transparent)
border-gray-900/30 (subtle)
rounded-[16px]
p-5 md:p-6
max-w-[720px] mx-auto
```

**Layout:**
```
Desktop: flex-row (3 columns side-by-side)
Mobile:  flex-col (stacked vertically)
gap-4
```

**Score Display:**
```
20px semibold gray-300
Not overly prominent
Muted emphasis
```

**Risk Driver Pills:**
```
px-3 py-1
bg-[#161616]
border-gray-900/50
rounded-[8px]
13px text-gray-400
```

---

### State Indicators

**"(current)" Badge:**
```
ml-2 (spacing from "Free")
text-[12px]
text-gray-600
Not prominent
```

**"Currently active" Box:**
```
py-3.5 px-6
border border-gray-900/30
rounded-[14px]
text-center
text-[14px] text-gray-600
Not clickable
```

---

## Mobile Optimization

### Snapshot Header (Mobile)

**Layout Changes:**
```
Desktop: 3 columns side-by-side
Mobile:  Stacked vertically
```

**Spacing:**
```
Desktop: p-6
Mobile:  p-5
gap-4 (between sections)
```

**Risk Driver Pills:**
```
Flex-wrap
2 pills max shown
Comfortable tap if interactive
```

---

### Typography Scaling

**Titles:**
```
Desktop: 56px hero, 40px snapshot, 32px footer
Mobile:  40px hero, 32px snapshot, 28px footer
```

**Body:**
```
Desktop: 17px, 15px, 14px
Mobile:  15px, 14px, 13px
```

**Meta:**
```
13px, 12px (same on both)
```

---

### CTAs

**Desktop:**
```
flex-row (side-by-side)
gap-4
```

**Mobile:**
```
flex-col (stacked)
gap-4
Full-width buttons
```

---

### Page Completeness

**Mobile Goal:**
```
~2 scrolls to see full page
Snapshot header: 1 viewport
Tiers + comparison: 1 viewport
FAQ + footer: Bonus scroll
```

**Never:**
- ❌ Duplicate CTAs
- ❌ Hidden critical info
- ❌ Broken layout
- ❌ Tiny text

---

## Implementation Notes

### State Detection

**In Real App:**
```typescript
// Get from auth context or API
const userAssessment = useUserAssessment();

<StateAwarePricingPage userAssessment={userAssessment} />
```

**Component Props:**
```typescript
interface UserAssessment {
  completed: boolean;         // Has user finished scan?
  score?: number;             // 0-100 score
  topRiskDrivers?: string[];  // Array of risk labels
  lastUpdated?: string;       // Formatted date
  riskLevel?: 'low' | 'moderate' | 'elevated';
}
```

---

### Conditional Rendering

**Pattern Used:**
```tsx
{!hasCompletedScan ? (
  // Pre-scan version
) : (
  // Post-scan version
)}
```

**Applied To:**
- Hero vs Snapshot Header
- Tier descriptions
- CTAs
- Comparison section titles
- Footer headline and CTAs

---

### Score-Aware Function

```typescript
const getScoreAwareMicrocopy = () => {
  if (!hasCompletedScan || !riskLevel) return null;
  
  if (riskLevel === 'elevated') {
    return 'Most teams with flagged risk areas...';
  } else if (riskLevel === 'low') {
    return 'Plus is commonly used for...';
  }
  return null; // moderate or unknown
};
```

---

## Copy Tone Principles

### ✅ ACKNOWLEDGES USER JOURNEY

**Pre-scan:**
- Future-oriented
- Educational
- Invitational
- "Start with..."
- "Upgrade only when..."

**Post-scan:**
- Present-oriented
- Contextual
- Action-focused
- "You've identified..."
- "See exactly why..."

---

### ✅ NEVER SAYS "RECOMMENDED" OR "NEEDED"

**Bad:**
- ❌ "Recommended for your risk level"
- ❌ "You need Plus to address these issues"
- ❌ "Required for compliance"
- ❌ "Essential for teams like yours"

**Good:**
- ✅ "Most teams with flagged areas..."
- ✅ "Commonly used for..."
- ✅ "When you're ready to..."
- ✅ "Plus unlocks..."

---

### ✅ FRAMES UPGRADE AS CLARITY + CONTROL

**Focus on:**
- Deeper visibility ("why risk exists")
- Control tools ("what to fix first")
- Documentation ("how to share")
- Ongoing monitoring ("changes over time")

**Not on:**
- Fear ("avoid penalties")
- Safety ("protect business")
- Compliance ("stay compliant")
- Urgency ("act now")

---

## User Flow Examples

### Pre-Scan User Journey

```
1. Lands on /pricing (intentional visit)
   ↓
2. Reads hero: "Simple pricing. Clear outcomes."
   ↓
3. Sees two tiers: Free ($0) and Plus ($49/mo)
   ↓
4. Reads comparison: "What changes when you upgrade"
   ↓
5. Either:
   A. Clicks "Run free scan" → /assessment
   B. Clicks "Upgrade to Plus" → /unlock-plus
   C. Leaves to research more
```

**Feeling:**
- Informed about options
- No pressure to decide
- Free tier validated
- Can start without commitment

---

### Post-Scan User Journey

```
1. Lands on /pricing (from results page or nav)
   ↓
2. Sees snapshot: "Based on your latest assessment"
   → Score: 72/100
   → Risk drivers: Classification, Overtime
   ↓
3. Reads contextual tier descriptions:
   → Free: "You've identified where risk exists"
   → Plus: "See exactly why — and what to do next"
   ↓
4. Sees score-aware microcopy (if elevated):
   → "Most teams with flagged risk areas upgrade..."
   ↓
5. Reads comparison: "What becomes clearer with Plus"
   ↓
6. Either:
   A. Clicks "Unlock Guardrail Plus" → /unlock-plus
   B. Clicks "Continue with free" → /results
   C. Explores FAQ
```

**Feeling:**
- Page acknowledges their experience
- Pricing feels contextual, not generic
- Upgrade feels like logical next step
- Free option still valid

---

## Testing Checklist

### ✅ Pre-Scan State
- [ ] Hero: "Simple pricing. Clear outcomes."
- [ ] Subhead: Generic about starting free
- [ ] Free tier: "Understand where risk exists"
- [ ] Free CTA: "Run free scan" (active button)
- [ ] Plus tier: "For acting with confidence"
- [ ] No "(current)" badge
- [ ] No snapshot header
- [ ] No score-aware microcopy
- [ ] Footer reassurance: "Upgrade at any time..."
- [ ] Footer CTA: "Run free scan" + "View modules"

### ✅ Post-Scan State
- [ ] Snapshot header: "Based on your latest..."
- [ ] Summary row with score, drivers, date
- [ ] Free tier: "You've identified..." (past tense)
- [ ] Free badge: "(current)"
- [ ] Free CTA: "Currently active" (static)
- [ ] Helper line: "Limited detail for follow-through"
- [ ] Plus tier: "See exactly why..." (action-oriented)
- [ ] Context line: "Plus unlocks the details..."
- [ ] Score-aware microcopy (if applicable)
- [ ] Comparison title: "What becomes clearer..."
- [ ] Column headers: "What you have" / "What unlocks"
- [ ] Footer CTA: "Unlock Plus" + "Continue free"

### ✅ Score-Aware Microcopy
- [ ] Shows only for elevated or low risk
- [ ] Hidden for moderate risk
- [ ] Hidden for pre-scan users
- [ ] Elevated: "Most teams with flagged areas..."
- [ ] Low: "Plus is commonly used for..."
- [ ] Never says "recommended" or "needed"

### ✅ Mobile
- [ ] Snapshot header stacks vertically
- [ ] Risk driver pills wrap cleanly
- [ ] Tier cards stack (not side-by-side)
- [ ] Comparison columns stack
- [ ] Footer CTAs stack
- [ ] Touch targets adequate (48px min)
- [ ] Readable within ~2 scrolls

---

## Success Metrics

### Qualitative
- ✅ Post-scan page feels contextual (not generic)
- ✅ Snapshot header grounds pricing in reality
- ✅ User feels acknowledged (journey recognized)
- ✅ Upgrade feels logical (not forced)
- ✅ Free tier still validated (not shamed)

### Quantitative
- Pre-scan → scan conversion rate
- Post-scan → upgrade rate (key metric)
- Time on page (post-scan should be shorter)
- Score-aware microcopy visibility
- Free vs Plus CTA click rates
- Return visits (decision time)

---

## Key Takeaway

**Generic pricing page:**
> "Here's what we offer. Choose a plan."

**State-aware pricing page:**
> "Based on what you've experienced, here's what unlocks next."

**The difference:**
- Generic: One-size-fits-all
- State-aware: Contextual to journey
- Generic: Educational only
- State-aware: Educational + actionable
- Generic: Same copy for everyone
- State-aware: Adapts to user state

**Result:**
- Higher conversion (contextual = relevant)
- Better fit upgrades (informed decision)
- Reduced friction (acknowledges journey)
- Professional credibility (smart system)

---

**Live demo:** `/state-aware-pricing-demo`  
**Component:** `/src/app/pages/StateAwarePricingPage.tsx`  
**Toggle:** Pre-scan ↔ Post-scan states

**Status:** Complete ✅
