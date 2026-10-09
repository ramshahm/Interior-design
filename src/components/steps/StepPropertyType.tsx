import { PROPERTY_TYPES } from '@/lib/estimator';
import { Home, Building2, Building, Castle, Briefcase, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Home,
  Building2,
  Building,
  Castle,
  Briefcase,
};

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

export function StepPropertyType({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-cream mb-2">Select Your Property Type</h2>
      <p className="text-gray-400 text-sm mb-8">Choose the space you'd like to transform</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROPERTY_TYPES.map((type) => {
          const Icon = ICONS[type.icon];
          const isSelected = selected === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`group relative rounded-2xl border p-6 text-left transition-all duration-300 ${
                isSelected
                  ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10'
                  : 'border-gray-700 bg-gray-800/40 hover:border-gray-500 hover:bg-gray-800/70'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-gold flex items-center justify-center">
                  <svg className="h-3.5 w-3.5 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                isSelected ? 'bg-gold/20 text-gold' : 'bg-gray-700/50 text-gray-400 group-hover:text-cream'
              }`}>
                {Icon && <Icon className="h-6 w-6" />}
              </div>
              <h3 className={`text-lg font-semibold mb-1 ${isSelected ? 'text-gold' : 'text-cream'}`}>{type.label}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{type.description}</p>
              <p className="text-xs text-gray-500 mt-3">Starting at ₹{type.baseRate}/sq.ft</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
