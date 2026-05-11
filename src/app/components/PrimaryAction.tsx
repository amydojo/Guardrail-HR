import { ArrowRight, Lock } from 'lucide-react';
import { forwardRef, HTMLAttributes, useState } from 'react';

// ============================================================================
// DESIGN SYSTEM PRIMITIVE — GUARDRAIL PREMIUM BUTTON
// ============================================================================
// Single source of truth for all primary CTAs across Guardrail HR
// Role: Strict, state-aware action primitive with premium control surface feel
// Philosophy: Calm, credible, compliance-tech — Apple/Linear caliber
// 
// Visual System: Premium Control Surface (Not Generic Blue Pill)
// - Accent-tinted surfaces with crisp borders (light mode)
// - Glass with controlled accent edge (dark mode)
// - Never dominant, always intentional
// - Border-led design language
//
// DO NOT introduce alternate button styles
// DO NOT override with className styling (except width)
// DO NOT add visual flair beyond system
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

type Context = 'nav' | 'hero' | 'inline' | 'modal';
type State = 'pre_scan' | 'in_progress' | 'post_scan' | 'locked' | 'upgrade';
type Size = 'sm' | 'md' | 'lg';

interface PrimaryActionProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual context - determines sizing and emphasis */
  context: Context;
  
  /** Current user/system state - determines copy and treatment */
  state: State;
  
  /** Size override (auto-set by context in most cases) */
  size?: Size;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Click handler */
  onClick?: () => void;
}

// ============================================================================
// ENFORCED COPY LOGIC (STATE-DRIVEN, NOT DESIGNER CHOICE)
// ============================================================================

const getCopyForState = (state: State, context: Context): { label: string; subtext?: string } => {
  switch (state) {
    case 'pre_scan':
      return {
        label: context === 'nav' ? 'Start scan' : 'Run wage & hour scan',
        subtext: undefined
      };
    
    case 'in_progress':
      return {
        label: 'Continue scan',
        subtext: context === 'nav' ? 'In progress' : undefined
      };
    
    case 'post_scan':
      return {
        label: 'Review results',
        subtext: undefined
      };
    
    case 'locked':
      return {
        label: 'Unlock full analysis',
        subtext: undefined
      };
    
    case 'upgrade':
      return {
        label: 'Upgrade to Plus',
        subtext: undefined
      };
    
    default:
      return { label: 'Continue' };
  }
};

// ============================================================================
// SIZE ENFORCEMENT (CONTEXT-DRIVEN)
// ============================================================================

const getSizeForContext = (context: Context, sizeOverride?: Size): Size => {
  // Context forces size - overrides are ignored
  if (context === 'nav') return 'sm';
  if (context === 'hero') return 'lg';
  return sizeOverride || 'md';
};

// ============================================================================
// VISUAL SYSTEM: GUARDRAIL PREMIUM STYLING (TOKEN-BASED ONLY)
// ============================================================================

const getSizeStyles = (size: Size): string => {
  switch (size) {
    case 'sm':
      // Nav context: precise optical centering
      return 'h-[40px] px-[22px] text-[15px] leading-none';
    case 'md':
      return 'h-[48px] px-6 text-[15px] leading-none';
    case 'lg':
      // Hero context: mobile-optimized with responsive sizing
      return 'h-[52px] sm:h-[56px] px-6 sm:px-7 text-[16px] sm:text-[17px] leading-none';
  }
};

const getButtonStyles = (context: Context, state: State): string => {
  const isLocked = state === 'locked' || state === 'upgrade';
  
  // Base structure (applies to all contexts)
  const baseStyle = 'rounded-full';
  
  // Contextual styling - all token-based
  switch (context) {
    case 'nav':
      // Nav: Subtle, never dominant
      if (isLocked) {
        return `${baseStyle} 
          bg-theme-surface-1 text-theme-text-2 border border-theme-border-1
          hover:border-theme-border-1
          dark:bg-theme-surface-1 dark:text-theme-text-2 dark:border-theme-border-1
          dark:hover:border-theme-border-1`;
      }
      return `${baseStyle} 
        bg-theme-accent-surface text-theme-accent border border-theme-accent-border
        hover:bg-theme-accent-surface-hover hover:border-theme-accent-border-hover
        dark:bg-theme-surface-1 dark:text-theme-accent dark:border-theme-accent-border
        dark:hover:bg-theme-surface-1 dark:hover:border-theme-accent-border-hover`;
    
    case 'hero':
      // Hero: Signature Guardrail button (premium control surface)
      if (isLocked) {
        return `${baseStyle} 
          bg-theme-surface-1 text-theme-text-2 border border-theme-border-1 shadow-theme-1
          hover:border-theme-border-1 hover:-translate-y-[1px] hover:shadow-theme-2
          dark:bg-theme-surface-1 dark:text-theme-text-2 dark:border-theme-border-1 dark:shadow-theme-1
          dark:hover:border-theme-border-1 dark:hover:-translate-y-[1px] dark:hover:shadow-theme-2`;
      }
      return `${baseStyle} 
        bg-theme-accent text-theme-accent-text-on border border-theme-accent-border shadow-theme-1
        hover:bg-theme-accent-hover hover:border-theme-accent-border-hover hover:-translate-y-[1px] hover:shadow-theme-2
        dark:bg-theme-surface-1 dark:text-theme-accent dark:border-theme-accent-border dark:shadow-theme-1
        dark:hover:bg-theme-surface-1 dark:hover:border-theme-accent-border-hover dark:hover:-translate-y-[1px] dark:hover:shadow-theme-2`;
    
    case 'inline':
      // Inline: Balanced, less visual weight than hero
      if (isLocked) {
        return `${baseStyle} 
          bg-theme-surface-1 text-theme-text-2 border border-theme-border-1
          hover:border-theme-border-1
          dark:bg-theme-surface-1 dark:text-theme-text-2 dark:border-theme-border-1
          dark:hover:border-theme-border-1`;
      }
      return `${baseStyle} 
        bg-theme-accent text-theme-accent-text-on border border-theme-accent-border
        hover:bg-theme-accent-hover hover:border-theme-accent-border-hover
        dark:bg-theme-surface-1 dark:text-theme-accent dark:border-theme-accent-border
        dark:hover:bg-theme-surface-1 dark:hover:border-theme-accent-border-hover`;
    
    case 'modal':
      // Modal: Same as inline, never dominant
      if (isLocked) {
        return `${baseStyle} 
          bg-theme-surface-1 text-theme-text-2 border border-theme-border-1
          hover:border-theme-border-1
          dark:bg-theme-surface-1 dark:text-theme-text-2 dark:border-theme-border-1
          dark:hover:border-theme-border-1`;
      }
      return `${baseStyle} 
        bg-theme-accent text-theme-accent-text-on border border-theme-accent-border
        hover:bg-theme-accent-hover hover:border-theme-accent-border-hover
        dark:bg-theme-surface-1 dark:text-theme-accent dark:border-theme-accent-border
        dark:hover:bg-theme-surface-1 dark:hover:border-theme-accent-border-hover`;
  }
};

