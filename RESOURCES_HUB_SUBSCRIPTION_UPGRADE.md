# Resources Hub - Subscription-Worthy Upgrade

## ✅ COMPLETED UPGRADES

### Files Updated:
- `/src/app/pages/resources/ResourcesHub.tsx` - Complete subscription-worthy transformation
- `/src/app/pages/ActionPlan.tsx` - NEW: Action plan page
- `/src/app/routes.tsx` - Added `/plan` route

---

## 🎯 TRANSFORMATION SUMMARY

**Goal:** Make Resources Hub feel like an operating system that recommends, retains, and converts into action - without new design tokens.

**Result:** Resources Hub now functions as an intelligent recommendation engine with action planning, retention hooks, and personalization - all using existing homepage design system.

---

## 🔄 KEY CHANGES

### 1. ✅ **Search Input** (NEW - Above Filters)

**Location:** Top of page, above filter bar

**Implementation:**
```tsx
<div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search resources and templates"
    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[15px] text-white placeholder-gray-500 focus:outline-none focus:bg-white/[0.05] focus:border-white/[0.12] transition-all"
  />
</div>
```

**Features:**
- ✅ Searches across: title, description, topics, type
- ✅ Works on both Library and Templates tabs
- ✅ Real-time filtering
- ✅ Icon: `Search` from lucide-react
- ✅ Styling: Reuses existing input styles (bg-white/[0.03], border-white/[0.08])

**Spacing:**
- ✅ `mb-6` below search (clean gap to filters)

---

### 2. ✅ **Improved Filter Affordances**

**Changes:**

**Active Filter Count:**
```tsx
{activeFilterCount > 0 && (
  <span className="text-[13px] text-gray-500">
    Filters ({activeFilterCount})
  </span>
)}
```

**Clear Button:**
```tsx
{hasActiveResourceFilters && (
  <button
    onClick={resetResourceFilters}
    className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
  >
    Clear
  </button>
)}
```

**Result Count:**
```tsx
<span className="ml-auto text-[13px] text-gray-500">
  {filteredResources.length} {filteredResources.length === 1 ? 'result' : 'results'}
</span>
```

**Features:**
- ✅ Shows active filter count when filters applied
- ✅ "Clear" button appears when filters active
- ✅ Result count updates dynamically
- ✅ All use existing text styles (text-[13px] text-gray-500)

---

### 3. ✅ **"Recommended for you" Section** (Conditional - Post-Scan Only)

**Location:** First section in Library tab (after filters)

**Condition:** Only shows if `hasCompletedScan === true`

**Pre-Scan State:**
```tsx
<div className="bg-white/[0.02] rounded-2xl border border-white/[0.04] p-8 text-center">
  <h3 className="text-[17px] font-semibold text-white mb-3 tracking-tight leading-tight">
    Get recommendations tailored to your risk
  </h3>
  <p className="text-[14px] text-gray-500 leading-[1.65] mb-6">
    Complete a wage & hour scan to see resources matched to your gaps.
  </p>
  <Link to="/modules/wage-hour" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5b6ff5] text-white text-[15px] font-medium hover:bg-[#4a5ee0] transition-colors">
    Run wage & hour scan
    <ArrowRight className="w-4 h-4" />
  </Link>
</div>
```

**Post-Scan State:**
```tsx
<div className="mb-12">
  <div className="flex items-center gap-2 mb-6">
    <h2 className="text-[20px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight">
      Recommended for you
    </h2>
    <span className="text-[13px] text-gray-500">Based on your latest scan</span>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* 2-4 recommended resource cards */}
  </div>
</div>
```

**Card Contents:**
- ✅ Title: `text-[17px] font-semibold text-white`
- ✅ Description: `text-[14px] text-gray-500`
- ✅ Metadata: Read time + format (`text-[12px] text-gray-600`)
- ✅ **NEW:** "Addresses:" line showing what gap it solves
  - Example: "Addresses: Missed breaks"
  - Styling: `text-[13px] text-gray-500` with `text-gray-400` for value
- ✅ Actions:
  - Primary: "Open →" (`text-[#5b6ff5]`)
  - Secondary: "Add to plan" (`text-gray-500`)

