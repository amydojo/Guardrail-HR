# Premium Pricing Modal — Design Specification

## Philosophy

**This is NOT a salesy paywall.**

This is a calm, Apple/Linear-style upgrade moment that feels:
- ✅ Credible (compliance-focused, professional)
- ✅ Optional (user agency preserved)
- ✅ Inevitable (logical next step when ready)
- ✅ Clarity-focused (not feature-dumping)

**Core Principle:**
> "Most teams upgrade when they're ready to take action — not just observe."

---

## Context

**User Journey:**
1. User completes free Wage & Hour diagnostic
2. Sees high-level risk score (72/100)
3. Can see risk categories and limited actions
4. Clicks locked feature (traceability, exports, tracking, etc.)
5. **Modal opens** ← We are here
6. User makes informed decision

**What User Already Knows:**
- They have compliance risk
- Free version showed them where risk exists
- They need deeper tools to act with confidence

---

## Modal Structure

### HEADER

**Title:**
```
Unlock deeper insight with Guardrail Plus
```
- 32px semibold (28px mobile)
- Direct, clear value proposition
- "Unlock" + "deeper insight" (clarity framing)
- Not "Upgrade now!" or "Get premium features!"

**Subhead:**
```
You've identified where risk exists.
Plus gives you the clarity and tools to act with confidence.
```
- 17px (16px mobile), gray-400
- 2 lines max
- Acknowledges free version value
- Positions Plus as next step (not replacement)
- "Clarity and tools" (not "features")
- "Act with confidence" (outcome-focused)

---

### BODY — VALUE EXPLANATION

**Intro Line:**
```
With Guardrail Plus, you can:
```
- 14px gray-500
- Sets up bullet list
- "You can" (empowerment framing)

**4 Bullets (Plain Language, No Hype):**

1. **"See exactly which answers drive each risk signal"**
   - Answer-level traceability
   - Specific, actionable capability
   - No marketing fluff

2. **"Follow a prioritized action plan ranked by effort and impact"**
   - Prioritization clarity
   - Effort × impact (practical framework)
   - Implies efficiency

3. **"Track score changes as your policies or workforce evolve"**
   - Reassessment tracking
   - "Policies or workforce" (real business changes)
   - Ongoing value proposition

4. **"Export clean reports for payroll, advisors, or internal review"**
   - Export functionality
   - "Clean reports" (quality signal)
   - Specific use cases (payroll, advisors)

**Bullet Design:**
- Small circle dot (1x1, gray-600)
- 15px text, gray-300
- 3.5px spacing between bullets
- Left-aligned
- No checkmarks (not a checklist)

**Disclaimer Beneath:**
```
No legal advice. Just structured, practical clarity.
```
- 13px gray-600
- Sets expectations (honesty)
- "Structured, practical clarity" (value framing)
- Trust-building through limitation acknowledgment

---

### FREE VS PLUS COMPARISON

**Section Title:**
```
What changes with Guardrail Plus
```
- 17px medium, gray-400
- Not "Pricing comparison" or "Choose your plan"
- Neutral, informational framing

**Layout:**
- **Desktop:** 2-column grid (side-by-side)
- **Mobile:** Stacked cards

---

#### LEFT COLUMN: Free Diagnostic

**Card Design:**
```
bg-[#161616]/40 (more transparent)
border-gray-900/30 (muted border)
rounded-[16px]
p-6
```

**Header:**
```
Free diagnostic
```
- 14px medium, gray-400
- Not "Basic" or "Limited"

**Items (4 checkmarks):**
```
✓ Overall risk score
✓ High-level risk categories
✓ Limited recommended actions
✓ One-time assessment view
```
- Check icon: 4x4, gray-600 (muted)
- Text: 14px gray-500
- Honest about limitations ("limited", "one-time")

**Subtext:**
```
Enough to spot risk. Limited detail for follow-through.
```
- 12px gray-600
- Two sentences: value + limitation
- Validates free tier
- Explains when upgrade makes sense

---

#### RIGHT COLUMN: Guardrail Plus

**Card Design:**
```
bg-[#161616] (solid, not transparent)
border-gray-900/50 (more defined)
rounded-[16px]
p-6
```

**Header:**
```
Guardrail Plus
```
- 14px medium, gray-300 (lighter than free)
- Product name (not "Premium" or "Pro")

