import { useState } from 'react';

// Logo Mark Concepts - Direction A: Dual Rails + Notch
function LogoA1({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Two parallel rails with center notch */}
      <rect x="12" y="14" width="24" height="3" rx="1.5" fill={color} />
      <rect x="12" y="31" width="24" height="3" rx="1.5" fill={color} />
      <rect x="22.5" y="22" width="3" height="4" rx="1.5" fill={color} />
    </svg>
  );
}

function LogoA2({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Rails with stepped notch */}
      <path
        d="M12 16.5C12 15.6716 12.6716 15 13.5 15H34.5C35.3284 15 36 15.6716 36 16.5C36 17.3284 35.3284 18 34.5 18H13.5C12.6716 18 12 17.3284 12 16.5Z"
        fill={color}
      />
      <path
        d="M12 31.5C12 30.6716 12.6716 30 13.5 30H34.5C35.3284 30 36 30.6716 36 31.5C36 32.3284 35.3284 33 34.5 33H13.5C12.6716 33 12 32.3284 12 31.5Z"
        fill={color}
      />
      <rect x="21" y="21" width="6" height="2" rx="1" fill={color} />
      <rect x="21" y="25" width="6" height="2" rx="1" fill={color} />
    </svg>
  );
}

function LogoA3({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Rails with diagonal break */}
      <path
        d="M12 15.5C12 14.6716 12.6716 14 13.5 14H22L26 18H34.5C35.3284 18 36 17.3284 36 16.5C36 15.6716 35.3284 15 34.5 15H26.4142L21.5858 19.8284C21.2107 20.2036 20.702 20.4142 20.1716 20.4142H13.5C12.6716 20.4142 12 19.7426 12 18.9142V15.5Z"
        fill={color}
      />
      <rect x="12" y="30" width="24" height="3" rx="1.5" fill={color} />
    </svg>
  );
}

// Logo Mark Concepts - Direction B: G Monogram from Rails
function LogoB1({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* G shape from two rails using negative space */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36C27.5 36 30.6 34.4 32.7 31.9L29.5 29.2C28.2 30.6 26.2 31.5 24 31.5C19.8579 31.5 16.5 28.1421 16.5 24C16.5 19.8579 19.8579 16.5 24 16.5C26.5 16.5 28.7 17.6 30.1 19.3L33.3 16.6C31.1 13.9 27.8 12 24 12Z"
        fill={color}
      />
      <rect x="24" y="22" width="9" height="3.5" rx="1.75" fill={color} />
    </svg>
  );
}

function LogoB2({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Abstract G from geometric rails */}
      <path
        d="M14 14C14 12.8954 14.8954 12 16 12H32C33.1046 12 34 12.8954 34 14V16C34 17.1046 33.1046 18 32 18H18V30H32C33.1046 30 34 30.8954 34 32V34C34 35.1046 33.1046 36 32 36H16C14.8954 36 14 35.1046 14 34V14Z"
        fill={color}
      />
      <rect x="24" y="22" width="10" height="4" rx="2" fill={color} />
    </svg>
  );
}

function LogoB3({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Rounded G from double lines */}
      <path
        d="M24 15C19.0294 15 15 19.0294 15 24C15 28.9706 19.0294 33 24 33C26.8 33 29.3 31.7 31 29.7V26H24V23H34V31.5C31.6 34.4 28 36 24 36C17.3726 36 12 30.6274 12 24C12 17.3726 17.3726 12 24 12C27.8 12 31.2 13.8 33.5 16.5L31.2 18.3C29.5 16.4 26.9 15 24 15Z"
        fill={color}
      />
    </svg>
  );
}

// Logo Mark Concepts - Direction C: Bracket/Guard Corners
function LogoC1({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Four corner brackets */}
      <path d="M14 14H20V17H17V20H14V14Z" fill={color} />
      <path d="M34 14H28V17H31V20H34V14Z" fill={color} />
      <path d="M14 34H20V31H17V28H14V34Z" fill={color} />
      <path d="M34 34H28V31H31V28H34V34Z" fill={color} />
    </svg>
  );
}

