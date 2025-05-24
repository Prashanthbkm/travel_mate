// ProfileCard.js (updated with travel stats)
import React from "react";

const ProfileCard = () => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <img
        src="/images/profile.jpg"
        alt="Profile"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          marginBottom: "15px",
        }}
      />
      <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Traveler John</h2>
      <p style={{ color: "#777", fontSize: "14px" }}>Explorer | 32 countries</p>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr 1fr",
        marginTop: "15px",
        gap: "10px"
      }}>
        <div>
          <div style={{ fontWeight: "bold" }}>12</div>
          <div style={{ fontSize: "12px" }}>Trips</div>
        </div>
        <div>
          <div style={{ fontWeight: "bold" }}>24</div>
          <div style={{ fontSize: "12px" }}>Cities</div>
        </div>
        <div>
          <div style={{ fontWeight: "bold" }}>8</div>
          <div style={{ fontSize: "12px" }}>Wishlist</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;