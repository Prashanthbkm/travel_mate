// WelcomeBanner.js
import React from "react";
import { getCurrentUser } from '../../api';

const WelcomeBanner = ({ user, nextTrip, countriesVisited, totalTrips }) => {
  const currentUser = user || getCurrentUser();
  
  const formatNextTripDate = (tripDate) => {
    if (!tripDate) return 'No upcoming trips';
    const date = new Date(tripDate);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Trip completed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const getTravelLevel = (countriesCount) => {
    if (countriesCount >= 20) return 'Globetrotter';
    if (countriesCount >= 10) return 'Explorer';
    if (countriesCount >= 5) return 'Traveler';
    return 'Beginner';
  };

  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <h1>Welcome Back, {currentUser?.username || 'Explorer'}! 🌟</h1>
        <p>Your next adventure awaits</p>
        <div className="welcome-stats">
          <div className="stat-item">
            <span className="stat-icon">✈️</span>
            <div className="stat-info">
              <div className="stat-label">Next Trip</div>
              <div className="stat-value">
                {nextTrip ? 
                  `${nextTrip.destination} in ${formatNextTripDate(nextTrip.startDate)}` : 
                  'Plan your next trip!'
                }
              </div>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🌍</span>
            <div className="stat-info">
              <div className="stat-label">Countries Visited</div>
              <div className="stat-value">{countriesVisited || 0} countries</div>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <div className="stat-info">
              <div className="stat-label">Travel Level</div>
              <div className="stat-value">
                {getTravelLevel(countriesVisited || 0)}
              </div>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <div className="stat-info">
              <div className="stat-label">Total Trips</div>
              <div className="stat-value">{totalTrips || 0} trips</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;