import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { SavingsCalculator } from '../SavingsCalculator';
import { SavingsChart } from '../SavingsChart';
import type { RestaurantInfo, CalculationResults } from '../../types';

interface CalculatorIntegrationSectionProps {
  restaurantInfo?: RestaurantInfo;
  onProceedToEmail: () => void;
}

export const CalculatorIntegrationSection: React.FC<CalculatorIntegrationSectionProps> = ({
  restaurantInfo,
  onProceedToEmail
}) => {
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null);
  const [showChart, setShowChart] = useState(false);

  const handleShowEmailForm = (results: CalculationResults) => {
    setCalculationResults(results);
    setShowChart(true);
    onProceedToEmail();
  };

  // Provide default restaurant info if none is provided
  const defaultRestaurantInfo: RestaurantInfo = restaurantInfo || {
    name: '',
    city: ''
  };

  return (
    <section className="calculator-integration-section">
      <div className="section-container">
        <div className="calculator-container">
          <Card variant="elevated" className="calculator-card">
            <SavingsCalculator
              restaurantInfo={defaultRestaurantInfo}
              onShowEmailForm={handleShowEmailForm}
            />
          </Card>

          {calculationResults && showChart && (
            <div className="results-visualization">
              <Card variant="glass" className="chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">Your Savings Visualization</h3>
                  <p className="chart-subtitle">
                    See how your savings add up over time
                  </p>
                </div>
                
                <SavingsChart
                  projections={calculationResults.monthlyProjections}
                />
              </Card>
            </div>
          )}
        </div>

        <div className="addon-solutions">
          <h3 className="addon-title">See if you qualify for any of these add-ons</h3>
          <div className="addon-grid">
            <div className="addon-item">
              <h4 className="addon-name">POS</h4>
              <p className="addon-description">
                Complete point-of-sale system with integrated payment processing
              </p>
            </div>
            <div className="addon-item">
              <h4 className="addon-name">Kiosk</h4>
              <p className="addon-description">
                Self-service ordering kiosks to reduce wait times and increase efficiency
              </p>
            </div>
            <div className="addon-item">
              <h4 className="addon-name">Photoshoot</h4>
              <p className="addon-description">
                Professional food photography to showcase your menu items
              </p>
            </div>
            <div className="addon-item">
              <h4 className="addon-name">Digital TV Menus</h4>
              <p className="addon-description">
                Dynamic digital menu displays that update in real-time
              </p>
            </div>
          </div>
          <div className="addon-cta">
            <button className="check-eligibility-btn">
              Check Eligibility
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};