import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface FinalCTASectionProps {
  onGetStarted: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onGetStarted }) => {
  const urgencyFactors = [
    {
      icon: "📈",
      title: "Every Month You Wait Costs You Money",
      description: "The average restaurant loses $3,200+ monthly to unnecessary commission fees"
    },
    {
      icon: "🎯",
      title: "Your Competitors Are Already Switching",
      description: "Don't let them gain the competitive advantage of direct customer relationships"
    },
    {
      icon: "⏰",
      title: "Limited-Time Migration Support",
      description: "Get free setup and migration assistance - this offer won't last forever"
    }
  ];

  const guarantees = [
    "30-day money-back guarantee",
    "Free migration from existing platforms",
    "Dedicated onboarding specialist",
    "24/7 technical support",
    "No long-term contracts required"
  ];

  return (
    <section className="final-cta-section">
      <div className="section-container">
        {/* Urgency Section */}
        <div className="urgency-section">
          <div className="section-header">
            <h2 className="section-title">
              Don't Let Another Month of Profits Slip Away
            </h2>
            <p className="section-subtitle">
              Every day you stay on third-party platforms is another day of lost revenue, 
              missed customer connections, and weakened brand control.
            </p>
          </div>

          <div className="urgency-grid">
            {urgencyFactors.map((factor, index) => (
              <Card key={index} variant="elevated" className="urgency-card">
                <div className="urgency-icon">{factor.icon}</div>
                <h3 className="urgency-title">{factor.title}</h3>
                <p className="urgency-description">{factor.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="main-cta">
          <Card variant="glass" className="cta-hero-card">
            <div className="cta-hero-content">
              <div className="cta-hero-text">
                <h2 className="cta-hero-title">
                  Take Control of Your Restaurant's Future Today
                </h2>
                <p className="cta-hero-subtitle">
                  Join the growing movement of restaurant owners who've stopped paying 
                  commissions and started building their own brands. Calculate your potential 
                  savings and see exactly how much you could be keeping in your pocket.
                </p>
                
                <div className="value-props">
                  <div className="value-prop">
                    <span className="value-icon">💰</span>
                    <span className="value-text">Save $20K-$60K+ annually</span>
                  </div>
                  <div className="value-prop">
                    <span className="value-icon">📊</span>
                    <span className="value-text">Own 100% of your customer data</span>
                  </div>
                  <div className="value-prop">
                    <span className="value-icon">🎨</span>
                    <span className="value-text">Complete brand control</span>
                  </div>
                  <div className="value-prop">
                    <span className="value-icon">📱</span>
                    <span className="value-text">Professional mobile app</span>
                  </div>
                </div>
              </div>

              <div className="cta-hero-action">
                <div className="cta-highlight">
                  <span className="highlight-badge">Free Calculator</span>
                  <h3 className="highlight-title">See Your Potential Savings</h3>
                  <p className="highlight-description">
                    Get a personalized report showing exactly how much you could save 
                    by switching to Innowi. Takes less than 2 minutes.
                  </p>
                </div>
                
                <Button size="lg" onClick={onGetStarted} className="primary-cta-button">
                  Calculate My Savings Now
                  <span className="button-arrow">→</span>
                </Button>
                
                <p className="cta-disclaimer">
                  No credit card required • Instant results • 100% free
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Guarantees Section */}
        <div className="guarantees-section">
          <Card variant="elevated" className="guarantees-card">
            <div className="guarantees-header">
              <h3 className="guarantees-title">Our Promise to You</h3>
              <p className="guarantees-subtitle">
                We're so confident in Innowi's value that we back it with industry-leading guarantees.
              </p>
            </div>
            
            <div className="guarantees-grid">
              {guarantees.map((guarantee, index) => (
                <div key={index} className="guarantee-item">
                  <span className="guarantee-check">✓</span>
                  <span className="guarantee-text">{guarantee}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Social Proof Footer */}
        <div className="social-proof-footer">
          <div className="social-proof-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Restaurants Switched</span>
            </div>
            <div className="stat-divider">•</div>
            <div className="stat-item">
              <span className="stat-number">$12M+</span>
              <span className="stat-label">Saved in Commissions</span>
            </div>
            <div className="stat-divider">•</div>
            <div className="stat-item">
              <span className="stat-number">4.9/5</span>
              <span className="stat-label">Customer Rating</span>
            </div>
          </div>
          
          <div className="testimonial-snippet">
            <blockquote className="snippet-quote">
              "The best business decision I've made in years. I wish I had switched sooner."
            </blockquote>
            <cite className="snippet-author">— Sarah Chen, Golden Dragon Restaurant</cite>
          </div>
        </div>

        {/* Final Urgency Push */}
        <div className="final-urgency">
          <Card variant="glass" className="urgency-banner">
            <div className="urgency-content">
              <div className="urgency-text">
                <h4 className="urgency-banner-title">
                  Every Day You Wait, You're Losing Money to Commissions
                </h4>
                <p className="urgency-banner-subtitle">
                  The average restaurant using our calculator discovers they're losing 
                  $106 per day to unnecessary fees. How much are you losing?
                </p>
              </div>
              <Button size="lg" variant="outline" onClick={onGetStarted} className="urgency-cta">
                Find Out Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};