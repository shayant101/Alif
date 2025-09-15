import React, { useState } from 'react';
import '../../styles/LandingPage.css';
import { HeroSection } from './HeroSection';
import { CalculatorIntegrationSection } from './CalculatorIntegrationSection';
import { EmailCaptureForm } from '../EmailCaptureForm';
import type { RestaurantInfo, CalculationResults, LeadData } from '../../types';

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailFormData, setEmailFormData] = useState<{
    restaurantInfo: RestaurantInfo;
    calculationResults: CalculationResults;
  } | null>(null);

  const handleGetStarted = () => {
    // Scroll to calculator section
    const calculatorSection = document.getElementById('calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };



  const handleProceedToEmail = () => {
    // This will be called when user wants to proceed to email form
    // The calculator integration section will handle showing the email form
  };

  const handleCloseEmailForm = () => {
    setShowEmailForm(false);
    setEmailFormData(null);
  };

  const handleEmailSubmit = async (leadData: LeadData) => {
    // In a real application, this would send the data to your backend
    console.log('Email submitted:', {
      leadData,
      restaurantInfo: emailFormData?.restaurantInfo,
      calculationResults: emailFormData?.calculationResults
    });
    
    // Close the form
    handleCloseEmailForm();
    
    // Show success message or redirect
    alert('Thank you! We\'ll send your personalized savings report to your email shortly.');
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <img
              src="/logo.png"
              alt="Innowi Logo"
              className="nav-logo-image"
            />
          </div>
          <div className="nav-actions">
            <button 
              className="nav-link"
              onClick={handleGetStarted}
            >
              Calculate Savings
            </button>
            <button 
              className="nav-cta-button"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="landing-main">
        {/* Section 1: Hero */}
        <HeroSection onGetStarted={handleGetStarted} />

        {/* Section 6: Calculator Integration */}
        <div id="calculator-section">
          <CalculatorIntegrationSection
            onProceedToEmail={handleProceedToEmail}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <img
                src="/logo.png"
                alt="Innowi Logo"
                className="footer-logo-image"
              />
              <p className="footer-tagline">
                Empowering restaurants to build their own brands and keep their profits.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-section">
                <h4 className="footer-section-title">Product</h4>
                <ul className="footer-link-list">
                  <li><a href="#features" className="footer-link">Features</a></li>
                  <li><a href="#pricing" className="footer-link">Pricing</a></li>
                  <li><a href="#calculator" className="footer-link">Savings Calculator</a></li>
                  <li><a href="#demo" className="footer-link">Request Demo</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4 className="footer-section-title">Resources</h4>
                <ul className="footer-link-list">
                  <li><a href="#case-studies" className="footer-link">Case Studies</a></li>
                  <li><a href="#blog" className="footer-link">Blog</a></li>
                  <li><a href="#help" className="footer-link">Help Center</a></li>
                  <li><a href="#api" className="footer-link">API Docs</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4 className="footer-section-title">Company</h4>
                <ul className="footer-link-list">
                  <li><a href="#about" className="footer-link">About Us</a></li>
                  <li><a href="#careers" className="footer-link">Careers</a></li>
                  <li><a href="#contact" className="footer-link">Contact</a></li>
                  <li><a href="#press" className="footer-link">Press</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4 className="footer-section-title">Legal</h4>
                <ul className="footer-link-list">
                  <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
                  <li><a href="#terms" className="footer-link">Terms of Service</a></li>
                  <li><a href="#security" className="footer-link">Security</a></li>
                  <li><a href="#compliance" className="footer-link">Compliance</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                © 2024 Innowi. All rights reserved.
              </p>
              <div className="footer-social">
                <a href="#twitter" className="social-link" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#facebook" className="social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Email Capture Modal */}
      {showEmailForm && emailFormData && (
        <EmailCaptureForm
          restaurantInfo={emailFormData.restaurantInfo}
          calculationResults={emailFormData.calculationResults}
          onSubmit={handleEmailSubmit}
          onSkip={handleCloseEmailForm}
        />
      )}
    </div>
  );
};