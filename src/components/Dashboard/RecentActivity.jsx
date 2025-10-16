import React from "react";

const getActivityIcon = (type) => {
  switch(type) {
    case 'flight': return '✈️';
    case 'wishlist': return '❤️';
    case 'itinerary': return '📅';
    case 'review': return '⭐';
    case 'expense': return '💰';
    case 'carbon': return '🌱';
    default: return '🌍';
  }
};

const formatTime = (timestamp) => {
  if (!timestamp) return 'Recently';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString();
};

const RecentActivity = ({ activities = [] }) => {
  // Fallback activities if no data
  const displayActivities = activities.length > 0 ? activities : [
    { 
      id: 1, 
      description: "Welcome to TravelMate! Start planning your first trip.", 
      timestamp: new Date().toISOString(), 
      type: "welcome" 
    }
  ];

  return (
    <div className="recent-activity">
      <h2>Recent Travel Activity</h2>
      <ul className="activity-list">
        {displayActivities.map(activity => (
          <li key={activity.id} className="activity-item">
            <span className="activity-icon">
              {getActivityIcon(activity.type)}
            </span>
            <div className="activity-content">
              <div className="activity-description">{activity.description}</div>
              <div className="activity-time">{formatTime(activity.timestamp)}</div>
            </div>
          </li>
        ))}
      </ul>
      
      {activities.length === 0 && (
        <div className="empty-activities">
          <p>No recent activity</p>
          <small>Your travel activities will appear here</small>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;