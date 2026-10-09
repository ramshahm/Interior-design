import { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Ruler } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { calculateEstimate } from '@/lib/estimator';
import type { LeadData, EstimateResult } from '@/lib/types';
import { ProgressBar } from '@/components/ProgressBar';
import { StepPropertyType } from '@/components/steps/StepPropertyType';
import { StepCarpetArea } from '@/components/steps/StepCarpetArea';
import { StepScope } from '@/components/steps/StepScope';
import { StepFinish } from '@/components/steps/StepFinish';
import { StepDetails } from '@/components/steps/StepDetails';
import { ResultDashboard } from '@/components/ResultDashboard';

const STEP_LABELS = ['Property', 'Area', 'Scope', 'Finish', 'Details'];
const TOTAL_STEPS = 5;

const INITIAL_DATA: LeadData = {
  name: '',
  phone: '',
  city: '',
  propertyType: '',
  carpetArea: 1200,
  scopeOfWork: '',
  finishGrade: '',
};

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadData>(INITIAL_DATA);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 1: return !!data.propertyType;
      case 2: return data.carpetArea >= 300;
      case 3: return !!data.scopeOfWork;
      case 4: return !!data.finishGrade;
      default: return true;
    }
  }, [step, data]);

  const handleNext = useCallback(() => {
    if (canProceed() && step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  }, [canProceed, step]);

  const handleBack = useCallback(() => {
    if (step > 1) setStep((s) => s - 1);
  }, [step]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const result = calculateEstimate(data.propertyType, data.carpetArea, data.scopeOfWork, data.finishGrade);
    setEstimate(result);

    try {
      await supabase.from('leads').insert({
        name: data.name,
        phone: data.phone,
        city: data.city,
        property_type: data.propertyType,
        carpet_area: data.carpetArea,
        scope_of_work: data.scopeOfWork,
        finish_grade: data.finishGrade,
        estimated_min: result.min,
        estimated_max: result.max,
        breakdown: result.breakdown,
      });
    } catch {
      // Lead save failure shouldn't block the user from seeing their estimate
    }

    setIsSubmitting(false);
    setStep(TOTAL_STEPS + 1);
  }, [data]);

  const handleReset = useCallback(() => {
    setData(INITIAL_DATA);
    setEstimate(null);
    setStep(1);
  }, []);

  const showResult = step > TOTAL_STEPS;

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-10 bg-charcoal/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 border border-gold/20">
              <Ruler className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-cream leading-none">Aurelia Interiors</h1>
              <p className="text-xs text-gray-500 mt-0.5">Cost Estimator & Consultation</p>
            </div>
          </div>
          {!showResult && (
            <div className="text-sm text-gray-400">
              Step <span className="text-gold font-semibold">{step}</span> / {TOTAL_STEPS}
            </div>
          )}
        </div>
      </header>

      {/* Progress bar */}
      {!showResult && (
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-6">
          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} stepLabels={STEP_LABELS} />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-3xl">
          {!showResult && (
            <div key={step} className="animate-slide-in">
              {step === 1 && <StepPropertyType selected={data.propertyType} onSelect={(id) => setData({ ...data, propertyType: id })} />}
              {step === 2 && <StepCarpetArea value={data.carpetArea} onChange={(v) => setData({ ...data, carpetArea: v })} />}
              {step === 3 && <StepScope selected={data.scopeOfWork} onSelect={(id) => setData({ ...data, scopeOfWork: id })} />}
              {step === 4 && <StepFinish selected={data.finishGrade} onSelect={(id) => setData({ ...data, finishGrade: id })} />}
              {step === 5 && (
                <StepDetails
                  data={data}
                  onUpdate={setData}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              )}

              {step < 5 && (
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-gray-400 transition-all hover:text-cream disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3 text-sm font-semibold text-charcoal transition-all hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {showResult && estimate && (
            <ResultDashboard data={data} estimate={estimate} onReset={handleReset} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-600">
            Estimates are indicative. Final pricing varies with material selection and site conditions.
          </p>
        </div>
      </footer>
    </div>
  );
}
