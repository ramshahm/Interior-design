import { FileDown, MessageCircle, RefreshCw, Sparkles } from 'lucide-react';
import type { EstimateResult, LeadData } from '@/lib/types';
import { PROPERTY_TYPES, SCOPE_OPTIONS, FINISH_GRADES, formatINR, formatINRShort } from '@/lib/estimator';
import { generatePDFQuote, buildWhatsAppMessage, getWhatsAppLink } from '@/lib/export';

type Props = {
  data: LeadData;
  estimate: EstimateResult;
  onReset: () => void;
};

export function ResultDashboard({ data, estimate, onReset }: Props) {
  const property = PROPERTY_TYPES.find((p) => p.id === data.propertyType);
  const scope = SCOPE_OPTIONS.find((s) => s.id === data.scopeOfWork);
  const finish = FINISH_GRADES.find((f) => f.id === data.finishGrade);

  const breakdownItems = [
    { label: 'Woodwork & Carpentry', amount: estimate.breakdown.woodwork, color: 'bg-amber-500' },
    { label: 'Modular Kitchen', amount: estimate.breakdown.kitchen, color: 'bg-yellow-600' },
    { label: 'Painting & Wall Finish', amount: estimate.breakdown.painting, color: 'bg-orange-500' },
    { label: 'Decor & Furnishings', amount: estimate.breakdown.decor, color: 'bg-stone-500' },
    { label: 'Electrical & Lighting', amount: estimate.breakdown.electrical, color: 'bg-yellow-500' },
  ];

  const maxAmount = Math.max(...breakdownItems.map((b) => b.amount));

  const handleDownloadPDF = () => {
    generatePDFQuote(data, estimate);
  };

  const handleWhatsApp = () => {
    const message = buildWhatsAppMessage(data, estimate);
    const link = getWhatsAppLink(data.phone, message);
    window.open(link, '_blank');
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 border border-gold/30 px-4 py-1.5 mb-4">
          <Sparkles className="h-4 w-4 text-gold" />
          <span className="text-sm font-medium text-gold">Your Estimate is Ready</span>
        </div>
        <h2 className="text-3xl font-bold text-cream mb-2">Estimated Project Cost</h2>
        <p className="text-gray-400 text-sm">Based on your selections, here's your personalized budget range</p>
      </div>

      <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 mb-6 text-center">
        <p className="text-gray-400 text-sm mb-3">Total Estimated Range</p>
        <div className="inline-flex items-baseline gap-3">
          <span className="text-4xl sm:text-5xl font-bold text-gold tabular-nums">{formatINR(estimate.min)}</span>
          <span className="text-2xl text-gray-500">–</span>
          <span className="text-4xl sm:text-5xl font-bold text-gold tabular-nums">{formatINR(estimate.max)}</span>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          {finish?.perSqft} · {data.carpetArea} sq.ft · {finish?.label}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-700 bg-gray-800/40 p-6 mb-6">
        <h3 className="text-lg font-semibold text-cream mb-5">Itemized Cost Breakdown</h3>
        <div className="space-y-4">
          {breakdownItems.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-sm font-semibold text-cream tabular-nums">{formatINR(item.amount)}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-700/50 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                  style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-5 border-t border-gray-700 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-300">Approximate Total</span>
          <span className="text-lg font-bold text-gold tabular-nums">{formatINR(estimate.breakdown.total)}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-700 bg-gray-800/40 p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Your Selections</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Property</p>
            <p className="text-sm font-medium text-cream">{property?.label}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Carpet Area</p>
            <p className="text-sm font-medium text-cream">{data.carpetArea} sq.ft</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Scope</p>
            <p className="text-sm font-medium text-cream">{scope?.label}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Finish Grade</p>
            <p className="text-sm font-medium text-cream">{finish?.label}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 font-semibold text-charcoal transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
        >
          <FileDown className="h-5 w-5" />
          Download PDF Quote
        </button>
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 bg-green-600/10 px-6 py-4 font-semibold text-green-400 transition-all hover:bg-green-600/20"
        >
          <MessageCircle className="h-5 w-5" />
          Send Inquiry on WhatsApp
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cream transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Start New Estimate
        </button>
      </div>
    </div>
  );
}
