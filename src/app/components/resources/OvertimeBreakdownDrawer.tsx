import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface BreakdownDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    totalPay: number;
    totalHours: number;
    straightHours: number;
    overtimeHours: number;
    doubleTimeHours: number;
    straightPay: number;
    overtimePay: number;
    doubleTimePay: number;
    confidence: 'high' | 'limited';
    dailyBreakdown: Array<{
      day: string;
      hoursWorked: number;
      straightTime: number;
      overtime: number;
      doubleTime: number;
      dailyPay: number;
    }>;
    hourlyRate: number;
    workweekStart: string;
    include7thDay: boolean;
  };
}

export function OvertimeBreakdownDrawer({ isOpen, onClose, data }: BreakdownDrawerProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const workingDays = data.dailyBreakdown.filter(d => d.hoursWorked > 0);
    
    const summary = `OVERTIME CALCULATION SUMMARY
Hourly Rate: $${data.hourlyRate.toFixed(2)}
Total Weekly Pay: $${data.totalPay.toFixed(2)}

HOURS BREAKDOWN:
• Straight time: ${data.straightHours.toFixed(1)} hrs → $${data.straightPay.toFixed(2)}
• Overtime (1.5×): ${data.overtimeHours.toFixed(1)} hrs → $${data.overtimePay.toFixed(2)}
• Double-time (2×): ${data.doubleTimeHours.toFixed(1)} hrs → $${data.doubleTimePay.toFixed(2)}

DAILY BREAKDOWN:
${workingDays.map(day => 
  `${day.day}: ${day.hoursWorked}h total (${day.straightTime}h straight, ${day.overtime}h OT, ${day.doubleTime}h 2×) = $${day.dailyPay.toFixed(2)}`
).join('\n')}

Note: California overtime applies by day and by week. Weekly overtime applies only to hours not already counted as daily overtime.
`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const workingDays = data.dailyBreakdown.filter(d => d.hoursWorked > 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] animate-slideUpDrawer">
        <div className="bg-theme-surface-3 border-t border-theme-border-1 rounded-t-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-theme-surface-3 border-b border-theme-border-1 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-[20px] font-semibold text-theme-text-1 tracking-tight leading-tight">
                Detailed breakdown
              </h2>
              <p className="text-[13px] text-theme-text-3 mt-0.5">
                Per-day overtime calculation
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-theme-surface-1 transition-colors"
            >
              <X className="w-5 h-5 text-theme-icon-2" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-6">
            {/* Summary Card */}
            <div className="mb-6 p-5 bg-theme-surface-1 border border-theme-border-1 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[13px] text-theme-text-3 mb-1">Total weekly pay</div>
                  <div className="text-[28px] font-semibold text-theme-text-1 tracking-tight leading-none">
                    ${data.totalPay.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={handleCopySummary}
                  className="px-4 py-2 rounded-lg bg-theme-surface-1 border border-theme-border-1 text-[13px] text-theme-text-2 hover:text-theme-text-1 hover:bg-theme-surface-1 transition-all flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-theme-success" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy summary
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-theme-border-2">
                <div>
                  <div className="text-[12px] text-theme-text-3 mb-1">Straight time</div>
                  <div className="text-[16px] font-medium text-theme-text-1">{data.straightHours.toFixed(1)} hrs</div>
                  <div className="text-[12px] text-theme-text-3">${data.straightPay.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[12px] text-theme-text-3 mb-1">Overtime (1.5×)</div>
                  <div className="text-[16px] font-medium text-theme-text-1">{data.overtimeHours.toFixed(1)} hrs</div>
                  <div className="text-[12px] text-theme-text-3">${data.overtimePay.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[12px] text-theme-text-3 mb-1">Double-time (2×)</div>
                  <div className="text-[16px] font-medium text-theme-text-1">{data.doubleTimeHours.toFixed(1)} hrs</div>
                  <div className="text-[12px] text-theme-text-3">${data.doubleTimePay.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Daily Breakdown Table */}
            <div className="mb-6">
              <h3 className="text-[15px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
                Per-day breakdown
              </h3>
              
              <div className="bg-theme-surface-1 border border-theme-border-1 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-3 px-5 py-3 bg-theme-surface-2 border-b border-theme-border-2">
                  <div className="text-[12px] font-medium text-theme-text-3 uppercase tracking-wide">Day</div>
                  <div className="text-[12px] font-medium text-theme-text-3 uppercase tracking-wide text-right">Total</div>
                  <div className="text-[12px] font-medium text-theme-text-3 uppercase tracking-wide text-right">Straight</div>
                  <div className="text-[12px] font-medium text-theme-text-3 uppercase tracking-wide text-right">1.5×</div>
                  <div className="text-[12px] font-medium text-theme-text-3 uppercase tracking-wide text-right">2×</div>
                  <div className="text-[12px] font-medium text-theme-text-3 uppercase tracking-wide text-right">Pay</div>
                </div>

                {/* Table Rows */}
                {workingDays.map((day, index) => (
                  <div 
                    key={day.day}
                    className={`grid grid-cols-6 gap-3 px-5 py-3 ${
                      index !== workingDays.length - 1 ? 'border-b border-theme-border-2' : ''
                    }`}
                  >
                    <div className="text-[14px] text-theme-text-1 font-medium">{day.day}</div>
                    <div className="text-[14px] text-theme-text-2 text-right">{day.hoursWorked}h</div>
                    <div className="text-[14px] text-theme-text-2 text-right">{day.straightTime}h</div>
                    <div className="text-[14px] text-theme-text-2 text-right">{day.overtime}h</div>
                    <div className="text-[14px] text-theme-text-2 text-right">{day.doubleTime}h</div>
                    <div className="text-[14px] text-theme-text-1 font-medium text-right">
                      ${day.dailyPay.toFixed(2)}
                    </div>
                  </div>
                ))}

                {/* Total Row */}
                <div className="grid grid-cols-6 gap-3 px-5 py-3 bg-theme-surface-2 border-t border-theme-border-1">
                  <div className="text-[14px] text-theme-text-1 font-semibold">Total</div>
                  <div className="text-[14px] text-theme-text-1 font-semibold text-right">
                    {(data.straightHours + data.overtimeHours + data.doubleTimeHours).toFixed(1)}h
                  </div>
                  <div className="text-[14px] text-theme-text-1 font-semibold text-right">{data.straightHours.toFixed(1)}h</div>
                  <div className="text-[14px] text-theme-text-1 font-semibold text-right">{data.overtimeHours.toFixed(1)}h</div>
                  <div className="text-[14px] text-theme-text-1 font-semibold text-right">{data.doubleTimeHours.toFixed(1)}h</div>
                  <div className="text-[14px] text-theme-text-1 font-semibold text-right">
                    ${data.totalPay.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="p-4 bg-theme-accent-soft border border-theme-accent/20 rounded-xl">
              <h4 className="text-[13px] font-medium text-theme-accent mb-2">
                How weekly overtime works
              </h4>
              <p className="text-[13px] text-theme-text-2 leading-[1.65]">
                Weekly overtime applies only to hours over 40 that weren't already counted as daily overtime. 
                California law prevents "double counting" — if hours already earned 1.5× or 2× through daily overtime, 
                they don't trigger additional weekly overtime.
              </p>
            </div>

            {/* Bottom spacing for mobile scroll */}
            <div className="h-6" />
          </div>
        </div>
      </div>
    </>
  );
}
