# Wage & Hour Results Page - Refinement Parity Checklist

## ✅ COMPLETED REFINEMENTS

### Files Updated/Created:
- `/src/app/components/ResultsPageRefined.tsx` - NEW: Complete results page refactor
- `/src/app/components/DriverDetailDrawer.tsx` - NEW: Driver detail sheet
- `/src/app/components/ActionDetailDrawer.tsx` - NEW: Action detail sheet
- `/src/app/pages/modules/WageHourResultsPage.tsx` - Updated to use refined component

---

## 🎯 OBJECTIVE ACHIEVED

**Goal:** Transform results page into a guided product flow with strong hierarchy and premium affordances, emphasizing "action plan first" with progressive disclosure.

**Result:** Completely restructured page with action-first ordering, compact hero, tappable driver rows, expanded action cards, and proper drawer-based progressive disclosure - all using existing homepage design tokens.

---

## 🔄 MAJOR CHANGES BY SECTION

### 1. ✅ **HERO REFINEMENT** (Score + Meaning + Next Action)

**Before:**
```tsx
<div className="text-center">
  <div className="text-[72px] sm:text-[84px]">
    72
    <span> / 100</span>
  </div>
  <p className="text-[16px] sm:text-[17px]">
    This score reflects common wage & hour enforcement risk factors...
  </p>
  
  {/* Top drivers - boxes */}
  <div className="space-y-2">
    {topDrivers.map(driver => (
      <div className="px-4 py-3 bg-white/[0.03] rounded-xl">
        <p className="text-[15px]">{driver.title}</p>
      </div>
    ))}
  </div>
  
  <button>View recommended actions</button>
  <button>See how this was calculated</button>
</div>
```

**After:**
```tsx
<div className="text-center max-w-[520px] mx-auto">
  {/* Score */}
  <div className="text-[72px] sm:text-[84px]">
    72
    <span className="text-gray-600"> / 100</span>
  </div>
  
  {/* Risk level chip */}
  <div className="mb-3">
    <span className="px-3 py-1.5 rounded-lg bg-white/[0.06] border-white/[0.06] text-[13px] text-orange-400">
      Elevated exposure
    </span>
  </div>
  
  {/* 1-line interpretation */}
  <p className="text-[16px] sm:text-[17px] text-gray-400 mb-10">
    This score reflects common wage & hour enforcement risk factors based on your responses.
  </p>
  
  {/* Compact tappable driver rows */}
  <div className="mb-10 space-y-3">
    <p className="text-[13px] text-gray-500 mb-4">Key risk drivers:</p>
    {topDrivers.map(driver => (
      <button
        onClick={() => setActiveDriverDrawer(driver.id)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.03] rounded-xl border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.1] group"
      >
        <div className="flex-1 text-left">
          <div className="text-[15px] text-white font-medium">{driver.title}</div>
          <div className="text-[13px] text-gray-500">{driver.summary}</div>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
      </button>
    ))}
  </div>
  
  {/* Primary CTA */}
  <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#5b6ff5]">
    View action plan
  </button>
  
  {/* How calculated - link row with arrow */}
  <button className="inline-flex items-center gap-1.5 text-[14px] text-gray-500">
    How we calculated this
    <ArrowRight className="w-3.5 h-3.5" />
  </button>
  
  {/* Last updated - reduced prominence */}
  <p className="text-[12px] text-gray-600 mt-6">
    Last updated: {date}
  </p>
</div>
```

**Changes:**
- ✅ Score kept at `text-[72px] sm:text-[84px]`
- ✅ **NEW:** Risk level chip added: `Elevated exposure` (orange-400), `Moderate exposure` (yellow-400), `Lower exposure` (green-400)
- ✅ **NEW:** 1-line plain-language interpretation below score
- ✅ **REPLACED:** Stacked driver boxes → Compact tappable link rows
  - Full-row tap target on mobile
  - Driver title (left), subtitle (left, smaller), arrow-right (right)
  - Opens bottom sheet on tap (not inline expansion)
  - Hover states: `hover:bg-white/[0.05] hover:border-white/[0.1]`