const getTransitionStyles = (): string => {
  return 'transition-all duration-200 ease-out';
};

const getDisabledStyles = (): string => {
  return 'disabled:opacity-40 disabled:cursor-not-allowed';
};

// ============================================================================
// COMPONENT
// ============================================================================

export const PrimaryAction = forwardRef<HTMLButtonElement, PrimaryActionProps>(
  (
    {
      context,
      state,
      size: sizeOverride,
      disabled = false,
      onClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    // Enforce size based on context
    const size = getSizeForContext(context, sizeOverride);
    
    // Get hardcoded copy based on state
    const { label, subtext } = getCopyForState(state, context);
    
    // Icon rules: Arrow visible at low opacity, Lock for locked states
    const showArrow = !disabled && (state === 'pre_scan' || state === 'post_scan' || state === 'in_progress');
    const showLock = state === 'locked' || state === 'upgrade';

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          group
          relative
          inline-flex items-center justify-center gap-[7px]
          font-medium
          ${getSizeStyles(size)}
          ${getButtonStyles(context, state)}
          ${getTransitionStyles()}
          ${getDisabledStyles()}
          focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-bg
          ${className}
        `}
        {...props}
      >
        {/* Nav subtext (vertical layout) */}
        {context === 'nav' && subtext ? (
          <div className="flex flex-col items-start">
            <span className="text-[15px] leading-none">{label}</span>
            <span className="text-[12px] leading-none opacity-60 mt-0.5">{subtext}</span>
          </div>
        ) : (
          <span>{label}</span>
        )}
        
        {/* Arrow - Always visible at low opacity (not blank) */}
        {showArrow && (
          <ArrowRight 
            className={`
              w-4 h-4 translate-y-[0.5px]
              transition-all duration-200
              motion-reduce:transition-opacity
              ${isHovered || isFocused
                ? 'opacity-100 translate-x-0' 
                : 'opacity-40 translate-x-[-2px] motion-reduce:translate-x-0'
              }
            `}
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            strokeWidth={2} 
          />
        )}
        
        {/* Lock icon (static for locked states) */}
        {showLock && (
          <Lock 
            className="w-4 h-4 opacity-60 translate-y-[0.5px]" 
            strokeWidth={2} 
          />
        )}
      </button>
    );
  }
);

PrimaryAction.displayName = 'PrimaryAction';

// ============================================================================
// USAGE SUMMARY (INTERNAL DOCUMENTATION)
// ============================================================================
// 
// Guardrail Visual Language (Premium Control Surface)
// ----------------------------------------------------
// Light mode:
//   • Nav: Soft accent surface with accent text (subtle, never dominant)
//   • Hero: Filled accent with crisp border + minimal shadow (signature CTA)
//   • Inline/Modal: Same as hero but slightly less emphasis
//   • Locked: Strong border, neutral surface, muted text
//
// Dark mode:
//   • All contexts: Glass surface with controlled accent border
//   • Minimal shadows, border-led design
//   • Accent text for readability
//
// Arrow Affordance (Not Blank)
// -----------------------------
// ✓ Always visible at 40% opacity (not hidden)
// ✓ Slight left offset (-2px) at rest
// ✓ On hover/focus: 100% opacity + slides to center
// ✓ Respects prefers-reduced-motion
// ✓ Keyboard focus has parity with hover
//
// Visual Rules
// ------------
// ✓ Rounded pill (consistent radius)
// ✓ All colors from theme tokens (zero hardcoded values)
// ✓ All shadows from theme tokens
// ✓ Context + state determine all styling
// ✓ One PrimaryAction per screen maximum
// ✓ Accessible focus rings in both themes
//
// ✗ No alternate primary button styles
// ✗ No hero-sized buttons in navigation
// ✗ No multiple PrimaryActions on same screen
// ✗ No hardcoded hex values or rgba colors
//
// States & Copy
// -------------
// pre_scan:     "Run wage & hour scan" (nav: + subtext)
// in_progress:  "Continue scan"
// post_scan:    "Review results"
// locked:       "Unlock full analysis"
// upgrade:      "Upgrade to Plus"
//
// ============================================================================