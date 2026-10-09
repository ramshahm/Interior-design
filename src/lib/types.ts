export type PropertyType = {
  id: string;
  label: string;
  description: string;
  icon: string;
  baseRate: number;
};

export type ScopeOption = {
  id: string;
  label: string;
  description: string;
  icon: string;
  allocation: {
    woodwork: number;
    kitchen: number;
    painting: number;
    decor: number;
    electrical: number;
  };
};

export type FinishGrade = {
  id: string;
  label: string;
  description: string;
  multiplier: number;
  perSqft: string;
  features: string[];
};

export type CostBreakdown = {
  woodwork: number;
  kitchen: number;
  painting: number;
  decor: number;
  electrical: number;
  total: number;
};

export type EstimateResult = {
  min: number;
  max: number;
  breakdown: CostBreakdown;
};

export type LeadData = {
  name: string;
  phone: string;
  city: string;
  propertyType: string;
  carpetArea: number;
  scopeOfWork: string;
  finishGrade: string;
};