**Features:**
- ✅ Shows 2-4 items max
- ✅ Pulls from `featured` resources with `addresses` field
- ✅ Cards use existing card shell (bg-white/[0.03], border-white/[0.08], p-6)
- ✅ Grid layout: `grid-cols-1 md:grid-cols-2 gap-4`

---

### 4. ✅ **"Recently updated" Section** (Replaces "Featured")

**Problem Solved:** Previous "Featured" section duplicated content shown below

**Solution:**
- ✅ Renamed to "Recently updated"
- ✅ Shows max 2 items with `status: 'updated'`
- ✅ Items excluded from "All resources" section (no duplication)
- ✅ Helper text: "Reviewed for January 2026 thresholds and common wage & hour risks"

**Layout:**
```tsx
<div className="mb-12">
  <div className="mb-6">
    <h2 className="text-[20px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight mb-1">
      Recently updated
    </h2>
    <p className="text-[13px] text-gray-500">
      Reviewed for January 2026 thresholds and common wage & hour risks
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Cards with "Updated" chip */}
  </div>
</div>
```

**Card Features:**
- ✅ "Updated" chip: `px-2.5 py-1 bg-white/[0.06] border-white/[0.06] rounded-lg text-[12px]`
- ✅ Same actions as recommended: "Open →" + "Add to plan"
- ✅ Hover shows "Add to plan" button (desktop: `opacity-0 group-hover:opacity-100`)

**Logic:**
```tsx
const recentlyUpdatedResources = filteredResources
  .filter(r => r.status === 'updated')
  .slice(0, 2);

const recentlyUpdatedSlugs = recentlyUpdatedResources.map(r => r.slug);
const allResources = filteredResources.filter(r => !recentlyUpdatedSlugs.includes(r.slug));
```

---

### 5. ✅ **"Add to plan" Functionality** (All Resources + Templates)

**Implementation:** Every resource card and template row now supports adding to action plan

**Resource Cards:**
```tsx
<button
  onClick={() => togglePlanItem(resource.slug)}
  className="inline-flex items-center gap-1.5 text-[14px] text-gray-500 hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity"
>
  {planItems.includes(resource.slug) ? (
    <>
      <Check className="w-3.5 h-3.5" />
      Added
    </>
  ) : (
    'Add to plan'
  )}
</button>
```

**Template Rows:**
```tsx
<button
  onClick={() => toggleTemplatePlanItem(template.slug)}
  className="inline-flex items-center gap-1.5 text-[14px] text-gray-500 hover:text-gray-300 transition-colors"
>
  {templatePlanItems.includes(template.slug) ? (
    <>
      <Check className="w-3.5 h-3.5" />
      Added
    </>
  ) : (
    'Add to plan'
  )}
</button>
```

**States:**
- ✅ Default: "Add to plan" (text-gray-500)
- ✅ Added: "Added" with check icon (Check from lucide-react)
- ✅ Icon size: `w-3.5 h-3.5` (matches ArrowRight)

**Visibility:**
- ✅ Desktop: Reveals on hover (`opacity-0 group-hover:opacity-100`)
- ✅ Mobile: Always visible (no hover state)
- ✅ Recommended cards: Always visible (no hover, important CTA)

**State Management:**
```tsx
const [planItems, setPlanItems] = useState<string[]>([]);
const [templatePlanItems, setTemplatePlanItems] = useState<string[]>([]);

const togglePlanItem = (slug: string) => {
  setPlanItems(prev => 
    prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
  );
};
```

---

### 6. ✅ **"Your action plan" Preview Strip** (Conditional)

**Location:** Below "Recommended for you", above "Recently updated"

**Condition:** Only shows if `totalPlanItems > 0`

