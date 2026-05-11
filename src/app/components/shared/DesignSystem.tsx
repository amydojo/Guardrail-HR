/**
 * GUARDRAIL HR DESIGN SYSTEM
 * 
 * Design tokens and shared components derived from the homepage.
 * DO NOT modify these without updating the homepage first.
 * 
 * GLOBAL LAYOUT (App Frame):
 * - Nav height: 72px (h-[72px])
 * - Nav max-width: 1200px (max-w-[1200px])
 * - Page max-width: 1080px (max-w-[1080px])
 * - Page padding: px-6 xl:px-8
 * - Page top spacing: pt-16 sm:pt-20 xl:pt-24 (first section after nav)
 * - Page bottom spacing: pb-16 sm:pb-20 xl:py-24 (last section before footer)
 * 
 * SPACING SYSTEM (8pt grid):
 * - Base unit: 8px
 * - Component padding: 24px (px-6), 32px (px-8), 40px (px-10)
 * - Section spacing: 64px (py-16), 80px (py-20), 96px (py-24)
 * - Row spacing: 16px (space-y-4), 20px (space-y-5), 24px (space-y-6)
 * 
 * TYPOGRAPHY HIERARCHY:
 * - Page title: text-[24px] sm:text-[28px] xl:text-[32px]
 * - Section title: text-[17px]
 * - Body: text-[14px] sm:text-[15px]
 * - Caption/eyebrow: text-[11px] uppercase tracking-wider
 * - Link: text-[13px]
 * 
 * COLOR TOKENS:
 * - Primary: #5b6ff5
 * - Background: #0a0a0a
 * - Card background: bg-white/[0.03]
 * - Border: border-white/[0.08]
 * - Text: white (primary), gray-400 (secondary), gray-500 (tertiary)
 * 
 * INTERACTION:
 * - Card hover: hover:bg-white/[0.02]
 * - Active state: bg-white/[0.03] border-l-2 border-l-[#5b6ff5]/40
 * - Link hover: hover:text-gray-400
 * - Active press: active:bg-white/[0.02]
 * 
 * SHADOWS:
 * - Card: shadow-theme-1
 * - Card hover: shadow-theme-2
 * 
 * RADII:
 * - Small: rounded-lg (8px)
 * - Medium: rounded-xl (12px)
 * - Large: rounded-2xl (16px)
 */

import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

/**
 * PageHeader
 * Consistent page header with eyebrow, title, subtitle, optional right action
 * Matches homepage section header pattern
 */
interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
}

export function PageHeader({ eyebrow, title, subtitle, action, align = 'left' }: PageHeaderProps) {
  return (
    <div className={`mb-12 sm:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="text-[11px] font-medium text-theme-text-2 tracking-wider uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-[24px] sm:text-[28px] xl:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[15px] sm:text-[16px] text-theme-text-2 leading-relaxed max-w-[560px]">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}

/**
 * SectionHeader
 * Matches homepage "Product capabilities" section header style
 */
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12 sm:mb-14">
      {eyebrow && (
        <p className="text-[11px] font-medium text-theme-text-2 tracking-wider uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[24px] sm:text-[28px] xl:text-[32px] font-semibold text-theme-text-1 tracking-tight leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[15px] sm:text-[16px] text-theme-text-2 leading-relaxed max-w-[560px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * CardShell
 * Standard card container matching homepage card style
 * - Border: border-white/[0.08]
 * - Background: bg-white/[0.03]
 * - Radius: rounded-2xl
 * - Padding: p-6 sm:p-8
 * - Hover: optional hover lift
 */
interface CardShellProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export function CardShell({ children, hover = false, className = '', onClick }: CardShellProps) {
  const baseClasses = 'bg-white/[0.03] rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-theme-1';
  const hoverClasses = hover
    ? 'transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-white/[0.1] hover:shadow-theme-2 cursor-pointer'
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

/**
 * CardGrid
 * Standard grid layout for cards
 * - 1 column on mobile
 * - 2 columns on md+
 * - Optional divider style (gap-px with border grid)
 */
interface CardGridProps {
  children: ReactNode;
  divider?: boolean;
  columns?: 1 | 2 | 3;
}

export function CardGrid({ children, divider = false, columns = 2 }: CardGridProps) {
  if (divider) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-px bg-white/[0.08] rounded-2xl overflow-hidden border border-white/[0.08]`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-5 sm:gap-6`}>
      {children}
    </div>
  );
}

/**
 * LinkRow
 * Standard inline link with arrow right
 * Matches homepage capability tile link style
 */
interface LinkRowProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function LinkRow({ href, onClick, children, variant = 'secondary' }: LinkRowProps) {
  const classes =
    variant === 'primary'
      ? 'inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-white transition-colors duration-200 group/link'
      : 'inline-flex items-center gap-1.5 text-[13px] text-gray-600 hover:text-gray-400 transition-colors duration-200 group/link';

  const content = (
    <>
      {children}
      <ArrowRight
        className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
        strokeWidth={2}
      />
    </>
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

/**
 * Chip/Badge
 * Standard badge for tags, status, effort levels
 * Height: 24px (h-6)
 * Padding: px-2 py-0.5
 * Text: text-[10px] uppercase tracking-wider
 */
interface ChipProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
}

export function Chip({ children, variant = 'default' }: ChipProps) {
  const classes =
    variant === 'accent'
      ? 'inline-flex items-center px-2 py-0.5 rounded bg-[#5b6ff5]/10 border border-[#5b6ff5]/20 text-[10px] font-medium text-[#5b6ff5] uppercase tracking-wider'
      : 'inline-flex items-center px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-gray-500 uppercase tracking-wider';

  return <span className={classes}>{children}</span>;
}

/**
 * Section
 * Standard page section wrapper with consistent spacing
 * Matches homepage section spacing
 */
interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`mx-auto max-w-[1080px] px-6 xl:px-8 py-16 sm:py-20 xl:py-24 ${className}`}>
      {children}
    </section>
  );
}

/**
 * EmptyState
 * Standard empty state pattern
 */
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12 sm:py-16">
      {icon && <div className="mb-6 flex justify-center">{icon}</div>}
      <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
        {title}
      </h3>
      <p className="text-[14px] text-theme-text-2 leading-relaxed max-w-[400px] mx-auto mb-6">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}

/**
 * StatRow
 * Two-column stat display matching homepage result cards
 */
interface StatRowProps {
  label: string;
  value: string | ReactNode;
}

export function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[14px] text-theme-text-2">{label}</span>
      <span className="text-[14px] text-theme-text-1 font-medium text-right">
        {typeof value === 'string' ? value : value}
      </span>
    </div>
  );
}

/**
 * PageContainer
 * Standard page wrapper matching homepage layout
 * - max-w-[1080px]
 * - px-6 xl:px-8
 * - Consistent vertical spacing
 */
interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`min-h-screen bg-theme-bg text-theme-text-1 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Breadcrumb
 * Standard breadcrumb navigation
 * Matches homepage breadcrumb style
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-theme-bg border-b border-theme-border-1">
      <div className="mx-auto max-w-[1080px] px-6 xl:px-8 py-4">
        <div className="flex items-center gap-2 text-[13px] text-theme-text-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {item.href ? (
                <Link to={item.href} className="hover:text-theme-text-1 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-theme-text-1">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}