import React, { useState } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import type { MonthlyProjection, CalculationResults } from '../types';
import { formatCurrency } from '../utils/calculations';
import { generateMarketingPlanPDF } from '../utils/pdfGenerator';
import { PDFDownloadModal } from './PDFDownloadModal';

interface SavingsChartProps {
  projections: MonthlyProjection[];
  timeframe?: 'monthly' | 'annual';
  results?: CalculationResults;
  restaurantName?: string;
  onStartSaving?: () => void;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const SavingsChart: React.FC<SavingsChartProps> = ({
  projections,
  timeframe = 'monthly',
  results,
  restaurantName,
  onStartSaving
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleModalSubmit = (name: string, phone: string) => {
    if (!results) return;

    // You can save the user data here or send it to your backend
    console.log('User data:', { name, phone });

    const totalSavings = projections.reduce((sum, proj) => sum + proj.savings, 0);
    const monthlySavings = results.savingsAmount;
    const annualSavings = monthlySavings * 12;

    generateMarketingPlanPDF({
      projections,
      timeframe,
      restaurantName,
      totalSavings,
      monthlySavings,
      annualSavings
    });

    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  // Transform data for the chart with cumulative values
  const chartData = projections.map((projection, index) => {
    // Calculate cumulative values up to current month
    const cumulativeSavings = projections.slice(0, index + 1).reduce((sum, p) => sum + p.savings, 0);
    const cumulativeThirdPartyFees = projections.slice(0, index + 1).reduce((sum, p) => sum + p.thirdPartyFees, 0);
    const cumulativeInnowiFees = projections.slice(0, index + 1).reduce((sum, p) => sum + p.innowiFees, 0);
    
    return {
      month: projection.month,
      'Monthly Savings': cumulativeSavings,
      '3P Platform Fees': cumulativeThirdPartyFees,
      'Innowi Fees': cumulativeInnowiFees
    };
  });

  return (
    <div className="savings-chart-redesigned">
      <div className="chart-header">
        <h3>12-Month Cumulative Savings</h3>
        <p className="chart-subtitle">
          See your growing savings impact over time ({timeframe === 'monthly' ? 'monthly' : 'annual'} view)
        </p>
      </div>
      
      <div className="chart-container-light">
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 40,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="2 4" stroke="#e2e8f0" strokeOpacity={0.6} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={13}
              fontWeight={500}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              fontWeight={500}
              tickLine={false}
              axisLine={false}
              dx={-10}
              tickFormatter={(value) => {
                const suffix = timeframe === 'monthly' ? 'k/mo' : 'k/yr';
                return `$${(value / 1000).toFixed(0)}${suffix}`;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Monthly Savings Area - Now prominently displayed as shaded area */}
            <Area
              type="monotone"
              dataKey="Monthly Savings"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#savingsGradient)"
              fillOpacity={0.8}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
            />
            
            {/* 3P Platform Fees Line */}
            <Line
              type="monotone"
              dataKey="3P Platform Fees"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
            />
            
            {/* Innowi Fees Line */}
            <Line
              type="monotone"
              dataKey="Innowi Fees"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            
            {/* Define gradient for savings area */}
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Elements below the chart */}
      <div className="chart-bottom-elements">
        {/* Cumulative Impact Card */}
        <div className="cumulative-impact-card-below">
          <div className="insight-card-redesigned">
            <div className="insight-content">
              <h4>Cumulative Impact</h4>
              <p>Your savings compound over time, creating significant long-term value for your restaurant.</p>
            </div>
          </div>
        </div>

        {/* Start Saving CTA - Now appears first */}
        {onStartSaving && (
          <div className="start-saving-cta">
            <div className="cta-card">
              <div className="cta-header">
                <h4>Ready to Start Saving?</h4>
                <p>Get personalized guidance to implement your savings plan and start reducing costs immediately.</p>
              </div>
              <div className="cta-benefits">
                <div className="benefit-highlight">
                  <span className="benefit-icon">$</span>
                  <span>Save {results ? formatCurrency(results.savingsAmount) : ''} annually</span>
                </div>
                <div className="benefit-highlight">
                  <span className="benefit-icon">✓</span>
                  <span>Free consultation call</span>
                </div>
                <div className="benefit-highlight">
                  <span className="benefit-icon">⚡</span>
                  <span>Start saving within 48 hours</span>
                </div>
              </div>
              <button
                className="start-saving-btn"
                onClick={onStartSaving}
              >
                <span className="btn-text">START SAVING NOW</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Marketing Plan CTA - Now appears second */}
        <div className="marketing-plan-cta-below">
          <div className="cta-content-prominent">
            <div className="cta-header">
              <div className="cta-badge">EXCLUSIVE</div>
              <h4>Get Your Custom Marketing Plan</h4>
            </div>
            <p>Receive a detailed strategy tailored specifically for <strong>Your Restaurant</strong> to maximize your savings potential.</p>
            <div className="cta-benefits">
              <div className="benefit-item">• Personalized recommendations</div>
              <div className="benefit-item">• Step-by-step implementation guide</div>
              <div className="benefit-item">• ROI tracking templates</div>
            </div>
            <button className="download-plan-btn-prominent" onClick={handleDownloadClick}>
              <span className="btn-text">
                <span className="btn-main">Download FREE Marketing Plan</span>
                <span className="btn-sub">Valued at $297 - Limited Time</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Download Modal */}
      {showModal && (
        <PDFDownloadModal
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};