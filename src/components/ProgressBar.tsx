type Props = {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
};

export function ProgressBar({ currentStep, totalSteps, stepLabels }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        {stepLabels.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gold text-charcoal'
                      : isActive
                        ? 'bg-gold text-charcoal ring-4 ring-gold/20'
                        : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={`hidden sm:block text-xs font-medium transition-colors ${
                    isCompleted || isActive ? 'text-cream' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 rounded-full transition-all duration-500">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stepNum < currentStep ? 'bg-gold w-full' : 'bg-gray-700 w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
