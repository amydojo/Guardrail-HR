import { useState, useEffect } from 'react';
import { Info, ChevronDown, ChevronUp, HelpCircle, Plus, Minus, Copy } from 'lucide-react';

interface CalculatorProps {
  onOpenBreakdown: (data: CalculationResult) => void;
}

interface DayHours {
  [key: string]: number;
}

interface CalculationResult {
  totalPay: number;
  totalHours: number;
  straightHours: number;
  overtimeHours: number;
  doubleTimeHours: number;
  straightPay: number;
  overtimePay: number;
  doubleTimePay: number;
  confidence: 'high' | 'limited';
  dailyBreakdown: DailyBreakdown[];
  hourlyRate: number;
  workweekStart: string;
  include7thDay: boolean;
}

interface DailyBreakdown {
  day: string;
  hoursWorked: number;
  straightTime: number;
  overtime: number;
  doubleTime: number;
  dailyPay: number;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_DAY_NAMES: { [key: string]: string } = {
  'Sun': 'Sunday',
  'Mon': 'Monday',
  'Tue': 'Tuesday',
  'Wed': 'Wednesday',
  'Thu': 'Thursday',
  'Fri': 'Friday',
  'Sat': 'Saturday'
};

export function OvertimeCalculatorMobile({ onOpenBreakdown }: CalculatorProps) {
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [workweekStart, setWorkweekStart] = useState<string>('Sun');
  const [include7thDay, setInclude7thDay] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showRateEditor, setShowRateEditor] = useState(false);
  const [dayHours, setDayHours] = useState<DayHours>({
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  });

  // Advanced guardrails
  const [guardrails, setGuardrails] = useState({
    multipleRates: false,
    bonusCommission: false,
    pieceRate: false,
    alternativeSchedule: false,
    unionContract: false,
  });

  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  // Calculate overtime whenever inputs change
  useEffect(() => {
    const result = calculateOvertime();
    setCalculationResult(result);
  }, [hourlyRate, dayHours, workweekStart, include7thDay, guardrails]);

  const hasAnyGuardrails = Object.values(guardrails).some(v => v);
  const hasAnyHours = Object.values(dayHours).some(h => h > 0);

  function calculateOvertime(): CalculationResult {
    const orderedDays = getOrderedDays();
    const dailyBreakdown: DailyBreakdown[] = [];
    
    let totalStraight = 0;
    let totalOvertime = 0;
    let totalDoubleTime = 0;
    let consecutiveDays = 0;

    // First pass: Calculate daily overtime
    orderedDays.forEach((day) => {
      const hours = dayHours[day] || 0;
      
      if (hours > 0) {
        consecutiveDays++;
      }

      const is7thDay = include7thDay && consecutiveDays === 7 && hours > 0;
      
      let straight = 0;
      let overtime = 0;
      let doubleTime = 0;

      if (hours === 0) {
        consecutiveDays = 0;
      } else if (is7thDay) {
        // 7th consecutive day rules
        if (hours <= 8) {
          overtime = hours;
        } else {
          overtime = 8;
          doubleTime = hours - 8;
        }
      } else {
        // Regular day rules
        if (hours <= 8) {
          straight = hours;
        } else if (hours <= 12) {
          straight = 8;
          overtime = hours - 8;
        } else {
          straight = 8;
          overtime = 4;
          doubleTime = hours - 12;
        }
      }

      dailyBreakdown.push({
        day,
        hoursWorked: hours,
        straightTime: straight,
        overtime,
        doubleTime,
        dailyPay: (straight * hourlyRate) + (overtime * hourlyRate * 1.5) + (doubleTime * hourlyRate * 2)
      });

      totalStraight += straight;
      totalOvertime += overtime;
      totalDoubleTime += doubleTime;
    });

    // Second pass: Check if weekly overtime applies
    const totalHoursWorked = orderedDays.reduce((sum, day) => sum + (dayHours[day] || 0), 0);
    const totalDailyOT = totalOvertime + totalDoubleTime;
    
    if (totalHoursWorked > 40) {
      const weeklyOTEligible = totalHoursWorked - 40;
      const dailyOTAlreadyCounted = totalDailyOT;
      
      if (weeklyOTEligible > dailyOTAlreadyCounted) {
        const additionalWeeklyOT = weeklyOTEligible - dailyOTAlreadyCounted;
        totalStraight -= additionalWeeklyOT;
        totalOvertime += additionalWeeklyOT;
      }
    }

    const straightPay = totalStraight * hourlyRate;
    const overtimePay = totalOvertime * hourlyRate * 1.5;
    const doubleTimePay = totalDoubleTime * hourlyRate * 2;
    const totalPay = straightPay + overtimePay + doubleTimePay;

    return {
      totalPay,
      totalHours: totalHoursWorked,
      straightHours: totalStraight,
      overtimeHours: totalOvertime,
      doubleTimeHours: totalDoubleTime,
      straightPay,
      overtimePay,
      doubleTimePay,
      confidence: hasAnyGuardrails ? 'limited' : 'high',
      dailyBreakdown,
      hourlyRate,
      workweekStart,
      include7thDay
    };
  }

