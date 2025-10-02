export interface RestaurantInfo {
  name: string;
  city: string;
}

export interface CalculatorInputs {
  totalGPV: number | null;
  commissionPercent: number | null;
  deliveryMix: number | null;
  migrationPercent: number | null;
  timeframe: 'annual' | 'monthly';
}

export interface CalculationResults {
  thirdPartyCommissions: number;
  innowiFees: number;
  savingsAmount: number;
  savingsPercent: number;
  monthlyProjections: MonthlyProjection[];
}

export interface MonthlyProjection {
  month: string;
  savings: number;
  thirdPartyFees: number;
  innowiFees: number;
}

export interface LeadData {
  restaurantName: string;
  city: string;
  email: string;
  calculatedSavings: number;
  timestamp: string;
}

export interface AppState {
  step: 'info' | 'calculator' | 'email';
  restaurantInfo: RestaurantInfo | null;
  calculatorInputs: CalculatorInputs;
  calculationResults: CalculationResults | null;
  leadData: LeadData | null;
}

export const SUGGESTED_VALUES = {
  totalGPV: 1200000, // $1.2M annual
  commissionPercent: 30,
  deliveryMix: 85,
  migrationPercent: 40
};

export const DEFAULT_INPUTS: CalculatorInputs = {
  totalGPV: null,
  commissionPercent: SUGGESTED_VALUES.commissionPercent,
  deliveryMix: SUGGESTED_VALUES.deliveryMix,
  migrationPercent: SUGGESTED_VALUES.migrationPercent,
  timeframe: 'monthly'
};