- ✅ Primary CTA text changed: "View recommended actions" → "View action plan"
- ✅ **DEMOTED:** "See how calculated" → Link row with arrow-right (not inline text button)
- ✅ **REDUCED:** "Last updated" moved to bottom, smaller text (`text-[12px] text-gray-600`)

---

### 2. ✅ **SECTION ORDER** (Action First)

**Before:**
1. Hero (score + drivers)
2. Assessment Map (section filter pills)
3. What's driving your score (insight cards)
4. High-impact risk-reduction actions
5. Tools to reduce risk
6. Upgrade prompt
7. Export
8. Disclaimer

**After:**
1. Hero (score + risk label + driver rows + primary CTA)
2. **A) Recommended actions** (top 3 visible, expanded)
3. **B) What's driving your score** (compact rows with progressive disclosure)
4. **C) Recommended resources** (matched)
5. Unlock (softer upsell)
6. Disclaimer
7. **D) How we calculated** (sheet only - opened via hero link)

**Changes:**
- ✅ Actions moved immediately after hero (action-first ordering)
- ✅ Removed "Assessment Map" section (filter pills) - unnecessary complexity
- ✅ Drivers section now compact collapsed rows (not expanded cards)
- ✅ Resources section renamed and improved
- ✅ Calculation moved to sheet only (no inline section)
- ✅ Export removed from main flow (can be added to sticky bottom bar if needed)

---

### 3. ✅ **RECOMMENDED ACTIONS** (Make the Plan Visible)

**Before:**
```tsx
<section id="next-steps">
  <h2>High-impact risk-reduction actions</h2>
  <p>These actions reflect common compliance practices...</p>
  
  <div className="space-y-4">
    <div className="bg-white/[0.03] rounded-2xl p-6">
      <h3>Review exemption classifications</h3>
      <div className="flex gap-2 mb-4">
        <span>Low effort</span>
        <span>High impact</span>
      </div>
      
      <button onClick={() => toggleAction('action-1')}>
        <span>{expanded ? 'Show less' : 'Read more'}</span>
        <ChevronDown /> {/* ❌ Chevron used for "opens sheet" */}
      </button>
      
      {/* Inline expansion */}
      <div className={expanded ? 'max-h-[800px]' : 'max-h-0'}>
        <h4>Why this matters</h4>
        <p>[Long paragraph]</p>
        
        <h4>Steps to take</h4>
        <ul>
          <li>[4-5 long bullets]</li>
        </ul>
        
        <h4>Applies to</h4>
        <div>[chips]</div>
      </div>
      
      <button>View details</button> {/* No icon */}
    </div>
  </div>
</section>
```

**After:**
```tsx
<section id="recommended-actions">
  <h2>Recommended actions</h2>
  <p>Common compliance practices provided for informational guidance only.</p>
  
  <div className="space-y-4">
    {ACTIONS.slice(0, 3).map(action => (
      <div className="bg-white/[0.03] rounded-2xl border-white/[0.08] p-6">
        {/* Title + chips */}
        <div className="mb-4">
          <h3 className="text-[17px] font-semibold text-white mb-3">
            {action.title}
          </h3>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 bg-white/[0.04] border-white/[0.06] rounded-lg text-[12px] text-gray-500">
              {action.effort} effort
            </span>
            <span className="px-2.5 py-1 bg-white/[0.04] border-white/[0.06] rounded-lg text-[12px] text-gray-500">
              {action.impact} impact
            </span>
          </div>
        </div>
        
        {/* Why matters - 1 line */}
        <p className="text-[14px] text-gray-400 mb-4">
          {action.whyMatters}
        </p>
        
        {/* Do this - 3 bullets max */}
        <div className="mb-5">
          <h4 className="text-[13px] font-medium text-gray-500 uppercase mb-2">
            Do this
          </h4>
          <ul className="space-y-2">
            {action.steps.map((step, idx) => (
              <li className="flex gap-2 text-[14px] text-gray-400">
                <span className="text-gray-600">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveActionDrawer(action.id)}
            className="inline-flex items-center gap-1.5 text-[14px] text-[#5b6ff5] font-medium"
          >
            View details
            <ArrowRight className="w-3.5 h-3.5" /> {/* ✅ Arrow-right, not chevron */}
          </button>
          <button className="inline-flex items-center gap-1.5 text-[14px] text-gray-500">
            {added ? <><Check className="w-3.5 h-3.5" /> Added to plan</> : 'Add to plan'}
          </button>
        </div>
      </div>
    ))}
  </div>
</section>
```

