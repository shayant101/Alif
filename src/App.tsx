import React, { useState, useEffect } from 'react';
import type { AppState, RestaurantInfo, CalculationResults, LeadData } from './types';
import { DEFAULT_INPUTS } from './types';
import { loadFromSession, saveToSession } from './utils/calculations';
import { LandingPage } from './components/landing/LandingPage';
import { RestaurantInfoForm } from './components/RestaurantInfoForm';
import { SavingsCalculator } from './components/SavingsCalculator';
import { EmailCaptureForm } from './components/EmailCaptureForm';
import './styles/App.css';

function App() {
  const [appState, setAppState] = useState<AppState>({
    step: 'info',
    restaurantInfo: null,
    calculatorInputs: DEFAULT_INPUTS,
    calculationResults: null,
    leadData: null
  });

  const [showEmailForm, setShowEmailForm] = useState(false);

  // Load saved state from session storage on mount
  useEffect(() => {
    const savedRestaurantInfo = loadFromSession<RestaurantInfo>('restaurantInfo');
    const savedInputs = loadFromSession('calculatorInputs');
    
    if (savedRestaurantInfo) {
      setAppState(prev => ({
        ...prev,
        step: 'calculator',
        restaurantInfo: savedRestaurantInfo,
        calculatorInputs: (savedInputs as typeof DEFAULT_INPUTS) || DEFAULT_INPUTS
      }));
    }
  }, []);

  const handleRestaurantInfoSubmit = (info: RestaurantInfo) => {
    saveToSession('restaurantInfo', info);
    setAppState(prev => ({
      ...prev,
      step: 'calculator',
      restaurantInfo: info
    }));
  };

  const handleShowEmailForm = (results: CalculationResults) => {
    setAppState(prev => ({
      ...prev,
      calculationResults: results
    }));
    setShowEmailForm(true);
  };

  const handleEmailSubmit = (leadData: LeadData) => {
    // In a real application, this would send data to a backend
    console.log('Lead data captured:', leadData);
    saveToSession('leadData', leadData);
    
    setAppState(prev => ({
      ...prev,
      leadData
    }));
    setShowEmailForm(false);
    
    // Show success message
    alert('Thank you! Your savings report will be sent to your email shortly. Our team will contact you within 24 hours.');
  };

  const handleEmailSkip = () => {
    setShowEmailForm(false);
  };

  const handleStartOver = () => {
    // Clear session storage
    sessionStorage.clear();
    
    // Reset app state
    setAppState({
      step: 'info',
      restaurantInfo: null,
      calculatorInputs: DEFAULT_INPUTS,
      calculationResults: null,
      leadData: null
    });
    setShowEmailForm(false);
  };

  return (
    <div className="app">
      <LandingPage />
    </div>
  );
}

export default App;
