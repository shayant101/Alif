import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FinancialImpactCards } from '../FinancialImpactCards';
import type { CalculationResults } from '../../types';

interface FinancialImpactSectionProps {
  sampleResults?: CalculationResults;
  onCalculate: () => void;
}

// Sample calculation results for demonstration
const defaultSampleResults: CalculationResults = {
  thirdPartyCommissions: 48000,
  innowiFees: 14400,
  savingsAmount: 33600,
  savingsPercent: 21.0,
  monthlyProjections: []
};

export const FinancialImpactSection: React.FC<FinancialImpactSectionProps> = ({
  sampleResults = defaultSampleResults,
  onCalculate
}) => {
  const impactPoints = [
    {
      icon: '💰',
      title: 'Immediate Cost Reduction',
      description: 'Eliminate 15-30% commission fees on every order from day one.',
      example: 'Save $2,800+ per month on a $10K monthly delivery volume'
    },
    {
      icon: '📈',
      title: 'Revenue Growth',
      description: 'Keep more of every dollar to reinvest in your business growth.',
      example: 'Reinvest savings into marketing, staff, or expansion'
    },
    {
      icon: '🎯',
      title: 'Predictable Costs',
      description: 'Fixed monthly fee instead of variable commissions that eat into profits.',
      example: 'Know exactly what you\'ll pay each month, regardless of volume'
    },
    {
      icon: '🔄',
      title: 'Compounding Benefits',
      description: 'Savings grow as your business grows, creating a positive feedback loop.',
      example: 'More savings → More marketing → More customers → More savings'
    }
  ];

  return (
    <section className="financial-impact-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            The Financial Impact of Switching to Innowi
          </h2>
          <p className="section-subtitle">
            See the real numbers behind why restaurants are making the switch. 
            These aren't just savings—they're investments in your restaurant's future.
          </p>
        </div>

        <div className="sample-calculation">
          <Card variant="glass" className="calculation-showcase">
            <div className="showcase-header">
              <h3 className="showcase-title">Sample Restaurant Savings</h3>
              <p className="showcase-subtitle">
                Based on a restaurant with $160K annual delivery volume
              </p>
            </div>
            
            <FinancialImpactCards 
              results={sampleResults} 
              timeframe="annual" 
            />
            
            <div className="showcase-cta">
              <p className="showcase-note">
                <strong>This is just an example.</strong> Your actual savings will depend on your specific 
                delivery volume, current commission rates, and migration percentage.
              </p>
              <Button size="lg" onClick={onCalculate} className="calculate-button">
                Calculate My Exact Savings
              </Button>
            </div>
          </Card>
        </div>

        <div className="impact-points">
          <h3 className="impact-points-title">Why These Savings Matter</h3>
          <div className="impact-grid">
            {impactPoints.map((point, index) => (
              <Card key={index} variant="elevated" className="impact-point-card">
                <div className="impact-icon">{point.icon}</div>
                <h4 className="impact-title">{point.title}</h4>
                <p className="impact-description">{point.description}</p>
                <div className="impact-example">
                  <span className="example-label">Example:</span>
                  <span className="example-text">{point.example}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="roi-breakdown">
          <Card variant="glass" className="roi-card">
            <div className="roi-content">
              <h3 className="roi-title">Return on Investment</h3>
              <div className="roi-timeline">
                <div className="roi-period">
                  <span className="period-label">Month 1</span>
                  <span className="period-value">Break even</span>
                  <span className="period-description">Setup costs recovered</span>
                </div>
                <div className="roi-period">
                  <span className="period-label">Month 2-12</span>
                  <span className="period-value">Pure savings</span>
                  <span className="period-description">Every dollar saved goes to your bottom line</span>
                </div>
                <div className="roi-period">
                  <span className="period-label">Year 2+</span>
                  <span className="period-value">Compound growth</span>
                  <span className="period-description">Reinvest savings for exponential returns</span>
                </div>
              </div>
              <p className="roi-conclusion">
                <strong>The average restaurant sees a 300%+ ROI in the first year</strong> by switching 
                from third-party platforms to Innowi's first-party ordering system.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};