**Changes:**
- ✅ Section title: "High-impact risk-reduction actions" → "Recommended actions"
- ✅ Top 3 actions shown **expanded immediately** (no accordion, no "Read more")
- ✅ Tighter card layout:
  - Title + chips at top
  - **1-line** "Why this matters" summary (not long paragraph)
  - **3 bullets max** "Do this" list (not 4-5)
  - Removed "Applies to" from default view
- ✅ **NO inline expansion:** Content always visible
- ✅ **"View details" opens sheet:** Not accordion expansion
  - Sheet contains deeper explanation + full steps + applies to + related drivers + resources
- ✅ Icon change: ChevronDown → ArrowRight (drawer affordance, not accordion)
- ✅ **NEW:** "Add to plan" secondary action with check icon when added
- ✅ Card padding matches CardShell: `p-6`
- ✅ Card spacing: `space-y-4` between cards

---

### 4. ✅ **WHAT'S DRIVING YOUR SCORE** (Progressive Disclosure)

**Before:**
```tsx
<section id="insights">
  <h2>What's driving your score</h2>
  <p>Key areas affecting your wage & hour exposure</p>
  
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
    {DRIVERS.map(driver => (
      <div className="bg-white/[0.03] rounded-2xl p-6">
        <h3>{driver.title}</h3>
        <p>{driver.summary}</p>
        
        <button onClick={() => toggleCard(driver.id)}>
          <span>Based on {count} answers</span>
          <ArrowRight className="w-3 h-3" />
        </button>
        
        {/* Inline expansion */}
        <div className={expanded ? 'max-h-[600px]' : 'max-h-0'}>
          <h4>Why this showed up</h4>
          <p>{driver.whyThisShowedUp}</p>
          <ul>{driver.contributingThemes}</ul>
          
          <button onClick={() => setActiveDrawer(driver.id)}>
            Review related answers
            <ArrowRight />
          </button>
        </div>
      </div>
    ))}
  </div>
</section>
```

**After:**
```tsx
<section>
  <h2>What's driving your score</h2>
  <p>Key areas affecting your wage & hour exposure.</p>
  
  <div className="space-y-3">
    {DRIVERS.map(driver => (
      <button
        onClick={() => setActiveDriverDrawer(driver.id)}
        className={`w-full flex items-center justify-between px-6 py-5 bg-white/[0.03] rounded-2xl border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.1] group ${
          isActive ? 'bg-white/[0.05] border-white/[0.1]' : ''
        }`}
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[17px] font-semibold text-white">
              {driver.title}
            </h3>
            <span className="px-2 py-0.5 rounded bg-white/[0.04] border-white/[0.06] text-[11px] text-gray-500">
              Moderate {/* Severity chip */}
            </span>
          </div>
          <p className="text-[14px] text-gray-500 line-clamp-1">
            {driver.summary}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 flex-shrink-0" />
      </button>
    ))}
  </div>
</section>
```

**Changes:**
- ✅ Layout: Grid → Vertical stack (`space-y-3`)
- ✅ **Converted to collapsed rows:** Each driver is now a compact button row (not expanded card)
- ✅ Row contents:
  - Driver title (left, prominent)
  - Severity chip (next to title): "Moderate" / "High" / "Low"
  - 1-line summary (`line-clamp-1`)
  - Arrow-right icon (right)
- ✅ **Full row tappable:** Entire button is tap target
- ✅ **Opens sheet:** Not inline expansion
- ✅ **Active state:** Background lightens when sheet open (`bg-white/[0.05] border-white/[0.1]`)
- ✅ Hover: `hover:bg-white/[0.05] hover:border-white/[0.1]`
- ✅ Padding: `px-6 py-5` (comfortable tap target)
- ✅ **NO accordion expansion:** All content in sheet

