import { BrandLogo, BrandLogoMobile } from '@/app/components/BrandLogo';
import { GuardrailLogoMark } from '@/app/components/GuardrailLogoMark';

export function BrandLogoShowcase() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12">
      <div className="mx-auto max-w-[1200px] px-5 xl:px-8">
        <h1 className="text-[48px] font-semibold mb-3 tracking-tight">
          Brand Logo Implementation
        </h1>
        <p className="text-[17px] text-gray-500 mb-16">
          Guardrail HR logo system - Rails with precision notch
        </p>

        {/* Logo Design */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-8">Logo Design</h2>
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-12">
            <div className="flex flex-col items-center gap-6">
              <GuardrailLogoMark color="white" size={120} />
              <div className="text-center">
                <h3 className="text-[19px] font-semibold mb-2">Rails with Precision Notch</h3>
                <p className="text-[14px] text-gray-500 max-w-[500px]">
                  Two parallel rails represent guidance and boundaries, with a center notch symbolizing measurement and precision. Clean, minimal, and professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Variants */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-8">Logo Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lockup */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
              <h3 className="text-[19px] font-semibold mb-6">Lockup (Desktop Nav)</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <BrandLogo variant="lockup" size="sm" linkTo="" />
                  <span className="text-[13px] text-gray-600">Small (h-6)</span>
                </div>
                <div className="flex items-center gap-4">
                  <BrandLogo variant="lockup" size="md" linkTo="" />
                  <span className="text-[13px] text-gray-600">Medium (h-8) — Default</span>
                </div>
                <div className="flex items-center gap-4">
                  <BrandLogo variant="lockup" size="lg" linkTo="" />
                  <span className="text-[13px] text-gray-600">Large (h-10)</span>
                </div>
              </div>
            </div>

            {/* Mark */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
              <h3 className="text-[19px] font-semibold mb-6">Mark (Icon Only)</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <BrandLogo variant="mark" size="sm" linkTo="" />
                  <span className="text-[13px] text-gray-600">Small (6×6)</span>
                </div>
                <div className="flex items-center gap-4">
                  <BrandLogo variant="mark" size="md" linkTo="" />
                  <span className="text-[13px] text-gray-600">Medium (8×8)</span>
                </div>
                <div className="flex items-center gap-4">
                  <BrandLogo variant="mark" size="lg" linkTo="" />
                  <span className="text-[13px] text-gray-600">Large (10×10)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Variant */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-8">Mobile Variant</h2>
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
            <BrandLogoMobile />
            <p className="text-[13px] text-gray-600 mt-4">
              Icon + "Guardrail" text (without "HR") for compact mobile nav
            </p>
          </div>
        </section>

        {/* In Context */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-8">In Context</h2>
          
          {/* Desktop Nav Simulation */}
          <div className="mb-8">
            <h3 className="text-[19px] font-semibold mb-4">Desktop Navigation</h3>
            <div className="bg-[#0a0a0a] border border-gray-900 rounded-[20px] overflow-hidden">
              <div className="px-8 py-4 flex items-center justify-between">
                <BrandLogo variant="lockup" size="md" />
                <div className="flex items-center gap-8">
                  <span className="text-[15px] text-gray-400">Modules</span>
                  <span className="text-[15px] text-gray-400">Resources</span>
                  <span className="text-[15px] text-gray-400">Account</span>
                  <button className="px-5 py-2 rounded-[14px] bg-[#5b6ff5] text-white text-[15px] font-medium">
                    Run scan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Nav Simulation */}
          <div>
            <h3 className="text-[19px] font-semibold mb-4">Mobile Navigation</h3>
            <div className="bg-[#0a0a0a] border border-gray-900 rounded-[20px] overflow-hidden max-w-[390px]">
              <div className="px-5 py-4 flex items-center justify-between">
                <BrandLogoMobile />
                <button className="text-[15px] text-gray-400">Menu</button>
              </div>
            </div>
          </div>
        </section>

        {/* Asset Specifications */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-8">Asset Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <h3 className="text-[17px] font-semibold mb-4">SVG Files</h3>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li><code className="text-[#5b6ff5]">/public/brand/logo-mark.svg</code></li>
                <li><code className="text-[#5b6ff5]">/public/brand/logo-lockup.svg</code></li>
                <li><code className="text-[#5b6ff5]">/public/brand/favicon.svg</code></li>
              </ul>
              <p className="text-[13px] text-gray-600 mt-4">
                All SVGs use <code>currentColor</code> for dynamic theming
              </p>
            </div>

            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <h3 className="text-[17px] font-semibold mb-4">PNG Files (for conversion)</h3>
              <ul className="space-y-2 text-[14px] text-gray-400">
                <li>favicon-16x16.png (16×16)</li>
                <li>favicon-32x32.png (32×32)</li>
                <li>apple-touch-icon.png (180×180)</li>
                <li>icon-192.png (192×192)</li>
                <li>icon-512.png (512×512)</li>
                <li>og-image.png (1200×630)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-8">Usage Guidelines</h2>
          
          <div className="space-y-6">
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <h3 className="text-[17px] font-semibold mb-3">✅ Do</h3>
              <ul className="space-y-2 text-[14px] text-gray-400 list-disc list-inside">
                <li>Use <code className="text-[#5b6ff5]">&lt;BrandLogo /&gt;</code> component for all logo instances</li>
                <li>Maintain minimum clear space around logo (equal to mark height)</li>
                <li>Use lockup variant for desktop navigation</li>
                <li>Use mobile variant for viewports &lt;768px</li>
                <li>Ensure sufficient contrast on dark backgrounds</li>
              </ul>
            </div>

            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
              <h3 className="text-[17px] font-semibold mb-3">❌ Don't</h3>
              <ul className="space-y-2 text-[14px] text-gray-400 list-disc list-inside">
                <li>Don't distort or stretch the logo aspect ratio</li>
                <li>Don't use multiple logo variants on the same page</li>
                <li>Don't apply drop shadows or effects</li>
                <li>Don't use on low-contrast backgrounds</li>
                <li>Don't create custom logo variations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Component API */}
        <section className="mb-16">
          <h2 className="text-[32px] font-semibold mb-8">Component API</h2>
          
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-6">
            <h3 className="text-[17px] font-semibold mb-4">&lt;BrandLogo /&gt;</h3>
            <pre className="bg-[#0a0a0a] p-4 rounded-[12px] text-[13px] overflow-x-auto mb-4">
{`import { BrandLogo } from '@/app/components/BrandLogo';

<BrandLogo 
  variant="lockup"  // 'mark' | 'lockup' (default: 'lockup')
  size="md"         // 'sm' | 'md' | 'lg' (default: 'md')
  className=""      // Additional Tailwind classes
  linkTo="/"        // Wrap in Link component (default: '/')
/>`}
            </pre>

            <h3 className="text-[17px] font-semibold mb-4 mt-6">&lt;BrandLogoMobile /&gt;</h3>
            <pre className="bg-[#0a0a0a] p-4 rounded-[12px] text-[13px] overflow-x-auto">
{`import { BrandLogoMobile } from '@/app/components/BrandLogo';

<BrandLogoMobile 
  className=""  // Additional Tailwind classes
/>`}
            </pre>
          </div>
        </section>

        {/* Color Palette Reference */}
        <section>
          <h2 className="text-[32px] font-semibold mb-8">Color Palette</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0a0a0a] rounded-[16px] border border-gray-900/50 p-6">
              <div className="w-full h-16 bg-[#0a0a0a] rounded-[12px] border border-gray-900 mb-3"></div>
              <p className="text-[13px] font-medium">Background</p>
              <code className="text-[11px] text-gray-600">#0a0a0a</code>
            </div>
            <div className="bg-[#0a0a0a] rounded-[16px] border border-gray-900/50 p-6">
              <div className="w-full h-16 bg-[#161616] rounded-[12px] mb-3"></div>
              <p className="text-[13px] font-medium">Card</p>
              <code className="text-[11px] text-gray-600">#161616</code>
            </div>
            <div className="bg-[#0a0a0a] rounded-[16px] border border-gray-900/50 p-6">
              <div className="w-full h-16 bg-[#5b6ff5] rounded-[12px] mb-3"></div>
              <p className="text-[13px] font-medium">Accent</p>
              <code className="text-[11px] text-gray-600">#5b6ff5</code>
            </div>
            <div className="bg-[#0a0a0a] rounded-[16px] border border-gray-900/50 p-6">
              <div className="w-full h-16 bg-white rounded-[12px] mb-3"></div>
              <p className="text-[13px] font-medium">Logo</p>
              <code className="text-[11px] text-gray-600">#ffffff</code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}