  function getOrderedDays(): string[] {
    const startIndex = DAYS_OF_WEEK.indexOf(workweekStart);
    return [...DAYS_OF_WEEK.slice(startIndex), ...DAYS_OF_WEEK.slice(0, startIndex)];
  }

  // Stepper controls for hours
  function incrementHours(day: string, amount: number) {
    setDayHours(prev => {
      const current = prev[day] || 0;
      const newValue = Math.max(0, Math.min(24, current + amount));
      return { ...prev, [day]: newValue };
    });
  }

  function setDayHoursValue(day: string, value: number) {
    const clampedValue = Math.max(0, Math.min(24, value));
    setDayHours(prev => ({ ...prev, [day]: clampedValue }));
  }

  // Quick preset buttons
  function fillWeekdays() {
    setDayHours({
      Sun: 0,
      Mon: 8,
      Tue: 8,
      Wed: 8,
      Thu: 8,
      Fri: 8,
      Sat: 0,
    });
  }

  function fillAllDays() {
    setDayHours({
      Sun: 8,
      Mon: 8,
      Tue: 8,
      Wed: 8,
      Thu: 8,
      Fri: 8,
      Sat: 8,
    });
  }

  function clearAllHours() {
    setDayHours({
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    });
  }

  function loadExample(exampleNum: number) {
    if (exampleNum === 1) {
      setDayHours({ Sun: 0, Mon: 13, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 });
      setHourlyRate(20);
    } else if (exampleNum === 2) {
      setDayHours({ Sun: 0, Mon: 9, Tue: 9, Wed: 9, Thu: 9, Fri: 9, Sat: 6 });
      setHourlyRate(20);
    } else if (exampleNum === 3) {
      setDayHours({ Sun: 8, Mon: 8, Tue: 8, Wed: 8, Thu: 8, Fri: 8, Sat: 8 });
      setHourlyRate(20);
      setInclude7thDay(true);
    }
  }

  const orderedDays = getOrderedDays();