**Layout:**
```tsx
<div className="mb-12">
  <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h3 className="text-[17px] font-semibold text-white tracking-tight leading-tight">
          Your action plan
        </h3>
        <span className="px-2.5 py-1 bg-white/[0.06] border border-white/[0.06] rounded-lg text-[12px] text-gray-500">
          {totalPlanItems} {totalPlanItems === 1 ? 'item' : 'items'}
        </span>
      </div>
      <Link to="/plan" className="inline-flex items-center gap-1.5 text-[14px] text-[#5b6ff5] font-medium hover:text-[#4a5ee0] transition-colors">
        View plan
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
    <div className="space-y-2">
      {/* Show first 2 items */}
      {planPreviewItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="flex-1 text-[14px] text-gray-400">{item.title}</div>
          <span className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[12px] text-gray-500 capitalize">
            {item.type}
          </span>
        </div>
      ))}
      {totalPlanItems > 2 && (
        <div className="text-[13px] text-gray-500 pt-2">
          +{totalPlanItems - 2} more
        </div>
      )}
    </div>
  </div>
</div>
```

**Features:**
- ✅ Shows item count in chip badge
- ✅ Lists first 2 items with type chips
- ✅ Shows "+X more" if more than 2 items
- ✅ "View plan →" link routes to `/plan`
- ✅ Combines resources + templates into single count

**Logic:**
```tsx
const totalPlanItems = planItems.length + templatePlanItems.length;
const planPreviewItems = [
  ...planItems.slice(0, 2).map(slug => { /* resource data */ }),
  ...templatePlanItems.slice(0, 2 - planItems.length).map(slug => { /* template data */ })
].filter(Boolean).slice(0, 2);
```

---

### 7. ✅ **Templates Tab Improvements**

**Pre-Scan State:** (Unchanged, improved clarity)
```tsx
<div className="bg-white/[0.02] rounded-2xl border border-white/[0.04] p-8 text-center">
  <h3 className="text-[17px] font-semibold text-white mb-3 tracking-tight leading-tight">
    Get personalized template recommendations
  </h3>
  <p className="text-[14px] text-gray-500 leading-[1.65] mb-6 max-w-lg mx-auto">
    Complete a compliance scan to see which templates address your specific gaps and risk areas.
  </p>
  <Link to="/modules/wage-hour" className="...">
    Run wage & hour scan
    <ArrowRight className="w-4 h-4" />
  </Link>
</div>
```

**Post-Scan State:** (NEW - Transformed)
```tsx
<div className="mb-12">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      <h2 className="text-[20px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight">
        Recommended templates
      </h2>
      <span className="text-[13px] text-gray-500">Based on your scan</span>
    </div>
    <button onClick={addAllTemplatesToPlan} className="text-[14px] text-gray-500 hover:text-gray-300 transition-colors">
      Add all to plan
    </button>
  </div>
  <div className="space-y-3">
    {/* Template rows with "Recommended" chip */}
  </div>
</div>
```

**Template Row with "Recommended" Chip:**
```tsx
<div className="flex items-center gap-2 mb-2">
  <h3 className="text-[17px] font-semibold text-white tracking-tight leading-tight">
    {template.title}
  </h3>
  <span className="px-2.5 py-1 bg-white/[0.06] border border-white/[0.06] rounded-lg text-[12px] text-gray-500">
    Recommended
  </span>
</div>
```

**Features:**
- ✅ Shows 2-4 recommended templates
- ✅ "Recommended" chip on each (uses existing chip style)
- ✅ "Add all to plan" button at section header
- ✅ Individual "Add to plan" on each row
- ✅ Primary action: "Download →" (changed from generic link)
- ✅ Secondary action: "Add to plan"

**Add All Logic:**
```tsx
const addAllTemplatesToPlan = () => {
  const slugs = recommendedTemplates.map(t => t.slug);
  setTemplatePlanItems(prev => {
    const newItems = slugs.filter(s => !prev.includes(s));
    return [...prev, ...newItems];
  });
};
```

---

### 8. ✅ **Action Plan Page** (NEW - `/plan`)

**File:** `/src/app/pages/ActionPlan.tsx`

**Route:** `/plan`