function LogoC2({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Rounded corner guards */}
      <path
        d="M14 18C14 15.7909 15.7909 14 18 14H20V17H18C17.4477 17 17 17.4477 17 18V20H14V18Z"
        fill={color}
      />
      <path
        d="M34 18C34 15.7909 32.2091 14 30 14H28V17H30C30.5523 17 31 17.4477 31 18V20H34V18Z"
        fill={color}
      />
      <path
        d="M14 30C14 32.2091 15.7909 34 18 34H20V31H18C17.4477 31 17 30.5523 17 30V28H14V30Z"
        fill={color}
      />
      <path
        d="M34 30C34 32.2091 32.2091 34 30 34H28V31H30C30.5523 31 31 30.5523 31 30V28H34V30Z"
        fill={color}
      />
    </svg>
  );
}

function LogoC3({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Asymmetric guard brackets - left and right only */}
      <path
        d="M15 16C15 14.8954 15.8954 14 17 14H19V18H19C18.4477 18 18 18.4477 18 19V29C18 29.5523 18.4477 30 19 30H19V34H17C15.8954 34 15 33.1046 15 32V16Z"
        fill={color}
      />
      <path
        d="M33 16C33 14.8954 32.1046 14 31 14H29V18H29C29.5523 18 30 18.4477 30 19V29C30 29.5523 29.5523 30 29 30H29V34H31C32.1046 34 33 33.1046 33 32V16Z"
        fill={color}
      />
    </svg>
  );
}

// Logo Mark Concepts - Direction D: Signal + Boundary
function LogoD1({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Dot traveling along rail path */}
      <rect x="14" y="14" width="20" height="3" rx="1.5" fill={color} />
      <circle cx="24" cy="24" r="3" fill={color} />
      <rect x="14" y="31" width="20" height="3" rx="1.5" fill={color} />
    </svg>
  );
}

function LogoD2({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Signal line within boundary */}
      <rect x="14" y="12" width="3" height="24" rx="1.5" fill={color} />
      <rect x="31" y="12" width="3" height="24" rx="1.5" fill={color} />
      <path
        d="M20 18L22 24L24 20L26 28L28 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoD3({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Contained pulse/metric */}
      <rect x="12" y="20" width="24" height="8" rx="4" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="20" cy="24" r="2.5" fill={color} />
      <circle cx="24" cy="24" r="2.5" fill={color} />
      <circle cx="28" cy="24" r="2.5" fill={color} />
    </svg>
  );
}

// Refined Final Logo Concepts
function LogoFinal1({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Refined: Rails with precision notch */}
      <rect x="10" y="14" width="28" height="3.5" rx="1.75" fill={color} />
      <rect x="10" y="30.5" width="28" height="3.5" rx="1.75" fill={color} />
      <rect x="22.25" y="21.5" width="3.5" height="5" rx="1.75" fill={color} />
    </svg>
  );
}

function LogoFinal2({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Refined: Corner guards (rounded) */}
      <path
        d="M13 19C13 15.6863 15.6863 13 19 13H21V17H19C18.4477 17 18 17.4477 18 18V21H13V19Z"
        fill={color}
      />
      <path
        d="M35 19C35 15.6863 32.3137 13 29 13H27V17H29C29.5523 17 30 17.4477 30 18V21H35V19Z"
        fill={color}
      />
      <path
        d="M13 29C13 32.3137 15.6863 35 19 35H21V31H19C18.4477 31 18 30.5523 18 30V27H13V29Z"
        fill={color}
      />
      <path
        d="M35 29C35 32.3137 32.3137 35 29 35H27V31H29C29.5523 31 30 30.5523 30 30V27H35V29Z"
        fill={color}
      />
    </svg>
  );
}

