import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface SolutionSectionProps {
  onLearnMore: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onLearnMore }) => {
  const features = [
    {
      icon: '🏪',
      title: 'Your Own Branded App & Website',
      description: 'Custom-designed ordering platform that reflects your restaurant\'s unique brand and personality.',
      benefits: ['100% brand control', 'Custom design', 'Your domain name']
    },
    {
      icon: '💳',
      title: 'Direct Payment Processing',
      description: 'Payments go directly to your account with industry-low processing fees (2.9% + $0.30).',
      benefits: ['No commission fees', 'Instant deposits', 'Lower processing costs']
    },
    {
      icon: '📊',
      title: 'Complete Customer Data Ownership',
      description: 'Build your own customer database with detailed analytics and marketing capabilities.',
      benefits: ['Customer profiles', 'Order history', 'Marketing automation']
    },
    {
      icon: '🚀',
      title: 'Marketing & Loyalty Tools',
      description: 'Built-in tools to drive repeat business and increase customer lifetime value.',
      benefits: ['Loyalty programs', 'Email marketing', 'Push notifications']
    }
  ];

  return (
    <section className="solution-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Innowi: Your Complete First-Party Ordering Solution
          </h2>
          <p className="section-subtitle">
            Stop paying commissions and start building your own direct-to-customer ordering platform. 
            Keep 100% of your profits while strengthening customer relationships.
          </p>
        </div>

        <div className="solution-overview">
          <Card variant="glass" className="overview-card">
            <div className="overview-content">
              <h3 className="overview-title">How Innowi Works</h3>
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Setup Your Platform</h4>
                    <p>We create your custom-branded ordering website and mobile app in just 2 weeks.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Migrate Your Customers</h4>
                    <p>Our proven migration strategy helps you transition customers from third-party platforms.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Grow Your Business</h4>
                    <p>Use our marketing tools and analytics to increase orders and customer loyalty.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <Card key={index} variant="elevated" className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-benefits">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="benefit-item">
                    <span className="benefit-check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="solution-cta">
          <Card variant="glass" className="cta-card">
            <div className="cta-content">
              <h3 className="cta-title">Ready to Take Control of Your Orders?</h3>
              <p className="cta-description">
                Join hundreds of restaurants that have already made the switch and are saving thousands every month.
              </p>
              <div className="cta-stats">
                <div className="cta-stat">
                  <span className="stat-number">2 weeks</span>
                  <span className="stat-label">Average setup time</span>
                </div>
                <div className="cta-stat">
                  <span className="stat-number">$0</span>
                  <span className="stat-label">Setup fees</span>
                </div>
                <div className="cta-stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support included</span>
                </div>
              </div>
              <Button size="lg" onClick={onLearnMore} className="cta-button">
                See How Much You Can Save
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};