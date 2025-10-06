import React, { useState, useEffect, useMemo } from 'react';
import type { RestaurantInfo, CalculatorInputs, CalculationResults } from '../types';
import { DEFAULT_INPUTS, SUGGESTED_VALUES } from '../types';
import { calculateSavings, saveToSession } from '../utils/calculations';
import { FinancialImpactCards } from './FinancialImpactCards';
import { SavingsChart } from './SavingsChart';
import { SavingsInsights } from './SavingsInsights';

interface SavingsCalculatorProps {
  restaurantInfo: RestaurantInfo;
  onShowEmailForm: (results: CalculationResults) => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  restaurantInfo,
  onShowEmailForm
}) => {
  // Load timeframe preference from localStorage, default to monthly
  const getInitialTimeframe = (): 'monthly' | 'annual' => {
    try {
      const saved = localStorage.getItem('innowi-timeframe-preference');
      return saved === 'annual' ? 'annual' : 'monthly';
    } catch {
      return 'monthly';
    }
  };

  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_INPUTS,
    timeframe: getInitialTimeframe()
  });
  const [hasViewedResults, setHasViewedResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [inputErrors, setInputErrors] = useState<Partial<Record<keyof CalculatorInputs, string>>>({});
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Restaurant info state
  const [restaurantName, setRestaurantName] = useState(restaurantInfo?.name || '');
  const [restaurantCity, setRestaurantCity] = useState(restaurantInfo?.city || '');

  // Calculate results with memoization for performance
  const results = useMemo(() => {
    return calculateSavings(inputs);
  }, [inputs]);

  // Save to session storage whenever inputs change
  useEffect(() => {
    saveToSession('calculatorInputs', inputs);
  }, [inputs]);

  // Check if all inputs are filled
  const allInputsFilled = inputs.totalGPV !== null &&
                          inputs.commissionPercent !== null &&
                          inputs.deliveryMix !== null &&
                          inputs.migrationPercent !== null;

  // Handle calculate button click
  const handleCalculate = async () => {
    if (allInputsFilled) {
      setIsCalculating(true);
      // Simulate calculation time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowResults(true);
      setIsCalculating(false);
    }
  };

  // Track when user has viewed results to show email form
  useEffect(() => {
    if (!hasViewedResults && showResults && allInputsFilled && results.savingsAmount > 0) {
      setHasViewedResults(true);
      // Show email form after a short delay to let user see results
      const timer = setTimeout(() => {
        onShowEmailForm(results);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [results, hasViewedResults, onShowEmailForm, allInputsFilled, showResults]);

  // Reset hasViewedResults and showResults when timeframe changes to allow email form to trigger again
  useEffect(() => {
    setHasViewedResults(false);
    setShowResults(false);
  }, [inputs.timeframe]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number | string | null) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Save timeframe preference to localStorage
    if (field === 'timeframe' && typeof value === 'string') {
      try {
        localStorage.setItem('innowi-timeframe-preference', value);
      } catch {
        // Ignore localStorage errors
      }
    }
    
    // Clear error when user starts typing
    if (inputErrors[field]) {
      setInputErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
    
    // Validate input
    if (typeof value === 'number') {
      const error = validateInput(field, value);
      if (error) {
        setInputErrors(prev => ({
          ...prev,
          [field]: error
        }));
      }
    }
  };

  // Validation for inputs
  const validateInput = (field: keyof CalculatorInputs, value: number | null): string | null => {
    if (value === null) return null;
    
    switch (field) {
      case 'totalGPV':
        if (value < 1000) return 'GPV should be at least $1,000';
        if (value > 50000000) return 'GPV seems unusually high';
        break;
      case 'commissionPercent':
        if (value < 0 || value > 40) return 'Commission rate should be between 0% and 40%';
        break;
      case 'deliveryMix':
        if (value < 0 || value > 100) return 'Delivery mix should be between 0% and 100%';
        break;
      case 'migrationPercent':
        if (value < 0 || value > 100) return 'Migration percentage should be between 0% and 100%';
        break;
    }
    return null;
  };

  const formatInputValue = (value: number | null): string => {
    if (value === null) return '';
    return new Intl.NumberFormat('en-US').format(value);
  };

  const parseInputValue = (value: string): number | null => {
    const parsed = parseInt(value.replace(/,/g, ''), 10);
    return isNaN(parsed) || parsed === 0 ? null : parsed;
  };

  // Tooltip content
  const tooltips = {
    totalGPV: "Your restaurant's total payment volume from all sources (dine-in, takeout, delivery)",
    commissionPercent: "The percentage fee charged by third-party delivery platforms like DoorDash, Uber Eats",
    deliveryMix: "What percentage of your online orders are delivery? Pickup is the remainder.",
    migrationPercent: "How much of your delivery business you plan to move to your own platform"
  };

  return (
    <div className="savings-calculator">
      <div className="calculator-header">
        <h2>Savings Calculator for Your Restaurant</h2>
        
        {/* Restaurant Info Inputs */}
        <div className="restaurant-info-inputs">
          <div className="info-input-group">
            <label htmlFor="restaurant-name-calc">Restaurant Name</label>
            <input
              id="restaurant-name-calc"
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="Enter your restaurant name"
              className="restaurant-info-input"
            />
          </div>
          <div className="info-input-group">
            <label htmlFor="restaurant-city-calc">City</label>
            <input
              id="restaurant-city-calc"
              type="text"
              value={restaurantCity}
              onChange={(e) => setRestaurantCity(e.target.value)}
              placeholder="Enter your city"
              className="restaurant-info-input"
            />
          </div>
        </div>
      </div>

      <div className="calculator-content">
        <div className="input-controls">
          <h3>Adjust Your Restaurant's Details</h3>
          
          {/* Total GPV Input with Timeframe Toggle */}
          <div className="input-group">
            <div className="gpv-header">
              <label htmlFor="total-gpv">
                Total Online Sales (Pickup & Delivery)
                <span
                  className="tooltip-trigger"
                  onMouseEnter={() => setShowTooltip('totalGPV')}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  ?
                </span>
              </label>
              
              {/* Timeframe Toggle - Adjacent to GPV Input */}
              <div className="timeframe-toggle-container">
                <span className="toggle-label">Timeframe:</span>
                <div className="toggle-group compact">
                  <button
                    type="button"
                    className={`toggle-button ${inputs.timeframe === 'monthly' ? 'active' : ''}`}
                    onClick={() => handleInputChange('timeframe', 'monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className={`toggle-button ${inputs.timeframe === 'annual' ? 'active' : ''}`}
                    onClick={() => handleInputChange('timeframe', 'annual')}
                  >
                    Annual
                  </button>
                </div>
              </div>
            </div>
            
            {showTooltip === 'totalGPV' && (
              <div className="tooltip">{tooltips.totalGPV}</div>
            )}
            
            <div className="input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                id="total-gpv"
                type="text"
                value={formatInputValue(inputs.totalGPV)}
                onChange={(e) => handleInputChange('totalGPV', parseInputValue(e.target.value))}
                placeholder={`e.g., ${new Intl.NumberFormat('en-US').format(inputs.timeframe === 'monthly' ? 20000 : SUGGESTED_VALUES.totalGPV)}${inputs.timeframe === 'monthly' ? '/month' : '/year'}`}
                className={`gpv-input ${inputErrors.totalGPV ? 'error' : ''}`}
              />
            </div>
            
            {inputErrors.totalGPV && (
              <span className="error-message">{inputErrors.totalGPV}</span>
            )}
          </div>

          {/* Commission Percentage Slider */}
          <div className="input-group">
            <label htmlFor="commission-percent">
              Current 3rd Party Commission Rate: {inputs.commissionPercent !== null ? `${inputs.commissionPercent}%` : `Select rate (suggested: ${SUGGESTED_VALUES.commissionPercent}%)`}
              <span
                className="tooltip-trigger"
                onMouseEnter={() => setShowTooltip('commissionPercent')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                ?
              </span>
            </label>
            {showTooltip === 'commissionPercent' && (
              <div className="tooltip">{tooltips.commissionPercent}</div>
            )}
            <input
              id="commission-percent"
              type="range"
              min="0"
              max="40"
              step="1"
              value={inputs.commissionPercent ?? SUGGESTED_VALUES.commissionPercent}
              onChange={(e) => handleInputChange('commissionPercent', parseFloat(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>0%</span>
              <span>40%</span>
            </div>
            {inputErrors.commissionPercent && (
              <span className="error-message">{inputErrors.commissionPercent}</span>
            )}
          </div>

          {/* Delivery Mix Slider */}
          <div className="input-group">
            <label htmlFor="delivery-mix">
              What % of your online orders are delivery?: {inputs.deliveryMix !== null ? `${inputs.deliveryMix}%` : `Select percentage (suggested: ${SUGGESTED_VALUES.deliveryMix}%)`}
              <span
                className="tooltip-trigger"
                onMouseEnter={() => setShowTooltip('deliveryMix')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                ?
              </span>
            </label>
            {showTooltip === 'deliveryMix' && (
              <div className="tooltip">{tooltips.deliveryMix}</div>
            )}
            <input
              id="delivery-mix"
              type="range"
              min="0"
              max="100"
              step="1"
              value={inputs.deliveryMix ?? SUGGESTED_VALUES.deliveryMix}
              onChange={(e) => handleInputChange('deliveryMix', parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>0%</span>
              <span>100%</span>
            </div>
            {inputErrors.deliveryMix && (
              <span className="error-message">{inputErrors.deliveryMix}</span>
            )}
          </div>

          {/* Migration Percentage Slider */}
          <div className="input-group">
            <label htmlFor="migration-percent">
              Migration to Innowi (%): {inputs.migrationPercent !== null ? `${inputs.migrationPercent}%` : `Select percentage (suggested: ${SUGGESTED_VALUES.migrationPercent}%)`}
              <span
                className="tooltip-trigger"
                onMouseEnter={() => setShowTooltip('migrationPercent')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                ?
              </span>
            </label>
            {showTooltip === 'migrationPercent' && (
              <div className="tooltip">{tooltips.migrationPercent}</div>
            )}
            <input
              id="migration-percent"
              type="range"
              min="0"
              max="100"
              step="1"
              value={inputs.migrationPercent ?? SUGGESTED_VALUES.migrationPercent}
              onChange={(e) => handleInputChange('migrationPercent', parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>0%</span>
              <span>100%</span>
            </div>
            {inputErrors.migrationPercent && (
              <span className="error-message">{inputErrors.migrationPercent}</span>
            )}
          </div>
          {/* Calculate Button */}
          <div className="calculate-section">
            <button
              type="button"
              className={`calculate-button ${allInputsFilled && !isCalculating ? 'enabled' : 'disabled'}`}
              onClick={handleCalculate}
              disabled={!allInputsFilled || isCalculating}
            >
              {isCalculating ? (
                <>
                  <span className="loading-spinner"></span>
                  Calculating...
                </>
              ) : allInputsFilled ? 'Calculate My Savings' : 'Complete All Fields Above'}
            </button>
          </div>

          {/* Savings Insights - Show when results are available */}
          {showResults && allInputsFilled && (
            <SavingsInsights
              restaurantInfo={restaurantInfo}
              calculationResults={results}
            />
          )}
        </div>

        <div className="results-section">
          {showResults && allInputsFilled ? (
            <>
              <FinancialImpactCards results={results} timeframe={inputs.timeframe} />
              <SavingsChart projections={results.monthlyProjections} timeframe={inputs.timeframe} />
            </>
          ) : (
            <div className="results-placeholder case-study">
              <div className="case-study-header">
                <h3>Success Story</h3>
                <div className="restaurant-badge">Trusted Partner</div>
              </div>
              
              <div className="case-study-content">
                <div className="restaurant-info">
                  <h4>Bella Vista Italian Kitchen</h4>
                  <p className="location">📍 San Francisco, CA • Family-owned since 2018</p>
                </div>
                
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-label">Monthly Online Sales</div>
                    <div className="metric-value">$28,000</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Previous Commission Rate</div>
                    <div className="metric-value">22%</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Delivery Mix</div>
                    <div className="metric-value">65%</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Migration to Innowi</div>
                    <div className="metric-value">75%</div>
                  </div>
                </div>
                
                <div className="savings-highlight">
                  <div className="savings-row">
                    <span className="savings-label">Monthly Savings:</span>
                    <span className="savings-amount">$2,835</span>
                  </div>
                  <div className="savings-row annual">
                    <span className="savings-label">Annual Savings:</span>
                    <span className="savings-amount">$34,020</span>
                  </div>
                  <div className="percentage-saved">
                    <strong>16.5% reduction in commission costs</strong>
                  </div>
                  <div className="cta-integrated">
                    <strong>👈 What could your restaurant save?</strong>
                  </div>
                </div>
                
                <div className="testimonial">
                  <p>"Switching to Innowi was the best decision we made. We're saving over $34K annually and our customers love the direct ordering experience!"</p>
                  <cite>— Maria Rodriguez, Owner</cite>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};