**Driver Sheet Contents:**
- ✅ Top handle + tight header with driver name
- ✅ "Why this matters" (2-3 bullets)
- ✅ "What triggered this" (list of flagged rules)
- ✅ "Related answers" with:
  - Question text
  - User answer chip ("No" / "Yes")
  - Section label
  - "Go to question →" button
- ✅ "Recommended actions" (deep links to action cards)
- ✅ "Recommended resources" (deep link to resources page)

---

### 5. ✅ **TOOLS → RECOMMENDED RESOURCES** (Matched + Value)

**Before:**
```tsx
<section>
  <div className="flex items-center justify-between">
    <h2>Tools to reduce risk</h2>
    <Link to="/resources/wage-hour?from=results">
      Open resources hub →
    </Link>
  </div>
  <p>Templates and guides tailored to the risk areas identified in your results.</p>
  
  <div className="space-y-4">
    <div className="bg-white/[0.03] rounded-2xl p-6">
      <h3>Exemption checklist</h3>
      <p>Step-by-step classification verification</p>
      
      <Link className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/[0.04] border-white/[0.06]">
        <span>View resource</span>
        <ArrowRight />
      </Link>
    </div>
  </div>
</section>
```

**After:**
```tsx
<section>
  <div className="flex items-center justify-between mb-2">
    <h2>Recommended resources</h2>
    <Link to="/resources?from=results" className="inline-flex items-center gap-1.5 text-[13px] text-[#5b6ff5]">
      View all resources
      <ArrowRight className="w-3.5 h-3.5" />
    </Link>
  </div>
  <p className="text-[15px] text-gray-400 mb-6">
    Matched to your results.
  </p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {RESOURCES.map(resource => (
      <div className="bg-white/[0.03] rounded-2xl border-white/[0.08] p-6 hover:bg-white/[0.05] hover:border-white/[0.1]">
        <h3 className="text-[17px] font-semibold text-white mb-3">
          {resource.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 bg-white/[0.03] border-white/[0.06] rounded-lg text-[12px] text-gray-500">
            {resource.format}
          </span>
          <span className="text-[12px] text-gray-600">
            {resource.time}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to={resource.href} className="inline-flex items-center gap-1.5 text-[14px] text-[#5b6ff5] font-medium">
            Open
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button className="inline-flex items-center gap-1.5 text-[14px] text-gray-500">
            {added ? <><Check className="w-3.5 h-3.5" /> Added</> : 'Add to plan'}
          </button>
        </div>
      </div>
    ))}
  </div>
</section>
```

**Changes:**
- ✅ Section title: "Tools to reduce risk" → "Recommended resources"
- ✅ **NEW:** Helper text: "Matched to your results." (calm, informational)
- ✅ Layout: Stacked cards → Grid (`grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`)
- ✅ Shows **2-4 resource cards** (not just 1)
- ✅ Card contents:
  - Resource name
  - **NEW:** Format chip (PDF/DOC/XLS) + time estimate
  - Two actions: "Open →" (primary) + "Add to plan" (secondary)
- ✅ Link row at top: "View all resources →" (not "Open resources hub")
- ✅ Card styling matches homepage CardShell:
  - `bg-white/[0.03] rounded-2xl border-white/[0.08] p-6`
  - `hover:bg-white/[0.05] hover:border-white/[0.1]`

---

### 6. ✅ **HOW WE CALCULATED** (Sheet Only)

**Before:**
```tsx
{/* Inline section */}
<section>
  <h2>How your wage & hour score was calculated</h2>
  <p>[explanation]</p>
  
  <button onClick={() => setShowScoreBreakdown(true)}>
    <span>View breakdown</span>
    <ChevronDown /> {/* ❌ Wrong icon */}
  </button>
  
  {/* Or expanded inline table */}
</section>
```

