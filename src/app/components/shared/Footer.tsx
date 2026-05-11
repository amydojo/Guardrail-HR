import { ExternalLink } from 'lucide-react';

// ============================================================================
// FOOTER COMPONENT — GUARDRAIL MICRO FOOTER
// ============================================================================
// Purpose: Minimal, trust-first footer for compliance product
// Tone: Calm, authoritative, verification-forward (not marketing)
// Visual: Apple/Linear-caliber, theme-aware, border-led (no shadows)
// 
// Hard constraints:
// - No multi-column sitemap
// - No social icons  
// - No accent blocks or gradients
// - No marketing copy or CTAs
// - Light mode: NO shadows (borders only)
// - Dark mode: borders over shadows
// ============================================================================

interface FooterProps {
  /** Optional verification strip - only include if it improves trust */
  showVerificationStrip?: boolean;
}

export function Footer({ showVerificationStrip = true }: FooterProps) {
  return (
    <footer className="bg-theme-bg border-t border-theme-border-1">
      <div className="mx-auto max-w-[1080px] px-6 xl:px-8">
        {/* Optional Verification Strip */}
        {showVerificationStrip && (
          <div className="py-6 border-b border-theme-border-2">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <button
                onClick={() => {
                  // Open methodology drawer/modal
                  console.log('Open methodology');
                }}
                className="inline-flex items-center gap-1.5 text-[12px] text-theme-text-3 hover:text-theme-text-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                <ExternalLink className="w-[14px] h-[14px]" strokeWidth={2} />
                <span>How scoring works</span>
              </button>

              <a
                href="/sample-report.pdf"
                className="inline-flex items-center gap-1.5 text-[12px] text-theme-text-3 hover:text-theme-text-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
                download
              >
                <ExternalLink className="w-[14px] h-[14px]" strokeWidth={2} />
                <span>Download sample report</span>
              </a>

              <a
                href="/methodology"
                className="inline-flex items-center gap-1.5 text-[12px] text-theme-text-3 hover:text-theme-text-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                <ExternalLink className="w-[14px] h-[14px]" strokeWidth={2} />
                <span>See methodology</span>
              </a>
            </div>
          </div>
        )}

        {/* Micro Footer */}
        <div className="py-7 sm:py-8">
          {/* Desktop: Side-by-side layout */}
          <div className="hidden sm:flex items-start justify-between gap-8">
            {/* Left Block: Fine Print */}
            <div className="flex-1 max-w-[540px]">
              <p className="text-[11px] text-theme-text-3 leading-[1.8] tracking-[0.01em] mb-1.5">
                Rule-based checks for California wage & hour. Not legal advice.
              </p>
              <p className="text-[11px] text-theme-text-3 leading-[1.8] tracking-[0.01em]">
                Assessment version v1 • Last updated Jan 2026
              </p>
            </div>

            {/* Right Block: Links */}
            <nav className="flex items-center gap-5 flex-shrink-0" aria-label="Footer navigation">
              <a
                href="/methodology"
                className="text-[12px] text-theme-text-3 hover:text-theme-text-2 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                Methodology
              </a>
              <a
                href="/privacy"
                className="text-[12px] text-theme-text-3 hover:text-theme-text-2 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-[12px] text-theme-text-3 hover:text-theme-text-2 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                Terms
              </a>
              <a
                href="/contact"
                className="text-[12px] text-theme-text-3 hover:text-theme-text-2 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="sm:hidden space-y-5">
            {/* Fine Print */}
            <div>
              <p className="text-[11px] text-theme-text-3 leading-[1.8] tracking-[0.01em] mb-1.5">
                Rule-based checks for California wage & hour. Not legal advice.
              </p>
              <p className="text-[11px] text-theme-text-3 leading-[1.8] tracking-[0.01em]">
                Assessment version v1 • Last updated Jan 2026
              </p>
            </div>

            {/* Links - Wrapped with 44px touch targets */}
            <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer navigation">
              <a
                href="/methodology"
                className="inline-flex items-center min-h-[44px] py-2 text-[12px] text-theme-text-3 hover:text-theme-text-2 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                Methodology
              </a>
              <a
                href="/privacy"
                className="inline-flex items-center min-h-[44px] py-2 text-[12px] text-theme-text-3 hover:text-theme-text-2 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="inline-flex items-center min-h-[44px] py-2 text-[12px] text-theme-text-3 hover:text-theme-text-2 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                Terms
              </a>
              <a
                href="/contact"
                className="inline-flex items-center min-h-[44px] py-2 text-[12px] text-theme-text-3 hover:text-theme-text-2 hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-sm"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// DESIGN NOTES
// ============================================================================
//
// Typography:
// - 11px fine print with 1.8 line height and subtle tracking
// - 12px links (slightly larger for readability)
// - text-3 default → text-2 on hover (quiet hierarchy)
//
// Layout:
// - Max width 1080px (matches landing page grid)
// - Desktop: side-by-side (fine print left, links right)
// - Mobile: stacked (fine print first, links second)
// - 44px touch targets on mobile (invisible padding, not chunky text)
//
// Theme Tokens:
// - bg-theme-bg (no contrast panel)
// - border-theme-border-1 (top divider)
// - border-theme-border-2 (verification strip divider)
// - text-theme-text-3 (default)
// - text-theme-text-2 (hover)
// - focus-ring-theme-focus (accessible focus)
//
// NO shadows anywhere (light or dark mode)
// NO accent blocks or gradients
// NO marketing copy or CTAs
//
// ============================================================================
