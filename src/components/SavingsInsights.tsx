import React, { useState } from 'react';
import type { RestaurantInfo, CalculationResults } from '../types';
import { EmailCaptureForm } from './EmailCaptureForm';

interface SavingsInsightsProps {
  restaurantInfo: RestaurantInfo;
  calculationResults: CalculationResults;
}

export const SavingsInsights: React.FC<SavingsInsightsProps> = ({
  restaurantInfo,
  calculationResults
}) => {
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const handleEmailSubmit = (leadData: any) => {
    // Handle email submission logic here
    console.log('Marketing plan requested:', leadData);
    setShowEmailCapture(false);
    // You can add actual email submission logic here
  };

  const handleEmailSkip = () => {
    setShowEmailCapture(false);
  };

  return (
    <>
      {/* Left Column - Maximize Your Savings */}
      <div className="chart-insights-column">
        <div className="recommendations-section">
          <h4>We Partner To Grow Your Restaurant</h4>
          <div className="recommendation-list">
            <div className="recommendation-item">
              <div className="rec-content">
                <h5>Optimize Order Volume</h5>
                <p>Focus on direct orders during peak hours to maximize commission savings</p>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="rec-content">
                <h5>Customer Retention</h5>
                <p>Build loyalty programs to reduce dependency on third-party platforms</p>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="rec-content">
                <h5>Digital Marketing</h5>
                <p>Leverage social media and email campaigns to drive direct orders</p>
              </div>
            </div>
            <div className="recommendation-item">
              <div className="rec-content">
                <h5>Targeted Promotions</h5>
                <p>Create customized campaigns to drive traffic during slow hours and off-peak times</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      {showEmailCapture && (
        <EmailCaptureForm
          restaurantInfo={restaurantInfo}
          calculationResults={calculationResults}
          onSubmit={handleEmailSubmit}
          onSkip={handleEmailSkip}
        />
      )}
    </>
  );
};