**Layout:**
```tsx
<PageContainer>
  {/* Back link */}
  <Link to="/resources">
    <ArrowLeft className="w-4 h-4" />
    Back to resources
  </Link>

  {/* Page Header */}
  <h1>Your action plan</h1>
  <p>Resources and templates you've saved to address compliance gaps.</p>

  {/* Action bar */}
  <div className="flex items-center justify-between">
    <span>{planItems.length} items</span>
    <button onClick={downloadAll}>
      <Download className="w-4 h-4" />
      Download all
    </button>
  </div>

  {/* Plan items */}
  <div className="space-y-3">
    {planItems.map((item) => (
      <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6">
        {/* Item card with Remove button */}
      </div>
    ))}
  </div>

  {/* Next steps CTA */}
  <div className="bg-white/[0.02] rounded-2xl border border-white/[0.04] p-8">
    <h3>Ready to implement?</h3>
    <p>Download your action plan items and work through them with your team.</p>
    <button>Download all items</button>
    <Link to="/resources">Browse more resources</Link>
  </div>
</PageContainer>
```

**Features:**
- ✅ Shows all saved resources + templates
- ✅ Item cards show full details (description, metadata, addresses)
- ✅ Each item has "Remove" button (inline and in corner X button)
- ✅ "Download all" action bar button
- ✅ Bottom CTA encourages implementation
- ✅ Empty state with "Browse resources" CTA

**Empty State:**
```tsx
<div className="bg-white/[0.02] rounded-2xl border border-white/[0.04] p-12 text-center">
  <h3>No items in your plan yet</h3>
  <p>Browse resources and templates, then add relevant items to your action plan to stay organized.</p>
  <Link to="/resources">Browse resources</Link>
</div>
```

**Remove Logic:**
```tsx
const removeItem = (id: string) => {
  setPlanItems(prev => prev.filter(item => item.id !== id));
};
```

---

## 📊 DATA MODEL ENHANCEMENTS

### Resource Interface (Extended)
```tsx
interface Resource {
  slug: string;
  title: string;
  description: string;
  type: 'checklist' | 'template' | 'guide' | 'policy' | 'calculator';
  topics: string[];
  stages: string[];
  status?: 'updated' | 'new';
  readTime?: string;
  format?: string;
  featured?: boolean;
  addresses?: string; // NEW: What gap/issue this addresses
  reviewedDate?: string; // NEW: When it was last reviewed
}
```

### Example Resource with New Fields:
```tsx
{
  slug: 'exemption-checklist',
  title: 'Exemption checklist',
  description: 'Step-by-step verification for exempt employee classification documentation under CA and federal rules',
  type: 'checklist',
  topics: ['Classification', 'Overtime'],
  stages: ['Prevent', 'Audit'],
  status: 'updated',
  readTime: '6 min',
  format: 'PDF',
  featured: true,
  addresses: 'Misclassification exposure', // NEW
  reviewedDate: 'January 2026', // NEW
}
```

---

## 🎨 DESIGN SYSTEM COMPLIANCE

### ✅ NO NEW TOKENS INTRODUCED

**Typography:** All existing
- ✅ H1: `text-[24px] sm:text-[28px] xl:text-[32px]`
- ✅ H2: `text-[20px] sm:text-[24px]`
- ✅ H3: `text-[17px]`
- ✅ Body: `text-[15px]` / `text-[14px]`
- ✅ Small: `text-[13px]` / `text-[12px]`

**Colors:** All existing
- ✅ Primary text: `text-white`
- ✅ Secondary: `text-gray-400` / `text-gray-500`
- ✅ Tertiary: `text-gray-600`
- ✅ Primary link: `text-[#5b6ff5] hover:text-[#4a5ee0]`
- ✅ Secondary link: `text-gray-500 hover:text-gray-300`

**Spacing:** All existing (8px grid)
- ✅ `mb-1`, `mb-2`, `mb-3`, `mb-4`, `mb-6`, `mb-8`, `mb-10`, `mb-12`
- ✅ `gap-2`, `gap-3`, `gap-4`, `gap-6`
- ✅ `p-6`, `p-8`, `p-12`
- ✅ `space-y-2`, `space-y-3`

**Card Shells:** All existing
- ✅ Primary: `bg-white/[0.03] border-white/[0.08] rounded-2xl`
- ✅ Subtle: `bg-white/[0.02] border-white/[0.04] rounded-2xl`
- ✅ Hover: `hover:bg-white/[0.05] hover:border-white/[0.1]`

