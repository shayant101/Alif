import React, { useState } from 'react';
import type { RestaurantInfo, CalculationResults, LeadData } from '../types';
import { formatCurrency } from '../utils/calculations';

interface EmailCaptureFormProps {
  restaurantInfo: RestaurantInfo;
  calculationResults: CalculationResults;
  onSubmit: (leadData: LeadData) => void;
  onSkip: () => void;
}

export const EmailCaptureForm: React.FC<EmailCaptureFormProps> = ({
  restaurantInfo,
  calculationResults,
  onSubmit,
  onSkip
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const leadData: LeadData = {
        restaurantName: restaurantInfo.name,
        city: restaurantInfo.city,
        email: email.trim(),
        calculatedSavings: calculationResults.savingsAmount,
        timestamp: new Date().toISOString()
      };

      onSubmit(leadData);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="email-capture-overlay">
      <div className="email-capture-modal">
        <div className="modal-content">
          <h3>Get Your Detailed Savings Report</h3>
          
          <div className="savings-summary">
            <div className="summary-highlight">
              <span className="savings-amount">
                {formatCurrency(calculationResults.savingsAmount)}
              </span>
              <span className="savings-label">Annual Potential Savings</span>
            </div>
          </div>

          <div className="value-proposition">
            <h4>What you'll receive:</h4>
            <ul>
              <li>✓ Detailed breakdown of your potential savings</li>
              <li>✓ Custom implementation timeline for {restaurantInfo.name}</li>
              <li>✓ Free consultation with our restaurant technology experts</li>
              <li>✓ Case studies from similar restaurants in {restaurantInfo.city}</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="email-form">
            <div className="form-group">
              <label htmlFor="email-input">
                Email Address
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Enter your email address"
                className={error ? 'error' : ''}
                disabled={isSubmitting}
                aria-describedby={error ? 'email-error' : undefined}
              />
              {error && (
                <span id="email-error" className="error-message" role="alert">
                  {error}
                </span>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get My Savings Report'}
              </button>
              
              <button
                type="button"
                className="skip-button secondary"
                onClick={onSkip}
                disabled={isSubmitting}
              >
                Skip for now
              </button>
            </div>
          </form>

          <div className="privacy-notice">
            <p>
              We respect your privacy. Your information will only be used to provide 
              your savings report and connect you with our team. We never share your 
              data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};