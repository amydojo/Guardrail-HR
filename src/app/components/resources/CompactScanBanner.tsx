import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

interface CompactScanBannerProps {
  hasScan: boolean;
}

export function CompactScanBanner({ hasScan }: CompactScanBannerProps) {
  if (hasScan) {
    return (
      <div className="flex items-center justify-between px-5 py-4 bg-theme-accent-soft border border-theme-accent/20 rounded-xl">
        <p className="text-[14px] text-theme-text-1">
          recommendations updated from your last scan
        </p>
        <Link
          to="#recommended"
          className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-accent-soft rounded whitespace-nowrap"
        >
          view recommended
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-5 py-4 bg-theme-surface-1 border border-theme-border-1 rounded-xl">
      <p className="text-[14px] text-theme-text-2">
        want suggestions matched to your gaps?
      </p>
      <Link
        to="/modules/wage-hour"
        className="inline-flex items-center gap-1.5 text-[14px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-2 focus:ring-offset-theme-surface-1 rounded whitespace-nowrap"
      >
        run wage & hour scan
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
