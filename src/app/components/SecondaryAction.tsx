import { ChevronRight, Download } from 'lucide-react';
import { forwardRef, HTMLAttributes } from 'react';

// ============================================================================
// DESIGN SYSTEM PRIMITIVE
// ============================================================================
// Structured alternative action that supports, but never competes with, PrimaryAction
// Role: Secondary navigation, alternative paths, utility actions
// Philosophy: Functional, descriptive, never promotional
// 
// DO NOT use accent colors or fills
// DO NOT compete visually with PrimaryAction
// DO NOT use motivational language
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

type IconType = 'chevron' | 'export' | 'none';

interface SecondaryActionProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Button label text (descriptive, functional language) */
  label: string;
  
  /** Optional trailing icon */
  icon?: IconType;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Click handler */
  onClick?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const SecondaryAction = forwardRef<HTMLButtonElement, SecondaryActionProps>(
  (
    {
      label,
      icon = 'none',
      disabled = false,
      onClick,
      className = '',
      ...props
    },
    ref
  ) => {
    // Icon rendering
    const renderIcon = () => {
      if (icon === 'chevron') {
        return (
          <ChevronRight 
            className="w-4 h-4 text-gray-600 transition-all duration-150 group-hover:translate-x-0.5" 
            strokeWidth={2} 
          />
        );
      }
      
      if (icon === 'export') {
        return (
          <Download 
            className="w-4 h-4 text-gray-600 transition-all duration-150" 
            strokeWidth={2} 
          />
        );
      }
      
      return null;
    };

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={`
          group
          relative
          inline-flex items-center justify-between gap-3
          h-[48px]
          px-6
          font-medium
          text-[15px]
          leading-tight
          text-gray-300
          bg-transparent
          hover:bg-[#161616]
          border border-gray-900/50
          hover:border-gray-800/60
          rounded-[16px]
          transition-all duration-150 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:bg-transparent disabled:hover:border-gray-900/50
          ${className}
        `}
        {...props}
      >
        <span className="leading-tight">{label}</span>
        
        {icon !== 'none' && (
          <div className="flex-shrink-0">
            {renderIcon()}
          </div>
        )}
      </button>
    );
  }
);

SecondaryAction.displayName = 'SecondaryAction';

// ============================================================================
// USAGE DOCUMENTATION (INTERNAL)
// ============================================================================
// 
// Purpose
// -------
// This component exists to offer a meaningful alternative path without 
// competing with the PrimaryAction. Use for secondary navigation, utility 
// actions, and alternative workflows.
//
// Design Requirements
// -------------------
// ✓ Same height, padding, corner radius as PrimaryAction
// ✓ Background: transparent or card surface (no accent fill)
// ✓ Border: 1px subtle border using neutral system color
// ✓ Text color: primary text (not accent)
// ✓ Font weight: medium
// ✓ Optional trailing icon (chevron or export icon only)
// ✓ No arrow by default
// ✓ No glow, shadow, or elevation
//
// Copy Rules
// ----------
// Use descriptive, functional language:
// ✓ "View detailed breakdown"
// ✓ "Export report"
// ✓ "Review answers"
// ✓ "Exit & save progress"
//
// Avoid motivational verbs:
// ✗ "Get started"
// ✗ "Start now"
// ✗ "Go to dashboard"
//
// Usage Constraints
// -----------------
// • Never visually louder than PrimaryAction
// • Never used in hero sections
// • May appear alongside PrimaryAction, never above it
// • Max two SecondaryActions per view
// • Icon options limited to: chevron, export, or none
//
// States
// ------
// Default:  Transparent bg, subtle border
// Hover:    Slightly brighter border + card background
// Pressed:  Visual compression (handled by transition)
// Disabled: Reduced opacity, no hover states
//
// Examples
// --------
// 
// // Basic secondary action
// <SecondaryAction 
//   label="View detailed breakdown" 
//   icon="chevron"
//   onClick={() => navigate('/details')} 
// />
//
// // Export utility
// <SecondaryAction 
//   label="Export report" 
//   icon="export"
//   onClick={handleExport} 
// />
//
// // Exit action (no icon)
// <SecondaryAction 
//   label="Exit & save progress" 
//   onClick={handleExit} 
// />
//
// // Alongside PrimaryAction
// <div className="flex flex-col gap-3">
//   <PrimaryAction context="inline" state="post_scan" onClick={handleReview} />
//   <SecondaryAction label="Export results" icon="export" onClick={handleExport} />
// </div>
//
// ============================================================================