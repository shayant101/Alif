import React, { useState } from 'react';
import type { RestaurantInfo, CalculationResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ContactData {
  name: string;
  phone: string;
  email: string;
  restaurantName: string;
  city: string;
  calculatedSavings: number;
  timestamp: string;
}

interface ContactCaptureFormProps {
  restaurantInfo: RestaurantInfo;
  calculationResults: CalculationResults;
  onSubmit: (contactData: ContactData) => void;
  onClose: () => void;
}

export const ContactCaptureForm: React.FC<ContactCaptureFormProps> = ({
  restaurantInfo,
  calculationResults,
  onSubmit,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const contactData: ContactData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        restaurantName: restaurantInfo.name,
        city: restaurantInfo.city,
        calculatedSavings: calculationResults.savingsAmount,
        timestamp: new Date().toISOString()
      };

      onSubmit(contactData);
    } catch (err) {
      setIsSubmitting(false);
      // Handle error if needed
    }
  };

  return (
    <div className="contact-capture-overlay">
      <div className="contact-capture-modal">
        <div className="modal-content">
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          <div className="modal-header">
            <h3>🎉 Start Saving Today!</h3>
            <p>Get personalized guidance to implement your savings plan</p>
          </div>
          
          <div className="savings-highlight">
            <div className="savings-card">
              <div className="savings-amount">
                {formatCurrency(calculationResults.savingsAmount)}
              </div>
              <div className="savings-label">Annual Potential Savings</div>
              <div className="savings-percentage">
                {calculationResults.savingsPercent.toFixed(1)}% cost reduction
              </div>
            </div>
          </div>

          <div className="value-proposition">
            <h4>What happens next:</h4>
            <div className="benefits-grid">
              <div className="benefit-item">
                <span className="benefit-icon">📞</span>
                <span className="benefit-text">Free 15-minute consultation call</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📊</span>
                <span className="benefit-text">Custom implementation roadmap</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🚀</span>
                <span className="benefit-text">Start saving within 30 days</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <span className="benefit-text">No setup fees or hidden costs</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-phone">
                  Phone Number *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className={errors.phone ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-email">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@restaurant.com"
                  className={errors.email ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-button primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <span className="button-icon">🚀</span>
                    Start My Savings Journey
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span className="trust-text">Your information is secure and private</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span className="trust-text">No spam - we'll only contact you about your savings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};