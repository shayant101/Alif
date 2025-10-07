import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PDFDownloadModalProps {
  onSubmit: (name: string, phone: string) => void;
  onClose: () => void;
}

export const PDFDownloadModal: React.FC<PDFDownloadModalProps> = ({ onSubmit, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  };

  const formatPhone = (value: string): string => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 6) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    if (errors.phone) {
      setErrors({ ...errors, phone: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(name, phone);
  };

  const modalContent = (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="pdf-modal-close" onClick={onClose}>×</button>

        <div className="pdf-modal-header">
          <h3>Download Your Marketing Plan</h3>
          <p>Enter your details to receive your personalized savings plan</p>
        </div>

        <form onSubmit={handleSubmit} className="pdf-modal-form">
          <div className="pdf-form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors({ ...errors, name: undefined });
                }
              }}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="pdf-error-message">{errors.name}</span>}
          </div>

          <div className="pdf-form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(555) 555-5555"
              maxLength={14}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="pdf-error-message">{errors.phone}</span>}
          </div>

          <button type="submit" className="pdf-submit-btn">
            Download Marketing Plan
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
