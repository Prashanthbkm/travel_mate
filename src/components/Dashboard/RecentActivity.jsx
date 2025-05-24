// RecentActivity.js (updated with travel activities)
import React from "react";

const activities = [
  { id: 1, description: "Booked flight to Paris", time: "2 hours ago", type: "flight" },
  { id: 2, description: "Added Bali to wishlist", time: "5 hours ago", type: "wishlist" },
  { id: 3, description: "Created Italy itinerary", time: "1 day ago", type: "itinerary" },
  { id: 4, description: "Reviewed Tokyo hotel", time: "2 days ago", type: "review" },
];

const getActivityIcon = (type) => {
  switch(type) {
    case 'flight': return '✈️';
    case 'wishlist': return '❤️';
    case 'itinerary': return '📅';
    case 'review': return '⭐';
    default: return '🌍';
  }
};

const RecentActivity = () => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
        Recent Travel Activity
      </h2>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {activities.map(activity => (
          <li
            key={activity.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span style={{ marginRight: "10px", fontSize: "20px" }}>
              {getActivityIcon(activity.type)}
            </span>
            <div style={{ flex: 1 }}>
              <div>{activity.description}</div>
              <div style={{ color: "#777", fontSize: "12px" }}>{activity.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;