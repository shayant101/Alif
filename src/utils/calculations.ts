import type { CalculatorInputs, CalculationResults, MonthlyProjection } from '../types';

const AVERAGE_ORDER_VALUE = 35;
const THIRD_PARTY_ORDER_FEE = 4.00;
const INNOWI_ORDER_FEE = 1.00;
const INNOWI_PROCESSING_FEE = 0.029; // 2.9%
const INNOWI_TRANSACTION_FEE = 0.30;

export function calculateSavings(inputs: CalculatorInputs): CalculationResults {
  const {
    totalGPV,
    commissionPercent,
    deliveryMix,
    migrationPercent,
    timeframe
  } = inputs;

  // Return zero results if any required input is missing
  if (totalGPV === null || commissionPercent === null || deliveryMix === null || migrationPercent === null) {
    return {
      thirdPartyCommissions: 0,
      innowiFees: 0,
      savingsAmount: 0,
      savingsPercent: 0,
      monthlyProjections: generateMonthlyProjections(0, 0, 0, timeframe)
    };
  }

  // Convert percentages to decimals
  const commissionRate = commissionPercent / 100;
  const deliveryRate = deliveryMix / 100;
  const migrationRate = migrationPercent / 100;

  // Calculate delivery GPV
  const deliveryGPV = totalGPV * deliveryRate;
  
  // Calculate number of orders (assuming $35 average order value)
  const totalOrders = deliveryGPV / AVERAGE_ORDER_VALUE;

  // Calculate migrated amounts
  const migratedGPV = deliveryGPV * migrationRate;
  const migratedOrders = totalOrders * migrationRate;

  // Calculate 3P Commissions (migrated)
  const thirdPartyCommissions = migrationRate * (deliveryGPV * commissionRate + totalOrders * THIRD_PARTY_ORDER_FEE);

  // Calculate Innowi Fees (migrated)
  const innowiFees = migrationRate * (
    migratedOrders * INNOWI_ORDER_FEE +
    migratedGPV * INNOWI_PROCESSING_FEE +
    migratedOrders * INNOWI_TRANSACTION_FEE
  );

  // Calculate savings
  const savingsAmount = thirdPartyCommissions - innowiFees;
  const savingsPercent = (savingsAmount / (migrationRate * totalGPV)) * 100;

  // Generate monthly projections
  const monthlyProjections = generateMonthlyProjections(
    thirdPartyCommissions,
    innowiFees,
    savingsAmount,
    timeframe
  );

  return {
    thirdPartyCommissions,
    innowiFees,
    savingsAmount,
    savingsPercent,
    monthlyProjections
  };
}

function generateMonthlyProjections(
  annualThirdPartyFees: number,
  annualInnowiFees: number,
  annualSavings: number,
  timeframe: 'annual' | 'monthly'
): MonthlyProjection[] {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const divisor = timeframe === 'annual' ? 12 : 1;
  const monthlyThirdParty = annualThirdPartyFees / divisor;
  const monthlyInnowi = annualInnowiFees / divisor;
  const monthlySavings = annualSavings / divisor;

  return months.map(month => ({
    month,
    savings: monthlySavings,
    thirdPartyFees: monthlyThirdParty,
    innowiFees: monthlyInnowi
  }));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercent(percent: number): string {
  return `${percent.toFixed(1)}%`;
}

// Session storage utilities
export function saveToSession(key: string, data: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to session storage:', error);
  }
}

export function loadFromSession<T>(key: string): T | null {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn('Failed to load from session storage:', error);
    return null;
  }
}

export function clearSession(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear session storage:', error);
  }
}