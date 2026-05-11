import { useState, useEffect } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface CalculatorProps {
  onOpenBreakdown: (data: CalculationResult) => void;
}

interface DayHours {
  [key: string]: number; // day name -> hours worked
}

interface CalculationResult {
  totalPay: number;
  straightHours: number;
  overtimeHours: number;
  doubleTimeHours: number;
  confidence: 'high' | 'limited';
  dailyBreakdown: DailyBreakdown[];
  hourlyRate: number;
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

export function OvertimeCalculator({ onOpenBreakdown }: CalculatorProps) {
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [workweekStart, setWorkweekStart] = useState<string>('Sun');
  const [payPeriod, setPayPeriod] = useState<'weekly' | 'biweekly'>('weekly');
  const [include7thDay, setInclude7thDay] = useState(true);
  const [dayHours, setDayHours] = useState<DayHours>({
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  });

  // Guardrail checkboxes
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
        consecutiveDays = 0; // Reset streak
      } else if (is7thDay) {
        // 7th consecutive day rules
        if (hours <= 8) {
          overtime = hours; // First 8 hours at 1.5x
        } else {
          overtime = 8;
          doubleTime = hours - 8; // Over 8 hours at 2x
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
    
    // Weekly OT applies to hours over 40 that weren't already counted as daily OT
    if (totalHoursWorked > 40) {
      const weeklyOTEligible = totalHoursWorked - 40;
      const dailyOTAlreadyCounted = totalDailyOT;
      
      // If weekly OT > daily OT, the difference becomes additional OT
      if (weeklyOTEligible > dailyOTAlreadyCounted) {
        const additionalWeeklyOT = weeklyOTEligible - dailyOTAlreadyCounted;
        totalStraight -= additionalWeeklyOT;
        totalOvertime += additionalWeeklyOT;
      }
    }

    const totalPay = (totalStraight * hourlyRate) + (totalOvertime * hourlyRate * 1.5) + (totalDoubleTime * hourlyRate * 2);

    return {
      totalPay,
      straightHours: totalStraight,
      overtimeHours: totalOvertime,
      doubleTimeHours: totalDoubleTime,
      confidence: hasAnyGuardrails ? 'limited' : 'high',
      dailyBreakdown,
      hourlyRate
    };
  }

  function getOrderedDays(): string[] {
    const startIndex = DAYS_OF_WEEK.indexOf(workweekStart);
    return [...DAYS_OF_WEEK.slice(startIndex), ...DAYS_OF_WEEK.slice(0, startIndex)];
  }

  function handleHoursChange(day: string, value: string) {
    const hours = parseFloat(value) || 0;
    if (hours >= 0 && hours <= 24) {
      setDayHours(prev => ({ ...prev, [day]: hours }));
    }
  }

  function loadExample(exampleNum: number) {
    if (exampleNum === 1) {
      // Single long shift
      setDayHours({
        Sun: 0,
        Mon: 13,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
      });
      setHourlyRate(20);
    } else if (exampleNum === 2) {
      // Multiple overtime triggers
      setDayHours({
        Sun: 0,
        Mon: 9,
        Tue: 9,
        Wed: 9,
        Thu: 9,
        Fri: 9,
        Sat: 6,
      });
      setHourlyRate(20);
    } else if (exampleNum === 3) {
      // 7th day worked
      setDayHours({
        Sun: 8,
        Mon: 8,
        Tue: 8,
        Wed: 8,
        Thu: 8,
        Fri: 8,
        Sat: 8,
      });
      setHourlyRate(20);
      setInclude7thDay(true);
    }
  }

  const orderedDays = getOrderedDays();

  return (
    <div className="bg-theme-surface-1 rounded-2xl border border-theme-border-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <div>
            <h3 className="text-[17px] font-semibold text-theme-text-1 mb-5 tracking-tight leading-tight">
              Pay settings
            </h3>
            
            {/* Hourly rate */}
            <div className="mb-4">
              <label className="block text-[13px] text-theme-text-2 mb-2">
                Hourly rate
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-3">$</span>
                <input
                  type="number"
                  value={hourlyRate || ''}
                  onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 bg-theme-surface-1 border border-theme-border-1 rounded-xl text-theme-text-1 text-[15px] focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:border-theme-focus/40"
                  placeholder="25.00"
                />
              </div>
            </div>

            {/* Workweek start */}
            <div className="mb-4">
              <label className="block text-[13px] text-theme-text-2 mb-2">
                Workweek starts on
              </label>
              <select
                value={workweekStart}
                onChange={(e) => setWorkweekStart(e.target.value)}
                className="w-full px-4 py-2.5 bg-theme-surface-1 border border-theme-border-1 rounded-xl text-theme-text-1 text-[15px] focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:border-theme-focus/40"
              >
                {DAYS_OF_WEEK.map(day => (
                  <option key={day} value={day}>{day}day</option>
                ))}
              </select>
            </div>

            {/* 7th day rule toggle */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={include7thDay}
                onChange={(e) => setInclude7thDay(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-theme-border-1 bg-theme-surface-1 text-theme-accent focus:ring-theme-focus/40 focus:ring-offset-0"
              />
              <div>
                <span className="text-[14px] text-theme-text-1">Include 7th consecutive day rule</span>
                <p className="text-[12px] text-theme-text-3 mt-0.5">First 8 hours on 7th consecutive day at 1.5x rate</p>
              </div>
            </label>
          </div>

          {/* Hours Entry */}
          <div>
            <h3 className="text-[17px] font-semibold text-theme-text-1 mb-3 tracking-tight leading-tight">
              Hours worked
            </h3>
            <p className="text-[13px] text-theme-text-3 mb-4">Enter total hours worked each day</p>
            
            <div className="space-y-2">
              {orderedDays.map((day, index) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-[14px] text-theme-text-2 w-10">{day}</span>
                  <input
                    type="number"
                    value={dayHours[day] || ''}
                    onChange={(e) => handleHoursChange(day, e.target.value)}
                    min="0"
                    max="24"
                    step="0.5"
                    className="flex-1 px-3 py-2 bg-theme-surface-1 border border-theme-border-1 rounded-lg text-theme-text-1 text-[14px] focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:border-theme-focus/40"
                    placeholder="0"
                  />
                  <span className="text-[13px] text-theme-text-3 w-12">hours</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Guardrails */}
          <div className="pt-4 border-t border-theme-border-2">
            <h3 className="text-[14px] font-medium text-theme-text-2 mb-3">
              Does any of this apply?
            </h3>
            <div className="space-y-2.5">
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
                    className="w-4 h-4 rounded border-theme-border-1 bg-theme-surface-1 text-theme-accent focus:ring-theme-focus/40 focus:ring-offset-0"
                  />
                  <span className="text-[13px] text-theme-text-2">{label}</span>
                </label>
              ))}
            </div>

            {hasAnyGuardrails && (
              <div className="mt-4 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg flex gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500/70 flex-shrink-0 mt-0.5" />
                <p className="text-[12px] text-yellow-500/90 leading-[1.6]">
                  This calculator won't be accurate for your scenario. Use the guidance section below or consult counsel/payroll provider.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {!hasAnyHours ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-xs">
                <div className="w-12 h-12 rounded-full bg-theme-surface-1 border border-theme-border-2 flex items-center justify-center mx-auto mb-4">
                  <Info className="w-5 h-5 text-theme-icon-2" />
                </div>
                <p className="text-[14px] text-theme-text-3 leading-[1.65]">
                  Enter hours worked to see your overtime breakdown
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <p className="text-[12px] text-theme-text-3 mb-2">Or try an example:</p>
                  <button
                    onClick={() => loadExample(1)}
                    className="text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                  >
                    Example 1: Single long shift (13 hours)
                  </button>
                  <button
                    onClick={() => loadExample(2)}
                    className="text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                  >
                    Example 2: Multiple OT triggers
                  </button>
                  <button
                    onClick={() => loadExample(3)}
                    className="text-[13px] text-theme-accent hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
                  >
                    Example 3: 7th day worked
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[17px] font-semibold text-theme-text-1 tracking-tight leading-tight">
                    Results
                  </h3>
                  <span className={`px-2.5 py-1 rounded-lg text-[12px] font-medium ${
                    calculationResult?.confidence === 'high'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/90'
                  }`}>
                    {calculationResult?.confidence === 'high' ? 'High confidence' : 'Estimate only'}
                  </span>
                </div>

                {/* Total Pay - Big */}
                <div className="mb-6 p-5 bg-theme-surface-2 border border-theme-border-2 rounded-xl">
                  <div className="text-[13px] text-theme-text-3 mb-1">Total weekly pay</div>
                  <div className="text-[36px] sm:text-[42px] font-semibold text-theme-text-1 tracking-tight leading-none">
                    ${calculationResult?.totalPay.toFixed(2)}
                  </div>
                </div>

                {/* Hours breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2.5 border-b border-theme-border-2">
                    <span className="text-[14px] text-theme-text-2">Straight time</span>
                    <span className="text-[15px] text-theme-text-1 font-medium">
                      {calculationResult?.straightHours.toFixed(1)} hrs
                      <span className="text-theme-text-3 ml-2">
                        ${(calculationResult!.straightHours * calculationResult!.hourlyRate).toFixed(2)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-theme-border-2">
                    <span className="text-[14px] text-theme-text-2">Overtime (1.5×)</span>
                    <span className="text-[15px] text-theme-text-1 font-medium">
                      {calculationResult?.overtimeHours.toFixed(1)} hrs
                      <span className="text-theme-text-3 ml-2">
                        ${(calculationResult!.overtimeHours * calculationResult!.hourlyRate * 1.5).toFixed(2)}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-[14px] text-theme-text-2">Double-time (2×)</span>
                    <span className="text-[15px] text-theme-text-1 font-medium">
                      {calculationResult?.doubleTimeHours.toFixed(1)} hrs
                      <span className="text-theme-text-3 ml-2">
                        ${(calculationResult!.doubleTimeHours * calculationResult!.hourlyRate * 2).toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown link */}
              <button
                onClick={() => calculationResult && onOpenBreakdown(calculationResult)}
                className="w-full px-5 py-3 rounded-xl bg-theme-surface-1 border border-theme-border-1 text-[14px] text-theme-accent font-medium hover:bg-theme-surface-1 hover:border-theme-border-1 transition-all focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0"
              >
                See detailed breakdown →
              </button>

              {/* Plus upsell - subtle */}
              <div className="pt-4 border-t border-theme-border-2">
                <div className="flex items-start gap-3 p-4 bg-theme-surface-2 border border-theme-border-2 rounded-xl">
                  <div className="flex-1">
                    <p className="text-[13px] text-theme-text-3 leading-[1.6] mb-2">
                      Save this week's breakdown and notes for audit trail
                    </p>
                    <button className="inline-flex items-center gap-1.5 text-[13px] text-theme-accent font-medium hover:text-theme-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-theme-focus/40 focus:ring-offset-0">
                      Unlock Guardrail Plus →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}