  return (
    <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1 overflow-hidden">
      {/* Pay Settings - Compact Header */}
      <div className="p-5 bg-theme-surface-2 border-b border-theme-border-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold text-theme-text-1">
            Hourly rate
          </h3>
          <button
            onClick={() => setShowRateEditor(!showRateEditor)}
            className="text-[24px] font-semibold text-theme-text-1 px-4 py-2 -my-2 rounded-lg hover:bg-theme-surface-1 transition-colors"
          >
            ${hourlyRate.toFixed(2)}
          </button>
        </div>

        {/* Rate Editor - Expandable */}
        {showRateEditor && (
          <div className="space-y-4 pt-4 border-t border-theme-border-2">
            {/* Quick rate buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[16, 18, 20, 25, 30, 35, 40, 50].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setHourlyRate(rate)}
                  className={`px-3 py-2 rounded-lg text-[14px] font-medium transition-all ${
                    hourlyRate === rate
                      ? 'bg-theme-accent text-white'
                      : 'bg-theme-surface-1 border border-theme-border-1 text-theme-text-2 hover:border-theme-border-2'
                  }`}
                >
                  ${rate}
                </button>
              ))}
            </div>

            {/* Custom rate input */}
            <div>
              <label className="block text-[13px] text-theme-text-3 mb-2">
                Custom rate
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-3 text-[17px]">$</span>
                <input
                  type="number"
                  value={hourlyRate || ''}
                  onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  className="w-full pl-9 pr-4 py-3 bg-theme-surface-1 border border-theme-border-1 rounded-xl text-theme-text-1 text-[17px] focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:border-theme-accent/40 transition-colors"
                  placeholder="25.00"
                />
              </div>
            </div>

            {/* Workweek start */}
            <div>
              <label className="block text-[13px] text-theme-text-3 mb-2">
                Workweek starts on
              </label>
              <select
                value={workweekStart}
                onChange={(e) => setWorkweekStart(e.target.value)}
                className="w-full px-4 py-3 bg-theme-surface-1 border border-theme-border-1 rounded-xl text-theme-text-1 text-[17px] focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:border-theme-accent/40 transition-colors"
              >
                {DAYS_OF_WEEK.map(day => (
                  <option key={day} value={day}>{FULL_DAY_NAMES[day]}</option>
                ))}
              </select>
            </div>

            {/* 7th day rule */}
            <label className="flex items-start gap-3 cursor-pointer p-3 bg-theme-surface-1 rounded-xl border border-theme-border-1">
              <input
                type="checkbox"
                checked={include7thDay}
                onChange={(e) => setInclude7thDay(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-theme-border-1 bg-theme-surface-1 text-theme-accent focus:ring-theme-focus/40 focus:ring-offset-0 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[15px] text-theme-text-1 font-medium">7th consecutive day rule</span>
                  <div className="relative group">
                    <HelpCircle className="w-4 h-4 text-theme-text-3" />
                  </div>
                </div>
                <p className="text-[13px] text-theme-text-3 leading-[1.5]">
                  First 8 hours at 1.5×, beyond 8 hours at 2×
                </p>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-theme-surface-2 border-b border-theme-border-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-theme">
          <button
            onClick={fillWeekdays}
            className="flex-shrink-0 px-4 py-2 rounded-lg bg-theme-surface-1 border border-theme-border-1 text-[13px] font-medium text-theme-text-2 hover:border-theme-border-2 transition-all"
          >
            Mon-Fri (8h)
          </button>
          <button
            onClick={fillAllDays}
            className="flex-shrink-0 px-4 py-2 rounded-lg bg-theme-surface-1 border border-theme-border-1 text-[13px] font-medium text-theme-text-2 hover:border-theme-border-2 transition-all"
          >
            All 7 days (8h)
          </button>
          <button
            onClick={clearAllHours}
            className="flex-shrink-0 px-4 py-2 rounded-lg bg-theme-surface-1 border border-theme-border-1 text-[13px] font-medium text-theme-text-2 hover:border-theme-border-2 transition-all"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Hours Entry - Apple Stepper Style */}
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-theme-text-1 mb-4">
          Hours worked
        </h3>
        
        <div className="space-y-2">
          {orderedDays.map((day) => {
            const hours = dayHours[day] || 0;
            const hasHours = hours > 0;

            return (
              <div
                key={day}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  hasHours
                    ? 'bg-theme-accent-soft border-theme-accent/20'
                    : 'bg-theme-surface-2 border-theme-border-2'
                }`}
              >
                {/* Day label */}
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-medium text-theme-text-1">
                    {FULL_DAY_NAMES[day]}
                  </div>
                  {hasHours && (
                    <div className="text-[12px] text-theme-text-3 mt-0.5">
                      {hours} {hours === 1 ? 'hour' : 'hours'}
                    </div>
                  )}
                </div>

                {/* Stepper Controls */}
                <div className="flex items-center gap-2">
                  {/* Minus button */}
                  <button
                    onClick={() => incrementHours(day, -0.5)}
                    disabled={hours <= 0}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-theme-surface-1 border border-theme-border-1 text-theme-text-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-theme-surface-2 hover:border-theme-border-2 active:scale-95 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  {/* Hours display - tappable to edit */}
                  <input
                    type="number"
                    value={hours || ''}
                    onChange={(e) => setDayHoursValue(day, parseFloat(e.target.value) || 0)}
                    min="0"
                    max="24"
                    step="0.5"
                    inputMode="decimal"
                    className="w-16 h-11 px-2 text-center bg-theme-surface-1 border border-theme-border-1 rounded-lg text-theme-text-1 text-[17px] font-semibold focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:border-theme-accent/40 transition-colors"
                    placeholder="0"
                  />

                  {/* Plus button */}
                  <button
                    onClick={() => incrementHours(day, 0.5)}
                    disabled={hours >= 24}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-theme-accent text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-theme-accent-hover active:scale-95 transition-all shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick increment buttons */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[13px] text-theme-text-3">Quick add:</span>
          <button
            onClick={() => {
              orderedDays.forEach(day => {
                if (dayHours[day] > 0) incrementHours(day, 1);
              });
            }}
            className="px-3 py-1.5 rounded-lg bg-theme-surface-2 border border-theme-border-2 text-[13px] font-medium text-theme-text-2 hover:border-theme-border-1 transition-all"
          >
            +1h to all
          </button>
          <button
            onClick={() => {
              orderedDays.forEach(day => {
                if (dayHours[day] > 0) incrementHours(day, -1);
              });
            }}
            className="px-3 py-1.5 rounded-lg bg-theme-surface-2 border border-theme-border-2 text-[13px] font-medium text-theme-text-2 hover:border-theme-border-1 transition-all"
          >
            -1h from all
          </button>
        </div>

        {hasAnyHours && calculationResult && (
          <p className="text-[13px] text-theme-text-3 mt-4 text-center">
            Total: {calculationResult.totalHours.toFixed(1)} hours this week
          </p>
        )}
      </div>

      {/* Results */}
      {!hasAnyHours ? (
        /* Empty State */
        <div className="p-8 text-center border-t border-theme-border-2">
          <div className="w-12 h-12 rounded-full bg-theme-surface-2 border border-theme-border-2 flex items-center justify-center mx-auto mb-4">
            <Info className="w-5 h-5 text-theme-icon-2" />
          </div>
          <h4 className="text-[15px] font-medium text-theme-text-1 mb-2">
            Add hours to calculate
          </h4>
          <p className="text-[13px] text-theme-text-3 leading-[1.6] mb-6 max-w-xs mx-auto">
            Tap + buttons to add hours, or try an example scenario
          </p>
          <div className="space-y-2 max-w-xs mx-auto">
            <button
              onClick={() => loadExample(1)}
              className="block w-full px-4 py-2.5 rounded-lg bg-theme-surface-1 border border-theme-border-1 text-[14px] font-medium text-theme-text-1 hover:border-theme-border-2 transition-all"
            >
              Single 13-hour shift
            </button>
            <button
              onClick={() => loadExample(2)}
              className="block w-full px-4 py-2.5 rounded-lg bg-theme-surface-1 border border-theme-border-1 text-[14px] font-medium text-theme-text-1 hover:border-theme-border-2 transition-all"
            >
              5 days × 9 hours + Saturday
            </button>
            <button
              onClick={() => loadExample(3)}
              className="block w-full px-4 py-2.5 rounded-lg bg-theme-surface-1 border border-theme-border-1 text-[14px] font-medium text-theme-text-1 hover:border-theme-border-2 transition-all"
            >
              All 7 days worked
            </button>
          </div>
        </div>
      ) : (
        /* Results Display */
        <div className="p-5 border-t border-theme-border-2 space-y-5">
          {/* Confidence Badge */}
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-theme-text-1">
              Estimated pay
            </h3>
            <span className={`px-2.5 py-1 rounded-lg text-[12px] font-medium ${
              calculationResult?.confidence === 'high'
                ? 'bg-theme-success-bg border border-theme-success-border text-theme-success'
                : 'bg-theme-warning-bg border border-theme-warning-border text-theme-warning'
            }`}>
              {calculationResult?.confidence === 'high' ? 'Estimate' : 'Limited accuracy'}
            </span>
          </div>

          {/* Total Pay - Hero */}
          <div className="p-5 bg-gradient-to-br from-theme-accent/5 to-theme-accent/10 border border-theme-accent/20 rounded-2xl">
            <div className="text-[13px] text-theme-text-3 mb-1 uppercase tracking-wide font-medium">
              Gross pay
            </div>
            <div className="text-[40px] font-semibold text-theme-text-1 tracking-tight leading-none mb-4">
              ${calculationResult?.totalPay.toFixed(2)}
            </div>
            <div className="space-y-2 text-[14px]">
              <div className="flex justify-between">
                <span className="text-theme-text-3">Regular pay</span>
                <span className="text-theme-text-1 font-medium">${calculationResult?.straightPay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-text-3">Overtime (1.5×)</span>
                <span className="text-theme-text-1 font-medium">${calculationResult?.overtimePay.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-text-3">Double-time (2×)</span>
                <span className="text-theme-text-1 font-medium">${calculationResult?.doubleTimePay.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Hours Breakdown */}
          <div className="space-y-2">
            <h4 className="text-[13px] font-medium text-theme-text-3 uppercase tracking-wide">
              Hours breakdown
            </h4>
            <div className="bg-theme-surface-2 rounded-xl border border-theme-border-2 divide-y divide-theme-border-2">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[14px] text-theme-text-2">Total hours</span>
                <span className="text-[15px] text-theme-text-1 font-semibold">
                  {calculationResult?.totalHours.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[14px] text-theme-text-2">Regular</span>
                <span className="text-[15px] text-theme-text-1 font-semibold">
                  {calculationResult?.straightHours.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[14px] text-theme-text-2">Overtime</span>
                <span className="text-[15px] text-theme-text-1 font-semibold">
                  {calculationResult?.overtimeHours.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[14px] text-theme-text-2">Double-time</span>
                <span className="text-[15px] text-theme-text-1 font-semibold">
                  {calculationResult?.doubleTimeHours.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => calculationResult && onOpenBreakdown(calculationResult)}
            className="w-full px-5 py-3.5 rounded-xl bg-theme-accent text-white text-[15px] font-medium hover:bg-theme-accent-hover active:scale-98 transition-all shadow-sm"
          >
            View day-by-day breakdown →
          </button>

          {/* Calculation Note */}
          <div className="p-3 bg-theme-surface-2 border border-theme-border-2 rounded-lg">
            <p className="text-[12px] text-theme-text-3 leading-[1.6]">
              <span className="font-medium text-theme-text-2">Note:</span> Weekly overtime applied only to hours not already counted as daily OT (avoids double-counting).
            </p>
          </div>
        </div>
      )}

      {/* Advanced Scenarios */}
      <div className="border-t border-theme-border-2">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-theme-surface-2 transition-colors"
        >
          <h3 className="text-[14px] font-medium text-theme-text-2 uppercase tracking-wide">
            Advanced scenarios
          </h3>
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4 text-theme-text-3" />
          ) : (
            <ChevronDown className="w-4 h-4 text-theme-text-3" />
          )}
        </button>

        {showAdvanced && (
          <div className="px-5 pb-5 space-y-3">
            <p className="text-[12px] text-theme-text-3 leading-[1.6] mb-4">
              These scenarios require special calculations. Consult counsel or your payroll provider.
            </p>
            {[
              { key: 'multipleRates', label: 'Multiple pay rates in the same week' },
              { key: 'bonusCommission', label: 'Bonuses/commissions affecting regular rate' },
              { key: 'pieceRate', label: 'Piece-rate pay' },
              { key: 'alternativeSchedule', label: 'Alternative workweek (4/10, 9/80)' },
              { key: 'unionContract', label: 'Union contract rules' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer p-3 bg-theme-surface-2 rounded-lg border border-theme-border-2">
                <input
                  type="checkbox"
                  checked={guardrails[key as keyof typeof guardrails]}
                  onChange={(e) => setGuardrails(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="w-5 h-5 rounded border-theme-border-1 bg-theme-surface-1 text-theme-warning focus:ring-theme-warning/40 focus:ring-offset-0"
                />
                <span className="text-[14px] text-theme-text-2">{label}</span>
              </label>
            ))}

            {hasAnyGuardrails && (
              <div className="mt-4 p-4 bg-theme-warning-bg border border-theme-warning-border rounded-xl">
                <p className="text-[13px] text-theme-warning leading-[1.6] font-medium">
                  This calculator won't be accurate for your scenario. Consult counsel or payroll provider.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-theme-border-2 bg-theme-surface-2">
        <p className="text-[11px] text-theme-text-3 text-center">
          California overtime ruleset · Reviewed January 2026 · v2.0
        </p>
      </div>
    </div>
  );
}