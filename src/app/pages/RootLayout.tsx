import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { BrandLogo, BrandLogoMobile } from '@/app/components/BrandLogo';
import { PrimaryAction } from '@/app/components/PrimaryAction';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { Menu, X, Bookmark, User } from 'lucide-react';
import { useState } from 'react';

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-1">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 border-b border-theme-border-1 bg-theme-bg/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-6 xl:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Desktop: Lockup logo */}
            <div className="hidden md:block">
              <BrandLogo variant="lockup" size="md" />
            </div>
            
            {/* Mobile: Mark + "Guardrail" text */}
            <div className="md:hidden">
              <BrandLogoMobile />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Primary Navigation - text tabs */}
              <Link
                to="/dashboard"
                className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/dashboard')
                    ? 'text-theme-text-1 bg-theme-surface-1'
                    : 'text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-1'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/modules"
                className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/modules')
                    ? 'text-theme-text-1 bg-theme-surface-1'
                    : 'text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-1'
                }`}
              >
                Modules
              </Link>
              <Link
                to="/resources"
                className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/resources')
                    ? 'text-theme-text-1 bg-theme-surface-1'
                    : 'text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-1'
                }`}
              >
                Resources
              </Link>
              <Link
                to="/saved"
                className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/saved')
                    ? 'text-theme-text-1 bg-theme-surface-1'
                    : 'text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-1'
                }`}
              >
                Saved
              </Link>
              
              {/* Visual separator before utility icons */}
              <div className="w-px h-4 bg-theme-border-2/60 mx-2" />
              
              {/* Utility Icons - right side group */}
              <ThemeToggle />
              <Link
                to="/account"
                className={`p-2.5 rounded-lg transition-all duration-200 relative ${
                  location.pathname.startsWith('/account')
                    ? 'text-theme-text-1 bg-theme-surface-1'
                    : 'text-theme-text-3 hover:text-theme-text-1 hover:bg-theme-surface-1'
                }`}
                aria-label="Account"
                title="Account"
              >
                <User className="w-4 h-4" />
                {/* Small active indicator */}
                {location.pathname.startsWith('/account') && (
                  <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-theme-accent" />
                )}
              </Link>
              
              {/* CTA Separator */}
              <div className="w-px h-5 bg-theme-border-1 mx-3" />
              
              {/* Desktop Primary CTA - Apple-style pill */}
              <PrimaryAction
                context="nav"
                state="pre_scan"
                onClick={() => navigate('/modules/wage-hour')}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -mr-2 text-theme-text-3 hover:text-theme-text-1 transition-colors rounded-lg hover:bg-theme-surface-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Discreet Trust Signal - Below nav on landing page only */}
        {location.pathname === '/' && (
          <div className="border-t border-theme-border-2 bg-theme-surface-2">
            <div className="mx-auto max-w-[1200px] px-6 xl:px-8 py-3">
              <p className="text-center text-[11px] text-theme-text-3 font-medium tracking-wide">
                California-first • Built for small businesses
              </p>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-theme-border-1">
            <div className="px-6 py-4 space-y-1">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/dashboard')
                    ? 'bg-theme-surface-1 text-theme-text-1'
                    : 'text-theme-text-3 hover:bg-theme-surface-1 hover:text-theme-text-1'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/modules"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/modules')
                    ? 'bg-theme-surface-1 text-theme-text-1'
                    : 'text-theme-text-3 hover:bg-theme-surface-1 hover:text-theme-text-1'
                }`}
              >
                Modules
              </Link>
              <Link
                to="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/resources')
                    ? 'bg-theme-surface-1 text-theme-text-1'
                    : 'text-theme-text-3 hover:bg-theme-surface-1 hover:text-theme-text-1'
                }`}
              >
                Resources
              </Link>
              <Link
                to="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/saved')
                    ? 'bg-theme-surface-1 text-theme-text-1'
                    : 'text-theme-text-3 hover:bg-theme-surface-1 hover:text-theme-text-1'
                }`}
              >
                Saved
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                  location.pathname.startsWith('/account')
                    ? 'bg-theme-surface-1 text-theme-text-1'
                    : 'text-theme-text-3 hover:bg-theme-surface-1 hover:text-theme-text-1'
                }`}
              >
                Account
              </Link>
              
              {/* Mobile Theme Toggle */}
              <div className="px-4 py-2">
                <ThemeToggle />
              </div>
              
              {/* Mobile Primary CTA */}
              <div className="pt-3 mt-3 border-t border-theme-border-2">
                <PrimaryAction
                  context="nav"
                  state="pre_scan"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/modules/wage-hour');
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <Outlet />
    </div>
  );
}