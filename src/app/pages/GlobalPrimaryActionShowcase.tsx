import { PrimaryAction } from '@/app/components/PrimaryAction';

export function GlobalPrimaryActionShowcase() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-[40px] md:text-[56px] font-semibold mb-4">
            PrimaryAction — Design System Primitive
          </h1>
          <p className="text-[17px] text-theme-text-2 leading-relaxed max-w-[720px]">
            Premium, theme-aware action primitive with Apple-caliber polish. Single source of truth for all primary CTAs.
          </p>
        </div>

        {/* Core Principle */}
        <div className="mb-16 p-8 bg-theme-surface-1 rounded-[16px] border border-theme-border-1">
          <h2 className="text-[20px] font-semibold mb-4 text-theme-text-1">Design Philosophy</h2>
          <div className="space-y-4 text-[15px]">
            <p className="text-theme-text-2">
              <strong className="text-theme-text-1">Theme-aware with liquid glass hero treatment.</strong> Hero context 
              uses subtle liquid glass aesthetic in both light and dark modes. Other contexts use solid fills. Arrow 
              appears only on hover. Copy controlled globally by state.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-4 bg-theme-surface-2 rounded-[12px] border border-theme-border-2">
                <p className="text-[13px] text-green-500 font-medium mb-2">✓ Allowed</p>
                <code className="text-[13px] text-theme-text-3">
                  &lt;PrimaryAction<br/>
                  &nbsp;&nbsp;context="nav"<br/>
                  &nbsp;&nbsp;state="pre_scan"<br/>
                  /&gt;
                </code>
                <p className="text-[12px] text-theme-text-3 mt-2">
                  Context + state determine everything
                </p>
              </div>
              <div className="p-4 bg-theme-surface-2 rounded-[12px] border border-theme-border-2">
                <p className="text-[13px] text-red-500 font-medium mb-2">✗ Not Allowed</p>
                <code className="text-[13px] text-theme-text-3">
                  &lt;button className="custom-btn"&gt;<br/>
                  &nbsp;&nbsp;Custom CTA<br/>
                  &lt;/button&gt;
                </code>
                <p className="text-[12px] text-theme-text-3 mt-2">
                  No alternate primary button styles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contexts */}
        <div className="mb-24">
          <h2 className="text-[28px] font-semibold mb-12">Contexts (Visual Treatment)</h2>
          
          <div className="space-y-12">
            
            {/* Nav Context */}
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-medium text-theme-text-1 mb-2">Nav</h3>
                  <p className="text-[14px] text-theme-text-3">
                    Size forced to sm. Soft accent background in light mode. Subtext allowed. Present, not promotional.
                  </p>
                </div>
                <div className="px-3 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-[8px]">
                  <code className="text-[12px] text-theme-text-3 font-mono">context="nav"</code>
                </div>
              </div>
              
              <div className="inline-flex">
                <PrimaryAction context="nav" state="pre_scan" onClick={() => {}} />
              </div>
              
              <div className="mt-4 p-4 bg-theme-surface-2 rounded-[12px] border border-theme-border-2">
                <p className="text-[13px] text-theme-text-3 mb-2">Rules:</p>
                <ul className="text-[13px] text-theme-text-2 space-y-1">
                  <li>• Size: sm (40px height, always)</li>
                  <li>• Light mode: Soft accent bg with accent text</li>
                  <li>• Dark mode: Slightly muted glass treatment</li>
                  <li>• Subtext: Shown for nav context only</li>
                  <li>• Emphasis: Subtle, never dominant</li>
                </ul>
              </div>
            </div>

            {/* Hero Context */}
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-medium text-theme-text-1 mb-2">Hero</h3>
                  <p className="text-[14px] text-theme-text-3">
                    Size forced to lg. Full accent in light mode. Arrow slides in on hover. Strongest visual emphasis.
                  </p>
                </div>
                <div className="px-3 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-[8px]">
                  <code className="text-[12px] text-theme-text-3 font-mono">context="hero"</code>
                </div>
              </div>
              
              <div className="space-y-3 max-w-[480px]">
                <PrimaryAction context="hero" state="pre_scan" onClick={() => {}} />
                <PrimaryAction context="hero" state="locked" onClick={() => {}} />
              </div>
              
              <div className="mt-4 p-4 bg-theme-surface-2 rounded-[12px] border border-theme-border-2">
                <p className="text-[13px] text-theme-text-3 mb-2">Rules:</p>
                <ul className="text-[13px] text-theme-text-2 space-y-1">
                  <li>• Size: lg (52px mobile, 56px desktop)</li>
                  <li>• Light mode: Liquid glass with translucency and glow</li>
                  <li>• Dark mode: Full glass depth with glow</li>
                  <li>• Arrow: Appears on hover (never static)</li>
                  <li>• Placement: Hero section only</li>
                  <li>• Locked/Upgrade: Border-only treatment</li>
                </ul>
              </div>
            </div>

            {/* Inline Context */}
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-medium text-theme-text-1 mb-2">Inline</h3>
                  <p className="text-[14px] text-theme-text-3">
                    Size md. Balanced emphasis. Progression actions (Continue scan, Review results).
                  </p>
                </div>
                <div className="px-3 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-[8px]">
                  <code className="text-[12px] text-theme-text-3 font-mono">context="inline"</code>
                </div>
              </div>
              
              <div className="space-y-3 max-w-[480px]">
                <PrimaryAction context="inline" state="post_scan" onClick={() => {}} />
                <PrimaryAction context="inline" state="locked" onClick={() => {}} />
              </div>
              
              <div className="mt-4 p-4 bg-theme-surface-2 rounded-[12px] border border-theme-border-2">
                <p className="text-[13px] text-theme-text-3 mb-2">Rules:</p>
                <ul className="text-[13px] text-theme-text-2 space-y-1">
                  <li>• Size: md (48px height)</li>
                  <li>• Light mode: Solid accent with border</li>
                  <li>• Dark mode: Glass treatment with glow</li>
                  <li>• Border: Subtle, increases on hover</li>
                  <li>• Use case: Mid-page actions, forms</li>
                </ul>
              </div>
            </div>

            {/* Modal Context */}
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-medium text-theme-text-1 mb-2">Modal</h3>
                  <p className="text-[14px] text-theme-text-3">
                    Same weight as inline. Never visually dominant over modal content.
                  </p>
                </div>
                <div className="px-3 py-1 bg-theme-surface-2 border border-theme-border-2 rounded-[8px]">
                  <code className="text-[12px] text-theme-text-3 font-mono">context="modal"</code>
                </div>
              </div>
              
              <div className="max-w-[480px]">
                <PrimaryAction context="modal" state="upgrade" onClick={() => {}} />
              </div>
              
              <div className="mt-4 p-4 bg-theme-surface-2 rounded-[12px] border border-theme-border-2">
                <p className="text-[13px] text-theme-text-3 mb-2">Rules:</p>
                <ul className="text-[13px] text-theme-text-2 space-y-1">
                  <li>• Size: md (48px height)</li>
                  <li>• Visual weight: Same as inline</li>
                  <li>• Never dominant within modal chrome</li>
                  <li>• Content first, action second</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* States */}
        <div className="mb-24">
          <h2 className="text-[28px] font-semibold mb-12">States (Copy Logic)</h2>
          
          <div className="space-y-8">
            
            {/* Pre-Scan */}
            <div className="p-6 bg-theme-surface-1 rounded-[16px] border border-theme-border-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-medium text-theme-text-1 mb-1">pre_scan</h3>
                  <p className="text-[13px] text-theme-text-3">User hasn't started assessment</p>
                </div>
                <code className="px-2 py-1 bg-theme-surface-2 rounded text-[11px] text-theme-text-3">state="pre_scan"</code>
              </div>
              <div className="max-w-[480px]">
                <PrimaryAction context="inline" state="pre_scan" onClick={() => {}} />
              </div>
              <p className="text-[12px] text-theme-text-3 mt-3">
                Copy: "Run wage & hour scan" (nav shows subtext: "Takes 5–10 minutes")
              </p>
            </div>

            {/* In-Progress */}
            <div className="p-6 bg-theme-surface-1 rounded-[16px] border border-theme-border-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-medium text-theme-text-1 mb-1">in_progress</h3>
                  <p className="text-[13px] text-theme-text-3">User actively working</p>
                </div>
                <code className="px-2 py-1 bg-theme-surface-2 rounded text-[11px] text-theme-text-3">state="in_progress"</code>
              </div>
              <div className="max-w-[480px]">
                <PrimaryAction context="inline" state="in_progress" onClick={() => {}} />
              </div>
              <p className="text-[12px] text-theme-text-3 mt-3">
                Copy: "Continue scan" (nav shows subtext: "In progress")
              </p>
            </div>

            {/* Post-Scan */}
            <div className="p-6 bg-theme-surface-1 rounded-[16px] border border-theme-border-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-medium text-theme-text-1 mb-1">post_scan</h3>
                  <p className="text-[13px] text-theme-text-3">User completed assessment</p>
                </div>
                <code className="px-2 py-1 bg-theme-surface-2 rounded text-[11px] text-theme-text-3">state="post_scan"</code>
              </div>
              <div className="max-w-[480px]">
                <PrimaryAction context="inline" state="post_scan" onClick={() => {}} />
              </div>
              <p className="text-[12px] text-theme-text-3 mt-3">
                Copy: "Review results"
              </p>
            </div>

            {/* Locked */}
            <div className="p-6 bg-theme-surface-1 rounded-[16px] border border-theme-border-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-medium text-theme-text-1 mb-1">locked</h3>
                  <p className="text-[13px] text-theme-text-3">Feature behind paywall</p>
                </div>
                <code className="px-2 py-1 bg-theme-surface-2 rounded text-[11px] text-theme-text-3">state="locked"</code>
              </div>
              <div className="max-w-[480px]">
                <PrimaryAction context="inline" state="locked" onClick={() => {}} />
              </div>
              <p className="text-[12px] text-theme-text-3 mt-3">
                Copy: "Unlock full analysis" (capability-forward, no pricing)
              </p>
            </div>

            {/* Upgrade */}
            <div className="p-6 bg-theme-surface-1 rounded-[16px] border border-theme-border-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-medium text-theme-text-1 mb-1">upgrade</h3>
                  <p className="text-[13px] text-theme-text-3">Explicit conversion moment</p>
                </div>
                <code className="px-2 py-1 bg-theme-surface-2 rounded text-[11px] text-theme-text-3">state="upgrade"</code>
              </div>
              <div className="max-w-[480px]">
                <PrimaryAction context="inline" state="upgrade" onClick={() => {}} />
              </div>
              <p className="text-[12px] text-theme-text-3 mt-3">
                Copy: "Upgrade to Guardrail Plus"
              </p>
            </div>

          </div>
        </div>

        {/* Visual Rules */}
        <div className="mb-24">
          <h2 className="text-[28px] font-semibold mb-12">Visual Rules (Hard Constraints)</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-theme-surface-1 rounded-[16px] border border-green-500/20">
              <h3 className="text-[16px] font-medium text-green-500 mb-4">✓ Always</h3>
              <ul className="space-y-2 text-[14px] text-theme-text-2">
                <li>• Rounded pill (consistent radius)</li>
                <li>• Arrow appears only on hover (slides in)</li>
                <li>• Hero: Liquid glass in both light/dark modes</li>
                <li>• Other contexts: Solid fills in light mode</li>
                <li>• Theme tokens for all colors</li>
                <li>• Accessible focus rings (both themes)</li>
                <li>• One PrimaryAction per screen maximum</li>
              </ul>
            </div>

            <div className="p-6 bg-theme-surface-1 rounded-[16px] border border-red-500/20">
              <h3 className="text-[16px] font-medium text-red-500 mb-4">✗ Never</h3>
              <ul className="space-y-2 text-[14px] text-theme-text-2">
                <li>• No alternate primary button styles</li>
                <li>• No static arrow (hover only)</li>
                <li>• No hero-sized buttons in navigation</li>
                <li>• No multiple PrimaryActions on same screen</li>
                <li>• No urgency language or marketing verbs</li>
                <li>• No hardcoded colors (use tokens)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div>
          <h2 className="text-[28px] font-semibold mb-6">Usage Examples</h2>
          <div className="bg-theme-surface-2 rounded-[16px] border border-theme-border-1 p-6 font-mono text-[13px] text-theme-text-2 overflow-x-auto">
            <pre>{`import { PrimaryAction } from '@/app/components/PrimaryAction';

// Nav context (top navigation)
<PrimaryAction 
  context="nav" 
  state="pre_scan" 
  onClick={() => navigate('/modules/wage-hour')} 
/>
// → Small, soft accent bg, shows subtext

// Hero context (landing pages)
<PrimaryAction 
  context="hero" 
  state="pre_scan" 
  onClick={handleStartScan} 
/>
// → Large, solid accent fill, arrow on hover

// Hero with locked state
<PrimaryAction 
  context="hero" 
  state="locked" 
  onClick={() => navigate('/pricing')} 
/>
// → Border-only treatment, lock icon

// Inline context (mid-page actions)
<PrimaryAction 
  context="inline" 
  state="post_scan" 
  onClick={() => navigate('/results')} 
/>
// → Balanced emphasis, "Review results"

// Modal context
<PrimaryAction 
  context="modal" 
  state="upgrade" 
  onClick={handleUpgrade} 
/>
// → Same weight as inline

// ❌ NOT ALLOWED
<PrimaryAction 
  context="hero"
  state="pre_scan"
  className="custom-style"  // Ignored (except width)!
/>

<button className="my-primary-button">
  Custom CTA  // No alternate styles!
</button>`}</pre>
          </div>
        </div>

      </div>
    </div>
  );
}