import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Stop Paying <span className="highlight">30% Commissions</span>
              <br />
              Build Your Own Brand Instead
            </h1>
            
            <p className="hero-subtitle">
              Restaurant owners are losing thousands every month to third-party delivery platforms. 
              Innowi helps you reclaim your profits and build direct relationships with your customers.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">30%</span>
                <span className="stat-label">Average commission saved</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$50K+</span>
                <span className="stat-label">Annual savings potential</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Restaurants switched</span>
              </div>
            </div>
            
            <div className="hero-cta">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="cta-button"
              >
                Calculate My Savings
              </Button>
              <p className="cta-subtext">
                Free calculation • No commitment • See results in 2 minutes
              </p>
            </div>
          </div>
          
          <div className="hero-visual">
            <Card variant="glass" className="demo-card">
              <div className="demo-content">
                <h3>Your Restaurant Dashboard</h3>
                <div className="demo-metrics">
                  <div className="metric">
                    <span className="metric-label">Monthly Orders</span>
                    <span className="metric-value">1,247</span>
                    <span className="metric-trend positive">+23%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Commission Saved</span>
                    <span className="metric-value">$4,890</span>
                    <span className="metric-trend positive">vs 3rd party</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Customer Retention</span>
                    <span className="metric-value">87%</span>
                    <span className="metric-trend positive">+15%</span>
                  </div>
                </div>
                <div className="demo-chart">
                  <div className="chart-bars">
                    <div className="bar" style={{ height: '60%' }}></div>
                    <div className="bar" style={{ height: '75%' }}></div>
                    <div className="bar" style={{ height: '90%' }}></div>
                    <div className="bar" style={{ height: '85%' }}></div>
                    <div className="bar" style={{ height: '100%' }}></div>
                  </div>
                  <p className="chart-label">Revenue Growth</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="hero-trust-indicators">
          <p className="trust-text">Trusted by restaurants nationwide</p>
          <div className="trust-logos">
            <div className="logo-placeholder">Charminar Restaurant</div>
            <div className="logo-placeholder">Omega Burgers</div>
            <div className="logo-placeholder">Cream and Sugar</div>
            <div className="logo-placeholder">Nizarios Pizza and Grill</div>
          </div>
        </div>
      </div>
    </section>
  );
};