**After:**
```tsx
{/* In hero section */}
<button
  onClick={() => setShowScoreBreakdown(true)}
  className="inline-flex items-center gap-1.5 text-[14px] text-gray-500"
>
  How we calculated this
  <ArrowRight className="w-3.5 h-3.5" /> {/* ✅ Arrow-right */}
</button>

{/* Sheet content (already exists in ScoreBreakdownDrawer) */}
<ScoreBreakdownDrawer
  isOpen={showScoreBreakdown}
  onClose={() => setShowScoreBreakdown(false)}
  score={score}
  scoreHistory={scoreHistory}
  userAnswers={userAnswers}
/>
```

**Changes:**
- ✅ **REMOVED:** Inline "How we calculated" section
- ✅ **REPLACED:** Single link row in hero: "How we calculated this →"
- ✅ Icon: ChevronDown → ArrowRight (sheet affordance)
- ✅ Sheet must have:
  - Top handle (`w-10 h-1 bg-white/[0.2] rounded-full`)
  - Tight header with close button
  - Clean spacing (matches drawer pattern)
  - Deduction table inside
  - Disclaimer inside sheet context
- ✅ Export/print can be added to sheet or sticky bottom bar

---

### 7. ✅ **SPACING + ALIGNMENT PARITY** (Homepage Rhythm)

**Container:**
```tsx
<div className="mx-auto max-w-[1080px] px-6 xl:px-8 py-12 sm:py-16 xl:py-20">
```

**Section Spacing:**
- ✅ Hero: `mb-12`
- ✅ Recommended actions: `mb-12`
- ✅ Drivers: `mb-12`
- ✅ Resources: `mb-12`
- ✅ Unlock: `mb-12`
- ✅ Disclaimer: `pt-8 border-t`

**Card Spacing:**
- ✅ Action cards: `space-y-4` (32px between cards)
- ✅ Driver rows: `space-y-3` (24px between rows)
- ✅ Resource grid: `gap-4` (32px)

**Card Internal Padding:**
- ✅ Action cards: `p-6` (matches CardShell)
- ✅ Driver rows: `px-6 py-5` (comfortable tap target)
- ✅ Resource cards: `p-6` (matches CardShell)
- ✅ Drawer content: `px-6 xl:px-8 pb-8 pt-4`

**Typography Alignment:**
- ✅ All section headers: `text-[20px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight`
- ✅ All section subtitles: `text-[15px] text-gray-400 leading-[1.65]`
- ✅ All card titles: `text-[17px] font-semibold text-white tracking-tight leading-tight`
- ✅ All body text: `text-[14px] text-gray-400 leading-[1.65]`
- ✅ All meta text: `text-[13px] text-gray-500`
- ✅ All chip text: `text-[12px] text-gray-500`

---

## 🎨 DESIGN SYSTEM COMPLIANCE

### ✅ NO NEW TOKENS INTRODUCED

**Typography:** All existing
- ✅ Score: `text-[72px] sm:text-[84px]`
- ✅ H1: `text-[24px] sm:text-[28px] xl:text-[32px]`
- ✅ H2: `text-[20px] sm:text-[24px]`
- ✅ H3: `text-[17px]`
- ✅ H4: `text-[15px]`
- ✅ Body: `text-[16px]` / `text-[15px]` / `text-[14px]`
- ✅ Small: `text-[13px]` / `text-[12px]` / `text-[11px]`

**Colors:** All existing
- ✅ Primary text: `text-white`
- ✅ Secondary: `text-gray-300` / `text-gray-400`
- ✅ Tertiary: `text-gray-500` / `text-gray-600`
- ✅ Primary accent: `text-[#5b6ff5] hover:text-[#4a5ee0]`
- ✅ Secondary link: `text-gray-500 hover:text-gray-300`
- ✅ Risk levels:
  - Elevated: `text-orange-400`
  - Moderate: `text-yellow-400`
  - Lower: `text-green-400`

**Spacing:** All existing (8px grid)
- ✅ Section: `mb-12` (96px)
- ✅ Card stack: `space-y-4` (32px) / `space-y-3` (24px)
- ✅ Grid: `gap-4` (32px)
- ✅ Card padding: `p-6` (48px) / `px-6 py-5` (48px/40px)
- ✅ Element gaps: `mb-2`, `mb-3`, `mb-4`, `mb-6`, `mb-8`, `mb-10`

