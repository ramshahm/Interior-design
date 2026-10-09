import { useState } from 'react';
import { User, Phone, MapPin, Loader2 } from 'lucide-react';
import type { LeadData } from '@/lib/types';

type Props = {
  data: LeadData;
  onUpdate: (data: LeadData) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export function StepDetails({ data, onUpdate, onSubmit, isSubmitting }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = 'Please enter your name';
    if (!data.phone.trim()) {
      errs.phone = 'Please enter your WhatsApp number';
    } else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\D/g, '').replace(/^91/, ''))) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!data.city.trim()) errs.city = 'Please enter your city';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-cream mb-2">Your Contact Details</h2>
      <p className="text-gray-400 text-sm mb-8">We'll send your personalized quote and a design consultant will reach out</p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              value={data.name}
              onChange={(e) => onUpdate({ ...data, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-700 bg-gray-800/50 pl-12 pr-4 py-3.5 text-cream placeholder-gray-600 outline-none transition-colors focus:border-gold focus:bg-gray-800/80"
            />
          </div>
          {errors.name && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <span className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</span>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onUpdate({ ...data, phone: e.target.value })}
              placeholder="98765 43210"
              maxLength={10}
              className="w-full rounded-xl border border-gray-700 bg-gray-800/50 pl-20 pr-4 py-3.5 text-cream placeholder-gray-600 outline-none transition-colors focus:border-gold focus:bg-gray-800/80"
            />
          </div>
          {errors.phone && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">City / Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              value={data.city}
              onChange={(e) => onUpdate({ ...data, city: e.target.value })}
              placeholder="e.g. Mumbai, Bangalore, Delhi"
              className="w-full rounded-xl border border-gray-700 bg-gray-800/50 pl-12 pr-4 py-3.5 text-cream placeholder-gray-600 outline-none transition-colors focus:border-gold focus:bg-gray-800/80"
            />
          </div>
          {errors.city && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.city}</p>}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 font-semibold text-charcoal transition-all hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Quote...
            </>
          ) : (
            'Get My Estimate'
          )}
        </button>
      </div>
    </div>
  );
}
