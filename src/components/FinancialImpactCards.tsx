import React from 'react';
import type { CalculationResults } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';

interface FinancialImpactCardsProps {
  results: CalculationResults;
  timeframe: 'annual' | 'monthly';
}

export const FinancialImpactCards: React.FC<FinancialImpactCardsProps> = ({
  results,
  timeframe
}) => {
  const timeframeLabel = timeframe === 'annual' ? 'Annual' : 'Monthly';

  const cards = [
    {
      id: 'third-party-commissions',
      title: '3P Commissions',
      subtitle: '(migrated)',
      value: formatCurrency(results.thirdPartyCommissions),
      description: `${timeframeLabel} fees paid to third-party platforms`,
      type: 'expense' as const
    },
    {
      id: 'innowi-fees',
      title: 'Innowi Fees',
      subtitle: '(migrated)',
      value: formatCurrency(results.innowiFees),
      description: `${timeframeLabel} fees with Innowi's platform`,
      type: 'expense' as const
    },
    {
      id: 'savings-amount',
      title: 'Savings Amount',
      subtitle: '',
      value: formatCurrency(results.savingsAmount),
      description: `${timeframeLabel} cost savings`,
      type: 'savings' as const
    },
    {
      id: 'savings-percent',
      title: 'Savings Percentage',
      subtitle: 'of GPV',
      value: formatPercent(results.savingsPercent),
      description: `Percentage of total revenue saved`,
      type: 'savings' as const
    }
  ];

  return (
    <div className="financial-impact-cards">
      <h3>Financial Impact Summary</h3>
      <div className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`impact-card ${card.type}`}
            role="region"
            aria-labelledby={`${card.id}-title`}
          >
            <div className="card-header">
              <h4 id={`${card.id}-title`} className="card-title">
                {card.title}
                {card.subtitle && (
                  <span className="card-subtitle">{card.subtitle}</span>
                )}
              </h4>
            </div>
            <div className="card-value" aria-label={`${card.title}: ${card.value}`}>
              {card.value}
            </div>
            <div className="card-description">
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};