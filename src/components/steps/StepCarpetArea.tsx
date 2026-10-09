type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function StepCarpetArea({ value, onChange }: Props) {
  const min = 300;
  const max = 5000;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-cream mb-2">What's Your Carpet Area?</h2>
      <p className="text-gray-400 text-sm mb-8">Slide to select your floor space in square feet</p>

      <div className="rounded-2xl border border-gray-700 bg-gray-800/40 p-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-baseline gap-2">
            <span className="text-5xl font-bold text-gold tabular-nums">{value}</span>
            <span className="text-xl text-gray-400 font-medium">sq.ft</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {value < 700 ? 'Compact space' : value < 1500 ? 'Medium layout' : value < 3000 ? 'Spacious property' : 'Large property'}
          </p>
        </div>

        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={50}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 appearance-none rounded-full cursor-pointer slider-gold"
            style={{
              background: `linear-gradient(to right, #d4af37 0%, #d4af37 ${percentage}%, #3a3a3a ${percentage}%, #3a3a3a 100%)`,
            }}
          />
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>300 sq.ft</span>
            <span>2,650 sq.ft</span>
            <span>5,000 sq.ft</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-6">
          {[600, 1200, 2000, 3500].map((preset) => (
            <button
              key={preset}
              onClick={() => onChange(preset)}
              className={`rounded-lg py-2 text-sm font-medium transition-all ${
                value === preset
                  ? 'bg-gold text-charcoal'
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-cream'
              }`}
            >
              {preset.toLocaleString('en-IN')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
