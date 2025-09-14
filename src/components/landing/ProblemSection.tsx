import React from 'react';
import { Card } from '../ui/Card';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: '💸',
      title: 'High Commission Fees',
      description: 'Third-party platforms charge 15-30% commission on every order, eating into your already thin margins.',
      impact: 'Up to $50K+ lost annually'
    },
    {
      icon: '👥',
      title: 'No Customer Relationship',
      description: 'You never own the customer data. Platforms control your customer relationships and can change terms anytime.',
      impact: 'Zero customer loyalty'
    },
    {
      icon: '📱',
      title: 'Brand Dilution',
      description: 'Your restaurant becomes just another listing among hundreds. No brand differentiation or customer connection.',
      impact: 'Commoditized business'
    },
    {
      icon: '📊',
      title: 'Limited Control',
      description: 'Platform algorithms decide your visibility. Menu changes, pricing, and promotions are restricted.',
      impact: 'Reduced operational flexibility'
    }
  ];

  return (
    <section className="problem-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            The Hidden Cost of Third-Party Platforms
          </h2>
          <p className="section-subtitle">
            While delivery platforms promise more customers, they're quietly draining your profits 
            and preventing you from building a sustainable restaurant business.
          </p>
        </div>

        <div className="problems-grid">
          {problems.map((problem, index) => (
            <Card key={index} variant="elevated" className="problem-card">
              <div className="problem-icon">{problem.icon}</div>
              <h3 className="problem-title">{problem.title}</h3>
              <p className="problem-description">{problem.description}</p>
              <div className="problem-impact">
                <span className="impact-label">Impact:</span>
                <span className="impact-value">{problem.impact}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="problem-summary">
          <Card variant="glass" className="summary-card">
            <div className="summary-content">
              <h3 className="summary-title">The Real Numbers</h3>
              <div className="summary-stats">
                <div className="summary-stat">
                  <span className="stat-number">73%</span>
                  <span className="stat-description">of restaurants report delivery platforms hurt profitability</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number">$42K</span>
                  <span className="stat-description">average annual commission paid to third-party platforms</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number">0%</span>
                  <span className="stat-description">customer data ownership on third-party platforms</span>
                </div>
              </div>
              <p className="summary-conclusion">
                <strong>The bottom line:</strong> Third-party platforms are designed to extract maximum value 
                from your business while giving you minimal control over your own customers and brand.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};