import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface SuccessStoriesSectionProps {
  onGetStarted: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ onGetStarted }) => {
  const successStories = [
    {
      restaurantName: "Tony's Italian Kitchen",
      location: "Chicago, IL",
      owner: "Tony Marcelli",
      beforeStats: {
        monthlyCommissions: "$4,200",
        customerData: "0%",
        brandControl: "Limited"
      },
      afterStats: {
        monthlySavings: "$3,800",
        customerData: "100%",
        brandControl: "Complete"
      },
      quote: "Switching to Innowi was the best business decision I've made in 20 years. I'm saving over $45K annually and finally have direct relationships with my customers.",
      timeToROI: "6 weeks",
      yearOverYearGrowth: "+34%"
    },
    {
      restaurantName: "Sakura Sushi & Ramen",
      location: "Austin, TX",
      owner: "Kenji Tanaka",
      beforeStats: {
        monthlyCommissions: "$2,800",
        customerData: "0%",
        brandControl: "Platform-dependent"
      },
      afterStats: {
        monthlySavings: "$2,400",
        customerData: "100%",
        brandControl: "Full autonomy"
      },
      quote: "The customer insights alone are worth the switch. I now know exactly who my customers are and can market directly to them. My repeat order rate has doubled.",
      timeToROI: "4 weeks",
      yearOverYearGrowth: "+28%"
    },
    {
      restaurantName: "Maria's Mexican Grill",
      location: "Phoenix, AZ",
      owner: "Maria Rodriguez",
      beforeStats: {
        monthlyCommissions: "$3,600",
        customerData: "0%",
        brandControl: "Restricted"
      },
      afterStats: {
        monthlySavings: "$3,200",
        customerData: "100%",
        brandControl: "Complete freedom"
      },
      quote: "I was skeptical at first, but the results speak for themselves. Not only am I saving money, but my customers love ordering directly from us. It feels more personal.",
      timeToROI: "5 weeks",
      yearOverYearGrowth: "+41%"
    }
  ];

  const industryStats = [
    {
      stat: "89%",
      description: "of restaurants report increased customer loyalty after switching"
    },
    {
      stat: "Average $38K",
      description: "annual savings for mid-size restaurants"
    },
    {
      stat: "4-6 weeks",
      description: "typical time to see positive ROI"
    },
    {
      stat: "95%",
      description: "customer satisfaction rate with Innowi platform"
    }
  ];

  return (
    <section className="success-stories-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Real Restaurants, Real Results
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it. See how restaurants like yours are thriving 
            after making the switch from third-party platforms to Innowi.
          </p>
        </div>

        <div className="success-stories-grid">
          {successStories.map((story, index) => (
            <Card key={index} variant="elevated" className="success-story-card">
              <div className="story-header">
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{story.restaurantName}</h3>
                  <p className="restaurant-location">{story.location}</p>
                  <p className="owner-name">Owner: {story.owner}</p>
                </div>
                <div className="story-metrics">
                  <div className="metric-badge roi">
                    <span className="metric-label">ROI Timeline</span>
                    <span className="metric-value">{story.timeToROI}</span>
                  </div>
                  <div className="metric-badge growth">
                    <span className="metric-label">Growth</span>
                    <span className="metric-value">{story.yearOverYearGrowth}</span>
                  </div>
                </div>
              </div>

              <div className="story-comparison">
                <div className="before-after">
                  <div className="before">
                    <h4 className="comparison-title">Before Innowi</h4>
                    <div className="comparison-stats">
                      <div className="stat-item">
                        <span className="stat-label">Monthly Commissions</span>
                        <span className="stat-value negative">{story.beforeStats.monthlyCommissions}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Customer Data</span>
                        <span className="stat-value negative">{story.beforeStats.customerData}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Brand Control</span>
                        <span className="stat-value negative">{story.beforeStats.brandControl}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="arrow">→</div>
                  
                  <div className="after">
                    <h4 className="comparison-title">After Innowi</h4>
                    <div className="comparison-stats">
                      <div className="stat-item">
                        <span className="stat-label">Monthly Savings</span>
                        <span className="stat-value positive">{story.afterStats.monthlySavings}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Customer Data</span>
                        <span className="stat-value positive">{story.afterStats.customerData}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Brand Control</span>
                        <span className="stat-value positive">{story.afterStats.brandControl}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="story-quote">
                <blockquote>
                  "{story.quote}"
                </blockquote>
                <cite>— {story.owner}, {story.restaurantName}</cite>
              </div>
            </Card>
          ))}
        </div>

        <div className="industry-stats">
          <Card variant="glass" className="stats-card">
            <div className="stats-header">
              <h3 className="stats-title">Industry-Wide Results</h3>
              <p className="stats-subtitle">
                These success stories aren't outliers—they're the norm for restaurants that switch to Innowi.
              </p>
            </div>
            
            <div className="stats-grid">
              {industryStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">{stat.stat}</span>
                  <span className="stat-description">{stat.description}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="success-cta">
          <Card variant="glass" className="cta-card">
            <div className="cta-content">
              <h3 className="cta-title">Ready to Write Your Success Story?</h3>
              <p className="cta-description">
                Join hundreds of restaurants that have already made the switch and are seeing 
                real results. Your success story could be next.
              </p>
              <div className="cta-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span className="benefit-text">No setup fees or long-term contracts</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span className="benefit-text">Full migration support included</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span className="benefit-text">See results in your first month</span>
                </div>
              </div>
              <Button size="lg" onClick={onGetStarted} className="success-cta-button">
                Calculate My Potential Savings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};