function LogoFinal3({ color = 'white', size = 48 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Refined: G monogram (simplified) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 13C18.4772 13 14 17.4772 14 23C14 28.5228 18.4772 33 24 33C27.1 33 29.9 31.6 31.8 29.4L29.1 27.2C27.8 28.5 26 29.3 24 29.3C20.5817 29.3 17.8 26.5183 17.8 23C17.8 19.4817 20.5817 16.7 24 16.7C26.2 16.7 28.1 17.7 29.4 19.2L32.1 17C30.1 14.6 27.2 13 24 13Z"
        fill={color}
      />
      <rect x="24" y="21.5" width="10" height="3.5" rx="1.75" fill={color} />
    </svg>
  );
}

export function BrandKit() {
  const [selectedConcept, setSelectedConcept] = useState<'final1' | 'final2' | 'final3'>('final1');
  const accentBlue = '#5b6ff5';

  const concepts = [
    { id: 'A1', component: LogoA1, label: 'Rails + Center Notch' },
    { id: 'A2', component: LogoA2, label: 'Rails + Stepped Break' },
    { id: 'A3', component: LogoA3, label: 'Rails + Diagonal Break' },
    { id: 'B1', component: LogoB1, label: 'G from Curved Rails' },
    { id: 'B2', component: LogoB2, label: 'G from Geometric Rails' },
    { id: 'B3', component: LogoB3, label: 'G from Rounded Lines' },
    { id: 'C1', component: LogoC1, label: 'Corner Brackets (Sharp)' },
    { id: 'C2', component: LogoC2, label: 'Corner Brackets (Rounded)' },
    { id: 'C3', component: LogoC3, label: 'Side Guards (Asymmetric)' },
    { id: 'D1', component: LogoD1, label: 'Dot + Rails' },
    { id: 'D2', component: LogoD2, label: 'Signal Line + Boundaries' },
    { id: 'D3', component: LogoD3, label: 'Contained Pulse' },
  ];

  const finals = [
    { id: 'final1', component: LogoFinal1, label: 'Rails + Notch (Refined)' },
    { id: 'final2', component: LogoFinal2, label: 'Corner Guards (Refined)' },
    { id: 'final3', component: LogoFinal3, label: 'G Monogram (Refined)' },
  ];

  const CurrentLogo = finals.find((f) => f.id === selectedConcept)?.component || LogoFinal1;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-900">
        <div className="mx-auto max-w-[1400px] px-5 xl:px-8 py-16">
          <h1 className="text-[48px] font-semibold mb-4">Guardrail HR Brand Kit</h1>
          <p className="text-[17px] text-gray-400 max-w-[800px]">
            Logo system for compliance diagnostics. Dark, minimal, Apple/Stripe/Linear caliber.
            Premium and restrained—no hype, no mascots, no compliance clichés.
          </p>
        </div>
      </div>

      {/* Section 1: Initial Concepts (12 total, 4 directions × 3 each) */}
      <section className="mx-auto max-w-[1400px] px-5 xl:px-8 py-16">
        <h2 className="text-[32px] font-semibold mb-3">Initial Concepts</h2>
        <p className="text-[15px] text-gray-500 mb-12">
          12 explorations across 4 directions: A (Dual Rails), B (G Monogram), C (Brackets), D (Signal)
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {concepts.map(({ id, component: Component, label }) => (
            <div key={id} className="bg-[#161616] rounded-[16px] border border-gray-900/50 p-6">
              <div className="aspect-square bg-[#0a0a0a] rounded-[12px] flex items-center justify-center mb-4">
                <Component color="white" size={64} />
              </div>
              <div className="text-center mb-4">
                <div className="text-[13px] font-medium text-gray-400 mb-1">{id}</div>
                <div className="text-[12px] text-gray-600">{label}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square bg-[#0a0a0a] rounded-[8px] flex items-center justify-center">
                  <Component color="white" size={32} />
                </div>
                <div className="aspect-square bg-[#0a0a0a] rounded-[8px] flex items-center justify-center">
                  <Component color={accentBlue} size={32} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Refined Finals (Top 3) */}
      <section className="mx-auto max-w-[1400px] px-5 xl:px-8 py-16 border-t border-gray-900/50">
        <h2 className="text-[32px] font-semibold mb-3">Refined Finals</h2>
        <p className="text-[15px] text-gray-500 mb-12">
          Top 3 concepts refined with perfect spacing and optical adjustments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {finals.map(({ id, component: Component, label }) => (
            <button
              key={id}
              onClick={() => setSelectedConcept(id as any)}
              className={`bg-[#161616] rounded-[20px] border p-8 transition-all ${
                selectedConcept === id
                  ? 'border-[#5b6ff5]'
                  : 'border-gray-900/50 hover:border-gray-800'
              }`}
            >
              <div className="aspect-square bg-[#0a0a0a] rounded-[16px] flex items-center justify-center mb-6">
                <Component color="white" size={120} />
              </div>
              <div className="text-[15px] font-medium mb-2">{label}</div>
              <div className="flex gap-3 justify-center">
                <div className="w-16 h-16 bg-[#0a0a0a] rounded-[8px] flex items-center justify-center">
                  <Component color="white" size={32} />
                </div>
                <div className="w-16 h-16 bg-[#0a0a0a] rounded-[8px] flex items-center justify-center">
                  <Component color={accentBlue} size={32} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Large display of selected */}
        <div className="bg-[#161616] rounded-[24px] border border-gray-900/50 p-16">
          <div className="max-w-[600px] mx-auto">
            <div className="aspect-square bg-[#0a0a0a] rounded-[20px] flex items-center justify-center mb-8">
              <CurrentLogo color="white" size={240} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square bg-[#0a0a0a] rounded-[12px] flex items-center justify-center">
                <CurrentLogo color="white" size={64} />
              </div>
              <div className="aspect-square bg-[#0a0a0a] rounded-[12px] flex items-center justify-center">
                <CurrentLogo color={accentBlue} size={64} />
              </div>
              <div className="aspect-square bg-[#0a0a0a] rounded-[12px] flex items-center justify-center">
                <CurrentLogo color="white" size={32} />
              </div>
              <div className="aspect-square bg-[#0a0a0a] rounded-[12px] flex items-center justify-center">
                <CurrentLogo color="white" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Wordmark + Lockups */}
      <section className="mx-auto max-w-[1400px] px-5 xl:px-8 py-16 border-t border-gray-900/50">
        <h2 className="text-[32px] font-semibold mb-3">Wordmark + Lockups</h2>
        <p className="text-[15px] text-gray-500 mb-12">
          Clean grotesk wordmark with horizontal, stacked, and mark-only variations
        </p>

        <div className="space-y-6">
          {/* Horizontal Lockup */}
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <CurrentLogo color="white" size={48} />
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-semibold tracking-tight">Guardrail</span>
                <span className="text-[28px] font-normal text-gray-500 tracking-tight">HR</span>
              </div>
            </div>
            <div className="text-center text-[12px] text-gray-600">Horizontal Lockup (Primary)</div>
          </div>

          {/* Stacked Lockup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-12">
              <div className="flex flex-col items-center gap-4 mb-4">
                <CurrentLogo color="white" size={56} />
                <div className="flex items-baseline gap-2">
                  <span className="text-[24px] font-semibold tracking-tight">Guardrail</span>
                  <span className="text-[24px] font-normal text-gray-500 tracking-tight">HR</span>
                </div>
              </div>
              <div className="text-center text-[12px] text-gray-600">Stacked Lockup</div>
            </div>

            {/* Mark Only */}
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-12">
              <div className="flex items-center justify-center mb-4">
                <CurrentLogo color="white" size={80} />
              </div>
              <div className="text-center text-[12px] text-gray-600">Mark Only (Favicon, App Icon)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Usage Examples */}
      <section className="mx-auto max-w-[1400px] px-5 xl:px-8 py-16 border-t border-gray-900/50">
        <h2 className="text-[32px] font-semibold mb-3">Usage Examples</h2>
        <p className="text-[15px] text-gray-500 mb-12">
          Logo system in context: navigation, favicon, and results page
        </p>

        <div className="space-y-6">
          {/* Nav Example */}
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 overflow-hidden">
            <div className="border-b border-gray-900 bg-[#0a0a0a]">
              <div className="mx-auto max-w-[1200px] px-6">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-3">
                    <CurrentLogo color="white" size={28} />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[17px] font-semibold tracking-tight">Guardrail</span>
                      <span className="text-[17px] font-normal text-gray-500 tracking-tight">HR</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="text-[15px] text-gray-400">Modules</span>
                    <span className="text-[15px] text-gray-400">Resources</span>
                    <span className="text-[15px] text-gray-400">Account</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 text-center text-[12px] text-gray-600">
              Top Navigation (1200px container)
            </div>
          </div>

          {/* Favicon Examples */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
              <div className="w-16 h-16 bg-[#0a0a0a] rounded-[12px] flex items-center justify-center mx-auto mb-4">
                <CurrentLogo color="white" size={32} />
              </div>
              <div className="text-center text-[12px] text-gray-600">32px App Icon</div>
            </div>
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-[8px] flex items-center justify-center mx-auto mb-4">
                <CurrentLogo color="white" size={24} />
              </div>
              <div className="text-center text-[12px] text-gray-600">24px Icon</div>
            </div>
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
              <div className="w-8 h-8 bg-[#0a0a0a] rounded-[6px] flex items-center justify-center mx-auto mb-4">
                <CurrentLogo color="white" size={16} />
              </div>
              <div className="text-center text-[12px] text-gray-600">16px Favicon</div>
            </div>
            <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
              <div className="w-8 h-8 bg-[#5b6ff5] rounded-[6px] flex items-center justify-center mx-auto mb-4">
                <CurrentLogo color="white" size={16} />
              </div>
              <div className="text-center text-[12px] text-gray-600">Accent BG</div>
            </div>
          </div>

          {/* Results Page Header */}
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 overflow-hidden">
            <div className="bg-[#0a0a0a] p-8">
              <div className="flex items-center gap-3 mb-8">
                <CurrentLogo color="white" size={32} />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[19px] font-semibold tracking-tight">Guardrail</span>
                  <span className="text-[19px] font-normal text-gray-500 tracking-tight">HR</span>
                </div>
              </div>
              <h1 className="text-[17px] font-medium text-gray-400 text-center mb-6">
                Wage & Hour Risk Score
              </h1>
              <div className="text-center">
                <div className="text-[64px] font-semibold leading-none tracking-tight mb-3">
                  72
                  <span className="text-gray-600 text-[40px]"> / 100</span>
                </div>
                <p className="text-[15px] text-gray-300">
                  Elevated exposure under CA wage & hour rules
                </p>
              </div>
            </div>
            <div className="p-4 text-center text-[12px] text-gray-600 border-t border-gray-900">
              Results Page Header with Logo
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Specifications */}
      <section className="mx-auto max-w-[1400px] px-5 xl:px-8 py-16 border-t border-gray-900/50">
        <h2 className="text-[32px] font-semibold mb-3">Specifications</h2>
        <p className="text-[15px] text-gray-500 mb-12">
          Spacing rules, minimum sizes, and color usage
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Clearspace */}
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
            <h3 className="text-[19px] font-semibold mb-6">Clearspace</h3>
            <div className="relative bg-[#0a0a0a] rounded-[12px] p-12 mb-4">
              {/* Clearspace guides */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-[#5b6ff5]/30" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-[#5b6ff5]/30" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-px bg-[#5b6ff5]/30" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-px bg-[#5b6ff5]/30" />
              
              <div className="flex items-center justify-center">
                <CurrentLogo color="white" size={64} />
              </div>
            </div>
            <p className="text-[13px] text-gray-500">
              Minimum clearspace equals the height of one rail element (x-height of mark)
            </p>
          </div>

          {/* Minimum Sizes */}
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
            <h3 className="text-[19px] font-semibold mb-6">Minimum Sizes</h3>
            <div className="space-y-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">Mark only (digital)</span>
                <span className="text-[13px] font-medium">16px</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">Mark only (print)</span>
                <span className="text-[13px] font-medium">0.25"</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">Horizontal lockup (digital)</span>
                <span className="text-[13px] font-medium">120px width</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">Horizontal lockup (print)</span>
                <span className="text-[13px] font-medium">1.5"</span>
              </div>
            </div>
            <p className="text-[13px] text-gray-500">
              Below these sizes, legibility and optical balance degrade
            </p>
          </div>

          {/* Color Palette */}
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
            <h3 className="text-[19px] font-semibold mb-6">Color Palette</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-[8px]" />
                <div>
                  <div className="text-[13px] font-medium">White (Primary)</div>
                  <div className="text-[11px] text-gray-600 font-mono">#FFFFFF</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f5f5f5] rounded-[8px]" />
                <div>
                  <div className="text-[13px] font-medium">Near-White</div>
                  <div className="text-[11px] text-gray-600 font-mono">#F5F5F5</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5b6ff5] rounded-[8px]" />
                <div>
                  <div className="text-[13px] font-medium">Electric Blue (Accent)</div>
                  <div className="text-[11px] text-gray-600 font-mono">#5B6FF5</div>
                </div>
              </div>
            </div>
            <p className="text-[13px] text-gray-500 mt-4">
              Primary usage: white/near-white on dark backgrounds. Blue accent is optional.
            </p>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
            <h3 className="text-[19px] font-semibold mb-6">Usage Guidelines</h3>
            <ul className="space-y-3 text-[13px] text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#5b6ff5] mt-0.5">✓</span>
                <span>Use on dark backgrounds (#0a0a0a, #161616)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5b6ff5] mt-0.5">✓</span>
                <span>Maintain proper clearspace around mark</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5b6ff5] mt-0.5">✓</span>
                <span>Works in monochrome or with accent blue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Don't add outlines, shadows, or effects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Don't rotate, skew, or distort proportions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>Don't use on busy backgrounds or photos</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Export-Ready Assets */}
      <section className="mx-auto max-w-[1400px] px-5 xl:px-8 py-16 border-t border-gray-900/50">
        <h2 className="text-[32px] font-semibold mb-3">Export-Ready Assets</h2>
        <p className="text-[15px] text-gray-500 mb-12">
          SVG vector shapes ready for production use
        </p>

        <div className="bg-[#161616] rounded-[20px] border border-gray-900/50 p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-900">
              <div>
                <div className="text-[15px] font-medium mb-1">Logo Mark (SVG)</div>
                <div className="text-[12px] text-gray-600">48×48 viewBox, scalable vector</div>
              </div>
              <button className="px-4 py-2 rounded-[10px] bg-[#5b6ff5] text-white text-[13px] font-medium hover:bg-[#4a5ee0] transition-colors">
                Copy SVG
              </button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-900">
              <div>
                <div className="text-[15px] font-medium mb-1">Horizontal Lockup (SVG)</div>
                <div className="text-[12px] text-gray-600">Mark + wordmark, production-ready</div>
              </div>
              <button className="px-4 py-2 rounded-[10px] bg-[#5b6ff5] text-white text-[13px] font-medium hover:bg-[#4a5ee0] transition-colors">
                Copy SVG
              </button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-900">
              <div>
                <div className="text-[15px] font-medium mb-1">Favicon (16px PNG)</div>
                <div className="text-[12px] text-gray-600">Optimized for browser tabs</div>
              </div>
              <button className="px-4 py-2 rounded-[10px] bg-[#5b6ff5] text-white text-[13px] font-medium hover:bg-[#4a5ee0] transition-colors">
                Download
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-[15px] font-medium mb-1">App Icon Set</div>
                <div className="text-[12px] text-gray-600">16px, 32px, 64px, 128px, 256px</div>
              </div>
              <button className="px-4 py-2 rounded-[10px] bg-[#5b6ff5] text-white text-[13px] font-medium hover:bg-[#4a5ee0] transition-colors">
                Download
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
