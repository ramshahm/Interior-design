import { FINISH_GRADES } from '@/lib/estimator';
import { Check } from 'lucide-react';

type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

export function StepFinish({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-cream mb-2">Select Finish & Material Grade</h2>
      <p className="text-gray-400 text-sm mb-8">Higher grades include premium materials and craftsmanship</p>

      <div className="space-y-4">
        {FINISH_GRADES.map((grade) => {
          const isSelected = selected === grade.id;
          return (
            <button
              key={grade.id}
              onClick={() => onSelect(grade.id)}
              className={`group w-full rounded-2xl border p-6 text-left transition-all duration-300 ${
                isSelected
                  ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10'
                  : 'border-gray-700 bg-gray-800/40 hover:border-gray-500 hover:bg-gray-800/70'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className={`text-lg font-semibold ${isSelected ? 'text-gold' : 'text-cream'}`}>{grade.label}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{grade.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${isSelected ? 'text-gold' : 'text-gray-300'}`}>{grade.perSqft}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {grade.features.map((feature) => (
                  <span
                    key={feature}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      isSelected ? 'bg-gold/15 text-gold' : 'bg-gray-700/40 text-gray-400'
                    }`}
                  >
                    <Check className="h-3 w-3" />
                    {feature}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
