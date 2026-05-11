import { useState, useEffect } from 'react';
import { Info, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

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

export function OvertimeCalculatorRefined({ onOpenBreakdown }: CalculatorProps) {
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [workweekStart, setWorkweekStart] = useState<string>('Sun');
  const [include7thDay, setInclude7thDay] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dayHours, setDayHours] = useState<DayHours>({
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  });

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  function handleHoursChange(day: string, value: string) {
    const hours = parseFloat(value) || 0;
    const newErrors = { ...errors };
    
    if (hours < 0) {
      newErrors[day] = 'Cannot be negative';
    } else if (hours > 24) {
      newErrors[day] = 'Cannot exceed 24 hours';
    } else {
      delete newErrors[day];
    }
    
    setErrors(newErrors);
    
    if (hours >= 0 && hours <= 24) {
      setDayHours(prev => ({ ...prev, [day]: hours }));
    }
  }

  function handleRateChange(value: string) {
    const rate = parseFloat(value) || 0;
    const newErrors = { ...errors };
    
    if (rate < 0) {
      newErrors.rate = 'Cannot be negative';
    } else {
      delete newErrors.rate;
    }
    
    setErrors(newErrors);
    
    if (rate >= 0) {
      setHourlyRate(rate);
    }
  }

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

  function copyMondayToAll() {
    const mondayHours = dayHours.Mon || 0;
    setDayHours({
      Sun: mondayHours,
      Mon: mondayHours,
      Tue: mondayHours,
      Wed: mondayHours,
      Thu: mondayHours,
      Fri: mondayHours,
      Sat: mondayHours,
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
    <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
        {/* Left Column - Inputs */}
        <div className="p-6 sm:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-theme-border-2">
          {/* Pay Settings */}
          <div>
            <h3 className="text-[15px] font-semibold text-theme-text-1 mb-4 tracking-tight leading-tight">
              Pay settings
            </h3>
            
            <div className="space-y-4">
              {/* Hourly rate */}
              <div>
                <label className="block text-[13px] text-theme-text-2 mb-2">
                  Hourly rate
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-3">$</span>
                  <input
                    type="number"
                    value={hourlyRate || ''}
                    onChange={(e) => handleRateChange(e.target.value)}
                    min="0"
                    step="0.01"
                    className={`w-full pl-8 pr-4 py-2.5 bg-theme-surface-1 border rounded-xl text-theme-text-1 text-[15px] focus:outline-none focus:ring-2 focus:ring-theme-focus/40 transition-colors ${
                      errors.rate ? 'border-theme-danger-border' : 'border-theme-border-1 focus:border-theme-accent/40'
                    }`}
                    placeholder="25.00"
                  />
                </div>
                {errors.rate && (
                  <p className="text-[12px] text-theme-danger mt-1.5">{errors.rate}</p>
                )}
              </div>

              {/* Workweek start */}
              <div>
                <label className="block text-[13px] text-theme-text-2 mb-2">
                  Workweek starts on
                </label>
                <select
                  value={workweekStart}
                  onChange={(e) => setWorkweekStart(e.target.value)}
                  className="w-full px-4 py-2.5 bg-theme-surface-1 border border-theme-border-1 rounded-xl text-theme-text-1 text-[15px] focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:border-theme-accent/40 transition-colors"
                >
                  {DAYS_OF_WEEK.map(day => (
                    <option key={day} value={day}>{day}day</option>
                  ))}
                </select>
              </div>

              {/* 7th day rule */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={include7thDay}
                    onChange={(e) => setInclude7thDay(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-theme-border-1 bg-theme-surface-1 text-theme-accent focus:ring-theme-focus/40 focus:ring-offset-0 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-theme-text-1">Include 7th consecutive day rule</span>
                      <div className="relative group/tooltip">
                        <HelpCircle className="w-3.5 h-3.5 text-theme-text-3 hover:text-theme-text-2 transition-colors cursor-help" />
                        <div className="absolute left-0 top-6 w-64 p-3 bg-theme-surface-3 border border-theme-border-1 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10">
                          <p className="text-[12px] text-theme-text-2 leading-[1.6]">
                            First 8 hours on 7th consecutive workday are paid at 1.5× rate. Hours beyond 8 are paid at 2× rate.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Hours Entry */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-theme-text-1 tracking-tight leading-tight">
                Hours worked
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={fillWeekdays}
                  className="text-[12px] text-theme-text-3 hover:text-theme-accent transition-colors"
                >
                  Fill weekdays (8h)
                </button>
                <span className="text-theme-text-3">·</span>
                <button
                  onClick={copyMondayToAll}
                  className="text-[12px] text-theme-text-3 hover:text-theme-accent transition-colors"
                >
                  Copy Mon → All
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              {orderedDays.map((day) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-[14px] text-theme-text-2 w-10 font-medium">{day}</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={dayHours[day] || ''}
                      onChange={(e) => handleHoursChange(day, e.target.value)}
                      min="0"
                      max="24"
                      step="0.5"
                      className={`w-full px-3 py-2 bg-theme-surface-1 border rounded-lg text-theme-text-1 text-[14px] focus:outline-none focus:ring-2 focus:ring-theme-focus/40 transition-colors ${
                        errors[day] ? 'border-theme-danger-border' : 'border-theme-border-1 focus:border-theme-accent/40'
                      }`}
                      placeholder="0"
                    />
                  </div>
                  <span className="text-[13px] text-theme-text-3 w-12">hours</span>
                </div>
              ))}
            </div>
            
            {hasAnyHours && calculationResult && calculationResult.totalHours < 40 && (
              <p className="text-[12px] text-theme-text-3 mt-3">
                Total: {calculationResult.totalHours} hours this week
              </p>
            )}
          </div>

          {/* Advanced Scenarios - Collapsed by default */}
          <div className="pt-6 border-t border-theme-border-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="text-[14px] font-medium text-theme-text-2 uppercase tracking-wide">
                Advanced scenarios
              </h3>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-theme-text-3 group-hover:text-theme-text-1 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-theme-text-3 group-hover:text-theme-text-1 transition-colors" />
              )}
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-3">
                <p className="text-[12px] text-theme-text-3 leading-[1.6] mb-4">
                  These scenarios require special calculations beyond this tool's scope. Consult counsel or your payroll provider.
                </p>
                {[
                  { key: 'multipleRates', label: 'Multiple pay rates in the same week' },
                  { key: 'bonusCommission', label: 'Bonuses/commissions affecting regular rate' },
                  { key: 'pieceRate', label: 'Piece-rate pay' },
                  { key: 'alternativeSchedule', label: 'Alternative workweek schedule (4/10, 9/80)' },
                  { key: 'unionContract', label: 'Union contract rules' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guardrails[key as keyof typeof guardrails]}
                      onChange={(e) => setGuardrails(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="w-4 h-4 rounded border-theme-border-1 bg-theme-surface-1 text-theme-warning focus:ring-theme-warning/40 focus:ring-offset-0"
                    />
                    <span className="text-[13px] text-theme-text-2">{label}</span>
                  </label>
                ))}

                {hasAnyGuardrails && (
                  <div className="mt-4 p-3 bg-theme-warning-bg border border-theme-warning-border rounded-lg">
                    <p className="text-[12px] text-theme-warning leading-[1.6]">
                      This calculator won't be accurate for your scenario. Consult counsel or payroll provider for guidance.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="p-6 sm:p-8 space-y-6">
          {!hasAnyHours ? (
            /* Empty State */
            <div className="h-full flex items-center justify-center py-12">
              <div className="text-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-theme-surface-1 border border-theme-border-2 flex items-center justify-center mx-auto mb-4">
                  <Info className="w-5 h-5 text-theme-icon-2" />
                </div>
                <h4 className="text-[15px] font-medium text-theme-text-1 mb-2 tracking-tight leading-tight">
                  Instant breakdown
                </h4>
                <p className="text-[13px] text-theme-text-3 leading-[1.65] mb-6">
                  Enter hours worked to see regular time, overtime (1.5×), and double-time (2×) splits with estimated gross pay.
                </p>
                <div className="space-y-2">
                  <p className="text-[12px] text-theme-text-3 mb-3">Try an example:</p>
                  <button
                    onClick={() => loadExample(1)}
                    className="block w-full text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors text-center"
                  >
                    Single 13-hour shift
                  </button>
                  <button
                    onClick={() => loadExample(2)}
                    className="block w-full text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors text-center"
                  >
                    5 days × 9 hours + Saturday
                  </button>
                  <button
                    onClick={() => loadExample(3)}
                    className="block w-full text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors text-center"
                  >
                    All 7 days worked
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Results Display */
            <>
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[15px] font-semibold text-theme-text-1 tracking-tight leading-tight">
                    Breakdown
                  </h3>
                  <span className={`px-2.5 py-1 rounded-lg text-[12px] font-medium ${
                    calculationResult?.confidence === 'high'
                      ? 'bg-theme-success-bg border border-theme-success-border text-theme-success'
                      : 'bg-theme-warning-bg border border-theme-warning-border text-theme-warning'
                  }`}>
                    {calculationResult?.confidence === 'high' ? 'Estimate' : 'Limited accuracy'}
                  </span>
                </div>

                {/* Hours Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-[14px] text-theme-text-2">Total hours</span>
                    <span className="text-[15px] text-theme-text-1 font-medium">
                      {calculationResult?.totalHours.toFixed(1)} hrs
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-t border-theme-border-2">
                    <span className="text-[14px] text-theme-text-2">Regular time</span>
                    <span className="text-[15px] text-theme-text-1 font-medium">
                      {calculationResult?.straightHours.toFixed(1)} hrs
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-t border-theme-border-2">
                    <span className="text-[14px] text-theme-text-2">Overtime (1.5×)</span>
                    <span className="text-[15px] text-theme-text-1 font-medium">
                      {calculationResult?.overtimeHours.toFixed(1)} hrs
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-t border-theme-border-2">
                    <span className="text-[14px] text-theme-text-2">Double-time (2×)</span>
                    <span className="text-[15px] text-theme-text-1 font-medium">
                      {calculationResult?.doubleTimeHours.toFixed(1)} hrs
                    </span>
                  </div>
                </div>

                {/* Estimated Gross Pay */}
                <div className="p-5 bg-theme-surface-2 border border-theme-border-2 rounded-xl">
                  <div className="text-[12px] text-theme-text-3 mb-1 uppercase tracking-wide">Estimated gross pay</div>
                  <div className="text-[32px] font-semibold text-theme-text-1 tracking-tight leading-none mb-4">
                    ${calculationResult?.totalPay.toFixed(2)}
                  </div>
                  <div className="space-y-2 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-theme-text-3">Regular</span>
                      <span className="text-theme-text-1">${calculationResult?.straightPay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text-3">Overtime</span>
                      <span className="text-theme-text-1">${calculationResult?.overtimePay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-theme-text-3">Double-time</span>
                      <span className="text-theme-text-1">${calculationResult?.doubleTimePay.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* How we counted note */}
                <div className="mt-4 p-3 bg-theme-accent-soft border border-theme-accent/20 rounded-lg">
                  <p className="text-[12px] text-theme-text-2 leading-[1.6]">
                    <span className="font-medium text-theme-text-1">How we counted:</span> Weekly overtime rule applied only to hours not already counted as daily overtime (avoids double-counting).
                  </p>
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => calculationResult && onOpenBreakdown(calculationResult)}
                className="w-full px-5 py-3 rounded-xl bg-theme-surface-1 border border-theme-border-1 text-[14px] text-theme-accent font-medium hover:bg-theme-surface-1 hover:border-theme-border-1 transition-all"
              >
                View per-day details →
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer - Calculator version */}
      <div className="px-6 sm:px-8 py-4 border-t border-theme-border-2 bg-theme-surface-2">
        <p className="text-[11px] text-theme-text-3 text-center">
          California overtime ruleset · Reviewed January 2026 · v1.2
        </p>
      </div>
    </div>
  );
}