**Items (5 checkmarks):**
```
✓ Answer-level traceability
✓ Prioritized action plan (effort × impact)
✓ Reassessment & score tracking
✓ Exportable reports (PDF, CSV, summary)
✓ Ongoing access to templates & guides
```
- Check icon: 4x4, gray-400 (lighter than free)
- Text: 14px gray-300 (lighter than free)
- More items than free (5 vs 4)
- Specific capabilities (not vague "advanced features")

**Subtext:**
```
Built for acting, documenting, and reassessing over time.
```
- 12px gray-500
- Three action verbs: acting, documenting, reassessing
- "Over time" (ongoing value)
- Clear use case positioning

---

**Optional Nudge (Beneath Comparison):**
```
Most teams upgrade when they're ready to take action — not just observe.
```
- 13px gray-600, centered
- Subtle social proof ("most teams")
- Non-urgent framing ("when they're ready")
- Observes vs acts (key distinction)
- Not "Limited time!" or "Don't miss out!"

---

### PRICING BLOCK

**Billing Toggle:**
```
[Monthly] [Annual]
```
- Two buttons, centered
- 14px text
- Active: bg-[#161616], gray-300, border
- Inactive: gray-600, hover gray-500
- Rounded-[10px]

**Price Display (Monthly):**
```
$49 / month
Billed monthly · Cancel anytime
```
- 48px semibold price
- 18px gray-500 "/ month"
- 13px gray-600 meta text
- Centered

**Price Display (Annual):**
```
$499 / year
Billed annually · 2 months free
```
- 48px semibold price
- 18px gray-500 "/ year"
- 13px gray-600 "2 months free" (not "SAVE 20%!")
- Factual benefit, not urgency
- Centered

**Helper Text:**
```
Designed for small teams. Cancel anytime.
```
- 12px gray-600
- Positions product (small teams)
- Reassures (cancel anytime)
- No commitment pressure

---

### CTA AREA

**Primary CTA:**
```
[Unlock Guardrail Plus]
```
- Full-width button
- py-4, px-6
- bg-[#5b6ff5] (brand blue)
- text-white, 15px font-medium
- rounded-[14px]
- hover:bg-[#4a5ee0]
- "Unlock" (not "Buy now" or "Get started")

**Secondary CTA:**
```
Continue with free version
```
- Full-width button (text style)
- py-4, px-6
- text-gray-500, 14px
- hover:text-gray-400
- "Continue with free version" (validates choice)
- Not "No thanks" or "Maybe later"

**Visual Hierarchy:**
- Primary button: solid, colored
- Secondary button: text-only, muted
- Both same height (equal weight)
- Clear two paths

---

### FOOTER TRUST LINE

```
Guardrail provides informational guidance only and does not replace legal counsel.
```
- 11px gray-600, centered
- Legal disclaimer
- Builds trust through honesty
- Manages expectations
- Standard compliance language

---

## Interaction Rules

### Modal Trigger
```
✅ Opens from clicking any locked feature
   - Traceability cards
   - Export buttons
   - Score breakdown links
   - History tracking

❌ Does NOT open:
   - On page load
   - Automatically after delay
   - On scroll trigger
   - On exit intent
```

**Why:**
- User-initiated only
- Contextual (they wanted that feature)
- Respectful, not aggressive

---

### Background Treatment
```
bg-black/85 backdrop-blur-md
```
- 85% black overlay
- Medium backdrop blur
- Dimmed but not opaque
- User can see context behind
- Premium feel

---

### Animation
```
animate-in fade-in slide-in-from-bottom-4 duration-300
```
- Gentle fade-in
- Slight slide-up (4px)
- 300ms duration
- Smooth, not jarring
- Apple-style entrance

---

### Close Behavior
```
✅ Can close via:
   - X button (top-right)
   - Escape key
   - Backdrop click
   - "Continue with free" button

❌ Does NOT:
   - Trap user
   - Require action to close
   - Show "Are you sure?" confirmation
```

**Why:**
- User agency preserved
- No dark patterns
- Respectful exit

---

## Visual Style

### Dark Theme Consistency

**Colors:**
```
Background:     bg-[#0a0a0a]
Cards:          bg-[#161616], bg-[#161616]/40
Borders:        border-gray-900/50, border-gray-900/30
Text primary:   text-gray-300
Text secondary: text-gray-400, text-gray-500
Text muted:     text-gray-600
Accent:         bg-[#5b6ff5]
```

**Matches Guardrail Product:**
- Same dark background
- Same border treatments
- Same text hierarchy
- Same accent color
- Seamless experience

---

### Elevation & Spacing

**Modal Container:**
```
rounded-[24px]
shadow-2xl
max-w-[680px]
px-12 py-12 (desktop)
px-8 py-10 (mobile)
```

**Section Spacing:**
```
mb-10 pb-10 border-b (major sections)
mb-8 (pricing area)
space-y-3 (CTA buttons)
```

**Internal Spacing:**
```
Bullet list: space-y-3.5
Comparison cards: gap-6 (desktop), gap-4 (mobile)
Price to meta: mb-2
```

**Generous Breathing Room:**
- Not cramped
- Premium feel
- Easy scanning
- Clear hierarchy

---

### Typography

**Hierarchy:**
```
Modal title:    32px semibold (28px mobile)
Section title:  17px medium
Card title:     14px medium
Body text:      15px (bullets), 14px (cards)
Meta text:      13px, 12px, 11px
Price:          48px semibold
```

**Weight Distribution:**
```
Semibold:  Title, price
Medium:    Section heads, card headers
Regular:   All body text
```

**Color Distribution:**
```
Lightest (gray-200):  [None in this modal]
Light (gray-300):     Bullet text, Plus card items
Medium (gray-400):    Subhead, section titles
Darker (gray-500):    Free card items, body text
Darkest (gray-600):   Meta text, disclaimers
```

---

### Lock Icons

**NOT USED IN THIS MODAL**

Why:
- Modal context already implies locked state
- No need for redundant visual cues
- Cleaner, more confident presentation
- Lock icons on trigger cards (outside modal)

If used elsewhere:
- 4x4 size
- gray-600 color
- Subtle, low-contrast
- Never red or prominent

---

## Mobile Optimization

### Layout Adjustments

**Header:**
```
Desktop: 32px title, 17px subhead
Mobile:  28px title, 16px subhead
```

**Comparison Cards:**
```
Desktop: 2-column grid (side-by-side)
Mobile:  Stacked (vertical)
```

**Card Padding:**
```
Desktop: p-6
Mobile:  p-5
```

**Card Text:**
```
Desktop: 14px items, 12px subtext
Mobile:  13px items, 11px subtext
```

**Modal Padding:**
```
Desktop: px-12 py-12
Mobile:  px-8 py-10
```

**Price:**
```
Desktop: 48px
Mobile:  48px (same - price is important)
```

---

### Touch Targets

**Buttons:**
```
py-4 (minimum 48px height)
Full-width on mobile
Clear tap zones
No tiny buttons
```

**Billing Toggle:**
```
px-4 py-2 (comfortable tap area)
3px gap between buttons
Clear active state
```

**Close Button:**
```
top-6 right-6
w-5 h-5 icon
Adequate hit area
```

---

## Tone & Language

### ✅ CALM, CREDIBLE, OPTIONAL

**Examples:**

**Header:**
- ✅ "Unlock deeper insight"
- ✅ "You've identified where risk exists"
- ❌ "Unlock your full potential!"
- ❌ "Don't let compliance slip through the cracks!"

**Value Bullets:**
- ✅ "See exactly which answers drive each risk signal"
- ✅ "Follow a prioritized action plan"
- ❌ "Get powerful analytics that drive results!"
- ❌ "Save hours with advanced automation!"

**Comparison:**
- ✅ "What changes with Guardrail Plus"
- ✅ "Enough to spot risk. Limited detail for follow-through."
- ❌ "Free vs Premium: Choose your plan"
- ❌ "Basic features vs Everything you need!"

**Nudge:**
- ✅ "Most teams upgrade when they're ready to take action"
- ❌ "Don't miss out on these premium features!"
- ❌ "Limited time: Save 20%!"

**CTAs:**
- ✅ "Unlock Guardrail Plus"
- ✅ "Continue with free version"
- ❌ "UPGRADE NOW!"
- ❌ "Start your trial"

---

### ❌ NO URGENCY, NO PRESSURE

**Avoided Patterns:**

**Urgency:**
- ❌ "Limited time offer"
- ❌ "Sale ends soon"
- ❌ Countdown timers
- ❌ "Only X spots left"

**Pressure:**
- ❌ "Don't miss out"
- ❌ "Everyone is upgrading"
- ❌ Exit-intent triggers
- ❌ "Are you sure?" on close

**Hype:**
- ❌ "Transform your compliance!"
- ❌ "10x your results!"
- ❌ "Game-changing features!"
- ❌ "Revolutionary platform!"

**Fear:**
- ❌ "Avoid costly mistakes!"
- ❌ "Protect your business!"
- ❌ Red warning colors
- ❌ Risk magnification

---

## Design References

### Apple Settings / iCloud Upgrade

**Similar Patterns:**
- Calm upgrade moment
- Clear value proposition
- Two pricing options (monthly/annual)
- "Not now" option clear
- Premium feel, not salesy
- Dark mode option
- Generous spacing

**Different:**
- We're more explicit about free tier value
- We show comparison (Apple often doesn't)
- We include optional nudge (Apple relies on familiarity)

---

### Linear Billing Page

**Similar Patterns:**
- Dark theme
- Minimal design
- Clear pricing tiers
- Toggle for billing cycle
- Calm, professional tone
- No urgency tactics
- Credible, not marketing-heavy

**Different:**
- We focus on clarity outcome (not features)
- We acknowledge free tier value
- We use compliance-appropriate language

---

### Stripe Billing Modal

**Similar Patterns:**
- Clean, focused modal
- Single decision point
- Professional presentation
- Trust signals (cancel anytime)
- Two clear CTAs
- No aggressive tactics

**Different:**
- We show free vs plus comparison
- We include subtle nudge
- We emphasize clarity over features

---

## Copy Breakdown

### HEADER COPY

```
Title: "Unlock deeper insight with Guardrail Plus"
```
- "Unlock" = positive action (not "upgrade")
- "Deeper insight" = outcome (not "features")
- "Guardrail Plus" = product name (brand consistency)

```
Subhead: "You've identified where risk exists.
Plus gives you the clarity and tools to act with confidence."
```
- Line 1: Acknowledges free tier value
- Line 2: Positions Plus as next step
- "Clarity and tools" = practical framing
- "Act with confidence" = outcome focus
- 2 lines total (scannable)

---

### VALUE BULLETS COPY

Each bullet follows pattern:
**[Action verb] + [Specific capability] + [Practical benefit]**

1. **"See exactly which answers drive each risk signal"**
   - Action: See
   - Capability: Answer-level traceability
   - Benefit: Understand root causes

2. **"Follow a prioritized action plan ranked by effort and impact"**
   - Action: Follow
   - Capability: Prioritization framework
   - Benefit: Efficiency (effort × impact)

3. **"Track score changes as your policies or workforce evolve"**
   - Action: Track
   - Capability: Reassessment over time
   - Benefit: Ongoing monitoring

4. **"Export clean reports for payroll, advisors, or internal review"**
   - Action: Export
   - Capability: Report generation
   - Benefit: Share with stakeholders

---

### COMPARISON COPY

**Free Card Title:**
```
"Free diagnostic"
```
- Not "Basic" (negative)
- Not "Limited" (punishing)
- Neutral, factual

**Free Card Items:**
```
✓ Overall risk score
✓ High-level risk categories
✓ Limited recommended actions
✓ One-time assessment view
```
- Honest about scope
- "Limited" and "one-time" (transparent)
- No hiding limitations

**Free Card Subtext:**
```
"Enough to spot risk. Limited detail for follow-through."
```
- Validates free tier ("enough to spot risk")
- Explains limitation ("limited detail")
- Suggests upgrade timing ("for follow-through")

---

**Plus Card Title:**
```
"Guardrail Plus"
```
- Product name (consistent branding)
- Not "Premium" or "Pro" (generic)

**Plus Card Items:**
```
✓ Answer-level traceability
✓ Prioritized action plan (effort × impact)
✓ Reassessment & score tracking
✓ Exportable reports (PDF, CSV, summary)
✓ Ongoing access to templates & guides
```
- Specific capabilities (not vague)
- Includes format details (PDF, CSV)
- "Ongoing access" (continuous value)

**Plus Card Subtext:**
```
"Built for acting, documenting, and reassessing over time."
```
- Three action verbs (clear use cases)
- "Over time" (ongoing relationship)
- Practical, not aspirational

---

### NUDGE COPY

```
"Most teams upgrade when they're ready to take action — not just observe."
```
- Social proof ("most teams") without numbers
- Temporal framing ("when ready") - no urgency
- Key distinction: "action" vs "observe"
- Em dash for emphasis (— not –)
- Subtle, not pushy

---

### PRICING COPY

**Monthly:**
```
$49 / month
Billed monthly · Cancel anytime
```

**Annual:**
```
$499 / year
Billed annually · 2 months free
```
- "2 months free" (factual benefit)
- Not "Save 20%!" (urgency framing)
- Not "Best value!" (pressure)

**Helper:**
```
Designed for small teams. Cancel anytime.
```
- Positions product (small teams)
- Reassures (cancel anytime)
- Two sentences, period-separated

---

### CTA COPY

**Primary:**
```
"Unlock Guardrail Plus"
```
- "Unlock" (positive action)
- Product name (clarity)
- Not "Get started" (vague)
- Not "Buy now" (transactional)

**Secondary:**
```
"Continue with free version"
```
- "Continue" (ongoing relationship)
- "Free version" (validates choice)
- Not "No thanks" (negative)
- Not "Maybe later" (procrastination)

---

### FOOTER COPY

```
"Guardrail provides informational guidance only and does not replace legal counsel."
```
- Standard disclaimer
- Clear scope limitation
- Trust-building honesty
- Compliance-appropriate

---

## Testing Checklist

### ✅ Content
- [ ] Header: "Unlock deeper insight with Guardrail Plus"
- [ ] Subhead: 2 lines max
- [ ] 4 value bullets present
- [ ] Disclaimer: "No legal advice..."
- [ ] Comparison: "What changes with..."
- [ ] Free card: 4 items + subtext
- [ ] Plus card: 5 items + subtext
- [ ] Optional nudge present
- [ ] Pricing: Monthly + Annual options
- [ ] Primary CTA: "Unlock Guardrail Plus"
- [ ] Secondary CTA: "Continue with free"
- [ ] Footer: Legal disclaimer

### ✅ Visual
- [ ] Dark theme (bg-[#0a0a0a])
- [ ] Rounded-[24px] modal
- [ ] Generous spacing (px-12 py-12)
- [ ] 2-column comparison (desktop)
- [ ] Stacked comparison (mobile)
- [ ] Billing toggle works
- [ ] No urgency visuals (no red, no timers)

### ✅ Interaction
- [ ] Opens on locked feature click
- [ ] Does NOT open on page load
- [ ] Close via X button
- [ ] Close via Escape key
- [ ] Close via backdrop click
- [ ] Close via "Continue with free"
- [ ] Smooth animation (300ms)
- [ ] No "Are you sure?" trap

### ✅ Tone
- [ ] Calm, not urgent
- [ ] Credible, not salesy
- [ ] Optional, not required
- [ ] Clarity-focused, not feature-dumping
- [ ] No hype language
- [ ] No pressure tactics
- [ ] "Continue with free" feels valid

---

## Success Metrics

### Qualitative
- ✅ Feels like upgrade clarity (not upsell)
- ✅ Free tier still feels valuable
- ✅ User agency preserved
- ✅ Matches Guardrail design language
- ✅ Builds trust (doesn't erode it)

### Quantitative
- Free-to-Plus conversion rate
- Time in modal (reading = good)
- "Continue with free" click rate (validation)
- Support tickets about Plus (should be low)
- Churn rate for Plus (honesty reduces regret)

---

## Key Takeaway

**Traditional paywall feeling:**
> "I'm blocked from features I need. I have to upgrade."

**Premium pricing modal feeling:**
> "I understand what Plus offers. I can upgrade when I'm ready to act, or continue with free."

This modal feels like:
- ✅ An informed decision moment
- ✅ Clarity about next steps
- ✅ Respect for user agency
- ✅ Premium product experience

Not like:
- ❌ A sales pitch
- ❌ A blocking paywall
- ❌ An urgent conversion funnel
- ❌ A bait-and-switch

---

**Demo available at `/pricing-modal-demo`**

**Component:** `/src/app/components/PremiumPricingModal.tsx`

**Status:** Complete
