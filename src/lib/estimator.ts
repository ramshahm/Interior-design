import type { PropertyType, ScopeOption, FinishGrade, EstimateResult, CostBreakdown } from './types';

export const PROPERTY_TYPES: PropertyType[] = [
  {
    id: '1bhk',
    label: '1 BHK',
    description: 'Compact apartment, smart space planning',
    icon: 'Home',
    baseRate: 1450,
  },
  {
    id: '2bhk',
    label: '2 BHK',
    description: 'Balanced living for growing families',
    icon: 'Building2',
    baseRate: 1550,
  },
  {
    id: '3bhk',
    label: '3 BHK',
    description: 'Spacious home with room to personalize',
    icon: 'Building',
    baseRate: 1650,
  },
  {
    id: '4bhk',
    label: '4 BHK / Villa',
    description: 'Luxury layout with premium amenities',
    icon: 'Castle',
    baseRate: 1850,
  },
  {
    id: 'office',
    label: 'Office / Commercial',
    description: 'Workspace designed for productivity',
    icon: 'Briefcase',
    baseRate: 1750,
  },
];

export const SCOPE_OPTIONS: ScopeOption[] = [
  {
    id: 'full-home',
    label: 'Full Home Interior',
    description: 'Complete turnkey interior package',
    icon: 'LayoutGrid',
    allocation: { woodwork: 0.35, kitchen: 0.2, painting: 0.15, decor: 0.15, electrical: 0.15 },
  },
  {
    id: 'modular-kitchen',
    label: 'Modular Kitchen',
    description: 'Custom cabinetry, counters & appliances',
    icon: 'ChefHat',
    allocation: { woodwork: 0.15, kitchen: 0.55, painting: 0.1, decor: 0.1, electrical: 0.1 },
  },
  {
    id: 'living-room',
    label: 'Living Room',
    description: 'TV unit, seating, false ceiling & decor',
    icon: 'Sofa',
    allocation: { woodwork: 0.3, kitchen: 0.05, painting: 0.2, decor: 0.3, electrical: 0.15 },
  },
  {
    id: 'luxury-bedrooms',
    label: 'Luxury Bedrooms',
    description: 'Wardrobes, paneling, bedding & lighting',
    icon: 'BedDouble',
    allocation: { woodwork: 0.45, kitchen: 0.05, painting: 0.15, decor: 0.2, electrical: 0.15 },
  },
  {
    id: 'ceiling-lighting',
    label: 'False Ceiling & Lighting',
    description: 'POP ceilings, cove lights & fixtures',
    icon: 'Lightbulb',
    allocation: { woodwork: 0.1, kitchen: 0.05, painting: 0.15, decor: 0.1, electrical: 0.6 },
  },
];

export const FINISH_GRADES: FinishGrade[] = [
  {
    id: 'standard',
    label: 'Standard Budget',
    description: 'Quality finishes at an affordable price',
    multiplier: 1.0,
    perSqft: '₹1,400 – ₹1,600 / sq.ft',
    features: ['Laminate finishes', 'Standard hardware', 'Emulsion paint', 'Basic lighting'],
  },
  {
    id: 'premium',
    label: 'Premium Elegance',
    description: 'Refined materials and curated detailing',
    multiplier: 1.35,
    perSqft: '₹1,900 – ₹2,200 / sq.ft',
    features: ['Veneer & acrylic finishes', 'Premium hardware (Hettich/Blum)', 'Texture paint', 'Designer lighting'],
  },
  {
    id: 'luxury',
    label: 'Luxury Royal',
    description: 'Top-tier materials with bespoke craftsmanship',
    multiplier: 1.75,
    perSqft: '₹2,500 – ₹3,000 / sq.ft',
    features: ['Imported marble & veneer', 'Luxury hardware & fittings', 'Italian texture paint', 'Smart home lighting'],
  },
];

export function calculateEstimate(
  propertyTypeId: string,
  carpetArea: number,
  scopeId: string,
  finishId: string,
): EstimateResult {
  const property = PROPERTY_TYPES.find((p) => p.id === propertyTypeId);
  const scope = SCOPE_OPTIONS.find((s) => s.id === scopeId);
  const finish = FINISH_GRADES.find((f) => f.id === finishId);

  if (!property || !scope || !finish) {
    return { min: 0, max: 0, breakdown: { woodwork: 0, kitchen: 0, painting: 0, decor: 0, electrical: 0, total: 0 } };
  }

  const baseRate = property.baseRate * finish.multiplier;
  const minRate = baseRate * 0.9;
  const maxRate = baseRate * 1.12;

  const minTotal = Math.round((minRate * carpetArea) / 1000) * 1000;
  const maxTotal = Math.round((maxRate * carpetArea) / 1000) * 1000;

  const avgTotal = (minTotal + maxTotal) / 2;

  const breakdown: CostBreakdown = {
    woodwork: Math.round((avgTotal * scope.allocation.woodwork) / 500) * 500,
    kitchen: Math.round((avgTotal * scope.allocation.kitchen) / 500) * 500,
    painting: Math.round((avgTotal * scope.allocation.painting) / 500) * 500,
    decor: Math.round((avgTotal * scope.allocation.decor) / 500) * 500,
    electrical: Math.round((avgTotal * scope.allocation.electrical) / 500) * 500,
    total: avgTotal,
  };

  return { min: minTotal, max: maxTotal, breakdown };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatINRShort(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}
