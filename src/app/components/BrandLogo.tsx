import { Link } from 'react-router';
import { GuardrailLogoMark } from '@/app/components/GuardrailLogoMark';

interface BrandLogoProps {
  variant?: 'mark' | 'lockup';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  linkTo?: string;
}

const sizeMap = {
  mark: {
    sm: 20,
    md: 28,
    lg: 36,
  },
  lockup: {
    icon: {
      sm: 20,
      md: 28,
      lg: 36,
    },
    text: {
      sm: '14px',
      md: '17px',
      lg: '20px',
    }
  },
};

export function BrandLogo({ 
  variant = 'lockup', 
  size = 'md', 
  className = '',
  linkTo = '/'
}: BrandLogoProps) {
  
  const content = variant === 'mark' ? (
    // Icon only - uses currentColor (theme-aware)
    <GuardrailLogoMark size={sizeMap.mark[size]} className="text-theme-text-1" />
  ) : (
    // Lockup: Icon + Text (matching BrandKit.tsx line 417-422)
    <div className="flex items-center gap-3 text-theme-text-1">
      <GuardrailLogoMark size={sizeMap.lockup.icon[size]} />
      <div className="flex items-baseline gap-1.5">
        <span 
          className="font-semibold tracking-tight"
          style={{ fontSize: sizeMap.lockup.text[size] }}
        >
          Guardrail
        </span>
        <span 
          className="font-normal text-theme-text-3 tracking-tight"
          style={{ fontSize: sizeMap.lockup.text[size] }}
        >
          HR
        </span>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link 
        to={linkTo}
        className={`inline-flex items-center focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-lg ${className}`}
        aria-label="Guardrail HR Home"
      >
        {content}
      </Link>
    );
  }

  return <div className={`inline-flex items-center ${className}`}>{content}</div>;
}

// Mobile-specific variant: icon + "Guardrail" text (compact)
export function BrandLogoMobile({ className = '' }: { className?: string }) {
  return (
    <Link 
      to="/"
      className={`inline-flex items-center gap-2.5 text-theme-text-1 focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg rounded-lg ${className}`}
      aria-label="Guardrail HR Home"
    >
      <GuardrailLogoMark size={24} />
      <span className="text-[17px] font-semibold tracking-tight">Guardrail</span>
    </Link>
  );
}
