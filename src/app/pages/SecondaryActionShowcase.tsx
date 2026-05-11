import { SecondaryAction } from '@/app/components/SecondaryAction';
import { PrimaryAction } from '@/app/components/PrimaryAction';

export function SecondaryActionShowcase() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-[40px] md:text-[56px] font-semibold mb-4">
            SecondaryAction
          </h1>
          <p className="text-[17px] text-gray-400 leading-relaxed max-w-[720px]">
            A structured alternative action that supports, but never competes with, the PrimaryAction component.
            Functional, descriptive, never promotional.
          </p>
        </div>

        {/* Core Principle */}
        <div className="mb-16 p-8 bg-[#161616]/40 rounded-[16px] border border-gray-900/30">
          <h2 className="text-[20px] font-semibold mb-4 text-gray-300">Core Principle</h2>
          <div className="space-y-4 text-[15px]">
            <p className="text-gray-400">
              <strong className="text-gray-300">This component exists to offer a meaningful alternative path without 
              competing with the PrimaryAction.</strong> Use for secondary navigation, utility actions, and 
              alternative workflows.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-4 bg-[#0f0f0f] rounded-[12px] border border-gray-900/30">
                <p className="text-[13px] text-green-500 font-medium mb-2">✓ Good Copy</p>
                <ul className="text-[13px] text-gray-400 space-y-1">
                  <li>• "View detailed breakdown"</li>
                  <li>• "Export report"</li>
                  <li>• "Review answers"</li>
                  <li>• "Exit & save progress"</li>
                </ul>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-[12px] border border-gray-900/30">
                <p className="text-[13px] text-red-500 font-medium mb-2">✗ Bad Copy</p>
                <ul className="text-[13px] text-gray-400 space-y-1">
                  <li>• "Get started"</li>
                  <li>• "Start now"</li>
                  <li>• "Go to dashboard"</li>
                  <li>• "Learn more" (too vague)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Icon Variants */}
        <div className="mb-24">
          <h2 className="text-[28px] font-semibold mb-12">Icon Variants</h2>
          
          <div className="space-y-12">
            
            {/* No Icon */}
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-medium text-gray-300 mb-2">No Icon (Default)</h3>
                  <p className="text-[14px] text-gray-600">
                    Use when the action is clear from context or doesn't imply navigation.
                  </p>
                </div>
                <div className="px-3 py-1 bg-[#161616] border border-gray-900/50 rounded-[8px]">
                  <code className="text-[12px] text-gray-500 font-mono">icon="none"</code>
                </div>
              </div>
              
              <div className="max-w-[480px] space-y-3">
                <SecondaryAction label="Exit & save progress" onClick={() => {}} />
                <SecondaryAction label="Cancel assessment" onClick={() => {}} />
              </div>
            </div>

            {/* Chevron Icon */}
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-medium text-gray-300 mb-2">Chevron Icon</h3>
                  <p className="text-[14px] text-gray-600">
                    Use when the action leads to a new page or expands content.
                  </p>
                </div>
                <div className="px-3 py-1 bg-[#161616] border border-gray-900/50 rounded-[8px]">
                  <code className="text-[12px] text-gray-500 font-mono">icon="chevron"</code>
                </div>
              </div>
              
              <div className="max-w-[480px] space-y-3">
                <SecondaryAction label="View detailed breakdown" icon="chevron" onClick={() => {}} />
                <SecondaryAction label="Review answers" icon="chevron" onClick={() => {}} />
              </div>
            </div>

            {/* Export Icon */}
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-medium text-gray-300 mb-2">Export Icon</h3>
                  <p className="text-[14px] text-gray-600">
                    Use exclusively for export, download, or external link actions.
                  </p>
                </div>
                <div className="px-3 py-1 bg-[#161616] border border-gray-900/50 rounded-[8px]">
                  <code className="text-[12px] text-gray-500 font-mono">icon="export"</code>
                </div>
              </div>
              
              <div className="max-w-[480px] space-y-3">
                <SecondaryAction label="Export report" icon="export" onClick={() => {}} />
                <SecondaryAction label="Download results" icon="export" onClick={() => {}} />
              </div>
            </div>

          </div>
        </div>

        {/* States */}
        <div className="mb-24">
          <h2 className="text-[28px] font-semibold mb-12">States</h2>
          
          <div className="space-y-8">
            
            {/* Default */}
            <div className="p-6 bg-[#161616]/40 rounded-[16px] border border-gray-900/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-medium text-gray-300 mb-1">Default</h3>
                  <p className="text-[13px] text-gray-600">Transparent background, subtle border</p>
                </div>
              </div>
              <div className="max-w-[480px]">
                <SecondaryAction label="View detailed breakdown" icon="chevron" onClick={() => {}} />
              </div>
            </div>

            {/* Hover */}
            <div className="p-6 bg-[#161616]/40 rounded-[16px] border border-gray-900/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-medium text-gray-300 mb-1">Hover</h3>
                  <p className="text-[13px] text-gray-600">Slightly brighter border + card background lift</p>
                </div>
              </div>
              <div className="max-w-[480px]">
                <div className="pointer-events-none">
                  <button className="group relative inline-flex items-center justify-between gap-3 h-[48px] px-6 font-medium text-[15px] leading-tight text-gray-300 bg-[#161616] border border-gray-800/60 rounded-[16px] w-full">
                    <span className="leading-tight">View detailed breakdown</span>
                    <svg className="w-4 h-4 text-gray-600 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-[12px] text-gray-600 mt-3">
                Hover state shown above (simulated)
              </p>
            </div>

            {/* Disabled */}
            <div className="p-6 bg-[#161616]/40 rounded-[16px] border border-gray-900/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[16px] font-medium text-gray-300 mb-1">Disabled</h3>
                  <p className="text-[13px] text-gray-600">Reduced opacity, no hover states</p>
                </div>
              </div>
              <div className="max-w-[480px]">
                <SecondaryAction label="Export report" icon="export" disabled onClick={() => {}} />
              </div>
            </div>

          </div>
        </div>

        {/* Usage with PrimaryAction */}
        <div className="mb-24">
          <h2 className="text-[28px] font-semibold mb-12">Usage with PrimaryAction</h2>
          
          <div className="space-y-12">
            
            {/* Single Secondary */}
            <div>
              <div className="mb-4">
                <h3 className="text-[18px] font-medium text-gray-300 mb-2">Single Secondary Action</h3>
                <p className="text-[14px] text-gray-600">
                  Primary action leads the way, secondary offers alternative path.
                </p>
              </div>
              
              <div className="max-w-[480px] space-y-3">
                <PrimaryAction context="inline" state="post_scan" onClick={() => {}} />
                <SecondaryAction label="Export results" icon="export" onClick={() => {}} />
              </div>
            </div>

            {/* Two Secondaries */}
            <div>
              <div className="mb-4">
                <h3 className="text-[18px] font-medium text-gray-300 mb-2">Multiple Secondary Actions</h3>
                <p className="text-[14px] text-gray-600">
                  Maximum two SecondaryActions per view. Primary always first.
                </p>
              </div>
              
              <div className="max-w-[480px] space-y-3">
                <PrimaryAction context="inline" state="locked" onClick={() => {}} />
                <SecondaryAction label="View detailed breakdown" icon="chevron" onClick={() => {}} />
                <SecondaryAction label="Exit & save progress" onClick={() => {}} />
              </div>
            </div>

            {/* In Modal Context */}
            <div>
              <div className="mb-4">
                <h3 className="text-[18px] font-medium text-gray-300 mb-2">In Modal Context</h3>
                <p className="text-[14px] text-gray-600">
                  SecondaryAction can serve as cancel or alternative action in modals.
                </p>
              </div>
              
              {/* Mock Modal */}
              <div className="max-w-[480px] p-6 bg-[#161616] rounded-[20px] border border-gray-900/50">
                <h4 className="text-[20px] font-semibold mb-2">Export your results</h4>
                <p className="text-[14px] text-gray-500 mb-6">
                  Download a PDF summary of your compliance assessment and action items.
                </p>
                
                <div className="space-y-3">
                  <PrimaryAction context="modal" state="upgrade" onClick={() => {}} />
                  <SecondaryAction label="Cancel" onClick={() => {}} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Design Requirements */}
        <div className="mb-24">
          <h2 className="text-[28px] font-semibold mb-12">Design Requirements</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#161616]/40 rounded-[16px] border border-green-900/20">
              <h3 className="text-[16px] font-medium text-green-500 mb-4">✓ Always</h3>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li>• Same height, padding, radius as PrimaryAction</li>
                <li>• Background: transparent or card surface</li>
                <li>• Border: 1px subtle neutral border</li>
                <li>• Text color: primary text (not accent)</li>
                <li>• Font weight: medium</li>
                <li>• No glow, shadow, or elevation</li>
              </ul>
            </div>

            <div className="p-6 bg-[#161616]/40 rounded-[16px] border border-red-900/20">
              <h3 className="text-[16px] font-medium text-red-500 mb-4">✗ Never</h3>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li>• No accent color fills</li>
                <li>• No motivational language</li>
                <li>• Never visually louder than PrimaryAction</li>
                <li>• Never used in hero sections</li>
                <li>• Never placed above PrimaryAction</li>
                <li>• Max two per view</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Constraints */}
        <div className="mb-24">
          <h2 className="text-[28px] font-semibold mb-12">Usage Constraints</h2>
          
          <div className="bg-[#161616]/40 rounded-[16px] border border-gray-900/30 p-8">
            <div className="grid md:grid-cols-2 gap-8 text-[14px]">
              <div>
                <p className="text-gray-400 font-medium mb-2">Placement</p>
                <p className="text-gray-600 mb-3">
                  May appear alongside PrimaryAction, never above it
                </p>
                <p className="text-[12px] text-gray-700">
                  SecondaryAction always follows PrimaryAction in DOM order and visual hierarchy
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-2">Quantity</p>
                <p className="text-gray-600 mb-3">
                  Maximum two SecondaryActions per view
                </p>
                <p className="text-[12px] text-gray-700">
                  Too many actions create decision paralysis. Limit alternatives.
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-2">Context</p>
                <p className="text-gray-600 mb-3">
                  Never used in hero sections
                </p>
                <p className="text-[12px] text-gray-700">
                  Hero sections should focus on primary action only
                </p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-2">Visual Weight</p>
                <p className="text-gray-600 mb-3">
                  Never visually louder than PrimaryAction
                </p>
                <p className="text-[12px] text-gray-700">
                  Neutral styling ensures clear action hierarchy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div>
          <h2 className="text-[28px] font-semibold mb-6">Usage Examples</h2>
          <div className="bg-[#0f0f0f] rounded-[16px] border border-gray-900/30 p-6 font-mono text-[13px] text-gray-400 overflow-x-auto">
            <pre>{`import { SecondaryAction } from '@/app/components/SecondaryAction';
import { PrimaryAction } from '@/app/components/PrimaryAction';

// Basic usage (no icon)
<SecondaryAction 
  label="Exit & save progress" 
  onClick={handleExit} 
/>

// With chevron icon (navigation)
<SecondaryAction 
  label="View detailed breakdown" 
  icon="chevron"
  onClick={() => navigate('/details')} 
/>

// With export icon (utility)
<SecondaryAction 
  label="Export report" 
  icon="export"
  onClick={handleExport} 
/>

// Disabled state
<SecondaryAction 
  label="Download results" 
  icon="export"
  disabled
  onClick={handleDownload} 
/>

// Alongside PrimaryAction
<div className="space-y-3">
  <PrimaryAction 
    context="inline" 
    state="post_scan" 
    onClick={handleReview} 
  />
  <SecondaryAction 
    label="Export results" 
    icon="export"
    onClick={handleExport} 
  />
</div>

// In modal (cancel action)
<div className="space-y-3">
  <PrimaryAction 
    context="modal" 
    state="upgrade" 
    onClick={handleUpgrade} 
  />
  <SecondaryAction 
    label="Cancel" 
    onClick={handleClose} 
  />
</div>

// ✓ Good copy examples
<SecondaryAction label="View detailed breakdown" icon="chevron" />
<SecondaryAction label="Export report" icon="export" />
<SecondaryAction label="Review answers" icon="chevron" />
<SecondaryAction label="Exit & save progress" />

// ✗ Bad copy examples (too promotional)
<SecondaryAction label="Get started" />  // Motivational
<SecondaryAction label="Learn more" />   // Vague
<SecondaryAction label="Go now" />       // Urgency`}</pre>
          </div>
        </div>

      </div>
    </div>
  );
}
