import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaUsers, 
  FaLeaf, 
  FaEdit,
  FaPlane,
  FaGlobe,
  FaChartLine,
  FaShieldAlt,
  FaRocket,
  FaArrowRight
} from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Smart Itinerary Planning',
      description: 'AI-powered travel planning with drag-and-drop itinerary builder and real-time collaboration.',
      gradient: 'from-blue-500 to-cyan-500',
      link: '/itinerary'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'Expense Tracking',
      description: 'Track your travel expenses in real-time with smart categorization and budget alerts.',
      gradient: 'from-green-500 to-emerald-500',
      link: '/features/expense-tracker'
    },
    {
      icon: <FaUsers />,
      title: 'Travel Community',
      description: 'Connect with fellow travelers, share experiences, and get authentic recommendations.',
      gradient: 'from-purple-500 to-pink-500',
      link: '/features/travel-community'
    },
    {
      icon: <FaLeaf />,
      title: 'Carbon Calculator',
      description: 'Make eco-friendly travel choices with our advanced carbon footprint calculator.',
      gradient: 'from-teal-500 to-green-500',
      link: '/features/carbon-calculator'
    },
    {
      icon: <FaEdit />,
      title: 'Collaborative Editing',
      description: 'Plan trips together with real-time collaborative itinerary editing.',
      gradient: 'from-orange-500 to-red-500',
      link: '/features/itinerary-editor'
    },
    {
      icon: <FaGlobe />,
      title: 'Global Destinations',
      description: 'Explore thousands of destinations with detailed guides and local insights.',
      gradient: 'from-indigo-500 to-purple-500',
      link: '/explore'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Travelers' },
    { number: '50+', label: 'Countries Covered' },
    { number: '5K+', label: 'Trips Planned' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <FaRocket className="badge-icon" />
            <span>Your AI Travel Companion</span>
          </div>
          <h1 className="hero-title">
            Plan Your Perfect Trip with
            <span className="gradient-text"> TravelMate</span>
          </h1>
          <p className="hero-description">
            The all-in-one platform for modern travelers. Plan, track, and share your adventures 
            with AI-powered tools and real-time collaboration.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary btn-large">
              <span>Start Your Journey</span>
              <FaArrowRight />
            </Link>
            <Link to="/explore" className="btn btn-secondary btn-large">
              Explore Destinations
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need for Perfect Travels</h2>
            <p className="section-description">
              Powerful features designed to make travel planning effortless and enjoyable
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.link} 
                className="feature-card"
              >
                <div className={`feature-icon gradient-${feature.gradient.split(' ')[0].split('-')[1]}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">
                  <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How TravelMate Works</h2>
            <p className="section-description">
              Three simple steps to your perfect adventure
            </p>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <FaGlobe className="step-icon" />
                <h3>Explore Destinations</h3>
                <p>Discover amazing places with our curated destination guides and recommendations</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <FaEdit className="step-icon" />
                <h3>Plan Your Itinerary</h3>
                <p>Use our AI-powered tools to create the perfect schedule with drag-and-drop ease</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <FaPlane className="step-icon" />
                <h3>Travel & Share</h3>
                <p>Track expenses, share experiences, and make memories with our community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Adventure?</h2>
            <p className="cta-description">
              Join thousands of travelers who trust TravelMate for their journey planning
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-large">
                Create Free Account
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;