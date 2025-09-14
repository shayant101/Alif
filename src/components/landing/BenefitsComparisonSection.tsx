import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface BenefitsComparisonSectionProps {
  onGetStarted: () => void;
}

export const BenefitsComparisonSection: React.FC<BenefitsComparisonSectionProps> = ({ onGetStarted }) => {
  const comparisonData = [
    {
      category: 'Commission Fees',
      thirdParty: '15-30% per order',
      innowi: '0% commission',
      advantage: 'innowi'
    },
    {
      category: 'Processing Fees',
      thirdParty: '3-5% + $0.30',
      innowi: '2.9% + $0.30',
      advantage: 'innowi'
    },
    {
      category: 'Customer Data',
      thirdParty: 'Platform owns all data',
      innowi: 'You own 100% of data',
      advantage: 'innowi'
    },
    {
      category: 'Brand Control',
      thirdParty: 'Limited customization',
      innowi: 'Full brand control',
      advantage: 'innowi'
    },
    {
      category: 'Marketing Tools',
      thirdParty: 'Basic, platform-controlled',
      innowi: 'Advanced, you control',
      advantage: 'innowi'
    },
    {
      category: 'Customer Support',
      thirdParty: 'Shared with competitors',
      innowi: 'Dedicated support',
      advantage: 'innowi'
    },
    {
      category: 'Setup Time',
      thirdParty: '1-2 days',
      innowi: '2 weeks',
      advantage: 'thirdParty'
    },
    {
      category: 'Monthly Fee',
      thirdParty: '$0 (but high commissions)',
      innowi: 'Fixed monthly fee',
      advantage: 'neutral'
    }
  ];

  const keyBenefits = [
    {
      icon: '🎯',
      title: 'Direct Customer Relationships',
      description: 'Build lasting relationships with your customers instead of being just another restaurant on a platform.',
      details: [
        'Customer contact information',
        'Order history and preferences',
        'Direct communication channel',
        'Personalized marketing opportunities'
      ]
    },
    {
      icon: '💪',
      title: 'Complete Business Control',
      description: 'Make decisions about your menu, pricing, and promotions without platform restrictions.',
      details: [
        'Set your own delivery fees',
        'Create custom promotions',
        'Control menu availability',
        'Adjust pricing in real-time'
      ]
    },
    {
      icon: '📊',
      title: 'Better Analytics & Insights',
      description: 'Get detailed insights into your business performance and customer behavior.',
      details: [
        'Real-time sales analytics',
        'Customer behavior tracking',
        'Peak time analysis',
        'Menu performance metrics'
      ]
    }
  ];

  return (
    <section className="benefits-comparison-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Third-Party Platforms vs. Innowi: The Complete Comparison
          </h2>
          <p className="section-subtitle">
            See exactly how Innowi stacks up against traditional delivery platforms. 
            The differences go far beyond just commission fees.
          </p>
        </div>

        <div className="comparison-table-container">
          <Card variant="elevated" className="comparison-table-card">
            <div className="comparison-table">
              <div className="table-header">
                <div className="header-cell category-header">Feature</div>
                <div className="header-cell third-party-header">Third-Party Platforms</div>
                <div className="header-cell innowi-header">Innowi</div>
              </div>
              
              {comparisonData.map((row, index) => (
                <div key={index} className={`table-row ${row.advantage}`}>
                  <div className="cell category-cell">{row.category}</div>
                  <div className={`cell third-party-cell ${row.advantage === 'thirdParty' ? 'advantage' : ''}`}>
                    {row.thirdParty}
                    {row.advantage === 'thirdParty' && <span className="advantage-badge">✓</span>}
                  </div>
                  <div className={`cell innowi-cell ${row.advantage === 'innowi' ? 'advantage' : ''}`}>
                    {row.innowi}
                    {row.advantage === 'innowi' && <span className="advantage-badge">✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="key-benefits">
          <h3 className="benefits-title">Why These Differences Matter</h3>
          <div className="benefits-grid">
            {keyBenefits.map((benefit, index) => (
              <Card key={index} variant="glass" className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h4 className="benefit-title">{benefit.title}</h4>
                <p className="benefit-description">{benefit.description}</p>
                <ul className="benefit-details">
                  {benefit.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="benefit-detail">
                      <span className="detail-check">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        <div className="comparison-summary">
          <Card variant="glass" className="summary-card">
            <div className="summary-content">
              <h3 className="summary-title">The Bottom Line</h3>
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-icon">💰</span>
                  <div className="stat-content">
                    <span className="stat-title">Cost Savings</span>
                    <span className="stat-description">Save 15-30% on every order by eliminating commission fees</span>
                  </div>
                </div>
                <div className="summary-stat">
                  <span className="stat-icon">🎯</span>
                  <div className="stat-content">
                    <span className="stat-title">Customer Ownership</span>
                    <span className="stat-description">Build direct relationships instead of renting customers</span>
                  </div>
                </div>
                <div className="summary-stat">
                  <span className="stat-icon">📈</span>
                  <div className="stat-content">
                    <span className="stat-title">Business Growth</span>
                    <span className="stat-description">Reinvest savings into marketing and expansion</span>
                  </div>
                </div>
              </div>
              <div className="summary-cta">
                <p className="cta-text">
                  Ready to take control of your restaurant's future?
                </p>
                <Button size="lg" onClick={onGetStarted} className="cta-button">
                  Start Your Savings Calculation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};