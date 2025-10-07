import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface EligibilityModalProps {
  onSubmit: (data: { monthlySales: number; googleRating: number; yearsInBusiness: number }) => void;
  onClose: () => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({ onSubmit, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [monthlySales, setMonthlySales] = useState('');
  const [googleRating, setGoogleRating] = useState('');
  const [yearsInBusiness, setYearsInBusiness] = useState('');
  const [errors, setErrors] = useState<{ monthlySales?: string; googleRating?: string; yearsInBusiness?: string }>({});

  const formatCurrency = (value: string): string => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');

    if (!digitsOnly) return '';

    // Format with commas
    const number = parseInt(digitsOnly, 10);
    return number.toLocaleString('en-US');
  };

  const handleMonthlySalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setMonthlySales(formatted);
    if (errors.monthlySales) {
      setErrors({ ...errors, monthlySales: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { monthlySales?: string; googleRating?: string; yearsInBusiness?: string } = {};

    // Validate monthly sales
    const salesValue = parseInt(monthlySales.replace(/,/g, ''), 10);
    if (!monthlySales) {
      newErrors.monthlySales = 'Total monthly sales is required';
    } else if (isNaN(salesValue) || salesValue <= 0) {
      newErrors.monthlySales = 'Please enter a valid amount';
    }

    // Validate Google rating
    const ratingValue = parseFloat(googleRating);
    if (!googleRating) {
      newErrors.googleRating = 'Google review rating is required';
    } else if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      newErrors.googleRating = 'Rating must be between 0 and 5';
    }

    // Validate years in business
    const yearsValue = parseInt(yearsInBusiness, 10);
    if (!yearsInBusiness) {
      newErrors.yearsInBusiness = 'Years in business is required';
    } else if (isNaN(yearsValue) || yearsValue < 0) {
      newErrors.yearsInBusiness = 'Please enter a valid number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      monthlySales: salesValue,
      googleRating: ratingValue,
      yearsInBusiness: yearsValue
    });
  };

  const modalContent = (
    <div className="eligibility-modal-overlay" onClick={onClose}>
      <div className="eligibility-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="eligibility-modal-close" onClick={onClose}>×</button>

        <div className="eligibility-modal-header">
          <h3>Check Your Eligibility</h3>
          <p>Tell us about your restaurant to see if you qualify for add-ons</p>
        </div>

        <form onSubmit={handleSubmit} className="eligibility-modal-form">
          <div className="eligibility-form-group">
            <label htmlFor="monthlySales">Total Monthly Sales ($)</label>
            <input
              type="text"
              id="monthlySales"
              value={monthlySales}
              onChange={handleMonthlySalesChange}
              placeholder="e.g., 50,000"
              className={errors.monthlySales ? 'error' : ''}
            />
            {errors.monthlySales && <span className="eligibility-error-message">{errors.monthlySales}</span>}
          </div>

          <div className="eligibility-form-group">
            <label htmlFor="googleRating">Google Review Rating (0-5)</label>
            <input
              type="number"
              id="googleRating"
              value={googleRating}
              onChange={(e) => {
                setGoogleRating(e.target.value);
                if (errors.googleRating) {
                  setErrors({ ...errors, googleRating: undefined });
                }
              }}
              placeholder="e.g., 4.5"
              step="0.1"
              min="0"
              max="5"
              className={errors.googleRating ? 'error' : ''}
            />
            {errors.googleRating && <span className="eligibility-error-message">{errors.googleRating}</span>}
          </div>

          <div className="eligibility-form-group">
            <label htmlFor="yearsInBusiness">Years in Business</label>
            <input
              type="number"
              id="yearsInBusiness"
              value={yearsInBusiness}
              onChange={(e) => {
                setYearsInBusiness(e.target.value);
                if (errors.yearsInBusiness) {
                  setErrors({ ...errors, yearsInBusiness: undefined });
                }
              }}
              placeholder="e.g., 5"
              min="0"
              className={errors.yearsInBusiness ? 'error' : ''}
            />
            {errors.yearsInBusiness && <span className="eligibility-error-message">{errors.yearsInBusiness}</span>}
          </div>

          <button type="submit" className="eligibility-submit-btn">
            Check Eligibility
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