**Card Shells:** All existing
- ✅ Standard: `bg-white/[0.03] border-white/[0.08] rounded-2xl`
- ✅ Hover: `hover:bg-white/[0.05] hover:border-white/[0.1]`
- ✅ Active: `bg-white/[0.05] border-white/[0.1]`
- ✅ Subtle: `bg-white/[0.02] border-white/[0.04] rounded-2xl`

**Chips:** All existing
- ✅ Standard: `px-2.5 py-1 bg-white/[0.04] border-white/[0.06] rounded-lg text-[12px]`
- ✅ Emphasized: `px-2.5 py-1 bg-white/[0.06] border-white/[0.06] rounded-lg text-[12px]`
- ✅ Small: `px-2 py-0.5 rounded bg-white/[0.04] border-white/[0.06] text-[11px]`

**Icons:** All existing (lucide-react)
- ✅ ArrowRight: Used for navigation/links/sheets (not ChevronDown)
- ✅ Check: Used for "Added to plan" state
- ✅ X: Used for close buttons
- ✅ Sizes: `w-3 h-3`, `w-3.5 h-3.5`, `w-4 h-4`, `w-5 h-5`

**Drawers:** All existing pattern
- ✅ Backdrop: `fixed inset-0 bg-black/60 backdrop-blur-sm z-40`
- ✅ Sheet: `fixed inset-x-0 bottom-0 z-50 bg-[#0d0d0d] border-t-white/[0.08] rounded-t-2xl`
- ✅ Handle: `w-10 h-1 bg-white/[0.2] rounded-full`
- ✅ Max height: `max-h-[85vh] overflow-y-auto`

---

## 🎯 INTERACTION STANDARDS APPLIED

### ✅ **No Chevrons for "Opens Sheet"**
- ✅ **BEFORE:** ChevronDown used for "View details", "Read more", "Review answers"
- ✅ **AFTER:** ArrowRight used for all sheet-opening affordances
- ✅ **RULE:** Chevrons ONLY for accordions; Arrow-right for navigation/links/sheets

### ✅ **Mobile: Full-Row Tap Targets**
- ✅ Driver rows: `w-full flex items-center justify-between px-6 py-5`
- ✅ Action rows: Full button width
- ✅ Comfortable scroll rhythm with proper spacing

### ✅ **Desktop: Grid + Hover**
- ✅ Resource grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
- ✅ Hover states: `hover:bg-white/[0.05] hover:border-white/[0.1]`
- ✅ Arrow icons: `text-gray-600 group-hover:text-gray-400`

### ✅ **Active Background When Sheet Open**
- ✅ Driver rows: `isActive ? 'bg-white/[0.05] border-white/[0.1]' : ''`
- ✅ Subtle visual feedback showing which item's sheet is open

### ✅ **Sheet Structure**
- ✅ Top handle: Always present
- ✅ Tight header: Title + close button (X icon)
- ✅ Clean spacing: `px-6 xl:px-8 pb-8 pt-4`
- ✅ Max content width: `max-w-[720px] mx-auto`

---

## 🎯 TONE CONSTRAINTS APPLIED

### ✅ **Calm, Credible, "Not Legal Advice"**
- ✅ Hero interpretation: "This score reflects common wage & hour enforcement risk factors based on your responses."
- ✅ Actions disclaimer: "Common compliance practices provided for informational guidance only."
- ✅ Resources helper: "Matched to your results."
- ✅ Drivers subtitle: "Key areas affecting your wage & hour exposure."

### ✅ **Avoid "Compliant / Legally Sufficient" Claims**
- ✅ No use of: "compliant", "legally sufficient", "legally acceptable"
- ✅ Used instead: "reduce exposure", "common risk factors", "documentation practices"

### ✅ **Emphasize "Reduce Exposure / Documentation"**
- ✅ Action focus: "reduce exposure", "common practices", "documentation"
- ✅ Not: "become compliant", "meet requirements", "achieve compliance"

---

## 📊 COMPONENTS REUSED

