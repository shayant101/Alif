import React, { useState } from 'react';
import type { RestaurantInfo } from '../types';

interface RestaurantInfoFormProps {
  onSubmit: (info: RestaurantInfo) => void;
}

export const RestaurantInfoForm: React.FC<RestaurantInfoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<RestaurantInfo>({
    name: '',
    city: ''
  });
  const [errors, setErrors] = useState<Partial<RestaurantInfo>>({});

  const handleInputChange = (field: keyof RestaurantInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RestaurantInfo> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Restaurant name is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        city: formData.city.trim()
      });
    }
  };

  return (
    <div className="restaurant-info-form">
      <div className="form-header">
        <h1>Innowi Savings Calculator</h1>
        <p>Discover how much your restaurant can save by switching from third-party delivery platforms to Innowi's first-party ordering system.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="info-form">
        <div className="form-group">
          <label htmlFor="restaurant-name">
            Restaurant Name *
          </label>
          <input
            id="restaurant-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your restaurant name"
            className={errors.name ? 'error' : ''}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="restaurant-city">
            City *
          </label>
          <input
            id="restaurant-city"
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Enter your city"
            className={errors.city ? 'error' : ''}
            aria-describedby={errors.city ? 'city-error' : undefined}
          />
          {errors.city && (
            <span id="city-error" className="error-message" role="alert">
              {errors.city}
            </span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Calculate My Savings
        </button>
      </form>
    </div>
  );
};