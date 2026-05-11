// Guardrail HR Logo Mark - Rails with precision notch
// Source: /src/app/pages/BrandKit.tsx LogoFinal1
// Theme-aware: Uses currentColor by default, adapts to light/dark modes

interface GuardrailLogoMarkProps {
  /** 
   * Color of the logo. 
   * - Use 'currentColor' (default) to inherit text color from parent
   * - Or pass specific color value (e.g., 'white', '#000', 'rgb(...)') 
   */
  color?: string;
  size?: number;
  className?: string;
}

export function GuardrailLogoMark({ 
  color = 'currentColor', 
  size = 48,
  className = ''
}: GuardrailLogoMarkProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none"
      className={className}
      aria-label="Guardrail HR"
    >
      {/* Refined: Rails with precision notch */}
      <rect x="10" y="14" width="28" height="3.5" rx="1.75" fill={color} />
      <rect x="10" y="30.5" width="28" height="3.5" rx="1.75" fill={color} />
      <rect x="22.25" y="21.5" width="3.5" height="5" rx="1.75" fill={color} />
    </svg>
  );
}