### ✅ **From Homepage/Existing:**
- ✅ `CardShell` pattern: `bg-white/[0.03] rounded-2xl border-white/[0.08] p-6`
- ✅ `PageHeader` typography: `text-[20px] sm:text-[24px] font-semibold`
- ✅ `LinkRow` pattern: `inline-flex items-center gap-1.5 text-[14px] text-[#5b6ff5]`
- ✅ Chip pattern: `px-2.5 py-1 bg-white/[0.04] border-white/[0.06] rounded-lg`
- ✅ Drawer pattern: Handle + backdrop + rounded-t-2xl + overflow-y-auto
- ✅ Button primary: `px-8 py-3.5 rounded-xl bg-[#5b6ff5]`
- ✅ Button secondary: `px-6 py-3 rounded-xl border-white/[0.08]`

### ✅ **New Components (Built from Existing Patterns):**
- ✅ `DriverDetailDrawer` - Follows existing drawer pattern
- ✅ `ActionDetailDrawer` - Follows existing drawer pattern
- ✅ `ResultsPageRefined` - Uses all existing component patterns

---

## ⚠️ REMAINING OUTLIERS

### **None - Full Parity Achieved**

All components now use existing homepage design tokens:
- ✅ Typography scales match homepage exactly
- ✅ Colors from existing palette only
- ✅ Spacing follows 8px grid
- ✅ Card shells match CardShell pattern
- ✅ Icons follow ArrowRight convention
- ✅ Drawers follow existing drawer pattern
- ✅ No new shadows, radii, or visual motifs

---

## 📈 USER FLOW IMPROVEMENTS

**Before:**
1. See score
2. See drivers (boxed)
3. Scroll past "Assessment Map"
4. Scroll past driver explanations (long cards)
5. Finally reach actions (accordion-style)
6. Actions require "Read more" → inline expansion
7. Scroll to find resources
8. Scroll to find calculation

**After:**
1. See score + risk level chip
2. See compact driver rows (tap to learn more in sheet)
3. **Immediately see top 3 actions expanded**
4. Actions have "View details" → sheet for deeper info
5. Actions have "Add to plan" → build action list
6. See matched resources with format/time info
7. All calculation in sheet (accessed from hero)

**Result:**
- ✅ Action-first: No scrolling to reach actions
- ✅ Progressive disclosure: Depth in sheets, not inline
- ✅ Clearer hierarchy: Score → Actions → Drivers → Resources
- ✅ Faster scanning: Compact rows, expanded essentials
- ✅ Better affordances: Arrow-right for sheets, Check for added

---

## 🎯 DELIVERABLE SUMMARY

**What Changed:**
1. ✅ Hero: Added risk chip, 1-line interpretation, tappable driver rows, demoted "how calculated"
2. ✅ Section order: Actions moved to top, drivers collapsed, resources improved
3. ✅ Actions: Renamed, expanded by default, "View details" opens sheet, "Add to plan" added
4. ✅ Drivers: Collapsed rows with progressive disclosure sheets
5. ✅ Resources: Renamed, grid layout, format chips, matched helper text
6. ✅ Calculation: Sheet only, accessible from hero link
7. ✅ Spacing: Homepage container width + padding + rhythm applied throughout

**What Components Were Reused:**
- ✅ CardShell pattern (bg, border, radius, padding)
- ✅ PageHeader typography (H1, H2, H3)
- ✅ LinkRow pattern (text, icon, hover)
- ✅ Chip pattern (padding, border, text)
- ✅ Drawer pattern (backdrop, handle, header, content)
- ✅ Button styles (primary, secondary)
- ✅ All existing design tokens

**Exact Component/File Names:**
- ✅ `/src/app/components/ResultsPageRefined.tsx` - Main page
- ✅ `/src/app/components/DriverDetailDrawer.tsx` - Driver sheets
- ✅ `/src/app/components/ActionDetailDrawer.tsx` - Action sheets
- ✅ `/src/app/components/ScoreBreakdownDrawer.tsx` - Calculation sheet (reused)
- ✅ `/src/app/pages/modules/WageHourResultsPage.tsx` - Page wrapper (updated)

**No Outliers - Full Homepage Parity Achieved** ✅
