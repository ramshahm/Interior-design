import { SCOPE_OPTIONS } from '@/lib/estimator';
import { LayoutGrid, ChefHat, Sofa, BedDouble, Lightbulb, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  LayoutGrid,
  ChefHat,
  Sofa,
  BedDouble,
  Lightbulb,
};

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

export function StepScope({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-cream mb-2">Choose Your Scope of Work</h2>
      <p className="text-gray-400 text-sm mb-8">What would you like us to design?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SCOPE_OPTIONS.map((scope) => {
          const Icon = ICONS[scope.icon];
          const isSelected = selected === scope.id;
          return (
            <button
              key={scope.id}
              onClick={() => onSelect(scope.id)}
              className={`group relative flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                isSelected
                  ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10'
                  : 'border-gray-700 bg-gray-800/40 hover:border-gray-500 hover:bg-gray-800/70'
              }`}
            >
              <div className={`flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                isSelected ? 'bg-gold/20 text-gold' : 'bg-gray-700/50 text-gray-400 group-hover:text-cream'
              }`}>
                {Icon && <Icon className="h-6 w-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-base font-semibold mb-0.5 ${isSelected ? 'text-gold' : 'text-cream'}`}>{scope.label}</h3>
                <p className="text-sm text-gray-400 leading-snug">{scope.description}</p>
              </div>
              {isSelected && (
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gold flex items-center justify-center">
                  <svg className="h-3.5 w-3.5 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