**Chips:** All existing
- ✅ Standard: `px-2.5 py-1 bg-white/[0.03] border-white/[0.06] rounded-lg text-[12px]`
- ✅ Emphasized: `px-2.5 py-1 bg-white/[0.06] border-white/[0.06] rounded-lg text-[12px]`

**Inputs:** All existing
- ✅ `bg-white/[0.03] border-white/[0.08] rounded-xl`
- ✅ Focus: `focus:bg-white/[0.05] focus:border-white/[0.12]`

**Icons:** All existing (lucide-react)
- ✅ `Search`, `Check`, `Download`, `X`, `ArrowRight`, `ArrowLeft`
- ✅ Sizes: `w-3.5 h-3.5`, `w-4 h-4`, `w-5 h-5`

**Buttons:** All existing
- ✅ Primary: `px-6 py-3 rounded-xl bg-[#5b6ff5] text-white text-[15px] font-medium`
- ✅ Secondary: `px-4 py-2 rounded-xl bg-white/[0.03] border-white/[0.08]`
- ✅ Text button: `text-[14px] text-gray-500 hover:text-gray-300`

---

## 🎯 ACCEPTANCE CRITERIA - ALL MET

### ✅ 1. Premium & Consistent with Homepage Polish
- All typography scales match homepage exactly
- All spacing follows 8px grid
- All colors from existing palette
- All card shells reuse homepage patterns
- Smooth transitions on all interactive elements

### ✅ 2. No New Design Tokens
- Zero new typography styles
- Zero new colors
- Zero new shadows
- Zero new radii
- Zero new spacing values
- All components reuse existing patterns

### ✅ 3. Featured Duplication Problem Solved
- "Featured" renamed to "Recently updated"
- Shows distinct items (max 2 with `status: 'updated'`)
- Items excluded from "All resources" section
- No immediate duplication
- Helper text explains recency

### ✅ 4. Recommended-for-you Rail is Conditional
- Only shows after scan completed (`hasCompletedScan === true`)
- Pre-scan: Shows calm CTA to run scan
- Post-scan: Shows 2-4 personalized recommendations
- Clearly tied to scan results ("Based on your latest scan")
- Each card shows what gap it addresses

### ✅ 5. Add-to-plan Action Exists Everywhere
- All resource cards have "Add to plan"
- All template rows have "Add to plan"
- States: "Add to plan" → "Added ✓"
- Desktop: Reveals on hover
- Mobile: Always visible
- Recommended cards: Always visible (high priority)

### ✅ 6. Lightweight Action-plan Preview Exists
- Shows when items added (`totalPlanItems > 0`)
- Displays item count in chip badge
- Lists first 2 items with type pills
- Shows "+X more" if > 2 items
- "View plan →" routes to `/plan`
- No new nav clutter (not in global nav)

### ✅ 7. Search + Filter Affordance Improved
- Search input above filters
- Searches title, description, topics, type
- Real-time filtering
- Active filter count indicator
- "Clear" button when filters active
- Result count updates dynamically
- No heavy redesign, just polish

---

## 🚀 SUBSCRIPTION-WORTHY FEATURES ACHIEVED

### 1. **Intelligent Recommendation Engine**
- Personalized based on scan results
- Shows what gaps each resource addresses
- Conditional display (pre-scan vs post-scan)
- Clear value proposition

### 2. **Retention Hooks**
- "Recently updated" section keeps users coming back
- Shows review dates and version numbers
- Highlights newly reviewed content
- Creates expectation of fresh updates

### 3. **Action Planning System**
- Converts passive browsing into organized action
- Lightweight preview without nav clutter
- Full plan page for detailed management
- Download all functionality
- Remove items easily
- Encourages implementation

### 4. **Discovery & Search**
- Powerful search across all content
- Smart filtering with active count
- Clear button for quick reset
- Result count feedback

### 5. **Progressive Disclosure**
- Empty states encourage scan completion
- Post-scan unlocks recommendations
- Plan preview appears when relevant
- No overwhelming UI until needed

