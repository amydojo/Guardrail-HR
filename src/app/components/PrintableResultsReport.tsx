import { useEffect } from 'react';

interface ReportDriver {
  title: string;
  explanation: string;
}

interface ReportAction {
  title: string;
}

interface ReportAnswer {
  questionLabel: string;
  response: string;
}

interface PrintableResultsReportProps {
  score: number;
  companyName?: string;
  assessmentDate: number;
  jurisdiction: string;
  drivers: ReportDriver[];
  actions: ReportAction[];
  answers?: ReportAnswer[];
  onClose: () => void;
  includeAnswers?: boolean;
}

export function PrintableResultsReport({
  score,
  companyName = 'Your Organization',
  assessmentDate,
  jurisdiction,
  drivers,
  actions,
  answers = [],
  onClose,
  includeAnswers = false
}: PrintableResultsReportProps) {
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto print:static">
      {/* Screen-only controls */}
      <div className="print:hidden sticky top-0 bg-white border-b border-gray-300 z-10">
        <div className="max-w-[960px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium text-gray-900">
              Print / Export View
            </p>
            <p className="text-[12px] text-gray-600">
              Use your browser's print function to save as PDF
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#5b6ff5] text-white text-[14px] font-medium hover:bg-[#4a5ee0] transition-colors"
            >
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Printable document */}
      <div className="max-w-[8.5in] mx-auto bg-white px-[0.75in] py-[1in] print:px-[0.75in] print:py-[0.75in]">
        
        {/* Header */}
        <header className="mb-12 pb-6 border-b border-gray-300">
          <div className="flex items-start justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="26" height="26" rx="6" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
                <path d="M12 8 L12 24" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M20 8 L20 24" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="14" y="14" width="4" height="4" fill="#1a1a1a"/>
              </svg>
              <span className="text-[13px] font-medium text-gray-900 tracking-wide">
                GUARDRAIL HR
              </span>
            </div>

            {/* Document metadata */}
            <div className="text-right">
              <h1 className="text-[18px] font-semibold text-gray-900 mb-2">
                Wage & Hour Diagnostic Summary
              </h1>
              <div className="text-[12px] text-gray-700 space-y-0.5">
                <p><span className="font-medium">Company:</span> {companyName}</p>
                <p><span className="font-medium">Assessment date:</span> {formatDate(assessmentDate)}</p>
                <p><span className="font-medium">Jurisdiction:</span> {jurisdiction}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Score Summary Section */}
        <section className="mb-10">
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[56px] font-semibold text-gray-900 leading-none tracking-tight">
                {score}
              </span>
              <span className="text-[32px] font-normal text-gray-500 leading-none">
                / 100
              </span>
            </div>
            <p className="text-[13px] font-medium text-gray-700 uppercase tracking-wide mb-3">
              Risk exposure score
            </p>
          </div>
          
          <p className="text-[14px] text-gray-800 leading-relaxed max-w-[600px]">
            Based on rule-based checks aligned with {jurisdiction} wage & hour requirements.
          </p>
        </section>

        {/* Key Drivers Section */}
        {drivers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[16px] font-semibold text-gray-900 mb-4">
              Primary risk drivers identified
            </h2>
            <div className="space-y-4">
              {drivers.map((driver, index) => (
                <div key={index} className="border-l-2 border-gray-300 pl-4">
                  <p className="text-[14px] font-medium text-gray-900 mb-1">
                    {driver.title}
                  </p>
                  <p className="text-[13px] text-gray-700 leading-relaxed">
                    {driver.explanation}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Next Steps */}
        {actions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[16px] font-semibold text-gray-900 mb-4">
              Suggested review areas
            </h2>
            <ul className="space-y-2.5">
              {actions.map((action, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[13px] text-gray-500 mt-0.5 flex-shrink-0">
                    •
                  </span>
                  <p className="text-[13px] text-gray-800 leading-relaxed">
                    {action.title}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Answer Summary (Optional) */}
        {includeAnswers && answers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[16px] font-semibold text-gray-900 mb-4">
              Response summary
            </h2>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-3 font-medium text-gray-900">
                      Assessment item
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-gray-900">
                      Response
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map((answer, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-gray-800">
                        {answer.questionLabel}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {answer.response}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Legal & Use Disclaimer */}
        <section className="mt-16 pt-6 border-t border-gray-300">
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4">
            <p className="text-[11px] leading-relaxed text-gray-700">
              <span className="font-semibold text-gray-900">Disclaimer:</span> This report is generated using rule-based checks based on user-provided information. It is for informational purposes only and does not constitute legal advice or a determination of compliance or non-compliance. Organizations should consult with qualified legal counsel or compliance professionals to address specific circumstances and requirements.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-300 flex items-center justify-between">
          <p className="text-[11px] text-gray-600">
            Generated by Guardrail HR
          </p>
          <p className="text-[11px] text-gray-600">
            {formatTimestamp(Date.now())}
          </p>
        </footer>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0.75in;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:static {
            position: static !important;
          }
          
          .print\\:px-\\[0\\.75in\\] {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          
          .print\\:py-\\[0\\.75in\\] {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          /* Ensure page breaks are controlled */
          section {
            page-break-inside: avoid;
          }

          /* Ensure borders and backgrounds print */
          * {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