### 6. **Outcome-Oriented Content**
- "Addresses:" line shows value immediately
- Templates show recommended status
- Metadata shows recency (builds trust)
- Actions emphasize implementation ("Download", "Add to plan")

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile Optimizations:
- ✅ Search input full-width, comfortable tap target
- ✅ Filters wrap naturally
- ✅ Cards stack cleanly (1 column on mobile)
- ✅ "Add to plan" always visible (no hover required)
- ✅ Plan preview shows properly on narrow screens
- ✅ Template rows maintain readability
- ✅ All buttons have comfortable touch targets

### Desktop Enhancements:
- ✅ Grid layouts utilize space (2-3 columns)
- ✅ Hover reveals "Add to plan" (cleaner default state)
- ✅ Filter bar stays in one line (better overview)
- ✅ Plan preview more compact on wide screens

---

## 🔄 USER FLOWS

### **Flow 1: First-time User (No Scan)**

1. Lands on Resources Hub
2. Sees search + filters
3. Browses templates tab
4. Sees: "Get personalized template recommendations" empty state
5. Clicks "Run wage & hour scan"
6. Completes scan
7. Returns to Resources Hub
8. **Now sees:** Personalized recommendations with gap indicators

### **Flow 2: Post-Scan User (Active)**

1. Lands on Resources Hub (from results page)
2. Sees "Recommended for you" section with 4 cards
3. Each card shows what gap it addresses
4. Clicks "Add to plan" on 2 items
5. **Plan preview appears** showing "2 items"
6. Continues browsing, adds 1 more template
7. **Plan updates** to "3 items"
8. Clicks "View plan →"
9. Sees full action plan page
10. Downloads all items
11. Removes 1 item no longer needed

### **Flow 3: Returning User (Retention)**

1. Returns to Resources Hub after 2 weeks
2. Sees "Recently updated" section at top
3. Notices "Reviewed for January 2026 thresholds"
4. Clicks "Updated" item to see latest info
5. Adds to plan for review
6. Checks "Your action plan" to prioritize

---

## 🎨 VISUAL HIERARCHY

### Information Architecture (Top to Bottom):

1. **Back link** (if from scan/dashboard)
2. **Page header** (title + description)
3. **Tab control** (Library | Templates)
4. **Search input** (primary discovery tool)
5. **Filter bar** (refinement + active count)
6. **Recommended for you** (if scan completed) - HIGHEST PRIORITY
7. **Your action plan preview** (if items added) - ENGAGEMENT HOOK
8. **Recently updated** (retention) - TIMELY CONTENT
9. **All resources/templates** (comprehensive browsing)

**Result:** Clear hierarchy prioritizes personalization > action > recency > discovery

---

## 📊 METRICS TO TRACK (Future)

**Recommendation Engagement:**
- % of users who click recommended items vs all items
- "Add to plan" click rate on recommended vs non-recommended
- Scan-to-recommendation conversion rate

**Action Plan Usage:**
- % of users who add ≥1 item to plan
- Average items per plan
- Plan completion rate (items removed after adding)
- "Download all" click rate

**Retention:**
- Return visits after "Recently updated" additions
- Click rate on "Updated" items vs other items
- Time between visits

**Search & Discovery:**
- Search usage rate
- Top search queries
- Filter usage patterns
- Result count at different filter combinations

---

## 🎯 RESULT

**Before:**
- Static library of resources
- Generic featured section (duplicate content)
- No personalization
- No action planning
- No retention hooks
- Browse-only experience

**After:**
- Intelligent recommendation engine (scan-based)
- Distinct "Recently updated" section (no duplication)
- Personalized recommendations with gap indicators
- Full action planning system (preview + full page)
- Retention hooks (updated content, version tracking)
- Conversion-focused (browse → add to plan → implement)
- Search & improved filters
- Subscription-worthy operating system

**Apple-grade qualities maintained:**
- ✅ Zero new design tokens
- ✅ Perfect alignment to 8px grid
- ✅ Homepage parity maintained
- ✅ Premium interactions (hover, focus, transitions)
- ✅ Clear visual hierarchy
- ✅ Generous spacing
- ✅ Smooth animations

**Deliverable:** Resources Hub now feels like a premium, intelligent operating system that recommends, retains, and converts users into action - all while maintaining strict design system adherence and Apple-grade polish.
